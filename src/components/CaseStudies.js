// ========================================
// CASE STUDIES
// Part V of Vietnam Informal Economy project
// South Korea (1963-1995) and Chile (1981-2013)
// Trajectory charts, mechanisms, lessons,
// data notes on approximation of historical data
// ========================================

import React, { useState, useEffect, useRef } from 'react';

function useInView(threshold = 0.1) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

// ── Animated trajectory chart (GDP per capita vs informality rate) ─────────
// NOTE: Korea historical figures (1963-1995) are derived from secondary
// literature (Kim 1991; World Bank retrospective estimates). Primary LFS
// data for this period is not available. Figures are approximate.
// Chile figures (1981-2013) are similarly based on World Bank Development
// Indicators and ILO retrospective estimates. Current rates from ILOSTAT:
// Korea 26.6% (2019), Chile 27.4% (2021).
function TrajectoryChart({ data, color }) {
  const [revealed, setRevealed] = useState(false);
  const [hovered, setHovered] = useState(null);
  const [ref, visible] = useInView(0.15);

  useEffect(() => {
    if (visible && !revealed) {
      const timer = setTimeout(() => setRevealed(true), 300);
      return () => clearTimeout(timer);
    }
  }, [visible]);

  const IW = 340, IH = 160;
  const PAD = { t: 12, r: 20, b: 28, l: 36 };
  const W = IW - PAD.l - PAD.r;
  const H = IH - PAD.t - PAD.b;

  const gdpVals = data.map(d => d.gdp);
  const infVals = data.map(d => d.inf);
  const minGDP = Math.min(...gdpVals), maxGDP = Math.max(...gdpVals);
  const minInf = Math.min(...infVals) - 3, maxInf = Math.max(...infVals) + 3;

  const xS = v => PAD.l + ((v - minGDP) / (maxGDP - minGDP)) * W;
  const yS = v => PAD.t + H - ((v - minInf) / (maxInf - minInf)) * H;

  const visCount = revealed ? data.length : 0;
  const hovPt = hovered !== null && hovered < data.length ? data[hovered] : null;

  return (
    <div ref={ref} style={{ width: '100%' }}>
      <svg viewBox={`0 0 ${IW} ${IH}`} style={{ width: '100%', height: 'auto', overflow: 'visible' }}>
        {/* Axes */}
        <line x1={PAD.l} y1={PAD.t} x2={PAD.l} y2={PAD.t + H} stroke="#2a2a2a" strokeWidth={1} />
        <line x1={PAD.l} y1={PAD.t + H} x2={PAD.l + W} y2={PAD.t + H} stroke="#2a2a2a" strokeWidth={1} />
        <text x={PAD.l + W / 2} y={IH - 2} fontSize={8} fill="rgba(255,255,255,0.3)" textAnchor="middle" fontFamily="Inter, sans-serif">GDP per capita (USD)</text>
        <text x={8} y={PAD.t + H / 2} fontSize={8} fill="rgba(255,255,255,0.3)" textAnchor="middle" fontFamily="Inter, sans-serif" transform={`rotate(-90, 8, ${PAD.t + H / 2})`}>Informality %</text>

        {/* Y-axis ticks */}
        {[minInf + 5, minInf + 15, minInf + 25, minInf + 35].filter(v => v <= maxInf).map(v => (
          <g key={v}>
            <line x1={PAD.l - 3} y1={yS(v)} x2={PAD.l} y2={yS(v)} stroke="#2a2a2a" strokeWidth={1} />
            <text x={PAD.l - 5} y={yS(v) + 3} fontSize={7} fill="rgba(255,255,255,0.3)" textAnchor="end" fontFamily="Inter, sans-serif">{Math.round(v)}%</text>
          </g>
        ))}

        {/* Trend line */}
        {revealed && (
          <polyline
            points={data.slice(0, visCount).map(d => `${xS(d.gdp)},${yS(d.inf)}`).join(' ')}
            fill="none" stroke={color} strokeWidth={1.5} strokeOpacity={0.4} strokeDasharray="3 2"
          />
        )}

        {/* Arrow head at end */}
        {revealed && visCount > 1 && (() => {
          const last = data[visCount - 1];
          const prev = data[visCount - 2];
          const dx = xS(last.gdp) - xS(prev.gdp);
          const dy = yS(last.inf) - yS(prev.inf);
          const len = Math.sqrt(dx * dx + dy * dy);
          if (len < 1) return null;
          const nx = dx / len, ny = dy / len;
          const ax = xS(last.gdp), ay = yS(last.inf);
          return (
            <polygon
              points={`${ax},${ay} ${ax - nx * 8 - ny * 4},${ay - ny * 8 + nx * 4} ${ax - nx * 8 + ny * 4},${ay - ny * 8 - nx * 4}`}
              fill={color} opacity={0.7}
            />
          );
        })()}

        {/* Data points */}
        <g>
          {data.slice(0, visCount).map((d, i) => {
            const isH = hovered === i;
            const isLabeled = d.label;
            return (
              <g key={i} style={{ cursor: revealed ? 'crosshair' : 'default' }}
                onMouseEnter={() => revealed && setHovered(i)}
                onMouseLeave={() => setHovered(null)}>
                <circle cx={xS(d.gdp)} cy={yS(d.inf)} r={10} fill="transparent" />
                <circle cx={xS(d.gdp)} cy={yS(d.inf)}
                  r={revealed ? (isH ? 6 : isLabeled ? 4.5 : 3) : 0}
                  fill={isLabeled ? color : 'white'}
                  stroke={color} strokeWidth={isLabeled ? 0 : 1.5}
                  style={{ transition: 'r 0.1s' }} />
                {isLabeled && revealed && (
                  <text x={xS(d.gdp) + (d.off ? d.off[0] : 7)} y={yS(d.inf) + (d.off ? d.off[1] : 4)}
                    fontSize={9.5} fontWeight="700" fill={color} fontFamily="Inter, sans-serif">{d.year}</text>
                )}
              </g>
            );
          })}
        </g>

        {/* Tooltip */}
        {hovPt && hovered !== null && hovered < visCount && (() => {
          const tx = xS(hovPt.gdp);
          const ty = yS(hovPt.inf);
          const flipX = tx > IW * 0.65;
          const ttx = flipX ? tx - 124 : tx + 12;
          return (
            <g>
              <rect x={ttx} y={ty - 30} width={114} height={44} fill="#1a1a1a" rx={3} />
              <text x={ttx + 8} y={ty - 14} fontSize={10} fontWeight="700" fill="white" fontFamily="Inter, sans-serif">{hovPt.year}</text>
              <text x={ttx + 8} y={ty - 2} fontSize={9} fill="rgba(255,255,255,0.65)" fontFamily="Inter, sans-serif">{`GDP: $${hovPt.gdp >= 1000 ? (hovPt.gdp / 1000).toFixed(1) + 'k' : hovPt.gdp}`}</text>
              <text x={ttx + 8} y={ty + 10} fontSize={9} fill="rgba(255,255,255,0.65)" fontFamily="Inter, sans-serif">{`Informality: ${hovPt.inf}%`}</text>
            </g>
          );
        })()}
      </svg>
      <div style={{ fontSize: '8px', color: 'rgba(255,255,255,0.2)', fontFamily: '"Inter", sans-serif', fontStyle: 'italic', marginTop: '2px' }}>
        Historical estimates — see data notes below. Hover any point for data. Arrow shows trajectory direction.
      </div>
    </div>
  );
}

function CaseCard({ country, onNavigate }) {
  const [ref, visible] = useInView(0.1);
  return (
    <div ref={ref} style={{
      background: 'white', border: '1px solid #e8e4e0', borderTop: `4px solid ${country.color}`,
      overflow: 'hidden', opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(32px)',
      transition: 'opacity 0.7s ease, transform 0.7s ease'
    }}>
      {/* Photo header */}
      <div style={{ width: '100%', height: '200px', backgroundImage: `url(${country.photo})`, backgroundSize: 'cover', backgroundPosition: country.photoPos || 'center', position: 'relative' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 55%)' }} />
        <div style={{ position: 'absolute', bottom: '16px', left: '20px', right: '20px' }}>
          <div style={{ fontSize: '10px', fontWeight: '700', color: 'rgba(255,255,255,0.7)', letterSpacing: '2.5px', textTransform: 'uppercase', fontFamily: '"Inter", sans-serif', marginBottom: '3px' }}>{country.period}</div>
          <div style={{ fontSize: '28px', fontWeight: '300', color: 'white', fontFamily: '"Cormorant Garamond", serif', lineHeight: 1.1 }}>{country.name}</div>
        </div>
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '3px', background: country.color, opacity: 0.6 }} />
      </div>

      {/* Headline */}
      <div style={{ padding: '24px 24px 0' }}>
        <p style={{ fontSize: '15px', fontStyle: 'italic', fontFamily: '"Cormorant Garamond", serif', color: '#333', lineHeight: '1.65', margin: '0 0 20px 0', borderLeft: `3px solid ${country.color}`, paddingLeft: '14px' }}>
          {country.headline}
        </p>

        {/* Stats grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1px', background: '#e8e4e0', marginBottom: '24px' }}>
          {country.stats.map(s => (
            <div key={s.label} style={{ background: '#fafaf8', padding: '12px 10px' }}>
              <div style={{ fontSize: '18px', fontWeight: '300', color: country.color, fontFamily: '"Cormorant Garamond", serif', lineHeight: 1 }}>{s.value}</div>
              <div style={{ fontSize: '9px', color: '#aaa', marginTop: '4px', fontFamily: '"Inter", sans-serif', lineHeight: '1.35', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Trajectory chart */}
        <div style={{ marginBottom: '4px' }}>
          <div style={{ fontSize: '9px', fontWeight: '700', color: '#bbb', letterSpacing: '1.5px', textTransform: 'uppercase', fontFamily: '"Inter", sans-serif', marginBottom: '10px' }}>
            Development Trajectory · GDP vs. Informality
          </div>
          <div style={{ paddingLeft: '20px', paddingBottom: '8px' }}>
            <TrajectoryChart data={country.scatterData} color={country.color} />
          </div>
        </div>
      </div>

      {/* Mechanism and lesson */}
      <div style={{ padding: '16px 24px 24px' }}>
        <div style={{ marginBottom: '18px' }}>
          <div style={{ fontSize: '9px', fontWeight: '700', color: country.color, letterSpacing: '2px', textTransform: 'uppercase', fontFamily: '"Inter", sans-serif', marginBottom: '8px' }}>How Formalization Happened</div>
          <p style={{ fontSize: '13px', lineHeight: '1.8', color: '#555', fontFamily: '"Inter", sans-serif', margin: 0 }}>{country.mechanism}</p>
        </div>

        <div style={{ background: '#0f1f1e', padding: '16px 18px', borderLeft: '3px solid #4dd0c4', marginBottom: '12px' }}>
          <div style={{ fontSize: '9px', fontWeight: '700', color: '#4dd0c4', letterSpacing: '2px', textTransform: 'uppercase', fontFamily: '"Inter", sans-serif', marginBottom: '7px' }}>Lesson for Vietnam</div>
          <p style={{ fontSize: '13px', lineHeight: '1.75', color: 'rgba(255,255,255,0.72)', fontFamily: '"Inter", sans-serif', margin: '0 0 10px 0' }}>{country.lesson}</p>
          {/* Inline link to relevant next section */}
          {country.linkTo && (
            <button
              onClick={() => onNavigate(country.linkTo)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '11px', fontWeight: '600', color: '#4dd0c4', padding: 0, textDecoration: 'underline', fontFamily: '"Inter", sans-serif' }}
            >
              {country.linkLabel}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default function CaseStudies({ onBack, onNavigate }) {

  const KOREA = {
    name: 'South Korea', period: '1963 – 1995', color: '#1565c0',
    photo: 'https://images.unsplash.com/photo-1538669715315-155098f0fb1d?w=900&q=80',
    photoPos: 'center 30%',
    headline: 'Formalization followed formal jobs — not the other way around. Manufacturing pulled tens of millions of workers into the registered economy over three decades.',
    stats: [
      { value: '~72%', label: 'Informality, 1963 (est.)' },
      { value: '<20%', label: 'Informality, 1995 (est.)' },
      { value: '$330→$12.5k', label: 'GDP per capita' },
    ],
    mechanism: "South Korea in 1960 was poorer than Ghana, with over 70% of its workforce in informal agriculture and petty trade. The government's export-led industrialization — textiles, electronics, shipbuilding, steel — created massive formal employment at scale. Social insurance did not precede formalization; it followed the formal contracts that came with factory work. National Health Insurance (1977) and the National Pension (1988) both expanded in step with the formal workforce. Workers became formal not because the state required it, but because formal jobs offered wages, stability, and benefits that informal work could not match.",
    lesson: "Vietnam's informality is similarly concentrated in agriculture and small-scale trade. Korea's experience suggests that formal manufacturing job creation — not social insurance expansion alone — is what structurally drives the transition. Samsung is already Vietnam's largest single employer. The question is whether Vietnamese-owned firms can scale the way the chaebols did.",
    linkTo: 'fiscal',
    linkLabel: '→ Model the fiscal implications for Vietnam',
    scatterData: [
      { year: 1963, gdp: 335,   inf: 72, label: true, off: [8, 4] },
      { year: 1967, gdp: 576,   inf: 67 },
      { year: 1970, gdp: 886,   inf: 62, label: true, off: [8, -8] },
      { year: 1975, gdp: 1676,  inf: 55 },
      { year: 1980, gdp: 2733,  inf: 47, label: true, off: [8, 4] },
      { year: 1985, gdp: 3046,  inf: 40 },
      { year: 1988, gdp: 4881,  inf: 35, label: true, off: [8, -8] },
      { year: 1991, gdp: 7523,  inf: 28 },
      { year: 1993, gdp: 9068,  inf: 23 },
      { year: 1995, gdp: 12558, inf: 19, label: true, off: [-38, -10] },
    ],
  };

  const CHILE = {
    name: 'Chile', period: '1981 – 2013', color: '#b71c1c',
    photo: 'https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?w=900&q=80',
    photoPos: 'center 45%',
    headline: 'A pension reform that made formal employment personally worth wanting — workers enrolled not because they were forced to, but because their retirement depended on it.',
    stats: [
      { value: '~48%', label: 'Informality, 1981 (est.)' },
      { value: '~28%', label: 'Informality, 2013 (est.)' },
      { value: '$2.5k→$15k', label: 'GDP per capita' },
    ],
    mechanism: "Chile's 1981 pension reform replaced a state pay-as-you-go system with individually managed private accounts (AFPs). Under the old system, pension benefits were disconnected from individual contributions. Under the new one, your retirement was literally your own savings — accumulated only while formally employed. This created a direct personal incentive to demand formal contracts and declare income. Formalization rose not because enforcement intensified, but because workers could see a tangible individual return to being formal. The reform also deepened Chile's capital markets significantly, channeling long-term pension savings into productive investment.",
    lesson: "Chile's experience is most relevant for Vietnam's self-employed and own-account workers — street vendors, small traders, gig workers — who rationally avoid formality because the costs outweigh the benefits. If Vietnam's social insurance reforms can make the benefit side of formalization tangibly personal and portable, voluntary enrollment could rise without coercive enforcement. Vietnam's 2024 Social Insurance Law expanded mandatory coverage; the deeper question is whether informal workers are being offered a genuinely compelling deal.",
    linkTo: 'policy',
    linkLabel: '→ See how this informs the policy recommendations',
    scatterData: [
      { year: 1981, gdp: 2527,  inf: 48, label: true, off: [8, 4] },
      { year: 1984, gdp: 2116,  inf: 46 },
      { year: 1987, gdp: 2967,  inf: 43, label: true, off: [8, -8] },
      { year: 1990, gdp: 3869,  inf: 42 },
      { year: 1994, gdp: 5261,  inf: 39 },
      { year: 1998, gdp: 7065,  inf: 37, label: true, off: [8, 4] },
      { year: 2002, gdp: 7047,  inf: 35 },
      { year: 2006, gdp: 10116, inf: 32 },
      { year: 2010, gdp: 12784, inf: 30, label: true, off: [8, -8] },
      { year: 2013, gdp: 15732, inf: 28, label: true, off: [-36, -10] },
    ],
  };

  return (
    <div style={{ background: '#f5f3f0', minHeight: '100vh', fontFamily: '"Cormorant Garamond", "Georgia", serif' }}>

      {/* HEADER */}
      <div style={{ background: '#1a1a1a', padding: '44px 40px 36px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <button onClick={onBack} style={{
            background: 'transparent', border: '1px solid rgba(255,255,255,0.2)',
            color: 'rgba(255,255,255,0.6)', padding: '6px 14px',
            fontSize: '12px', fontWeight: '600', cursor: 'pointer',
            fontFamily: '"Inter", sans-serif', letterSpacing: '0.5px',
            marginBottom: '20px', borderRadius: '3px'
          }}>← Back to Overview</button>
          <div style={{ fontSize: '10px', fontWeight: '700', color: '#4dd0c4', letterSpacing: '3px', textTransform: 'uppercase', fontFamily: '"Inter", sans-serif', marginBottom: '14px' }}>
            Part V · Comparative Case Studies
          </div>
          <h2 style={{ fontSize: 'clamp(26px, 3vw, 40px)', fontWeight: '300', color: 'white', margin: '0 0 14px 0', letterSpacing: '-0.5px', lineHeight: 1.15 }}>
            Two countries that made the transition
          </h2>
          <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.55)', fontFamily: '"Inter", sans-serif', margin: 0, maxWidth: '660px', lineHeight: '1.7' }}>
            South Korea and Chile both crossed the high-income threshold within a generation, starting from informality rates comparable to Vietnam today. Their mechanisms were different. What they share is instructive.
          </p>
        </div>
      </div>

      {/* CASE CARDS */}
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '44px 40px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '28px', marginBottom: '44px' }}>
          <CaseCard country={KOREA} onNavigate={onNavigate} />
          <CaseCard country={CHILE} onNavigate={onNavigate} />
        </div>

        {/* WHAT BOTH CASES SHARE */}
        <div style={{ background: 'white', border: '1px solid #e8e4e0', borderTop: '3px solid #00897b', padding: '32px', marginBottom: '20px' }}>
          <div style={{ fontSize: '10px', fontWeight: '700', color: '#00897b', letterSpacing: '2.5px', textTransform: 'uppercase', fontFamily: '"Inter", sans-serif', marginBottom: '20px' }}>
            What Both Cases Share
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '28px' }}>
            {[
              {
                title: 'Formalization was a byproduct, not a target',
                body: "Neither country ran a formalization campaign. In Korea, factory jobs came with contracts. In Chile, pension accounts made formal employment worth wanting. The formal economy expanded because it offered something workers genuinely valued."
              },
              {
                title: 'The benefit side of the equation mattered',
                body: "Enforcement alone doesn't explain either transition. What changed was the personal calculus for individual workers — the returns to being formal rose relative to the costs. Social insurance worked when it was visible, portable, and personally beneficial."
              },
              {
                title: 'Informality reflected rational choices, not failure',
                body: "In both countries, informal workers were not misunderstanding the system. They were responding correctly to the incentives they faced. Reforming those incentives — rather than penalizing workers — is what produced durable results."
              }
            ].map(item => (
              <div key={item.title}>
                <h4 style={{ fontSize: '16px', fontWeight: '400', fontFamily: '"Cormorant Garamond", serif', margin: '0 0 10px 0', lineHeight: '1.3', color: '#1a1a1a' }}>{item.title}</h4>
                <p style={{ fontSize: '13px', lineHeight: '1.8', color: '#666', fontFamily: '"Inter", sans-serif', margin: 0 }}>{item.body}</p>
              </div>
            ))}
          </div>
        </div>

        {/* SOURCES AND DATA NOTES */}
        <div style={{ paddingTop: '18px', borderTop: '1px solid #e8e4e0' }}>
          <div style={{ fontSize: '9px', fontWeight: '700', color: '#ccc', letterSpacing: '2px', textTransform: 'uppercase', fontFamily: '"Inter", sans-serif', marginBottom: '10px' }}>Data Sources</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5px 36px', marginBottom: '16px' }}>
            {[
              'World Bank Development Indicators: GDP per capita (current USD), Korea & Chile.',
              'ILO ILOSTAT: Informal employment estimates by country. Korea 26.6% (2019), Chile 27.4% (2021).',
              'Kim, K.S. (1991). The Korean Miracle Revisited. Kellogg Institute Working Paper.',
              'Barr, N. & Diamond, P. (2016). Reforming Pensions in Chile. MIT Economics.',
              'IMF (1996). Pension Reform, Financial Market Development, and Economic Growth. WP/96/94.',
              'ILO (2025). Innovative Approaches to Formalization in Asia and the Pacific.',
            ].map(src => (
              <div key={src} style={{ fontSize: '10px', color: '#bbb', lineHeight: '1.5', fontFamily: '"Inter", sans-serif' }}>{src}</div>
            ))}
          </div>

          {/* DATA NOTES — approximation disclaimer */}
          <div style={{ background: '#fafaf8', border: '1px solid #e8e4e0', borderLeft: '3px solid #f97316', padding: '14px 18px' }}>
            <div style={{ fontSize: '9px', fontWeight: '700', color: '#f97316', letterSpacing: '2px', textTransform: 'uppercase', fontFamily: '"Inter", sans-serif', marginBottom: '6px' }}>Data Notes — Historical Approximations</div>
            <p style={{ fontSize: '11px', color: '#888', lineHeight: '1.65', margin: 0, fontFamily: '"Inter", sans-serif' }}>
              Korea historical informality estimates (1963–1995) and Chile estimates (1981–2013) shown in the trajectory charts are derived from secondary literature and World Bank retrospective estimates. Primary labor force survey data covering this full period with consistent informal employment definitions is not available. Figures should be treated as approximate and directional rather than precise. Current-year informality rates — Korea 26.6% (2019) and Chile 27.4% (2021) — are from ILOSTAT model estimates based on national household surveys and are comparable to Vietnam's 68.5% (2021, GSO/ILO ILO-aligned methodology). All GDP per capita figures use World Bank current USD.
            </p>
          </div>
        </div>
      </div>

      {/* FOOTER NAV */}
      <div style={{ background: '#1a1a1a', borderTop: '1px solid #2a2a2a', padding: '20px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <button onClick={() => onNavigate('fiscal')} style={{
          background: 'none', border: '1px solid #333', color: 'rgba(255,255,255,0.4)',
          padding: '7px 14px', fontSize: '12px', fontWeight: '600', cursor: 'pointer', fontFamily: '"Inter", sans-serif'
        }}>
          ← Part IV: Fiscal Calculator
        </button>
        <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.2)', margin: 0, fontFamily: '"Inter", sans-serif' }}>
          ECON 62 · Topics in Macroeconomics · Winter 2026
        </p>
        <button onClick={() => onNavigate('policy')} style={{
          background: '#4dd0c4', color: '#0f0f0f', border: 'none',
          padding: '7px 18px', fontSize: '12px', fontWeight: '700', cursor: 'pointer', fontFamily: '"Inter", sans-serif'
        }}>
          Part VI: Policy Analysis →
        </button>
      </div>

    </div>
  );
}
