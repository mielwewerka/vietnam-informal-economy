// ========================================
// PART I — WHAT IS THE INFORMAL ECONOMY?
// Magazine-editorial feel. Story-driven.
// Audiences: smart, educated, no prior
// knowledge of Vietnamese labor economics.
// ========================================

import React, { useState, useEffect, useRef } from 'react';

const TEAL = '#00897b';
const TEAL_BRIGHT = '#4dd0c4';
const TEAL_LIGHT = '#e0f7f4';

function useInView(threshold = 0.12) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold }
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
      transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
    }}>
      {children}
    </div>
  );
}

function AnimatedStat({ value, suffix = '', duration = 1600 }) {
  const [display, setDisplay] = useState(0);
  const [ref, visible] = useInView(0.3);
  useEffect(() => {
    if (!visible) return;
    let start = null;
    const target = parseFloat(value);
    const step = (ts) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setDisplay((ease * target).toFixed(value.toString().includes('.') ? 1 : 0));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [visible]);
  return <span ref={ref}>{display}{suffix}</span>;
}

// Full-bleed image — no figure wrapper breaking dark sections
function FullBleedPhoto({ src, caption, position = 'center', height = '520px' }) {
  return (
    <div style={{ position: 'relative' }}>
      <div style={{ width: '100%', height, backgroundImage: `url(${src})`, backgroundSize: 'cover', backgroundPosition: position, backgroundColor: '#1a1a1a' }} />
      {caption && (
        <div style={{ padding: '12px 48px', background: '#111', borderTop: '1px solid #1e1e1e' }}>
          <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.3)', margin: 0, fontFamily: '"Inter", sans-serif', fontStyle: 'italic', lineHeight: '1.5' }}>{caption}</p>
        </div>
      )}
    </div>
  );
}

// Inline photo with text — for two-column story sections
function StoryPhoto({ src, caption, position = 'center', height = '340px' }) {
  return (
    <div>
      <div style={{ width: '100%', height, backgroundImage: `url(${src})`, backgroundSize: 'cover', backgroundPosition: position, backgroundColor: '#1a1a1a' }} />
      {caption && (
        <p style={{ fontSize: '11px', color: '#999', margin: '8px 0 0 0', fontFamily: '"Inter", sans-serif', fontStyle: 'italic', lineHeight: '1.5', borderTop: '1px solid #e0e0e0', paddingTop: '8px' }}>{caption}</p>
      )}
    </div>
  );
}

function TimelineItem({ year, title, body, isLast, extra }) {
  const [ref, visible] = useInView(0.2);
  return (
    <div ref={ref} style={{ display: 'flex', gap: '24px', opacity: visible ? 1 : 0, transform: visible ? 'translateX(0)' : 'translateX(-16px)', transition: 'all 0.6s ease' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0, width: '40px' }}>
        <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: TEAL, flexShrink: 0, marginTop: '5px', border: '2px solid white', boxShadow: `0 0 0 2px ${TEAL}` }} />
        {!isLast && <div style={{ width: '2px', flex: 1, background: '#e0e0e0', marginTop: '6px' }} />}
      </div>
      <div style={{ paddingBottom: isLast ? 0 : '32px' }}>
        <div style={{ fontSize: '11px', fontWeight: '700', color: TEAL, letterSpacing: '1px', marginBottom: '4px', fontFamily: '"Inter", sans-serif', textTransform: 'uppercase' }}>{year}</div>
        <div style={{ fontSize: '16px', fontWeight: '600', color: '#1a1a1a', marginBottom: '8px', lineHeight: '1.3' }}>{title}</div>
        <div style={{ fontSize: '14px', color: '#666', lineHeight: '1.75', fontFamily: '"Inter", sans-serif' }}>{body}</div>
        {extra && <div style={{ marginTop: '10px' }}>{extra}</div>}
      </div>
    </div>
  );
}

function BigStat({ stat, unit, label, sub, color = TEAL }) {
  return (
    <div style={{ borderTop: `3px solid ${color}`, paddingTop: '20px' }}>
      <div style={{ fontSize: 'clamp(40px, 5vw, 64px)', fontWeight: '300', color, lineHeight: 1, letterSpacing: '-2px', marginBottom: '10px', fontFamily: '"Georgia", serif' }}>
        <AnimatedStat value={stat} suffix={unit} />
      </div>
      <div style={{ fontSize: '14px', color: '#1a1a1a', fontWeight: '600', marginBottom: '4px', fontFamily: '"Inter", sans-serif', lineHeight: '1.4' }}>{label}</div>
      {sub && <div style={{ fontSize: '11px', color: '#999', fontFamily: '"Inter", sans-serif', fontStyle: 'italic' }}>{sub}</div>}
    </div>
  );
}

export default function InformalExplainer({ onBack, onNavigate }) {

  return (
    <div style={{ fontFamily: '"Georgia", "Times New Roman", serif', background: '#fafafa', color: '#1a1a1a', minHeight: '100vh' }}>

      {/* ── STICKY NAV ── */}
      <nav style={{ background: 'white', borderBottom: '1px solid #e0e0e0', padding: '14px 48px', display: 'flex', alignItems: 'center', gap: '16px', position: 'sticky', top: 0, zIndex: 100, boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
        <button onClick={onBack} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '13px', fontWeight: '600', color: TEAL, fontFamily: '"Inter", sans-serif', padding: 0 }}>← Back</button>
        <span style={{ color: '#e0e0e0' }}>|</span>
        <span style={{ fontSize: '13px', color: '#999', fontFamily: '"Inter", sans-serif' }}>Part I — What Is the Informal Economy?</span>
      </nav>

      {/* ── HERO — full-bleed split ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: '80vh', background: '#111' }}>
        {/* Left: dark text panel */}
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '80px 56px', position: 'relative' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: `linear-gradient(90deg, ${TEAL}, transparent)` }} />
          <div style={{ fontSize: '10px', fontWeight: '700', color: TEAL, letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '24px', fontFamily: '"Inter", sans-serif' }}>
            Part I · What Is the Informal Economy?
          </div>
          <h1 style={{ fontSize: 'clamp(32px, 4vw, 56px)', fontWeight: '400', lineHeight: '1.1', margin: '0 0 24px 0', letterSpacing: '-1.5px', color: 'white' }}>
            What does it mean<br />to work outside<br />the economy?
          </h1>
          <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.65)', lineHeight: '1.75', margin: '0 0 32px 0', fontFamily: '"Inter", sans-serif', fontWeight: '400', maxWidth: '440px' }}>
            In Vietnam, nearly two in three workers have no contract, no social insurance, and no legal protection. They are not counted in the tax base, not covered by labor law, and not visible to the state.
          </p>
          <p style={{ fontSize: '17px', color: 'rgba(255,255,255,0.45)', lineHeight: '1.7', margin: 0, fontFamily: '"Inter", sans-serif', fontStyle: 'italic', maxWidth: '440px' }}>
            This is not a marginal phenomenon. It is the economy.
          </p>
        </div>
        {/* Right: photograph */}
        <div style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=1200&q=80)', backgroundSize: 'cover', backgroundPosition: 'center 50%', position: 'relative' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(17,17,17,0.6) 0%, rgba(17,17,17,0.1) 100%)' }} />
          <div style={{ position: 'absolute', bottom: '24px', left: '24px', right: '24px' }}>
            <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.45)', margin: 0, fontFamily: '"Inter", sans-serif', fontStyle: 'italic', lineHeight: '1.5' }}>
              Street vendors in Hội An. Most have operated at the same spot for years — no license, no contract, no social protection.
            </p>
          </div>
        </div>
      </div>

      {/* ── SCALE STAT BANNER ── */}
      <div style={{ background: '#1a1a1a' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1px', background: '#2a2a2a' }}>
          {[
            { stat: '68.5', unit: '%', label: 'of workers are informally employed', sub: 'GSO/ILO, 2021 — ILO-aligned methodology' },
            { stat: '33.6', unit: 'M', label: 'informal workers nationwide', sub: 'GSO/ILO, 2021' },
            { stat: '97.9', unit: '%', label: 'of agricultural workers are informal', sub: 'GSO/ILO, 2021' },
            { stat: '4', unit: '%', label: 'of HHB owners have any social insurance', sub: 'ILO/VIDERI Survey, 2024' },
          ].map(({ stat, unit, label, sub }) => (
            <div key={label} style={{ background: '#1a1a1a', padding: '36px 32px' }}>
              <div style={{ fontSize: 'clamp(36px, 4vw, 52px)', fontWeight: '300', color: TEAL_BRIGHT, lineHeight: 1, marginBottom: '12px', letterSpacing: '-1px', fontFamily: '"Georgia", serif' }}>
                <AnimatedStat value={stat} suffix={unit} />
              </div>
              <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.7)', lineHeight: '1.5', fontFamily: '"Inter", sans-serif', marginBottom: '4px' }}>{label}</div>
              <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.25)', fontFamily: '"Inter", sans-serif', fontStyle: 'italic' }}>{sub}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── WHAT DOES INFORMAL MEAN? — definition ── */}
      <div style={{ background: 'white' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '72px 48px' }}>
          <Fade>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '72px', alignItems: 'start' }}>
              <div>
                <div style={{ fontSize: '10px', fontWeight: '700', color: TEAL, letterSpacing: '2.5px', textTransform: 'uppercase', marginBottom: '16px', fontFamily: '"Inter", sans-serif' }}>The Definition</div>
                <h2 style={{ fontSize: 'clamp(24px, 2.8vw, 36px)', fontWeight: '400', lineHeight: '1.2', margin: '0 0 28px 0', letterSpacing: '-0.5px' }}>
                  Informal employment is a job characteristic — not just a type of business.
                </h2>
                <div style={{ background: TEAL_LIGHT, border: `1px solid #b2dfdb`, borderLeft: `4px solid ${TEAL}`, padding: '24px 28px', marginBottom: '24px' }}>
                  <p style={{ fontSize: '16px', fontWeight: '600', color: '#1a1a1a', margin: '0 0 8px 0', lineHeight: '1.4' }}>
                    An informally employed worker is one whose employment relationship is not legally recognized or protected.
                  </p>
                  <p style={{ fontSize: '14px', color: '#555', margin: 0, fontFamily: '"Inter", sans-serif', lineHeight: '1.65' }}>
                    This includes workers at unregistered businesses — but also workers at <em>registered</em> enterprises who have no contract, no social insurance, and no labor law protections. Informality is about the worker's situation, not the employer's registration status.
                  </p>
                </div>
                <p style={{ fontSize: '16px', lineHeight: '1.85', color: '#333', margin: '0 0 16px 0' }}>
                  The ILO's definition, adopted by Vietnam in 2021, covers own-account workers, contributing family workers, employees without contracts, and workers in unregistered household enterprises. It also captures the 13% of workers at formally registered private enterprises who work without a contract or insurance.
                </p>
                <p style={{ fontSize: '16px', lineHeight: '1.85', color: '#333', margin: 0 }}>
                  Think of it this way: if you're a motorbike taxi driver on Grab, you might work for a registered platform — but you have no employment contract, no sick pay, no pension, no unemployment insurance. Under ILO definitions, you are informally employed.
                </p>
              </div>
              <div style={{ paddingTop: '56px' }}>
                <StoryPhoto
                  src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80"
                  caption="A street food vendor in Ho Chi Minh City. Her stall generates income for her family but contributes nothing to the tax base and affords her no legal protections."
                  height="300px"
                  position="center 60%"
                />
                <div style={{ marginTop: '32px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  {[
                    { icon: '✗', label: 'No written contract', color: '#dc2626' },
                    { icon: '✗', label: 'No social insurance or pension', color: '#dc2626' },
                    { icon: '✗', label: 'No unemployment protection', color: '#dc2626' },
                    { icon: '✗', label: 'Not counted in income tax records', color: '#dc2626' },
                    { icon: '✓', label: 'Earns income, often daily cash', color: TEAL },
                    { icon: '✓', label: 'Contributes to GDP and consumption', color: TEAL },
                  ].map(({ icon, label, color }) => (
                    <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <span style={{ width: '20px', height: '20px', borderRadius: '50%', background: color + '15', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: '700', color, flexShrink: 0, fontFamily: '"Inter", sans-serif' }}>{icon}</span>
                      <span style={{ fontSize: '14px', color: '#555', fontFamily: '"Inter", sans-serif' }}>{label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Fade>
        </div>
      </div>

      {/* ── HOW VIETNAM GOT HERE — origins ── */}
      <div style={{ background: '#f5f3f0', borderTop: '1px solid #e8e4e0' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '72px 48px' }}>
          <Fade>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '72px', alignItems: 'start' }}>
              <div>
                <div style={{ fontSize: '10px', fontWeight: '700', color: TEAL, letterSpacing: '2.5px', textTransform: 'uppercase', marginBottom: '16px', fontFamily: '"Inter", sans-serif' }}>Origins</div>
                <h2 style={{ fontSize: 'clamp(24px, 2.8vw, 36px)', fontWeight: '400', lineHeight: '1.2', margin: '0 0 24px 0', letterSpacing: '-0.5px' }}>
                  Vietnam's informal economy wasn't a failure of development. It was a product of it.
                </h2>
                <p style={{ fontSize: '16px', lineHeight: '1.85', color: '#333', margin: '0 0 16px 0' }}>
                  Before 1986, Vietnam was a centrally planned economy. The state assigned jobs, set prices, and controlled all production. Petty trade was illegal. Private markets didn't exist.
                </p>
                <p style={{ fontSize: '16px', lineHeight: '1.85', color: '#333', margin: '0 0 16px 0' }}>
                  Then came <strong>Doi Moi</strong> — "Renovation" — in 1986. Facing economic collapse, 700% inflation, and $4 million per day in Soviet aid dependency, the Communist Party made a historic bet: open the markets while keeping political control. Agricultural collectives were dismantled. Private ownership was permitted. Foreign investment was welcomed.
                </p>
                <p style={{ fontSize: '16px', lineHeight: '1.85', color: '#333', margin: 0 }}>
                  Real per capita GDP grew nearly tenfold between 1990 and 2023. Poverty fell from 58% to under 5%. By any measure, Doi Moi worked. But the formal institutions needed to absorb millions of newly-free workers weren't built fast enough — and the informal economy rushed in to fill the gap.
                </p>
              </div>
              {/* Timeline */}
              <div style={{ paddingTop: '8px' }}>
                {[
                  { year: 'Pre-1986', title: 'Centrally planned economy', body: 'State-assigned jobs, suppressed trade. No informal employment in the modern sense — just state-controlled poverty.' },
                  { year: '1986', title: 'Doi Moi begins', body: 'Agricultural collectives dismantled. Household contract system introduced. Millions of rural workers freed from tied labor — and from state protection.' },
                  { year: '1988–1995', title: 'Land reform and mass migration', body: 'Land use rights granted to households. Rural labor surplus grows. Mass migration to cities begins. Street vending becomes the first rung of the economic ladder.' },
                  { year: '1990s–2000s', title: 'Growth and the informality paradox', body: 'GDP grows 6–8% annually. The formal sector expands — but cannot absorb the labor force. The informal economy grows alongside the formal one, not instead of it.' },
                  { year: '2008', title: 'The Hanoi street vendor ban', body: 'Authorities ban vending on 62 streets and 48 public spaces. Vendors — mostly female rural migrants — are driven from their livelihoods. Research shows they simply relocate rather than formalize.', extra: (
                    <button onClick={() => onNavigate('case-studies')} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '12px', fontWeight: '600', color: TEAL, fontFamily: '"Inter", sans-serif', padding: 0, textDecoration: 'underline' }}>
                      → How Chile and Korea handled this differently
                    </button>
                  )},
                  { year: '2021–present', title: 'COVID exposes the protection gap', body: "The pandemic revealed the vulnerability of informal workers: no sick pay, no unemployment insurance, no state support. Vietnam accelerates formalization targets: 60% social insurance coverage by 2030.", isLast: true },
                ].map((item, i, arr) => (
                  <TimelineItem key={item.year} {...item} isLast={i === arr.length - 1} />
                ))}
              </div>
            </div>
          </Fade>
        </div>
      </div>

      {/* ── FULL-BLEED PHOTO — rice agriculture ── */}
      <FullBleedPhoto
        src="https://images.unsplash.com/photo-1559592413-7cbb5e31f4f0?w=1400&q=80"
        caption="Rice paddy agriculture, Vietnam. Nearly all agricultural workers — 97.9% — are informally employed. No contracts, no pensions, no safety nets beyond the land itself and the family beside them. Source: GSO/ILO 2021."
        height="480px"
        position="center 60%"
      />

      {/* ── WHO IS INFORMAL — demographics ── */}
      <div style={{ background: 'white' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '72px 48px' }}>
          <Fade>
            <div style={{ fontSize: '10px', fontWeight: '700', color: TEAL, letterSpacing: '2.5px', textTransform: 'uppercase', marginBottom: '16px', fontFamily: '"Inter", sans-serif' }}>Who Is Informal?</div>
            <h2 style={{ fontSize: 'clamp(24px, 2.8vw, 36px)', fontWeight: '400', lineHeight: '1.2', margin: '0 0 12px 0', letterSpacing: '-0.5px', maxWidth: '600px' }}>
              Informality is not random. It follows the contours of geography, gender, and education.
            </h2>
            <p style={{ fontSize: '16px', color: '#555', lineHeight: '1.7', margin: '0 0 48px 0', fontFamily: '"Inter", sans-serif', maxWidth: '680px' }}>
              If you're a woman, rural, agricultural, or without a university degree — the odds are heavily stacked toward informality. These are not individual failures. They are structural predictors.
            </p>
          </Fade>
          <Fade>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '2px', background: '#e0e0e0', marginBottom: '48px' }}>
              {[
                { title: 'Agricultural workers', pct: '97.9%', body: 'Near-universal informality. Rice farming, coffee cultivation, aquaculture — all dominated by household production. This is the single largest informal category in Vietnam, and the hardest to reach through conventional policy.', color: '#15803d', sub: 'GSO/ILO, 2021' },
                { title: 'Rural workers', pct: '77.9%', body: 'Rural workers face a drastically lower probability of transitioning to formal employment than urban workers. The gap between rural and urban formality rates mirrors the gap between poverty and participation in the modern economy.', color: '#1e40af', sub: 'GSO/ILO, 2021' },
                { title: 'Female workers in vulnerable roles', pct: '~65%', body: "Women's overall informality rate is slightly lower than men's, but women are disproportionately concentrated in the most vulnerable categories: domestic work, street vending, garment factories without contracts. Over 61% of female informal workers earn below the regional minimum wage.", color: '#9333ea', sub: 'GSO/ILO, 2021' },
                { title: 'Urban informal workers', pct: '52%', body: 'Even in cities, over half of workers are informal. Construction workers, motorbike taxi drivers, delivery workers, street vendors. Urban informality is rising as migration outpaces formal job creation — the very success of growth creates its own informal labor pool.', color: '#c2410c', sub: 'GSO/ILO, 2021' },
              ].map(({ title, pct, body, color, sub }) => (
                <div key={title} style={{ background: 'white', padding: '32px 36px', borderTop: `3px solid ${color}` }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px', gap: '16px' }}>
                    <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#1a1a1a', margin: 0, fontFamily: '"Inter", sans-serif', lineHeight: '1.3' }}>{title}</h3>
                    <div style={{ textAlign: 'right', flexShrink: 0 }}>
                      <div style={{ fontSize: '32px', fontWeight: '300', color, lineHeight: 1, letterSpacing: '-1px', fontFamily: '"Georgia", serif' }}>{pct}</div>
                      <div style={{ fontSize: '9px', color: '#bbb', fontFamily: '"Inter", sans-serif', fontStyle: 'italic', marginTop: '2px' }}>{sub}</div>
                    </div>
                  </div>
                  <p style={{ fontSize: '14px', color: '#666', lineHeight: '1.75', margin: 0, fontFamily: '"Inter", sans-serif' }}>{body}</p>
                </div>
              ))}
            </div>
          </Fade>

          {/* Rational choice callout */}
          <Fade>
            <div style={{ background: '#1a1a1a', color: 'white', padding: '40px 48px', borderLeft: `4px solid ${TEAL_BRIGHT}` }}>
              <div style={{ fontSize: '10px', fontWeight: '700', color: TEAL_BRIGHT, letterSpacing: '2.5px', textTransform: 'uppercase', marginBottom: '16px', fontFamily: '"Inter", sans-serif' }}>
                The Key Insight
              </div>
              <p style={{ fontSize: 'clamp(17px, 2vw, 22px)', color: 'white', lineHeight: '1.6', margin: '0 0 16px 0', fontWeight: '400', maxWidth: '760px', letterSpacing: '-0.2px' }}>
                Informal workers are not failing to understand the system. They are navigating it rationally — responding correctly to the incentives they face.
              </p>
              <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.55)', lineHeight: '1.75', margin: 0, fontFamily: '"Inter", sans-serif', maxWidth: '680px' }}>
                When social insurance contributions total 25–28% of wages, when the benefits are opaque and decades away, when registration requires navigating three separate government databases — the informal economy isn't a failure of willpower. It's a rational response to a system that wasn't designed for the workers it's supposed to protect.
              </p>
            </div>
          </Fade>
        </div>
      </div>

      {/* ── THE FISCAL STAKES ── */}
      <div style={{ background: '#f5f3f0', borderTop: '1px solid #e8e4e0', borderBottom: '1px solid #e8e4e0' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '72px 48px' }}>
          <Fade>
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '64px', alignItems: 'start' }}>
              <div>
                <div style={{ fontSize: '10px', fontWeight: '700', color: TEAL, letterSpacing: '2.5px', textTransform: 'uppercase', marginBottom: '16px', fontFamily: '"Inter", sans-serif' }}>The Fiscal Stakes</div>
                <h2 style={{ fontSize: 'clamp(24px, 2.8vw, 36px)', fontWeight: '400', lineHeight: '1.2', margin: '0 0 24px 0', letterSpacing: '-0.5px' }}>
                  Informality isn't just a labor market problem. It's Vietnam's central fiscal constraint.
                </h2>
                <p style={{ fontSize: '16px', lineHeight: '1.85', color: '#333', margin: '0 0 16px 0' }}>
                  When 68.5% of workers contribute nothing to income tax or social insurance, Vietnam's tax-to-GDP ratio stays at 16.8% — below the regional average of 19.5% and well below the 25%+ common among high-income OECD countries (OECD Revenue Statistics Asia-Pacific 2025).
                </p>
                <p style={{ fontSize: '16px', lineHeight: '1.85', color: '#333', margin: '0 0 16px 0' }}>
                  That matters because Vietnam has set an ambitious target: high-income status by 2045. Getting there requires sustained 7–8% annual GDP growth, which in turn requires public investment in infrastructure, education, and social protection. All of it depends on a tax base that the current structure of informal employment makes very hard to build.
                </p>
                <p style={{ fontSize: '16px', lineHeight: '1.85', color: '#333', margin: '0 0 28px 0' }}>
                  This is the connection. Every informal worker who stays invisible to the state is a worker whose productivity generates no tax revenue, no social insurance fund, and no fiscal space for the public investments that would raise productivity further.
                </p>
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                  <button onClick={() => onNavigate('vietnam2045')} style={{ background: TEAL, color: 'white', border: 'none', padding: '10px 22px', fontSize: '13px', fontWeight: '700', cursor: 'pointer', fontFamily: '"Inter", sans-serif' }}>
                    See Vietnam 2045 analysis →
                  </button>
                  <button onClick={() => onNavigate('fiscal')} style={{ background: 'none', border: `1px solid ${TEAL}`, color: TEAL, padding: '10px 22px', fontSize: '13px', fontWeight: '600', cursor: 'pointer', fontFamily: '"Inter", sans-serif' }}>
                    Model the fiscal gap →
                  </button>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '28px', paddingTop: '8px' }}>
                <BigStat stat="16.8" unit="%" label="Vietnam's tax-to-GDP ratio (2023)" sub="Below 19.5% regional average · OECD 2025" color="#dc2626" />
                <BigStat stat="60" unit="%" label="Social insurance coverage target by 2030" sub="From ~38% today · Resolution 28-NQ/TW" color={TEAL} />
                <BigStat stat="4300" unit="" label="GNI per capita today, USD" sub="Needs to reach $14,005 for high-income status" color="#7c3aed" />
              </div>
            </div>
          </Fade>
        </div>
      </div>

      {/* ── SOURCES ── */}
      <div style={{ background: 'white', padding: '48px 48px 40px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <Fade>
            <div style={{ fontSize: '10px', fontWeight: '700', color: '#bbb', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '16px', fontFamily: '"Inter", sans-serif' }}>Sources for This Section</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px 40px', maxWidth: '900px' }}>
              {[
                'GSO/ILO. Overall Situation of Workers in Informal Employment in Viet Nam. 2021.',
                'ILO/VIDERI. Expanding Social Insurance for Household Businesses in Viet Nam. 2024.',
                'OECD. Revenue Statistics in Asia and the Pacific 2025: Viet Nam.',
                'Turner, S. & Schoenberger, L. Street Vendor Livelihoods and Everyday Politics in Hanoi. Urban Studies, 2012.',
                'World Bank. Viet Nam 2045: Breaking Through. 2024.',
                'GSO. Labor Force Survey 2023. General Statistics Office of Vietnam.',
                'ILO. Informal Employment in Viet Nam: Trends and Determinants. 2021.',
                'Huynh, T.N.Q. Street Vendors in Vietnam. 2023.',
              ].map(s => (
                <div key={s} style={{ fontSize: '11px', color: '#999', lineHeight: '1.6', fontFamily: '"Inter", sans-serif', paddingLeft: '10px', borderLeft: '2px solid #e8e4e0' }}>{s}</div>
              ))}
            </div>
          </Fade>
        </div>
      </div>

      {/* ── DATA NOTES ── */}
      <div style={{ background: '#f5f5f5', borderTop: '1px solid #e0e0e0', padding: '24px 48px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ fontSize: '10px', fontWeight: '700', color: '#bbb', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '8px', fontFamily: '"Inter", sans-serif' }}>Data Notes</div>
          <p style={{ fontSize: '12px', color: '#aaa', lineHeight: '1.75', margin: 0, fontFamily: '"Inter", sans-serif', maxWidth: '860px' }}>
            The 68.5% informality rate and 33.6M worker count are from GSO/ILO 2021 using the current ILO-aligned methodology, which includes agriculture and forestry. The pre-2021 GSO measure (~56%) used a narrower definition and is not directly comparable. The 4% social insurance figure refers specifically to household business owners (ILO/VIDERI 2024 survey of 827 registered HHBs), not the full informal workforce. The 16.8% tax-to-GDP figure is OECD 2023 data published in Revenue Statistics Asia-Pacific 2025. Urban/rural informality split (52%/77.9%) is from GSO/ILO 2021.
          </p>
        </div>
      </div>

      {/* ── FOOTER NAV ── */}
      <div style={{ background: 'white', borderTop: '1px solid #e0e0e0', padding: '20px 48px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <button onClick={onBack} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '13px', fontWeight: '600', color: TEAL, fontFamily: '"Inter", sans-serif' }}>← Back to Overview</button>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '11px', color: '#bbb', fontFamily: '"Inter", sans-serif' }}>ECON 62 · Topics in Macroeconomics · Winter 2026</div>
          <div style={{ fontSize: '10px', color: '#ddd', fontFamily: '"Inter", sans-serif', marginTop: '2px' }}>Designed and Built by Miel Wewerka · Dartmouth College</div>
        </div>
        <button onClick={() => onNavigate('maps')} style={{ background: TEAL, color: 'white', border: 'none', padding: '10px 22px', fontSize: '13px', fontWeight: '700', cursor: 'pointer', fontFamily: '"Inter", sans-serif' }}>
          Part II: Interactive Maps →
        </button>
      </div>

    </div>
  );
}
