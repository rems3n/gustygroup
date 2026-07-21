import React from 'react';

export interface NavLink { label: string; href: string; }

export interface NavBarProps {
  /** Nav links (right-aligned before the CTA). */
  links?: NavLink[];
  /** @default "Contact" */
  ctaLabel?: string;
  /** @default "#book" */
  ctaHref?: string;
  style?: React.CSSProperties;
}

/**
 * Sticky olive top navigation: rendered-type wordmark, link list, outlined CTA.
 *
 * @startingPoint section="Navigation" subtitle="Olive sticky top nav" viewport="1080x72"
 */
export function NavBar(props: NavBarProps): JSX.Element;
