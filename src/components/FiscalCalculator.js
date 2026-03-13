import React, { useState, useEffect, useRef } from 'react';

// ========================================
// FISCAL GAP CALCULATOR
// ========================================

// Model assumptions
const ASSUMPTIONS = {
  totalEmployed: 55.0,          // millions
  informalRate: 0.645,          // 64.5%
  avgMonthlyWageUSD: 185,       // USD/month, GSO-derived conservative estimate
  socialInsuranceRate: 0.32,    // 32% combined employer + employee
  pitEffectiveRate: 0.03,       // ~3% effective PIT (most fall below threshold)
  vatPassthrough: 0.05,         // ~5% VAT pass-through estimate
  vietnamTaxRevenueUSD: 93.8,   // USD billions, Vietnam total tax revenue 2023
  vietnamGDP: 430,              // USD billions
};

const informalWorkers = ASSUMPTIONS.totalEmployed * ASSUMPTIONS.informalRate; // ~35.5M

function useAnimatedValue(target, duration = 600) {
  const [displayed, setDisplayed] = useState(0);
  const startRef = useRef(0);
  const startTimeRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    startRef.current = displayed;
    startTimeRef.current = null;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);

    const animate = (ts) => {
      if (!startTimeRef.current) startTimeRef.current = ts;
      const elapsed = ts - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setDisplayed(startRef.current + (target - startRef.current) * ease);
      if (progress < 1) rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [target]);

  return displayed;
}

function useInView(threshold = 0.2) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

function calcRevenue(formalizationPct) {
  const newFormalWorkers = informalWorkers * (formalizationPct / 100); // millions
  const annualWagePerWorker = ASSUMPTIONS.avgMonthlyWageUSD * 12; // USD/year

  const socialInsurance = newFormalWorkers * 1e6 * annualWagePerWorker * ASSUMPTIONS.socialInsuranceRate / 1e9;
  const pit = newFormalWorkers * 1e6 * annualWagePerWorker * ASSUMPTIONS.pitEffectiveRate / 1e9;
  const vat = newFormalWorkers * 1e6 * annualWagePerWorker * ASSUMPTIONS.vatPassthrough / 1e9;

  return {
    socialInsurance: Math.round(socialInsurance * 10) / 10,
    pit: Math.round(pit * 10) / 10,
    vat: Math.round(vat * 10) / 10,
    total: Math.round((socialInsurance + pit + vat) * 10) / 10,
    workers: Math.round(newFormalWorkers * 10) / 10,
  };
}

export default function FiscalCalculator({ onBack }) {
  const [formalizationPct, setFormalizationPct] = useState(25);
  const [headerRef, headerInView] = useInView(0.1);
  const [calcRef, calcInView] = useInView(0.1);
  const [contextRef, contextInView] = useInView(0.1);

  const revenue = calcRevenue(formalizationPct);

  const animatedTotal = useAnimatedValue(revenue.total);
  const animatedSI = useAnimatedValue(revenue.socialInsurance);
  const animatedPIT = useAnimatedValue(revenue.pit);
  const animatedVAT = useAnimatedValue(revenue.vat);
  const animatedWorkers = useAnimatedValue(revenue.workers);

  const maxBarValue = calcRevenue(100).socialInsurance;

  const pctOfTaxRevenue = ((revenue.total / ASSUMPTIONS.vietnamTaxRevenueUSD) * 100).toFixed(1);
  const pctOfGDP = ((revenue.total / ASSUMPTIONS.vietnamGDP) * 100).toFixed(1);

  const bars = [
    { label: 'Social Insurance', value: animatedSI, real: revenue.socialInsurance, color: '#4dd0c4', description: '32% combined employer + employee contribution' },
    { label: 'Personal Income Tax', value: animatedPIT, real: revenue.pit, color: '#81d4fa', description: '~3% effective rate (most fall below PIT threshold)' },
    { label: 'VAT Pass-through', value: animatedVAT, real: revenue.vat, color: '#b39ddb', description: '~5% of income estimate' },
  ];

  return (
    <div style={{ fontFamily: '"Inter", sans-serif', background: '#0d0d0d', minHeight: '100vh', color: 'white' }}>

      {/* HERO */}
      <div ref={headerRef} style={{ background: '#0d0d0d', borderBottom: '1px solid #1f1f1f', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: 'linear-gradient(90deg, #c2410c, #f97316)' }} />

        {/* Back nav */}
        <div style={{ padding: '20px 48px 0', borderBottom: '1px solid #1a1a1a' }}>
          <button onClick={onBack} style={{ background: 'transparent', border: 'none', color: '#4dd0c4', fontSize: '13px', fontWeight: '600', cursor: 'pointer', fontFamily: '"Inter", sans-serif', letterSpacing: '0.3px', padding: 0 }}>← Back to Overview</button>
          <span style={{ color: '#333', margin: '0 12px' }}>|</span>
          <span style={{ fontSize: '13px', color: '#666', fontFamily: '"Inter", sans-serif' }}>Part IV: The Model</span>
        </div>

        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '56px 48px 64px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }}>

          {/* Left: framing */}
          <div style={{ opacity: headerInView ? 1 : 0, transform: headerInView ? 'none' : 'translateY(20px)', transition: 'all 0.7s ease' }}>
            <div style={{ fontSize: '11px', fontWeight: '700', color: '#c2410c', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '16px', fontFamily: '"Inter", sans-serif' }}>
              Part IV · Fiscal Policy Analysis
            </div>
            <h1 style={{ fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: '400', margin: '0 0 24px 0', letterSpacing: '-1.5px', lineHeight: 1.05, fontFamily: '"Georgia", "Times New Roman", serif' }}>
              The Policy Model:<br />What Formalization<br />Would Actually Mean
            </h1>
            <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.5)', lineHeight: '1.8', margin: '0 0 32px 0', fontFamily: '"Inter", sans-serif' }}>
              Vietnam's informal economy represents a structural gap in the fiscal base. This model estimates the additional revenue that would flow if a share of informal workers entered the formal system, across social insurance, personal income tax, and VAT. The slider below is the argument made quantitative.
            </p>
            <div style={{ display: 'flex', gap: '1px', background: '#1a1a1a', maxWidth: '480px' }}>
              {[
                ['35.5M', 'workers currently outside the formal tax system'],
                ['$93.8B', 'Vietnam total tax revenue 2023'],
              ].map(([val, label]) => (
                <div key={val} style={{ background: '#111', padding: '18px 20px', flex: 1 }}>
                  <div style={{ fontSize: '22px', fontWeight: '700', color: '#c2410c', marginBottom: '4px', letterSpacing: '-0.5px' }}>{val}</div>
                  <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.35)', fontFamily: '"Inter", sans-serif', lineHeight: '1.4' }}>{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: live revenue preview */}
          <div style={{ opacity: headerInView ? 1 : 0, transform: headerInView ? 'none' : 'translateY(20px)', transition: 'all 0.7s ease 0.15s', textAlign: 'center' }}>
            <div style={{ fontSize: '11px', fontWeight: '700', color: 'rgba(255,255,255,0.3)', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '20px', fontFamily: '"Inter", sans-serif' }}>
              Projected additional revenue at {formalizationPct}% formalization
            </div>
            <div style={{ fontSize: 'clamp(56px, 8vw, 96px)', fontWeight: '300', color: 'white', letterSpacing: '-3px', lineHeight: 1, fontFamily: '"Georgia", "Times New Roman", serif', marginBottom: '8px' }}>
              ${animatedTotal.toFixed(1)}<span style={{ fontSize: '0.4em', color: 'rgba(255,255,255,0.3)', letterSpacing: 0 }}>B</span>
            </div>
            <div style={{ fontSize: '14px', color: 'rgba(255,255,255,0.3)', marginBottom: '32px', fontFamily: '"Inter", sans-serif' }}>
              USD billions per year
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1px', background: '#1a1a1a', marginBottom: '20px' }}>
              {[
                { label: 'Social Insurance', val: animatedSI, color: '#4dd0c4' },
                { label: 'Income Tax', val: animatedPIT, color: '#81d4fa' },
                { label: 'VAT', val: animatedVAT, color: '#b39ddb' },
              ].map(({ label, val, color }) => (
                <div key={label} style={{ background: '#0d0d0d', padding: '16px 12px' }}>
                  <div style={{ fontSize: '18px', fontWeight: '600', color, marginBottom: '4px' }}>${val.toFixed(1)}B</div>
                  <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.3)', fontFamily: '"Inter", sans-serif', letterSpacing: '0.5px' }}>{label}</div>
                </div>
              ))}
            </div>
            <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.2)', fontFamily: '"Inter", sans-serif' }}>
              Adjust the slider below to explore different scenarios
            </div>
          </div>

        </div>
      </div>

      {/* ASSUMPTIONS STRIP */}
      <div style={{ background: '#111', borderBottom: '1px solid #1f1f1f', padding: '14px 48px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', gap: '40px', flexWrap: 'wrap', alignItems: 'center' }}>
          {[
            ['35.5M', 'informal workers'],
            ['$185/mo', 'avg informal wage'],
            ['32%', 'social insurance rate'],
            ['3%', 'effective PIT rate'],
            ['5%', 'VAT pass-through'],
          ].map(([val, label]) => (
            <div key={label} style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
              <span style={{ fontSize: '14px', fontWeight: '700', color: '#4dd0c4' }}>{val}</span>
              <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.3px' }}>{label}</span>
            </div>
          ))}
          <div style={{ marginLeft: 'auto', fontSize: '11px', color: 'rgba(255,255,255,0.2)' }}>Sources: GSO LFS 2023 · World Bank · ILO · IMF</div>
        </div>
      </div>

      {/* CALCULATOR */}
      <div ref={calcRef} style={{ maxWidth: '1100px', margin: '0 auto', padding: '60px 40px' }}>

        {/* SLIDER */}
        <div style={{
          marginBottom: '56px',
          opacity: calcInView ? 1 : 0, transform: calcInView ? 'none' : 'translateY(20px)',
          transition: 'all 0.7s ease'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '16px' }}>
            <div>
              <div style={{ fontSize: '11px', fontWeight: '700', color: '#4dd0c4', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '6px' }}>Formalization Rate</div>
              <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)' }}>
                What share of informal workers transition to formal employment?
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 'clamp(40px, 5vw, 64px)', fontWeight: '300', color: 'white', fontFamily: '"Cormorant Garamond", serif', lineHeight: 1, letterSpacing: '-2px' }}>
                {formalizationPct}<span style={{ fontSize: '0.45em', color: 'rgba(255,255,255,0.4)', marginLeft: '4px' }}>%</span>
              </div>
              <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.3)', marginTop: '4px' }}>
                {animatedWorkers.toFixed(1)}M workers formalized
              </div>
            </div>
          </div>

          {/* Custom slider */}
          <div style={{ position: 'relative', height: '40px', display: 'flex', alignItems: 'center' }}>
            <div style={{ position: 'absolute', left: 0, right: 0, height: '2px', background: '#1f1f1f', borderRadius: '1px' }} />
            <div style={{ position: 'absolute', left: 0, width: `${formalizationPct}%`, height: '2px', background: 'linear-gradient(90deg, #4dd0c4, #81d4fa)', borderRadius: '1px', transition: 'width 0.05s' }} />
            <input
              type="range" min="0" max="100" value={formalizationPct}
              onChange={e => setFormalizationPct(Number(e.target.value))}
              style={{
                position: 'absolute', left: 0, right: 0, width: '100%',
                appearance: 'none', background: 'transparent', cursor: 'pointer',
                height: '40px', margin: 0,
              }}
            />
          </div>

          {/* Tick marks */}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px' }}>
            {[0, 25, 50, 75, 100].map(tick => (
              <div key={tick} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                <div style={{ width: '1px', height: '6px', background: formalizationPct >= tick ? '#4dd0c4' : '#2a2a2a' }} />
                <span style={{ fontSize: '11px', color: formalizationPct >= tick ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,0.15)' }}>{tick}%</span>
              </div>
            ))}
          </div>

          {/* Scenario labels */}
          <div style={{ display: 'flex', gap: '8px', marginTop: '16px', flexWrap: 'wrap' }}>
            {[
              { label: 'Conservative', pct: 10, desc: 'Modest policy reform' },
              { label: 'Moderate', pct: 25, desc: 'Korea-style push' },
              { label: 'Ambitious', pct: 50, desc: 'Chile-level transformation' },
              { label: 'Full', pct: 100, desc: 'Theoretical maximum' },
            ].map(({ label, pct, desc }) => (
              <button key={label} onClick={() => setFormalizationPct(pct)} style={{
                background: formalizationPct === pct ? 'rgba(77,208,196,0.12)' : 'transparent',
                border: formalizationPct === pct ? '1px solid #4dd0c4' : '1px solid #2a2a2a',
                color: formalizationPct === pct ? '#4dd0c4' : 'rgba(255,255,255,0.35)',
                padding: '6px 14px', fontSize: '12px', fontWeight: '600',
                cursor: 'pointer', borderRadius: '3px', fontFamily: '"Inter", sans-serif',
                transition: 'all 0.2s'
              }}>{label} · {pct}%</button>
            ))}
          </div>
        </div>

        {/* TOTAL OUTPUT */}
        <div style={{
          borderTop: '1px solid #1f1f1f', borderBottom: '1px solid #1f1f1f',
          padding: '40px 0', marginBottom: '48px',
          display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1px',
          background: '#1f1f1f',
          opacity: calcInView ? 1 : 0, transform: calcInView ? 'none' : 'translateY(20px)',
          transition: 'all 0.7s ease 0.15s'
        }}>
          {[
            {
              value: `$${animatedTotal.toFixed(1)}B`,
              label: 'Additional annual revenue',
              sub: 'USD billions',
              color: '#4dd0c4',
              big: true
            },
            {
              value: `${pctOfTaxRevenue}%`,
              label: 'Of current tax revenue',
              sub: `Vietnam collects $${ASSUMPTIONS.vietnamTaxRevenueUSD}B/year`,
              color: 'white',
              big: false
            },
            {
              value: `${pctOfGDP}%`,
              label: 'Of GDP',
              sub: `Vietnam GDP ~$${ASSUMPTIONS.vietnamGDP}B`,
              color: 'white',
              big: false
            },
          ].map(({ value, label, sub, color, big }) => (
            <div key={label} style={{ background: '#0d0d0d', padding: '32px 40px', textAlign: 'center' }}>
              <div style={{ fontSize: big ? 'clamp(36px, 4vw, 56px)' : 'clamp(28px, 3vw, 42px)', fontWeight: '300', color, fontFamily: '"Cormorant Garamond", serif', letterSpacing: '-1px', lineHeight: 1, marginBottom: '10px' }}>{value}</div>
              <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)', marginBottom: '4px' }}>{label}</div>
              <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.25)' }}>{sub}</div>
            </div>
          ))}
        </div>

        {/* BAR CHART */}
        <div style={{
          opacity: calcInView ? 1 : 0, transform: calcInView ? 'none' : 'translateY(20px)',
          transition: 'all 0.7s ease 0.25s'
        }}>
          <div style={{ fontSize: '11px', fontWeight: '700', color: '#4dd0c4', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '28px' }}>Revenue Breakdown</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {bars.map(({ label, value, real, color, description }) => {
              const barPct = maxBarValue > 0 ? (value / maxBarValue) * 100 : 0;
              return (
                <div key={label}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '8px' }}>
                    <div>
                      <span style={{ fontSize: '14px', fontWeight: '600', color: 'white' }}>{label}</span>
                      <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.3)', marginLeft: '12px' }}>{description}</span>
                    </div>
                    <span style={{ fontSize: '18px', fontWeight: '300', color, fontFamily: '"Cormorant Garamond", serif', letterSpacing: '-0.5px' }}>${value.toFixed(1)}B</span>
                  </div>
                  <div style={{ height: '6px', background: '#1f1f1f', borderRadius: '3px', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${barPct}%`, background: color, borderRadius: '3px', transition: 'width 0.4s cubic-bezier(0.4, 0, 0.2, 1)' }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* CONTEXT SECTION */}
      <div ref={contextRef} style={{ background: '#111', borderTop: '1px solid #1f1f1f', padding: '60px 40px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ fontSize: '11px', fontWeight: '700', color: '#4dd0c4', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '28px' }}>What Would It Take</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
            {[
              {
                title: 'Social Insurance Reform',
                body: 'Vietnam\'s social insurance system currently offers poor value to informal workers , low benefits, poor portability, high contribution rates. Chile\'s 1981 pension privatization worked because it made formalization personally beneficial. Vietnam needs a similar reorientation: better individual returns on contributions.',
                color: '#4dd0c4'
              },
              {
                title: 'Simplified Tax Compliance',
                body: 'Compliance costs are regressive: they hit small informal operators hardest. South Korea\'s formalization push included simplified tax regimes for small businesses. Vietnam\'s e-tax and simplified filing reforms since 2020 are steps in the right direction, but coverage remains incomplete.',
                color: '#81d4fa'
              },
              {
                title: 'The Incentive Problem',
                body: 'The fiscal math only works if formalization is worth it for workers and firms. The lesson from Korea and Chile is that enforcement alone fails , the benefit side of the equation must improve first. For Vietnam\'s 35M informal workers, the question is: what does formality offer that informality doesn\'t?',
                color: '#b39ddb'
              },
            ].map(({ title, body, color }) => (
              <div key={title} style={{
                borderTop: `2px solid ${color}`, paddingTop: '20px',
                opacity: contextInView ? 1 : 0, transform: contextInView ? 'none' : 'translateY(16px)',
                transition: 'all 0.6s ease'
              }}>
                <h3 style={{ fontSize: '16px', fontWeight: '600', color: 'white', margin: '0 0 12px 0', lineHeight: '1.3' }}>{title}</h3>
                <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', lineHeight: '1.75', margin: 0 }}>{body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CAVEATS */}
      <div style={{ background: '#0d0d0d', borderTop: '1px solid #1f1f1f', padding: '32px 40px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ fontSize: '11px', fontWeight: '700', color: 'rgba(255,255,255,0.2)', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '12px' }}>Model Assumptions & Limitations</div>
          <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.25)', lineHeight: '1.7', maxWidth: '860px', margin: 0 }}>
            This model assumes uniform formalization across all informal workers and a static average wage. In practice, formalization would be uneven , urban manufacturing workers are more likely to formalize than rural agricultural workers. The model also assumes no behavioral response: in reality, some firms and workers would restructure to avoid formalization costs, reducing the fiscal yield. Estimates should be treated as upper-bound scenarios. Sources: GSO Labor Force Survey 2023, World Bank Vietnam Economic Update 2024, ILO Social Protection Report, IMF Vietnam Article IV Consultation 2023.
          </p>
        </div>
      </div>

      <style>{`
        input[type='range']::-webkit-slider-thumb {
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #4dd0c4;
          border: 3px solid #0d0d0d;
          box-shadow: 0 0 0 1px #4dd0c4;
          cursor: pointer;
        }
        input[type='range']::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #4dd0c4;
          border: 3px solid #0d0d0d;
          box-shadow: 0 0 0 1px #4dd0c4;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}
