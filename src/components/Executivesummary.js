// ========================================
// EXECUTIVE SUMMARY
// Editorial, no interactives, Georgia serif
// Matches InformalExplainer aesthetic
// Save as src/components/ExecutiveSummary.js
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
    { label: 'GSO Labor Force Survey 2023', note: 'Primary data source for informal employment rates, provincial breakdowns, and sectoral composition.' },
    { label: 'ILO. Informal Employment in Viet Nam, 2021', note: 'Trends, determinants, and demographic profiles of informal workers.' },
    { label: 'World Bank. Viet Nam 2045: Breaking Through, 2024', note: 'Institutional reform framework, fiscal projections, and high-income transition roadmap.' },
    { label: 'Huynh, T.N.Q. Street Vendors in Vietnam, 2023', note: 'Sidewalk economy scale, worker demographics, and urban income dynamics.' },
    { label: 'ILO Recommendation No. 204. Transition from Informal to Formal Economy, 2015', note: 'Policy framework for formalization — the international standard against which Vietnam\'s approach is evaluated.' },
    { label: 'Turner & Schoenberger. Street Vendor Livelihoods and Everyday Politics in Hanoi, 2012', note: 'Ground-level analysis of the 2008 Hanoi vending ban and vendor response.' },
  ];

  const chapters = [
    { num: 'I', page: 'informal-explainer', title: 'The Story', desc: 'Historical and structural origins of informal employment — from Doi Moi to the present day.' },
    { num: 'II', page: 'maps', title: 'The Map', desc: 'Provincial-level data across 63 provinces: informal rates, agricultural share, urbanization, and the sidewalk economy.' },
    { num: 'III', page: 'vietnam2045', title: 'The Stakes', desc: 'Vietnam\'s 2045 high-income ambition, the fiscal gap it faces, and the institutional reforms underway.' },
    { num: 'IV', page: 'fiscal', title: 'The Model', desc: 'An interactive fiscal model quantifying revenue implications of progressive formalization scenarios.' },
  ];

  return (
    <div style={{ fontFamily: '"Georgia", "Times New Roman", serif', background: '#fafafa', color: '#1a1a1a', minHeight: '100vh' }}>

      {/* ── NAV ─────────────────────────────────── */}
      <nav style={{
        background: 'white', borderBottom: '1px solid #e0e0e0',
        padding: '14px 48px', display: 'flex', alignItems: 'center',
        gap: '16px', position: 'sticky', top: 0, zIndex: 100,
        boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
      }}>
        <button onClick={onBack} style={{
          background: 'none', border: 'none', cursor: 'pointer',
          fontSize: '13px', fontWeight: '600', color: TEAL,
          fontFamily: '"Inter", sans-serif', padding: 0,
          display: 'flex', alignItems: 'center', gap: '6px',
        }}>← Back</button>
        <span style={{ color: '#ddd' }}>|</span>
        <span style={{ fontSize: '13px', color: '#999', fontFamily: '"Inter", sans-serif' }}>
          Executive Summary
        </span>
      </nav>

      {/* ── HERO ────────────────────────────────── */}
      <header style={{
        background: '#1a1a1a', color: 'white',
        padding: '80px 48px 72px', position: 'relative', overflow: 'hidden',
      }}>
        {/* Teal top bar */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: '4px',
          background: `linear-gradient(90deg, ${TEAL}, #26a69a)`,
        }} />
        <div style={{ maxWidth: '820px' }}>
          <div style={{
            fontSize: '11px', fontWeight: '700', color: TEAL,
            letterSpacing: '3px', textTransform: 'uppercase',
            marginBottom: '20px', fontFamily: '"Inter", sans-serif',
          }}>
            ECON 62 · Topics in Macroeconomics · Winter 2026
          </div>
          <h1 style={{
            fontSize: 'clamp(32px, 5vw, 58px)', fontWeight: '400',
            lineHeight: '1.1', margin: '0 0 24px 0', letterSpacing: '-1.5px',
          }}>
            The Fiscal Cost of<br />Vietnam's Invisible Workforce
          </h1>
          <p style={{
            fontSize: '18px', color: 'rgba(255,255,255,0.65)',
            lineHeight: '1.75', margin: '0', maxWidth: '640px',
            fontFamily: '"Inter", sans-serif', fontWeight: '400',
          }}>
            An interactive policy analysis of informal employment, its structural origins,
            and its consequences for Vietnam's 2045 high-income development agenda.
          </p>
        </div>
      </header>

      {/* ── LEAD PHOTO ──────────────────────────── */}
      <div style={{ background: '#111', lineHeight: 0 }}>
        <div style={{
          width: '100%', height: '420px',
          backgroundImage: 'url(https://raw.githubusercontent.com/mielwewerka/vietnam-informal-economy/main/vietnam-street.jpg)',
          backgroundSize: 'cover', backgroundPosition: 'center 40%',
          backgroundColor: '#2a2a2a',
        }} />
        <div style={{ lineHeight: 1, padding: '12px 48px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <p style={{ fontSize: '12px', color: '#555', margin: 0, fontFamily: '"Inter", sans-serif' }}>
            Street vendors in Hội An. Over one million Vietnamese workers earn their primary income from informal street trade — with no contract, no insurance, and no safety net.
          </p>
          <span style={{ fontSize: '11px', color: '#444', fontFamily: '"Inter", sans-serif', flexShrink: 0, marginLeft: '32px' }}>Vietnam Street Economy</span>
        </div>
      </div>

      {/* ── THESIS ──────────────────────────────── */}
      <div style={{ background: 'white', padding: '72px 48px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <Fade>
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '72px', alignItems: 'start' }}>

              <div>
                <div style={{
                  fontSize: '11px', fontWeight: '700', color: TEAL,
                  letterSpacing: '2.5px', textTransform: 'uppercase',
                  marginBottom: '20px', fontFamily: '"Inter", sans-serif',
                }}>Central Argument</div>
                <h2 style={{
                  fontSize: 'clamp(22px, 2.8vw, 34px)', fontWeight: '400',
                  lineHeight: '1.25', margin: '0 0 28px 0', letterSpacing: '-0.5px',
                }}>
                  Vietnam cannot become a high-income country by 2045 without closing its structural fiscal gap — and that gap is, at its core, an informality problem.
                </h2>
                <p style={{ fontSize: '17px', color: '#333', lineHeight: '1.85', margin: '0 0 20px 0' }}>
                  Vietnam's post-Doi Moi growth is one of the most remarkable economic transformations of the past four decades. Real GDP per capita has grown nearly tenfold since 1990; poverty has fallen from 58% to under 5%; life expectancy has risen by five years. The country's 2045 target — high-income status by the centennial of the Socialist Republic — is ambitious but not implausible.
                </p>
                <p style={{ fontSize: '17px', color: '#333', lineHeight: '1.85', margin: '0 0 20px 0' }}>
                  But Vietnam's development story contains a structural contradiction. The same market liberalization that drove growth also produced, and continues to sustain, an enormous informal economy. As of 2023, 64.5% of Vietnamese workers — approximately 35 million people — are informally employed. They earn wages with no contract, run businesses with no registration, and contribute nothing to the tax base or social insurance system. Their employers, where they exist, similarly evade payroll obligations.
                </p>
                <p style={{ fontSize: '17px', color: '#333', lineHeight: '1.85', margin: 0 }}>
                  The fiscal consequences are structural, not incidental. Vietnam's tax-to-GDP ratio of 18–19% is low by regional standards and insufficient to finance the infrastructure, education, and social protection that high-income status requires. Our model estimates that even a moderate 25% formalization of currently informal workers would generate an additional $6.5 billion in annual tax revenue — roughly 7% of current total tax receipts. Full formalization would nearly double that figure. The gap between current and potential fiscal capacity is not a marginal inefficiency. It is the central constraint on Vietnam's 2045 ambition.
                </p>
              </div>

              {/* Key findings sidebar */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', paddingTop: '56px' }}>
                {[
                  { stat: '64.5%', label: 'of Vietnamese workers are informally employed', color: TEAL, source: 'GSO LFS 2023' },
                  { stat: '$6.5B+', label: 'estimated additional annual revenue at 25% formalization', color: '#c2410c', source: 'Author\'s model' },
                  { stat: '18–19%', label: 'tax-to-GDP ratio — below the regional average of 22%', color: '#1e6fa8', source: 'World Bank 2023' },
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

      {/* ── DARK DIVIDER ────────────────────────── */}
      <div style={{ background: '#1a1a1a', padding: '56px 48px' }}>
        <div style={{ maxWidth: '760px', margin: '0 auto' }}>
          <Fade>
            <p style={{
              fontSize: 'clamp(18px, 2.5vw, 26px)', fontWeight: '400',
              color: 'rgba(255,255,255,0.75)', lineHeight: '1.6',
              margin: 0, letterSpacing: '-0.2px', fontStyle: 'italic',
            }}>
              "A country cannot become high-income with two-thirds of its workforce invisible to the state. Vietnam's fiscal future depends not just on growth, but on who that growth reaches — and who it counts."
            </p>
          </Fade>
        </div>
      </div>

      {/* ── FINDINGS ────────────────────────────── */}
      <div style={{ background: '#fafafa', padding: '72px 48px', borderTop: '1px solid #e0e0e0' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <Fade>
            <div style={{
              fontSize: '11px', fontWeight: '700', color: TEAL,
              letterSpacing: '2.5px', textTransform: 'uppercase',
              marginBottom: '12px', fontFamily: '"Inter", sans-serif',
            }}>Key Findings</div>
            <h2 style={{ fontSize: 'clamp(22px, 2.5vw, 32px)', fontWeight: '400', margin: '0 0 48px 0', letterSpacing: '-0.3px' }}>
              Four claims the evidence supports
            </h2>
          </Fade>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '2px', background: '#e0e0e0' }}>
            {[
              {
                n: '01',
                heading: 'Informality is structural, not marginal',
                body: 'At 64.5% of the workforce, informal employment in Vietnam is not a residual phenomenon of underdevelopment — it is the dominant labor market condition. Agriculture alone accounts for 97.9% informality; even in urban areas, over half of workers lack formal employment status. The informal economy is not the exception. It is the rule.',
                color: TEAL,
              },
              {
                n: '02',
                heading: 'Geography largely determines who escapes',
                body: 'Provincial data reveals that informality is highly concentrated in rural, agricultural provinces — particularly the Mekong Delta and Central Highlands. Urban provinces show lower informality rates, but the gap is narrowing as migration outpaces formal job creation in cities. The escape route from informality runs through urbanization and education, not enforcement.',
                color: '#1e6fa8',
              },
              {
                n: '03',
                heading: 'The fiscal gap is quantifiable and large',
                body: 'Our model, built from GSO wage data and standard tax rates, estimates that progressive formalization would generate between $2.6B (10% formalization) and $26B (full formalization) in additional annual tax revenue. At the government\'s own 2030 target of 60% social insurance coverage, the revenue gain would be approximately $15.6B — roughly 16% of current total tax receipts.',
                color: '#c2410c',
              },
              {
                n: '04',
                heading: 'Formalization requires transformation, not just enforcement',
                body: 'The evidence from South Korea and Chile — both of which made the informal-to-formal transition at roughly Vietnam\'s current income level — suggests that enforcement-led formalization is insufficient and often counterproductive. Durable formalization follows structural changes: urbanization, rising formal wage premiums, simplified contribution systems, and social insurance benefits that workers actually value.',
                color: '#7c3aed',
              },
            ].map(({ n, heading, body, color }) => (
              <Fade key={n}>
                <div style={{ background: 'white', padding: '40px', borderTop: `3px solid ${color}` }}>
                  <div style={{ fontSize: '11px', fontWeight: '700', color, fontFamily: '"Inter", sans-serif', letterSpacing: '2px', marginBottom: '14px' }}>FINDING {n}</div>
                  <h3 style={{ fontSize: '19px', fontWeight: '400', margin: '0 0 16px 0', lineHeight: '1.3', letterSpacing: '-0.2px' }}>{heading}</h3>
                  <p style={{ fontSize: '14px', color: '#666', lineHeight: '1.75', margin: 0, fontFamily: '"Inter", sans-serif' }}>{body}</p>
                </div>
              </Fade>
            ))}
          </div>
        </div>
      </div>

      {/* ── METHODOLOGY NOTE ────────────────────── */}
      <div style={{ background: 'white', borderTop: '1px solid #e0e0e0', padding: '72px 48px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <Fade>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '72px' }}>
              <div>
                <div style={{
                  fontSize: '11px', fontWeight: '700', color: TEAL,
                  letterSpacing: '2.5px', textTransform: 'uppercase',
                  marginBottom: '20px', fontFamily: '"Inter", sans-serif',
                }}>Methodology</div>
                <h2 style={{ fontSize: '26px', fontWeight: '400', margin: '0 0 20px 0', letterSpacing: '-0.3px' }}>Data sources and analytical approach</h2>
                <p style={{ fontSize: '15px', color: '#555', lineHeight: '1.8', margin: '0 0 16px 0', fontFamily: '"Inter", sans-serif' }}>
                  Provincial informal employment data is drawn from the General Statistics Office Labor Force Survey 2023, supplemented by ILO estimates for sectoral breakdowns. The fiscal model applies standard Vietnamese tax rates — 32% combined social insurance, ~3% effective PIT, ~5% VAT pass-through — to GSO-derived wage estimates for informal workers, using a conservative $185/month average (in USD).
                </p>
                <p style={{ fontSize: '15px', color: '#555', lineHeight: '1.8', margin: '0 0 16px 0', fontFamily: '"Inter", sans-serif' }}>
                  Provincial boundary data uses GADM administrative boundaries. The sidewalk economy estimate follows Huynh (2023), who derives a 5% of urban employment figure from field research in Hanoi and HCMC.
                </p>
                <p style={{ fontSize: '13px', color: '#999', lineHeight: '1.7', margin: 0, fontFamily: '"Inter", sans-serif', fontStyle: 'italic' }}>
                  The fiscal model is necessarily simplified. It does not account for behavioral responses to formalization (firms substituting capital for labor), regional wage variation, or compliance costs. It should be read as an order-of-magnitude estimate, not a precise forecast.
                </p>
              </div>

              <div>
                <div style={{
                  fontSize: '11px', fontWeight: '700', color: TEAL,
                  letterSpacing: '2.5px', textTransform: 'uppercase',
                  marginBottom: '20px', fontFamily: '"Inter", sans-serif',
                }}>Key References</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {keyRefs.map(({ label, note }) => (
                    <div key={label} style={{ paddingLeft: '14px', borderLeft: '2px solid #e0e0e0' }}>
                      <div style={{ fontSize: '13px', fontWeight: '600', color: '#333', marginBottom: '4px', fontFamily: '"Inter", sans-serif' }}>{label}</div>
                      <div style={{ fontSize: '12px', color: '#999', lineHeight: '1.5', fontFamily: '"Inter", sans-serif' }}>{note}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Fade>
        </div>
      </div>

      {/* ── CHAPTER MAP ─────────────────────────── */}
      <div style={{ background: '#1a1a1a', padding: '72px 48px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <Fade>
            <div style={{
              fontSize: '11px', fontWeight: '700', color: TEAL,
              letterSpacing: '2.5px', textTransform: 'uppercase',
              marginBottom: '12px', fontFamily: '"Inter", sans-serif',
            }}>Project Structure</div>
            <h2 style={{ fontSize: '28px', fontWeight: '400', color: 'white', margin: '0 0 40px 0', letterSpacing: '-0.3px' }}>
              How the argument unfolds
            </h2>
          </Fade>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1px', background: '#2a2a2a' }}>
            {chapters.map((c, i) => (
              <Fade key={c.num} delay={i * 0.08}>
                <div
                  onClick={() => onNavigate(c.page)}
                  style={{
                    background: '#1a1a1a', padding: '32px 28px',
                    cursor: 'pointer', transition: 'background 0.2s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = '#222'}
                  onMouseLeave={e => e.currentTarget.style.background = '#1a1a1a'}
                >
                  <div style={{ fontSize: '11px', fontWeight: '700', color: TEAL, fontFamily: '"Inter", sans-serif', letterSpacing: '2px', marginBottom: '12px' }}>
                    CHAPTER {c.num}
                  </div>
                  <div style={{ fontSize: '20px', fontWeight: '400', color: 'white', marginBottom: '10px' }}>{c.title}</div>
                  <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)', lineHeight: '1.6', fontFamily: '"Inter", sans-serif', marginBottom: '20px' }}>{c.desc}</div>
                  <div style={{ fontSize: '12px', fontWeight: '600', color: TEAL, fontFamily: '"Inter", sans-serif', letterSpacing: '0.5px' }}>Open →</div>
                </div>
              </Fade>
            ))}
          </div>
        </div>
      </div>

      {/* ── FOOTER ──────────────────────────────── */}
      <div style={{
        background: '#111', borderTop: '1px solid #1a1a1a',
        padding: '28px 48px', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}>
        <button onClick={onBack} style={{
          background: 'none', border: 'none', cursor: 'pointer',
          fontSize: '13px', fontWeight: '600', color: TEAL,
          fontFamily: '"Inter", sans-serif',
        }}>← Back to Overview</button>
        <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.2)', margin: 0, fontFamily: '"Inter", sans-serif' }}>
          ECON 62 · Topics in Macroeconomics · Winter 2026
        </p>
      </div>

    </div>
  );
}
