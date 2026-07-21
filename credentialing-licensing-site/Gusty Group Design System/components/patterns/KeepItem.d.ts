import React from 'react';

export interface KeepItemProps {
  /** Serif subhead. */
  title: React.ReactNode;
  children: React.ReactNode;
  style?: React.CSSProperties;
}

/** A cell of the bordered "what you keep" grid — serif subhead + sans body. */
export function KeepItem(props: KeepItemProps): JSX.Element;
