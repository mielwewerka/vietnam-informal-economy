// ========================================
// WHAT IS THE INFORMAL ECONOMY?
// Part I of Vietnam Informal Economy project
// ========================================

import React, { useState, useEffect, useRef } from 'react';

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

function PullQuote({ stat, unit = '', label, color = '#00897b', note }) {
  return (
    <div style={{ borderLeft: `4px solid ${color}`, paddingLeft: '24px', margin: '0' }}>
      <div style={{ fontSize: '52px', fontWeight: '800', color, lineHeight: 1, letterSpacing: '-2px', fontFamily: '"Inter", sans-serif' }}>
        <AnimatedStat value={stat} suffix={unit} />
      </div>
      <div style={{ fontSize: '14px', color: '#555', marginTop: '8px', lineHeight: '1.5', maxWidth: '200px' }}>
        {label}
      </div>
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
    <div ref={ref} style={{
      display: 'flex', gap: '24px',
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateX(0)' : 'translateX(-20px)',
      transition: 'all 0.6s ease'
    }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0, width: '48px' }}>
        <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#00897b', flexShrink: 0, marginTop: '4px' }} />
        {!isLast && <div style={{ width: '2px', flex: 1, background: '#e0e0e0', marginTop: '4px' }} />}
      </div>
      <div style={{ paddingBottom: isLast ? 0 : '32px' }}>
        <div style={{ fontSize: '12px', fontWeight: '700', color: '#00897b', letterSpacing: '1px', marginBottom: '4px' }}>{year}</div>
        <div style={{ fontSize: '16px', fontWeight: '700', color: '#1a1a1a', marginBottom: '8px' }}>{title}</div>
        <div style={{ fontSize: '14px', color: '#666', lineHeight: '1.7' }}>{body}</div>
        {extra && <div style={{ marginTop: '8px' }}>{extra}</div>}
      </div>
    </div>
  );
}

export default function InformalExplainer({ onBack, onNavigate }) {

  const TEAL = '#00897b';
  const TEAL_LIGHT = '#e0f7f4';

  const styles = {
    page: { background: '#fafafa', fontFamily: '"Georgia", "Times New Roman", serif', color: '#1a1a1a', minHeight: '100vh' },
    nav: { background: 'white', borderBottom: '1px solid #e0e0e0', padding: '14px 40px', display: 'flex', alignItems: 'center', gap: '16px', position: 'sticky', top: 0, zIndex: 100, boxShadow: '0 1px 4px rgba(0,0,0,0.06)' },
    hero: { background: '#1a1a1a', color: 'white', padding: '80px 40px 72px', position: 'relative', overflow: 'hidden' },
    heroAccent: { position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: `linear-gradient(90deg, ${TEAL}, #26a69a)` },
    heroLabel: { fontSize: '11px', fontWeight: '700', color: TEAL, letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '20px', fontFamily: '"Inter", sans-serif' },
    heroTitle: { fontSize: 'clamp(36px, 5vw, 64px)', fontWeight: '400', lineHeight: '1.1', margin: '0 0 24px 0', maxWidth: '760px', letterSpacing: '-1px' },
    heroDeck: { fontSize: '18px', color: 'rgba(255,255,255,0.75)', maxWidth: '620px', lineHeight: '1.7', margin: '0', fontFamily: '"Inter", sans-serif', fontWeight: '400' },
    container: { maxWidth: '1100px', margin: '0 auto', padding: '0 40px' },
    twoCol: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', alignItems: 'start' },
    twoColWide: { display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '64px', alignItems: 'start' },
    section: { padding: '72px 0' },
    sectionDivider: { borderTop: '1px solid #e0e0e0', padding: '72px 0' },
    sectionLabel: { fontSize: '11px', fontWeight: '700', color: TEAL, letterSpacing: '2.5px', textTransform: 'uppercase', marginBottom: '16px', fontFamily: '"Inter", sans-serif' },
    h2: { fontSize: 'clamp(24px, 3vw, 38px)', fontWeight: '400', lineHeight: '1.2', margin: '0 0 24px 0', letterSpacing: '-0.5px' },
    h3: { fontSize: '20px', fontWeight: '700', margin: '0 0 12px 0', fontFamily: '"Inter", sans-serif' },
    body: { fontSize: '17px', lineHeight: '1.85', color: '#333', margin: '0 0 20px 0' },
    bodySmall: { fontSize: '15px', lineHeight: '1.75', color: '#555', margin: '0 0 16px 0', fontFamily: '"Inter", sans-serif' },
    defCard: { background: TEAL_LIGHT, border: `1px solid #b2dfdb`, borderRadius: '6px', padding: '28px 32px', marginBottom: '24px' },
    statGrid: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '32px', padding: '48px 0' },
    callout: { background: '#1a1a1a', color: 'white', padding: '48px', borderRadius: '4px', margin: '48px 0' },
    sourceNote: { fontSize: '11px', color: '#aaa', fontFamily: '"Inter", sans-serif', fontStyle: 'italic', marginTop: '6px' }
  };

  return (
    <div style={styles.page}>

      {/* NAV */}
      <nav style={styles.nav}>
        <button onClick={onBack} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '13px', fontWeight: '600', color: TEAL, fontFamily: '"Inter", sans-serif', padding: 0, display: 'flex', alignItems: 'center', gap: '6px' }}>← Back</button>
        <span style={{ color: '#e0e0e0' }}>|</span>
        <span style={{ fontSize: '13px', color: '#555', fontFamily: '"Inter", sans-serif' }}>Part I: What Is the Informal Economy?</span>
      </nav>

      {/* HERO */}
      <header style={styles.hero}>
        <div style={styles.heroAccent} />
        <div style={styles.container}>
          <div style={styles.heroLabel}>Part I · Vietnam Informal Economy</div>
          <h1 style={styles.heroTitle}>
            What does it mean to work outside the economy?
          </h1>
          <p style={styles.heroDeck}>
            In Vietnam, nearly two in three workers have no contract, no social insurance, and no legal protection. They are not counted in the tax base, not covered by labor law, and not visible to the state. This is the informal economy. It is not a marginal phenomenon. It is the economy.
          </p>
        </div>
      </header>

      {/* LEAD PHOTO */}
      <div style={{ background: '#111' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <PhotoBlock
            src="https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=1400&q=80"
            caption="Street vendors in Hội An navigate the line between earning a living and avoiding enforcement. Most have operated at the same spot for years, yet hold no license, pay no tax, and receive no social protection."
            credit="Unsplash"
            height="520px"
            position="center 55%"
          />
        </div>
      </div>

      {/* DEFINITION SECTION */}
      <div style={{ background: 'white' }}>
        <div style={styles.container}>
          <div style={styles.sectionDivider}>
            <FadeSection>
              <div style={styles.sectionLabel}>Definition</div>
              <div style={styles.twoCol}>
                <div>
                  <h2 style={styles.h2}>
                    Informal employment is a job characteristic, not just a sector.
                  </h2>
                  <div style={styles.defCard}>
                    <p style={{ fontSize: '17px', fontWeight: '600', color: '#1a1a1a', margin: '0 0 8px 0' }}>
                      An informally employed worker is one whose employment relationship is not legally recognized or protected.
                    </p>
                    <p style={{ fontSize: '14px', color: '#555', margin: 0, fontFamily: '"Inter", sans-serif', lineHeight: '1.6' }}>
                      This includes workers in unregistered businesses, but also workers employed by registered enterprises without a contract or social insurance. Informality describes the nature of the job, not just the type of employer.
                    </p>
                  </div>
                  <p style={styles.body}>
                    The ILO's definition, adopted by Vietnam in 2021, covers anyone whose employment relationship falls outside the protections of labor law or social insurance. This includes own-account workers, contributing family workers, employees without contracts, and workers in unregistered household enterprises.
                  </p>
                  <p style={styles.body}>
                    About 13% of workers at formally registered private enterprises remain informally employed — meaning they work for a legitimate company but with no contract or insurance. Informality is a job characteristic, not just a sector.
                  </p>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '40px', paddingTop: '48px' }}>
                  {/* CORRECTED: 68.5% from GSO/ILO 2021 */}
                  <PullQuote stat="68.5" unit="%" label="of Vietnamese workers are informally employed" note="GSO/ILO, 2021 (ILO-aligned methodology including agriculture)" />
                  <PullQuote stat="33.6" unit="M" label="informal workers nationwide" color="#f97316" note="GSO/ILO, 2021" />
                  {/* CORRECTED: 4% from ILO/VIDERI 2024, specific to HHB owners */}
                  <PullQuote stat="4" unit="%" label="of household business owners contribute to any social insurance" color="#dc2626" note="ILO/VIDERI Survey, 2024" />
                  <div style={{ marginTop: '8px' }}>
                    <button
                      onClick={() => onNavigate('maps')}
                      style={{ background: 'none', border: `1px solid ${TEAL}`, color: TEAL, padding: '8px 16px', fontSize: '12px', fontWeight: '600', cursor: 'pointer', fontFamily: '"Inter", sans-serif', letterSpacing: '0.3px' }}
                    >
                      → See provincial breakdown on the maps
                    </button>
                  </div>
                </div>
              </div>
            </FadeSection>
          </div>
        </div>
      </div>

      {/* FULL BLEED STAT BANNER */}
      <div style={{ background: '#1a1a1a', padding: '64px 40px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <FadeSection>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1px', background: '#333' }}>
              {[
                { stat: '97.9', unit: '%', label: 'of agricultural workers are informal', note: 'GSO/ILO, 2021' },
                { stat: '52', unit: '%', label: 'urban informality rate, vs 77.9% rural', note: 'GSO/ILO, 2021' },
                { stat: '11 to 13', unit: '%', label: 'estimated sidewalk economy share of GDP in major cities', note: 'Huynh, 2023' },
              ].map(({ stat, unit, label, note }) => (
                <div key={label} style={{ background: '#1a1a1a', padding: '40px 36px' }}>
                  <div style={{ fontSize: '48px', fontWeight: '800', color: TEAL, fontFamily: '"Inter", sans-serif', lineHeight: 1, marginBottom: '12px' }}>{stat}{unit}</div>
                  <div style={{ fontSize: '14px', color: 'rgba(255,255,255,0.75)', lineHeight: '1.5', fontFamily: '"Inter", sans-serif' }}>{label}</div>
                  <div style={{ fontSize: '11px', color: '#555', marginTop: '8px', fontFamily: '"Inter", sans-serif', fontStyle: 'italic' }}>{note}</div>
                </div>
              ))}
            </div>
          </FadeSection>
        </div>
      </div>

      {/* DOI MOI HISTORY SECTION */}
      <div style={{ background: 'white' }}>
        <div style={styles.container}>
          <div style={styles.sectionDivider}>
            <FadeSection>
              <div style={styles.sectionLabel}>Origins</div>
              <div style={styles.twoCol}>
                <div>
                  <h2 style={styles.h2}>
                    The informal economy did not emerge despite Vietnam's growth.
                    It emerged because of it.
                  </h2>
                  <p style={styles.body}>
                    Before 1986, Vietnam operated a fully centrally planned economy. The state assigned jobs, set prices, and controlled all production through agricultural cooperatives and state-owned enterprises. Petty trade was suppressed. Private markets were illegal.
                  </p>
                  <p style={styles.body}>
                    Then came Doi Moi ("Renovation") in 1986. Facing a near-collapsed economy, 700% inflation, and dependence on $4 million per day in Soviet aid, the Communist Party chose to open markets while retaining political control. Agricultural collectives were dismantled. Private ownership was permitted. Foreign investment was welcomed.
                  </p>
                  <p style={styles.body}>
                    The results were extraordinary: real per capita GDP grew nearly tenfold between 1990 and 2023, and Vietnam moved from one of the world's poorest countries to lower-middle income status. But this transformation produced a paradox. <strong>The same market liberalization that created growth also created informality.</strong> Millions of workers, newly free from state assignment, entered an economy whose formal institutions were not yet built to absorb them.
                  </p>
                  <p style={{ ...styles.bodySmall, color: '#777' }}>
                    Almost half of all rural-to-urban migrants end up in informal work. Young female migrants in particular flow into informal urban services: domestic work, street trading, garment factories without contracts. Geography, gender, and education largely determine who escapes.
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
                      title: 'Doi Moi: Renovation',
                      body: 'Market liberalization begins. Agricultural collectives dismantled. Household contract system introduced. Rural workers freed from tied labor, and from state protection.',
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
                      body: "Authorities ban street vending on 62 streets and 48 public spaces. Vendors, mostly female rural migrants, are driven from their livelihoods. The ban reveals the tension between 'civilized' urban development and survival economics. Research shows vendors simply relocated to avoid enforcement rather than entering the formal system.",
                      extra: (
                        <button
                          onClick={() => onNavigate('case-studies')}
                          style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '12px', fontWeight: '600', color: TEAL, fontFamily: '"Inter", sans-serif', padding: 0, textDecoration: 'underline' }}
                        >
                          → See how Chile and Korea handled formalization differently
                        </button>
                      )
                    },
                    {
                      year: '2021–present',
                      title: 'COVID and formalization pressure',
                      body: "The pandemic exposed the vulnerability of informal workers: no sick pay, no unemployment insurance, no state support. Vietnam accelerates formalization targets: 60% social insurance coverage by 2030 under Resolution 28.",
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

      {/* SECOND PHOTO */}
      <div style={{ background: '#111', padding: '0' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <PhotoBlock
            src="https://images.unsplash.com/photo-1559592413-7cbb5e31f4f0?w=1400&q=80"
            caption="Rice paddy agriculture remains one of the most informal sectors in Vietnam, with a 97.9% informality rate among agricultural workers. Most have no contract, no social insurance, and no safety net beyond the land itself."
            credit="Unsplash"
            height="440px"
            position="center 60%"
          />
        </div>
      </div>

      {/* WHO IS INFORMAL */}
      <div style={{ background: '#fafafa' }}>
        <div style={styles.container}>
          <div style={styles.sectionDivider}>
            <FadeSection>
              <div style={styles.sectionLabel}>Who is informal?</div>
              <h2 style={{ ...styles.h2, maxWidth: '700px' }}>
                Informality is not random. It follows the contours of geography, education, and gender.
              </h2>
            </FadeSection>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px', marginTop: '40px', alignItems: 'stretch' }}>
              {[
                {
                  title: 'Agricultural workers',
                  pct: '97.9%',
                  body: 'Nearly universal informality. Rice farming, coffee cultivation, aquaculture — all dominated by household production with no contracts and no social insurance. This is the single largest informal category in Vietnam.',
                  color: '#15803d'
                },
                {
                  title: 'Rural informal workers',
                  pct: '77.9%',
                  body: 'Out of every 100 rural workers, 78 are informal. Rural workers face a much lower probability of transitioning to formal employment in any given quarter compared to urban workers.',
                  color: '#1e40af'
                },
                {
                  title: 'Female workers',
                  pct: '~65%',
                  body: "Women's informality rate is slightly lower than men's overall, but women are disproportionately concentrated in the most vulnerable categories: domestic work, street vending, and garment production without contracts. More than 61% of female informal workers earn below the regional minimum wage.",
                  color: '#9333ea'
                },
                {
                  title: 'Urban informal workers',
                  pct: '52%',
                  body: 'Even in cities, over half of workers are informal. Construction workers, motorbike taxi drivers, street vendors, delivery workers. Urban informality is rising as migration outpaces formal job creation.',
                  color: '#c2410c'
                },
              ].map(({ title, pct, body, color }) => (
                <FadeSection key={title}>
                  <div style={{ background: 'white', border: '1px solid #e0e0e0', borderTop: `4px solid ${color}`, padding: '28px 32px', height: '100%', boxSizing: 'border-box' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                      <h3 style={{ fontSize: '17px', fontWeight: '700', color: '#1a1a1a', margin: 0, fontFamily: '"Inter", sans-serif' }}>{title}</h3>
                      <span style={{ fontSize: '28px', fontWeight: '700', color, fontFamily: '"Inter", sans-serif', lineHeight: 1 }}>{pct}</span>
                    </div>
                    <p style={{ fontSize: '14px', color: '#666', lineHeight: '1.7', margin: 0, fontFamily: '"Inter", sans-serif' }}>{body}</p>
                  </div>
                </FadeSection>
              ))}
            </div>

            <FadeSection>
              <div style={{ marginTop: '32px', padding: '24px 28px', background: '#f0fdf9', border: `1px solid #b2dfdb`, borderLeft: `4px solid ${TEAL}` }}>
                <p style={{ fontSize: '15px', color: '#1a1a1a', lineHeight: '1.7', margin: 0, fontFamily: '"Inter", sans-serif' }}>
                  <strong>Why these patterns persist:</strong> Formal employment is not always accessible. Social insurance contribution rates are high relative to informal incomes. Registration involves complex, fragmented bureaucracy. And the benefits of formalization — especially pensions decades away — are often not visible or credible to workers making short-term decisions. These are rational responses to a system not designed for them.
                </p>
              </div>
            </FadeSection>
          </div>
        </div>
      </div>

      {/* FISCAL STAKES CALLOUT */}
      <div style={{ background: 'white' }}>
        <div style={styles.container}>
          <div style={styles.sectionDivider}>
            <FadeSection>
              <div style={styles.sectionLabel}>The fiscal stakes</div>
              <div style={styles.twoCol}>
                <div>
                  <h2 style={styles.h2}>
                    Informality is not just a labor market problem. It is Vietnam's central fiscal constraint.
                  </h2>
                  <p style={styles.body}>
                    68.5% of workers contributing nothing to income tax or social insurance holds Vietnam's tax-to-GDP ratio at 16.8% (2023), well below the regional average of 19.5% and far below the 25%+ common among high-income OECD countries.
                  </p>
                  <p style={styles.body}>
                    This creates a compound problem: insufficient revenue constrains public investment in infrastructure and education; weak social insurance coverage reduces the incentive to formalize; and low formal wage premiums mean workers have little reason to seek out formal employment even when it exists.
                  </p>
                  <p style={styles.body}>
                    Vietnam has set a target of reaching high-income status by 2045. The required trajectory implies sustained GDP growth of 7–8% annually, which in turn requires public investment the current tax base cannot reliably support.
                  </p>
                  <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginTop: '24px' }}>
                    <button
                      onClick={() => onNavigate('vietnam2045')}
                      style={{ background: TEAL, color: 'white', border: 'none', padding: '10px 20px', fontSize: '13px', fontWeight: '700', cursor: 'pointer', fontFamily: '"Inter", sans-serif' }}
                    >
                      See Vietnam 2045 analysis →
                    </button>
                    <button
                      onClick={() => onNavigate('fiscal')}
                      style={{ background: 'none', border: `1px solid ${TEAL}`, color: TEAL, padding: '10px 20px', fontSize: '13px', fontWeight: '600', cursor: 'pointer', fontFamily: '"Inter", sans-serif' }}
                    >
                      Model the fiscal gap →
                    </button>
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', paddingTop: '16px' }}>
                  {[
                    { val: '16.8%', label: "Vietnam's tax-to-GDP ratio (2023)", sub: 'Below regional average of 19.5%', color: '#dc2626' },
                    { val: '60%', label: 'Target social insurance coverage by 2030', sub: 'Resolution 28-NQ/TW', color: TEAL },
                    { val: '$430B', label: "Vietnam's GDP (2023)", sub: 'World Bank current USD', color: '#1e40af' },
                  ].map(({ val, label, sub, color }) => (
                    <div key={val} style={{ borderLeft: `4px solid ${color}`, paddingLeft: '20px' }}>
                      <div style={{ fontSize: '32px', fontWeight: '400', color, lineHeight: 1, letterSpacing: '-1px', marginBottom: '6px' }}>{val}</div>
                      <div style={{ fontSize: '14px', color: '#333', marginBottom: '3px', fontFamily: '"Inter", sans-serif' }}>{label}</div>
                      <div style={{ fontSize: '11px', color: '#999', fontFamily: '"Inter", sans-serif', fontStyle: 'italic' }}>{sub}</div>
                    </div>
                  ))}
                </div>
              </div>
            </FadeSection>
          </div>
        </div>
      </div>

      {/* SOURCES */}
      <div style={{ background: '#fafafa' }}>
        <div style={styles.container}>
          <div style={styles.sectionDivider}>
            <FadeSection>
              <div style={styles.sectionLabel}>Sources for this section</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxWidth: '760px' }}>
                {[
                  'GSO/ILO. (2021). Overall Situation of Workers in Informal Employment in Viet Nam. General Statistics Office.',
                  'ILO. (2021). Informal Employment in Viet Nam: Trends and Determinants.',
                  'ILO/VIDERI. (2024). Expanding Social Insurance for Household Businesses in Viet Nam.',
                  'Turner, S. & Schoenberger, L. (2011). Street Vendor Livelihoods and Everyday Politics in Hanoi, Vietnam. Urban Studies, 49(5).',
                  'OECD. (2025). Revenue Statistics in Asia and the Pacific 2025: Viet Nam.',
                  'World Bank. (2024). Viet Nam 2045: Breaking Through. World Bank Group.',
                  'Huynh, T.N.Q. (2023). Street Vendors in Vietnam.',
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
      </div>

      {/* DATA NOTES */}
      <div style={{ background: 'white', borderTop: '1px solid #e0e0e0', padding: '32px 40px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ fontSize: '11px', fontWeight: '700', color: '#999', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '12px', fontFamily: '"Inter", sans-serif' }}>Data Notes</div>
          <p style={{ fontSize: '13px', color: '#888', lineHeight: '1.75', margin: 0, fontFamily: '"Inter", sans-serif', maxWidth: '860px' }}>
            The 68.5% informality rate and 33.6M worker count reflect the GSO/ILO 2021 report using the current ILO-aligned methodology, which includes agriculture and forestry workers. Prior to 2021, Vietnam published a narrower measure excluding these workers, which gave approximately 56%. The two figures are not directly comparable and should not be used in the same time series. The 97.9% agricultural informality rate and urban/rural breakdown (52%/77.9%) are from the same 2021 dataset. The 4% household business social insurance figure is from the ILO/VIDERI 2024 survey of 827 registered household businesses and refers specifically to that population, not the full informal workforce. The 16.8% tax-to-GDP figure is from OECD Revenue Statistics Asia-Pacific 2025 for the year 2023; this declined from 18.8% in 2022.
          </p>
        </div>
      </div>

      {/* FOOTER NAV */}
      <div style={{ background: 'white', borderTop: '1px solid #e0e0e0', padding: '24px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <button onClick={onBack} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '14px', fontWeight: '600', color: TEAL, fontFamily: '"Inter", sans-serif' }}>
          ← Back to Overview
        </button>
        <div style={{ fontSize: '12px', color: '#bbb', fontFamily: '"Inter", sans-serif' }}>
          ECON 62 · Topics in Macroeconomics · Winter 2026
        </div>
        <button
          onClick={() => onNavigate('maps')}
          style={{ background: TEAL, color: 'white', border: 'none', padding: '10px 22px', fontSize: '13px', fontWeight: '700', cursor: 'pointer', fontFamily: '"Inter", sans-serif', letterSpacing: '0.3px' }}
        >
          Part II: Interactive Maps →
        </button>
      </div>

    </div>
  );
}
