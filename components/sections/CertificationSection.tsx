'use client';

import { useEffect, useMemo, useState } from 'react';
import { Calendar, ChevronDown, ExternalLink } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { BiCertification } from 'react-icons/bi';
import { FaBookOpen } from 'react-icons/fa';
import { SiCredly } from 'react-icons/si';
import { BadgeSheet } from '@/components/media/BadgeSheet';
import { trackEvent } from '@/lib/analytics';

import {
  certifications,
  type Certification,
  type CertificationCategory,
  getCertificationCategory,
} from '@/data/certifications';

type CertificationFilter = 'all' | CertificationCategory;

type CertificationItem = Certification & {
  category: CertificationCategory;
  timestamp: number;
  year: string;
};

const filters: Array<{ label: string; value: CertificationFilter }> = [
  { label: 'All', value: 'all' },
  { label: 'CTF', value: 'ctf' },
  { label: 'Professional', value: 'professional' },
];

function parseCertificationDate(date: string): number {
  return new Date(date.split('-').reverse().join('-')).getTime();
}

function formatCertificationDate(date: string): string {
  const parsed = new Date(date.split('-').reverse().join('-'));

  return new Intl.DateTimeFormat('en', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
  }).format(parsed);
}

function getCategoryLabel(category: CertificationCategory): string {
  return category === 'ctf' ? 'CTF' : 'Professional';
}

function getCategoryClassName(category: CertificationCategory): string {
  return category === 'ctf'
    ? 'border-foreground/20 bg-foreground text-background'
    : 'border-border bg-muted/40 text-foreground';
}

function CertificationsSection() {
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [activeFilter, setActiveFilter] = useState<CertificationFilter>('all');

  const sortedCerts = useMemo<CertificationItem[]>(
    () =>
      [...certifications]
        .map((certification) => {
          const timestamp = parseCertificationDate(certification.createdAt);

          return {
            ...certification,
            category: getCertificationCategory(certification),
            timestamp,
            year: new Date(timestamp).getFullYear().toString(),
          };
        })
        .sort((a, b) => b.timestamp - a.timestamp),
    []
  );

  const counts = useMemo(() => {
    const categoryCounts: Record<CertificationFilter, number> = {
      all: sortedCerts.length,
      ctf: 0,
      professional: 0,
    };

    sortedCerts.forEach((certification) => {
      categoryCounts[certification.category] += 1;
    });

    return categoryCounts;
  }, [sortedCerts]);

  const filteredCerts = useMemo(() => {
    if (activeFilter === 'all') return sortedCerts;
    return sortedCerts.filter((certification) => certification.category === activeFilter);
  }, [activeFilter, sortedCerts]);

  const featuredCerts = useMemo(() => sortedCerts.slice(0, 3), [sortedCerts]);

  const groupedCerts = useMemo(() => {
    return filteredCerts.reduce<Array<{ year: string; items: CertificationItem[] }>>(
      (groups, certification) => {
        const existingGroup = groups.find((group) => group.year === certification.year);

        if (existingGroup) {
          existingGroup.items.push(certification);
        } else {
          groups.push({ year: certification.year, items: [certification] });
        }

        return groups;
      },
      []
    );
  }, [filteredCerts]);

  useEffect(() => {
    if (expandedId === null) return;
    if (!filteredCerts.some((certification) => certification.id === expandedId)) {
      setExpandedId(null);
    }
  }, [expandedId, filteredCerts]);

  const toggleExpand = (id: number) => {
    setExpandedId((currentId) => (currentId === id ? null : id));
  };

  return (
    <section className="mx-auto max-w-3xl">
      <div className="mb-8 grid grid-cols-3 border border-border/70 text-center">
        <div className="border-r border-border/70 px-3 py-3">
          <div className="font-mono text-lg text-foreground">{counts.all}</div>
          <div className="text-[11px] uppercase tracking-wide text-muted-foreground">Total</div>
        </div>
        <div className="border-r border-border/70 px-3 py-3">
          <div className="font-mono text-lg text-foreground">{counts.ctf}</div>
          <div className="text-[11px] uppercase tracking-wide text-muted-foreground">CTF</div>
        </div>
        <div className="px-3 py-3">
          <div className="font-mono text-lg text-foreground">{counts.professional}</div>
          <div className="text-[11px] uppercase tracking-wide text-muted-foreground">Professional</div>
        </div>
      </div>

      <div className="mb-7 flex flex-wrap gap-2 border-b border-border/60 pb-5">
        {filters.map((filter) => (
          <button
            key={filter.value}
            type="button"
            onClick={() => setActiveFilter(filter.value)}
            aria-pressed={activeFilter === filter.value}
            className={`border px-4 py-1.5 text-sm transition ${
              activeFilter === filter.value
                ? 'border-foreground bg-foreground text-background'
                : 'border-border text-muted-foreground hover:bg-accent hover:text-accent-foreground'
            }`}
          >
            {filter.label} <span className="text-[11px] opacity-70">{counts[filter.value]}</span>
          </button>
        ))}
      </div>

      <div className="space-y-10">
        {groupedCerts.map((group) => (
          <div key={group.year} className="grid gap-4 sm:grid-cols-[72px_1fr]">
            <div className="font-mono text-sm text-muted-foreground">{group.year}</div>

            <div className="divide-y divide-border/40 border-l border-border/60 pl-5">
              {group.items.map((certification, index) => {
                const isExpanded = expandedId === certification.id;

                return (
                  <motion.div
                    key={certification.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25, delay: index * 0.03 }}
                    className="relative"
                  >
                    <span className="absolute -left-[25px] top-6 h-2 w-2 border border-border bg-background" />

                    <div className="flex items-start justify-between gap-4 px-2 py-5 text-left transition-colors hover:bg-muted/5 sm:-mx-2">
                      <button
                        type="button"
                        onClick={() => toggleExpand(certification.id)}
                        className="min-w-0 flex-1 cursor-pointer text-left"
                        aria-expanded={isExpanded}
                        aria-controls={`certification-content-${certification.id}`}
                      >
                        <div className="mb-2 flex flex-wrap items-center gap-2">
                          <h3 className="font-medium text-foreground">{certification.title}</h3>
                          <span
                            className={`shrink-0 border px-1.5 py-0.5 text-[9px] font-medium uppercase tracking-wide ${getCategoryClassName(
                              certification.category
                            )}`}
                          >
                            {getCategoryLabel(certification.category)}
                          </span>
                        </div>

                        <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                          {certification.description}
                        </p>

                        <div className="mt-3 flex flex-wrap gap-1.5">
                          {certification.badge.slice(0, 4).map((badge) => (
                            <span
                              key={badge}
                              className="bg-muted/40 px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground/75"
                            >
                              {badge}
                            </span>
                          ))}
                          {certification.badge.length > 4 && (
                            <span className="px-1 font-mono text-[10px] text-muted-foreground/50">
                              +{certification.badge.length - 4}
                            </span>
                          )}
                        </div>
                      </button>

                      <div className="flex shrink-0 items-center gap-3">
                        <span className="hidden items-center gap-1.5 font-mono text-xs text-muted-foreground/60 md:flex">
                          <Calendar className="h-3 w-3" />
                          {formatCertificationDate(certification.createdAt)}
                        </span>

                        <button
                          type="button"
                          onClick={() => toggleExpand(certification.id)}
                          className="p-1 transition-colors hover:bg-muted"
                          aria-label={
                            isExpanded
                              ? 'Collapse certification details'
                              : 'Expand certification details'
                          }
                        >
                          <ChevronDown
                            className={`h-4 w-4 text-muted-foreground transition-transform duration-200 ${
                              isExpanded ? 'rotate-180' : ''
                            }`}
                          />
                        </button>
                      </div>
                    </div>

                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          id={`certification-content-${certification.id}`}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.22, ease: 'easeInOut' }}
                          className="overflow-hidden"
                        >
                          <div className="space-y-6 px-2 pb-6 pt-1">
                            {certification.badgeImage && (
                              <div className="flex justify-start">
                                <BadgeSheet
                                  title={certification.title}
                                  image={certification.badgeImage}
                                />
                              </div>
                            )}

                            <p className="text-sm leading-relaxed text-muted-foreground">
                              {certification.description}
                            </p>

                            {certification.skills.length > 0 && (
                              <div className="space-y-3">
                                <h4 className="text-xs font-medium uppercase tracking-wider text-muted-foreground/70">
                                  Skills Covered
                                </h4>
                                <ul className="grid gap-2">
                                  {certification.skills.map((skill) => (
                                    <li
                                      key={skill}
                                      className="flex items-start gap-2 text-sm text-foreground/80"
                                    >
                                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-muted-foreground/40" />
                                      {skill}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}

                            <div className="space-y-3">
                              <h4 className="text-xs font-medium uppercase tracking-wider text-muted-foreground/70">
                                Areas
                              </h4>
                              <div className="flex flex-wrap gap-2">
                                {certification.badge.map((badge) => (
                                  <span
                                    key={badge}
                                    className="bg-muted/50 px-2 py-1 font-mono text-xs text-muted-foreground"
                                  >
                                    {badge}
                                  </span>
                                ))}
                              </div>
                            </div>

                            <div className="flex flex-wrap items-center gap-4 pt-1">
                              {certification.course && (
                                <a
                                  href={certification.course}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                                  onClick={() =>
                                    trackEvent('certification_link_click', {
                                      source: 'details',
                                      type: 'course',
                                      certificationId: certification.id,
                                    })
                                  }
                                >
                                  <FaBookOpen className="h-4 w-4" />
                                  Course
                                </a>
                              )}
                              {certification.credlyBadge && (
                                <a
                                  href={certification.credlyBadge}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                                  onClick={() =>
                                    trackEvent('certification_link_click', {
                                      source: 'details',
                                      type: 'credly',
                                      certificationId: certification.id,
                                    })
                                  }
                                >
                                  <SiCredly className="h-4 w-4" />
                                  Badge
                                </a>
                              )}
                              {certification.certificateOne && (
                                <a
                                  href={certification.certificateOne}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                                  onClick={() =>
                                    trackEvent('certification_link_click', {
                                      source: 'details',
                                      type: 'certificate',
                                      certificationId: certification.id,
                                    })
                                  }
                                >
                                  <BiCertification className="h-4 w-4" />
                                  Certificate
                                </a>
                              )}
                              {certification.certificateTwo && (
                                <a
                                  href={certification.certificateTwo}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                                  onClick={() =>
                                    trackEvent('certification_link_click', {
                                      source: 'details',
                                      type: 'certificate_secondary',
                                      certificationId: certification.id,
                                    })
                                  }
                                >
                                  <ExternalLink className="h-4 w-4" />
                                  Secondary Certificate
                                </a>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {filteredCerts.length === 0 && (
        <div className="mt-6 border border-border bg-muted/25 p-5 text-center text-sm text-muted-foreground">
          No certifications matched this filter.
        </div>
      )}
    </section>
  );
}

export default CertificationsSection;
