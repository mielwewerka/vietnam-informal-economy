// ========================================
// PART I — WHAT IS THE INFORMAL ECONOMY?
// Dark editorial theme. Reuters/NYT-inspired.
// Story-driven. Three sector breakdowns.
// ========================================

import React, { useState, useEffect, useRef } from 'react';

const TEAL = '#00897b';
const TEAL_BRIGHT = '#4dd0c4';

function useInView(threshold = 0.1) {
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

function Fade({ children, delay = 0, up = true }) {
  const [ref, visible] = useInView();
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? 'none' : up ? 'translateY(28px)' : 'translateX(-16px)',
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

function TimelineItem({ year, title, body, isLast, extra }) {
  const [ref, visible] = useInView(0.15);
  return (
    <div ref={ref} style={{ display: 'flex', gap: '20px', opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateX(-12px)', transition: 'all 0.55s ease' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0, width: '36px' }}>
        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: TEAL_BRIGHT, flexShrink: 0, marginTop: '6px', boxShadow: `0 0 0 3px rgba(77,208,196,0.15)` }} />
        {!isLast && <div style={{ width: '1px', flex: 1, background: 'rgba(255,255,255,0.1)', marginTop: '6px' }} />}
      </div>
      <div style={{ paddingBottom: isLast ? 0 : '28px' }}>
        <div style={{ fontSize: '10px', fontWeight: '700', color: TEAL_BRIGHT, letterSpacing: '1.5px', marginBottom: '4px', fontFamily: '"Inter", sans-serif', textTransform: 'uppercase' }}>{year}</div>
        <div style={{ fontSize: '15px', fontWeight: '600', color: 'rgba(255,255,255,0.9)', marginBottom: '6px', lineHeight: '1.3' }}>{title}</div>
        <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.45)', lineHeight: '1.7', fontFamily: '"Inter", sans-serif' }}>{body}</div>
        {extra && <div style={{ marginTop: '8px' }}>{extra}</div>}
      </div>
    </div>
  );
}

// Full-bleed photo with caption
function PhotoDivider({ src, caption, height = '460px', position = 'center', overlay = 'rgba(0,0,0,0.35)' }) {
  return (
    <div style={{ position: 'relative', height, overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, backgroundImage: `url(${src})`, backgroundSize: 'cover', backgroundPosition: position }} />
      <div style={{ position: 'absolute', inset: 0, background: overlay }} />
      {caption && (
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '12px 48px', background: 'linear-gradient(transparent, rgba(0,0,0,0.6))' }}>
          <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', margin: 0, fontFamily: '"Inter", sans-serif', fontStyle: 'italic' }}>{caption}</p>
        </div>
      )}
    </div>
  );
}

// Sector card with photo
function SectorCard({ number, title, pct, pctLabel, body, photo, photoPosition = 'center', accent }) {
  const [ref, visible] = useInView(0.1);
  return (
    <div ref={ref} style={{ opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(24px)', transition: 'opacity 0.7s ease, transform 0.7s ease', background: '#111', borderTop: `3px solid ${accent}`, overflow: 'hidden' }}>
      {/* Photo header */}
      <div style={{ height: '200px', backgroundImage: `url(${photo})`, backgroundSize: 'cover', backgroundPosition: photoPosition, position: 'relative' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(17,17,17,0.9) 0%, rgba(17,17,17,0.1) 60%)' }} />
        <div style={{ position: 'absolute', bottom: '14px', left: '20px' }}>
          <div style={{ fontSize: '11px', fontWeight: '700', color: accent, letterSpacing: '2px', textTransform: 'uppercase', fontFamily: '"Inter", sans-serif', marginBottom: '4px' }}>Type {number}</div>
          <div style={{ fontSize: '22px', fontWeight: '300', color: 'white', letterSpacing: '-0.3px', fontFamily: '"Cormorant Garamond", serif', lineHeight: 1.1 }}>{title}</div>
        </div>
      </div>
      {/* Content */}
      <div style={{ padding: '20px 24px 24px' }}>
        <div style={{ marginBottom: '14px' }}>
          <span style={{ fontSize: '32px', fontWeight: '300', color: accent, fontFamily: '"Georgia", serif', letterSpacing: '-1px', lineHeight: 1 }}>{pct}</span>
          <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', fontFamily: '"Inter", sans-serif', marginLeft: '8px' }}>{pctLabel}</span>
        </div>
        <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.55)', lineHeight: '1.75', margin: 0, fontFamily: '"Inter", sans-serif' }}>{body}</p>
      </div>
    </div>
  );
}

export default function InformalExplainer({ onBack, onNavigate }) {
  return (
    <div style={{ fontFamily: '"Georgia", "Times New Roman", serif', background: '#0d0d0d', color: 'white', minHeight: '100vh' }}>

      {/* ── STICKY NAV ── */}
      <nav style={{ background: 'rgba(13,13,13,0.95)', borderBottom: '1px solid rgba(255,255,255,0.07)', padding: '13px 48px', display: 'flex', alignItems: 'center', gap: '16px', position: 'sticky', top: 0, zIndex: 100, backdropFilter: 'blur(8px)' }}>
        <button onClick={onBack} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '13px', fontWeight: '600', color: TEAL_BRIGHT, fontFamily: '"Inter", sans-serif', padding: 0 }}>← Back</button>
        <span style={{ color: 'rgba(255,255,255,0.15)' }}>|</span>
        <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', fontFamily: '"Inter", sans-serif' }}>Part I — What Is the Informal Economy?</span>
      </nav>

      {/* ── HERO — full-bleed ── */}
      <div style={{ position: 'relative', height: '92vh', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=1600&q=80)', backgroundSize: 'cover', backgroundPosition: 'center 45%' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(13,13,13,1) 0%, rgba(13,13,13,0.6) 40%, rgba(13,13,13,0.2) 100%)' }} />
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: `linear-gradient(90deg, ${TEAL}, transparent)` }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '0 56px 60px' }}>
          <div style={{ fontSize: '10px', fontWeight: '700', color: TEAL_BRIGHT, letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '20px', fontFamily: '"Inter", sans-serif' }}>
            Part I · Vietnam Informal Economy
          </div>
          <h1 style={{ fontSize: 'clamp(44px, 6vw, 80px)', fontWeight: '400', lineHeight: '1.0', margin: '0 0 20px 0', letterSpacing: '-2px', maxWidth: '800px' }}>
            What does it mean<br />to work outside<br />the economy?
          </h1>
          <p style={{ fontSize: 'clamp(16px, 1.6vw, 20px)', color: 'rgba(255,255,255,0.65)', lineHeight: '1.65', margin: '0 0 36px 0', maxWidth: '540px', fontFamily: '"Inter", sans-serif', fontStyle: 'italic', fontWeight: '400' }}>
            68.5% of Vietnam's workers — 33.6 million people — operate without a contract,
            without social insurance, and without legal protection. This is the informal economy.
          </p>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <button onClick={() => onNavigate('maps')} style={{ background: TEAL_BRIGHT, color: '#0d0d0d', border: 'none', padding: '11px 24px', fontSize: '12px', fontWeight: '700', cursor: 'pointer', fontFamily: '"Inter", sans-serif', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              See it on the map →
            </button>
            <button onClick={() => onNavigate('fiscal')} style={{ background: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.8)', border: '1px solid rgba(255,255,255,0.25)', padding: '10px 22px', fontSize: '12px', fontWeight: '600', cursor: 'pointer', fontFamily: '"Inter", sans-serif', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Model the fiscal gap
            </button>
          </div>
        </div>
      </div>

      {/* ── STAT BANNER ── */}
      <div style={{ background: '#111', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1px', background: 'rgba(255,255,255,0.05)' }}>
          {[
            { stat: '68.5', unit: '%', label: 'of workers informally employed', sub: 'GSO/ILO, 2021' },
            { stat: '33.6', unit: 'M', label: 'informal workers nationwide', sub: 'GSO/ILO, 2021' },
            { stat: '97.9', unit: '%', label: 'of agricultural workers informal', sub: 'GSO/ILO, 2021' },
            { stat: '4', unit: '%', label: 'of HHB owners have social insurance', sub: 'ILO/VIDERI, 2024' },
          ].map(({ stat, unit, label, sub }) => (
            <div key={label} style={{ background: '#0d0d0d', padding: '28px 32px' }}>
              <div style={{ fontSize: 'clamp(32px, 3.5vw, 48px)', fontWeight: '300', color: TEAL_BRIGHT, lineHeight: 1, marginBottom: '10px', letterSpacing: '-1px', fontFamily: '"Georgia", serif' }}>
                <AnimatedStat value={stat} suffix={unit} />
              </div>
              <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.65)', lineHeight: '1.4', fontFamily: '"Inter", sans-serif', marginBottom: '4px' }}>{label}</div>
              <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.22)', fontFamily: '"Inter", sans-serif', fontStyle: 'italic' }}>{sub}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── DEFINITION ── */}
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '80px 56px' }}>
        <Fade>
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '72px', alignItems: 'start' }}>
            <div>
              <div style={{ fontSize: '10px', fontWeight: '700', color: TEAL_BRIGHT, letterSpacing: '2.5px', textTransform: 'uppercase', marginBottom: '16px', fontFamily: '"Inter", sans-serif' }}>The Definition</div>
              <h2 style={{ fontSize: 'clamp(26px, 3vw, 40px)', fontWeight: '400', lineHeight: '1.15', margin: '0 0 28px 0', letterSpacing: '-0.8px', color: 'white' }}>
                Informal employment is a job characteristic — not just a type of business.
              </h2>
              <div style={{ borderLeft: `3px solid ${TEAL}`, paddingLeft: '20px', marginBottom: '28px', background: 'rgba(0,137,123,0.06)', padding: '20px 24px', borderTop: '1px solid rgba(0,137,123,0.15)', borderRight: '1px solid rgba(0,137,123,0.1)', borderBottom: '1px solid rgba(0,137,123,0.1)' }}>
                <p style={{ fontSize: '16px', fontWeight: '600', color: 'rgba(255,255,255,0.9)', margin: '0 0 10px 0', lineHeight: '1.45' }}>
                  An informally employed worker is one whose employment relationship is not legally recognized or protected.
                </p>
                <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', margin: 0, fontFamily: '"Inter", sans-serif', lineHeight: '1.65' }}>
                  This includes workers at unregistered businesses — but also workers at <em>registered</em> enterprises who have no contract, no social insurance, and no labor law protections.
                </p>
              </div>
              <p style={{ fontSize: '16px', lineHeight: '1.85', color: 'rgba(255,255,255,0.65)', margin: '0 0 16px 0', fontFamily: '"Inter", sans-serif' }}>
                The ILO's definition, adopted by Vietnam in 2021, covers own-account workers, contributing family workers, employees without contracts, and workers in unregistered household enterprises.
              </p>
              <p style={{ fontSize: '16px', lineHeight: '1.85', color: 'rgba(255,255,255,0.65)', margin: 0, fontFamily: '"Inter", sans-serif' }}>
                Even workers at formally registered companies can be informally employed — approximately 13% of employees at registered private enterprises work without a contract or insurance. The gig economy is the clearest modern example: a Grab driver works for a registered platform but has no sick pay, no pension, no unemployment insurance. Under ILO definitions, they are informally employed.
              </p>
            </div>
            {/* What it means in practice */}
            <div style={{ paddingTop: '56px', display: 'flex', flexDirection: 'column', gap: '0' }}>
              <div style={{ fontSize: '10px', fontWeight: '700', color: 'rgba(255,255,255,0.3)', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '16px', fontFamily: '"Inter", sans-serif' }}>What it means in practice</div>
              {[
                { yes: false, label: 'Written employment contract', detail: 'No proof of employment, no recourse if dismissed' },
                { yes: false, label: 'Social insurance contributions', detail: 'No pension, no maternity leave, no sick pay accumulating' },
                { yes: false, label: 'Unemployment protection', detail: 'Loss of work means loss of income, immediately' },
                { yes: false, label: 'Visibility to the tax authority', detail: 'Income earned, taxes uncollected' },
                { yes: true, label: 'Daily income', detail: 'Earnings are real — sometimes more flexible than formal work' },
                { yes: true, label: 'Contribution to GDP', detail: "Informal output is economically real, just unmeasured and untaxed" },
              ].map(({ yes, label, detail }) => (
                <div key={label} style={{ display: 'flex', alignItems: 'flex-start', gap: '14px', padding: '14px 0', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                  <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: yes ? 'rgba(0,137,123,0.2)' : 'rgba(220,38,38,0.15)', border: `1px solid ${yes ? 'rgba(77,208,196,0.4)' : 'rgba(220,38,38,0.3)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', color: yes ? TEAL_BRIGHT : '#dc2626', flexShrink: 0, marginTop: '1px', fontFamily: '"Inter", sans-serif', fontWeight: '700' }}>
                    {yes ? '✓' : '✗'}
                  </div>
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: '600', color: yes ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.6)', fontFamily: '"Inter", sans-serif', marginBottom: '2px' }}>{label}</div>
                    <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)', fontFamily: '"Inter", sans-serif', lineHeight: '1.4' }}>{detail}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Fade>
      </div>

      {/* ── THREE SECTOR TYPES ── */}
      <div style={{ background: '#0a0a0a', borderTop: '1px solid rgba(255,255,255,0.06)', padding: '72px 56px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <Fade>
            <div style={{ marginBottom: '40px' }}>
              <div style={{ fontSize: '10px', fontWeight: '700', color: TEAL_BRIGHT, letterSpacing: '2.5px', textTransform: 'uppercase', marginBottom: '14px', fontFamily: '"Inter", sans-serif' }}>Three Types of Informal Employment</div>
              <h2 style={{ fontSize: 'clamp(24px, 2.8vw, 38px)', fontWeight: '400', lineHeight: '1.2', margin: '0 0 14px 0', letterSpacing: '-0.8px', maxWidth: '680px' }}>
                "Informal" is not one thing. It covers three structurally different situations — and each requires different policy.
              </h2>
              <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.45)', lineHeight: '1.7', margin: 0, fontFamily: '"Inter", sans-serif', maxWidth: '620px' }}>
                Understanding this distinction matters enormously for policy. The street vendor and the contract-free factory worker are both "informal" under ILO definitions, but the interventions that might reach them are entirely different.
              </p>
            </div>
          </Fade>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2px' }}>
            <SectorCard
              number="01"
              title="The Informal Sector"
              pct="~49%"
              pctLabel="of total employment"
              accent={TEAL_BRIGHT}
              photo="https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=800&q=80"
              photoPosition="center 30%"
              body="Workers in unregistered household businesses: street vendors, market traders, small-scale agriculture, roadside repair shops. These enterprises operate entirely outside the formal business registry. They generate real income and real output — but contribute nothing to the tax base and receive nothing from the social protection system. The 2008 Hanoi street vendor ban was aimed at this category."
            />
            <SectorCard
              number="02"
              title="Informal Employment in Formal Firms"
              pct="~13%"
              pctLabel="of registered-firm employees"
              accent="#f97316"
              photo="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80"
              photoPosition="center 40%"
              body="Workers employed by registered, taxpaying enterprises — but without a formal employment contract, without social insurance enrollment, or both. This is the most policy-relevant category because these workers are in reach of the formal system but have been excluded by cost or complexity. It includes garment factory piece workers, construction subcontractors, and domestic workers employed by formal households."
            />
            <SectorCard
              number="03"
              title="Own-Account & Agricultural Workers"
              pct="97.9%"
              pctLabel="of agricultural workers informal"
              accent="#7c3aed"
              photo="https://images.unsplash.com/photo-1559592413-7cbb5e31f4f0?w=800&q=80"
              photoPosition="center 50%"
              body="Self-employed individuals and contributing family workers, predominantly in rice and coffee agriculture. This category has near-universal informality because the nature of the work — smallholder subsistence farming, family fishing operations — is incompatible with conventional social insurance structures. These workers will formalize when structural transformation moves them out of agriculture. Policy cannot compel it."
            />
          </div>
        </div>
      </div>

      {/* ── PHOTO DIVIDER — rice ── */}
      <PhotoDivider
        src="https://images.unsplash.com/photo-1559592413-7cbb5e31f4f0?w=1600&q=80"
        caption="Northern Vietnam rice paddy. Agricultural informality is near-universal — 97.9% — and structural. It will not be resolved by registration campaigns. Source: GSO/ILO 2021."
        height="420px"
        position="center 55%"
        overlay="linear-gradient(to top, rgba(13,13,13,0.8) 0%, rgba(13,13,13,0.2) 60%)"
      />

      {/* ── HOW VIETNAM GOT HERE ── */}
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '80px 56px' }}>
        <Fade>
          <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: '72px', alignItems: 'start' }}>
            <div>
              <div style={{ fontSize: '10px', fontWeight: '700', color: TEAL_BRIGHT, letterSpacing: '2.5px', textTransform: 'uppercase', marginBottom: '16px', fontFamily: '"Inter", sans-serif' }}>Origins</div>
              <h2 style={{ fontSize: 'clamp(24px, 2.8vw, 38px)', fontWeight: '400', lineHeight: '1.15', margin: '0 0 24px 0', letterSpacing: '-0.8px' }}>
                Vietnam's informal economy wasn't a failure of development. It was produced by it.
              </h2>
              <p style={{ fontSize: '16px', lineHeight: '1.85', color: 'rgba(255,255,255,0.62)', margin: '0 0 18px 0', fontFamily: '"Inter", sans-serif' }}>
                Before 1986, Vietnam was a centrally planned economy. Jobs were state-assigned. Prices were state-set. Petty trade was suppressed. <strong style={{ color: 'white' }}>Then came Doi Moi</strong> — "Renovation" — the 1986 decision to open markets while retaining political control.
              </p>
              <p style={{ fontSize: '16px', lineHeight: '1.85', color: 'rgba(255,255,255,0.62)', margin: '0 0 18px 0', fontFamily: '"Inter", sans-serif' }}>
                Real per capita GDP grew nearly tenfold between 1990 and 2023. Poverty fell from 58% to under 5%. By any measure, Doi Moi worked. But formal institutions for social protection, taxation, and labor registration weren't built at the same pace as market liberalization — and the informal economy rushed in to fill the gap.
              </p>
              <p style={{ fontSize: '16px', lineHeight: '1.85', color: 'rgba(255,255,255,0.62)', margin: 0, fontFamily: '"Inter", sans-serif' }}>
                Almost half of all rural-to-urban migrants end up in informal work. Young women in particular flow into domestic work, street trading, and garment factories without contracts. Geography, gender, and education largely determine who escapes.
              </p>
            </div>
            {/* Timeline */}
            <div>
              {[
                { year: 'Pre-1986', title: 'Centrally planned economy', body: 'State-assigned jobs. Petty trade illegal. Poverty endemic, but informality in the modern sense didn\'t exist — just state-controlled scarcity.' },
                { year: '1986', title: 'Doi Moi begins', body: 'Agricultural collectives dismantled. Household contract system introduced. Millions of workers freed from state assignment — and from state protection.' },
                { year: '1988–95', title: 'Land reform and migration', body: 'Land use rights granted to households. Rural labor surplus builds. Mass migration to cities begins. Street vending becomes the first rung of the economic ladder.' },
                { year: '1990s–2000s', title: 'The informality paradox', body: 'GDP grows 6–8% annually. Formal sector expands but cannot absorb the labor force. The informal economy grows alongside the formal one.' },
                { year: '2008', title: 'The Hanoi street vendor ban', body: 'Authorities ban vending on 62 streets and 48 spaces. Vendors relocate rather than formalize — demonstrating that enforcement without incentives doesn\'t work.', extra: (
                  <button onClick={() => onNavigate('case-studies')} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '12px', fontWeight: '600', color: TEAL_BRIGHT, fontFamily: '"Inter", sans-serif', padding: 0, textDecoration: 'underline', opacity: 0.8 }}>
                    → How Chile and Korea handled this differently
                  </button>
                )},
                { year: '2021–present', title: 'COVID exposes the protection gap', body: 'No sick pay, no unemployment insurance, no state support. The structural vulnerability of 33.6M workers becomes impossible to ignore.', isLast: true },
              ].map((item, i, arr) => (
                <TimelineItem key={item.year} {...item} isLast={i === arr.length - 1} />
              ))}
            </div>
          </div>
        </Fade>
      </div>

      {/* ── WHO IS INFORMAL ── */}
      <div style={{ background: '#0a0a0a', borderTop: '1px solid rgba(255,255,255,0.06)', padding: '72px 56px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <Fade>
            <div style={{ marginBottom: '40px' }}>
              <div style={{ fontSize: '10px', fontWeight: '700', color: TEAL_BRIGHT, letterSpacing: '2.5px', textTransform: 'uppercase', marginBottom: '14px', fontFamily: '"Inter", sans-serif' }}>Who Is Informal?</div>
              <h2 style={{ fontSize: 'clamp(24px, 2.8vw, 38px)', fontWeight: '400', lineHeight: '1.2', margin: '0 0 14px 0', letterSpacing: '-0.8px', maxWidth: '600px' }}>
                Informality follows geography, gender, and education — not individual choice.
              </h2>
            </div>
          </Fade>
          <Fade>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '2px', background: 'rgba(255,255,255,0.05)', marginBottom: '48px' }}>
              {[
                { title: 'Agricultural workers', pct: '97.9%', body: 'Near-universal informality across rice farming, coffee cultivation, and aquaculture. These workers will not be reached by registration campaigns. They formalize when structural transformation moves them into manufacturing and services.', color: '#16a34a', sub: 'GSO/ILO, 2021' },
                { title: 'Rural workers', pct: '77.9%', body: 'Rural workers have a drastically lower probability of transitioning to formal employment than urban workers. The rural-urban gap in informality mirrors the gap between subsistence and integration into the modern economy.', color: '#1e40af', sub: 'GSO/ILO, 2021' },
                { title: 'Women in vulnerable roles', pct: '~65%', body: 'Women\'s overall informality rate is slightly lower than men\'s, but women are disproportionately concentrated in the most precarious categories: domestic work, street vending, and uncontracted garment work. Over 61% of female informal workers earn below regional minimum wage.', color: '#9333ea', sub: 'GSO/ILO, 2021' },
                { title: 'Urban informal workers', pct: '52%', body: 'Even in cities, more than half of workers are informal — construction workers, motorbike taxi drivers, delivery workers, food vendors. Urban informality is rising as migration consistently outpaces formal job creation.', color: '#c2410c', sub: 'GSO/ILO, 2021' },
              ].map(({ title, pct, body, color, sub }) => (
                <div key={title} style={{ background: '#111', padding: '28px 32px', borderLeft: `3px solid ${color}` }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px', gap: '12px' }}>
                    <h3 style={{ fontSize: '15px', fontWeight: '700', color: 'rgba(255,255,255,0.9)', margin: 0, fontFamily: '"Inter", sans-serif', lineHeight: '1.3' }}>{title}</h3>
                    <div style={{ textAlign: 'right', flexShrink: 0 }}>
                      <div style={{ fontSize: '28px', fontWeight: '300', color, lineHeight: 1, letterSpacing: '-0.5px', fontFamily: '"Georgia", serif' }}>{pct}</div>
                      <div style={{ fontSize: '9px', color: 'rgba(255,255,255,0.2)', fontFamily: '"Inter", sans-serif', fontStyle: 'italic', marginTop: '2px' }}>{sub}</div>
                    </div>
                  </div>
                  <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.48)', lineHeight: '1.75', margin: 0, fontFamily: '"Inter", sans-serif' }}>{body}</p>
                </div>
              ))}
            </div>
          </Fade>

          {/* Rational choice callout */}
          <Fade>
            <div style={{ borderLeft: `4px solid ${TEAL_BRIGHT}`, paddingLeft: '28px' }}>
              <p style={{ fontSize: 'clamp(18px, 2.2vw, 24px)', color: 'white', lineHeight: '1.5', margin: '0 0 14px 0', fontWeight: '400', letterSpacing: '-0.2px', maxWidth: '760px', fontStyle: 'italic' }}>
                "Informal workers are not failing to understand the system. They are navigating it rationally — responding correctly to the incentives they face."
              </p>
              <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.45)', lineHeight: '1.75', margin: 0, fontFamily: '"Inter", sans-serif', maxWidth: '620px' }}>
                When social insurance contributions total 25–28% of wages, when benefits are opaque and arrive decades away, when registration requires navigating three separate government databases — the informal economy is a rational response to a system not designed for the workers it's supposed to protect.
              </p>
            </div>
          </Fade>
        </div>
      </div>

      {/* ── PHOTO DIVIDER — urban market ── */}
      <PhotoDivider
        src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&q=80"
        caption="Ho Chi Minh City food stalls. Urban informality accounts for 52% of city employment — it is not a residual category but the economy's foundation. Unsplash."
        height="380px"
        position="center 50%"
        overlay="linear-gradient(to top, rgba(13,13,13,0.7) 0%, rgba(13,13,13,0.15) 60%)"
      />

      {/* ── THE FISCAL STAKES ── */}
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '80px 56px' }}>
        <Fade>
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '72px', alignItems: 'start' }}>
            <div>
              <div style={{ fontSize: '10px', fontWeight: '700', color: TEAL_BRIGHT, letterSpacing: '2.5px', textTransform: 'uppercase', marginBottom: '16px', fontFamily: '"Inter", sans-serif' }}>The Fiscal Stakes</div>
              <h2 style={{ fontSize: 'clamp(24px, 2.8vw, 38px)', fontWeight: '400', lineHeight: '1.15', margin: '0 0 24px 0', letterSpacing: '-0.8px' }}>
                This is Vietnam's central fiscal constraint, not just a labor market problem.
              </h2>
              <p style={{ fontSize: '16px', lineHeight: '1.85', color: 'rgba(255,255,255,0.62)', margin: '0 0 18px 0', fontFamily: '"Inter", sans-serif' }}>
                When 68.5% of workers contribute nothing to income tax or social insurance, Vietnam's tax-to-GDP ratio sits at 16.8% — well below the 19.5% regional average and far below the 25%+ common in high-income OECD countries.
              </p>
              <p style={{ fontSize: '16px', lineHeight: '1.85', color: 'rgba(255,255,255,0.62)', margin: '0 0 18px 0', fontFamily: '"Inter", sans-serif' }}>
                Vietnam has set a target of high-income status by 2045. Achieving it requires sustained 7–8% annual GDP growth, which requires large-scale public investment in infrastructure, education, and social protection. None of it can be reliably funded from a tax base this narrow.
              </p>
              <p style={{ fontSize: '16px', lineHeight: '1.85', color: 'rgba(255,255,255,0.62)', margin: '0 0 28px 0', fontFamily: '"Inter", sans-serif' }}>
                This is the fiscal connection at the heart of this project. Every informal worker invisible to the state is a worker whose economic activity generates no tax revenue, no social insurance contribution, and no fiscal space for the investments that would raise everyone's productivity.
              </p>
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                <button onClick={() => onNavigate('vietnam2045')} style={{ background: TEAL, color: 'white', border: 'none', padding: '10px 22px', fontSize: '13px', fontWeight: '700', cursor: 'pointer', fontFamily: '"Inter", sans-serif' }}>
                  Vietnam 2045 analysis →
                </button>
                <button onClick={() => onNavigate('fiscal')} style={{ background: 'none', border: `1px solid ${TEAL}`, color: TEAL_BRIGHT, padding: '10px 22px', fontSize: '13px', fontWeight: '600', cursor: 'pointer', fontFamily: '"Inter", sans-serif' }}>
                  Model the fiscal gap →
                </button>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', paddingTop: '8px' }}>
              {[
                { val: '16.8%', label: "Vietnam's tax-to-GDP ratio (2023)", sub: 'Below 19.5% regional average · OECD 2025', color: '#dc2626' },
                { val: '60%', label: "Social insurance target by 2030", sub: 'Up from ~38% today · Resolution 28-NQ/TW', color: TEAL_BRIGHT },
                { val: '$4,300', label: "GNI per capita today (USD)", sub: 'Needs to reach $14,005 for high-income status', color: '#7c3aed' },
              ].map(({ val, label, sub, color }) => (
                <div key={val} style={{ borderLeft: `3px solid ${color}`, paddingLeft: '20px' }}>
                  <div style={{ fontSize: 'clamp(28px, 3vw, 40px)', fontWeight: '300', color, lineHeight: 1, letterSpacing: '-1px', marginBottom: '8px', fontFamily: '"Georgia", serif' }}>{val}</div>
                  <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.75)', marginBottom: '4px', fontFamily: '"Inter", sans-serif' }}>{label}</div>
                  <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.25)', fontFamily: '"Inter", sans-serif', fontStyle: 'italic' }}>{sub}</div>
                </div>
              ))}
            </div>
          </div>
        </Fade>
      </div>

      {/* ── SOURCES ── */}
      <div style={{ background: '#0a0a0a', borderTop: '1px solid rgba(255,255,255,0.06)', padding: '40px 56px 32px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ fontSize: '10px', fontWeight: '700', color: 'rgba(255,255,255,0.2)', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '16px', fontFamily: '"Inter", sans-serif' }}>Sources for This Section</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px 48px', maxWidth: '900px' }}>
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
              <div key={s} style={{ fontSize: '11px', color: 'rgba(255,255,255,0.25)', lineHeight: '1.6', fontFamily: '"Inter", sans-serif', paddingLeft: '10px', borderLeft: '1px solid rgba(255,255,255,0.1)' }}>{s}</div>
            ))}
          </div>
        </div>
      </div>

      {/* ── DATA NOTES ── */}
      <div style={{ background: '#0a0a0a', borderTop: '1px solid rgba(255,255,255,0.04)', padding: '20px 56px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.18)', lineHeight: '1.75', margin: 0, fontFamily: '"Inter", sans-serif', maxWidth: '860px' }}>
            Data notes: The 68.5% informality rate and 33.6M worker count are from GSO/ILO 2021 using the ILO-aligned methodology including agriculture and forestry. The pre-2021 GSO measure (~56%) used a narrower definition and is not directly comparable. The 4% social insurance figure refers specifically to household business owners (ILO/VIDERI 2024 survey of 827 registered HHBs). The 16.8% tax-to-GDP ratio is OECD 2023 data published in Revenue Statistics Asia-Pacific 2025.
          </p>
        </div>
      </div>

      {/* ── FOOTER NAV ── */}
      <div style={{ background: '#080808', borderTop: '1px solid rgba(255,255,255,0.06)', padding: '18px 56px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <button onClick={onBack} style={{ background: 'none', border: '1px solid #222', color: 'rgba(255,255,255,0.45)', padding: '7px 14px', fontSize: '12px', fontWeight: '600', cursor: 'pointer', fontFamily: '"Inter", sans-serif' }}>← Back to Overview</button>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.2)', fontFamily: '"Inter", sans-serif' }}>ECON 62 · Topics in Macroeconomics · Winter 2026</div>
          <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.1)', fontFamily: '"Inter", sans-serif', marginTop: '2px' }}>Designed and Built by Miel Wewerka · Dartmouth College</div>
        </div>
        <button onClick={() => onNavigate('maps')} style={{ background: TEAL_BRIGHT, color: '#0d0d0d', border: 'none', padding: '10px 22px', fontSize: '12px', fontWeight: '700', cursor: 'pointer', fontFamily: '"Inter", sans-serif', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
          Part II: Maps →
        </button>
      </div>

    </div>
  );
}
