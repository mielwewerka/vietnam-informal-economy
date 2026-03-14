// ========================================
// PART I — WHAT IS THE INFORMAL ECONOMY?
// Dark hero (coconut.avif) + light editorial body
// Merges old Growth Lab aesthetic with new hero
// ========================================

import React, { useState, useEffect, useRef } from 'react';

const TEAL = '#00897b';
const TEAL_BRIGHT = '#4dd0c4';
const TEAL_LIGHT = '#e0f7f4';

// ─── Hooks ─────────────────────────────────────────────────────────────────
function useInView(threshold = 0.15) {
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

function FadeSection({ children, delay = 0 }) {
  const [ref, visible] = useInView();
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(28px)',
      transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`
    }}>
      {children}
    </div>
  );
}

function AnimatedStat({ value, suffix = '', duration = 1800 }) {
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

function PullQuote({ stat, unit = '', label, color = TEAL, note }) {
  return (
    <div style={{ borderLeft: `4px solid ${color}`, paddingLeft: '24px' }}>
      <div style={{ fontSize: '52px', fontWeight: '800', color, lineHeight: 1, letterSpacing: '-2px', fontFamily: '"Inter", sans-serif' }}>
        <AnimatedStat value={stat} suffix={unit} />
      </div>
      <div style={{ fontSize: '14px', color: '#555', marginTop: '8px', lineHeight: '1.5', maxWidth: '220px' }}>{label}</div>
      {note && <div style={{ fontSize: '11px', color: '#999', marginTop: '6px', fontStyle: 'italic' }}>{note}</div>}
    </div>
  );
}

function PhotoBlock({ src, caption, credit, height = '480px', position = 'center' }) {
  return (
    <figure style={{ margin: 0 }}>
      <div style={{ width: '100%', height, backgroundImage: `url(${src})`, backgroundSize: 'cover', backgroundPosition: position, backgroundColor: '#ddd' }} />
      <figcaption style={{ padding: '12px 0 0 0', fontSize: '12px', color: '#888', lineHeight: '1.5', borderTop: '1px solid #e0e0e0', marginTop: '8px' }}>
        {caption}
        {credit && <span style={{ color: '#bbb' }}> · {credit}</span>}
      </figcaption>
    </figure>
  );
}

function TimelineItem({ year, title, body, isLast, extra }) {
  const [ref, visible] = useInView(0.2);
  return (
    <div ref={ref} style={{ display: 'flex', gap: '24px', opacity: visible ? 1 : 0, transform: visible ? 'translateX(0)' : 'translateX(-20px)', transition: 'all 0.6s ease' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0, width: '48px' }}>
        <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: TEAL, flexShrink: 0, marginTop: '4px' }} />
        {!isLast && <div style={{ width: '2px', flex: 1, background: '#e0e0e0', marginTop: '4px' }} />}
      </div>
      <div style={{ paddingBottom: isLast ? 0 : '32px' }}>
        <div style={{ fontSize: '12px', fontWeight: '700', color: TEAL, letterSpacing: '1px', marginBottom: '4px', fontFamily: '"Inter", sans-serif', textTransform: 'uppercase' }}>{year}</div>
        <div style={{ fontSize: '16px', fontWeight: '700', color: '#1a1a1a', marginBottom: '8px' }}>{title}</div>
        <div style={{ fontSize: '14px', color: '#666', lineHeight: '1.7', fontFamily: '"Inter", sans-serif' }}>{body}</div>
        {extra && <div style={{ marginTop: '8px' }}>{extra}</div>}
      </div>
    </div>
  );
}

export default function InformalExplainer({ onBack, onNavigate }) {

  const sectionLabel = { fontSize: '11px', fontWeight: '700', color: TEAL, letterSpacing: '2.5px', textTransform: 'uppercase', marginBottom: '16px', fontFamily: '"Inter", sans-serif' };
  const h2 = { fontSize: 'clamp(24px, 3vw, 38px)', fontWeight: '400', lineHeight: '1.2', margin: '0 0 24px 0', letterSpacing: '-0.5px', color: '#1a1a1a' };
  const body = { fontSize: '17px', lineHeight: '1.85', color: '#333', margin: '0 0 20px 0' };
  const bodySmall = { fontSize: '15px', lineHeight: '1.75', color: '#777', margin: '0 0 16px 0', fontFamily: '"Inter", sans-serif', fontStyle: 'italic' };

  return (
    <div style={{ fontFamily: '"Georgia", "Times New Roman", serif', color: '#1a1a1a', minHeight: '100vh' }}>

      {/* ── NAV ── */}
      <nav style={{ background: 'white', borderBottom: '1px solid #e0e0e0', padding: '14px 48px', display: 'flex', alignItems: 'center', gap: '16px', position: 'sticky', top: 0, zIndex: 100, boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
        <button onClick={onBack} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '13px', fontWeight: '600', color: TEAL, fontFamily: '"Inter", sans-serif', padding: 0 }}>← Back</button>
        <span style={{ color: '#e0e0e0' }}>|</span>
        <span style={{ fontSize: '13px', color: '#999', fontFamily: '"Inter", sans-serif' }}>Part I: What Is the Informal Economy?</span>
      </nav>

      {/* ── HERO — coconut.avif, vertically centered, stats in-view ── */}
      <div style={{ position: 'relative', height: '100vh', overflow: 'hidden', display: 'flex', alignItems: 'center' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(https://raw.githubusercontent.com/mielwewerka/vietnam-informal-economy/refs/heads/main/coconut.avif)', backgroundSize: 'cover', backgroundPosition: 'center 45%' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(13,13,13,0.5) 0%, rgba(13,13,13,0.7) 55%, rgba(13,13,13,0.95) 100%)' }} />
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: `linear-gradient(90deg, ${TEAL}, transparent)` }} />

        <div style={{ position: 'relative', padding: '0 56px', width: '100%', maxWidth: '1100px' }}>
          <div style={{ fontSize: '10px', fontWeight: '700', color: TEAL_BRIGHT, letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '20px', fontFamily: '"Inter", sans-serif' }}>
            Part I · Vietnam Informal Economy
          </div>
          <h1 style={{ fontSize: 'clamp(44px, 6vw, 82px)', fontWeight: '400', lineHeight: '1.0', margin: '0 0 22px 0', letterSpacing: '-2px', color: 'white', maxWidth: '720px' }}>
            What does it mean<br />to work outside<br />the economy?
          </h1>
          <p style={{ fontSize: 'clamp(16px, 1.6vw, 20px)', color: 'rgba(255,255,255,0.65)', lineHeight: '1.65', margin: '0 0 32px 0', maxWidth: '520px', fontFamily: '"Inter", sans-serif', fontStyle: 'italic' }}>
            68.5% of Vietnam's workers operate without a contract, without social insurance,
            and without legal protection. This is the informal economy.
          </p>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '52px' }}>
            <button onClick={() => onNavigate('maps')} style={{ background: TEAL_BRIGHT, color: '#0d0d0d', border: 'none', padding: '11px 26px', fontSize: '12px', fontWeight: '700', cursor: 'pointer', fontFamily: '"Inter", sans-serif', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              See it on the map
            </button>
            <button onClick={() => onNavigate('fiscal')} style={{ background: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.8)', border: '1px solid rgba(255,255,255,0.25)', padding: '10px 22px', fontSize: '12px', fontWeight: '600', cursor: 'pointer', fontFamily: '"Inter", sans-serif', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Model the fiscal gap
            </button>
          </div>

          {/* 4 stats visible in hero */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1px', background: 'rgba(255,255,255,0.08)', maxWidth: '780px' }}>
            {[
              { stat: '68.5', unit: '%', label: 'informally employed', sub: 'GSO/ILO, 2021' },
              { stat: '33.6', unit: 'M', label: 'outside the formal system', sub: 'GSO/ILO, 2021' },
              { stat: '97.9', unit: '%', label: 'of agricultural workers', sub: 'GSO/ILO, 2021' },
              { stat: '4', unit: '%', label: 'of HHB owners insured', sub: 'ILO/VIDERI, 2024' },
            ].map(({ stat, unit, label, sub }) => (
              <div key={label} style={{ background: 'rgba(10,10,10,0.7)', padding: '18px 20px', backdropFilter: 'blur(4px)' }}>
                <div style={{ fontSize: 'clamp(20px, 2.5vw, 32px)', fontWeight: '300', color: TEAL_BRIGHT, lineHeight: 1, marginBottom: '6px', letterSpacing: '-0.5px', fontFamily: '"Georgia", serif' }}>
                  <AnimatedStat value={stat} suffix={unit} />
                </div>
                <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.6)', lineHeight: '1.35', fontFamily: '"Inter", sans-serif', marginBottom: '3px' }}>{label}</div>
                <div style={{ fontSize: '9px', color: 'rgba(255,255,255,0.25)', fontFamily: '"Inter", sans-serif', fontStyle: 'italic' }}>{sub}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── LEAD PHOTO — transitions from dark hero to light body ── */}
      <div style={{ background: '#111' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <PhotoBlock
            src="https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=1400&q=80"
            caption="Street vendors in Hoi An navigate the line between earning a living and avoiding enforcement. Most have operated at the same spot for years, yet hold no license, pay no tax, and receive no social protection."
            credit="Unsplash"
            height="520px"
            position="center 50%"
          />
        </div>
      </div>

      {/* ── DEFINITION ── */}
      <div style={{ background: 'white' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '80px 48px' }}>
          <FadeSection>
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '72px', alignItems: 'start' }}>
              <div>
                <div style={sectionLabel}>Definition</div>
                <h2 style={h2}>
                  A worker without a contract. A business without a license. A transaction without a receipt.
                </h2>
                <p style={body}>
                  The informal economy is not a place. It is a condition. According to the International Labour Organization, informal employment encompasses all work arrangements that provide no legal or social protection: no employment contract, no social insurance, no occupational health coverage.
                </p>
                <p style={body}>
                  In Vietnam, the GSO operationalizes this through a key criterion: if a worker is not covered by compulsory social insurance, they are informal. This captures agricultural day laborers, street vendors, construction workers paid in cash, domestic workers, and the vast majority of workers in small family businesses.
                </p>
                <div style={{ background: TEAL_LIGHT, border: `1px solid #b2dfdb`, borderLeft: `4px solid ${TEAL}`, padding: '24px 28px', marginBottom: '24px' }}>
                  <div style={{ fontSize: '13px', fontWeight: '700', color: TEAL, marginBottom: '10px', fontFamily: '"Inter", sans-serif', letterSpacing: '1px', textTransform: 'uppercase' }}>ILO Definition</div>
                  <div style={{ fontSize: '16px', lineHeight: '1.7', color: '#333' }}>
                    "All employment arrangements that do not provide individuals with legal or social protection through their work, thereby leaving them more exposed to economic risk."
                  </div>
                  <div style={{ fontSize: '11px', color: '#999', fontFamily: '"Inter", sans-serif', fontStyle: 'italic', marginTop: '8px' }}>ILO, Informal Employment in Viet Nam: Trends and Determinants, 2021</div>
                </div>
                <p style={bodySmall}>
                  Importantly, informal work exists inside formal sector firms too. About 13% of workers at registered private enterprises remain informally employed: they work for a legitimate company but hold no contract or insurance. Informality is a job characteristic, not just a sector.
                </p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '40px', paddingTop: '56px' }}>
                <PullQuote stat="68.5" unit="%" label="of Vietnamese workers are informally employed" note="GSO/ILO, 2021 (ILO-aligned methodology including agriculture)" />
                <PullQuote stat="33.6" unit="M" label="informal workers nationwide" color="#f97316" note="GSO/ILO, 2021" />
                <PullQuote stat="4" unit="%" label="of household business owners contribute to any social insurance" color="#dc2626" note="ILO/VIDERI Survey, 2024" />
                <div style={{ marginTop: '8px' }}>
                  <button onClick={() => onNavigate('maps')} style={{ background: 'none', border: `1px solid ${TEAL}`, color: TEAL, padding: '8px 16px', fontSize: '12px', fontWeight: '600', cursor: 'pointer', fontFamily: '"Inter", sans-serif' }}>
                    See provincial breakdown on the maps →
                  </button>
                </div>
              </div>
            </div>
          </FadeSection>
        </div>
      </div>

      {/* ── THREE TYPES ── */}
      <div style={{ background: '#f5f3f0', borderTop: '1px solid #e8e4e0' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '80px 48px' }}>
          <FadeSection>
            <div style={sectionLabel}>Three Types of Informal Employment</div>
            <h2 style={{ ...h2, maxWidth: '640px' }}>
              "Informal" is not one thing. It covers three structurally different situations, and each requires different policy.
            </h2>
            <p style={{ fontSize: '15px', color: '#777', lineHeight: '1.7', margin: '0 0 40px 0', fontFamily: '"Inter", sans-serif', maxWidth: '620px' }}>
              The street vendor and the contract-free factory worker are both "informal" under ILO definitions, but the interventions that might reach them are entirely different.
            </p>
          </FadeSection>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2px', background: '#e0dbd6' }}>
            {[
              {
                num: '01', accent: TEAL,
                photo: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=800&q=80',
                photoPos: 'center 30%',
                title: 'The Informal Sector',
                stat: '~49%', statLabel: 'of total employment',
                body: 'Workers in unregistered household businesses: street vendors, market traders, small-scale agriculture, roadside repair shops. These enterprises operate entirely outside the formal business registry. They generate real income and real output but contribute nothing to the tax base and receive nothing from social protection. The 2008 Hanoi street vendor ban was aimed at this category.',
              },
              {
                num: '02', accent: '#f97316',
                photo: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
                photoPos: 'center 40%',
                title: 'Informal Employment in Formal Firms',
                stat: '~13%', statLabel: 'of registered-firm employees',
                body: 'Workers employed by registered, taxpaying enterprises but without a formal employment contract, without social insurance enrollment, or both. This is the most policy-relevant category because these workers are within reach of the formal system but have been excluded by cost or complexity. It includes garment factory piece workers, construction subcontractors, and domestic workers.',
              },
              {
                num: '03', accent: '#7c3aed',
                photo: 'https://images.unsplash.com/photo-1559592413-7cbb5e31f4f0?w=800&q=80',
                photoPos: 'center 50%',
                title: 'Own-Account and Agricultural Workers',
                stat: '97.9%', statLabel: 'of agricultural workers informal',
                body: 'Self-employed individuals and contributing family workers, predominantly in rice and coffee agriculture. Near-universal informality because the nature of the work, smallholder subsistence farming and family fishing operations, is incompatible with conventional social insurance structures. These workers will formalize when structural transformation moves them out of agriculture. Policy cannot compel it.',
              },
            ].map(({ num, accent, photo, photoPos, title, stat, statLabel, body: cardBody }) => (
              <div key={num} style={{ background: 'white', overflow: 'hidden' }}>
                <div style={{ height: '180px', backgroundImage: `url(${photo})`, backgroundSize: 'cover', backgroundPosition: photoPos, position: 'relative' }}>
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(255,255,255,0.85) 0%, transparent 55%)' }} />
                  <div style={{ position: 'absolute', bottom: '14px', left: '20px' }}>
                    <div style={{ fontSize: '10px', fontWeight: '700', color: accent, letterSpacing: '2px', textTransform: 'uppercase', fontFamily: '"Inter", sans-serif', marginBottom: '3px' }}>Type {num}</div>
                    <div style={{ fontSize: '20px', fontWeight: '400', color: '#1a1a1a', fontFamily: '"Georgia", serif', lineHeight: 1.1 }}>{title}</div>
                  </div>
                </div>
                <div style={{ padding: '20px 24px 28px', borderTop: `3px solid ${accent}` }}>
                  <div style={{ marginBottom: '14px' }}>
                    <span style={{ fontSize: '28px', fontWeight: '300', color: accent, fontFamily: '"Georgia", serif', letterSpacing: '-0.5px', lineHeight: 1 }}>{stat}</span>
                    <span style={{ fontSize: '12px', color: '#999', fontFamily: '"Inter", sans-serif', marginLeft: '8px' }}>{statLabel}</span>
                  </div>
                  <p style={{ fontSize: '13px', color: '#555', lineHeight: '1.75', margin: 0, fontFamily: '"Inter", sans-serif' }}>{cardBody}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── DOI MOI HISTORY ── */}
      <div style={{ background: 'white', borderTop: '1px solid #e0e0e0' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '80px 48px' }}>
          <FadeSection>
            <div style={sectionLabel}>Origins</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '72px', alignItems: 'start' }}>
              <div>
                <h2 style={h2}>
                  The informal economy did not emerge despite Vietnam's growth. It emerged because of it.
                </h2>
                <p style={body}>
                  Before 1986, Vietnam operated a fully centrally planned economy. The state assigned jobs, set prices, and controlled all production through agricultural cooperatives and state-owned enterprises. Petty trade was suppressed. Private markets were illegal.
                </p>
                <p style={body}>
                  Then came Doi Moi ("Renovation") in 1986. Facing a near-collapsed economy, 700% inflation, and dependence on $4 million per day in Soviet aid, the Communist Party chose to open markets while retaining political control. Agricultural collectives were dismantled. Private ownership was permitted. Foreign investment was welcomed.
                </p>
                <p style={body}>
                  The results were extraordinary: real per capita GDP grew nearly tenfold between 1990 and 2023, and Vietnam moved from one of the world's poorest countries to lower-middle income status. But this transformation produced a paradox. <strong>The same market liberalization that created growth also created informality.</strong> Millions of workers, newly free from state assignment, entered an economy whose formal institutions were not yet built to absorb them.
                </p>
                <p style={bodySmall}>
                  Almost half of all rural-to-urban migrants end up in informal work. Young female migrants in particular flow into domestic work, street trading, and garment factories without contracts. Geography, gender, and education largely determine who escapes.
                </p>
              </div>

              <div style={{ paddingTop: '8px' }}>
                <div style={{ fontSize: '12px', fontWeight: '700', color: '#bbb', fontFamily: '"Inter", sans-serif', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '28px' }}>A brief history</div>
                {[
                  { year: 'Pre-1986', title: 'Centrally planned economy', body: 'All employment assigned by the state. Agricultural cooperatives. No private markets. Petty trade suppressed.' },
                  { year: '1986', title: 'Doi Moi: Renovation', body: 'Market liberalization begins. Agricultural collectives dismantled. Rural workers freed from tied labor, and from state protection.' },
                  { year: '1988–1993', title: 'Land reforms and rural out-migration', body: 'Land use rights granted to households. Mass migration to cities begins. Street vending expands rapidly as informal entry point.' },
                  { year: '1990s–2000s', title: 'Growth and the informality paradox', body: 'GDP grows 6–8% annually. Formal sector expands but cannot absorb the labor force. The informal economy grows alongside it.' },
                  { year: '2008', title: 'The Hanoi street vendor ban', body: 'Authorities ban vending on 62 streets and 48 public spaces. Vendors relocate rather than formalize. The ban demonstrates that enforcement without incentives fails.', extra: (
                    <button onClick={() => onNavigate('case-studies')} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '12px', fontWeight: '600', color: TEAL, fontFamily: '"Inter", sans-serif', padding: 0, textDecoration: 'underline' }}>
                      How Chile and Korea handled this differently
                    </button>
                  )},
                  { year: '2021–present', title: 'COVID and formalization pressure', body: 'The pandemic exposed the vulnerability of informal workers: no sick pay, no unemployment insurance, no state support. Vietnam accelerates formalization targets: 60% coverage by 2030.', isLast: true },
                ].map((item, i, arr) => (
                  <TimelineItem key={item.year} {...item} isLast={i === arr.length - 1} />
                ))}
              </div>
            </div>
          </FadeSection>
        </div>
      </div>

      {/* ── RICE PHOTO ── */}
      <div style={{ background: '#111' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <PhotoBlock
            src="https://images.unsplash.com/photo-1559592413-7cbb5e31f4f0?w=1400&q=80"
            caption="Rice paddy agriculture, Vietnam. Nearly all agricultural workers, 97.9%, are informally employed. No contracts, no social insurance, no safety net beyond the land itself. Source: GSO/ILO 2021."
            credit="Unsplash"
            height="440px"
            position="center 60%"
          />
        </div>
      </div>

      {/* ── WHO IS INFORMAL ── */}
      <div style={{ background: '#fafafa', borderTop: '1px solid #e0e0e0' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '80px 48px' }}>
          <FadeSection>
            <div style={sectionLabel}>Who Is Informal?</div>
            <h2 style={{ ...h2, maxWidth: '700px' }}>
              Informality is not random. It follows the contours of geography, education, and gender.
            </h2>
          </FadeSection>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px', marginTop: '40px', alignItems: 'stretch' }}>
            {[
              { title: 'Agricultural workers', pct: '97.9%', body: 'Nearly universal informality. Rice farming, coffee cultivation, aquaculture — all dominated by household production with no contracts and no social insurance. This is the single largest informal category in Vietnam.', color: '#15803d', sub: 'GSO/ILO, 2021' },
              { title: 'Rural informal workers', pct: '77.9%', body: 'Out of every 100 rural workers, 78 are informal. Rural workers face a dramatically lower probability of transitioning to formal employment in any given quarter compared to urban workers.', color: '#1e40af', sub: 'GSO/ILO, 2021' },
              { title: 'Female workers in vulnerable roles', pct: '~65%', body: "Women's overall informality rate is slightly below men's, but women are disproportionately concentrated in the most vulnerable categories: domestic work, street vending, and garment production without contracts. Over 61% of female informal workers earn below the regional minimum wage.", color: '#9333ea', sub: 'GSO/ILO, 2021' },
              { title: 'Urban informal workers', pct: '52%', body: 'Even in cities, over half of workers are informal. Construction workers, motorbike taxi drivers, street vendors, delivery workers. Urban informality is rising as migration outpaces formal job creation.', color: '#c2410c', sub: 'GSO/ILO, 2021' },
            ].map(({ title, pct, body: cardBody, color, sub }) => (
              <FadeSection key={title}>
                <div style={{ background: 'white', border: '1px solid #e0e0e0', borderTop: `4px solid ${color}`, padding: '32px', height: '100%', boxSizing: 'border-box', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ fontSize: '36px', fontWeight: '700', color, fontFamily: '"Inter", sans-serif', marginBottom: '6px', letterSpacing: '-1px' }}>{pct}</div>
                  <div style={{ fontSize: '15px', fontWeight: '700', marginBottom: '12px', fontFamily: '"Inter", sans-serif', color: '#1a1a1a' }}>{title}</div>
                  <div style={{ fontSize: '14px', color: '#666', lineHeight: '1.7', fontFamily: '"Inter", sans-serif', flex: 1 }}>{cardBody}</div>
                  <div style={{ fontSize: '11px', color: '#bbb', fontFamily: '"Inter", sans-serif', fontStyle: 'italic', marginTop: '10px' }}>{sub}</div>
                </div>
              </FadeSection>
            ))}
          </div>
          <div style={{ fontSize: '11px', color: '#aaa', fontFamily: '"Inter", sans-serif', fontStyle: 'italic', marginTop: '16px' }}>Sources: ILO, Informal Employment in Viet Nam, 2021; GSO Labor Force Survey 2023</div>
        </div>
      </div>

      {/* ── SIDEWALK ECONOMY ── */}
      <div style={{ background: 'white', borderTop: '1px solid #e0e0e0' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '80px 48px' }}>
          <FadeSection>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '72px', alignItems: 'start' }}>
              <div>
                <div style={sectionLabel}>The Sidewalk Economy</div>
                <h2 style={h2}>
                  The street vendor is not a relic of underdevelopment. She is its solution.
                </h2>
                <p style={body}>
                  Vietnam's street vendors, the woman selling banh mi from a shoulder pole, the man grilling corn on a portable charcoal stove, the pho cart at 6am: these are among the most visible faces of the informal economy. Research by Huynh (2023) estimates the sidewalk economy at approximately 5% of urban employment and 11 to 13% of GDP in major cities. Over one million workers earn their primary income from street trade. Most are women. Most are migrants from rural areas.
                </p>
                <p style={body}>
                  Street vending offers what formal employment cannot: flexibility, immediate cash income, low capital entry requirements. A vendor can begin with 200,000 dong (roughly $8) in stock. For families without savings, without education credentials, without social connections in the city, this is not a choice. It is a lifeline.
                </p>
                <p style={bodySmall}>
                  Yet vendors exist in perpetual legal precarity. The 2008 Hanoi ban, which prohibited vending on 62 streets, demonstrated what happens when "urban modernization" collides with survival economics. Vendors were driven from their spots, incomes fell, and conflicts with enforcement officials became routine. The ban was selectively enforced and widely circumvented. Turner and Schoenberger (2011) documented vendors learning which officials had fining authority and adapting their movements accordingly.
                </p>
              </div>
              <div style={{ paddingTop: '48px' }}>
                <PhotoBlock
                  src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&q=80"
                  caption="A street food vendor. The shoulder pole remains the entry-level capital investment for millions of informal traders. Flexibility, not inefficiency, explains its persistence."
                  credit="Unsplash"
                  height="340px"
                  position="center"
                />
                <div style={{ marginTop: '40px', display: 'flex', flexDirection: 'column', gap: '32px' }}>
                  <PullQuote stat="1" unit="M+" label="workers in the sidewalk economy alone" color={TEAL} note="Huynh 2023; Study on Vietnam's Sidewalk Economy" />
                  <PullQuote stat="200" unit="k dong" label="typical starting capital for a street vendor (approx. $8 USD)" color="#f97316" note="Field research, Turner and Schoenberger 2012" />
                </div>
              </div>
            </div>
          </FadeSection>
        </div>
      </div>

      {/* ── THE KEY INSIGHT — dark callout ── */}
      <div style={{ background: '#1a1a1a', padding: '72px 48px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <FadeSection>
            <div style={{ fontSize: '11px', fontWeight: '700', color: TEAL, fontFamily: '"Inter", sans-serif', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '24px' }}>Why this matters</div>
            <h2 style={{ fontSize: 'clamp(26px, 3.5vw, 44px)', fontWeight: '400', color: 'white', lineHeight: '1.2', margin: '0 0 28px 0', letterSpacing: '-0.5px' }}>
              A country cannot become high-income with two-thirds of its workforce invisible to the state.
            </h2>
            <p style={{ fontSize: '17px', color: 'rgba(255,255,255,0.7)', lineHeight: '1.85', margin: '0 0 20px 0', fontFamily: '"Inter", sans-serif' }}>
              Vietnam's 2045 goal, high-income status by the centennial of the Socialist Republic, requires sustained growth, expanding public investment, and a strong social insurance system. All three depend on a formal economy that currently represents less than a third of the workforce.
            </p>
            <p style={{ fontSize: '17px', color: 'rgba(255,255,255,0.7)', lineHeight: '1.85', margin: '0 0 28px 0', fontFamily: '"Inter", sans-serif' }}>
              Informal workers pay no income tax or social insurance contributions. Their employers, if they have them, often avoid payroll taxes. With a tax-to-GDP ratio of 16.8% in 2023 (OECD Revenue Statistics Asia-Pacific 2025), Vietnam cannot fund the public investment in infrastructure, education, and social protection that high-income status requires. The fiscal gap is structural.
            </p>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <button onClick={() => onNavigate('vietnam2045')} style={{ background: TEAL_BRIGHT, color: '#0f0f0f', border: 'none', padding: '10px 22px', fontSize: '13px', fontWeight: '700', cursor: 'pointer', fontFamily: '"Inter", sans-serif' }}>
                See Vietnam 2045 analysis
              </button>
              <button onClick={() => onNavigate('fiscal')} style={{ background: 'none', border: `1px solid ${TEAL}`, color: TEAL_BRIGHT, padding: '10px 22px', fontSize: '13px', fontWeight: '600', cursor: 'pointer', fontFamily: '"Inter", sans-serif' }}>
                Model the fiscal gap
              </button>
            </div>
          </FadeSection>
        </div>
      </div>

      {/* ── SOURCES ── */}
      <div style={{ background: '#fafafa', borderTop: '1px solid #e0e0e0', padding: '56px 48px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <FadeSection>
            <div style={{ fontSize: '11px', fontWeight: '700', color: '#bbb', fontFamily: '"Inter", sans-serif', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '20px' }}>Sources and Further Reading</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px 48px', maxWidth: '900px' }}>
              {[
                'GSO/ILO. Overall Situation of Workers in Informal Employment in Viet Nam. 2021.',
                'ILO/VIDERI. Expanding Social Insurance for Household Businesses in Viet Nam. 2024.',
                'ILO. Informal Employment in Viet Nam: Trends and Determinants. 2021.',
                'OECD. Revenue Statistics in Asia and the Pacific 2025: Viet Nam.',
                'Huynh, T.N.Q. Street Vendors in Vietnam. 2023.',
                'Turner, S. and Schoenberger, L. Street Vendor Livelihoods and Everyday Politics in Hanoi. Urban Studies, 2012.',
                'World Bank. Viet Nam 2045: Breaking Through. 2024.',
                'GSO. Labor Force Survey 2023. General Statistics Office of Vietnam.',
              ].map(src => (
                <div key={src} style={{ fontSize: '12px', color: '#888', lineHeight: '1.6', fontFamily: '"Inter", sans-serif', paddingLeft: '12px', borderLeft: '2px solid #e0e0e0' }}>{src}</div>
              ))}
            </div>
          </FadeSection>
        </div>
      </div>

      {/* ── DATA NOTES ── */}
      <div style={{ background: '#f0f0f0', borderTop: '1px solid #e0e0e0', padding: '24px 48px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ fontSize: '10px', fontWeight: '700', color: '#bbb', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '8px', fontFamily: '"Inter", sans-serif' }}>Data Notes</div>
          <p style={{ fontSize: '12px', color: '#aaa', lineHeight: '1.75', margin: 0, fontFamily: '"Inter", sans-serif', maxWidth: '860px' }}>
            The 68.5% informality rate and 33.6M worker count are from GSO/ILO 2021 using the ILO-aligned methodology including agriculture and forestry. The pre-2021 GSO measure (approximately 56%) used a narrower definition and is not directly comparable. The 4% household business social insurance figure refers specifically to household business owners in the ILO/VIDERI 2024 survey of 827 registered HHBs, not the full informal workforce. The 16.8% tax-to-GDP figure is from OECD Revenue Statistics Asia-Pacific 2025 for the year 2023. Urban informality (52%) and rural informality (77.9%) are from GSO/ILO 2021.
          </p>
        </div>
      </div>

      {/* ── FOOTER NAV ── */}
      <div style={{ background: 'white', borderTop: '1px solid #e0e0e0', padding: '24px 48px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <button onClick={onBack} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '13px', fontWeight: '600', color: TEAL, fontFamily: '"Inter", sans-serif' }}>
          Back to Overview
        </button>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '11px', color: '#bbb', fontFamily: '"Inter", sans-serif' }}>ECON 62 · Topics in Macroeconomics · Winter 2026</div>
          <div style={{ fontSize: '10px', color: '#ddd', fontFamily: '"Inter", sans-serif', marginTop: '2px' }}>Designed and Built by Miel Wewerka · Dartmouth College</div>
        </div>
        <button onClick={() => onNavigate('maps')} style={{ background: TEAL, color: 'white', border: 'none', padding: '10px 22px', fontSize: '13px', fontWeight: '700', cursor: 'pointer', fontFamily: '"Inter", sans-serif' }}>
          Part II: Interactive Maps
        </button>
      </div>

    </div>
  );
}
