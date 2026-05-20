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
  if (status === "Published") return "border-emerald-500/50 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300";
  if (status === "Reserved") return "border-amber-500/50 bg-amber-500/10 text-amber-700 dark:text-amber-300";
  if (status === "Disclosed") return "border-sky-500/50 bg-sky-500/10 text-sky-700 dark:text-sky-300";
  return "border-neutral-300 bg-white/70 text-neutral-700 dark:border-neutral-700 dark:bg-neutral-900/75 dark:text-neutral-100";
}

function getCvssClassName(cvss: string) {
  const score = Number.parseFloat(cvss);
  if (!Number.isFinite(score)) return "text-muted-foreground";
  if (score >= 8) return "text-red-600 dark:text-red-300";
  if (score >= 6) return "text-amber-600 dark:text-amber-300";
  return "text-muted-foreground";
}

export default function ResearchSection() {
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

      <div className="overflow-hidden rounded-none border border-border/70 bg-muted/10">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="border-b border-border/70 bg-muted/30 text-xs uppercase tracking-wide text-muted-foreground">
              <tr>
                <th scope="col" className="px-4 py-3 font-medium">
                  CVE ID
                </th>
                <th scope="col" className="px-4 py-3 font-medium">
                  Product
                </th>
                <th scope="col" className="px-4 py-3 font-medium">
                  Vulnerability type
                </th>
                <th scope="col" className="px-4 py-3 font-medium">
                  CVSS
                </th>
                <th scope="col" className="px-4 py-3 font-medium">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {cves.map((cve, index) => (
                <tr key={`${cve.id}-${index}`} className="transition-colors hover:bg-muted/20">
                  <td className="px-4 py-3">
                    {linkedText(cve.href, cve.id, "font-mono text-xs text-foreground")}
                  </td>
                  <td className="px-4 py-3">
                    {linkedText(cve.href, cve.product, "text-muted-foreground")}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{cve.vulnerabilityType}</td>
                  <td className={`px-4 py-3 font-mono text-xs font-semibold ${getCvssClassName(cve.cvss)}`}>
                    {cve.cvss}
                  </td>
                  <td className="px-4 py-3">
                    <Badge
                      variant="outline"
                      className={`rounded-none px-2.5 py-1 text-[10px] ${getStatusClassName(cve.status)}`}
                    >
                      {cve.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {researchCards.map((item) => (
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
              dark:hover:shadow-[0_30px_80px_-35px_rgba(6,182,212,0.25)]
            "
          >
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_-20%,rgba(34,211,238,0.15),transparent_45%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
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