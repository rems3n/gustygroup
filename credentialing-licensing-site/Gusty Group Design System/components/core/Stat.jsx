import React from 'react';

/**
 * Big serif metric + sans label — the track-record stats ($25M+ / Raised…).
 */
export function Stat({ value, label, tone = 'default', style = {}, ...rest }) {
  const onDark = tone === 'on-dark';
  return (
    <div style={{ ...style }} {...rest}>
      <div style={{
        fontFamily: 'var(--font-display)',
        fontWeight: 500,
        fontSize: '36px',
        lineHeight: 1,
        letterSpacing: '-0.01em',
        color: onDark ? 'var(--paper)' : 'var(--ink)',
      }}>{value}</div>
      <div style={{
        fontFamily: 'var(--font-body)',
        fontSize: '14px',
        lineHeight: 1.4,
        marginTop: '8px',
        maxWidth: '22ch',
        color: onDark ? 'rgba(255,255,255,0.7)' : 'var(--ink-dim)',
      }}>{label}</div>
    </div>
  );
}
