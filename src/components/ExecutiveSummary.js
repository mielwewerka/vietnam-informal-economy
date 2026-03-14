// ========================================
// EXECUTIVE SUMMARY
// Editorial, no interactives, Georgia serif
// Matches InformalExplainer aesthetic
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
  }, []);
  return [ref, visible];
}

function Fade({ children, delay = 0 }) {
  const [ref, visible] = useInView();
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(24px)',
      transition: `opacity 0.65s ease ${delay}s, transform 0.65s ease ${delay}s`,
    }}>
      {children}
    </div>
  );
}

export default function ExecutiveSummary({ onBack, onNavigate }) {
  const TEAL = '#00897b';

  const keyRefs = [
    { label: 'GSO/ILO. Overall Situation of Workers in Informal Employment in Viet Nam, 2021', note: 'Primary source for the 68.5% informality rate and 33.6M worker count, using the ILO-aligned methodology including agriculture. This is the authoritative current measure.' },
    { label: 'ILO/VIDERI. Expanding Social Insurance for Household Businesses in Viet Nam, 2024', note: 'Source for the 4% household business social insurance enrollment rate and behavioral evidence on formalization barriers.' },
    { label: 'World Bank. Viet Nam 2045: Breaking Through, 2024', note: 'Institutional reform framework, GNI trajectory, fiscal projections, and high-income transition roadmap.' },
    { label: 'OECD. Revenue Statistics in Asia and the Pacific 2025: Viet Nam', note: 'Source for the 16.8% tax-to-GDP ratio (2023) and regional peer comparisons.' },
    { label: 'ILO Recommendation No. 204. Transition from Informal to Formal Economy, 2015', note: 'Policy framework for formalization — the international standard against which Vietnam\'s approach is evaluated.' },
    { label: 'Turner & Schoenberger. Street Vendor Livelihoods and Everyday Politics in Hanoi, 2012', note: 'Ground-level analysis of the 2008 Hanoi vending ban, vendor response, and everyday politics of enforcement.' },
  ];

  // UPDATED: 6 parts, 3x2 grid, corrected descriptions
  const chapters = [
    {
      num: 'I',
      page: 'informal-explainer',
      title: 'The Story',
      desc: 'Historical and structural origins of informal employment — from Doi Moi to the present. 68.5% of workers, 33.6M people, and why the number keeps not falling.',
    },
    {
      num: 'II',
      page: 'maps',
      title: 'The Map',
      desc: 'Seven provincial indicators across all 63 provinces: informal rates, agricultural share, urbanization, sidewalk economy, and rural population. With urban filter.',
    },
    {
      num: 'III',
      page: 'vietnam2045',
      title: 'The Stakes',
      desc: "Vietnam's 2045 high-income ambition, the fiscal gap it faces (tax-to-GDP: 16.8% in 2023), and the institutional reforms underway.",
    },
    {
      num: 'IV',
      page: 'fiscal',
      title: 'The Model',
      desc: 'An interactive fiscal model quantifying revenue implications of progressive formalization scenarios across social insurance, PIT, and VAT.',
    },
    {
      num: 'V',
      page: 'case-studies',
      title: 'The Cases',
      desc: 'South Korea (1963–1995) and Chile (1981–2013): two countries that formalized from comparable starting points with different mechanisms but a shared logic.',
    },
    {
      num: 'VI',
      page: 'policy',
      title: 'The Argument',
      desc: "Four evidence-based policy recommendations grounded in Vietnam's own household business survey data. Formalization fails as enforcement; it succeeds as an offer.",
    },
  ];

  return (
    <div style={{ fontFamily: '"Georgia", "Times New Roman", serif', background: '#fafafa', color: '#1a1a1a', minHeight: '100vh' }}>

      {/* NAV */}
      <nav style={{
        background: 'white', borderBottom: '1px solid #e0e0e0',
        padding: '14px 48px', display: 'flex', alignItems: 'center',
        gap: '16px', position: 'sticky', top: 0, zIndex: 100,
        boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
      }}>
        <button onClick={onBack} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '13px', fontWeight: '600', color: TEAL, fontFamily: '"Inter", sans-serif', padding: 0 }}>← Back</button>
        <span style={{ color: '#ddd' }}>|</span>
        <span style={{ fontSize: '13px', color: '#999', fontFamily: '"Inter", sans-serif' }}>Executive Summary</span>
      </nav>

      {/* HERO */}
      <header style={{ background: '#1a1a1a', color: 'white', padding: '80px 48px 72px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: `linear-gradient(90deg, ${TEAL}, #26a69a)` }} />
        <div style={{ maxWidth: '820px' }}>
          <div style={{ fontSize: '11px', fontWeight: '700', color: TEAL, letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '20px', fontFamily: '"Inter", sans-serif' }}>
            ECON 62 · Topics in Macroeconomics · Winter 2026
          </div>
          <h1 style={{ fontSize: 'clamp(32px, 5vw, 58px)', fontWeight: '400', lineHeight: '1.1', margin: '0 0 24px 0', letterSpacing: '-1.5px' }}>
            The Fiscal Cost of<br />Vietnam's Invisible Workforce
          </h1>
          <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.65)', lineHeight: '1.75', margin: 0, maxWidth: '640px', fontFamily: '"Inter", sans-serif', fontWeight: '400' }}>
            An interactive policy analysis of informal employment, its structural origins,
            and its consequences for Vietnam's 2045 high-income development agenda.
          </p>
        </div>
      </header>

      {/* THESIS SECTION */}
      <div style={{ background: 'white', padding: '72px 48px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <Fade>
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '64px', alignItems: 'start' }}>
              <div>
                <div style={{ fontSize: '11px', fontWeight: '700', color: TEAL, letterSpacing: '2.5px', textTransform: 'uppercase', marginBottom: '16px', fontFamily: '"Inter", sans-serif' }}>
                  The Argument
                </div>
                <p style={{ fontSize: '19px', color: '#1a1a1a', lineHeight: '1.8', margin: '0 0 24px 0' }}>
                  Real GDP per capita has grown nearly tenfold since 1990; poverty has fallen from 58% to under 5%; life expectancy has risen by five years. The country's 2045 target — high-income status by the centennial of the Socialist Republic — is ambitious but not implausible.
                </p>
                <p style={{ fontSize: '17px', color: '#333', lineHeight: '1.85', margin: '0 0 20px 0' }}>
                  But Vietnam's development story contains a structural contradiction. The same market liberalization that drove growth also produced, and continues to sustain, an enormous informal economy. As of 2021, 68.5% of Vietnamese workers — approximately 33.6 million people — are informally employed. They earn wages with no contract, run businesses with no registration, and contribute nothing to the tax base or social insurance system. Their employers, where they exist, similarly evade payroll obligations.
                </p>
                {/* CORRECTED: 16.8% tax ratio, updated revenue estimate with corrected model */}
                <p style={{ fontSize: '17px', color: '#333', lineHeight: '1.85', margin: 0 }}>
                  The fiscal consequences are structural, not incidental. Vietnam's tax-to-GDP ratio of 16.8% in 2023 (OECD Revenue Statistics Asia-Pacific 2025) is below the regional average of 19.5% and insufficient to finance the infrastructure, education, and social protection that high-income status requires. Our model — using the corrected 68.5% informality rate and 2024 Social Insurance Law contribution rates — estimates that even a moderate 25% formalization of informal workers would generate approximately $5.3B in additional annual revenue. Full formalization would generate over $21B. The gap between current and potential fiscal capacity is not a marginal inefficiency. It is the central constraint on Vietnam's 2045 ambition.
                </p>
              </div>

              {/* Key stats sidebar — all corrected */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', paddingTop: '56px' }}>
                {[
                  { stat: '68.5%', label: 'of Vietnamese workers are informally employed', color: TEAL, source: 'GSO/ILO, 2021' },
                  { stat: '16.8%', label: "tax-to-GDP ratio in 2023, below the regional average of 19.5%", color: '#c2410c', source: 'OECD Revenue Statistics Asia-Pacific 2025' },
                  { stat: '~$5.3B', label: 'estimated additional annual revenue at 25% formalization', color: '#1e6fa8', source: "Author's model, corrected assumptions" },
                ].map(({ stat, label, color, source }) => (
                  <div key={stat} style={{ borderLeft: `3px solid ${color}`, paddingLeft: '20px' }}>
                    <div style={{ fontSize: '36px', fontWeight: '400', color, lineHeight: 1, letterSpacing: '-1px', marginBottom: '8px' }}>{stat}</div>
                    <div style={{ fontSize: '13px', color: '#555', lineHeight: '1.5', marginBottom: '6px', fontFamily: '"Inter", sans-serif' }}>{label}</div>
                    <div style={{ fontSize: '11px', color: '#bbb', fontFamily: '"Inter", sans-serif', fontStyle: 'italic' }}>{source}</div>
                  </div>
                ))}
              </div>
            </div>
          </Fade>
        </div>
      </div>

      {/* DARK DIVIDER */}
      <div style={{ background: '#1a1a1a', padding: '56px 48px' }}>
        <div style={{ maxWidth: '760px', margin: '0 auto' }}>
          <Fade>
            <p style={{ fontSize: 'clamp(18px, 2.5vw, 26px)', fontWeight: '400', color: 'rgba(255,255,255,0.75)', lineHeight: '1.6', margin: 0, letterSpacing: '-0.2px', fontStyle: 'italic' }}>
              "A country cannot reach high-income status with two-thirds of its workforce invisible to the state. Vietnam's fiscal future depends not just on growth, but on who that growth reaches — and who it counts."
            </p>
          </Fade>
        </div>
      </div>

      {/* KEY FINDINGS */}
      <div style={{ background: '#fafafa', padding: '72px 48px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <Fade>
            <div style={{ fontSize: '11px', fontWeight: '700', color: TEAL, letterSpacing: '2.5px', textTransform: 'uppercase', marginBottom: '12px', fontFamily: '"Inter", sans-serif' }}>
              Key Findings
            </div>
            <h2 style={{ fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: '400', margin: '0 0 48px 0', letterSpacing: '-0.5px' }}>
              Four conclusions the evidence supports
            </h2>
          </Fade>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', background: '#e0e0e0' }}>
            {[
              {
                n: '01',
                heading: "Vietnam's informal economy is structural, not transitional",
                body: "At 68.5% of workers (GSO/ILO 2021), Vietnam's informality rate has declined only slowly despite decades of rapid GDP growth. This is not a development lag that growth alone will resolve. Informality is reproduced by the same forces driving the formal economy's expansion: agricultural dominance in rural provinces, migration patterns that outpace formal job creation, and social insurance contribution rates that make formalization economically irrational for small firms.",
                color: TEAL,
              },
              {
                n: '02',
                heading: 'The geographic distribution reveals structurally distinct problems',
                body: "The seven-indicator provincial map reveals two entirely different informal economies within Vietnam. The Central Highlands and Northern Midlands show informality rates above 80%, driven by agricultural subsistence — unreachable through urban registration reform. The Southeast and Red River Delta show rates of 36–55%, concentrated in service-sector and manufacturing informality — the policy-responsive category. One national formalization program cannot serve both.",
                color: '#1e6fa8',
              },
              {
                n: '03',
                heading: 'The fiscal gap is quantifiable and significant',
                // CORRECTED: updated revenue estimates with corrected 68.5%/25% SI rate assumptions
                body: "Our model — using GSO/ILO 2021 informal worker data (68.5%, 35.9M workers), average informal wages of approximately $185/month (GSO/ILO 2021), and the 2024 Social Insurance Law contribution rate of 25% for household business owners — estimates that 25% formalization would generate approximately $5.3B in additional annual revenue. Full formalization would generate over $21B. These are upper-bound estimates that assume no behavioral response. At the government's 2030 target of 60% social insurance coverage, the revenue gain would represent a significant share of current total tax receipts. The gap is real, even if its exact magnitude is uncertain.",
                color: '#c2410c',
              },
              {
                n: '04',
                heading: 'Formalization requires transformation, not just enforcement',
                body: 'The evidence from South Korea and Chile — both of which made the informal-to-formal transition at roughly Vietnam\'s current income level — suggests that enforcement-led formalization is insufficient and often counterproductive. In Korea, formal manufacturing jobs created formality as a byproduct. In Chile, pension accounts made formality personally beneficial. In Vietnam, ILO/VIDERI fieldwork finds that fewer than 4% of household business owners enroll in social insurance not because they cannot afford it but because they cannot calculate what they will receive. Trust and legibility are the binding constraints, not capacity.',
                color: '#7c3aed',
              },
            ].map(({ n, heading, body, color }, i) => (
              <Fade key={n} delay={i * 0.06}>
                <div style={{ background: 'white', padding: '36px 44px', borderLeft: `4px solid ${color}` }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '64px 1fr', gap: '28px', alignItems: 'start' }}>
                    <div style={{ fontSize: '42px', fontWeight: '400', color, lineHeight: 1, letterSpacing: '-2px', fontFamily: '"Georgia", serif', paddingTop: '4px' }}>{n}</div>
                    <div>
                      <h3 style={{ fontSize: '19px', fontWeight: '400', margin: '0 0 14px 0', lineHeight: '1.3', letterSpacing: '-0.2px' }}>{heading}</h3>
                      <p style={{ fontSize: '15px', color: '#555', lineHeight: '1.8', margin: 0, fontFamily: '"Inter", sans-serif' }}>{body}</p>
                    </div>
                  </div>
                </div>
              </Fade>
            ))}
          </div>
        </div>
      </div>

      {/* PROJECT STRUCTURE — 6 chapters, 3x2 grid */}
      <div style={{ background: '#1a1a1a', padding: '72px 48px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <Fade>
            <div style={{ fontSize: '11px', fontWeight: '700', color: TEAL, letterSpacing: '2.5px', textTransform: 'uppercase', marginBottom: '12px', fontFamily: '"Inter", sans-serif' }}>
              Project Structure
            </div>
            <h2 style={{ fontSize: '28px', fontWeight: '400', color: 'white', margin: '0 0 40px 0', letterSpacing: '-0.3px' }}>
              How the argument unfolds
            </h2>
          </Fade>

          {/* UPDATED: 3x2 grid for 6 parts */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1px', background: '#2a2a2a' }}>
            {chapters.map((c, i) => (
              <Fade key={c.num} delay={i * 0.06}>
                <div
                  onClick={() => onNavigate(c.page)}
                  style={{ background: '#1a1a1a', padding: '28px 24px', cursor: 'pointer', transition: 'background 0.2s', height: '100%', boxSizing: 'border-box' }}
                  onMouseEnter={e => e.currentTarget.style.background = '#222'}
                  onMouseLeave={e => e.currentTarget.style.background = '#1a1a1a'}
                >
                  <div style={{ fontSize: '11px', fontWeight: '700', color: TEAL, fontFamily: '"Inter", sans-serif', letterSpacing: '2px', marginBottom: '10px' }}>
                    PART {c.num}
                  </div>
                  <div style={{ fontSize: '18px', fontWeight: '400', color: 'white', marginBottom: '10px' }}>{c.title}</div>
                  <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)', lineHeight: '1.6', fontFamily: '"Inter", sans-serif', marginBottom: '20px' }}>{c.desc}</div>
                  <div style={{ fontSize: '12px', fontWeight: '600', color: TEAL, fontFamily: '"Inter", sans-serif', letterSpacing: '0.5px' }}>Open →</div>
                </div>
              </Fade>
            ))}
          </div>
        </div>
      </div>

      {/* KEY REFERENCES */}
      <div style={{ background: 'white', padding: '56px 48px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <Fade>
            <div style={{ fontSize: '11px', fontWeight: '700', color: TEAL, letterSpacing: '2.5px', textTransform: 'uppercase', marginBottom: '32px', fontFamily: '"Inter", sans-serif' }}>
              Key References
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '800px' }}>
              {keyRefs.map(({ label, note }) => (
                <div key={label} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', paddingBottom: '20px', borderBottom: '1px solid #e0e0e0' }}>
                  <div style={{ fontSize: '14px', fontWeight: '600', color: '#1a1a1a', lineHeight: '1.4' }}>{label}</div>
                  <div style={{ fontSize: '13px', color: '#666', lineHeight: '1.6', fontFamily: '"Inter", sans-serif' }}>{note}</div>
                </div>
              ))}
            </div>
          </Fade>
        </div>
      </div>

      {/* DATA NOTES */}
      <div style={{ background: '#f5f5f5', borderTop: '1px solid #e0e0e0', padding: '28px 48px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ fontSize: '11px', fontWeight: '700', color: '#bbb', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '10px', fontFamily: '"Inter", sans-serif' }}>Data Notes</div>
          <p style={{ fontSize: '12px', color: '#999', lineHeight: '1.75', margin: 0, fontFamily: '"Inter", sans-serif', maxWidth: '900px' }}>
            The 68.5% informality rate and 33.6M worker count are from GSO/ILO 2021 using the ILO-aligned methodology, which includes agriculture and forestry workers. The pre-2021 GSO measure (approximately 56%) used a narrower definition and is not directly comparable. The 16.8% tax-to-GDP ratio is from OECD Revenue Statistics Asia-Pacific 2025 for the year 2023. The revenue model uses a 68.5% informality rate applied to 52.4M employed workers (GSO LFS 2023), an average informal wage of $185/month (GSO/ILO 2021), and a 25% social insurance contribution rate (2024 Social Insurance Law, household business owners). Revenue estimates are upper-bound scenarios assuming uniform formalization and no behavioral response. Korea and Chile historical informality trajectory data are approximated from secondary sources; see Case Studies data notes.
          </p>
        </div>
      </div>

      {/* FOOTER NAV */}
      <div style={{ background: '#111', borderTop: '1px solid #1a1a1a', padding: '24px 48px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <button onClick={onBack} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '13px', fontWeight: '600', color: TEAL, fontFamily: '"Inter", sans-serif' }}>
          ← Back to Overview
        </button>
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.2)', margin: '0 0 2px 0', fontFamily: '"Inter", sans-serif' }}>ECON 62 · Topics in Macroeconomics · Winter 2026</p>
          <p style={{ fontSize: '10px', color: 'rgba(255,255,255,0.12)', margin: 0, fontFamily: '"Inter", sans-serif' }}>Designed and Built by Miel Wewerka · Dartmouth College</p>
        </div>
        <button onClick={() => onNavigate('policy')} style={{ background: '#4dd0c4', color: '#0f0f0f', border: 'none', padding: '7px 18px', fontSize: '12px', fontWeight: '700', cursor: 'pointer', fontFamily: '"Inter", sans-serif' }}>
          Read Policy Analysis →
        </button>
      </div>

    </div>
  );
}
