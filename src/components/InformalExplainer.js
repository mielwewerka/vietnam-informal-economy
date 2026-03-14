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
      <div style={{ fontSize: '15px', color: '#555', marginTop: '8px', lineHeight: '1.5', maxWidth: '220px' }}>{label}</div>
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
        <div style={{ fontSize: '15px', color: '#555', lineHeight: '1.75' }}>{body}</div>
        {extra && <div style={{ marginTop: '8px' }}>{extra}</div>}
      </div>
    </div>
  );
}

export default function InformalExplainer({ onBack, onNavigate }) {

  const sectionLabel = { fontSize: '11px', fontWeight: '700', color: TEAL, letterSpacing: '2.5px', textTransform: 'uppercase', marginBottom: '16px', fontFamily: '"Inter", sans-serif' };
  const h2 = { fontSize: 'clamp(26px, 3vw, 40px)', fontWeight: '400', lineHeight: '1.2', margin: '0 0 28px 0', letterSpacing: '-0.5px', color: '#1a1a1a' };
  const body = { fontSize: '18px', lineHeight: '1.9', color: '#333', margin: '0 0 22px 0' };
  const bodySmall = { fontSize: '16px', lineHeight: '1.8', color: '#666', margin: '0 0 18px 0', fontStyle: 'italic' };

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
          <p style={{ fontSize: 'clamp(16px, 1.6vw, 20px)', color: 'rgba(255,255,255,0.65)', lineHeight: '1.65', margin: '0 0 52px 0', maxWidth: '520px', fontFamily: '"Inter", sans-serif', fontStyle: 'italic' }}>
            68.5% of Vietnam's workers operate without a contract, without social insurance,
            and without legal protection. This is the informal economy.
          </p>

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

        {/* Caption strip at bottom of hero */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'rgba(13,13,13,0.85)', borderTop: '1px solid rgba(255,255,255,0.07)', padding: '12px 56px 52px', zIndex: 2 }}>
          <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)', fontFamily: '"Inter", sans-serif', fontStyle: 'italic', margin: 0, lineHeight: '1.5' }}>
            Street vendors in Hoi An navigate the line between earning a living and avoiding enforcement. Most have operated at the same spot for years, yet hold no license, pay no tax, and receive no social protection.
            <span style={{ color: 'rgba(255,255,255,0.15)' }}> · Unsplash</span>
          </p>
        </div>

        {/* Scroll indicator — sits above the caption strip */}
        <div style={{ position: 'absolute', bottom: '64px', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', zIndex: 3 }}>
          <span style={{ fontSize: '9px', fontWeight: '700', color: 'rgba(255,255,255,0.2)', letterSpacing: '2.5px', textTransform: 'uppercase', fontFamily: '"Inter", sans-serif' }}>Scroll</span>
          <div style={{ animation: 'bounceIE 1.8s infinite' }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2.5 5.5l5.5 5.5 5.5-5.5" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </div>
        </div>
        <style>{`@keyframes bounceIE{0%,100%{transform:translateY(0)}50%{transform:translateY(4px)}}`}</style>
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
                  The informal economy is not a place. It is a condition. Think of the woman who has sold coffee from the same corner for twelve years, rain and dry season, recognizing her regulars, remembered by them — and who has no employment contract, no pension accumulating, no sick pay if she falls ill, no legal standing if the city decides to clear her block. She is not poor because she is lazy or uninformed. She is unprotected because the system was not designed to reach her.
                </p>
                <p style={body}>
                  According to the International Labour Organization, informal employment encompasses all work arrangements that provide no legal or social protection: no employment contract, no social insurance, no occupational health coverage. In Vietnam, the GSO operationalizes this through a key criterion: if a worker is not covered by compulsory social insurance, they are informal. This captures agricultural day laborers, street vendors, construction workers paid in cash, domestic workers, and the vast majority of workers in small family businesses.
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
                <p style={{ fontSize: '13px', color: '#888', fontFamily: '"Inter", sans-serif', lineHeight: '1.6', margin: 0, fontStyle: 'italic' }}>
                  These numbers vary sharply by province.{' '}
                  <button onClick={() => onNavigate('maps')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: TEAL, fontFamily: '"Inter", sans-serif', fontSize: '13px', padding: 0, textDecoration: 'underline', fontStyle: 'normal', fontWeight: '600' }}>
                    See the provincial breakdown on the interactive maps.
                  </button>
                </p>
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
            <h2 style={{ ...h2, maxWidth: '700px' }}>
              "Informal" is not one thing. It covers three structurally different situations, and each requires different policy.
            </h2>
            <p style={{ ...body, color: '#555', maxWidth: '700px' }}>
              The street vendor and the contract-free factory worker are both "informal" under ILO definitions — but the interventions that might reach them are entirely different. Understanding which type of informality you are looking at determines which policy you design.
            </p>
          </FadeSection>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0', marginTop: '48px' }}>
            {[
              {
                num: '01',
                accent: TEAL,
                title: 'The General Informal Sector',
                stat: '~49%',
                statContext: 'of total employment',
                body: 'Workers in unregistered household businesses: street vendors, market traders, small-scale agriculture, roadside repair shops. These enterprises operate entirely outside the formal business registry. They generate real income and real output. They contribute nothing to the tax base, and receive nothing from the social protection system. The woman selling bun bo Hue from a cart she has pushed to the same corner for fifteen years is in this category. So is the family that harvests rice on land they own but never registered. The 2008 Hanoi street vendor ban was aimed at this group. It drove them to adjacent streets rather than into the formal economy.',
                note: 'Source: ILO, Informal Employment in Viet Nam, 2021',
                img: 'https://raw.githubusercontent.com/mielwewerka/vietnam-informal-economy/refs/heads/main/stool.avif',
                imgAlt: 'Informal sector — street vendors and unregistered household businesses',
              },
              {
                num: '02',
                accent: '#f97316',
                title: 'Informal Employment in Formal Firms',
                stat: '~13%',
                statContext: 'of workers at registered enterprises',
                body: 'Workers employed by registered, taxpaying enterprises — but without a formal employment contract, without social insurance enrollment, or both. This is the most policy-relevant category, because these workers are already inside the formal economy in one sense: they work for a legitimate company. They have been excluded from protections by cost or administrative complexity rather than structural barriers. It includes garment factory piece workers paid per completed unit with no contract, construction subcontractors hired through brokers, and domestic workers employed by households that are formally registered as businesses. The formal sector is larger than it looks. The informal workforce inside it is too.',
                note: 'Source: ILO, Informal Employment in Viet Nam, 2021',
                img: 'https://raw.githubusercontent.com/mielwewerka/vietnam-informal-economy/refs/heads/main/jit.avif,
                imgAlt: 'Informal employment in formal firms — factory and construction workers',
              },
              {
                num: '03',
                accent: '#7c3aed',
                title: 'Own-Account and Agricultural Workers',
                stat: '97.9%',
                statContext: 'of agricultural workers are informal',
                body: 'Self-employed individuals and contributing family members, predominantly in rice and coffee agriculture. This category has near-universal informality not because of enforcement failure, but because the nature of the work is structurally incompatible with conventional social insurance. Smallholder subsistence farming does not produce a wage. Family fishing operations do not generate payroll records. There is no employer to deduct contributions from. These workers will formalize when structural economic transformation moves them into manufacturing and services — not because a government campaign tells them to register. Policy cannot compel it. This is the category that makes Vietnam\'s aggregate informality rate so high, and it is also the category where registration campaigns are least effective.',
                note: 'Source: GSO/ILO, 2021',
                img: 'https://raw.githubusercontent.com/mielwewerka/vietnam-informal-economy/refs/heads/main/ag1.avif,
                imgAlt: 'Agricultural workers — rice paddies and smallholder farming',
              },
            ].map(({ num, accent, title, stat, statContext, body: typeBody, note, img, imgAlt }, i) => (
              <FadeSection key={num} delay={i * 0.08}>
                <div style={{ display: 'grid', gridTemplateColumns: '80px 1fr 320px', gap: '40px', padding: '48px 0', borderTop: '1px solid #e8e4e0', alignItems: 'start' }}>
                  {/* Number + stat column */}
                  <div style={{ paddingTop: '4px' }}>
                    <div style={{ fontSize: '11px', fontWeight: '700', color: accent, fontFamily: '"Inter", sans-serif', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '20px' }}>TYPE {num}</div>
                    <div style={{ fontSize: 'clamp(28px, 3vw, 38px)', fontWeight: '300', color: accent, lineHeight: 1, letterSpacing: '-1px', marginBottom: '6px' }}>{stat}</div>
                    <div style={{ fontSize: '12px', color: '#999', fontFamily: '"Inter", sans-serif', lineHeight: '1.4' }}>{statContext}</div>
                  </div>
                  {/* Text column */}
                  <div>
                    <h3 style={{ fontSize: 'clamp(20px, 2.2vw, 26px)', fontWeight: '400', color: '#1a1a1a', margin: '0 0 20px 0', letterSpacing: '-0.3px', lineHeight: '1.2', borderLeft: `3px solid ${accent}`, paddingLeft: '18px' }}>{title}</h3>
                    <p style={{ ...body, maxWidth: '580px' }}>{typeBody}</p>
                    <div style={{ fontSize: '12px', color: '#bbb', fontFamily: '"Inter", sans-serif', fontStyle: 'italic' }}>{note}</div>
                  </div>
                  {/* Image column — equal size for all three */}
                  <div style={{ position: 'sticky', top: '80px' }}>
                    <div style={{
                      width: '100%',
                      height: '260px',
                      backgroundImage: img !== 'IMAGE_01_URL' && img !== 'IMAGE_02_URL' && img !== 'IMAGE_03_URL' ? `url(${img})` : 'none',
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      backgroundColor: '#e8e4e0',
                      borderTop: `3px solid ${accent}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                      {(img === 'IMAGE_01_URL' || img === 'IMAGE_02_URL' || img === 'IMAGE_03_URL') && (
                        <span style={{ fontSize: '11px', color: '#bbb', fontFamily: '"Inter", sans-serif', fontStyle: 'italic' }}>Image pending</span>
                      )}
                    </div>
                    <div style={{ fontSize: '11px', color: '#aaa', fontFamily: '"Inter", sans-serif', fontStyle: 'italic', marginTop: '8px', lineHeight: '1.5' }}>{imgAlt}</div>
                  </div>
                </div>
              </FadeSection>
            ))}
            {/* Closing border */}
            <div style={{ borderTop: '1px solid #e8e4e0' }} />
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
            src="https://raw.githubusercontent.com/mielwewerka/vietnam-informal-economy/refs/heads/main/paddypeeps.avif"
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
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '72px', alignItems: 'start' }}>
              <div>
                <div style={sectionLabel}>Who Is Informal?</div>
                <h2 style={h2}>
                  Informality is not random. It follows the contours of geography, education, and gender.
                </h2>
                <p style={body}>
                  If you ask who the informal economy contains, the answer is: almost everyone outside a city, almost every farmer, and a disproportionate share of women. The pattern is not accidental. It reflects who has access to the formal economy and who does not.
                </p>
                <p style={body}>
                  <strong>Agricultural workers</strong> are informal at a rate of 97.9% — near-universal. Rice farming, coffee cultivation, and aquaculture are dominated by household production with no contracts, no payroll, and no social insurance. This is the single largest informal category in Vietnam by volume.
                </p>
                <p style={body}>
                  <strong>Rural workers overall</strong> are informal at 77.9%. Out of every 100 rural workers, 78 have no formal employment protection. The gap between rural and urban formality is not explained by income alone. It is explained by what kinds of employers exist, what kinds of jobs are available, and how far registration offices are from where people live and work.
                </p>
                <p style={body}>
                  <strong>Women</strong> face a slightly lower aggregate informality rate than men, but that aggregate hides a starker picture. Women are disproportionately concentrated in the most vulnerable informal categories: domestic work in private households, street vending subject to periodic bans, and garment factory piece work without contracts. More than 61% of female informal workers earn below the regional minimum wage. For many, informality is not a choice between formal and informal employment. It is a choice between this work and no work.
                </p>
                <p style={body}>
                  Even <strong>urban workers</strong> are informal at 52%. Construction workers, motorbike taxi drivers, delivery workers, street vendors. Urban informality is rising as migration consistently outpaces the rate of formal job creation. The city draws workers in. The formal economy does not always follow.
                </p>
              </div>

              {/* Stat column */}
              <div style={{ paddingTop: '56px', display: 'flex', flexDirection: 'column', gap: '40px' }}>
                <PullQuote stat="97.9" unit="%" label="of agricultural workers — the largest informal category" color="#15803d" note="GSO/ILO, 2021" />
                <PullQuote stat="77.9" unit="%" label="of rural workers are informally employed" color="#1e40af" note="GSO/ILO, 2021" />
                <PullQuote stat="61" unit="%" label="of female informal workers earn below the regional minimum wage" color="#9333ea" note="GSO/ILO, 2021" />
                <PullQuote stat="52" unit="%" label="urban informality rate, rising as migration outpaces formal job creation" color="#c2410c" note="GSO/ILO, 2021" />
                <div style={{ fontSize: '12px', color: '#bbb', fontFamily: '"Inter", sans-serif', fontStyle: 'italic', lineHeight: '1.6', paddingTop: '8px', borderTop: '1px solid #e8e4e0' }}>
                  Sources: ILO, Informal Employment in Viet Nam, 2021; GSO Labor Force Survey 2023
                </div>
              </div>
            </div>

            {/* Rational choice callout */}
            <div style={{ marginTop: '56px', background: '#1a1a1a', padding: '40px 48px', borderLeft: `4px solid ${TEAL_BRIGHT}` }}>
              <div style={{ fontSize: '11px', fontWeight: '700', color: TEAL_BRIGHT, fontFamily: '"Inter", sans-serif', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '16px' }}>The Key Insight</div>
              <p style={{ fontSize: '19px', color: 'white', lineHeight: '1.6', margin: '0 0 16px 0', letterSpacing: '-0.2px' }}>
                Informal workers are not failing to understand the system. They are navigating it rationally, responding correctly to the incentives they face.
              </p>
              <p style={{ fontSize: '17px', color: 'rgba(255,255,255,0.6)', lineHeight: '1.85', margin: 0 }}>
                When social insurance contributions total 25 to 28% of wages, when the benefits are opaque and arrive decades from now, when registration requires navigating three separate government databases — the informal economy is not a failure of willpower or awareness. It is a rational response to a system that was not designed for the workers it is supposed to protect.
              </p>
            </div>
          </FadeSection>
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
                  src="https://raw.githubusercontent.com/mielwewerka/vietnam-informal-economy/refs/heads/main/pole.avif"
                  caption="A street food vendor. The shoulder pole remains the entry-level capital investment for millions of informal traders."
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
            <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.72)', lineHeight: '1.9', margin: '0 0 22px 0' }}>
              Vietnam's 2045 goal, high-income status by the centennial of the Socialist Republic, requires sustained growth, expanding public investment, and a strong social insurance system. All three depend on a formal economy that currently represents less than a third of the workforce.
            </p>
            <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.72)', lineHeight: '1.9', margin: 0 }}>
              Informal workers pay no income tax or social insurance contributions. Their employers, if they have them, often avoid payroll taxes. With a tax-to-GDP ratio of 16.8% in 2023 (OECD Revenue Statistics Asia-Pacific 2025), Vietnam cannot fund the public investment in infrastructure, education, and social protection that high-income status requires. The fiscal gap is structural.{' '}
              <button onClick={() => onNavigate('vietnam2045')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: TEAL_BRIGHT, fontFamily: '"Inter", sans-serif', fontSize: '17px', padding: 0, textDecoration: 'underline', textDecorationColor: 'rgba(77,208,196,0.4)' }}>
                See how this shapes Vietnam's 2045 ambition
              </button>
              {', or '}
              <button onClick={() => onNavigate('fiscal')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: TEAL_BRIGHT, fontFamily: '"Inter", sans-serif', fontSize: '17px', padding: 0, textDecoration: 'underline', textDecorationColor: 'rgba(77,208,196,0.4)' }}>
                model the revenue implications
              </button>
              {' directly.'}
            </p>
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
