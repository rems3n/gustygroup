import React from 'react';

/**
 * A cell of the "what you keep" bordered grid — serif subhead + sans body,
 * sharing hairline rules with its neighbours. Mirrors .keep-item.
 */
export function KeepItem({ title, children, style = {}, ...rest }) {
  return (
    <div style={{
      padding: '32px 28px',
      background: 'var(--paper)',
      ...style,
    }} {...rest}>
      <h4 style={{
        fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: '20px',
        lineHeight: 1.3, marginBottom: '12px', maxWidth: '24ch', color: 'var(--ink)',
      }}>{title}</h4>
      <p style={{
        fontFamily: 'var(--font-body)', fontSize: '14px', lineHeight: 1.6,
        color: 'var(--ink)', maxWidth: '44ch', margin: 0,
      }}>{children}</p>
    </div>
  );
}
