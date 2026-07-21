import React from 'react';

/**
 * Section header: large serif H2 + optional serif intro line.
 * Mirrors .section-head across the site.
 */
export function SectionHead({ title, intro, tone = 'default', align = 'left', style = {}, ...rest }) {
  const onDark = tone === 'on-dark';
  return (
    <div style={{ marginBottom: '56px', textAlign: align, ...style }} {...rest}>
      <h2 style={{
        fontFamily: 'var(--font-display)',
        fontWeight: 500,
        fontSize: 'clamp(40px, 6vw, 64px)',
        lineHeight: 1.02,
        letterSpacing: '-0.012em',
        margin: 0,
        maxWidth: '22ch',
        color: onDark ? 'var(--paper)' : 'var(--ink)',
      }}>{title}</h2>
      {intro && (
        <p style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(18px, 2vw, 22px)',
          lineHeight: 1.45,
          maxWidth: '56ch',
          marginTop: '24px',
          color: onDark ? 'rgba(255,255,255,0.88)' : 'var(--ink-soft)',
        }}>{intro}</p>
      )}
    </div>
  );
}
