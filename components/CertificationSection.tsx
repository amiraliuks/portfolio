'use client';

import { useEffect, useMemo, useState } from 'react';
import { ChevronDown, ExternalLink, Github, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { BiCertification } from "react-icons/bi";
import { FaBookOpen } from "react-icons/fa";
import { SiCredly } from 'react-icons/si';
import { BadgeSheet } from './BadgeSheet';
import { trackEvent } from '@/lib/analytics';

import {
  certifications,
  type CertificationCategory,
  getCertificationCategory,
} from '@/data/certifications';

type CertificationFilter = 'all' | CertificationCategory;

function parseCertificationDate(date: string): number {
  return new Date(date.split('-').reverse().join('-')).getTime();
}

function CertificationsSection() {
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [activeFilter, setActiveFilter] = useState<CertificationFilter>('all');

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const sortedCerts = useMemo(
    () =>
      [...certifications]
        .map((certification) => ({
          ...certification,
          category: getCertificationCategory(certification),
        }))
        .sort((a, b) => parseCertificationDate(b.createdAt) - parseCertificationDate(a.createdAt)),
    []
  );

  const categoryCounts = useMemo(() => {
    const counts: Record<CertificationCategory, number> = {
      professional: 0,
      ctf: 0,
    };

    sortedCerts.forEach((certification) => {
      counts[certification.category] += 1;
    });

    return counts;
  }, [sortedCerts]);

  const filteredCerts = useMemo(() => {
    if (activeFilter === 'all') return sortedCerts;
    return sortedCerts.filter((certification) => certification.category === activeFilter);
  }, [activeFilter, sortedCerts]);

  useEffect(() => {
    if (expandedId === null) return;
    if (!filteredCerts.some((certification) => certification.id === expandedId)) {
      setExpandedId(null);
    }
  }, [expandedId, filteredCerts]);

  return (
    <section className="max-w-3xl mx-auto">
      <div className="mb-6 flex flex-wrap gap-2 border-b border-border/60 pb-5">
        <button
          type="button"
          onClick={() => setActiveFilter('all')}
          aria-pressed={activeFilter === 'all'}
          className={`px-4 py-1.5 text-sm rounded-full border transition ${
            activeFilter === 'all'
              ? 'border-foreground bg-foreground text-background'
              : 'border-border text-muted-foreground hover:bg-accent hover:text-accent-foreground'
          }`}
        >
          All <span className="text-[11px] opacity-70">{sortedCerts.length}</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveFilter('professional')}
          aria-pressed={activeFilter === 'professional'}
          className={`px-4 py-1.5 text-sm rounded-full border transition ${
            activeFilter === 'professional'
              ? 'border-foreground bg-foreground text-background'
              : 'border-border text-muted-foreground hover:bg-accent hover:text-accent-foreground'
          }`}
        >
          Professional <span className="text-[11px] opacity-70">{categoryCounts.professional}</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveFilter('ctf')}
          aria-pressed={activeFilter === 'ctf'}
          className={`px-4 py-1.5 text-sm rounded-full border transition ${
            activeFilter === 'ctf'
              ? 'border-foreground bg-foreground text-background'
              : 'border-border text-muted-foreground hover:bg-accent hover:text-accent-foreground'
          }`}
        >
          CTF <span className="text-[11px] opacity-70">{categoryCounts.ctf}</span>
        </button>
      </div>

      <div className="divide-y divide-border/40">
        {filteredCerts.map((certification, index) => {
          const isExpanded = expandedId === certification.id;

          return (
            <motion.div
              key={certification.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="group"
            >
              <div className="py-5 flex items-center justify-between gap-4 text-left hover:bg-muted/5 transition-colors px-2 -mx-2 rounded-md">
                <button
                  type="button"
                  onClick={() => toggleExpand(certification.id)}
                  className="flex-1 min-w-0 text-left cursor-pointer"
                  aria-expanded={isExpanded}
                  aria-controls={`project-content-${certification.id}`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-medium text-foreground truncate">{certification.title}</h3>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {certification.badge.slice(0, 4).map((badge, i) => (
                      <span
                        key={i}
                        className="text-[10px] font-mono text-muted-foreground/70 bg-muted/40 px-1.5 py-0.5 rounded"
                      >
                        {badge}
                      </span>
                    ))}
                    {certification.badge.length > 4 && (
                      <span className="text-[10px] font-mono text-muted-foreground/50 px-1">
                        +{certification.badge.length - 4}
                      </span>
                    )}
                  </div>
                </button>

                <div className="flex items-center gap-3 shrink-0">
                  {/* Quick Links - visible on hover */}
                  <div className="hidden sm:flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    {certification.href && (
                      <a
                        href={certification.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 hover:bg-muted rounded transition-colors"
                        aria-label={`View ${certification.title} source code`}
                        onClick={() =>
                          trackEvent('certification_link_click', {
                            source: 'quick_links',
                            type: 'source',
                            certificationId: certification.id,
                          })
                        }
                      >
                        <Github className="h-4 w-4 text-muted-foreground" />
                      </a>
                    )}
                    {certification.live && (
                      <a
                        href={certification.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 hover:bg-muted rounded transition-colors"
                        aria-label={`Visit ${certification.title} live site`}
                        onClick={() =>
                          trackEvent('certification_link_click', {
                            source: 'quick_links',
                            type: 'live',
                            certificationId: certification.id,
                          })
                        }
                      >
                        <ExternalLink className="h-4 w-4 text-muted-foreground" />
                      </a>
                    )}
                    {certification.course && (
                      <a
                        href={certification.course}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 hover:bg-muted rounded transition-colors"
                        aria-label={`Visit ${certification.title} course site`}
                        onClick={() =>
                          trackEvent('certification_link_click', {
                            source: 'quick_links',
                            type: 'course',
                            certificationId: certification.id,
                          })
                        }
                      >
                        <BiCertification className="h-4 w-4 text-muted-foreground" />
                      </a>
                    )}
                  </div>

                  <span className="hidden md:flex items-center gap-1.5 text-xs text-muted-foreground/60 font-mono">
                    <Calendar className="h-3 w-3" />
                    {certification.createdAt}
                  </span>

                  <button
                    type="button"
                    onClick={() => toggleExpand(certification.id)}
                    className="p-1 hover:bg-muted rounded transition-colors"
                    aria-label={isExpanded ? 'Collapse certification details' : 'Expand certification details'}
                  >
                    <ChevronDown
                      className={`h-4 w-4 text-muted-foreground transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''
                        }`}
                    />
                  </button>
                </div>
              </div>

              {/* Expanded Content */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    id={`project-content-${certification.id}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <div className="pb-6 pt-2 px-2 space-y-6">
                      {/* Badge Image */}
                      {certification.badgeImage && (
                        <div className="flex justify-start">
                          <BadgeSheet
                            title={certification.title}
                            image={certification.badgeImage}
                          />
                        </div>
                      )}

                      {/* Description */}
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {certification.description}
                      </p>

                      {/* Skills */}
                      {certification.skills && certification.skills.length > 0 && (
                        <div className="space-y-3">
                          <h4 className="text-xs font-medium uppercase tracking-wider text-muted-foreground/70">
                            Skills Covered
                          </h4>
                          <ul className="grid gap-2">
                            {certification.skills.map((skill, i) => (
                              <li
                                key={i}
                                className="text-sm text-foreground/80 flex items-start gap-2"
                              >
                                <span className="mt-2 h-1 w-1 rounded-full bg-muted-foreground/40 shrink-0" />
                                {skill}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Tech Stack */}
                      <div className="space-y-3">
                        <h4 className="text-xs font-medium uppercase tracking-wider text-muted-foreground/70">
                          Stack
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {certification.badge.map((badge, i) => (
                            <span
                              key={i}
                              className="text-xs font-mono text-muted-foreground bg-muted/50 px-2 py-1 rounded"
                            >
                              {badge}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-3 pt-2">
                        {certification.live && (
                          <a
                            href={certification.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-sm font-medium text-foreground hover:text-foreground/80 transition-colors"
                            onClick={() =>
                              trackEvent('certification_link_click', {
                                source: 'details',
                                type: 'live',
                                certificationId: certification.id,
                              })
                            }
                          >
                            <ExternalLink className="h-4 w-4" />
                            Visit Site
                          </a>
                        )}
                        {certification.course && (
                          <a
                            href={certification.course}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
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
                            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                            onClick={() =>
                              trackEvent('certification_link_click', {
                                source: 'details',
                                type: 'credly',
                                certificationId: certification.id,
                              })
                            }
                          >
                            <SiCredly className="h-4 w-4" />
                            Credly Badge
                          </a>
                        )}
                        {certification.certificateOne && (
                          <a
                            href={certification.certificateOne}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                            onClick={() =>
                              trackEvent('certification_link_click', {
                                source: 'details',
                                type: 'certificate',
                                certificationId: certification.id,
                              })
                            }
                          >
                            <BiCertification className="h-4 w-4" />
                            Certification
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
      {filteredCerts.length === 0 && (
        <div className="mt-6 rounded-xl border border-border bg-muted/25 p-5 text-center text-sm text-muted-foreground">
          No certifications matched this filter.
        </div>
      )}
    </section>
  );
}

export default CertificationsSection;
