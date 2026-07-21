import React from 'react';

export interface ButtonProps {
  children: React.ReactNode;
  /** Visual treatment. @default "primary" */
  variant?: 'primary' | 'olive' | 'ghost' | 'ghost-ink' | 'on-dark';
  /** @default "md" */
  size?: 'sm' | 'md';
  /** Render as an anchor when set. */
  href?: string;
  /** Append the ↗ up-right arrow used on booking CTAs. @default false */
  arrow?: boolean;
  onClick?: (e: React.MouseEvent) => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  style?: React.CSSProperties;
}

/**
 * Flat, square, 1px-bordered button that inverts fill/text on hover — the
 * Gusty Group action primitive.
 *
 * @startingPoint section="Core" subtitle="Primary, olive, ghost & on-dark buttons" viewport="700x200"
 */
export function Button(props: ButtonProps): JSX.Element;
