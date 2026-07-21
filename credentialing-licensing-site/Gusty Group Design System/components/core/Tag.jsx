import React from 'react';

/**
 * Small meta label — the uppercase-adjacent tags above case studies
 * ("Flagship · 2018 — 2026") and the muted labels above headlines.
 */
export function Tag({ children, tone = 'muted', style = {}, ...rest }) {
  const tones = {
    muted: { color: 'var(--ink-dim)' },
    'on-dark': { color: 'rgba(255,255,255,0.7)' },
    accent: { color: 'var(--olive)' },
  };
  return (
    <span
      style={{
        fontFamily: 'var(--font-body)',
        fontSize: '14px',
        fontWeight: 400,
        lineHeight: 1.4,
        ...tones[tone],
        ...style,
      }}
      {...rest}
    >
      {children}
    </span>
  );
}
