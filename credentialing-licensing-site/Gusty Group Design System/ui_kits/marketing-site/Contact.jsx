// FAQ + Contact + Footer.
const { SectionHead, FaqItem, Button, Input, Textarea } = window.GustyGroupDesignSystem_2bd7dd;

const FAQS = [
  { q: 'How do engagements typically work?', a: 'After aligning on scope, we embed with your team and review your financials, operations, and systems. From there, engagements typically run three to six months at a defined weekly time commitment or deliverable output. For fundraising support, engagements are scoped to the raise itself.' },
  { q: 'What does it cost?', a: "Engagements are priced by scope and time commitment, not hourly. A typical three to six month embedded engagement runs in the range of a senior operator's fractional salary, well below the fully loaded cost of a full-time hire. We'll give you a firm number after the diagnostic." },
  { q: 'How is this different from hiring a COO or CFO full time?', a: 'You get senior operator experience from day one, with no 90-day ramp, no equity package, and no long-term commitment. When your company is ready for a full-time leader, we help you hire them and hand off cleanly.' },
  { q: 'Do you work with companies outside Healthcare and Life Sciences?', a: "Occasionally, when the problem fits and the timing works. But Gusty Group's deepest value is in regulated health and life sciences contexts, and that's where we focus." },
  { q: 'What stages do you work with?', a: "While it depends on each engagement, Seed through Series B is our sweet spot. Earlier than seed usually doesn't have the budget or the problems that justify fractional ops. Later than Series B usually needs full-time leadership." },
];

function Faq() {
  return (
    <section style={{ background: 'var(--paper)', padding: '96px 0', borderBottom: '1px solid var(--rule)' }}>
      <div className="gg-container">
        <SectionHead title="The obvious questions, answered." />
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ borderTop: '1px solid var(--ink)' }}>
            {FAQS.map((f, i) => (
              <FaqItem key={i} question={f.q} open={i === 0}
                style={i === FAQS.length - 1 ? { borderBottom: '1px solid var(--ink)' } : {}}>{f.a}</FaqItem>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [sent, setSent] = React.useState(false);
  return (
    <section id="book" style={{ background: 'var(--paper)', padding: '120px 0 96px' }}>
      <div className="gg-container">
        <div style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--ink-dim)', marginBottom: '18px' }}>Contact</div>
        <h2 style={{
          fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 'clamp(48px, 7vw, 88px)',
          lineHeight: 0.96, letterSpacing: '-0.02em', color: 'var(--ink)', maxWidth: '18ch', margin: '0 0 28px',
        }}>Let's see if this is a fit.</h2>
        <p style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(18px, 2vw, 22px)', lineHeight: 1.45, color: 'var(--ink)', maxWidth: '56ch', margin: '0 0 40px' }}>
          Thirty minutes, no prep required. Bring the problem you're wrestling with this week and we'll figure out whether Gusty Group can help — or whether someone else is the better call.
        </p>
        <Button variant="olive" arrow href="#book">Book a 30-minute call</Button>
        <div style={{ marginTop: '56px', maxWidth: '480px' }}>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--ink-dim)', marginBottom: '16px', paddingBottom: '12px', borderBottom: '1px solid var(--rule)' }}>Or reach out directly</p>
          {sent ? (
            <p style={{ fontFamily: 'var(--font-display)', fontSize: '20px', color: 'var(--olive)' }}>Thanks — we'll be in touch shortly.</p>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
              <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
                <div style={{ flex: 1, minWidth: '180px' }}><Input placeholder="Name" required /></div>
                <div style={{ flex: 1, minWidth: '180px' }}><Input placeholder="Email" type="email" required /></div>
              </div>
              <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
                <div style={{ flex: 1, minWidth: '180px' }}><Input placeholder="Company" /></div>
                <div style={{ flex: 1, minWidth: '180px' }}><Input placeholder="Phone" type="tel" /></div>
              </div>
              <Textarea placeholder="What can we help with?" rows={3} />
              <Button variant="primary" type="submit" style={{ alignSelf: 'flex-start', marginTop: '12px' }}>Send</Button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

function SiteFooter() {
  return (
    <footer style={{ background: 'var(--paper)', borderTop: '1px solid var(--ink)', padding: '48px 0 96px', fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--ink-dim)' }}>
      <div className="gg-container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: '18px' }}>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '18px', color: 'var(--ink)' }}>Gusty Group</div>
          <div style={{ display: 'flex', gap: '24px' }}>
            <a href="#">LinkedIn</a><a href="#">Email</a><a href="#book">Book a Call</a>
          </div>
        </div>
        <div style={{ marginTop: '28px', paddingTop: '22px', borderTop: '1px solid var(--rule)', fontSize: '13px', lineHeight: 1.5 }}>
          © 2026 Gusty Group LLC. Fractional ops and finance for health tech and biotech founders.
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, { Faq, Contact, SiteFooter });
