import React from 'react';
import { Button } from '../core/Button.jsx';

/**
 * Sticky olive top navigation: text wordmark, link list, outlined CTA.
 * Mirrors nav.top. Wordmark is rendered type (the brand has no logo file).
 */
export function NavBar({
  links = [{ label: 'Client Needs', href: '#icp' }, { label: 'What You Keep', href: '#keep' }, { label: 'Selected Work', href: '#work' }, { label: 'About', href: '#about' }],
  ctaLabel = 'Contact',
  ctaHref = '#book',
  style = {},
  ...rest
}) {
  return (
    <nav style={{
      background: 'var(--olive)', borderBottom: '1px solid var(--olive-deep)',
      padding: '14px 0', ...style,
    }} {...rest}>
      <div style={{
        maxWidth: '1080px', margin: '0 auto', padding: '0 32px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '24px',
      }}>
        <a href="#" aria-label="Gusty Group" style={{
          fontFamily: 'var(--font-display)', fontWeight: 400, color: 'var(--paper)',
          textDecoration: 'none', lineHeight: 0.95, textAlign: 'center', letterSpacing: '0.14em',
        }}>
          <span style={{ display: 'block', fontSize: '20px' }}>GUSTY</span>
          <span style={{ display: 'block', fontSize: '12px', letterSpacing: '0.2em' }}>GROUP</span>
        </a>
        <ul style={{ listStyle: 'none', display: 'flex', gap: '28px', alignItems: 'center', margin: 0, padding: 0 }}>
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} style={{
                color: 'var(--paper)', textDecoration: 'none', fontFamily: 'var(--font-body)',
                fontSize: '14px', fontWeight: 400, padding: '4px 6px',
              }}>{l.label}</a>
            </li>
          ))}
          <li><Button variant="on-dark" size="sm" href={ctaHref}>{ctaLabel}</Button></li>
        </ul>
      </div>
    </nav>
  );
}
