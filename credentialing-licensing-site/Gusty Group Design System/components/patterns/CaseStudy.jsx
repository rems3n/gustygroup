import React from 'react';
import { Tag } from '../core/Tag.jsx';
import { Stat } from '../core/Stat.jsx';

/**
 * Track-record case study block, designed for the olive surface: meta column
 * (tag + serif title + sub) beside a body column of prose and a stat row.
 * Mirrors .case.
 */
export function CaseStudy({ tag, title, sub, children, stats = [], tone = 'on-dark', style = {}, ...rest }) {
  const onDark = tone === 'on-dark';
  const rule = onDark ? 'rgba(255,255,255,0.22)' : 'var(--rule)';
  return (
    <div style={{
      display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: '48px',
      padding: '32px 0', borderTop: `1px solid ${rule}`, ...style,
    }} {...rest}>
      <div>
        {tag && <div style={{ marginBottom: '12px' }}><Tag tone={onDark ? 'on-dark' : 'muted'}>{tag}</Tag></div>}
        <h3 style={{
          fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: '32px',
          lineHeight: 1.1, letterSpacing: '-0.01em', marginBottom: '12px',
          color: onDark ? 'var(--paper)' : 'var(--ink)',
        }}>{title}</h3>
        {sub && <p style={{
          fontFamily: 'var(--font-display)', fontSize: '18px', lineHeight: 1.4,
          maxWidth: '32ch', color: onDark ? 'rgba(255,255,255,0.72)' : 'var(--ink-dim)',
        }}>{sub}</p>}
      </div>
      <div>
        <div style={{
          fontFamily: 'var(--font-body)', fontSize: '16px', lineHeight: 1.65,
          color: onDark ? 'rgba(255,255,255,0.92)' : 'var(--ink-soft)',
        }}>{children}</div>
        {stats.length > 0 && (
          <div style={{
            display: 'flex', gap: '48px', marginTop: '24px', paddingTop: '18px',
            borderTop: `1px solid ${rule}`, flexWrap: 'wrap',
          }}>
            {stats.map((s, i) => <Stat key={i} value={s.value} label={s.label} tone={tone} />)}
          </div>
        )}
      </div>
    </div>
  );
}
