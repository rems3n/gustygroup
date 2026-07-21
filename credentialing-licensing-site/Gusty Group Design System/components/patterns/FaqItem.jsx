import React from 'react';

/**
 * Expandable FAQ row built on <details>/<summary>: serif question, +/−
 * indicator, sans answer, hairline top rule. Mirrors .faq-item.
 */
export function FaqItem({ question, children, open = false, style = {}, ...rest }) {
  return (
    <details open={open} style={{ borderBottom: '1px solid var(--rule)', ...style }} {...rest}>
      <summary style={{
        listStyle: 'none', cursor: 'pointer', padding: '24px 0',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '24px',
        fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: '22px',
        lineHeight: 1.35, color: 'var(--ink)',
      }}>
        <span>{question}</span>
        <span style={{ flexShrink: 0, fontFamily: 'var(--font-body)', fontSize: '16px', color: 'var(--ink-dim)' }}>+</span>
      </summary>
      <div style={{
        padding: '0 0 24px', fontFamily: 'var(--font-body)', fontSize: '15px',
        lineHeight: 1.7, color: 'var(--ink)', maxWidth: '64ch',
      }}>{children}</div>
    </details>
  );
}
