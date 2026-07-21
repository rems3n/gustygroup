import React from 'react';

/**
 * Gusty Group primary action. Flat, square, 1px-bordered — inverts on hover.
 * Variants map to the four button treatments on gustygroup.co.
 */
export function Button({
  children,
  variant = 'primary',
  size = 'md',
  href,
  arrow = false,
  onClick,
  type = 'button',
  disabled = false,
  style = {},
  ...rest
}) {
  const base = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '4px',
    fontFamily: 'var(--font-body)',
    fontWeight: 500,
    textDecoration: 'none',
    cursor: disabled ? 'not-allowed' : 'pointer',
    border: '1px solid',
    borderRadius: 0,
    transition: 'background var(--dur-fast), color var(--dur-fast), border-color var(--dur-fast)',
    opacity: disabled ? 0.45 : 1,
    lineHeight: 1.1,
    whiteSpace: 'nowrap',
  };

  const sizes = {
    sm: { fontSize: '13px', padding: '8px 16px' },
    md: { fontSize: '15px', padding: '12px 22px' },
  };

  const variants = {
    // solid near-black, inverts to paper
    primary: {
      background: 'var(--ink)', color: 'var(--paper)', borderColor: 'var(--ink)',
      ['--hover-bg']: 'var(--paper)', ['--hover-fg']: 'var(--ink)', ['--hover-bd']: 'var(--ink)',
    },
    // solid olive, deepens
    olive: {
      background: 'var(--olive)', color: 'var(--paper)', borderColor: 'var(--olive)',
      ['--hover-bg']: 'var(--olive-deep)', ['--hover-fg']: 'var(--paper)', ['--hover-bd']: 'var(--olive-deep)',
    },
    // outline olive, fills olive
    ghost: {
      background: 'transparent', color: 'var(--olive)', borderColor: 'var(--olive)',
      ['--hover-bg']: 'var(--olive)', ['--hover-fg']: 'var(--paper)', ['--hover-bd']: 'var(--olive)',
    },
    // outline ink, fills ink
    'ghost-ink': {
      background: 'transparent', color: 'var(--ink)', borderColor: 'var(--ink)',
      ['--hover-bg']: 'var(--ink)', ['--hover-fg']: 'var(--paper)', ['--hover-bd']: 'var(--ink)',
    },
    // outline paper — for use on olive surfaces (nav CTA)
    'on-dark': {
      background: 'transparent', color: 'var(--paper)', borderColor: 'var(--paper)',
      ['--hover-bg']: 'var(--paper)', ['--hover-fg']: 'var(--olive)', ['--hover-bd']: 'var(--paper)',
    },
  };

  const merged = { ...base, ...sizes[size], ...variants[variant], ...style };

  const hover = (e) => {
    if (disabled) return;
    const s = e.currentTarget.style;
    s.background = getComputedStyle(e.currentTarget).getPropertyValue('--hover-bg');
    s.color = getComputedStyle(e.currentTarget).getPropertyValue('--hover-fg');
    s.borderColor = getComputedStyle(e.currentTarget).getPropertyValue('--hover-bd');
  };
  const leave = (e) => {
    if (disabled) return;
    const s = e.currentTarget.style;
    s.background = variants[variant].background;
    s.color = variants[variant].color;
    s.borderColor = variants[variant].borderColor;
  };

  const content = (
    <>
      {children}
      {arrow && <span style={{ display: 'inline-block', marginLeft: '2px' }}>&#8599;</span>}
    </>
  );

  const Tag = href && !disabled ? 'a' : 'button';
  const tagProps = href && !disabled ? { href } : { type, disabled };

  return (
    <Tag style={merged} onMouseEnter={hover} onMouseLeave={leave} onClick={onClick} {...tagProps} {...rest}>
      {content}
    </Tag>
  );
}
