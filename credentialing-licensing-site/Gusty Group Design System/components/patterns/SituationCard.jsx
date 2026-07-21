import React from 'react';

/**
 * Numbered situation card — paper card, hairline border, roman-numeral index
 * in olive serif, olive border + lift on hover. Mirrors .situation.
 */
export function SituationCard({ index, title, children, moreLabel = 'See how this works', moreHref = '#', style = {}, ...rest }) {
  const [hover, setHover] = React.useState(false);
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        background: 'var(--paper)',
        border: hover ? '1px solid var(--olive)' : '1px solid rgba(26,26,23,0.12)',
        borderRadius: '4px',
        padding: '32px 28px 28px',
        display: 'flex',
        flexDirection: 'column',
        minHeight: '380px',
        transform: hover ? 'translateY(-2px)' : 'none',
        transition: 'border-color 0.18s, transform 0.18s',
        ...style,
      }}
      {...rest}
    >
      <div style={{
        fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: '32px',
        lineHeight: 1, color: 'var(--olive)', marginBottom: '18px',
      }}>{index}</div>
      <h3 style={{
        fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: '22px',
        lineHeight: 1.3, letterSpacing: '-0.005em', color: 'var(--ink)', margin: '0 0 16px',
      }}>{title}</h3>
      <p style={{
        fontFamily: 'var(--font-body)', fontSize: '14.5px', lineHeight: 1.65,
        color: 'var(--ink-soft)', margin: '0 0 24px', flexGrow: 1,
      }}>{children}</p>
      <a href={moreHref} style={{
        alignSelf: 'flex-start', fontFamily: 'var(--font-body)', fontSize: '14px',
        color: 'var(--ink)', textDecoration: 'underline', textUnderlineOffset: '4px',
        textDecorationColor: 'rgba(0,0,0,0.4)',
      }}>{moreLabel} &#8594;</a>
    </div>
  );
}
