import React from 'react';

export interface TagProps {
  children: React.ReactNode;
  /** @default "muted" */
  tone?: 'muted' | 'on-dark' | 'accent';
  style?: React.CSSProperties;
}

/** Small meta label used above headlines and case studies. */
export function Tag(props: TagProps): JSX.Element;
