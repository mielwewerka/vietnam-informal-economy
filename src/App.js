// ========================================
// VIETNAM INFORMAL ECONOMY PROJECT — App.js
// Revisions: 6-part routing, corrected data,
// onNavigate prop threaded, tab bar removed
// from Maps, FooterNav component added.
// ========================================

import React, { useState, useMemo, useEffect, useRef } from 'react';
import vietnamGeoData from './data/vietnamGeoData.json';
import completeMapData from './data/completeMapData.json';
import InformalExplainer from './components/InformalExplainer';
import Vietnam2045 from './components/Vietnam2045';
import CaseStudies from './components/CaseStudies';
import FiscalCalculator from './components/FiscalCalculator';
import ExecutiveSummary from './components/ExecutiveSummary';
import PolicyRecommendations from './components/PolicyRecommendations';

// ========================================
// MAP CONFIGURATIONS
// ========================================
const mapConfigs = {
  informal: {
    title: "Informal Employment",
    dataKey: "informal_pct",
    unit: "%",
    description: "Informal employment rate by province. GSO Labor Force Survey 2023.",
    colorScale: [
      { threshold: 40, color: '#22c55e', label: '<40%' },
      { threshold: 50, color: '#84cc16', label: '40-50%' },
      { threshold: 60, color: '#eab308', label: '50-60%' },
      { threshold: 70, color: '#f97316', label: '60-70%' },
      { threshold: 80, color: '#dc2626', label: '70-80%' },
      { threshold: 100, color: '#7f1d1d', label: '>=80%' }
    ]
  },
  agricultural: {
    title: "Agricultural Workers",
    dataKey: "agricultural_pct",
    unit: "%",
    description: "Percentage of workers in agriculture sector. GSO LFS 2023.",
    colorScale: [
      { threshold: 10, color: '#dcfce7', label: '<10%' },
      { threshold: 20, color: '#86efac', label: '10-20%' },
      { threshold: 40, color: '#22c55e', label: '20-40%' },
      { threshold: 60, color: '#15803d', label: '40-60%' },
      { threshold: 100, color: '#14532d', label: '>=60%' }
    ]
  },
  totalEmployment: {
    title: "Total Employment",
    dataKey: "total_employed",
    unit: "k",
    description: "Total employed workers (in thousands). GSO LFS 2023.",
    colorScale: [
      { threshold: 500, color: '#dbeafe', label: '<500k' },
      { threshold: 1000, color: '#93c5fd', label: '500-1000k' },
      { threshold: 1500, color: '#3b82f6', label: '1000-1500k' },
      { threshold: 2500, color: '#1e40af', label: '1500-2500k' },
      { threshold: 10000, color: '#1e3a8a', label: '>=2500k' }
    ]
  },
  sidewalk: {
    title: "Sidewalk Economy",
    dataKey: "sidewalk_pct",
    unit: "%",
    description: "Estimated sidewalk economy share. Derived: 5% of urban employment applied to provincial urban share (Huynh 2023). Calculated — see data notes.",
    colorScale: [
      { threshold: 0.5, color: '#fed7aa', label: '<0.5%' },
      { threshold: 1, color: '#fdba74', label: '0.5-1%' },
      { threshold: 2, color: '#fb923c', label: '1-2%' },
      { threshold: 4, color: '#f97316', label: '2-4%' },
      { threshold: 100, color: '#c2410c', label: '>=4%' }
    ]
  },
  urbanization: {
    title: "Urbanization Rate",
    dataKey: "urban_pct_gso_2024",
    unit: "%",
    description: "Urban population percentage by province. GSO 2024.",
    colorScale: [
      { threshold: 20, color: '#fef3c7', label: '<20%' },
      { threshold: 40, color: '#fde047', label: '20-40%' },
      { threshold: 60, color: '#facc15', label: '40-60%' },
      { threshold: 80, color: '#eab308', label: '60-80%' },
      { threshold: 100, color: '#a16207', label: '>=80%' }
    ]
  },
  nonAgInformal: {
    title: "Non-Agricultural Informal",
    dataKey: "non_ag_informal_pct",
    unit: "%",
    description: "Informal employment excluding agriculture. Derived: informal rate minus agricultural share (GSO LFS 2023). Calculated — see data notes.",
    colorScale: [
      { threshold: 20, color: '#dcfce7', label: '<20%' },
      { threshold: 30, color: '#86efac', label: '20-30%' },
      { threshold: 40, color: '#22c55e', label: '30-40%' },
      { threshold: 50, color: '#15803d', label: '40-50%' },
      { threshold: 100, color: '#14532d', label: '>=50%' }
    ]
  },
  ruralPopulation: {
    title: "Rural Population",
    dataKey: "rural_pct",
    unit: "%",
    description: "Share of population living in rural areas. Derived: 100 minus urban percentage (GSO 2024). Calculated — see data notes.",
    colorScale: [
      { threshold: 20, color: '#dbeafe', label: '<20%' },
      { threshold: 40, color: '#93c5fd', label: '20-40%' },
      { threshold: 60, color: '#3b82f6', label: '40-60%' },
      { threshold: 80, color: '#1e40af', label: '60-80%' },
      { threshold: 100, color: '#1e3a8a', label: '>=80%' }
    ]
  },
};

// ========================================
// SHARED FOOTER NAV
// ========================================
function FooterNav({ onBack, prev, next, onNavigate }) {
  const TEAL = '#4dd0c4';
  return (
    <div style={{
      background: '#080808', borderTop: '1px solid #161616',
      padding: '20px 48px', display: 'flex',
      justifyContent: 'space-between', alignItems: 'center',
      flexWrap: 'wrap', gap: '12px', flexShrink: 0,
    }}>
      <button
        onClick={prev ? () => onNavigate(prev.page) : onBack}
        style={{ background: 'none', border: '1px solid #222', color: 'rgba(255,255,255,0.4)', padding: '7px 14px', fontSize: '12px', fontWeight: '600', cursor: 'pointer', fontFamily: '"Inter", sans-serif', letterSpacing: '0.3px' }}
      >
        ← {prev ? prev.label : 'Back to Overview'}
      </button>
      <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.12)', margin: 0, fontFamily: '"Inter", sans-serif' }}>
        ECON 62 · Topics in Macroeconomics · Winter 2026
      </p>
      {next && (
        <button
          onClick={() => onNavigate(next.page)}
          style={{ background: TEAL, color: '#0f0f0f', border: 'none', padding: '7px 18px', fontSize: '12px', fontWeight: '700', cursor: 'pointer', fontFamily: '"Inter", sans-serif', letterSpacing: '0.5px' }}
        >
          {next.label} →
        </button>
      )}
    </div>
  );
}

// ========================================
// LANDING PAGE
// ========================================
function LandingPage({ onNavigate }) {
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    const h = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', h);
    return () => window.removeEventListener('scroll', h);
  }, []);

  const TEAL = '#00897b';
  const TEAL_BRIGHT = '#4dd0c4';

  const chapters = [
    {
      num: 'I', page: 'informal-explainer', color: TEAL,
      title: 'What is the Informal Economy',
      subtitle: 'Who works outside the system and why',
      body: "From the 1986 Doi Moi reforms to the 2008 Hanoi street vendor ban, the history of how Vietnam's informal economy was created, who it employs, and why it has proved so hard to escape.",
    },
    {
      num: 'II', page: 'maps', color: '#1e6fa8',
      title: 'Interactive Maps',
      subtitle: 'Seven provincial indicators across 63 provinces',
      body: "Informal employment rates, agricultural share, urbanization, sidewalk economy density, and rural population — mapped at the provincial level. Use the urban filter to compare across development contexts.",
    },
    {
      num: 'III', page: 'vietnam2045', color: '#7c3aed',
      title: 'Vietnam 2045',
      subtitle: "Vietnam's fiscal ambition and the gap",
      body: "Vietnam is pushing toward high-income status by its centennial. What it needs: sustained tax revenue, social insurance, and public investment. All of it depends on an economy where most workers currently fall outside the formal system.",
    },
    {
      num: 'IV', page: 'fiscal', color: '#c2410c',
      title: 'Fiscal Calculator',
      subtitle: 'What formalization would mean for the tax base',
      body: "An interactive model: adjust the formalization rate and see projected revenue from social insurance, income tax, and VAT. The numbers behind the policy argument.",
    },
    {
      num: 'V', page: 'case-studies', color: '#0e7490',
      title: 'Case Studies',
      subtitle: 'Chile and South Korea in comparative perspective',
      body: "Two countries that crossed the high-income threshold within a generation, starting from informality rates comparable to Vietnam today. Their mechanisms differed. What they share is instructive.",
    },
    {
      num: 'VI', page: 'policy', color: '#475569',
      title: 'Policy Analysis',
      subtitle: 'Four recommendations and the tradeoffs they carry',
      body: "Formalization fails when designed as enforcement. Four evidence-based recommendations grounded in the behavioral and institutional evidence from Vietnam's own household business surveys.",
    },
  ];

  return (
    <div style={{ fontFamily: '"Georgia", "Times New Roman", serif', background: '#0f0f0f', color: 'white' }}>

      {/* STICKY NAV */}
      <div style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
        background: 'rgba(15,15,15,0.97)', borderBottom: '1px solid #222',
        padding: '14px 48px', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        backdropFilter: 'blur(8px)',
        transform: scrollY > 300 ? 'translateY(0)' : 'translateY(-100%)',
        transition: 'transform 0.35s ease',
      }}>
        <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', fontFamily: '"Inter", sans-serif' }}>Vietnam's Invisible Workforce</span>
        <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
          {chapters.map(c => (
            <button key={c.page} onClick={() => onNavigate(c.page)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '11px', fontWeight: '600', color: 'rgba(255,255,255,0.4)', fontFamily: '"Inter", sans-serif', letterSpacing: '0.3px', transition: 'color 0.2s' }}
              onMouseEnter={e => e.target.style.color = TEAL_BRIGHT}
              onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.4)'}>
              {c.num}. {c.title}
            </button>
          ))}
        </div>
      </div>

      {/* HERO */}
      <div style={{ position: 'relative', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(https://raw.githubusercontent.com/mielwewerka/vietnam-informal-economy/main/vietnam-street.jpg)', backgroundSize: 'cover', backgroundPosition: 'center 40%', backgroundColor: '#1a1a1a' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.55) 50%, rgba(10,10,10,0.92) 85%, #0f0f0f 100%)' }} />
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: `linear-gradient(90deg, ${TEAL}, transparent)` }} />
        <div style={{ position: 'absolute', top: '32px', left: '48px', fontSize: '11px', fontWeight: '700', color: 'rgba(255,255,255,0.45)', letterSpacing: '2.5px', textTransform: 'uppercase', fontFamily: '"Inter", sans-serif' }}>
          ECON 62 · Topics in Macroeconomics · Winter 2026
        </div>

        <div style={{ position: 'relative', padding: '0 48px 72px', maxWidth: '900px' }}>
          <h1 style={{ fontSize: 'clamp(44px, 7vw, 88px)', fontWeight: '400', lineHeight: '1.0', margin: '0 0 28px 0', letterSpacing: '-2px', color: 'white' }}>
            Vietnam's<br />Invisible<br />Workforce
          </h1>
          <p style={{ fontSize: 'clamp(17px, 2vw, 22px)', color: 'rgba(255,255,255,0.65)', lineHeight: '1.65', margin: '0 0 40px 0', maxWidth: '580px', fontStyle: 'italic', fontWeight: '400' }}>
            Vietnam is racing toward high-income status by 2045. It has the growth rate,
            the political will, and the manufacturing base. What it doesn't have is a tax
            base. 68.5% of its workers operate without social insurance, contracts, or safety nets.
          </p>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <button onClick={() => onNavigate('informal-explainer')} style={{ background: TEAL_BRIGHT, color: '#0f0f0f', border: 'none', padding: '14px 32px', fontSize: '13px', fontWeight: '700', cursor: 'pointer', letterSpacing: '0.8px', textTransform: 'uppercase', fontFamily: '"Inter", sans-serif' }}>
              Begin Reading →
            </button>
            <button onClick={() => onNavigate('exec-summary')} style={{ background: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.85)', border: '1px solid rgba(255,255,255,0.35)', padding: '13px 24px', fontSize: '12px', fontWeight: '600', cursor: 'pointer', letterSpacing: '0.8px', textTransform: 'uppercase', fontFamily: '"Inter", sans-serif' }}>
              Executive Summary
            </button>
          </div>
        </div>

        <div style={{ position: 'absolute', bottom: '28px', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
          <span style={{ fontSize: '10px', fontWeight: '600', color: 'rgba(255,255,255,0.3)', letterSpacing: '2px', textTransform: 'uppercase', fontFamily: '"Inter", sans-serif' }}>Scroll</span>
          <div style={{ animation: 'bounce 1.8s infinite' }}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M3 6l6 6 6-6" stroke="rgba(255,255,255,0.35)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </div>
        </div>
        <style>{`@keyframes bounce{0%,100%{transform:translateY(0)}50%{transform:translateY(5px)}}`}</style>
      </div>

      {/* STAT STRIP — corrected figures */}
      <div style={{ background: '#111', borderTop: '1px solid #1e1e1e', borderBottom: '1px solid #1e1e1e' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1px', background: '#1e1e1e' }}>
          {[
            ['68.5%', 'of workers are informally employed', 'GSO/ILO, 2021'],
            ['33.6M', 'workers outside the formal economy', 'GSO/ILO, 2021'],
            ['16.8%', 'tax-to-GDP ratio, below the regional average', 'OECD, 2023'],
            ['2045', "Vietnam's target year for high-income status", 'Resolution 29/NQ-TW'],
          ].map(([stat, label, source]) => (
            <div key={stat} style={{ background: '#111', padding: '36px 32px' }}>
              <div style={{ fontSize: 'clamp(28px, 3vw, 42px)', fontWeight: '400', color: TEAL_BRIGHT, lineHeight: 1, marginBottom: '10px', letterSpacing: '-1px' }}>{stat}</div>
              <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.65)', lineHeight: '1.5', marginBottom: '6px', fontFamily: '"Inter", sans-serif' }}>{label}</div>
              <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.25)', fontFamily: '"Inter", sans-serif', fontStyle: 'italic' }}>{source}</div>
            </div>
          ))}
        </div>
      </div>

      {/* CONTEXT BLURB — original wording preserved */}
      <div style={{ background: '#0f0f0f', padding: '56px 48px 0' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', borderBottom: '1px solid #1a1a1a', paddingBottom: '56px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2px', background: '#1a1a1a' }}>
            <div style={{ background: '#0f0f0f', padding: '36px 40px' }}>
              <div style={{ fontSize: '11px', fontWeight: '700', color: TEAL_BRIGHT, letterSpacing: '2.5px', textTransform: 'uppercase', marginBottom: '16px', fontFamily: '"Inter", sans-serif' }}>About This Project</div>
              <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.6)', lineHeight: '1.8', margin: '0 0 20px 0', fontFamily: '"Inter", sans-serif' }}>
                This project examines Vietnam's informal economy: the 68.5% of workers who operate outside formal employment, and what it means for the country's ability to fund its 2045 development ambitions.
              </p>
              <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.6)', lineHeight: '1.8', margin: 0, fontFamily: '"Inter", sans-serif' }}>
                It is structured as a six-part argument: beginning with the historical origins of informality, moving through provincial-level geographic evidence, and arriving at a policy analysis grounded in comparative evidence from Chile and South Korea.
              </p>
            </div>
            <div style={{ background: '#111', padding: '36px 40px', display: 'flex', flexDirection: 'column', justifyContent: 'center', borderLeft: `4px solid ${TEAL}` }}>
              <div style={{ fontSize: '11px', fontWeight: '700', color: TEAL, letterSpacing: '2.5px', textTransform: 'uppercase', marginBottom: '20px', fontFamily: '"Inter", sans-serif' }}>The Central Question</div>
              <p style={{ fontSize: 'clamp(20px, 2.2vw, 26px)', color: 'white', lineHeight: '1.45', margin: '0 0 20px 0', letterSpacing: '-0.3px', fontStyle: 'italic', fontWeight: '400' }}>
                Can Vietnam reach high-income status by 2045 when two-thirds of its workers fall outside the formal tax system?
              </p>
              <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.4)', lineHeight: '1.7', margin: 0, fontFamily: '"Inter", sans-serif' }}>
                Achieving high-income status requires sustained public investment in infrastructure, education, and social protection. All of it depends on a tax base that the current structure of informal employment makes very hard to build.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* THESIS */}
      <div style={{ background: '#0f0f0f', padding: '100px 48px' }}>
        <div style={{ maxWidth: '760px', margin: '0 auto' }}>
          <div style={{ width: '40px', height: '3px', background: TEAL_BRIGHT, marginBottom: '40px' }} />
          <h2 style={{ fontSize: 'clamp(26px, 3.5vw, 42px)', fontWeight: '400', lineHeight: '1.25', color: 'white', margin: '0 0 32px 0', letterSpacing: '-0.5px' }}>
            Vietnam's development story is usually told through GDP growth and poverty reduction.
            This project tells it through the other number.
          </h2>
          <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.6)', lineHeight: '1.85', margin: '0 0 20px 0', fontFamily: '"Inter", sans-serif' }}>
            68.5% is the share of workers who fall outside the formal system: uncounted in tax records, unprotected by labor law, and excluded from the social insurance they help fund through their economic activity.
            These workers are not evading the system out of choice. They are street vendors and rice farmers and construction workers and domestic employees navigating an economy where formal employment is not always accessible, where contribution rates are high relative to incomes, and where the benefits of registration often do not reach them. The fiscal gap their exclusion creates is not incidental to Vietnam's development challenge. It shapes everything else.
          </p>
          <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.6)', lineHeight: '1.85', margin: 0, fontFamily: '"Inter", sans-serif' }}>
            This project maps that reality province by province, quantifies its fiscal consequences,
            and asks what formalization would actually require — and what it would cost — for workers and the state alike.
          </p>
        </div>
      </div>

      {/* PART CARDS — 3x2 */}
      <div style={{ background: '#0a0a0a', borderTop: '1px solid #1a1a1a', padding: '56px 48px 64px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '16px', marginBottom: '36px' }}>
            <div style={{ fontSize: '11px', fontWeight: '700', color: TEAL_BRIGHT, letterSpacing: '2.5px', textTransform: 'uppercase', fontFamily: '"Inter", sans-serif' }}>The Argument in Six Parts</div>
            <div style={{ flex: 1, height: '1px', background: '#1e1e1e' }} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2px', background: '#1a1a1a' }}>
            {chapters.map(c => (
              <div key={c.num} onClick={() => onNavigate(c.page)} style={{ background: '#0f0f0f', padding: '32px 36px', cursor: 'pointer', borderTop: `3px solid ${c.color}`, transition: 'background 0.2s', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
                onMouseEnter={e => e.currentTarget.style.background = '#141414'}
                onMouseLeave={e => e.currentTarget.style.background = '#0f0f0f'}>
                <div>
                  <span style={{ fontSize: '11px', fontWeight: '700', color: c.color, fontFamily: '"Inter", sans-serif', letterSpacing: '1.5px' }}>PART {c.num}</span>
                  <h3 style={{ fontSize: '22px', fontWeight: '400', color: 'white', margin: '10px 0 6px', letterSpacing: '-0.3px', lineHeight: '1.2' }}>{c.title}</h3>
                  <p style={{ fontSize: '13px', color: c.color, fontFamily: '"Inter", sans-serif', fontWeight: '500', margin: '0 0 16px 0' }}>{c.subtitle}</p>
                  <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.55)', lineHeight: '1.7', margin: '0 0 24px 0', fontFamily: '"Inter", sans-serif' }}>{c.body}</p>
                </div>
                <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: '16px' }}>
                  <span style={{ background: c.color, color: 'white', fontSize: '11px', fontWeight: '700', letterSpacing: '1px', padding: '5px 12px', textTransform: 'uppercase' }}>Read Part {c.num} →</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div style={{ background: '#080808', borderTop: '1px solid #161616', padding: '32px 48px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.2)', margin: 0, fontFamily: '"Inter", sans-serif' }}>ECON 62: Topics in Macroeconomics · Winter 2026</p>
        <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.15)', margin: 0, fontFamily: '"Inter", sans-serif' }}>Data: GSO/ILO 2021 · OECD 2023 · World Bank · IMF</p>
      </div>
    </div>
  );
}

// ========================================
// INTERACTIVE MAPS (maps-only, no case studies tab)
// ========================================
function InteractiveMaps({ onBack, onNavigate }) {
  const [activeTab, setActiveTab] = useState('informal');
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [hoveredProvince, setHoveredProvince] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [urbanFilter, setUrbanFilter] = useState('all');
  const [sidebarTab, setSidebarTab] = useState('facts');

  const mapInsights = {
    informal: [
      { label: 'The rural-urban divide is stark', text: 'Northwestern provinces like Dien Bien and Lai Chau exceed 88% informality, nearly double the rate in Hanoi and Ho Chi Minh City. Geography is the single strongest predictor of whether a worker is visible to the state.' },
      { label: 'Urban cores already near high-income norms', text: "Ho Chi Minh City's Southeast region sits at approximately 36% informal employment, close to the 25-35% typical of high-income countries. The formalization challenge is concentrated in the periphery, not the center." },
      { label: 'Current pace is too slow for 2045', text: 'The national informality rate was 68.5% in 2021 under the current ILO-aligned methodology. Note: pre-2021 figures used a different definition excluding agriculture and are not directly comparable to this measure.' },
    ],
    agricultural: [
      { label: 'Agriculture is where most informal employment lives', text: 'Nearly all agricultural workers (97.9%, ILO/GSO 2021) are informally employed. Conventional formalization policy designed for urban wage workers cannot reach this sector without entirely different instruments.' },
      { label: 'Mekong Delta is a fiscal dead zone', text: "The Mekong Delta's rice-farming provinces combine extreme agricultural density with near-total informality. These workers generate output but contribute essentially nothing to the formal tax base." },
      { label: 'Definition matters for policy design', text: "Vietnam publishes two informality indicators: one including and one excluding agriculture and forestry. The broader ILO-aligned measure (used here) is 12 percentage points higher than the older narrower measure. Which number you use determines which policy you design." },
    ],
    nonAgInformal: [
      { label: 'This is a derived, calculated indicator', text: 'Non-agricultural informal employment is calculated as the provincial informal rate minus the agricultural employment share. It is an approximation of urban and service-sector informality. See data notes.', },
      { label: 'High non-ag informality signals active barriers to formalization', text: 'Provinces with moderate overall informality but high non-agricultural informal rates suggest formal sector growth alone is not pulling workers across the threshold. Workers are not registering even when formal employment is nearby.' },
      { label: 'This is where contribution rate reform has the most direct impact', text: 'Non-agricultural informal work operates in environments where registration and social insurance reform can have real traction. The barrier is cost and complexity, not geography.' },
    ],
    urbanization: [
      { label: 'Urbanization predicts formalization better than income', text: 'The correlation between urban share and low informality is strong across provinces. Urban wage employment naturally generates taxable payroll records; rural self-employment structurally does not.' },
      { label: 'Industrial zones are doing what administrative reform cannot', text: 'Provinces like Binh Duong and Dong Nai, anchored by large export manufacturing zones, show both high urbanization and relatively low informality. FDI-driven manufacturing is the most powerful formalization engine in the data.' },
      { label: 'The urbanization gap sets a structural ceiling', text: 'Vietnam would need to urbanize an additional 15 to 20 percentage points to match the structural composition of high-income peers. Fiscal policy can support but not shortcut that generational shift.' },
    ],
    sidewalk: [
      { label: 'This is an estimated, derived indicator', text: 'Sidewalk economy share is estimated by applying a 5% of urban employment rate (Huynh 2023) to each province\'s urban employment share. It is an approximation, not a direct survey measure. See data notes.' },
      { label: 'Vendor bans displace, they do not formalize', text: "Hanoi's 2008 street vendor ban drove workers to less visible locations. Turner and Schoenberger (2011) documented that vendors learned which officials had fining authority and adapted their movements. Enforcement without benefit reform does not produce formalization." },
      { label: 'Designated zones outperform bans', text: 'High sidewalk density along coastal tourist routes reflects demand-driven informal services. Simplified licensing and designated vending areas have more traction here than enforcement campaigns.' },
    ],
    totalEmployment: [
      { label: 'Scale determines fiscal weight', text: 'Large-employment provinces generate disproportionate tax revenue even at similar informality rates. Small formalization gains in HCMC or Hanoi outweigh large gains in low-population provinces in absolute fiscal terms.' },
      { label: 'The formal tax base is geographically concentrated', text: "Vietnam's current tax revenue depends on a narrow concentration of compliant employers and wage workers in the two largest cities. This concentration itself is a fiscal vulnerability." },
    ],
    ruralPopulation: [
      { label: 'Rural share and informality are nearly synonymous', text: 'Provinces with the highest rural population share almost universally have the highest informality rates. This indicator is derived (100 minus urban share) and approximates structural agricultural informality. See data notes.' },
      { label: 'Rural-urban migration is the natural formalization engine', text: "As workers move to cities and enter wage employment, they automatically enter the formal system. Vietnam's urbanization since Doi Moi explains much of the gradual informality decline observed over the past decade." },
      { label: 'Place-based policy is needed for the most rural provinces', text: 'The Central Highlands and Northern Midlands cannot formalize through urban migration alone. Extending social protection to farmers where they are, without requiring formal registration, may be the only viable path.' },
    ],
  };

  const currentConfig = mapConfigs[activeTab];

  const getColor = (value, config) => {
    if (!value || isNaN(value)) return '#e5e7eb';
    for (let i = 0; i < config.colorScale.length; i++) {
      if (value < config.colorScale[i].threshold) return config.colorScale[i].color;
    }
    return config.colorScale[config.colorScale.length - 1].color;
  };

  const getProvinceValue = (name) => {
    let d = completeMapData[name];
    if (!d) for (const [k, v] of Object.entries(completeMapData)) {
      if (k.toLowerCase().includes(name.toLowerCase()) || name.toLowerCase().includes(k.toLowerCase())) { d = v; break; }
    }
    if (!d) return null;
    if (currentConfig.dataKey === 'non_ag_informal_pct') return Math.max(0, d.informal_pct - d.agricultural_pct);
    if (currentConfig.dataKey === 'rural_pct') return 100 - d.urban_pct_gso_2024;
    return d[currentConfig.dataKey];
  };

  const getProvinceData = (name) => {
    if (completeMapData[name]) return completeMapData[name];
    for (const [k, v] of Object.entries(completeMapData)) {
      if (k.toLowerCase().includes(name.toLowerCase()) || name.toLowerCase().includes(k.toLowerCase())) return v;
    }
    return null;
  };

  const isUrbanFiltered = (name) => {
    if (urbanFilter === 'all') return true;
    const d = getProvinceData(name);
    if (!d?.urban_pct_gso_2024) return false;
    return d.urban_pct_gso_2024 >= parseInt(urbanFilter);
  };

  const stats = useMemo(() => {
    const vals = Object.values(completeMapData).map(p => p[currentConfig.dataKey]).filter(v => v != null && !isNaN(v));
    if (!vals.length) return { max: 'N/A', min: 'N/A', avg: 'N/A' };
    const fmt = v => currentConfig.unit === '%' ? v.toFixed(1) + '%' : currentConfig.unit === 'k' ? (v / 1000).toFixed(0) + 'k' : v.toFixed(1);
    return { max: fmt(Math.max(...vals)), min: fmt(Math.min(...vals)), avg: fmt(vals.reduce((a, b) => a + b, 0) / vals.length) };
  }, [activeTab, currentConfig]);

  const project = ([lon, lat]) => [((lon - 102) / 8) * 500, 900 - ((lat - 8) / 16) * 900];

  const geoToPath = (coords) => {
    const isMulti = Array.isArray(coords[0][0][0]);
    const rings = isMulti ? coords.flat() : coords;
    return rings.map(ring => ring.map(([...pt], i) => { const [x, y] = project(pt); return `${i === 0 ? 'M' : 'L'}${x},${y}`; }).join(' ') + ' Z').join(' ');
  };

  const fmtVal = v => {
    if (v == null || isNaN(v)) return 'N/A';
    return currentConfig.unit === '%' ? v.toFixed(1) + '%' : currentConfig.unit === 'k' ? (v / 1000).toFixed(1) + 'k' : v.toFixed(2);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', fontFamily: '"Inter", sans-serif' }}>
      <div style={{ display: 'flex', flex: 1, background: '#f5f3f0', overflow: 'hidden' }}>

        {/* SIDEBAR */}
        <div style={{ width: sidebarOpen ? '380px' : '0', background: '#1a1a1a', borderRight: '1px solid #2a2a2a', overflow: 'hidden', transition: 'width 0.3s', display: 'flex', flexDirection: 'column', flexShrink: 0 }}>

          <div style={{ padding: '20px 24px', borderBottom: '1px solid #2a2a2a' }}>
            <button onClick={onBack} style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.6)', padding: '6px 14px', fontSize: '12px', fontWeight: '600', cursor: 'pointer', fontFamily: '"Inter", sans-serif', marginBottom: '14px', borderRadius: '3px' }}>← Back to Overview</button>
            <div style={{ fontSize: '10px', fontWeight: '700', color: '#4dd0c4', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '6px' }}>Part II · Geographic Data</div>
            <h1 style={{ margin: '0 0 12px', fontSize: '18px', fontWeight: '300', color: 'white', fontFamily: '"Cormorant Garamond", serif' }}>Provincial employment patterns</h1>
            <button onClick={() => onNavigate('case-studies')} style={{ background: 'rgba(14,116,144,0.15)', border: '1px solid rgba(14,116,144,0.4)', color: '#67e8f9', padding: '6px 12px', fontSize: '11px', fontWeight: '600', cursor: 'pointer', fontFamily: '"Inter", sans-serif', borderRadius: '3px' }}>
              → Chile &amp; South Korea Case Studies
            </button>
          </div>

          <div style={{ background: '#111', borderBottom: '1px solid #2a2a2a', padding: '12px 16px' }}>
            <div style={{ fontSize: '11px', fontWeight: '600', color: '#4dd0c4', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '1px' }}>Select Indicator</div>
            {Object.entries(mapConfigs).map(([key, cfg]) => (
              <button key={key} onClick={() => { setActiveTab(key); setSelectedProvince(null); setSidebarTab('facts'); }}
                style={{ display: 'block', width: '100%', padding: '9px 12px', marginBottom: '5px', border: activeTab === key ? '1px solid #4dd0c4' : '1px solid #2a2a2a', background: activeTab === key ? 'rgba(77,208,196,0.1)' : 'transparent', color: activeTab === key ? '#4dd0c4' : 'rgba(255,255,255,0.55)', fontWeight: activeTab === key ? '600' : '400', fontSize: '13px', cursor: 'pointer', borderRadius: '3px', textAlign: 'left', fontFamily: '"Inter", sans-serif' }}>
                {cfg.title}
                {['nonAgInformal', 'ruralPopulation', 'sidewalk'].includes(key) && <span style={{ fontSize: '9px', color: '#f97316', marginLeft: '8px' }}>DERIVED</span>}
              </button>
            ))}
          </div>

          <div style={{ flex: 1, overflowY: 'auto', padding: '20px 24px' }}>
            {selectedProvince ? (
              <div>
                <div style={{ fontSize: '11px', fontWeight: '600', color: '#4dd0c4', marginBottom: '12px', textTransform: 'uppercase' }}>Selected Province</div>
                <h2 style={{ margin: '0 0 20px', fontSize: '22px', fontWeight: '300', color: 'white', fontFamily: '"Cormorant Garamond", serif' }}>{selectedProvince}</h2>
                <div style={{ background: 'rgba(77,208,196,0.08)', padding: '16px', marginBottom: '20px', borderLeft: '3px solid #4dd0c4' }}>
                  <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', marginBottom: '4px' }}>{currentConfig.title}</div>
                  <div style={{ fontSize: '36px', fontWeight: '300', color: 'white', fontFamily: '"Cormorant Garamond", serif' }}>{fmtVal(getProvinceValue(selectedProvince))}</div>
                </div>
                {Object.entries(mapConfigs).map(([key, cfg]) => {
                  const pd = getProvinceData(selectedProvince);
                  const val = pd?.[cfg.dataKey];
                  return (
                    <div key={key} style={{ borderBottom: '1px solid #2a2a2a', padding: '10px 0', display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.55)' }}>{cfg.title}</span>
                      <span style={{ fontSize: '15px', fontWeight: '600', color: 'white' }}>{val != null && !isNaN(val) ? (cfg.unit === '%' ? val.toFixed(1) + '%' : cfg.unit === 'k' ? (val / 1000).toFixed(1) + 'k' : val.toFixed(1)) : 'N/A'}</span>
                    </div>
                  );
                })}
                <button onClick={() => setSelectedProvince(null)} style={{ width: '100%', marginTop: '16px', padding: '10px', background: 'transparent', border: '1px solid #2a2a2a', color: 'rgba(255,255,255,0.5)', fontSize: '13px', cursor: 'pointer', fontFamily: '"Inter", sans-serif' }}>Clear Selection</button>
              </div>
            ) : (
              <div>
                <h2 style={{ margin: '0 0 4px', fontSize: '17px', fontWeight: '300', color: 'white', fontFamily: '"Cormorant Garamond", serif' }}>{currentConfig.title}</h2>
                <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.35)', lineHeight: '1.5', margin: '0 0 16px', fontFamily: '"Inter", sans-serif' }}>{currentConfig.description}</p>

                <div style={{ display: 'flex', gap: '2px', marginBottom: '20px', background: '#111', padding: '3px' }}>
                  {[['facts', 'Basic Facts'], ['insights', 'Insights']].map(([id, lbl]) => (
                    <button key={id} onClick={() => setSidebarTab(id)} style={{ flex: 1, padding: '7px 0', fontSize: '12px', fontWeight: '600', fontFamily: '"Inter", sans-serif', border: 'none', cursor: 'pointer', background: sidebarTab === id ? '#4dd0c4' : 'transparent', color: sidebarTab === id ? '#111' : 'rgba(255,255,255,0.4)', transition: 'all 0.15s' }}>{lbl}</button>
                  ))}
                </div>

                {sidebarTab === 'facts' && (
                  <div>
                    <div style={{ background: 'rgba(255,255,255,0.04)', padding: '16px', marginBottom: '12px', borderLeft: '1px solid #2a2a2a' }}>
                      {[['Minimum', stats.min, '#22c55e'], ['Mean', stats.avg, '#4dd0c4'], ['Maximum', stats.max, '#dc2626']].map(([lbl, val, col]) => (
                        <div key={lbl} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                          <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)' }}>{lbl}</span>
                          <span style={{ fontSize: '16px', fontWeight: '600', color: col }}>{val}</span>
                        </div>
                      ))}
                    </div>
                    <div style={{ background: 'rgba(77,208,196,0.08)', padding: '12px', borderLeft: '3px solid #4dd0c4', fontSize: '13px', color: 'rgba(255,255,255,0.55)', lineHeight: '1.5' }}>
                      Click any province on the map to view all its indicators.
                    </div>
                  </div>
                )}

                {sidebarTab === 'insights' && (
                  <div>
                    {(mapInsights[activeTab] || []).map((ins, i) => (
                      <div key={i} style={{ marginBottom: '16px', paddingBottom: '16px', borderBottom: '1px solid #2a2a2a' }}>
                        <div style={{ fontSize: '13px', fontWeight: '600', color: 'white', marginBottom: '6px', lineHeight: '1.3' }}>{ins.label}</div>
                        <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', lineHeight: '1.65' }}>{ins.text}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          <div style={{ padding: '10px 24px', borderTop: '1px solid #2a2a2a', background: '#0d0d0d', fontSize: '10px', color: 'rgba(255,255,255,0.2)', lineHeight: '1.5' }}>
            GSO LFS 2023 · GSO 2024 · Indicators marked DERIVED are calculated from primary data. Non-ag informal = informal minus agricultural share. Rural = 100 minus urban. Sidewalk = 5% of urban employment (Huynh 2023).
          </div>
        </div>

        {/* MAP */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', position: 'relative' }}>
          <div style={{ position: 'absolute', top: '20px', left: '20px', zIndex: 100, display: 'flex', gap: '8px' }}>
            <button onClick={() => setSidebarOpen(!sidebarOpen)} style={{ background: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: '3px', padding: '8px 12px', cursor: 'pointer', fontSize: '12px', fontWeight: '600', color: 'rgba(255,255,255,0.6)' }}>{sidebarOpen ? '◀ Hide' : '▶ Show'} Panel</button>
            <button onClick={() => setUrbanFilter(urbanFilter === 'all' ? '50' : urbanFilter === '50' ? '70' : 'all')} style={{ background: urbanFilter !== 'all' ? '#4dd0c4' : '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: '3px', padding: '8px 12px', cursor: 'pointer', fontSize: '12px', fontWeight: '600', color: urbanFilter !== 'all' ? '#1a1a1a' : 'rgba(255,255,255,0.6)', whiteSpace: 'nowrap' }}>
              {urbanFilter === 'all' ? 'Urban Filter: Off' : urbanFilter === '50' ? 'Urban >50%' : 'Urban >70%'}
            </button>
          </div>

          <div style={{ position: 'absolute', bottom: '80px', right: '20px', background: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: '3px', padding: '16px', zIndex: 100, minWidth: '180px' }}>
            <div style={{ fontSize: '11px', fontWeight: '700', color: '#4dd0c4', marginBottom: '10px', letterSpacing: '1px', textTransform: 'uppercase' }}>{currentConfig.title}</div>
            {currentConfig.colorScale.map(({ color, label }) => (
              <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '5px' }}>
                <div style={{ width: '22px', height: '14px', backgroundColor: color, borderRadius: '2px' }} />
                <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.6)' }}>{label}</span>
              </div>
            ))}
          </div>

          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px', background: '#f5f3f0', position: 'relative' }}>
            <svg viewBox="0 0 500 900" style={{ width: '100%', height: '100%', maxWidth: '600px', maxHeight: '900px', filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.15))' }}>
              {vietnamGeoData.features.map((feat, idx) => {
                const name = feat.properties.NAME_1;
                const val = getProvinceValue(name);
                const isSel = selectedProvince === name;
                const isHov = hoveredProvince === name;
                return (
                  <path key={idx} d={geoToPath(feat.geometry.coordinates)}
                    fill={getColor(val, currentConfig)}
                    stroke={isSel || isHov ? '#4dd0c4' : '#e8e4e0'}
                    strokeWidth={isSel ? 3 : isHov ? 2 : 0.5}
                    style={{ cursor: 'pointer', transition: 'all 0.2s', filter: isHov ? 'brightness(1.1)' : 'none', opacity: isUrbanFiltered(name) ? 1 : 0.15 }}
                    onClick={() => setSelectedProvince(name)}
                    onMouseEnter={() => setHoveredProvince(name)}
                    onMouseLeave={() => setHoveredProvince(null)}>
                    <title>{`${name}: ${fmtVal(val)}`}</title>
                  </path>
                );
              })}
            </svg>
            {hoveredProvince && !selectedProvince && (
              <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', background: '#1a1a1a', border: '1px solid #4dd0c4', borderRadius: '3px', padding: '16px', pointerEvents: 'none', zIndex: 200 }}>
                <div style={{ fontSize: '14px', fontWeight: '600', color: 'white', marginBottom: '4px', fontFamily: '"Cormorant Garamond", serif' }}>{hoveredProvince}</div>
                <div style={{ fontSize: '24px', fontWeight: '300', color: '#4dd0c4', fontFamily: '"Cormorant Garamond", serif' }}>{fmtVal(getProvinceValue(hoveredProvince))}</div>
                <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', marginTop: '4px' }}>Click to view details</div>
              </div>
            )}
          </div>

          <FooterNav
            onBack={onBack}
            prev={{ page: 'informal-explainer', label: 'Part I: The Informal Economy' }}
            next={{ page: 'vietnam2045', label: 'Part III: Vietnam 2045' }}
            onNavigate={onNavigate}
          />
        </div>
      </div>
    </div>
  );
}

// ========================================
// MAIN APP
// ========================================
function App() {
  const [currentPage, setCurrentPage] = useState('landing');
  const savedScrollY = useRef(0);

  const navigate = (page) => {
    if (page !== 'landing') savedScrollY.current = window.scrollY;
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const goBack = () => {
    setCurrentPage('landing');
    const saved = savedScrollY.current;
    requestAnimationFrame(() => requestAnimationFrame(() => window.scrollTo({ top: saved, behavior: 'instant' })));
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'landing':          return <LandingPage onNavigate={navigate} />;
      case 'maps':             return <InteractiveMaps onBack={goBack} onNavigate={navigate} />;
      case 'informal-explainer': return <InformalExplainer onBack={goBack} onNavigate={navigate} />;
      case 'exec-summary':     return <ExecutiveSummary onBack={goBack} onNavigate={navigate} />;
      case 'fiscal':           return <FiscalCalculator onBack={goBack} onNavigate={navigate} />;
      case 'vietnam2045':      return <Vietnam2045 onBack={goBack} onNavigate={navigate} />;
      case 'case-studies':     return <CaseStudies onBack={goBack} onNavigate={navigate} />;
      case 'policy':           return <PolicyRecommendations onBack={goBack} onNavigate={navigate} />;
      default:                 return <LandingPage onNavigate={navigate} />;
    }
  };

  return renderPage();
}

export default App;
