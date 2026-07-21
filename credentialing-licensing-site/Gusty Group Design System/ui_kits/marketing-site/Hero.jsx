// Hero — paper section, serif H1 with olive accents, sub, CTA row, bar-chart graphic.
const { Button } = window.GustyGroupDesignSystem_2bd7dd;

function Hero() {
  return (
    <header style={{ background: 'var(--paper)', borderBottom: '1px solid var(--rule)', padding: '112px 0 100px' }}>
      <div className="gg-container" style={{ maxWidth: '1280px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '96px', alignItems: 'center' }}>
          <div style={{ minWidth: 0 }}>
            <h1 style={{
              fontFamily: 'var(--font-display)', fontWeight: 500,
              fontSize: 'clamp(40px, 5.2vw, 64px)', lineHeight: 1.06,
              letterSpacing: '-0.015em', color: 'var(--ink)', maxWidth: '28ch', margin: 0,
            }}>
              Fractional ops and finance for <span style={{ color: 'var(--olive)' }}>healthcare &amp; life sciences</span> founders, early stage through <span style={{ color: 'var(--olive)' }}>growth</span>.
            </h1>
            <p style={{
              marginTop: '22px', fontFamily: 'var(--font-display)',
              fontSize: 'clamp(17px, 1.9vw, 21px)', lineHeight: 1.5,
              maxWidth: '52ch', color: 'var(--ink-soft)',
            }}>
              Gusty Group installs the financial and operating systems your next board meeting, next hire, and next raise will require. You get a senior operator embedded with your team, plus AI-powered systems that outlast the engagement.
            </p>
            <div style={{ marginTop: '32px', display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
              <Button variant="olive" arrow href="#book">Book a 30-minute call</Button>
              <Button variant="ghost-ink" href="#icp">See if we're a fit</Button>
            </div>
          </div>
          <div aria-hidden="true" style={{ width: '100%', maxWidth: '500px', marginLeft: 'auto' }}>
            <svg viewBox="0 0 300 240" style={{ width: '100%', height: 'auto', display: 'block' }}>
              <line x1="20" y1="200" x2="280" y2="200" stroke="#1A1A17" strokeWidth="1" opacity="0.25" />
              <rect x="55" y="140" width="50" height="60" fill="#3D4D2A" />
              <rect x="125" y="90" width="50" height="110" fill="#3D4D2A" />
              <rect x="195" y="30" width="50" height="170" fill="#3D4D2A" />
            </svg>
          </div>
        </div>
      </div>
    </header>
  );
}
window.Hero = Hero;
