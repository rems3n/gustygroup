import React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Optional caption above the field. */
  label?: React.ReactNode;
}

/** Underline-only text input; bottom rule turns oxblood + thickens on focus. */
export function Input(props: InputProps): JSX.Element;
