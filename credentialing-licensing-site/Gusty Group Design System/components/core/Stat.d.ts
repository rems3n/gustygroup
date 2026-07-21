import React from 'react';

export interface StatProps {
  /** The metric, e.g. "$25M+" or "0 → 40". */
  value: React.ReactNode;
  /** Supporting caption below the number. */
  label: React.ReactNode;
  /** Use "on-dark" over olive surfaces. @default "default" */
  tone?: 'default' | 'on-dark';
  style?: React.CSSProperties;
}

/** Big serif metric with a muted sans caption — track-record stats. */
export function Stat(props: StatProps): JSX.Element;
