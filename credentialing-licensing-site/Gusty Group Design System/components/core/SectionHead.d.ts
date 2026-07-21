import React from 'react';

export interface SectionHeadProps {
  /** Serif section headline. */
  title: React.ReactNode;
  /** Optional serif intro line under the headline. */
  intro?: React.ReactNode;
  /** "on-dark" for olive sections. @default "default" */
  tone?: 'default' | 'on-dark';
  /** @default "left" */
  align?: 'left' | 'center';
  style?: React.CSSProperties;
}

/**
 * Large EB Garamond section headline with optional serif intro.
 *
 * @startingPoint section="Core" subtitle="Serif section header + intro" viewport="900x320"
 */
export function SectionHead(props: SectionHeadProps): JSX.Element;
