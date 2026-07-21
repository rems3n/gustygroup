import React from 'react';

export interface FaqItemProps {
  /** Serif question shown in the summary row. */
  question: React.ReactNode;
  children: React.ReactNode;
  /** Start expanded. @default false */
  open?: boolean;
  style?: React.CSSProperties;
}

/** Expandable FAQ row (details/summary) with serif question and +/− marker. */
export function FaqItem(props: FaqItemProps): JSX.Element;
