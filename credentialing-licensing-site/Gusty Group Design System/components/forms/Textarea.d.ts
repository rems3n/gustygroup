import React from 'react';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: React.ReactNode;
}

/** Underline-only multiline field matching Input. */
export function Textarea(props: TextareaProps): JSX.Element;
