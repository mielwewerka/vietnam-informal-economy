// ========================================
// VIETNAM INFORMAL ECONOMY PROJECT
// ========================================

import React, { useState, useMemo, useEffect } from 'react';
import vietnamGeoData from './data/vietnamGeoData.json';
import completeMapData from './data/completeMapData.json';
import InformalExplainer from './components/InformalExplainer';
import Vietnam2045 from './components/Vietnam2045';
import CaseStudies from './components/CaseStudies';
import FiscalCalculator from './components/FiscalCalculator';
import ExecutiveSummary from './components/ExecutiveSummary';

// ========================================
// MAP CONFIGURATIONS
// ========================================
const mapConfigs = {
  informal: {
    title: "Informal Employment",
    dataKey: "informal_pct",
    unit: "%",
    description: "Informal data from GSO Labor Force Survey 2023",
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
    description: "Percentage of workers in agriculture sector",
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
    description: "Total employed workers (in thousands)",
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
    description: "Sidewalk economy = 5% of urban employment (Huynh 2023)",
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
    description: "Urban population percentage (GSO 2024)",
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
    description: "Informal employment outside of agriculture. Derived from GSO LFS 2023.",
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
    description: "Share of provincial population living in rural areas. GSO 2023.",
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
// LANDING PAGE
// ========================================
function LandingPage({ onNavigate }) {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navVisible = scrollY > 300;

  const TEAL = '#00897b';
  const TEAL_BRIGHT = '#4dd0c4';

  const chapters = [
    {
      num: 'I',
      page: 'informal-explainer',
      title: 'What is the Informal Economy',
      subtitle: 'Who works outside the economy and why',
      body: 'From the 1986 Doi Moi reforms to the 2008 Hanoi street vendor ban, the history of how Vietnam\'s informal economy was created, who it employs, and why it has proved so hard to escape.',
      color: TEAL,
    },
    {
      num: 'II',
      page: 'maps',
      title: 'Interactive Maps and Case Studies',
      subtitle: 'Concentration of Informality and 2 Case Studies',
      body: 'Seven provincial indicators across all 63 provinces, and a look into the fiscal paths of Chile and Korea.',
      color: '#1e6fa8',
    },
    {
      num: 'III',
      page: 'vietnam2045',
      title: 'Vietnam 2045',
      subtitle: 'Vietnam\'s fiscal ambition and gap',
      body: 'Vietnam is pushing toward high-income status by its centennial. What it needs to get there — sustained tax revenue, social insurance, public investment — all depend on an economy that currently represents barely a third of the workforce.',
      color: '#7c3aed',
    },
    {
      num: 'IV',
      page: 'fiscal',
      title: 'Policy Model',
      subtitle: 'What formalization would actually mean for the tax base',
      body: 'An interactive fiscal model: adjust the formalization rate, see the projected revenue from social insurance, income tax, and VAT. The numbers behind the policy argument.',
      color: '#c2410c',
    },
  ];

  return (
    <div style={{ fontFamily: '"Georgia", "Times New Roman", serif', background: '#0f0f0f', color: 'white' }}>

      {/* ── STICKY NAV ─────────────────────────────── */}
      <div style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
        background: 'rgba(15,15,15,0.97)', borderBottom: '1px solid #222',
        padding: '14px 48px', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        backdropFilter: 'blur(8px)',
        transform: navVisible ? 'translateY(0)' : 'translateY(-100%)',
        transition: 'transform 0.35s ease',
      }}>
        <span style={{ fontSize: '14px', color: 'rgba(255,255,255,0.5)', fontFamily: '"Inter", sans-serif', letterSpacing: '0.3px' }}>
          Vietnam's Invisible Workforce
        </span>
        <div style={{ display: 'flex', gap: '32px' }}>
          {chapters.map(c => (
            <button key={c.page} onClick={() => onNavigate(c.page)} style={{
              background: 'none', border: 'none', cursor: 'pointer',
              fontSize: '12px', fontWeight: '500', color: 'rgba(255,255,255,0.45)',
              fontFamily: '"Inter", sans-serif', letterSpacing: '0.3px',
              transition: 'color 0.2s',
            }}>
              Part {c.num}: {c.title}
            </button>
          ))}
        </div>
      </div>

      {/* ── HERO ───────────────────────────────────── */}
      <div style={{ position: 'relative', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', overflow: 'hidden' }}>

        {/* Background image with dark overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'url(https://raw.githubusercontent.com/mielwewerka/vietnam-informal-economy/main/vietnam-street.jpg)',
          backgroundSize: 'cover', backgroundPosition: 'center 40%',
          backgroundColor: '#1a1a1a',
        }} />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.55) 50%, rgba(10,10,10,0.92) 85%, #0f0f0f 100%)',
        }} />

        {/* Top teal line */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: `linear-gradient(90deg, ${TEAL}, transparent)` }} />

        {/* Course label top-left */}
        <div style={{ position: 'absolute', top: '32px', left: '48px', fontSize: '11px', fontWeight: '700', color: 'rgba(255,255,255,0.45)', letterSpacing: '2.5px', textTransform: 'uppercase', fontFamily: '"Inter", sans-serif' }}>
          ECON 62 · Topics in Macroeconomics · Winter 2026
        </div>

        {/* Hero text — bottom-anchored */}
        <div style={{ position: 'relative', padding: '0 48px 72px', maxWidth: '900px' }}>
          <h1 style={{
            fontSize: 'clamp(44px, 7vw, 88px)',
            fontWeight: '400', lineHeight: '1.0',
            margin: '0 0 28px 0', letterSpacing: '-2px',
            color: 'white',
          }}>
            Vietnam's<br />Invisible<br />Workforce
          </h1>
          <p style={{
            fontSize: 'clamp(17px, 2vw, 22px)',
            color: 'rgba(255,255,255,0.65)',
            lineHeight: '1.65', margin: '0 0 40px 0',
            maxWidth: '580px', fontStyle: 'italic', fontWeight: '400',
          }}>
            Vietnam is racing toward high-income status by 2045. It has the growth rate,
            the political will, and the manufacturing base. What it doesn't have is a tax
            base — because 64.5% of its workers are invisible to the state.
          </p>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
            <button onClick={() => onNavigate('informal-explainer')} style={{
              background: TEAL_BRIGHT, color: '#0f0f0f', border: 'none',
              padding: '14px 32px', fontSize: '13px', fontWeight: '700',
              cursor: 'pointer', letterSpacing: '0.8px', textTransform: 'uppercase',
              fontFamily: '"Inter", sans-serif',
            }}>
              Begin Reading →
            </button>
            <button onClick={() => onNavigate('exec-summary')} style={{
              background: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.85)',
              border: '1px solid rgba(255,255,255,0.35)',
              padding: '13px 24px', fontSize: '12px', fontWeight: '600',
              cursor: 'pointer', letterSpacing: '0.8px', textTransform: 'uppercase',
              fontFamily: '"Inter", sans-serif',
            }}>
              Executive Summary
            </button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{
          position: 'absolute', bottom: '28px', left: '50%', transform: 'translateX(-50%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px',
        }}>
          <span style={{ fontSize: '10px', fontWeight: '600', color: 'rgba(255,255,255,0.3)', letterSpacing: '2px', textTransform: 'uppercase', fontFamily: '"Inter", sans-serif' }}>Scroll</span>
          <div style={{ animation: 'bounce 1.8s infinite' }}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M3 6l6 6 6-6" stroke="rgba(255,255,255,0.35)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
        <style>{`@keyframes bounce { 0%,100%{transform:translateY(0)}50%{transform:translateY(5px)} }`}</style>
      </div>

      {/* ── STAT STRIP ─────────────────────────────── */}
      <div style={{ background: '#111', borderTop: '1px solid #1e1e1e', borderBottom: '1px solid #1e1e1e' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1px', background: '#1e1e1e' }}>
          {[
            ['64.5%', 'of workers are informally employed', 'GSO Labor Force Survey 2023'],
            ['35M+', 'workers outside the formal economy', 'ILO estimate, 2021'],
            ['18–19%', 'tax-to-GDP ratio — low by regional standards', 'World Bank, 2023'],
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

      {/* ── CONTEXT BLURB ───────────────────────────── */}
      <div style={{ background: '#0f0f0f', padding: '56px 48px 0' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', borderBottom: '1px solid #1a1a1a', paddingBottom: '56px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2px', background: '#1a1a1a' }}>
            {/* Left: what this is */}
            <div style={{ background: '#0f0f0f', padding: '36px 40px' }}>
              <div style={{ fontSize: '11px', fontWeight: '700', color: TEAL_BRIGHT, letterSpacing: '2.5px', textTransform: 'uppercase', marginBottom: '16px', fontFamily: '"Inter", sans-serif' }}>About This Project</div>
              <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.6)', lineHeight: '1.8', margin: '0 0 20px 0', fontFamily: '"Inter", sans-serif' }}>
                This project examines Vietnam's informal economy — the 64.5% of workers who operate outside formal employment — and what it means for the country's ability to fund its 2045 development ambitions.
              </p>
              <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.6)', lineHeight: '1.8', margin: 0, fontFamily: '"Inter", sans-serif' }}>
                It is structured as a four-part argument: from the historical origins of informality, through provincial-level geographic evidence, to a policy analysis and interactive fiscal model.
              </p>
            </div>
            {/* Right: the central question, styled as pull quote */}
            <div style={{ background: '#111', padding: '36px 40px', display: 'flex', flexDirection: 'column', justifyContent: 'center', borderLeft: `4px solid ${TEAL}` }}>
              <div style={{ fontSize: '11px', fontWeight: '700', color: TEAL, letterSpacing: '2.5px', textTransform: 'uppercase', marginBottom: '20px', fontFamily: '"Inter", sans-serif' }}>The Central Question</div>
              <p style={{ fontSize: 'clamp(20px, 2.2vw, 26px)', color: 'white', lineHeight: '1.45', margin: '0 0 20px 0', letterSpacing: '-0.3px', fontStyle: 'italic', fontWeight: '400' }}>
                Can Vietnam afford its 2045 ambitions with two-thirds of its workforce off the books?
              </p>
              <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.4)', lineHeight: '1.7', margin: 0, fontFamily: '"Inter", sans-serif' }}>
                Achieving high-income status requires sustained public investment in infrastructure, education, and social protection — all of which depend on a tax base that informal employment structurally constrains.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── THESIS ─────────────────────────────────── */}
      <div style={{ background: '#0f0f0f', padding: '100px 48px' }}>
        <div style={{ maxWidth: '760px', margin: '0 auto' }}>
          <div style={{ width: '40px', height: '3px', background: TEAL_BRIGHT, marginBottom: '40px' }} />
          <h2 style={{
            fontSize: 'clamp(26px, 3.5vw, 42px)',
            fontWeight: '400', lineHeight: '1.25',
            color: 'white', margin: '0 0 32px 0', letterSpacing: '-0.5px',
          }}>
            Vietnam's development story is usually told through GDP growth and poverty reduction.
            This project tells it through the other number.
          </h2>
          <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.6)', lineHeight: '1.85', margin: '0 0 20px 0', fontFamily: '"Inter", sans-serif', fontWeight: '400' }}>
            64.5% — that's the share of workers the state cannot see, cannot tax, and cannot protect.
            It is the number that could derail everything else. Informal workers pay no income tax,
            contribute no social insurance, and generate no VAT. Their employers, if they have them,
            often avoid payroll taxes entirely. The fiscal gap this creates is not incidental to
            Vietnam's development challenge. It is the challenge.
          </p>
          <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.6)', lineHeight: '1.85', margin: 0, fontFamily: '"Inter", sans-serif', fontWeight: '400' }}>
            This project maps that reality province by province, quantifies its fiscal consequences,
            and asks what formalization would actually require — and cost — for workers and the state alike.
          </p>
        </div>
      </div>

      {/* ── PART CARDS ──────────────────────────── */}
      <div style={{ background: '#0a0a0a', borderTop: '1px solid #1a1a1a', padding: '56px 48px 64px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

          <div style={{ display: 'flex', alignItems: 'baseline', gap: '16px', marginBottom: '36px' }}>
            <div style={{ fontSize: '11px', fontWeight: '700', color: TEAL_BRIGHT, letterSpacing: '2.5px', textTransform: 'uppercase', fontFamily: '"Inter", sans-serif' }}>The Argument in Four Parts</div>
            <div style={{ flex: 1, height: '1px', background: '#1e1e1e' }} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '2px', background: '#1a1a1a' }}>
            {chapters.map((c) => (
              <div
                key={c.num}
                onClick={() => onNavigate(c.page)}
                style={{
                  background: '#0f0f0f', padding: '32px 36px',
                  cursor: 'pointer', borderTop: `3px solid ${c.color}`,
                  transition: 'background 0.2s',
                  display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
                }}
                onMouseEnter={e => e.currentTarget.style.background = '#141414'}
                onMouseLeave={e => e.currentTarget.style.background = '#0f0f0f'}
              >
                <div>
                  <span style={{ fontSize: '11px', fontWeight: '700', color: c.color, fontFamily: '"Inter", sans-serif', letterSpacing: '1.5px' }}>PART {c.num}</span>
                  <h3 style={{ fontSize: '24px', fontWeight: '400', color: 'white', margin: '10px 0 6px', letterSpacing: '-0.3px', lineHeight: '1.2' }}>{c.title}</h3>
                  <p style={{ fontSize: '13px', color: c.color, fontFamily: '"Inter", sans-serif', fontWeight: '500', margin: '0 0 16px 0' }}>{c.subtitle}</p>
                  <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.55)', lineHeight: '1.7', margin: '0 0 24px 0', fontFamily: '"Inter", sans-serif' }}>{c.body}</p>
                </div>
                <div style={{
                  display: 'inline-flex', alignItems: 'center', gap: '8px',
                  fontSize: '13px', fontWeight: '700', color: c.color,
                  fontFamily: '"Inter", sans-serif', letterSpacing: '0.5px',
                  borderTop: `1px solid rgba(255,255,255,0.07)`, paddingTop: '16px',
                }}>
                  <span style={{
                    background: c.color, color: 'white',
                    fontSize: '11px', fontWeight: '700', letterSpacing: '1px',
                    padding: '5px 12px', textTransform: 'uppercase',
                  }}>
                    Read Part {c.num} →
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── FOOTER ─────────────────────────────────── */}
      <div style={{ background: '#080808', borderTop: '1px solid #161616', padding: '32px 48px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.2)', margin: 0, fontFamily: '"Inter", sans-serif' }}>
          ECON 62 — Topics in Macroeconomics · Winter 2026
        </p>
        <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.15)', margin: 0, fontFamily: '"Inter", sans-serif' }}>
          Data: GSO LFS 2023 · World Bank · ILO
        </p>
      </div>

    </div>
  );
}

// ========================================
// PLACEHOLDER
// ========================================
function PlaceholderPage({ title, description, onBack }) {
  return (
    <div style={{ minHeight: '100vh', background: '#fafafa', fontFamily: '"Inter", sans-serif' }}>
      <div style={{ background: 'white', borderBottom: '1px solid #e0e0e0', padding: '24px 40px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <button onClick={onBack} style={{ background: 'transparent', color: '#00bfa5', padding: '8px 16px', fontSize: '14px', fontWeight: '600', border: '1px solid #00bfa5', borderRadius: '4px', cursor: 'pointer', marginBottom: '16px' }}>← Back to Overview</button>
          <h1 style={{ margin: 0, fontSize: '32px', fontWeight: '600', color: '#333' }}>{title}</h1>
        </div>
      </div>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '60px 40px' }}>
        <div style={{ background: 'white', border: '1px solid #e0e0e0', borderRadius: '4px', padding: '48px' }}>
          <p style={{ fontSize: '16px', color: '#666', lineHeight: '1.6', marginBottom: '24px' }}>{description}</p>
        </div>
      </div>
    </div>
  );
}

// ========================================
// INTERACTIVE MAPS
// ========================================
function InteractiveMaps({ onBack }) {
  const [showIntro, setShowIntro] = useState(true);
  const [activeTab, setActiveTab] = useState('informal');
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [hoveredProvince, setHoveredProvince] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [urbanFilter, setUrbanFilter] = useState('all');
  const [activeSection, setActiveSection] = useState('maps');

  const currentConfig = mapConfigs[activeTab];

  const getColor = (value, config) => {
    if (!value || value === null || isNaN(value)) return '#e5e7eb';
    for (let i = 0; i < config.colorScale.length; i++) {
      if (value < config.colorScale[i].threshold) return config.colorScale[i].color;
    }
    return config.colorScale[config.colorScale.length - 1].color;
  };

  const getProvinceValue = (provinceName) => {
    let pdata = completeMapData[provinceName];
    if (!pdata) {
      for (const [key, value] of Object.entries(completeMapData)) {
        if (key.toLowerCase().includes(provinceName.toLowerCase()) || provinceName.toLowerCase().includes(key.toLowerCase())) { pdata = value; break; }
      }
    }
    if (!pdata) return null;
    if (currentConfig.dataKey === 'non_ag_informal_pct') return Math.max(0, pdata.informal_pct - pdata.agricultural_pct);
    if (currentConfig.dataKey === 'rural_pct') return 100 - pdata.urban_pct_gso_2024;
    return pdata[currentConfig.dataKey];
  };

  const getProvinceData = (provinceName) => {
    if (completeMapData[provinceName]) return completeMapData[provinceName];
    for (const [key, value] of Object.entries(completeMapData)) {
      if (key.toLowerCase().includes(provinceName.toLowerCase()) || provinceName.toLowerCase().includes(key.toLowerCase())) return value;
    }
    return null;
  };

  const isUrbanFiltered = (provinceName) => {
    if (urbanFilter === 'all') return true;
    const data = getProvinceData(provinceName);
    const urbanPct = data?.urban_pct_gso_2024;
    if (urbanPct === null || urbanPct === undefined) return false;
    return urbanPct >= parseInt(urbanFilter);
  };

  const stats = useMemo(() => {
    const values = Object.values(completeMapData).map(p => p[currentConfig.dataKey]).filter(v => v !== null && v !== undefined && !isNaN(v));
    if (values.length === 0) return { max: 'N/A', min: 'N/A', avg: 'N/A' };
    const max = Math.max(...values);
    const min = Math.min(...values);
    const avg = values.reduce((a, b) => a + b, 0) / values.length;
    const fmt = (val) => { if (currentConfig.unit === '%') return val.toFixed(1) + '%'; if (currentConfig.unit === 'k') return (val / 1000).toFixed(0) + 'k'; return val.toFixed(1); };
    return { max: fmt(max), min: fmt(min), avg: fmt(avg) };
  }, [activeTab, currentConfig]);

  const geoToSVGPath = (coordinates, projection) => {
    const isMulti = Array.isArray(coordinates[0][0][0]);
    if (isMulti) {
      return coordinates.map(polygon => polygon.map(ring => ring.map((point, i) => { const [x, y] = projection(point); return `${i === 0 ? 'M' : 'L'}${x},${y}`; }).join(' ') + ' Z').join(' ')).join(' ');
    } else {
      return coordinates.map(ring => ring.map((point, i) => { const [x, y] = projection(point); return `${i === 0 ? 'M' : 'L'}${x},${y}`; }).join(' ') + ' Z').join(' ');
    }
  };

  const project = (coord) => {
    const [lon, lat] = coord;
    const x = ((lon - 102) / (110 - 102)) * 500;
    const y = 900 - ((lat - 8) / (24 - 8)) * 900;
    return [x, y];
  };

  const formatValue = (value) => {
    if (value === null || value === undefined || isNaN(value)) return 'N/A';
    if (currentConfig.unit === '%') return value.toFixed(1) + '%';
    if (currentConfig.unit === 'k') return (value / 1000).toFixed(1) + 'k';
    return value.toFixed(2);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', fontFamily: '"Inter", -apple-system, sans-serif' }}>

      {/* TAB BAR */}
      <div style={{ background: '#1a1a1a', padding: '0 24px', display: 'flex', borderBottom: '1px solid #2a2a2a', flexShrink: 0 }}>
        {[{ id: 'maps', label: 'Provincial Maps' }, { id: 'cases', label: 'Case Studies' }].map(tab => (
          <button key={tab.id} onClick={() => setActiveSection(tab.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '14px 20px', fontSize: '13px', fontWeight: '600', fontFamily: '"Inter", sans-serif', color: activeSection === tab.id ? '#4dd0c4' : 'rgba(255,255,255,0.45)', borderBottom: activeSection === tab.id ? '2px solid #4dd0c4' : '2px solid transparent', transition: 'color 0.2s' }}>{tab.label}</button>
        ))}
      </div>

      {/* CASE STUDIES */}
      {activeSection === 'cases' && <CaseStudies onBack={onBack} />}

      {/* MAPS */}
      {activeSection === 'maps' && (
        <div style={{ display: 'flex', flex: 1, background: '#f5f3f0', overflow: 'hidden' }}>

          {/* SIDEBAR */}
          <div style={{ width: sidebarOpen ? '380px' : '0', background: '#1a1a1a', borderRight: '1px solid #2a2a2a', overflow: 'hidden', transition: 'width 0.3s', display: 'flex', flexDirection: 'column', flexShrink: 0 }}>

            {/* Sidebar header */}
            <div style={{ background: '#1a1a1a', color: 'white', padding: '20px 24px', borderBottom: '1px solid #2a2a2a' }}>
              <button onClick={onBack} style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.6)', padding: '6px 14px', fontSize: '12px', fontWeight: '600', cursor: 'pointer', fontFamily: '"Inter", sans-serif', letterSpacing: '0.5px', marginBottom: '14px', borderRadius: '3px' }}>← Back to Overview</button>
              <div style={{ fontSize: '10px', fontWeight: '700', color: '#4dd0c4', letterSpacing: '2px', textTransform: 'uppercase', fontFamily: '"Inter", sans-serif', marginBottom: '6px' }}>Geographic Data</div>
              <h1 style={{ margin: 0, fontSize: '18px', fontWeight: '300', color: 'white', fontFamily: '"Cormorant Garamond", serif', letterSpacing: '-0.3px' }}>Provincial employment patterns</h1>
            </div>

            {/* Indicator selector */}
            <div style={{ background: '#111', borderBottom: '1px solid #2a2a2a', padding: '12px 16px' }}>
              <div style={{ fontSize: '11px', fontWeight: '600', color: '#4dd0c4', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '1px', fontFamily: '"Inter", sans-serif' }}>Select Indicator</div>
              {Object.entries(mapConfigs).map(([key, config]) => (
                <button key={key} onClick={() => { setActiveTab(key); setSelectedProvince(null); }} style={{ display: 'block', width: '100%', padding: '10px 12px', marginBottom: '6px', border: activeTab === key ? '1px solid #4dd0c4' : '1px solid #2a2a2a', background: activeTab === key ? 'rgba(77,208,196,0.1)' : 'transparent', color: activeTab === key ? '#4dd0c4' : 'rgba(255,255,255,0.55)', fontWeight: activeTab === key ? '600' : '400', fontSize: '13px', cursor: 'pointer', borderRadius: '3px', textAlign: 'left', transition: 'all 0.2s', fontFamily: '"Inter", sans-serif' }}>{config.title}</button>
              ))}
            </div>

            {/* Province info */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '20px 24px' }}>
              {selectedProvince ? (
                <div>
                  <div style={{ fontSize: '11px', fontWeight: '600', color: '#4dd0c4', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Selected Province</div>
                  <h2 style={{ margin: '0 0 20px 0', fontSize: '22px', fontWeight: '300', color: 'white', fontFamily: '"Cormorant Garamond", serif' }}>{selectedProvince}</h2>
                  <div style={{ background: 'rgba(77,208,196,0.08)', padding: '16px', marginBottom: '20px', borderLeft: '3px solid #4dd0c4' }}>
                    <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', marginBottom: '4px', fontWeight: '500' }}>{currentConfig.title}</div>
                    <div style={{ fontSize: '36px', fontWeight: '300', color: 'white', fontFamily: '"Cormorant Garamond", serif' }}>{formatValue(getProvinceValue(selectedProvince))}</div>
                  </div>
                  <div style={{ fontSize: '11px', fontWeight: '600', color: '#4dd0c4', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>All Indicators</div>
                  {Object.entries(mapConfigs).map(([key, config]) => {
                    const provinceData = getProvinceData(selectedProvince);
                    const val = provinceData?.[config.dataKey];
                    return (
                      <div key={key} style={{ borderBottom: '1px solid #2a2a2a', padding: '12px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.55)' }}>{config.title}</div>
                        <div style={{ fontSize: '16px', fontWeight: '600', color: 'white' }}>{val !== null && val !== undefined && !isNaN(val) ? (config.unit === '%' ? val.toFixed(1) + '%' : config.unit === 'k' ? (val/1000).toFixed(1) + 'k' : val.toFixed(1)) : 'N/A'}</div>
                      </div>
                    );
                  })}
                  <button onClick={() => setSelectedProvince(null)} style={{ width: '100%', marginTop: '20px', padding: '10px', background: 'transparent', border: '1px solid #2a2a2a', color: 'rgba(255,255,255,0.5)', fontSize: '13px', fontWeight: '500', cursor: 'pointer', fontFamily: '"Inter", sans-serif' }}>Clear Selection</button>
                </div>
              ) : (
                <div>
                  <div style={{ fontSize: '11px', fontWeight: '600', color: '#4dd0c4', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Current Indicator</div>
                  <h2 style={{ margin: '0 0 16px 0', fontSize: '22px', fontWeight: '300', color: 'white', fontFamily: '"Cormorant Garamond", serif' }}>{currentConfig.title}</h2>
                  <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.55)', lineHeight: '1.6', marginBottom: '20px' }}>{currentConfig.description}</p>
                  <div style={{ fontSize: '11px', fontWeight: '600', color: '#4dd0c4', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Summary Statistics</div>
                  <div style={{ background: 'rgba(255,255,255,0.04)', padding: '16px', marginBottom: '12px', borderLeft: '1px solid #2a2a2a' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}><span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)' }}>Minimum</span><span style={{ fontSize: '16px', fontWeight: '600', color: '#22c55e' }}>{stats.min}</span></div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}><span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)' }}>Mean</span><span style={{ fontSize: '16px', fontWeight: '600', color: '#4dd0c4' }}>{stats.avg}</span></div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)' }}>Maximum</span><span style={{ fontSize: '16px', fontWeight: '600', color: '#dc2626' }}>{stats.max}</span></div>
                  </div>
                  <div style={{ background: 'rgba(77,208,196,0.08)', padding: '12px', borderLeft: '3px solid #4dd0c4', fontSize: '13px', color: 'rgba(255,255,255,0.55)', lineHeight: '1.5' }}>Click any province to view detailed statistics.</div>
                </div>
              )}
            </div>
            <div style={{ padding: '16px 24px', borderTop: '1px solid #2a2a2a', background: '#111', fontSize: '11px', color: 'rgba(255,255,255,0.25)', fontFamily: '"Inter", sans-serif' }}>Data: GSO Labor Force Survey 2023</div>
          </div>

          {/* MAP AREA */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#f5f3f0', position: 'relative' }}>
            <div style={{ position: 'absolute', top: '20px', left: '20px', zIndex: 1000, display: 'flex', gap: '8px' }}>
              <button onClick={() => setSidebarOpen(!sidebarOpen)} style={{ background: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: '3px', padding: '8px 12px', cursor: 'pointer', fontSize: '12px', fontWeight: '600', color: 'rgba(255,255,255,0.6)', fontFamily: '"Inter", sans-serif' }}>{sidebarOpen ? '◀ Hide' : '▶ Show'} Panel</button>
              <button onClick={() => setUrbanFilter(urbanFilter === 'all' ? '50' : urbanFilter === '50' ? '70' : 'all')} style={{ background: urbanFilter !== 'all' ? '#4dd0c4' : '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: '3px', padding: '8px 12px', cursor: 'pointer', fontSize: '12px', fontWeight: '600', color: urbanFilter !== 'all' ? '#1a1a1a' : 'rgba(255,255,255,0.6)', fontFamily: '"Inter", sans-serif', whiteSpace: 'nowrap' }}>{urbanFilter === 'all' ? 'Urban Filter: Off' : urbanFilter === '50' ? 'Urban >50%' : 'Urban >70%'}</button>
            </div>
            <div style={{ position: 'absolute', bottom: '20px', right: '20px', background: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: '3px', padding: '16px', boxShadow: '0 2px 8px rgba(0,0,0,0.2)', zIndex: 1000, minWidth: '200px' }}>
              <div style={{ fontSize: '11px', fontWeight: '700', color: '#4dd0c4', marginBottom: '12px', letterSpacing: '1px', textTransform: 'uppercase', fontFamily: '"Inter", sans-serif' }}>{currentConfig.title}</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>{currentConfig.colorScale.map(({ color, label }) => (<div key={label} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><div style={{ width: '24px', height: '16px', backgroundColor: color, borderRadius: '2px' }}></div><span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.6)', fontFamily: '"Inter", sans-serif' }}>{label}</span></div>))}</div>
            </div>
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px', position: 'relative' }}>
              <svg viewBox="0 0 500 900" style={{ width: '100%', height: '100%', maxWidth: '600px', maxHeight: '900px', filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.15))' }}>
                {vietnamGeoData.features.map((feature, idx) => {
                  const provinceName = feature.properties.NAME_1;
                  const value = getProvinceValue(provinceName);
                  const fillColor = getColor(value, currentConfig);
                  const isSelected = selectedProvince === provinceName;
                  const isHovered = hoveredProvince === provinceName;
                  const pathData = geoToSVGPath(feature.geometry.coordinates, project);
                  return (
                    <path key={idx} d={pathData} fill={fillColor}
                      stroke={isSelected ? '#4dd0c4' : isHovered ? '#4dd0c4' : '#e8e4e0'}
                      strokeWidth={isSelected ? 3 : isHovered ? 2 : 0.5}
                      style={{ cursor: 'pointer', transition: 'all 0.2s', filter: isHovered ? 'brightness(1.1)' : 'none', opacity: isUrbanFiltered(provinceName) ? 1 : 0.15 }}
                      onClick={() => setSelectedProvince(provinceName)}
                      onMouseEnter={() => setHoveredProvince(provinceName)}
                      onMouseLeave={() => setHoveredProvince(null)}>
                      <title>{`${provinceName}: ${formatValue(value)}`}</title>
                    </path>
                  );
                })}
              </svg>
              {hoveredProvince && !selectedProvince && (
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', background: '#1a1a1a', border: '1px solid #4dd0c4', borderRadius: '3px', padding: '16px', boxShadow: '0 4px 12px rgba(0,0,0,0.3)', pointerEvents: 'none', zIndex: 1001 }}>
                  <div style={{ fontSize: '14px', fontWeight: '600', color: 'white', marginBottom: '4px', fontFamily: '"Cormorant Garamond", serif' }}>{hoveredProvince}</div>
                  <div style={{ fontSize: '24px', fontWeight: '300', color: '#4dd0c4', fontFamily: '"Cormorant Garamond", serif' }}>{formatValue(getProvinceValue(hoveredProvince))}</div>
                  <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', marginTop: '4px', fontFamily: '"Inter", sans-serif' }}>Click to view details</div>
                </div>
              )}
            </div>
          </div>

          {/* INTRO MODAL */}
          {showIntro && (
            <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ background: '#1a1a1a', border: '1px solid #2a2a2a', borderTop: '3px solid #4dd0c4', padding: '48px', maxWidth: '560px', width: '90%', boxShadow: '0 20px 60px rgba(0,0,0,0.5)' }}>
                <div style={{ fontSize: '11px', fontWeight: '700', color: '#4dd0c4', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '12px', fontFamily: '"Inter", sans-serif' }}>Interactive Geographic Data</div>
                <h2 style={{ fontSize: '28px', fontWeight: '300', color: 'white', margin: '0 0 16px 0', lineHeight: '1.2', fontFamily: '"Cormorant Garamond", serif' }}>Mapping Vietnam's Informal Economy</h2>
                <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.6)', lineHeight: '1.7', marginBottom: '24px', fontFamily: '"Inter", sans-serif' }}>This tool visualizes 7 provincial-level indicators across all 63 provinces of Vietnam, from informal employment rates to rural population share and the sidewalk economy.</p>
                <div style={{ background: 'rgba(77,208,196,0.08)', borderLeft: '3px solid #4dd0c4', padding: '16px', marginBottom: '24px' }}>
                  <div style={{ fontSize: '11px', fontWeight: '600', color: '#4dd0c4', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '1px', fontFamily: '"Inter", sans-serif' }}>How to use</div>
                  <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)', lineHeight: '1.8', fontFamily: '"Inter", sans-serif' }}>
                    • Select an indicator from the left panel<br/>
                    • Click any province to see all its data<br/>
                    • Use the Urban Filter to focus on urbanized provinces<br/>
                    • Toggle the panel with the Hide/Show button
                  </div>
                </div>
                <button onClick={() => setShowIntro(false)} style={{ width: '100%', padding: '14px', background: '#4dd0c4', color: '#1a1a1a', border: 'none', fontSize: '14px', fontWeight: '700', cursor: 'pointer', fontFamily: '"Inter", sans-serif', letterSpacing: '0.5px' }}>Start Exploring →</button>
              </div>
            </div>
          )}

        </div>
      )}
    </div>
  );
}

// ========================================
// MAIN APP
// ========================================
function App() {
  const [currentPage, setCurrentPage] = useState('landing');

  const renderPage = () => {
    switch (currentPage) {
      case 'landing':
        return <LandingPage onNavigate={setCurrentPage} />;
      case 'maps':
        return <InteractiveMaps onBack={() => setCurrentPage('landing')} />;
      case 'scrollytelling':
        return <PlaceholderPage title="Narrative Analysis" description="Coming soon." onBack={() => setCurrentPage('landing')} />;
      case 'sector':
        return <PlaceholderPage title="Sectoral Analysis" description="Coming soon." onBack={() => setCurrentPage('landing')} />;
      case 'policy':
        return <PlaceholderPage title="Policy Impact Analysis" description="Coming soon." onBack={() => setCurrentPage('landing')} />;
      case 'informal-explainer':
        return <InformalExplainer onBack={() => setCurrentPage('landing')} />;
      case 'exec-summary':
        return <ExecutiveSummary onBack={() => setCurrentPage('landing')} onNavigate={setCurrentPage} />;
      case 'fiscal':
        return <FiscalCalculator onBack={() => setCurrentPage('landing')} />;
      case 'vietnam2045':
        return <Vietnam2045 onBack={() => setCurrentPage('landing')} onNavigate={setCurrentPage} />;
      default:
        return <LandingPage onNavigate={setCurrentPage} />;
    }
  };

  return renderPage();
}

export default App;
