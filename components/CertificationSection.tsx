'use client';

import React, { useState } from 'react';
import { ChevronDown, ExternalLink, Github, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { BiCertification } from "react-icons/bi";
import { FaBookOpen } from "react-icons/fa";
import { SiCredly } from 'react-icons/si';
import { BadgeSheet } from './BadgeSheet';

import { certifications } from '@/data/certifications';

function CertificationsSection() {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const sortedCerts = [...certifications].sort((a, b) => {
    const dateA = new Date(a.createdAt.split('-').reverse().join('-'));
    const dateB = new Date(b.createdAt.split('-').reverse().join('-'));
    return dateB.getTime() - dateA.getTime();
  });

  return (
    <section className="max-w-3xl mx-auto">
      <div className="divide-y divide-border/40">
        {sortedCerts.map((certification, index) => {
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
                  {...(isExpanded && { 'aria-expanded': 'true' })}
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
                    onClick={() => toggleExpand(certification.id)}
                    className="p-1 hover:bg-muted rounded transition-colors"
                    aria-label={isExpanded ? 'Collapse project details' : 'Expand project details'}
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
    </section>
  );
}

export default CertificationsSection;