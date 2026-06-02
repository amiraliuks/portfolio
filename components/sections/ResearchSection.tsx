import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cves, researchCards } from "@/data/research";
import { formatDate } from "@/lib/utils";

function getStatusClassName(status: string) {
  if (status === "Published") return "border-neutral-950 bg-neutral-950 text-white dark:border-white dark:bg-white dark:text-neutral-950";
  if (status === "Reserved") return "border-neutral-300 bg-white text-neutral-700 dark:border-neutral-700 dark:bg-neutral-950 dark:text-neutral-200";
  if (status === "Disclosed") return "border-neutral-500 bg-neutral-100 text-neutral-900 dark:border-neutral-500 dark:bg-neutral-800 dark:text-neutral-100";
  return "border-neutral-300 bg-white/70 text-neutral-700 dark:border-neutral-700 dark:bg-neutral-900/75 dark:text-neutral-100";
}

function getCvssClassName(cvss: string) {
  const score = Number.parseFloat(cvss);
  if (!Number.isFinite(score)) return "text-muted-foreground";
  if (score >= 8) return "text-foreground";
  if (score >= 6) return "text-neutral-700 dark:text-neutral-200";
  return "text-muted-foreground";
}

function getVendorResponseClassName(vendorResponse: string) {
  if (vendorResponse === "No vendor response") {
    return "border-neutral-400 bg-neutral-100 text-neutral-800 dark:border-neutral-600 dark:bg-neutral-900 dark:text-neutral-200";
  }

  if (vendorResponse === "Fixed and credited") {
    return "border-neutral-300 bg-white text-neutral-600 dark:border-neutral-700 dark:bg-neutral-950 dark:text-neutral-300";
  }

  return "border-neutral-300 bg-white/70 text-neutral-600 dark:border-neutral-700 dark:bg-neutral-900/75 dark:text-neutral-300";
}

export default function ResearchSection() {
  const sortedResearchCards = [...researchCards].sort(
    (a, b) => new Date(`${b.date}T00:00:00`).getTime() - new Date(`${a.date}T00:00:00`).getTime()
  );

  const numericCvssScores = cves
    .map((cve) => Number.parseFloat(cve.cvss))
    .filter(Number.isFinite);
  const highestCvss = numericCvssScores.length > 0 ? Math.max(...numericCvssScores).toFixed(1) : "TBD";
  const reservedCount = cves.filter((cve) => cve.status === "Reserved").length;
  const disclosedCount = cves.filter((cve) => cve.status === "Disclosed").length;
  const groupedCves = cves.reduce<Array<{ product: string; items: typeof cves }>>((groups, cve) => {
    const existingGroup = groups.find((group) => group.product === cve.product);

    if (existingGroup) {
      existingGroup.items.push(cve);
    } else {
      groups.push({ product: cve.product, items: [cve] });
    }

    return groups;
  }, []);

  const linkedText = (href: string | undefined, children: ReactNode, className: string) => {
    if (!href) {
      return <span className={className}>{children}</span>;
    }

    return (
      <Link href={href} className={`${className} underline-offset-4 transition-colors hover:text-foreground hover:underline`}>
        {children}
      </Link>
    );
  };

  return (
    <section className="space-y-10">
      <div className="flex items-center justify-between border-b border-border/60 pb-3 text-xs text-muted-foreground">
        <span>Findings and disclosures</span>
        <span>Last updated May 2026</span>
      </div>

      <div className="border border-border/70 bg-muted/10">
        <div className="border-b border-border/60 px-4 py-4 sm:px-5">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
            <div className="max-w-2xl">
              <h2 className="text-sm font-semibold text-foreground">Disclosure ledger</h2>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                Compact tracking for CVEs and public vulnerability disclosures, grouped by affected product.
              </p>
            </div>

            <span className="shrink-0 font-mono text-xs text-muted-foreground">
              {groupedCves.length} products
            </span>
          </div>

          <div className="mt-4 grid grid-cols-2 border border-border/60 text-center sm:grid-cols-4">
            <div className="border-b border-r border-border/60 px-3 py-3 sm:border-b-0">
              <div className="font-mono text-lg text-foreground">{cves.length}</div>
              <div className="text-[10px] uppercase tracking-wide text-muted-foreground">Findings</div>
            </div>
            <div className="border-b border-border/60 px-3 py-3 sm:border-b-0 sm:border-r">
              <div className="font-mono text-lg text-foreground">{reservedCount}</div>
              <div className="text-[10px] uppercase tracking-wide text-muted-foreground">Reserved</div>
            </div>
            <div className="border-r border-border/60 px-3 py-3">
              <div className="font-mono text-lg text-foreground">{disclosedCount}</div>
              <div className="text-[10px] uppercase tracking-wide text-muted-foreground">Disclosed</div>
            </div>
            <div className="px-3 py-3">
              <div className="font-mono text-lg text-foreground">{highestCvss}</div>
              <div className="text-[10px] uppercase tracking-wide text-muted-foreground">Max CVSS</div>
            </div>
          </div>
        </div>

        <div className="divide-y divide-border/50">
          {groupedCves.map((group) => (
            <div key={group.product} className="px-4 py-4 sm:px-5">
              <div className="mb-3 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0 space-y-2">
                  <h3 className="text-sm font-medium text-foreground">{group.product}</h3>
                  <div className="flex flex-wrap gap-2">
                    {[
                      ...new Map(
                        group.items.map((item) => [
                          `${item.vendorResponse}-${item.vendorResponseHref ?? ""}`,
                          {
                            label: item.vendorResponse,
                            href: item.vendorResponseHref,
                          },
                        ])
                      ).values(),
                    ].map((vendorResponse) => {
                      const badge = (
                        <Badge
                          variant="outline"
                          className={`rounded-none px-2.5 py-1 text-[10px] ${getVendorResponseClassName(vendorResponse.label)}`}
                        >
                          Vendor: {vendorResponse.label}
                          {vendorResponse.href && <ArrowUpRight className="h-3 w-3" />}
                        </Badge>
                      );

                      if (!vendorResponse.href) {
                        return <span key={vendorResponse.label}>{badge}</span>;
                      }

                      return (
                        <Link
                          key={`${vendorResponse.label}-${vendorResponse.href}`}
                          href={vendorResponse.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Open vendor reference for ${group.product}`}
                        >
                          {badge}
                        </Link>
                      );
                    })}
                  </div>
                </div>

                <span className="shrink-0 font-mono text-[11px] text-muted-foreground">
                  {group.items.length} {group.items.length === 1 ? "finding" : "findings"}
                </span>
              </div>

              <div className="divide-y divide-border/40 border-l border-border/60">
                {group.items.map((cve, index) => (
                  <div
                    key={`${cve.id}-${cve.vulnerabilityType}-${index}`}
                    className="px-4 py-3 transition-colors hover:bg-background/70"
                  >
                    <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                      <div className="min-w-0 space-y-1">
                        {linkedText(
                          cve.href,
                          <span className="inline-flex items-center gap-1">
                            {cve.id}
                            {cve.href && <ArrowUpRight className="h-3 w-3" />}
                          </span>,
                          "font-mono text-xs text-foreground"
                        )}

                        <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
                          {cve.vulnerabilityType}
                        </p>
                      </div>

                      <div className="flex shrink-0 flex-wrap items-center gap-2 md:justify-end">
                        <span className={`font-mono text-xs font-semibold ${getCvssClassName(cve.cvss)}`}>
                          CVSS {cve.cvss}
                        </span>
                        <Badge
                          variant="outline"
                          className={`rounded-none px-2.5 py-1 text-[10px] ${getStatusClassName(cve.status)}`}
                        >
                          {cve.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {sortedResearchCards.map((item) => (
          <Card
            key={item.id}
            className="
              group
              relative
              h-full
              overflow-hidden
              rounded-none
              border border-neutral-200/80
              bg-linear-to-b from-neutral-50 to-neutral-100/60
              py-0
              shadow-[0_16px_40px_-28px_rgba(2,6,23,0.35)]
              transition-all duration-300 ease-out
              hover:-translate-y-1
              hover:border-neutral-300
              hover:shadow-[0_26px_70px_-35px_rgba(2,6,23,0.5)]
              dark:border-neutral-800/90
              dark:from-neutral-900/95
              dark:to-neutral-950/95
              dark:hover:border-neutral-700
              dark:hover:shadow-[0_30px_80px_-35px_rgba(255,255,255,0.16)]
            "
          >
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_-20%,rgba(255,255,255,0.12),transparent_45%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            />

            <CardHeader className="relative space-y-2 px-4 pt-4 pb-0 sm:px-5">
              <time className="inline-flex w-fit rounded-none border border-neutral-200 bg-white/80 px-2 py-0.5 font-sans text-[10px] text-neutral-600 dark:border-neutral-800 dark:bg-neutral-900/70 dark:text-neutral-300">
                {formatDate(item.date)}
              </time>

              <CardTitle className="line-clamp-2 text-base leading-tight">
                {item.title}
              </CardTitle>

              <p className="line-clamp-5 font-sans text-[13px] leading-relaxed text-muted-foreground">
                {item.description}
              </p>
            </CardHeader>

            <CardContent className="relative mt-auto flex flex-col px-4 pb-1 sm:px-5">
              <div className="mt-1 flex flex-wrap gap-1">
                {item.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="outline"
                    className="rounded-none border-neutral-200 bg-white/70 px-2 py-0.5 text-[9px] font-medium text-neutral-700 dark:border-neutral-700 dark:bg-neutral-900/65 dark:text-neutral-200"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>

            <CardFooter className="relative px-4 pb-3 pt-1 sm:px-5">
              {item.href && (
                <Link href={item.href}>
                  <Badge
                    variant="outline"
                    className="rounded-none border-neutral-300 bg-white px-2.5 py-1 text-[10px] font-semibold text-neutral-800 transition-colors hover:bg-neutral-100 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100 dark:hover:bg-neutral-800"
                  >
                    Open Research
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </Badge>
                </Link>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
}
