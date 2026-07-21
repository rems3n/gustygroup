import React from 'react';

export interface SituationCardProps {
  /** Roman-numeral or short index, e.g. "i.", "ii.". */
  index: React.ReactNode;
  /** Serif card title (often a quoted client line). */
  title: React.ReactNode;
  children: React.ReactNode;
  /** @default "See how this works" */
  moreLabel?: string;
  moreHref?: string;
  style?: React.CSSProperties;
}

/**
 * Numbered "situation" card: paper, hairline border, olive serif index,
 * olive border + lift on hover.
 *
 * @startingPoint section="Patterns" subtitle="Numbered situation / offer card" viewport="380x420"
 */
export function SituationCard(props: SituationCardProps): JSX.Element;
