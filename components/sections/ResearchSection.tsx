import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowUpRight, CheckCircle2, Clock3 } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  cves,
  researchCards,
  type CveStatus,
} from "@/data/research";
import { formatDate } from "@/lib/utils";

const researchDisplayOrder = [
  "/blog/breaking-into-my-own-camera",
  "/blog/camaleon-cms-cve",
];

function getResearchDisplayOrder(href?: string) {
  const index = href ? researchDisplayOrder.indexOf(href) : -1;
  return index === -1 ? researchDisplayOrder.length : index;
}

function getStatusClassName(status: CveStatus) {
  switch (status) {
    case "Reserved":
      return "border-amber-300/70 bg-amber-50 text-neutral-700 dark:border-amber-900/70 dark:bg-amber-950/20 dark:text-neutral-200";
    case "Disclosed":
      return "border-emerald-300/70 bg-emerald-50 text-neutral-700 dark:border-emerald-900/70 dark:bg-emerald-950/20 dark:text-neutral-200";
    case "Published":
      return "border-emerald-300/70 bg-emerald-50 text-neutral-700 dark:border-emerald-900/70 dark:bg-emerald-950/20 dark:text-neutral-200";
    case "In Review":
      return "border-border bg-muted/40 text-muted-foreground";
  }
}

function getVendorResponsePresentation(vendorResponse: string) {
  const positive =
    vendorResponse === "Fixed and credited" ||
    vendorResponse === "Acknowledged";

  return {
    Icon: positive ? CheckCircle2 : Clock3,
    className: positive
      ? "text-emerald-700/80 dark:text-emerald-400/80"
      : "text-muted-foreground",
  };
}

export default function ResearchSection() {
  const orderedResearchCards = [...researchCards].sort(
    (a, b) =>
      getResearchDisplayOrder(a.href) - getResearchDisplayOrder(b.href)
  );

  const numericCvssScores = cves
    .map((cve) => Number.parseFloat(cve.cvss))
    .filter(Number.isFinite);
  const highestCvss =
    numericCvssScores.length > 0
      ? Math.max(...numericCvssScores).toFixed(1)
      : "TBD";
  const reservedCount = cves.filter(
    (cve) => cve.status === "Reserved"
  ).length;
  const disclosedCount = cves.filter(
    (cve) => cve.status === "Disclosed"
  ).length;
  const groupedCves = cves
    .reduce<Array<{ product: string; items: typeof cves }>>((groups, cve) => {
      const existingGroup = groups.find(
        (group) => group.product === cve.product
      );

      if (existingGroup) {
        existingGroup.items.push(cve);
      } else {
        groups.push({ product: cve.product, items: [cve] });
      }

      return groups;
    }, [])
    .sort(
      (a, b) =>
        getResearchDisplayOrder(a.items[0]?.href) -
        getResearchDisplayOrder(b.items[0]?.href)
    );

  const linkedText = (
    href: string | undefined,
    children: ReactNode,
    className: string
  ) => {
    if (!href) {
      return <span className={className}>{children}</span>;
    }

    return (
      <Link
        href={href}
        className={`${className} underline-offset-4 transition-colors hover:text-foreground hover:underline`}
      >
        {children}
      </Link>
    );
  };

  return (
    <section className="space-y-10">
      <div className="flex items-center justify-between border-b border-border/60 pb-3">
        <h2 className="text-sm font-semibold text-foreground">
          Vulnerability disclosures
        </h2>
        <span className="text-xs text-muted-foreground">
          Updated July 2026
        </span>
      </div>

      <dl className="grid grid-cols-4 border border-border/70">
        {[
          ["Findings", cves.length],
          ["Reserved", reservedCount],
          ["Disclosed", disclosedCount],
          ["Max CVSS", highestCvss],
        ].map(([label, value], index) => (
          <div
            key={label}
            className={`min-w-0 px-2 py-3 text-center sm:px-4 ${
              index > 0 ? "border-l border-border/70" : ""
            }`}
          >
            <dt className="truncate text-[11px] text-muted-foreground">
              {label}
            </dt>
            <dd className="mt-1 text-base font-semibold leading-none text-foreground">
              {value}
            </dd>
          </div>
        ))}
      </dl>

      <div className="space-y-5">
        {groupedCves.map((group) => (
          <article key={group.product} className="border border-border/70">
            <header className="flex flex-col gap-2 border-b border-border/60 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="min-w-0">
                <h3 className="text-sm font-medium text-foreground">
                  {group.product}
                </h3>
                <div className="mt-1.5 flex flex-wrap gap-x-4 gap-y-1">
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
                    const { Icon, className } =
                      getVendorResponsePresentation(vendorResponse.label);
                    const response = (
                      <span
                        className={`inline-flex items-center gap-1.5 text-xs ${className}`}
                      >
                        <Icon className="size-3.5" aria-hidden />
                        {vendorResponse.label}
                      </span>
                    );

                    if (!vendorResponse.href) {
                      return (
                        <span key={vendorResponse.label}>{response}</span>
                      );
                    }

                    return (
                      <Link
                        key={`${vendorResponse.label}-${vendorResponse.href}`}
                        href={vendorResponse.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Open vendor reference for ${group.product}`}
                        className="underline-offset-4 hover:underline"
                      >
                        {response}
                      </Link>
                    );
                  })}
                </div>
              </div>

              <span className="shrink-0 text-xs text-muted-foreground">
                {group.items.length}{" "}
                {group.items.length === 1 ? "finding" : "findings"}
              </span>
            </header>

            <div className="divide-y divide-border/50">
              {group.items.map((cve, index) => (
                <div
                  key={`${cve.id}-${cve.vulnerabilityType}-${index}`}
                  className="grid grid-cols-[minmax(0,1fr)_auto] gap-x-3 gap-y-2 border-l-4 border-l-neutral-400 px-3 py-3 transition-colors hover:bg-muted/30 sm:grid-cols-[8.75rem_minmax(0,1fr)_5.25rem_auto] sm:items-center sm:px-4 dark:border-l-neutral-600"
                >
                  {linkedText(
                    cve.href,
                    <span className="inline-flex items-center gap-1">
                      {cve.id}
                      {cve.href && <ArrowUpRight className="size-3" />}
                    </span>,
                    "truncate text-xs font-medium text-foreground"
                  )}

                  <p className="col-span-2 text-sm leading-relaxed text-muted-foreground sm:col-span-1">
                    {cve.vulnerabilityType}
                  </p>

                  <span className="text-xs font-medium text-foreground">
                    <span className="text-muted-foreground">CVSS </span>
                    {cve.cvss}
                  </span>

                  <Badge
                    variant="outline"
                    className={`justify-self-end rounded-none px-2 py-0.5 text-[10px] ${getStatusClassName(cve.status)}`}
                  >
                    {cve.status}
                  </Badge>
                </div>
              ))}
            </div>
          </article>
        ))}
      </div>

      <div className="space-y-4">
        <div className="border-b border-border/60 pb-3">
          <h2 className="text-sm font-semibold text-foreground">
            Research writeups
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {orderedResearchCards.map((item) => (
            <Card
              key={item.id}
              className="group h-full gap-0 overflow-hidden rounded-none border-border/70 py-0 shadow-none transition-colors hover:bg-muted/30"
            >
              <CardHeader className="space-y-2 px-4 pt-4 pb-0 sm:px-5">
                <time className="text-[10px] text-muted-foreground">
                  {formatDate(item.date)}
                </time>

                <CardTitle className="line-clamp-2 text-base leading-tight">
                  {item.title}
                </CardTitle>

                <p className="line-clamp-4 text-[13px] leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              </CardHeader>

              <CardContent className="mt-auto px-4 pt-4 pb-4 sm:px-5">
                <div className="flex flex-wrap gap-1.5">
                  {item.tags.slice(0, 3).map((tag) => (
                    <Badge
                      key={tag}
                      variant="outline"
                      className="rounded-none border-border bg-background px-2 py-0.5 text-[9px] text-muted-foreground"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>

                {item.href && (
                  <Link
                    href={item.href}
                    className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-foreground underline-offset-4 hover:underline"
                  >
                    Read writeup
                    <ArrowUpRight className="size-3.5" />
                  </Link>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
