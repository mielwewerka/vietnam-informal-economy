// ========================================
// CASE STUDIES — src/components/CaseStudies.js
// ========================================
import React, { useState, useEffect, useRef } from 'react';

function useInView(threshold = 0.2) {
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

function TrajectoryChart({ data, color }) {
  const [progress, setProgress] = useState(0);
  const [hovered, setHovered] = useState(null);
  const svgRef = useRef(null);
  const animRef = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.3 }
    );
    if (svgRef.current) obs.observe(svgRef.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;
    let start = null;
    const duration = 2400;
    const animate = (ts) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      setProgress(1 - Math.pow(1 - p, 3));
      if (p < 1) animRef.current = requestAnimationFrame(animate);
      else setProgress(1);
    };
    animRef.current = requestAnimationFrame(animate);
    return () => { if (animRef.current) cancelAnimationFrame(animRef.current); };
  }, [inView]);

  const W = 420, H = 260;
  const PAD = { top: 20, right: 20, bottom: 48, left: 48 };
  const IW = W - PAD.left - PAD.right;
  const IH = H - PAD.top - PAD.bottom;

  const gdps = data.map(d => d.gdp);
  const infs = data.map(d => d.inf);
  const minGdp = Math.min(...gdps) * 0.9;
  const maxGdp = Math.max(...gdps) * 1.05;
  const minInf = Math.min(...infs) * 0.85;
  const maxInf = Math.max(...infs) * 1.05;

  const xS = (v) => ((v - minGdp) / (maxGdp - minGdp)) * IW;
  const yS = (v) => IH - ((v - minInf) / (maxInf - minInf)) * IH;

  const visCount = Math.max(2, Math.round(progress * data.length));
  const visDat = data.slice(0, visCount);
  const pathD = visDat.map((d, i) =>
    `${i === 0 ? 'M' : 'L'}${xS(d.gdp).toFixed(1)},${yS(d.inf).toFixed(1)}`
  ).join(' ');

  let arrowAngle = 0;
  if (visDat.length >= 2) {
    const a = visDat[visDat.length - 2];
    const b = visDat[visDat.length - 1];
    arrowAngle = Math.atan2(yS(b.inf) - yS(a.inf), xS(b.gdp) - xS(a.gdp)) * 180 / Math.PI;
  }
  const lastPt = visDat[visDat.length - 1];

  const hicGdp = 13845;
  const showHIC = hicGdp > minGdp && hicGdp < maxGdp;
  const xTicks = Array.from({ length: 5 }, (_, i) => minGdp + (i / 4) * (maxGdp - minGdp));
  const yTicks = Array.from({ length: 5 }, (_, i) => minInf + (i / 4) * (maxInf - minInf));
  const hovPt = hovered !== null ? data[hovered] : null;

  return (
    <div style={{ position: 'relative', userSelect: 'none' }}>
      <div style={{ position: 'absolute', left: -8, top: '50%', transform: 'translateY(-50%) rotate(-90deg)', fontSize: '9px', color: '#aaa', fontFamily: '"Inter", sans-serif', letterSpacing: '1px', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>Informality %</div>
      <svg ref={svgRef} viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', height: 'auto', overflow: 'visible', display: 'block' }}>
        <g transform={`translate(${PAD.left},${PAD.top})`}>
          {xTicks.map((v, i) => (
            <g key={`x${i}`}>
              <line x1={xS(v)} y1={0} x2={xS(v)} y2={IH} stroke="#f0ece8" strokeWidth={1} />
              <text x={xS(v)} y={IH + 16} textAnchor="middle" fontSize={9} fill="#ccc" fontFamily="Inter, sans-serif">
                {v >= 10000 ? `$${(v / 1000).toFixed(0)}k` : v >= 1000 ? `$${(v / 1000).toFixed(1)}k` : `$${Math.round(v)}`}
              </text>
            </g>
          ))}
          {yTicks.map((v, i) => (
            <g key={`y${i}`}>
              <line x1={0} y1={yS(v)} x2={IW} y2={yS(v)} stroke="#f0ece8" strokeWidth={1} />
              <text x={-8} y={yS(v) + 3.5} textAnchor="end" fontSize={9} fill="#ccc" fontFamily="Inter, sans-serif">{Math.round(v)}%</text>
            </g>
          ))}
          <text x={IW / 2} y={IH + 34} textAnchor="middle" fontSize={9} fill="#aaa" fontFamily="Inter, sans-serif" letterSpacing="1">GDP PER CAPITA (USD)</text>
          {showHIC && (
            <g>
              <line x1={xS(hicGdp)} y1={0} x2={xS(hicGdp)} y2={IH} stroke="#00897b" strokeWidth={1} strokeDasharray="4,3" opacity={0.6} />
              <text x={xS(hicGdp) + 4} y={10} fontSize={8} fill="#00897b" fontFamily="Inter, sans-serif" opacity={0.8}>High-income threshold</text>
            </g>
          )}
          <path d={pathD} fill="none" stroke={color} strokeWidth={2.5} opacity={0.85} strokeLinecap="round" strokeLinejoin="round" />
          {visDat.length >= 2 && lastPt && (
            <polygon points="-7,-3 0,0 -7,3" transform={`translate(${xS(lastPt.gdp)},${yS(lastPt.inf)}) rotate(${arrowAngle})`} fill={color} />
          )}
          {data.map((d, i) => {
            const revealed = i < visCount;
            const isH = hovered === i;
            const isLabeled = !!d.label;
            return (
              <g key={i} style={{ cursor: revealed ? 'crosshair' : 'default' }} onMouseEnter={() => revealed && setHovered(i)} onMouseLeave={() => setHovered(null)}>
                <circle cx={xS(d.gdp)} cy={yS(d.inf)} r={10} fill="transparent" />
                <circle cx={xS(d.gdp)} cy={yS(d.inf)} r={revealed ? (isH ? 6 : isLabeled ? 4.5 : 3) : 0} fill={isLabeled ? color : 'white'} stroke={color} strokeWidth={isLabeled ? 0 : 1.5} style={{ transition: 'r 0.1s' }} />
                {isLabeled && revealed && (
                  <text x={xS(d.gdp) + (d.off ? d.off[0] : 7)} y={yS(d.inf) + (d.off ? d.off[1] : 4)} fontSize={9.5} fontWeight="700" fill={color} fontFamily="Inter, sans-serif">{d.year}</text>
                )}
              </g>
            );
          })}
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
        </g>
      </svg>
    </div>
  );
}

function CaseCard({ country }) {
  const [ref, visible] = useInView(0.1);
  return (
    <div ref={ref} style={{ background: 'white', border: '1px solid #e8e4e0', borderTop: `4px solid ${country.color}`, overflow: 'hidden', opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(32px)', transition: 'opacity 0.7s ease, transform 0.7s ease' }}>
      <div style={{ width: '100%', height: '200px', backgroundImage: `url(${country.photo})`, backgroundSize: 'cover', backgroundPosition: country.photoPos || 'center', position: 'relative' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 55%)' }} />
        <div style={{ position: 'absolute', bottom: '16px', left: '20px', right: '20px' }}>
          <div style={{ fontSize: '10px', fontWeight: '700', color: 'rgba(255,255,255,0.7)', letterSpacing: '2.5px', textTransform: 'uppercase', fontFamily: '"Inter", sans-serif', marginBottom: '3px' }}>{country.period}</div>
          <div style={{ fontSize: '28px', fontWeight: '300', color: 'white', fontFamily: '"Cormorant Garamond", serif', lineHeight: 1.1 }}>{country.name}</div>
        </div>
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '3px', background: country.color, opacity: 0.6 }} />
      </div>
      <div style={{ padding: '24px 24px 0' }}>
        <p style={{ fontSize: '15px', fontStyle: 'italic', fontFamily: '"Cormorant Garamond", serif', color: '#333', lineHeight: '1.65', margin: '0 0 20px 0', borderLeft: `3px solid ${country.color}`, paddingLeft: '14px' }}>{country.headline}</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1px', background: '#e8e4e0', marginBottom: '24px' }}>
          {country.stats.map(s => (
            <div key={s.label} style={{ background: '#fafaf8', padding: '12px 10px' }}>
              <div style={{ fontSize: '18px', fontWeight: '300', color: country.color, fontFamily: '"Cormorant Garamond", serif', lineHeight: 1 }}>{s.value}</div>
              <div style={{ fontSize: '9px', color: '#aaa', marginTop: '4px', fontFamily: '"Inter", sans-serif', lineHeight: '1.35', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{s.label}</div>
            </div>
          ))}
        </div>
        <div style={{ marginBottom: '4px' }}>
          <div style={{ fontSize: '9px', fontWeight: '700', color: '#bbb', letterSpacing: '1.5px', textTransform: 'uppercase', fontFamily: '"Inter", sans-serif', marginBottom: '10px' }}>Development Trajectory · GDP vs. Informality</div>
          <div style={{ paddingLeft: '20px', paddingBottom: '8px' }}>
            <TrajectoryChart data={country.scatterData} color={country.color} />
          </div>
          <div style={{ fontSize: '9px', color: '#ccc', fontFamily: '"Inter", sans-serif', fontStyle: 'italic', paddingBottom: '8px' }}>Hover any point for data. Animates on scroll. Arrow shows trajectory direction.</div>
        </div>
      </div>
      <div style={{ padding: '16px 24px 24px' }}>
        <div style={{ marginBottom: '18px' }}>
          <div style={{ fontSize: '9px', fontWeight: '700', color: country.color, letterSpacing: '2px', textTransform: 'uppercase', fontFamily: '"Inter", sans-serif', marginBottom: '8px' }}>How Formalization Happened</div>
          <p style={{ fontSize: '13px', lineHeight: '1.8', color: '#555', fontFamily: '"Inter", sans-serif', margin: 0 }}>{country.mechanism}</p>
        </div>
        <div style={{ background: '#0f1f1e', padding: '16px 18px', borderLeft: '3px solid #4dd0c4' }}>
          <div style={{ fontSize: '9px', fontWeight: '700', color: '#4dd0c4', letterSpacing: '2px', textTransform: 'uppercase', fontFamily: '"Inter", sans-serif', marginBottom: '7px' }}>Lesson for Vietnam</div>
          <p style={{ fontSize: '13px', lineHeight: '1.75', color: 'rgba(255,255,255,0.72)', fontFamily: '"Inter", sans-serif', margin: 0 }}>{country.lesson}</p>
        </div>
      </div>
    </div>
  );
}

export default function CaseStudies() {
  const KOREA = {
    name: 'South Korea', period: '1963 – 1995', color: '#1565c0',
    photo: 'https://images.unsplash.com/photo-1538669715315-155098f0fb1d?w=900&q=80',
    photoPos: 'center 30%',
    headline: 'Formalization followed formal jobs — not the other way around. Manufacturing pulled tens of millions of workers into the registered economy over three decades.',
    stats: [{ value: '~72%', label: 'Informality, 1963' }, { value: '<20%', label: 'Informality, 1995' }, { value: '$330→$12.5k', label: 'GDP per capita' }],
    mechanism: "South Korea in 1960 was poorer than Ghana, with over 70% of its workforce in informal agriculture and petty trade. The government's export-led industrialization — textiles, electronics, shipbuilding, steel — created massive formal employment at scale. Social insurance did not precede formalization; it followed the formal contracts that came with factory work. National Health Insurance (1977) and the National Pension (1988) both expanded in step with the formal workforce. Workers didn't become formal because the state required it — they became formal because formal jobs offered wages, stability, and benefits that informal work could not match.",
    lesson: "Vietnam's informality is similarly concentrated in agriculture and small-scale trade. Korea's experience suggests that formal manufacturing job creation — not social insurance expansion alone — is what structurally drives the transition. Samsung is already Vietnam's largest single employer. The question is whether Vietnamese-owned firms can scale the way the chaebols did.",
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
    stats: [{ value: '~48%', label: 'Informality, 1981' }, { value: '~28%', label: 'Informality, 2013' }, { value: '$2.5k→$15k', label: 'GDP per capita' }],
    mechanism: "Chile's 1981 pension reform replaced a state pay-as-you-go system with individually managed private accounts (AFPs). Under the old system, pension benefits were disconnected from individual contributions. Under the new one, your retirement was literally your own savings — accumulated only while formally employed. This created a direct personal incentive to demand formal contracts and declare income. Formalization rose not because enforcement intensified, but because workers could see a tangible individual return to being formal. The reform also deepened Chile's capital markets significantly, channeling long-term pension savings into productive investment.",
    lesson: "Chile's experience is most relevant for Vietnam's self-employed and own-account workers — street vendors, small traders, gig workers — who rationally avoid formality because the costs outweigh the benefits. If Vietnam's social insurance reforms can make the benefit side of formalization tangibly personal and portable, voluntary enrollment could rise without coercive enforcement. Vietnam's 2024 Social Insurance Law expanded mandatory coverage; the deeper question is whether informal workers are being offered a genuinely compelling deal.",
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
      <div style={{ background: '#1a1a1a', padding: '44px 40px 36px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ fontSize: '10px', fontWeight: '700', color: '#4dd0c4', letterSpacing: '3px', textTransform: 'uppercase', fontFamily: '"Inter", sans-serif', marginBottom: '14px' }}>Comparative Case Studies</div>
          <h2 style={{ fontSize: 'clamp(26px, 3vw, 40px)', fontWeight: '300', color: 'white', margin: '0 0 14px 0', letterSpacing: '-0.5px', lineHeight: 1.15 }}>Two countries that made the transition</h2>
          <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.55)', fontFamily: '"Inter", sans-serif', margin: 0, maxWidth: '660px', lineHeight: '1.7' }}>South Korea and Chile both crossed the high-income threshold within a generation — starting from informality rates comparable to Vietnam today. Their mechanisms were different. What they share is instructive.</p>
        </div>
      </div>
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '44px 40px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '28px', marginBottom: '44px' }}>
          <CaseCard country={KOREA} />
          <CaseCard country={CHILE} />
        </div>
        <div style={{ background: 'white', border: '1px solid #e8e4e0', borderTop: '3px solid #00897b', padding: '32px' }}>
          <div style={{ fontSize: '10px', fontWeight: '700', color: '#00897b', letterSpacing: '2.5px', textTransform: 'uppercase', fontFamily: '"Inter", sans-serif', marginBottom: '20px' }}>What Both Cases Share</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '28px' }}>
            {[
              { title: 'Formalization was a byproduct, not a target', body: "Neither country ran a formalization campaign. In Korea, factory jobs came with contracts. In Chile, pension accounts made formal employment worth wanting. The formal economy expanded because it offered something workers genuinely valued." },
              { title: 'The benefit side of the equation mattered', body: "Enforcement alone doesn't explain either transition. What changed was the personal calculus for individual workers — the returns to being formal rose relative to the costs. Social insurance worked when it was visible, portable, and personally beneficial." },
              { title: 'Informality reflected rational choices, not failure', body: "In both countries, informal workers were not misunderstanding the system. They were responding correctly to the incentives they faced. Reforming those incentives — rather than penalizing workers — is what produced durable results." }
            ].map(item => (
              <div key={item.title}>
                <h4 style={{ fontSize: '16px', fontWeight: '400', fontFamily: '"Cormorant Garamond", serif', margin: '0 0 10px 0', lineHeight: '1.3', color: '#1a1a1a' }}>{item.title}</h4>
                <p style={{ fontSize: '13px', lineHeight: '1.8', color: '#666', fontFamily: '"Inter", sans-serif', margin: 0 }}>{item.body}</p>
              </div>
            ))}
          </div>
        </div>
        <div style={{ marginTop: '20px', paddingTop: '18px', borderTop: '1px solid #e8e4e0' }}>
          <div style={{ fontSize: '9px', fontWeight: '700', color: '#ccc', letterSpacing: '2px', textTransform: 'uppercase', fontFamily: '"Inter", sans-serif', marginBottom: '10px' }}>Data Sources</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5px 36px' }}>
            {['World Bank Development Indicators: GDP per capita (current USD), Korea & Chile.', 'ILO ILOSTAT: Informal employment estimates by country, 2024.', 'Kim, K.S. (1991). The Korean Miracle Revisited. Kellogg Institute Working Paper.', 'Barr, N. & Diamond, P. (2016). Reforming Pensions in Chile. MIT Economics.', 'IMF (1996). Pension Reform, Financial Market Development, and Economic Growth. WP/96/94.', 'ILO (2024). Integrated approaches for formalization in Asia and the Pacific.'].map(src => (
              <div key={src} style={{ fontSize: '10px', color: '#bbb', lineHeight: '1.5', fontFamily: '"Inter", sans-serif' }}>{src}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
