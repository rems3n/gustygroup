// Body sections: Situations, WhatYouKeep, TrackRecord, Founder — composing DS components.
const { SectionHead, SituationCard, KeepItem, CaseStudy } = window.GustyGroupDesignSystem_2bd7dd;

const SITUATIONS = [
  { i: 'i.', t: '\u201CWe just closed our seed.\u201D', b: "Your board now exists. Your runway spreadsheet is already wrong. You're spending half your week on vendor contracts and hiring logistics instead of the work only you can do. We come in for three to six months and build the financial model, board reporting cadence, and operating rhythm your investors now expect." },
  { i: 'ii.', t: '\u201CWe\u2019re raising Series B in six to nine months.\u201D', b: "Your model doesn't tie to your actuals. Your data room is a mess. And you need someone to help prepare for due diligence. We act as your fractional support through the raise: model builds, value creation plans, data room, investor narrative, diligence prep." },
  { i: 'iii.', t: '\u201CWe want to scale without scaling headcount.\u201D', b: "You're watching competitors do more with smaller teams and you know AI is part of the answer, but you don't know what's safe to automate in a regulated environment. We audit your workflows, build the systems you need to scale, and train your team to run them." },
];

const KEEP = [
  { t: 'A financial model that updates itself.', b: 'Wired to your accounting system, your CRM, and your payroll. Actuals flow in automatically. Your runway, burn, and scenario planning stay accurate without a week of month-end cleanup.' },
  { t: 'An Operating Cadence designed around your team.', b: 'Strategic planning frameworks, OKR processes, and tracking systems embedded across the organization.' },
  { t: 'An AI-audited ops stack.', b: 'A documented map of which workflows are automated, which are human, and why. Your team gets a system, not a mess.' },
  { t: 'A Series B-ready data room.', b: 'For founders preparing to raise: the model, the metrics, the narrative, and the diligence answers, organized the way investors actually work through them.' },
];

function Situations() {
  return (
    <section id="icp" style={{ background: 'var(--mist)', padding: '96px 0' }}>
      <div className="gg-container">
        <SectionHead title="Situations we're built for." intro="If one of these sounds like your challenge, we should talk." />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
          {SITUATIONS.map((s) => (
            <SituationCard key={s.i} index={s.i} title={s.t}>{s.b}</SituationCard>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhatYouKeep() {
  return (
    <section id="keep" style={{ padding: '96px 0', borderBottom: '1px solid var(--rule)' }}>
      <div className="gg-container">
        <SectionHead
          title="Most consultants leave behind a deck. Gusty Group leaves behind systems."
          intro="Every engagement produces working infrastructure your team owns and runs after we're gone. No dependency on us, no black boxes." />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', borderTop: '1px solid var(--ink)' }}>
          {KEEP.map((k, idx) => (
            <KeepItem key={idx} title={k.t} style={{
              borderRight: idx % 2 === 0 ? '1px solid var(--rule)' : 0,
              borderBottom: '1px solid var(--rule)',
            }}>{k.b}</KeepItem>
          ))}
        </div>
      </div>
    </section>
  );
}

function TrackRecord() {
  return (
    <section id="work" style={{ background: 'var(--olive)', color: 'var(--paper)', padding: '96px 0' }}>
      <div className="gg-container">
        <SectionHead title="Where we've done this before." tone="on-dark" />
        <CaseStudy
          tag="Flagship · 2018 — 2026"
          title="Mend Labs"
          sub="Health tech startup. Gusty Group founder served as Chief Operating Officer, founding through Series A."
          stats={[
            { value: '$25M+', label: 'Raised, seed through Series A' },
            { value: '0 → 40', label: 'Employees built and managed' },
            { value: '20+', label: 'B2B contracts signed' },
          ]}>
          <p style={{ margin: '0 0 18px' }}>Joined Mend at the founding stage and built the company's full operating system: org structure, operating cadence, OKRs, financial model, and investor narrative. Led $25M+ in fundraising across seed and Series A, owning the model, diligence, and stakeholder management end to end.</p>
          <p style={{ margin: 0 }}>Grew the team to 40+ employees, signed 20+ B2B contracts serving 10,000+ end users, and stood up the internal data infrastructure and AI workflows that ran the business day to day.</p>
        </CaseStudy>
      </div>
    </section>
  );
}

function Founder() {
  return (
    <section id="about" style={{ padding: '96px 0', borderBottom: '1px solid var(--rule)' }}>
      <div className="gg-container">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: '64px' }}>
          <div>
            <h2 style={{
              fontFamily: 'var(--font-display)', fontWeight: 500,
              fontSize: 'clamp(40px, 5.5vw, 56px)', lineHeight: 1.05,
              letterSpacing: '-0.01em', color: 'var(--ink)', maxWidth: '14ch', margin: 0,
            }}>Ten years building from the inside.</h2>
            <img src="../../assets/hero-image.png" alt="Chris Gusty" style={{
              marginTop: '32px', width: '100%', maxWidth: '240px',
              border: '1px solid var(--rule)', filter: 'grayscale(0.3)', display: 'block',
            }} />
          </div>
          <div>
            {[
              "Gusty Group is led by founder Chris Gusty. Chris spent the last decade building from the inside. As COO at Mend Labs, he scaled a venture-backed health tech startup from founding to 40+ employees, led $25M+ in fundraising, and built the operating model, finance function, and go-to-market motion from scratch. Before that, he advised large organizations on technology and operations strategy at Deloitte, leading programs that contributed to $150M+ in contract value.",
              "Gusty Group focuses on healthcare and life sciences specifically because these companies face problems generalist operators do not understand as well as someone who has lived the journey.",
              "We take on a small number of clients at a time so every engagement gets senior operator attention. No associates, no handoffs.",
            ].map((p, i) => (
              <p key={i} style={{ fontFamily: 'var(--font-body)', fontSize: '16px', lineHeight: 1.7, color: 'var(--ink)', margin: '0 0 18px', maxWidth: '60ch' }}>{p}</p>
            ))}
            <div style={{
              marginTop: '32px', paddingTop: '20px', borderTop: '1px solid var(--rule)',
              fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--ink-dim)',
              lineHeight: 1.7, maxWidth: '60ch',
            }}>
              Stanford AI in Healthcare · MIT Drug and Medical Device Development · Financial Modeling and Valuation Analyst (CFI) · Certified Revenue Cycle Representative (HFMA) · AWS Solutions Architect, Associate · BS Mechanical Engineering, University of Maryland · Primary Ventures Mastermind Network
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { Situations, WhatYouKeep, TrackRecord, Founder });
