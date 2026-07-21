import React from 'react';

export interface CaseStudyStat { value: React.ReactNode; label: React.ReactNode; }

export interface CaseStudyProps {
  /** Meta tag, e.g. "Flagship · 2018 — 2026". */
  tag?: React.ReactNode;
  /** Serif client/company name. */
  title: React.ReactNode;
  /** Serif sub-line under the title. */
  sub?: React.ReactNode;
  /** Body prose (paragraphs). */
  children: React.ReactNode;
  /** Optional metric row. */
  stats?: CaseStudyStat[];
  /** "on-dark" (olive surface, default) or "default" (paper). @default "on-dark" */
  tone?: 'on-dark' | 'default';
  style?: React.CSSProperties;
}

/**
 * Two-column track-record case study with a metric row.
 *
 * @startingPoint section="Patterns" subtitle="Track-record case study block" viewport="1000x400"
 */
export function CaseStudy(props: CaseStudyProps): JSX.Element;
