// ========================================
// WHAT IS THE INFORMAL ECONOMY?
// Growth Lab / Indonesia-style editorial explainer
// Structured, data-driven, authoritative
// ========================================

import React, { useState, useEffect, useRef } from 'react';

// ─── Reusable fade-in-on-scroll hook ───────────────────────────────────────
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

// ─── Animated counter ──────────────────────────────────────────────────────
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
      setDisplay((ease * target).toFixed(typeof value === 'string' && value.includes('.') ? 1 : 0));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [visible, value, duration]);
  return <span ref={ref}>{display}{suffix}</span>;
}

// ─── Section fade wrapper ──────────────────────────────────────────────────
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

// ─── Pull quote component ──────────────────────────────────────────────────
function PullQuote({ stat, unit = '', label, color = '#00897b', note }) {
  return (
    <div style={{
      borderLeft: `4px solid ${color}`,
      paddingLeft: '24px',
      margin: '0'
    }}>
      <div style={{
        fontSize: '52px',
        fontWeight: '800',
        color,
        lineHeight: 1,
        letterSpacing: '-2px',
        fontFamily: '"Georgia", serif'
      }}>
        <AnimatedStat value={stat} suffix={unit} />
      </div>
      <div style={{ fontSize: '14px', color: '#555', marginTop: '8px', lineHeight: '1.5', maxWidth: '200px' }}>
        {label}
      </div>
      {note && <div style={{ fontSize: '11px', color: '#999', marginTop: '6px', fontStyle: 'italic' }}>{note}</div>}
    </div>
  );
}

// ─── Image with caption ───────────────────────────────────────────────────
function PhotoBlock({ src, caption, credit, height = '480px', position = 'center' }) {
  return (
    <figure style={{ margin: 0 }}>
      <div style={{
        width: '100%',
        height,
        backgroundImage: `url(${src})`,
        backgroundSize: 'cover',
        backgroundPosition: position,
        backgroundColor: '#ddd'
      }} />
      <figcaption style={{
        padding: '12px 0 0 0',
        fontSize: '12px',
        color: '#888',
        lineHeight: '1.5',
        borderTop: '1px solid #e0e0e0',
        marginTop: '8px'
      }}>
        {caption}
        {credit && <span style={{ color: '#bbb' }}> — {credit}</span>}
      </figcaption>
    </figure>
  );
}

// ─── Timeline entry ───────────────────────────────────────────────────────
function TimelineItem({ year, title, body, isLast }) {
  const [ref, visible] = useInView(0.2);
  return (
    <div ref={ref} style={{
      display: 'flex',
      gap: '24px',
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateX(0)' : 'translateX(-20px)',
      transition: 'all 0.6s ease'
    }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0, width: '48px' }}>
        <div style={{
          width: '12px', height: '12px', borderRadius: '50%',
          background: '#00897b', flexShrink: 0, marginTop: '4px'
        }} />
        {!isLast && <div style={{ width: '2px', flex: 1, background: '#e0e0e0', marginTop: '4px' }} />}
      </div>
      <div style={{ paddingBottom: isLast ? 0 : '32px' }}>
        <div style={{ fontSize: '12px', fontWeight: '700', color: '#00897b', letterSpacing: '1px', marginBottom: '4px' }}>{year}</div>
        <div style={{ fontSize: '16px', fontWeight: '700', color: '#1a1a1a', marginBottom: '8px' }}>{title}</div>
        <div style={{ fontSize: '14px', color: '#666', lineHeight: '1.7' }}>{body}</div>
      </div>
    </div>
  );
}

// ─── Main component ────────────────────────────────────────────────────────
export default function InformalExplainer({ onBack }) {

  const TEAL = '#00897b';
  const TEAL_LIGHT = '#e0f7f4';

  const styles = {
    page: {
      background: '#fafafa',
      fontFamily: '"Georgia", "Times New Roman", serif',
      color: '#1a1a1a',
      minHeight: '100vh'
    },
    // Top navigation bar
    nav: {
      background: 'white',
      borderBottom: '1px solid #e0e0e0',
      padding: '14px 40px',
      display: 'flex',
      alignItems: 'center',
      gap: '16px',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      boxShadow: '0 1px 4px rgba(0,0,0,0.06)'
    },
    // Hero banner
    hero: {
      background: '#1a1a1a',
      color: 'white',
      padding: '80px 40px 72px',
      position: 'relative',
      overflow: 'hidden'
    },
    heroAccent: {
      position: 'absolute',
      top: 0, left: 0, right: 0,
      height: '4px',
      background: `linear-gradient(90deg, ${TEAL}, #26a69a)`
    },
    heroLabel: {
      fontSize: '11px',
      fontWeight: '700',
      color: TEAL,
      letterSpacing: '3px',
      textTransform: 'uppercase',
      marginBottom: '20px',
      fontFamily: '"Inter", sans-serif'
    },
    heroTitle: {
      fontSize: 'clamp(36px, 5vw, 64px)',
      fontWeight: '400',
      lineHeight: '1.1',
      margin: '0 0 24px 0',
      maxWidth: '760px',
      letterSpacing: '-1px'
    },
    heroDeck: {
      fontSize: '18px',
      color: 'rgba(255,255,255,0.75)',
      maxWidth: '620px',
      lineHeight: '1.7',
      margin: '0',
      fontFamily: '"Inter", sans-serif',
      fontWeight: '400'
    },
    // Main content wrapper
    container: {
      maxWidth: '1100px',
      margin: '0 auto',
      padding: '0 40px'
    },
    // Two column layout
    twoCol: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '64px',
      alignItems: 'start'
    },
    twoColWide: {
      display: 'grid',
      gridTemplateColumns: '2fr 1fr',
      gap: '64px',
      alignItems: 'start'
    },
    // Section spacing
    section: {
      padding: '72px 0'
    },
    sectionDivider: {
      borderTop: '1px solid #e0e0e0',
      padding: '72px 0'
    },
    // Typography
    sectionLabel: {
      fontSize: '11px',
      fontWeight: '700',
      color: TEAL,
      letterSpacing: '2.5px',
      textTransform: 'uppercase',
      marginBottom: '16px',
      fontFamily: '"Inter", sans-serif'
    },
    h2: {
      fontSize: 'clamp(24px, 3vw, 38px)',
      fontWeight: '400',
      lineHeight: '1.2',
      margin: '0 0 24px 0',
      letterSpacing: '-0.5px'
    },
    h3: {
      fontSize: '20px',
      fontWeight: '700',
      margin: '0 0 12px 0',
      fontFamily: '"Inter", sans-serif'
    },
    body: {
      fontSize: '17px',
      lineHeight: '1.85',
      color: '#333',
      margin: '0 0 20px 0'
    },
    bodySmall: {
      fontSize: '15px',
      lineHeight: '1.75',
      color: '#555',
      margin: '0 0 16px 0',
      fontFamily: '"Inter", sans-serif'
    },
    // Definition card
    defCard: {
      background: TEAL_LIGHT,
      border: `1px solid #b2dfdb`,
      borderRadius: '6px',
      padding: '28px 32px',
      marginBottom: '24px'
    },
    // Stat grid
    statGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '32px',
      padding: '48px 0'
    },
    // Callout box
    callout: {
      background: '#1a1a1a',
      color: 'white',
      padding: '48px',
      borderRadius: '4px',
      margin: '48px 0'
    },
    // Source note
    sourceNote: {
      fontSize: '11px',
      color: '#aaa',
      fontFamily: '"Inter", sans-serif',
      fontStyle: 'italic',
      marginTop: '6px'
    }
  };

  return (
    <div style={styles.page}>

      {/* ── NAV ─────────────────────────────────────────────────────── */}
      <nav style={styles.nav}>
        <button onClick={onBack} style={{
          background: 'none', border: 'none', cursor: 'pointer',
          fontSize: '13px', fontWeight: '600', color: TEAL,
          fontFamily: '"Inter", sans-serif', padding: 0,
          display: 'flex', alignItems: 'center', gap: '6px'
        }}>← Back</button>
        <span style={{ color: '#e0e0e0' }}>|</span>
        <span style={{
          fontSize: '13px', color: '#555',
          fontFamily: '"Inter", sans-serif'
        }}>What Is the Informal Economy?</span>
      </nav>

      {/* ── HERO ────────────────────────────────────────────────────── */}
      <header style={styles.hero}>
        <div style={styles.heroAccent} />
        <div style={styles.container}>
          <div style={styles.heroLabel}>Explainer · Vietnam Informal Economy</div>
          <h1 style={styles.heroTitle}>
            What does it mean to work outside the economy?
          </h1>
          <p style={styles.heroDeck}>
            In Vietnam, nearly two in three workers have no contract, no social insurance, and no legal protection. They are not counted in the tax base, not covered by labor law, and not visible to the state. This is the informal economy — and it is not a marginal phenomenon. It is the economy.
          </p>
        </div>
      </header>

      {/* ── LEAD PHOTO ──────────────────────────────────────────────── */}
      <div style={{ background: '#111' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <PhotoBlock
            src="https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=1400&q=80"
            caption="Street vendors in Hội An navigate the line between earning a living and avoiding enforcement. Most have operated at the same spot for years — yet hold no license, pay no tax, and receive no social protection."
            credit="Unsplash"
            height="520px"
            position="center 40%"
          />
        </div>
      </div>

      {/* ── DEFINITION SECTION ──────────────────────────────────────── */}
      <div style={{ background: 'white' }}>
        <div style={styles.container}>
          <div style={{ ...styles.section }}>
            <FadeSection>
              <div style={styles.twoColWide}>
                <div>
                  <div style={styles.sectionLabel}>Definition</div>
                  <h2 style={styles.h2}>
                    A worker without a contract. A business without a license. A transaction without a receipt.
                  </h2>
                  <p style={styles.body}>
                    The informal economy is not a place — it's a condition. According to the International Labour Organization, informal employment encompasses all work arrangements that provide no legal or social protection: no employment contract, no social insurance, no occupational health coverage.
                  </p>
                  <p style={styles.body}>
                    In Vietnam, the General Statistics Office (GSO) operationalizes this through a single criterion: if a worker is not covered by compulsory social insurance, they are informal. This captures agricultural day laborers, street vendors, construction workers paid in cash, domestic workers, and the vast majority of workers in small family businesses.
                  </p>
                  <div style={styles.defCard}>
                    <div style={{ fontSize: '13px', fontWeight: '700', color: TEAL, marginBottom: '10px', fontFamily: '"Inter", sans-serif', letterSpacing: '1px', textTransform: 'uppercase' }}>ILO Definition</div>
                    <div style={{ fontSize: '16px', lineHeight: '1.7', color: '#333' }}>
                      "All employment arrangements that do not provide individuals with legal or social protection through their work, thereby leaving them more exposed to economic risk."
                    </div>
                    <div style={styles.sourceNote}>Source: ILO, Informal Employment in Viet Nam: Trends and Determinants, 2021</div>
                  </div>
                  <p style={{ ...styles.bodySmall, fontStyle: 'italic', color: '#777' }}>
                    Importantly, informal work exists inside formal sector firms too. About 13% of workers at formally-registered private enterprises remain informally employed — meaning they work for a legitimate company but with no contract or insurance. Informality is a job characteristic, not just a sector.
                  </p>
                </div>

                {/* Stat column */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '40px', paddingTop: '48px' }}>
                  <PullQuote stat="64.5" unit="%" label="of Vietnamese workers are informally employed" note="GSO Labor Force Survey 2023" />
                  <PullQuote stat="33.6" unit="M" label="informal workers nationwide" color="#f97316" note="GSO, 2021" />
                  <PullQuote stat="5" unit="%" label="of informal workers voluntarily enrolled in social insurance" color="#dc2626" note="World Bank, 2023" />
                </div>
              </div>
            </FadeSection>
          </div>
        </div>
      </div>

      {/* ── FULL BLEED STAT BANNER ───────────────────────────────────── */}
      <div style={{ background: '#1a1a1a', padding: '64px 40px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <FadeSection>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '1px',
              background: '#333'
            }}>
              {[
                { stat: '97.9', unit: '%', label: 'of agricultural workers are informal', note: 'ILO, 2021' },
                { stat: '52', unit: '%', label: 'urban informality rate — vs 78% rural', note: 'ILO, 2021' },
                { stat: '11–13', unit: '%', label: 'estimated sidewalk economy share of GDP in major cities', note: 'Huynh, 2023' },
              ].map(({ stat, unit, label, note }) => (
                <div key={label} style={{ background: '#1a1a1a', padding: '40px 36px' }}>
                  <div style={{
                    fontSize: '48px', fontWeight: '800', color: TEAL,
                    fontFamily: '"Georgia", serif', lineHeight: 1, marginBottom: '12px'
                  }}>{stat}{unit}</div>
                  <div style={{ fontSize: '14px', color: 'rgba(255,255,255,0.75)', lineHeight: '1.5', fontFamily: '"Inter", sans-serif' }}>{label}</div>
                  <div style={{ fontSize: '11px', color: '#555', marginTop: '8px', fontFamily: '"Inter", sans-serif', fontStyle: 'italic' }}>{note}</div>
                </div>
              ))}
            </div>
          </FadeSection>
        </div>
      </div>

      {/* ── DOI MOI HISTORY SECTION ──────────────────────────────────── */}
      <div style={{ background: 'white' }}>
        <div style={styles.container}>
          <div style={styles.sectionDivider}>
            <FadeSection>
              <div style={styles.sectionLabel}>Origins</div>
              <div style={styles.twoCol}>
                <div>
                  <h2 style={styles.h2}>
                    The informal economy did not emerge despite Vietnam's growth. It emerged because of it.
                  </h2>
                  <p style={styles.body}>
                    Before 1986, Vietnam operated a fully centrally planned economy. The state assigned jobs, set prices, and controlled all production through agricultural cooperatives and state-owned enterprises. Petty trade was suppressed. Private markets were illegal.
                  </p>
                  <p style={styles.body}>
                    Then came Doi Moi — "Renovation" — in 1986. Facing a near-collapsed economy, 700% inflation, and dependence on $4 million per day in Soviet aid, the Communist Party chose to open markets while retaining political control. Agricultural collectives were dismantled. Private ownership was permitted. Foreign investment was welcomed.
                  </p>
                  <p style={styles.body}>
                    The results were extraordinary: real per capita GDP tripled between 1990 and 2015, and Vietnam vaulted from one of the world's poorest countries to lower-middle income status. But this transformation produced a paradox. <strong>The same market liberalization that created growth also created informality.</strong> Millions of workers — newly free from state assignment — entered an economy whose formal institutions were not yet built to absorb them.
                  </p>
                  <p style={{ ...styles.bodySmall, color: '#777' }}>
                    Almost half of all rural-to-urban migrants end up in informal work. Young female migrants in particular flow into informal urban services — domestic work, street trading, garment factories without contracts. Geography, gender, and education largely determine who escapes.
                  </p>
                </div>

                {/* Timeline */}
                <div style={{ paddingTop: '8px' }}>
                  <div style={{ fontSize: '12px', fontWeight: '700', color: '#999', fontFamily: '"Inter", sans-serif', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '28px' }}>A brief history</div>
                  {[
                    {
                      year: 'Pre-1986',
                      title: 'Centrally planned economy',
                      body: 'All employment assigned by the state. Agricultural cooperatives. No private markets. Petty trade illegal or suppressed.',
                    },
                    {
                      year: '1986',
                      title: 'Doi Moi — "Renovation"',
                      body: 'Market liberalization begins. Agricultural collectives dismantled. Household contract system introduced. Rural workers freed from tied labor — and from state protection.',
                    },
                    {
                      year: '1988–1993',
                      title: 'Land reforms and rural out-migration',
                      body: 'Land use rights granted to households. Rural labor surplus grows. Mass migration to cities begins. Street vending expands rapidly as informal entry point.',
                    },
                    {
                      year: '1990s–2000s',
                      title: 'Growth and the informality paradox',
                      body: 'GDP grows 6–8% annually. Formal sector expands but cannot absorb the labor force. The informal economy grows alongside, not instead of, the formal economy.',
                    },
                    {
                      year: '2008',
                      title: 'The Hanoi street vendor ban',
                      body: 'Authorities ban street vending on 62 streets and 48 public spaces. Vendors — mostly female rural migrants — are driven from their livelihoods. The ban reveals the tension between "civilized" urban development and survival economics.',
                    },
                    {
                      year: '2021–present',
                      title: 'COVID and formalization pressure',
                      body: 'The pandemic exposed the vulnerability of informal workers — no sick pay, no unemployment insurance, no state support. Vietnam accelerates formalization targets: 60% social insurance coverage by 2030.',
                    },
                  ].map((item, i, arr) => (
                    <TimelineItem key={item.year} {...item} isLast={i === arr.length - 1} />
                  ))}
                </div>
              </div>
            </FadeSection>
          </div>
        </div>
      </div>

      {/* ── SECOND PHOTO ────────────────────────────────────────────── */}
      <div style={{ background: '#111', padding: '0' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <PhotoBlock
            src="https://images.unsplash.com/photo-1559592413-7cbb5e31f4f0?w=1400&q=80"
            caption="Rice paddy agriculture remains one of the most informal sectors in Vietnam, with a 97.9% informality rate. Most agricultural workers have no contract, no social insurance, and no safety net beyond the land itself."
            credit="Unsplash"
            height="440px"
            position="center 60%"
          />
        </div>
      </div>

      {/* ── WHO IS INFORMAL ─────────────────────────────────────────── */}
      <div style={{ background: '#fafafa' }}>
        <div style={styles.container}>
          <div style={styles.sectionDivider}>
            <FadeSection>
              <div style={styles.sectionLabel}>Who is informal?</div>
              <h2 style={{ ...styles.h2, maxWidth: '700px' }}>
                Informality is not random. It follows the contours of geography, education, and gender.
              </h2>
            </FadeSection>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px', marginTop: '40px' }}>
              {[
                {
                  title: 'Agricultural workers',
                  pct: '97.9%',
                  body: 'Nearly universal informality. Rice farming, coffee cultivation, aquaculture — all dominated by household production with no contracts and no social insurance. This is the single largest informal category in Vietnam.',
                  color: '#15803d'
                },
                {
                  title: 'Rural informal workers',
                  pct: '78%',
                  body: 'Out of every 100 rural workers, 78 are informal. Rural workers face a 2.7% chance of transitioning to formal employment in any given quarter — compared to 6.8% in urban areas.',
                  color: '#1e40af'
                },
                {
                  title: 'Female migrant workers',
                  pct: '65%',
                  body: 'Women's informality rate is slightly lower than men's (65% vs 71.6%), but women dominate the most vulnerable categories: domestic workers, street vendors, and garment workers without contracts.',
                  color: '#9333ea'
                },
                {
                  title: 'Urban informal workers',
                  pct: '52%',
                  body: 'Even in cities — the engines of formalization — over half of workers are informal. Construction workers, motorbike taxi drivers, street vendors, delivery workers. Urban informality is rising as migration outpaces formal job creation.',
                  color: '#f97316'
                },
              ].map(({ title, pct, body, color }) => (
                <FadeSection key={title}>
                  <div style={{
                    background: 'white',
                    border: '1px solid #e0e0e0',
                    borderTop: `4px solid ${color}`,
                    padding: '32px',
                    borderRadius: '4px'
                  }}>
                    <div style={{ fontSize: '36px', fontWeight: '800', color, fontFamily: '"Georgia", serif', marginBottom: '8px' }}>{pct}</div>
                    <div style={{ fontSize: '15px', fontWeight: '700', marginBottom: '12px', fontFamily: '"Inter", sans-serif' }}>{title}</div>
                    <div style={{ fontSize: '14px', color: '#666', lineHeight: '1.7', fontFamily: '"Inter", sans-serif' }}>{body}</div>
                  </div>
                </FadeSection>
              ))}
            </div>
            <div style={{ ...styles.sourceNote, marginTop: '16px' }}>Sources: ILO, Informal Employment in Viet Nam, 2021; GSO Labor Force Survey 2023</div>
          </div>
        </div>
      </div>

      {/* ── SIDEWALK ECONOMY SECTION ─────────────────────────────────── */}
      <div style={{ background: 'white' }}>
        <div style={styles.container}>
          <div style={styles.sectionDivider}>
            <FadeSection>
              <div style={styles.twoCol}>
                <div>
                  <div style={styles.sectionLabel}>The sidewalk economy</div>
                  <h2 style={styles.h2}>
                    The street vendor is not a relic of underdevelopment. She is its solution.
                  </h2>
                  <p style={styles.body}>
                    Vietnam's street vendors — the woman selling bánh mì from a shoulder pole, the man grilling corn on a portable charcoal stove, the pho cart at 6am — represent one of the most visible faces of the informal economy.
                  </p>
                  <p style={styles.body}>
                    Research by Huynh (2023) estimates the sidewalk economy at approximately 5% of urban employment and 11–13% of GDP in major cities. Over one million workers earn their primary income from street trade. Most are women. Most are migrants from rural areas, who left due to low farm productivity, land fragmentation, and declining agricultural wages.
                  </p>
                  <p style={styles.body}>
                    Street vending offers what formal employment cannot: flexibility, immediate cash income, low capital entry requirements. A vendor can begin with 200,000 đồng (roughly $8) in stock. For families without savings, without education credentials, without social connections in the city — this is not a choice. It is a lifeline.
                  </p>
                  <p style={{ ...styles.bodySmall, color: '#777' }}>
                    Yet vendors exist in perpetual legal precarity. The 2008 Hanoi ban — which prohibited vending on 62 streets — demonstrated what happens when "urban modernization" collides with survival economics. Vendors were driven from their spots, incomes fell, and conflicts with enforcement officials became routine. The ban was selectively enforced and widely circumvented. Today, informal vending remains widespread — and contested.
                  </p>
                </div>
                <div style={{ paddingTop: '48px' }}>
                  <PhotoBlock
                    src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&q=80"
                    caption="A street food vendor in Hội An. The shoulder pole — one of the most ancient tools in Vietnamese commerce — remains the entry-level capital investment for millions of informal traders."
                    credit="Unsplash"
                    height="380px"
                    position="center"
                  />
                  <div style={{ marginTop: '32px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <PullQuote stat="1" unit="M+" label="workers in the sidewalk economy alone" color={TEAL} note="Huynh 2023; Study on Vietnam's Sidewalk Economy" />
                    <PullQuote stat="200" unit="k đồng" label="typical starting capital for a street vendor (≈$8 USD)" color="#f97316" note="Field research, Turner & Schoenberger 2012" />
                  </div>
                </div>
              </div>
            </FadeSection>
          </div>
        </div>
      </div>

      {/* ── WHY IT MATTERS CALLOUT ───────────────────────────────────── */}
      <div style={{ background: '#1a1a1a', padding: '72px 40px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <FadeSection>
            <div style={{ fontSize: '11px', fontWeight: '700', color: TEAL, fontFamily: '"Inter", sans-serif', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '24px' }}>Why this matters</div>
            <h2 style={{ fontSize: 'clamp(26px, 3.5vw, 44px)', fontWeight: '400', color: 'white', lineHeight: '1.2', margin: '0 0 28px 0' }}>
              A country cannot become high-income with two-thirds of its workforce invisible to the state.
            </h2>
            <p style={{ fontSize: '17px', color: 'rgba(255,255,255,0.7)', lineHeight: '1.85', margin: '0 0 20px 0', fontFamily: '"Inter", sans-serif' }}>
              Vietnam's 2045 goal — high-income status by the centennial of the Socialist Republic — requires sustained growth, expanding public investment, and a strong social insurance system. All three depend on a formal economy that currently represents only one-third of the workforce.
            </p>
            <p style={{ fontSize: '17px', color: 'rgba(255,255,255,0.7)', lineHeight: '1.85', margin: '0', fontFamily: '"Inter", sans-serif' }}>
              Informal workers pay no income tax or social insurance contributions. Their employers — if they have them — often avoid payroll taxes. The fiscal gap is structural. Closing it requires not just enforcement, but the structural transformation of the economy itself: urbanization, education, and the continued shift from agriculture to manufacturing and services.
            </p>
          </FadeSection>
        </div>
      </div>

      {/* ── SOURCES ─────────────────────────────────────────────────── */}
      <div style={{ background: '#fafafa', borderTop: '1px solid #e0e0e0', padding: '48px 40px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <FadeSection>
            <div style={{ fontSize: '11px', fontWeight: '700', color: '#999', fontFamily: '"Inter", sans-serif', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '20px' }}>Sources & Further Reading</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px 48px' }}>
              {[
                'ILO. (2021). Informal Employment in Viet Nam: Trends and Determinants. ILO Country Office for Viet Nam.',
                'GSO & ILO. (2023). Overall Situation of Workers in Informal Employment in Viet Nam. General Statistics Office.',
                'Huynh, T.N.Q. (2023). Street Vendors in Vietnam: Short Cultural and Economic Insight. International Journal of Culture and Education.',
                'Turner, S. & Schoenberger, L. (2012). Street Vendor Livelihoods and Everyday Politics in Hanoi, Vietnam. Urban Studies, 49(5).',
                'Lincoln, M. (2008). Report from the Field: Street Vendors and the Informal Sector in Hanoi. Dialectical Anthropology.',
                'IMF. (2020). Vietnam's Development Success Story and the Unfinished SDG Agenda. Working Paper WP/20/31.',
                'World Bank. (2023). Vietnam Country Profile. Open Development Vietnam / World Bank Data.',
                'GSO. (2024). Labor Force Survey 2023. General Statistics Office of Vietnam.',
              ].map((source) => (
                <div key={source} style={{ fontSize: '12px', color: '#888', lineHeight: '1.6', fontFamily: '"Inter", sans-serif', paddingLeft: '12px', borderLeft: '2px solid #e0e0e0' }}>
                  {source}
                </div>
              ))}
            </div>
          </FadeSection>
        </div>
      </div>

      {/* ── FOOTER NAV ──────────────────────────────────────────────── */}
      <div style={{ background: 'white', borderTop: '1px solid #e0e0e0', padding: '32px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <button onClick={onBack} style={{
          background: 'none', border: 'none', cursor: 'pointer',
          fontSize: '14px', fontWeight: '600', color: TEAL,
          fontFamily: '"Inter", sans-serif'
        }}>← Back to Overview</button>
        <div style={{ fontSize: '12px', color: '#bbb', fontFamily: '"Inter", sans-serif' }}>
          ECON 62 · Topics in Macroeconomics · Winter 2026
        </div>
      </div>

    </div>
  );
}
