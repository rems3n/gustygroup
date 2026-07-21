import React from 'react';

/**
 * Underline-only text input — no box, no radius; the bottom rule turns
 * oxblood and thickens on focus. Mirrors .contact-form input.
 */
export function Input({ label, type = 'text', style = {}, ...rest }) {
  const [focus, setFocus] = React.useState(false);
  return (
    <label style={{ display: 'block', width: '100%' }}>
      {label && (
        <span style={{
          display: 'block', fontFamily: 'var(--font-body)', fontSize: '13px',
          color: 'var(--ink-dim)', marginBottom: '6px',
        }}>{label}</span>
      )}
      <input
        type={type}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        style={{
          width: '100%',
          fontFamily: 'var(--font-body)',
          fontSize: '15px',
          color: 'var(--ink)',
          padding: focus ? '12px 0 7px' : '12px 0 8px',
          border: 0,
          borderBottom: focus ? '2px solid var(--oxblood)' : '1px solid var(--ink)',
          background: 'transparent',
          outline: 'none',
          borderRadius: 0,
          ...style,
        }}
        {...rest}
      />
    </label>
  );
}
