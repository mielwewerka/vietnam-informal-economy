// ========================================
// VIETNAM 2045 — POLICY OVERVIEW
// Four-part policy memo structure:
// A. Problems & Issues
// B. Current Government Plan
// C. Potential Adjustments
// D. Merits & Pitfalls
// Save as src/components/Vietnam2045.js
// ========================================

import React, { useState, useEffect, useRef } from 'react';

function useInView(threshold = 0.12) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

function Fade({ children, delay = 0 }) {
  const [ref, visible] = useInView();
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(22px)',
      transition: `opacity 0.65s ease ${delay}s, transform 0.65s ease ${delay}s`,
    }}>
      {children}
    </div>
  );
}

function SectionLabel({ children, color = '#00897b' }) {
  return (
    <div style={{
      fontSize: '11px', fontWeight: '700', color,
      letterSpacing: '2.5px', textTransform: 'uppercase',
      marginBottom: '14px', fontFamily: '"Inter", sans-serif',
    }}>{children}</div>
  );
}

// Anchor nav IDs
const SECTIONS = [
  { id: 'problems', label: 'A. Problems', color: '#c2410c' },
  { id: 'plan', label: 'B. Gov\'t Plan', color: '#00897b' },
  { id: 'adjustments', label: 'C. Adjustments', color: '#1e6fa8' },
  { id: 'merits', label: 'D. Merits & Pitfalls', color: '#7c3aed' },
];

export default function Vietnam2045({ onBack, onNavigate }) {
  const [activeSection, setActiveSection] = useState('problems');
  const [navScrolled, setNavScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setNavScrolled(window.scrollY > 120);
      // Update active section based on scroll position
      for (const s of [...SECTIONS].reverse()) {
        const el = document.getElementById(s.id);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActiveSection(s.id);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const TEAL = '#00897b';

  return (
    <div style={{ fontFamily: '"Georgia", "Times New Roman", serif', background: '#fafafa', color: '#1a1a1a', minHeight: '100vh' }}>

      {/* ── STICKY NAV ──────────────────────────── */}
      <div style={{
        position: 'sticky', top: 0, zIndex: 100,
        background: 'white', borderBottom: '1px solid #e0e0e0',
        boxShadow: navScrolled ? '0 1px 8px rgba(0,0,0,0.06)' : 'none',
        transition: 'box-shadow 0.3s',
      }}>
        <div style={{ padding: '12px 48px', display: 'flex', alignItems: 'center', gap: '0', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <button onClick={onBack} style={{
              background: 'none', border: 'none', cursor: 'pointer',
              fontSize: '13px', fontWeight: '600', color: TEAL,
              fontFamily: '"Inter", sans-serif', padding: 0,
            }}>← Back</button>
            <span style={{ color: '#ddd' }}>|</span>
            <span style={{ fontSize: '13px', color: '#999', fontFamily: '"Inter", sans-serif' }}>
              Chapter III — The Stakes
            </span>
          </div>
          {/* Section jump links */}
          <div style={{ display: 'flex', gap: '4px' }}>
            {SECTIONS.map(s => (
              <button key={s.id} onClick={() => scrollTo(s.id)} style={{
                background: activeSection === s.id ? s.color : 'transparent',
                border: `1px solid ${activeSection === s.id ? s.color : '#e0e0e0'}`,
                color: activeSection === s.id ? 'white' : '#888',
                padding: '6px 14px', fontSize: '11px', fontWeight: '600',
                cursor: 'pointer', fontFamily: '"Inter", sans-serif',
                letterSpacing: '0.3px', transition: 'all 0.2s',
              }}>{s.label}</button>
            ))}
          </div>
        </div>
      </div>

      {/* ── HERO ────────────────────────────────── */}
      <header style={{
        background: '#1a1a1a', color: 'white',
        padding: '80px 48px 72px', position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: `linear-gradient(90deg, ${TEAL}, #26a69a)` }} />
        <div style={{ maxWidth: '820px' }}>
          <div style={{ fontSize: '11px', fontWeight: '700', color: TEAL, letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '8px', fontFamily: '"Inter", sans-serif' }}>
            Chapter III · Policy Overview
          </div>
          <h1 style={{ fontSize: 'clamp(32px, 5vw, 58px)', fontWeight: '400', lineHeight: '1.1', margin: '0 0 24px 0', letterSpacing: '-1.5px' }}>
            The Stakes:<br />Vietnam 2045 and the<br />Formalization Imperative
          </h1>
          <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.6)', lineHeight: '1.75', margin: '0 0 32px 0', maxWidth: '640px', fontFamily: '"Inter", sans-serif' }}>
            Vietnam's high-income ambition is credible but not inevitable. This section examines the structural problems blocking it, the government's current response, what adjustments the evidence suggests, and an honest assessment of what could go right — and wrong.
          </p>
          {/* Quick stat row */}
          <div style={{ display: 'flex', gap: '1px', background: '#2a2a2a', maxWidth: '680px' }}>
            {[
              ['2045', 'Target year for high-income status'],
              ['7–8%', 'Required annual GDP growth rate'],
              ['7.3%', 'GDP share needed in public investment annually'],
              ['60%', 'Social insurance coverage target by 2030'],
            ].map(([n, l]) => (
              <div key={n} style={{ background: '#1a1a1a', padding: '20px 20px', flex: 1 }}>
                <div style={{ fontSize: '22px', fontWeight: '400', color: TEAL, letterSpacing: '-0.5px', marginBottom: '4px' }}>{n}</div>
                <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', fontFamily: '"Inter", sans-serif', lineHeight: '1.4' }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* ── WHAT IS VIETNAM 2045 ─────────────────── */}
      <div style={{ background: 'white', borderBottom: '1px solid #e0e0e0' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '72px 48px' }}>
          <Fade>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'start' }}>
              <div>
                <div style={{ fontSize: '11px', fontWeight: '700', color: TEAL, letterSpacing: '2.5px', textTransform: 'uppercase', marginBottom: '16px', fontFamily: '"Inter", sans-serif' }}>
                  What is Vietnam 2045?
                </div>
                <h2 style={{ fontSize: 'clamp(22px, 3vw, 34px)', fontWeight: '400', color: '#1a1a1a', margin: '0 0 24px 0', lineHeight: '1.2', letterSpacing: '-0.5px' }}>
                  Vietnam's plan to become a high-income country by the centennial of its founding
                </h2>
                <p style={{ fontSize: '16px', color: '#444', lineHeight: '1.85', margin: '0 0 18px 0' }}>
                  In 2021, Vietnam's Communist Party formally adopted Resolution 29/NQ-TW — a long-term development strategy targeting high-income status by 2045, the 100th anniversary of the Socialist Republic of Vietnam. The ambition is real: Vietnam needs to roughly triple its GDP per capita from around $4,300 today to the World Bank's high-income threshold of approximately $14,000.
                </p>
                <p style={{ fontSize: '16px', color: '#444', lineHeight: '1.85', margin: 0 }}>
                  The strategy rests on five pillars: sustained 7–8% annual GDP growth, large-scale public infrastructure investment (7.3% of GDP annually), institutional modernization, human capital development, and expanded social protection. Each pillar requires fiscal capacity — tax revenue — that Vietnam's current informal economy structurally limits.
                </p>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0', background: '#fafafa', border: '1px solid #e8e4e0' }}>
                <div style={{ padding: '24px 28px', borderBottom: '1px solid #e8e4e0' }}>
                  <div style={{ fontSize: '11px', fontWeight: '700', color: TEAL, fontFamily: '"Inter", sans-serif', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '10px' }}>The Five Pillars</div>
                  {[
                    ['Sustained Growth', '7–8% annual GDP growth through 2045'],
                    ['Public Investment', '7.3% of GDP annually in infrastructure'],
                    ['Institutional Reform', 'Modernize governance and reduce bureaucracy'],
                    ['Human Capital', 'Education, skills, and workforce quality'],
                    ['Social Protection', 'Universal health and pension coverage'],
                  ].map(([title, desc]) => (
                    <div key={title} style={{ display: 'flex', gap: '14px', alignItems: 'flex-start', padding: '10px 0', borderBottom: '1px solid #f0ece8' }}>
                      <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: TEAL, marginTop: '6px', flexShrink: 0 }} />
                      <div>
                        <div style={{ fontSize: '13px', fontWeight: '600', color: '#1a1a1a', marginBottom: '2px', fontFamily: '"Inter", sans-serif' }}>{title}</div>
                        <div style={{ fontSize: '12px', color: '#999', fontFamily: '"Inter", sans-serif' }}>{desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <div style={{ padding: '20px 28px', background: '#1a1a1a' }}>
                  <div style={{ fontSize: '11px', fontWeight: '700', color: '#4dd0c4', fontFamily: '"Inter", sans-serif', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '8px' }}>The Constraint</div>
                  <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)', lineHeight: '1.7', margin: 0, fontFamily: '"Inter", sans-serif' }}>
                    Every pillar depends on fiscal capacity. Vietnam's tax-to-GDP ratio of 18–19% is roughly four points below the regional average — a gap driven largely by the 64.5% of workers outside the formal tax base. This is the connection between informality and 2045.
                  </p>
                </div>
              </div>
            </div>
          </Fade>
        </div>
      </div>

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 48px' }}>

        {/* ══════════════════════════════════════════
            A. PROBLEMS & ISSUES
        ══════════════════════════════════════════ */}
        <div id="problems" style={{ padding: '80px 0 0 0' }}>
          <Fade>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '48px' }}>
              <div style={{ background: '#c2410c', color: 'white', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: '700', fontFamily: '"Inter", sans-serif', flexShrink: 0 }}>A</div>
              <div>
                <SectionLabel color="#c2410c">Problems &amp; Issues</SectionLabel>
                <h2 style={{ fontSize: 'clamp(22px, 3vw, 34px)', fontWeight: '400', margin: 0, letterSpacing: '-0.5px', lineHeight: '1.2' }}>
                  Why informality persists — and why it matters fiscally
                </h2>
              </div>
            </div>
          </Fade>

          <Fade>
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '64px', marginBottom: '48px' }}>
              <div>
                <p style={{ fontSize: '17px', color: '#333', lineHeight: '1.85', margin: '0 0 20px 0' }}>
                  Vietnam's informal economy is not a residual of underdevelopment waiting to dissolve as incomes rise. It is structurally reproduced by the same forces driving growth. The core problem is a low formal wage premium: in 2021, the median formal wage was only 18% above the median informal wage, after controlling for observable characteristics. That gap is too small to make the costs of formalization — social insurance contributions, compliance obligations, registration fees — worth bearing for most workers or small firms.
                </p>
                <p style={{ fontSize: '17px', color: '#333', lineHeight: '1.85', margin: '0 0 20px 0' }}>
                  This creates a fiscal trap with three reinforcing mechanisms. First, a narrow tax base: 64.5% of workers contribute nothing to income tax or social insurance, holding Vietnam's tax-to-GDP ratio at 18–19% — roughly four percentage points below the regional average and well below the 25%+ common among high-income OECD countries. Second, underfunded social protection: the social insurance system covers only ~38% of workers, leaving the majority without pensions or unemployment insurance, which in turn weakens the incentive to formalize. Third, an investment gap: insufficient revenue constrains public investment to below the 7.3% of GDP the World Bank estimates is needed to sustain high growth to 2045.
                </p>
                <p style={{ fontSize: '17px', color: '#333', lineHeight: '1.85', margin: 0 }}>
                  The geography of the problem matters too. Provincial data reveals extreme concentration: the Mekong Delta and Central Highlands have informality rates above 80%, driven by agricultural dominance. Urban centers like Hanoi and HCMC show lower rates (~45–50%) but face a different challenge — growing service-sector informality as migration outpaces formal job creation. These are structurally distinct problems that require different policy responses.
                </p>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', paddingTop: '4px' }}>
                {[
                  { label: 'The contribution burden problem', body: 'Combined employer + employee social insurance contributions total 32% of wages — one of the highest rates in Southeast Asia. For small firms operating on thin margins, this is often the decisive reason to stay informal.' },
                  { label: 'The benefit perception problem', body: 'Only 5% of informal workers voluntarily enroll in social insurance even when eligible. Most do not believe the benefits — especially pensions 20–30 years away — justify current contributions.' },
                  { label: 'The enforcement problem', body: 'Vietnam\'s labor inspectorate has roughly one inspector per 50,000 workers. Enforcement-led formalization is not feasible at this staffing level, particularly in rural and agricultural areas.' },
                ].map(({ label, body }) => (
                  <div key={label} style={{ borderLeft: '3px solid #c2410c', paddingLeft: '18px' }}>
                    <div style={{ fontSize: '13px', fontWeight: '700', color: '#1a1a1a', marginBottom: '6px', fontFamily: '"Inter", sans-serif' }}>{label}</div>
                    <div style={{ fontSize: '13px', color: '#777', lineHeight: '1.65', fontFamily: '"Inter", sans-serif' }}>{body}</div>
                  </div>
                ))}
              </div>
            </div>
          </Fade>

          {/* Problem cards */}
          <Fade>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2px', background: '#e0e0e0', marginBottom: '0' }}>
              {[
                {
                  title: 'The fiscal trap',
                  body: 'Low formalization → narrow tax base → insufficient public investment → slow structural transformation → low formal wage premium → low formalization. Vietnam is caught in this loop. Breaking it requires intervention at multiple points simultaneously.',
                  icon: '⟳',
                },
                {
                  title: 'Agricultural lock-in',
                  body: 'With 97.9% informality in agriculture, the 35% of workers still in farming are essentially beyond the reach of conventional formalization policy. Their transition to formal employment depends on structural change — urbanization and sectoral shift — not administrative reform.',
                  icon: '⊠',
                },
                {
                  title: 'The middle-income trap risk',
                  body: 'Vietnam risks joining the many countries that achieved lower-middle income but stalled before high-income status. The World Bank identifies institutional quality — including fiscal capacity — as the decisive variable separating those that break through from those that don\'t.',
                  icon: '▲',
                },
              ].map(({ title, body, icon }) => (
                <div key={title} style={{ background: 'white', padding: '32px', borderTop: '3px solid #c2410c' }}>
                  <div style={{ fontSize: '20px', marginBottom: '12px' }}>{icon}</div>
                  <h4 style={{ fontSize: '16px', fontWeight: '400', margin: '0 0 12px 0', letterSpacing: '-0.2px' }}>{title}</h4>
                  <p style={{ fontSize: '13px', color: '#666', lineHeight: '1.7', margin: 0, fontFamily: '"Inter", sans-serif' }}>{body}</p>
                </div>
              ))}
            </div>
          </Fade>
        </div>

        <div style={{ borderTop: '1px solid #e0e0e0', margin: '80px 0 0 0' }} />

        {/* ══════════════════════════════════════════
            B. CURRENT GOVERNMENT PLAN
        ══════════════════════════════════════════ */}
        <div id="plan" style={{ padding: '80px 0 0 0' }}>
          <Fade>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '48px' }}>
              <div style={{ background: TEAL, color: 'white', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: '700', fontFamily: '"Inter", sans-serif', flexShrink: 0 }}>B</div>
              <div>
                <SectionLabel color={TEAL}>Current Government Plan</SectionLabel>
                <h2 style={{ fontSize: 'clamp(22px, 3vw, 34px)', fontWeight: '400', margin: 0, letterSpacing: '-0.5px', lineHeight: '1.2' }}>
                  Resolution 29 and the 2045 institutional reform agenda
                </h2>
              </div>
            </div>
          </Fade>

          <Fade>
            <p style={{ fontSize: '17px', color: '#333', lineHeight: '1.85', margin: '0 0 48px 0', maxWidth: '760px' }}>
              Vietnam's formalization and fiscal reform strategy is embedded across several overlapping policy frameworks. The most comprehensive is the 2045 institutional reform agenda articulated in the World Bank's <em>Breaking Through</em> report and reflected in Resolution 29/NQ-TW. The core logic: institutional quality, not just investment volume, determines whether Vietnam escapes the middle-income trap.
            </p>
          </Fade>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2px', background: '#e0e0e0', marginBottom: '48px' }}>
            {[
              {
                tag: 'Social Insurance Reform',
                color: TEAL,
                title: '60% social insurance coverage by 2030',
                body: 'The 2024 Social Insurance Law significantly expanded mandatory enrollment — extending coverage to enterprise owners, household business operators, and part-time workers previously excluded. Voluntary enrollment mechanisms for the self-employed have been simplified. The government has set an explicit target of 60% workforce coverage by 2030, up from approximately 38% today. This is the single most direct formalization lever in current policy.',
                source: '2024 Social Insurance Law; Resolution 29/NQ-TW',
              },
              {
                tag: 'Tax Administration',
                color: '#1e6fa8',
                title: 'Electronic tax filing, simplified business registration',
                body: 'Vietnam has dramatically expanded e-tax filing, reducing compliance costs for registered businesses. The one-stop business registration portal has cut registration time significantly. Tax threshold reforms have been discussed to bring micro-enterprises into the tax net at low rates before requiring full compliance — a graduated formalization approach consistent with ILO Recommendation No. 204.',
                source: 'Vietnam General Tax Department; World Bank Doing Business',
              },
              {
                tag: 'Intergovernmental Fiscal Reform',
                color: '#7c3aed',
                title: 'Revising VAT, CIT, and PIT sharing formulas',
                body: 'The 2045 plan calls for reforming fiscal sharing arrangements between central and provincial governments — adjusting VAT, corporate income tax, and personal income tax allocations to better match where economic activity and population growth are occurring, particularly in fast-growing metros. New own-source revenue instruments are under discussion, including property taxes and PIT surtaxes at the subnational level.',
                source: 'Viet Nam 2045: Breaking Through, Chapter 4',
              },
              {
                tag: 'Public Administration',
                color: '#c2410c',
                title: 'Streamlining government and civil service reform',
                body: 'Beginning in August 2024, Vietnam launched the most significant administrative restructuring since Doi Moi — consolidating ministries, reducing the number of provincial units, and trimming the civil service by approximately 20%. The goal is to reduce bureaucratic overhead and improve the efficiency of public investment implementation, which has consistently disbursed below annual targets. Civil servant salaries rose 30% in July 2024.',
                source: 'Resolution 18-NQ/TW; World Bank 2045 Report',
              },
            ].map(({ tag, color, title, body, source }) => (
              <Fade key={title}>
                <div style={{ background: 'white', padding: '36px', borderTop: `3px solid ${color}` }}>
                  <div style={{ fontSize: '10px', fontWeight: '700', color, fontFamily: '"Inter", sans-serif', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '10px' }}>{tag}</div>
                  <h4 style={{ fontSize: '17px', fontWeight: '400', margin: '0 0 14px 0', lineHeight: '1.3' }}>{title}</h4>
                  <p style={{ fontSize: '13px', color: '#666', lineHeight: '1.75', margin: '0 0 14px 0', fontFamily: '"Inter", sans-serif' }}>{body}</p>
                  <div style={{ fontSize: '11px', color: '#bbb', fontFamily: '"Inter", sans-serif', fontStyle: 'italic' }}>{source}</div>
                </div>
              </Fade>
            ))}
          </div>

          {/* Comparative context — dark callout */}
          <Fade>
            <div style={{ background: '#1a1a1a', padding: '48px' }}>
              <SectionLabel color="#4dd0c4">Comparative Context</SectionLabel>
              <h3 style={{ fontSize: '22px', fontWeight: '400', color: 'white', margin: '0 0 24px 0', letterSpacing: '-0.3px' }}>
                What South Korea and Chile show about this transition
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1px', background: '#2a2a2a' }}>
                {[
                  {
                    country: 'South Korea',
                    years: '1970s–1990s',
                    income: 'Lower-middle → high-income',
                    mechanism: 'Formalization followed rapid industrialization and rising formal wages, not enforcement. The formal wage premium rose as manufacturing productivity increased, making formality self-selecting. Social insurance expansion tracked wage growth rather than leading it.',
                    lesson: 'The formal wage premium is the lever. When formal work pays significantly more than informal work — not just marginally more — workers and firms choose it without coercion.',
                  },
                  {
                    country: 'Chile',
                    years: '1990s–2010s',
                    income: 'Middle → upper-middle income',
                    mechanism: 'Chile combined simplified contribution systems with strong portability of social insurance benefits — workers could carry pension rights across jobs and sectors, raising the perceived value of contributing. Micro-enterprise simplified tax regimes brought small businesses into the formal system at low initial rates.',
                    lesson: 'Portability and simplicity matter as much as rates. If contributing to social insurance feels irreversible and bureaucratically costly, rational workers avoid it. Making it easy and portable changes the calculus.',
                  },
                ].map(({ country, years, income, mechanism, lesson }) => (
                  <div key={country} style={{ background: '#1a1a1a', padding: '32px' }}>
                    <div style={{ fontSize: '11px', fontWeight: '700', color: '#4dd0c4', fontFamily: '"Inter", sans-serif', letterSpacing: '2px', marginBottom: '6px' }}>{country}</div>
                    <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.35)', fontFamily: '"Inter", sans-serif', marginBottom: '16px' }}>{years} · {income}</div>
                    <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)', lineHeight: '1.7', margin: '0 0 16px 0', fontFamily: '"Inter", sans-serif' }}>{mechanism}</p>
                    <div style={{ borderLeft: '2px solid #4dd0c4', paddingLeft: '14px' }}>
                      <div style={{ fontSize: '11px', fontWeight: '700', color: '#4dd0c4', fontFamily: '"Inter", sans-serif', letterSpacing: '1px', marginBottom: '4px' }}>KEY LESSON</div>
                      <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.75)', lineHeight: '1.6', fontFamily: '"Inter", sans-serif', fontStyle: 'italic' }}>{lesson}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Fade>
        </div>

        <div style={{ borderTop: '1px solid #e0e0e0', margin: '80px 0 0 0' }} />

        {/* ══════════════════════════════════════════
            C. POTENTIAL ADJUSTMENTS
        ══════════════════════════════════════════ */}
        <div id="adjustments" style={{ padding: '80px 0 0 0' }}>
          <Fade>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '48px' }}>
              <div style={{ background: '#1e6fa8', color: 'white', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: '700', fontFamily: '"Inter", sans-serif', flexShrink: 0 }}>C</div>
              <div>
                <SectionLabel color="#1e6fa8">Potential Adjustments</SectionLabel>
                <h2 style={{ fontSize: 'clamp(22px, 3vw, 34px)', fontWeight: '400', margin: 0, letterSpacing: '-0.5px', lineHeight: '1.2' }}>
                  What the evidence suggests about improving the current approach
                </h2>
              </div>
            </div>
          </Fade>

          <Fade>
            <p style={{ fontSize: '17px', color: '#333', lineHeight: '1.85', margin: '0 0 48px 0', maxWidth: '760px' }}>
              Vietnam's current plan is directionally correct but the instruments are in some cases mismatched to the problem. Three adjustments stand out as high-evidence, low-disruption improvements — drawn from comparative experience and from the structural diagnosis in Section A.
            </p>
          </Fade>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', background: '#e0e0e0', marginBottom: '48px' }}>
            {[
              {
                num: '01',
                color: '#1e6fa8',
                title: 'Reduce and restructure the social insurance contribution rate',
                body: 'Vietnam\'s combined 32% social insurance contribution rate (17.5% employer + 14.5% employee) is among the highest in Southeast Asia for a country at its income level. Indonesia\'s total rate is approximately 18%; Thailand\'s is around 10%. The current rate creates a strong incentive to avoid the formal system, particularly for small firms. A phased reduction to 22–24% total, offset by a broadened contribution base, would improve compliance without a large revenue loss. ILO Recommendation No. 204 explicitly endorses contribution rate reform as a formalization lever. Chile successfully used graduated contribution rates to bring micro-enterprises into the system before requiring full compliance.',
                evidence: 'ILO R204 §14; World Bank SEA labor market comparisons; Chile micro-enterprise reform experience',
              },
              {
                num: '02',
                color: '#1e6fa8',
                title: 'Introduce a simplified tax and registration regime for micro-enterprises',
                body: 'Currently, the choice for a small informal business is binary: full formal registration with complex accounting requirements and high contribution rates, or informality. A tiered middle option — a simplified flat tax at 1–2% of estimated revenue, combined with basic legal status and access to business banking — would bring millions of household businesses into at least partial formality. This is the approach used in Brazil (Simples Nacional), Mexico (REPECO), and more recently Ghana. It generates revenue that currently produces zero, provides partial social protection, and creates an on-ramp to full formalization as businesses grow.',
                evidence: 'Brazil Simples Nacional outcomes (World Bank 2019); Mexico IMSS-E simplified scheme; ILO R204 §11',
              },
              {
                num: '03',
                color: '#1e6fa8',
                title: 'Make social insurance benefits portable and immediately valuable',
                body: 'The weak voluntary enrollment rate (5% of eligible informal workers) reflects a rational calculation: contributions buy a pension benefit 20–30 years away, with no near-term payoff. Reforms that increase the near-term value of enrollment — health insurance access, access to maternity benefits, injury compensation — and that guarantee full portability of accumulated rights when workers change jobs or sectors would raise the perceived value of contributing. Vietnam\'s 2024 Social Insurance Law made progress on portability; the next step is increasing the salience of short-term benefits for workers considering enrollment.',
                evidence: 'World Bank 2023 social insurance demand survey; Chile AFP portability reform; ILO R204 §18',
              },
            ].map(({ num, color, title, body, evidence }) => (
              <Fade key={num}>
                <div style={{ background: 'white', padding: '40px', borderLeft: `4px solid ${color}` }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '80px 1fr', gap: '32px', alignItems: 'start' }}>
                    <div style={{ fontSize: '48px', fontWeight: '400', color, lineHeight: 1, letterSpacing: '-2px', fontFamily: '"Georgia", serif' }}>{num}</div>
                    <div>
                      <h4 style={{ fontSize: '19px', fontWeight: '400', margin: '0 0 16px 0', lineHeight: '1.3', letterSpacing: '-0.2px' }}>{title}</h4>
                      <p style={{ fontSize: '15px', color: '#555', lineHeight: '1.8', margin: '0 0 14px 0', fontFamily: '"Inter", sans-serif' }}>{body}</p>
                      <div style={{ fontSize: '11px', color: '#bbb', fontFamily: '"Inter", sans-serif', fontStyle: 'italic' }}>
                        Evidence basis: {evidence}
                      </div>
                    </div>
                  </div>
                </div>
              </Fade>
            ))}
          </div>
        </div>

        <div style={{ borderTop: '1px solid #e0e0e0', margin: '80px 0 0 0' }} />

        {/* ══════════════════════════════════════════
            D. MERITS & PITFALLS
        ══════════════════════════════════════════ */}
        <div id="merits" style={{ padding: '80px 0 80px 0' }}>
          <Fade>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '48px' }}>
              <div style={{ background: '#7c3aed', color: 'white', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: '700', fontFamily: '"Inter", sans-serif', flexShrink: 0 }}>D</div>
              <div>
                <SectionLabel color="#7c3aed">Merits &amp; Pitfalls</SectionLabel>
                <h2 style={{ fontSize: 'clamp(22px, 3vw, 34px)', fontWeight: '400', margin: 0, letterSpacing: '-0.5px', lineHeight: '1.2' }}>
                  An honest evaluation of the formalization agenda
                </h2>
              </div>
            </div>
          </Fade>

          <Fade>
            <p style={{ fontSize: '17px', color: '#333', lineHeight: '1.85', margin: '0 0 48px 0', maxWidth: '760px' }}>
              Formalization is not costless, and some risks are underacknowledged in official policy documents. The following is an assessment of where the current strategy is well-designed, and where caution is warranted.
            </p>
          </Fade>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', marginBottom: '48px' }}>

            {/* Merits column */}
            <Fade>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px', paddingBottom: '16px', borderBottom: '2px solid #16a34a' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#16a34a', flexShrink: 0 }} />
                  <div style={{ fontSize: '13px', fontWeight: '700', color: '#16a34a', fontFamily: '"Inter", sans-serif', letterSpacing: '1.5px', textTransform: 'uppercase' }}>Merits of the current approach</div>
                </div>
                {[
                  {
                    title: 'Institutional focus is well-placed',
                    body: 'The 2045 framework correctly identifies institutional quality — not just investment volume — as the binding constraint. Evidence from comparable transitions supports this: South Korea and Chile both required institutional reform before fiscal capacity improved durably.',
                  },
                  {
                    title: 'The 2024 Social Insurance Law is a genuine advance',
                    body: 'Extending mandatory coverage to enterprise owners and household business operators closes a significant gap. Combined with simplified voluntary enrollment, it creates legal pathways that previously did not exist.',
                  },
                  {
                    title: 'Administrative restructuring reduces friction',
                    body: 'The 2024 consolidation of ministries and reduction in approval layers directly addresses a documented bottleneck in public investment implementation. Fewer approval points means faster disbursement of the infrastructure spending that enables structural transformation.',
                  },
                  {
                    title: 'The 60% coverage target is credible and trackable',
                    body: 'Setting an explicit, time-bound formalization target creates accountability. The 2030 deadline is achievable given current trajectory and new legal provisions, and the GSO\'s annual labor force survey provides robust data to measure progress.',
                  },
                ].map(({ title, body }) => (
                  <div key={title} style={{ marginBottom: '24px', paddingLeft: '16px', borderLeft: '2px solid #dcfce7' }}>
                    <div style={{ fontSize: '14px', fontWeight: '600', color: '#1a1a1a', marginBottom: '6px', fontFamily: '"Inter", sans-serif' }}>{title}</div>
                    <div style={{ fontSize: '13px', color: '#666', lineHeight: '1.7', fontFamily: '"Inter", sans-serif' }}>{body}</div>
                  </div>
                ))}
              </div>
            </Fade>

            {/* Pitfalls column */}
            <Fade delay={0.1}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px', paddingBottom: '16px', borderBottom: '2px solid #dc2626' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#dc2626', flexShrink: 0 }} />
                  <div style={{ fontSize: '13px', fontWeight: '700', color: '#dc2626', fontFamily: '"Inter", sans-serif', letterSpacing: '1.5px', textTransform: 'uppercase' }}>Pitfalls and risks</div>
                </div>
                {[
                  {
                    title: 'Enforcement can harm the workers it aims to protect',
                    body: 'The 2008 Hanoi street vendor ban is the cautionary case: aggressive enforcement of formalization rules, without adequate alternative livelihoods, simply impoverishes vulnerable workers rather than formalizing them. Policy must distinguish between protecting workers and eliminating inconvenient informality.',
                  },
                  {
                    title: 'Informality may displace rather than formalize',
                    body: 'If contribution requirements increase without a corresponding increase in formal wage premiums, firms may substitute capital for labor, reduce headcount, or relocate production to less-monitored provinces. Formalization that produces unemployment is not progress.',
                  },
                  {
                    title: 'Agricultural informality requires structural change, not policy',
                    body: 'The 97.9% informality rate in agriculture is essentially irreducible through conventional formalization tools. These workers will formalize when — and only when — Vietnam\'s structural transformation moves them into manufacturing and services. Policy cannot accelerate this beyond the pace of capital accumulation and urbanization.',
                  },
                  {
                    title: 'Risk aversion from anticorruption campaigns slows implementation',
                    body: 'Vietnam\'s anticorruption campaign has improved governance norms but created a documented chilling effect on decision-making at the provincial level. Officials avoid approvals that could later be scrutinized, contributing to the public investment disbursement shortfall. Reform sequencing matters.',
                  },
                ].map(({ title, body }) => (
                  <div key={title} style={{ marginBottom: '24px', paddingLeft: '16px', borderLeft: '2px solid #fee2e2' }}>
                    <div style={{ fontSize: '14px', fontWeight: '600', color: '#1a1a1a', marginBottom: '6px', fontFamily: '"Inter", sans-serif' }}>{title}</div>
                    <div style={{ fontSize: '13px', color: '#666', lineHeight: '1.7', fontFamily: '"Inter", sans-serif' }}>{body}</div>
                  </div>
                ))}
              </div>
            </Fade>
          </div>

          {/* Closing thesis statement */}
          <Fade>
            <div style={{ background: '#1a1a1a', padding: '48px' }}>
              <SectionLabel color="#4dd0c4">Bottom Line</SectionLabel>
              <h3 style={{ fontSize: 'clamp(20px, 2.5vw, 30px)', fontWeight: '400', color: 'white', margin: '0 0 20px 0', lineHeight: '1.3', letterSpacing: '-0.3px' }}>
                Formalization is necessary but not sufficient. Vietnam needs both the policy and the structural preconditions.
              </h3>
              <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.6)', lineHeight: '1.85', margin: '0 0 16px 0', fontFamily: '"Inter", sans-serif' }}>
                The evidence from South Korea and Chile suggests that no policy package can substitute for structural economic transformation as the primary driver of formalization. Rising formal wages, growing urban employment, and improved education are what ultimately pull workers out of informality — not administrative pressure alone.
              </p>
              <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.6)', lineHeight: '1.85', margin: 0, fontFamily: '"Inter", sans-serif' }}>
                What good policy can do is reduce the friction that prevents willing workers and firms from formalizing, and improve the quality of benefits that make formality attractive. Vietnam's 2045 framework is broadly on the right track. The adjustments proposed here are not a critique of the strategy's direction — they are calibrations to improve its effectiveness at the margin where institutional reform has the highest leverage.
              </p>
              {onNavigate && (
                <button onClick={() => onNavigate('fiscal')} style={{
                  marginTop: '28px', background: '#4dd0c4', color: '#0f0f0f',
                  border: 'none', padding: '13px 28px', fontSize: '12px', fontWeight: '700',
                  cursor: 'pointer', letterSpacing: '0.8px', textTransform: 'uppercase',
                  fontFamily: '"Inter", sans-serif',
                }}>
                  See the Fiscal Model → Chapter IV
                </button>
              )}
            </div>
          </Fade>
        </div>
      </div>

      {/* ── SOURCES ─────────────────────────────── */}
      <div style={{ background: 'white', borderTop: '1px solid #e0e0e0', padding: '48px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <Fade>
            <div style={{ fontSize: '11px', fontWeight: '700', color: '#bbb', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '20px', fontFamily: '"Inter", sans-serif' }}>Sources</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px 48px' }}>
              {[
                'World Bank. Viet Nam 2045: Breaking Through — Institutions for a High-Income Future. 2024.',
                'ILO. Informal Employment in Viet Nam: Trends and Determinants. 2021.',
                'ILO Recommendation No. 204. Transition from the Informal to the Formal Economy. 2015.',
                'GSO & ILO. Overall Situation of Workers in Informal Employment in Viet Nam. 2023.',
                'IMF. Vietnam: Selected Issues. Country Report No. 2024/307.',
                'World Bank. Brazil Simples Nacional — Impact Assessment. 2019.',
                'OECD. Economic Survey of Viet Nam 2025.',
                'Turner, S. & Schoenberger, L. Street Vendor Livelihoods and Everyday Politics in Hanoi. Urban Studies, 2012.',
              ].map(src => (
                <div key={src} style={{ fontSize: '12px', color: '#999', lineHeight: '1.6', fontFamily: '"Inter", sans-serif', paddingLeft: '12px', borderLeft: '2px solid #e0e0e0' }}>{src}</div>
              ))}
            </div>
          </Fade>
        </div>
      </div>

      {/* ── FOOTER ──────────────────────────────── */}
      <div style={{ background: '#1a1a1a', borderTop: '1px solid #2a2a2a', padding: '24px 48px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <button onClick={onBack} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '13px', fontWeight: '600', color: TEAL, fontFamily: '"Inter", sans-serif' }}>← Back to Overview</button>
        <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.25)', margin: 0, fontFamily: '"Inter", sans-serif' }}>
          ECON 62 — Topics in Macroeconomics · Winter 2026
        </p>
        {onNavigate && (
          <button onClick={() => onNavigate('fiscal')} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '13px', fontWeight: '600', color: TEAL, fontFamily: '"Inter", sans-serif' }}>
            Chapter IV: The Model →
          </button>
        )}
      </div>

    </div>
  );
}
