// ========================================
// VIETNAM 2045 — POLICY OVERVIEW
// Part III of Vietnam Informal Economy project
// Four-part policy memo: Problems, Plan,
// Adjustments, Merits & Pitfalls
// ========================================

import React, { useState, useEffect, useRef } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceLine, ResponsiveContainer, Cell, ComposedChart, Area } from 'recharts';

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

const SECTIONS = [
  { id: 'problems',    label: 'A. Problems',      color: '#c2410c' },
  { id: 'plan',        label: "B. Gov't Plan",     color: '#00897b' },
  { id: 'adjustments', label: 'C. Adjustments',   color: '#1e6fa8' },
  { id: 'merits',      label: 'D. Merits & Pitfalls', color: '#7c3aed' },
];

export default function Vietnam2045({ onBack, onNavigate }) {
  const [activeSection, setActiveSection] = useState('problems');
  const [navScrolled, setNavScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setNavScrolled(window.scrollY > 120);
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

      {/* STICKY NAV */}
      <div style={{
        position: 'sticky', top: 0, zIndex: 100,
        background: 'white', borderBottom: '1px solid #e0e0e0',
        boxShadow: navScrolled ? '0 1px 8px rgba(0,0,0,0.06)' : 'none',
        transition: 'box-shadow 0.3s',
      }}>
        <div style={{ padding: '12px 48px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <button onClick={onBack} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '13px', fontWeight: '600', color: TEAL, fontFamily: '"Inter", sans-serif', padding: 0 }}>← Back</button>
            <span style={{ color: '#ddd' }}>|</span>
            <span style={{ fontSize: '13px', color: '#999', fontFamily: '"Inter", sans-serif' }}>Part III: The Stakes</span>
          </div>
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

      {/* HERO */}
      <header style={{ background: '#1a1a1a', color: 'white', padding: '64px 48px 56px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: `linear-gradient(90deg, ${TEAL}, #26a69a)` }} />
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', alignItems: 'center' }}>

          <div>
            <div style={{ fontSize: '11px', fontWeight: '700', color: TEAL, letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '8px', fontFamily: '"Inter", sans-serif' }}>
              Part III · Policy Overview
            </div>
            <h1 style={{ fontSize: 'clamp(28px, 3.5vw, 48px)', fontWeight: '400', lineHeight: '1.1', margin: '0 0 20px 0', letterSpacing: '-1.5px' }}>
              The Stakes:<br />Vietnam 2045 and the<br />Formalization Imperative
            </h1>
            <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.55)', lineHeight: '1.75', margin: '0 0 28px 0', fontFamily: '"Inter", sans-serif' }}>
              Vietnam's high-income ambition is credible but not inevitable. This section examines the structural problems blocking it, the government's current response, what adjustments the evidence suggests, and an honest assessment of what could go right and what could go wrong.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1px', background: '#2a2a2a', maxWidth: '480px' }}>
              {[
                ['2045', 'Target year for high-income status'],
                ['7–8%', 'Required annual GDP growth rate'],
                ['$14,000', 'GNI per capita high-income threshold'],
                ['$4,300', "Vietnam's GNI per capita today"],
              ].map(([n, l]) => (
                <div key={n} style={{ background: '#1a1a1a', padding: '16px 18px' }}>
                  <div style={{ fontSize: '20px', fontWeight: '400', color: TEAL, letterSpacing: '-0.5px', marginBottom: '4px' }}>{n}</div>
                  <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', fontFamily: '"Inter", sans-serif', lineHeight: '1.4' }}>{l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* GNI trajectory chart */}
          <div>
            <div style={{ marginBottom: '12px' }}>
              <div style={{ fontSize: '11px', fontWeight: '700', color: TEAL, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '4px', fontFamily: '"Inter", sans-serif' }}>GNI Per Capita — Vietnam's Required Trajectory</div>
              <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.35)', fontFamily: '"Inter", sans-serif' }}>USD, current prices. World Bank high-income threshold: $14,005</div>
            </div>
            <ResponsiveContainer width="100%" height={260}>
              <ComposedChart data={[
                {year:1990,actual:98},
                {year:1995,actual:228},
                {year:2000,actual:402},
                {year:2005,actual:700},
                {year:2010,actual:1334},
                {year:2015,actual:2109},
                {year:2020,actual:3526},
                {year:2024,actual:4300},
                {year:2025,required:4900,current:4600},
                {year:2028,required:6200,current:5400},
                {year:2031,required:8000,current:6200},
                {year:2034,required:9900,current:7000},
                {year:2037,required:11200,current:7900},
                {year:2040,required:12400,current:8800},
                {year:2043,required:13600,current:9700},
                {year:2045,required:14005,current:10400},
              ]} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" />
                <XAxis dataKey="year" tick={{ fontSize: 11, fill: 'rgba(255,255,255,0.4)', fontFamily: 'Inter,sans-serif' }} />
                <YAxis tickFormatter={v => '$' + (v >= 1000 ? (v/1000).toFixed(0) + 'k' : v)} tick={{ fontSize: 11, fill: 'rgba(255,255,255,0.4)', fontFamily: 'Inter,sans-serif' }} domain={[0, 15000]} />
                <Tooltip
                  formatter={(v, name) => ['$' + v.toLocaleString(), name === 'actual' ? 'Historical GNI/capita' : name === 'required' ? 'Required for 2045 goal' : 'Current pace projection']}
                  contentStyle={{ background: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: 0, fontSize: 12, fontFamily: 'Inter,sans-serif' }}
                  labelStyle={{ color: 'rgba(255,255,255,0.6)' }}
                />
                <Area dataKey="required" fill={TEAL} fillOpacity={0.08} stroke="none" />
                <ReferenceLine y={14005} stroke={TEAL} strokeDasharray="4 3" strokeOpacity={0.5}
                  label={{ value: 'High-income threshold', position: 'insideTopRight', fill: TEAL, fontSize: 10, fontFamily: 'Inter,sans-serif' }} />
                <Line type="monotone" dataKey="actual" stroke="#ffffff" strokeWidth={2.5} dot={false} name="actual" connectNulls={false} />
                <Line type="monotone" dataKey="required" stroke={TEAL} strokeWidth={2} strokeDasharray="6 3" dot={false} name="required" connectNulls={false} />
                <Line type="monotone" dataKey="current" stroke="#f97316" strokeWidth={2} strokeDasharray="4 4" dot={false} name="current" connectNulls={false} />
              </ComposedChart>
            </ResponsiveContainer>
            <div style={{ display: 'flex', gap: '20px', marginTop: '10px', flexWrap: 'wrap' }}>
              {[
                { color: '#ffffff', dash: false, label: 'Historical (World Bank)' },
                { color: TEAL, dash: true, label: 'Required for 2045 goal' },
                { color: '#f97316', dash: true, label: 'Current pace projection' },
              ].map(({ color, dash, label }) => (
                <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <svg width="24" height="10">
                    <line x1="0" y1="5" x2="24" y2="5" stroke={color} strokeWidth="2" strokeDasharray={dash ? "5 3" : "0"} />
                  </svg>
                  <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)', fontFamily: 'Inter,sans-serif' }}>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* TAX RATIO CALLOUT */}
      <div style={{ background: '#fafafa', borderBottom: '1px solid #e0e0e0', padding: '32px 48px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <Fade>
            <div style={{ display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap' }}>
              <div style={{ fontSize: '36px', fontWeight: '300', color: '#c2410c', letterSpacing: '-1px', fontFamily: '"Georgia", serif', flexShrink: 0 }}>16.8%</div>
              <div>
                <div style={{ fontSize: '15px', fontWeight: '600', color: '#1a1a1a', marginBottom: '4px' }}>Vietnam's tax-to-GDP ratio in 2023, down from 18.8% in 2022</div>
                <div style={{ fontSize: '13px', color: '#777', fontFamily: '"Inter", sans-serif' }}>Below the Asia-Pacific average of 19.5% and well below the OECD average of 33.9%. Rapid growth is not automatically building fiscal capacity. Source: OECD Revenue Statistics Asia-Pacific 2025.</div>
              </div>
            </div>
          </Fade>
        </div>
      </div>

      {/* TAX RATIO COMPARISON CHART */}
      <div style={{ background: '#1a1a1a', padding: '48px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <Fade>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
              <div>
                <SectionLabel color="#4dd0c4">Tax-to-GDP Comparison</SectionLabel>
                <h3 style={{ fontSize: '20px', fontWeight: '400', color: 'white', margin: 0, letterSpacing: '-0.3px' }}>
                  Vietnam's tax ratio versus regional peers (2002–2022)
                </h3>
                <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)', fontFamily: '"Inter", sans-serif', margin: '6px 0 0 0' }}>Tax-to-GDP ratios, OECD Revenue Statistics Asia-Pacific. Vietnam peaked at ~20.8% in 2008; 2023 figure is 16.8%.</p>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={[
                {year:'2002',Vietnam:20.1,Indonesia:16.2,Malaysia:19.8,Philippines:14.0,Thailand:17.2},
                {year:'2004',Vietnam:21.5,Indonesia:15.1,Malaysia:20.2,Philippines:13.5,Thailand:17.8},
                {year:'2006',Vietnam:22.3,Indonesia:14.8,Malaysia:20.8,Philippines:14.2,Thailand:18.1},
                {year:'2008',Vietnam:23.1,Indonesia:16.8,Malaysia:21.2,Philippines:14.8,Thailand:17.4},
                {year:'2010',Vietnam:21.4,Indonesia:14.9,Malaysia:19.6,Philippines:13.9,Thailand:17.8},
                {year:'2012',Vietnam:20.8,Indonesia:15.3,Malaysia:20.1,Philippines:14.6,Thailand:18.6},
                {year:'2014',Vietnam:19.6,Indonesia:14.7,Malaysia:19.2,Philippines:15.1,Thailand:19.2},
                {year:'2016',Vietnam:18.9,Indonesia:13.1,Malaysia:17.8,Philippines:15.8,Thailand:18.8},
                {year:'2018',Vietnam:19.2,Indonesia:13.8,Malaysia:16.8,Philippines:16.2,Thailand:17.9},
                {year:'2020',Vietnam:18.5,Indonesia:11.8,Malaysia:15.2,Philippines:15.1,Thailand:15.8},
                {year:'2022',Vietnam:18.8,Indonesia:13.9,Malaysia:15.9,Philippines:15.6,Thailand:17.1},
              ]}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e8e4e0" />
                <XAxis dataKey="year" tick={{ fontSize: 11, fontFamily: 'Inter, sans-serif', fill: '#999' }} />
                <YAxis domain={[9, 26]} tick={{ fontSize: 11, fontFamily: 'Inter, sans-serif', fill: '#999' }} tickFormatter={v => v + '%'} />
                <Tooltip formatter={(v, name) => [v.toFixed(1) + '%', name]} contentStyle={{ fontFamily: 'Inter, sans-serif', fontSize: 12, border: '1px solid #2a2a2a', borderRadius: 0, background: '#1a1a1a', color: 'white' }} />
                <Legend wrapperStyle={{ fontSize: 12, fontFamily: 'Inter, sans-serif', paddingTop: 16 }} />
                <Line type="monotone" dataKey="Vietnam" stroke="#c2410c" strokeWidth={3} dot={false} />
                <Line type="monotone" dataKey="Indonesia" stroke="#555" strokeWidth={1.5} dot={false} strokeDasharray="4 2" />
                <Line type="monotone" dataKey="Malaysia" stroke="#888" strokeWidth={1.5} dot={false} />
                <Line type="monotone" dataKey="Philippines" stroke="#22c55e" strokeWidth={1.5} dot={false} />
                <Line type="monotone" dataKey="Thailand" stroke="#aaa" strokeWidth={1.5} dot={false} strokeDasharray="6 3" />
              </LineChart>
            </ResponsiveContainer>
            <div style={{ marginTop: '16px', padding: '14px 20px', background: 'rgba(194,65,12,0.1)', borderLeft: '3px solid #c2410c', fontFamily: '"Inter", sans-serif' }}>
              <span style={{ fontSize: '12px', fontWeight: '700', color: '#f97316' }}>Key insight: </span>
              <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)' }}>Despite strong GDP growth since 1990, Vietnam's tax-to-GDP ratio declined from roughly 23% in 2006 to 16.8% in 2023, well below the regional average and trending away from the fiscal capacity needed for high-income status. Source: OECD Revenue Statistics Asia-Pacific 2025.</span>
            </div>
          </Fade>
        </div>
      </div>

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 48px' }}>

        {/* A. PROBLEMS */}
        <div id="problems" style={{ padding: '80px 0 0 0' }}>
          <Fade>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '48px' }}>
              <div style={{ background: '#c2410c', color: 'white', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: '700', fontFamily: '"Inter", sans-serif', flexShrink: 0 }}>A</div>
              <div>
                <SectionLabel color="#c2410c">Problems &amp; Issues</SectionLabel>
                <h2 style={{ fontSize: 'clamp(22px, 3vw, 34px)', fontWeight: '400', margin: 0, letterSpacing: '-0.5px', lineHeight: '1.2' }}>
                  Why informality persists, and why it matters fiscally
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
                {/* CORRECTED: 68.5%, 16.8% tax ratio, ~38% SI coverage */}
                <p style={{ fontSize: '17px', color: '#333', lineHeight: '1.85', margin: '0 0 20px 0' }}>
                  This creates a fiscal trap with three reinforcing mechanisms. First, a narrow tax base: 68.5% of workers contribute nothing to income tax or social insurance, holding Vietnam's tax-to-GDP ratio at 16.8% in 2023 (OECD Revenue Statistics Asia-Pacific 2025), below the regional average of 19.5% and well below the 25%+ common among high-income OECD countries. Second, underfunded social protection: the social insurance system covers only around 38% of workers, leaving the majority without pensions or unemployment insurance, which in turn weakens the incentive to formalize. Third, an investment gap: insufficient revenue constrains public investment to below the 7.3% of GDP the World Bank estimates is needed to sustain high growth to 2045.
                </p>
                <p style={{ fontSize: '17px', color: '#333', lineHeight: '1.85', margin: 0 }}>
                  The geography matters too. Provincial data reveals extreme concentration: the Mekong Delta and Central Highlands have informality rates above 80%, driven by agricultural dominance. Urban centers like Hanoi and HCMC show lower rates but face a different challenge — growing service-sector informality as migration outpaces formal job creation. These are structurally distinct problems requiring different policy responses.
                </p>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', paddingTop: '4px' }}>
                {[
                  {
                    label: 'The contribution burden problem',
                    // CORRECTED: updated rate description
                    body: 'Social insurance contributions total approximately 25–28% of wages under the 2024 Social Insurance Law, among the highest in Southeast Asia for a country at this income level. For small firms on thin margins, this is often the decisive reason to stay informal.',
                  },
                  {
                    label: 'The benefit perception problem',
                    // CORRECTED: 4% HHB owners, not 5% informal workers
                    body: 'Fewer than 4% of household business owners contribute to any social insurance despite many being eligible. ILO/VIDERI fieldwork shows workers do not believe the benefits — especially pensions 20–30 years away — justify current contributions. This is a trust and legibility problem, not purely a cost problem.',
                  },
                  {
                    label: 'The enforcement problem',
                    body: "Vietnam's labor inspectorate has roughly one inspector per 50,000 workers. Enforcement-led formalization is not feasible at this staffing level, particularly in rural and agricultural areas.",
                  },
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
                  body: 'Low formalization → narrow tax base → insufficient public investment → slow structural transformation → low formal wage premium → low formalization. Vietnam is caught in this self-reinforcing loop.',
                  color: '#c2410c',
                },
                {
                  title: 'The measurement problem',
                  body: "Vietnam's informal economy is structurally undercounted. IRD/GSO joint research estimates GDP is understated by 25–48%. This means the debt-to-GDP ratio looks better than it is, but the revenue-to-GDP ratio looks worse — because informal output goes untaxed. Source: Nghiem & Roubaud (2019).",
                  color: '#f97316',
                },
                {
                  title: 'The 2045 arithmetic',
                  body: "At $4,300 GNI per capita today, Vietnam needs to reach $14,005 by 2045. That requires 7–8% annual growth for 20 years — which requires public investment in infrastructure and human capital that the current tax base cannot reliably fund. The constraint is fiscal, not structural.",
                  color: '#7c3aed',
                },
              ].map(({ title, body, color }) => (
                <div key={title} style={{ background: 'white', padding: '28px 24px', borderTop: `3px solid ${color}` }}>
                  <h3 style={{ fontSize: '15px', fontWeight: '700', color: '#1a1a1a', margin: '0 0 10px 0', fontFamily: '"Inter", sans-serif' }}>{title}</h3>
                  <p style={{ fontSize: '13px', color: '#666', lineHeight: '1.7', margin: 0, fontFamily: '"Inter", sans-serif' }}>{body}</p>
                </div>
              ))}
            </div>
          </Fade>
        </div>

        <div style={{ borderTop: '1px solid #e0e0e0', margin: '80px 0 0 0' }} />

        {/* B. GOVERNMENT PLAN */}
        <div id="plan" style={{ padding: '80px 0 0 0' }}>
          <Fade>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '48px' }}>
              <div style={{ background: TEAL, color: 'white', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: '700', fontFamily: '"Inter", sans-serif', flexShrink: 0 }}>B</div>
              <div>
                <SectionLabel color={TEAL}>Current Government Plan</SectionLabel>
                <h2 style={{ fontSize: 'clamp(22px, 3vw, 34px)', fontWeight: '400', margin: 0, letterSpacing: '-0.5px', lineHeight: '1.2' }}>
                  What Vietnam is already doing
                </h2>
              </div>
            </div>
          </Fade>

          <Fade>
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '48px', marginBottom: '48px' }}>
              <div>
                <p style={{ fontSize: '17px', color: '#333', lineHeight: '1.85', margin: '0 0 20px 0' }}>
                  The government has set an explicit formalization target: 60% social insurance coverage by 2030, up from approximately 38% today. This target, embedded in Resolution 28-NQ/TW, is the most direct and measurable formalization commitment in current policy. The 2024 Social Insurance Law provides the legal architecture to pursue it.
                </p>
                <p style={{ fontSize: '16px', color: '#444', lineHeight: '1.85', margin: 0 }}>
                  The strategy rests on five pillars: sustained 7 to 8% annual GDP growth, large-scale public infrastructure investment (7.3% of GDP annually), institutional modernization, human capital development, and expanded social protection. Each pillar requires fiscal capacity that Vietnam's current informal economy structurally limits.
                </p>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', background: '#fafafa', border: '1px solid #e8e4e0' }}>
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
                  {/* CORRECTED: 68.5%, 16.8% */}
                  <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)', lineHeight: '1.7', margin: 0, fontFamily: '"Inter", sans-serif' }}>
                    Every pillar depends on fiscal capacity. Vietnam's tax-to-GDP ratio of 16.8% (2023) is roughly 2.7 points below the regional average — a gap driven largely by the 68.5% of workers outside the formal tax base. This is the connection between informality and 2045.
                  </p>
                </div>
              </div>
            </div>
          </Fade>

          {/* Policy reform cards */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2px', background: '#e0e0e0', marginBottom: '48px', alignItems: 'stretch' }}>
            {[
              {
                tag: 'Social Insurance Reform',
                color: TEAL,
                title: '60% social insurance coverage by 2030',
                body: 'The 2024 Social Insurance Law significantly expanded mandatory enrollment, extending coverage to enterprise owners, household business operators, and part-time workers previously excluded. Voluntary enrollment mechanisms for the self-employed have been simplified. The explicit 60% coverage target by 2030, under Resolution 28-NQ/TW, is the single most direct formalization lever in current policy.',
                source: '2024 Social Insurance Law; Resolution 28-NQ/TW',
              },
              {
                tag: 'Tax Administration',
                color: '#1e6fa8',
                title: 'Electronic tax filing and simplified business registration',
                body: "Vietnam has expanded e-tax filing, reducing compliance costs for registered businesses. The one-stop business registration portal has cut registration time significantly. Tax threshold reforms are under discussion to bring micro-enterprises into the tax net at graduated rates before requiring full compliance — an approach consistent with ILO Recommendation No. 204.",
                source: 'Vietnam General Tax Department; World Bank Doing Business; ILO R204',
              },
              {
                tag: 'Intergovernmental Fiscal Reform',
                color: '#7c3aed',
                title: 'Revising VAT, CIT, and PIT sharing formulas',
                body: 'The 2045 plan calls for reforming fiscal sharing between central and provincial governments and adjusting VAT, corporate income tax, and personal income tax allocations to better match economic activity. New own-source revenue instruments are under discussion, including property taxes and PIT surtaxes at the subnational level.',
                source: 'Viet Nam 2045: Breaking Through, Part 4; OECD Economic Survey 2025',
              },
              {
                tag: 'Public Administration',
                color: '#c2410c',
                title: 'Streamlining government and civil service reform',
                body: 'Beginning in August 2024, Vietnam launched the most significant administrative restructuring since Doi Moi, consolidating ministries, reducing the number of provincial units, and trimming the civil service by approximately 20%. Civil servant salaries rose 30% in July 2024. The goal is to reduce overhead and improve the efficiency of public investment implementation, which has consistently disbursed below annual targets.',
                source: 'Resolution 18-NQ/TW; World Bank 2045 Report',
              },
            ].map(({ tag, color, title, body, source }) => (
              <div key={title} style={{ background: 'white', padding: '36px', borderTop: `3px solid ${color}`, display: 'flex', flexDirection: 'column', boxSizing: 'border-box' }}>
                <div style={{ fontSize: '10px', fontWeight: '700', color, fontFamily: '"Inter", sans-serif', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '10px' }}>{tag}</div>
                <h4 style={{ fontSize: '17px', fontWeight: '400', margin: '0 0 14px 0', lineHeight: '1.3', fontFamily: '"Georgia", "Times New Roman", serif' }}>{title}</h4>
                <p style={{ fontSize: '13px', color: '#666', lineHeight: '1.75', margin: '0 0 14px 0', fontFamily: '"Inter", sans-serif', flex: 1 }}>{body}</p>
                <div style={{ fontSize: '11px', color: '#bbb', fontFamily: '"Inter", sans-serif', fontStyle: 'italic' }}>{source}</div>
              </div>
            ))}
          </div>

          {/* Comparative context with case studies link */}
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
                    lesson: 'The formal wage premium is the lever. Enforcement follows from economic transformation, not the other way around.',
                  },
                  {
                    country: 'Chile',
                    years: '1981–2013',
                    income: 'Upper-middle → high-income',
                    mechanism: "Chile's 1981 pension reform created individual retirement accounts. Workers could see their contributions accumulating as personal savings. Formalization rose not because enforcement intensified but because workers had a tangible individual reason to demand formal contracts.",
                    lesson: 'Making social insurance benefits visible and personal generates voluntary formalization. Opacity destroys it.',
                  },
                ].map(({ country, years, income, mechanism, lesson }) => (
                  <div key={country} style={{ background: '#1a1a1a', padding: '28px 32px' }}>
                    <div style={{ fontSize: '10px', fontWeight: '700', color: '#4dd0c4', fontFamily: '"Inter", sans-serif', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '6px' }}>{country} · {years}</div>
                    <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', fontFamily: '"Inter", sans-serif', marginBottom: '14px', fontStyle: 'italic' }}>{income}</div>
                    <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.65)', lineHeight: '1.75', margin: '0 0 14px 0', fontFamily: '"Inter", sans-serif' }}>{mechanism}</p>
                    <p style={{ fontSize: '13px', color: '#4dd0c4', lineHeight: '1.65', margin: 0, fontFamily: '"Inter", sans-serif', borderLeft: '2px solid #4dd0c4', paddingLeft: '12px' }}>{lesson}</p>
                  </div>
                ))}
              </div>
              {/* ADDED: case studies link */}
              <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid #2a2a2a' }}>
                <button
                  onClick={() => onNavigate('case-studies')}
                  style={{ background: 'rgba(14,116,144,0.15)', border: '1px solid rgba(77,208,196,0.4)', color: '#4dd0c4', padding: '8px 18px', fontSize: '12px', fontWeight: '600', cursor: 'pointer', fontFamily: '"Inter", sans-serif' }}
                >
                  → Read the full case studies: trajectory charts, mechanisms, lessons
                </button>
              </div>
            </div>
          </Fade>
        </div>

        <div style={{ borderTop: '1px solid #e0e0e0', margin: '80px 0 0 0' }} />

        {/* C. ADJUSTMENTS */}
        <div id="adjustments" style={{ padding: '80px 0 0 0' }}>
          <Fade>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '48px' }}>
              <div style={{ background: '#1e6fa8', color: 'white', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: '700', fontFamily: '"Inter", sans-serif', flexShrink: 0 }}>C</div>
              <div>
                <SectionLabel color="#1e6fa8">Potential Adjustments</SectionLabel>
                <h2 style={{ fontSize: 'clamp(22px, 3vw, 34px)', fontWeight: '400', margin: 0, letterSpacing: '-0.5px', lineHeight: '1.2' }}>
                  Three evidence-based improvements to the current approach
                </h2>
              </div>
            </div>
          </Fade>

          <Fade>
            <p style={{ fontSize: '17px', color: '#333', lineHeight: '1.85', margin: '0 0 48px 0', maxWidth: '760px' }}>
              Three adjustments stand out as high-evidence, low-disruption improvements, drawn from comparative experience and from the structural diagnosis in Section A.
            </p>
          </Fade>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', background: '#e0e0e0', marginBottom: '48px' }}>
            {[
              {
                num: '01',
                color: '#1e6fa8',
                title: 'Restructure the social insurance contribution rate',
                // CORRECTED: updated rate description
                body: "Vietnam's social insurance contribution rate — approximately 25% for household business owners (self-financed) and 28% for wage employees (combined employer and employee) under the 2024 Social Insurance Law — remains among the highest in Southeast Asia for a country at this income level. Indonesia's total rate is approximately 18%; Thailand's is around 10%. For small firms operating on thin margins, this is often the decisive reason to stay informal. A phased reduction to 20–22% total for employees, offset by a broadened contribution base, would improve compliance without a large revenue loss. ILO Recommendation No. 204 explicitly endorses contribution rate reform as a formalization lever.",
                evidence: 'ILO R204 §14; OECD Revenue Statistics; World Bank SEA labor market comparisons; ILO/VIDERI HHB Survey 2024',
              },
              {
                num: '02',
                color: '#1e6fa8',
                title: 'Introduce a simplified tax regime for micro-enterprises',
                body: "Currently, the choice for a small informal business is binary: full formal registration with complex accounting requirements and high contribution rates, or informality. A tiered middle option — a simplified flat tax at 1–2% of estimated revenue, combined with basic legal status and access to business banking — would bring millions of household businesses into at least partial formality. This is the approach used in Brazil (Simples Nacional), Mexico (REPECO), and more recently Ghana. It generates revenue that currently produces zero, provides partial social protection, and creates an on-ramp to full formalization as businesses grow.",
                evidence: 'Brazil Simples Nacional outcomes (World Bank 2019); Mexico IMSS-E scheme; ILO R204 §11; ILO Innovative Approaches 2025',
              },
              {
                num: '03',
                color: '#1e6fa8',
                title: 'Make social insurance benefits portable and immediately valuable',
                // CORRECTED: 4% HHB, not 5%
                body: "The weak voluntary enrollment rate — fewer than 4% of household business owners as of 2023 — reflects a rational calculation: contributions buy a pension benefit 20–30 years away, with no near-term payoff. Reforms that increase the near-term value of enrollment — health insurance access, maternity benefits, injury compensation — and that guarantee full portability of accumulated rights when workers change jobs would raise the perceived value of contributing. Vietnam's 2024 Social Insurance Law made progress on portability; the next step is increasing the salience of short-term benefits for workers considering enrollment.",
                evidence: 'World Bank 2023 social insurance demand survey; ILO/VIDERI HHB Survey 2024; Chile AFP portability reform; ILO R204 §18',
              },
            ].map(({ num, color, title, body, evidence }) => (
              <Fade key={num}>
                <div style={{ background: 'white', padding: '40px', borderLeft: `4px solid ${color}` }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '80px 1fr', gap: '32px', alignItems: 'start' }}>
                    <div style={{ fontSize: '48px', fontWeight: '400', color, lineHeight: 1, letterSpacing: '-2px', fontFamily: '"Georgia", serif' }}>{num}</div>
                    <div>
                      <h4 style={{ fontSize: '19px', fontWeight: '400', margin: '0 0 16px 0', lineHeight: '1.3', letterSpacing: '-0.2px' }}>{title}</h4>
                      <p style={{ fontSize: '15px', color: '#555', lineHeight: '1.8', margin: '0 0 14px 0', fontFamily: '"Inter", sans-serif' }}>{body}</p>
                      <div style={{ fontSize: '11px', color: '#bbb', fontFamily: '"Inter", sans-serif', fontStyle: 'italic' }}>Evidence basis: {evidence}</div>
                    </div>
                  </div>
                </div>
              </Fade>
            ))}
          </div>
        </div>

        <div style={{ borderTop: '1px solid #e0e0e0', margin: '80px 0 0 0' }} />

        {/* D. MERITS & PITFALLS */}
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
            <Fade>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px', paddingBottom: '16px', borderBottom: '2px solid #16a34a' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#16a34a', flexShrink: 0 }} />
                  <div style={{ fontSize: '13px', fontWeight: '700', color: '#16a34a', fontFamily: '"Inter", sans-serif', letterSpacing: '1.5px', textTransform: 'uppercase' }}>Merits of the current approach</div>
                </div>
                {[
                  { title: 'Institutional focus is well-placed', body: 'The 2045 framework correctly identifies institutional quality as the binding constraint. Evidence from comparable transitions supports this: South Korea and Chile both required institutional reform before fiscal capacity improved durably.' },
                  { title: 'The 2024 Social Insurance Law is a genuine advance', body: 'Extending mandatory coverage to enterprise owners and household business operators closes a significant legal gap. Combined with simplified voluntary enrollment, it creates pathways that previously did not exist.' },
                  { title: 'Administrative restructuring reduces friction', body: 'The 2024 consolidation of ministries and reduction in approval layers directly addresses a documented bottleneck in public investment implementation. Fewer approval points means faster disbursement of infrastructure spending.' },
                  { title: 'The 60% coverage target is credible and trackable', body: "Setting an explicit, time-bound formalization target creates accountability. The 2030 deadline is achievable given current trajectory and new legal provisions, and the GSO's annual labor force survey provides robust data to measure progress." },
                ].map(({ title, body }) => (
                  <div key={title} style={{ marginBottom: '24px', paddingLeft: '16px', borderLeft: '2px solid #dcfce7' }}>
                    <div style={{ fontSize: '14px', fontWeight: '600', color: '#1a1a1a', marginBottom: '6px', fontFamily: '"Inter", sans-serif' }}>{title}</div>
                    <div style={{ fontSize: '13px', color: '#666', lineHeight: '1.7', fontFamily: '"Inter", sans-serif' }}>{body}</div>
                  </div>
                ))}
              </div>
            </Fade>

            <Fade delay={0.1}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px', paddingBottom: '16px', borderBottom: '2px solid #dc2626' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#dc2626', flexShrink: 0 }} />
                  <div style={{ fontSize: '13px', fontWeight: '700', color: '#dc2626', fontFamily: '"Inter", sans-serif', letterSpacing: '1.5px', textTransform: 'uppercase' }}>Pitfalls and risks</div>
                </div>
                {[
                  { title: 'Enforcement can harm the workers it aims to protect', body: "The 2008 Hanoi street vendor ban is the cautionary case: aggressive enforcement of formalization rules, without adequate alternative livelihoods, simply impoverishes vulnerable workers rather than formalizing them. Turner and Schoenberger (2011) document vendors relocating rather than registering." },
                  { title: 'Informality may displace rather than formalize', body: "If contribution requirements increase without a corresponding increase in formal wage premiums, firms may substitute capital for labor, reduce headcount, or relocate to less-monitored provinces. Formalization that produces unemployment is not progress." },
                  { title: 'Agricultural informality requires structural change, not policy', body: "The 97.9% informality rate in agriculture is essentially unreachable through conventional formalization tools. These workers will formalize when — and only when — Vietnam's structural transformation moves them into manufacturing and services." },
                  { title: 'Trust gaps undermine the social insurance mandate', body: "ILO/VIDERI fieldwork found that even among registered household businesses, the majority of owners who were unwilling to join cited commercial insurance and personal savings as sufficient alternatives. Mandating enrollment without fixing the legibility of benefits risks producing paper compliance, not real protection." },
                ].map(({ title, body }) => (
                  <div key={title} style={{ marginBottom: '24px', paddingLeft: '16px', borderLeft: '2px solid #fee2e2' }}>
                    <div style={{ fontSize: '14px', fontWeight: '600', color: '#1a1a1a', marginBottom: '6px', fontFamily: '"Inter", sans-serif' }}>{title}</div>
                    <div style={{ fontSize: '13px', color: '#666', lineHeight: '1.7', fontFamily: '"Inter", sans-serif' }}>{body}</div>
                  </div>
                ))}
              </div>
            </Fade>
          </div>

          {/* Sources */}
          <Fade>
            <div style={{ borderTop: '1px solid #e0e0e0', paddingTop: '32px' }}>
              <div style={{ fontSize: '11px', fontWeight: '700', color: '#bbb', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '16px', fontFamily: '"Inter", sans-serif' }}>Sources for this section</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxWidth: '760px' }}>
                {[
                  'World Bank. Viet Nam 2045: Breaking Through. 2024.',
                  'GSO/ILO. Overall Situation of Workers in Informal Employment in Viet Nam. 2021.',
                  'ILO/VIDERI. Expanding Social Insurance for Household Businesses in Viet Nam. 2024.',
                  'ILO Recommendation No. 204. Transition from the Informal to the Formal Economy. 2015.',
                  'OECD. Revenue Statistics in Asia and the Pacific 2025: Viet Nam.',
                  'OECD. Economic Survey of Viet Nam 2025.',
                  'IMF. Vietnam: Selected Issues. Country Report No. 2024/307.',
                  'World Bank. Brazil Simples Nacional: Impact Assessment. 2019.',
                  'Turner, S. & Schoenberger, L. Street Vendor Livelihoods and Everyday Politics in Hanoi. Urban Studies, 2012.',
                  'Nghiem, S. & Roubaud, F. Measuring the Non-Observable Economy in Vietnam. 2019.',
                ].map(src => (
                  <div key={src} style={{ fontSize: '12px', color: '#999', lineHeight: '1.6', fontFamily: '"Inter", sans-serif', paddingLeft: '12px', borderLeft: '2px solid #e0e0e0' }}>{src}</div>
                ))}
              </div>
            </div>
          </Fade>
        </div>
      </div>

      {/* DATA NOTES */}
      <div style={{ background: '#f5f5f5', borderTop: '1px solid #e0e0e0', padding: '28px 48px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ fontSize: '11px', fontWeight: '700', color: '#bbb', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '10px', fontFamily: '"Inter", sans-serif' }}>Data Notes</div>
          <p style={{ fontSize: '12px', color: '#999', lineHeight: '1.75', margin: 0, fontFamily: '"Inter", sans-serif', maxWidth: '900px' }}>
            Tax-to-GDP ratio: OECD Revenue Statistics Asia-Pacific 2025 reports 16.8% for Vietnam in 2023, down from 18.8% in 2022. The 2002–2022 peer comparison chart uses OECD data for those years; the 2023 figure is reported separately in the callout strip. The 68.5% informality rate is from GSO/ILO 2021 using the ILO-aligned methodology including agriculture and forestry workers. Contribution rates reflect the 2024 Social Insurance Law; the pre-2024 combined employer and employee rate for wage workers was approximately 32% including all branches. GNI trajectory chart uses World Bank current USD estimates; projected values are modeled at Vietnam's stated 7–8% annual growth target and should be treated as illustrative, not predictive. Peer comparison countries for tax ratio are Vietnam, Indonesia, Malaysia, Philippines, and Thailand using OECD Revenue Statistics data 2002–2022.
          </p>
        </div>
      </div>

      {/* FOOTER NAV */}
      <div style={{ background: '#1a1a1a', borderTop: '1px solid #2a2a2a', padding: '20px 48px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <button onClick={() => onNavigate('maps')} style={{ background: 'none', border: '1px solid #333', color: 'rgba(255,255,255,0.4)', padding: '7px 14px', fontSize: '12px', fontWeight: '600', cursor: 'pointer', fontFamily: '"Inter", sans-serif' }}>
          ← Part II: Interactive Maps
        </button>
        <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.2)', margin: 0, fontFamily: '"Inter", sans-serif' }}>
          ECON 62 · Topics in Macroeconomics · Winter 2026
        </p>
        <button onClick={() => onNavigate('fiscal')} style={{ background: '#4dd0c4', color: '#0f0f0f', border: 'none', padding: '7px 18px', fontSize: '12px', fontWeight: '700', cursor: 'pointer', fontFamily: '"Inter", sans-serif' }}>
          Part IV: Fiscal Calculator →
        </button>
      </div>

    </div>
  );
}
