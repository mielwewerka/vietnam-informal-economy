// ========================================
// VIETNAM INFORMAL ECONOMY — App.js
// ========================================

import React, { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import vietnamGeoData from './data/vietnamGeoData.json';
import completeMapData from './data/completeMapData.json';
import InformalExplainer from './components/InformalExplainer';
import Vietnam2045 from './components/Vietnam2045';
import CaseStudies from './components/CaseStudies';
import FiscalCalculator from './components/FiscalCalculator';
import ExecutiveSummary from './components/ExecutiveSummary';
import PolicyRecommendations from './components/PolicyRecommendations';

// ── Map configurations ────────────────────────────────────────────────────
const mapConfigs = {
  informal: {
    title: "Informal Employment",
    dataKey: "informal_pct", unit: "%",
    description: "Informal employment rate by province. GSO Labor Force Survey 2023.",
    colorScale: [
      { threshold: 40, color: '#22c55e', label: '<40%' },
      { threshold: 50, color: '#84cc16', label: '40-50%' },
      { threshold: 60, color: '#eab308', label: '50-60%' },
      { threshold: 70, color: '#f97316', label: '60-70%' },
      { threshold: 80, color: '#dc2626', label: '70-80%' },
      { threshold: 100, color: '#7f1d1d', label: '>=80%' },
    ],
  },
  agricultural: {
    title: "Agricultural Workers",
    dataKey: "agricultural_pct", unit: "%",
    description: "Percentage of workers in agriculture, forestry and fishery. GSO LFS 2023.",
    colorScale: [
      { threshold: 10, color: '#dcfce7', label: '<10%' },
      { threshold: 20, color: '#86efac', label: '10-20%' },
      { threshold: 40, color: '#22c55e', label: '20-40%' },
      { threshold: 60, color: '#15803d', label: '40-60%' },
      { threshold: 100, color: '#14532d', label: '>=60%' },
    ],
  },
  totalEmployment: {
    title: "Total Employment",
    dataKey: "total_employed", unit: "k",
    description: "Total employed workers in thousands. GSO LFS 2023.",
    colorScale: [
      { threshold: 500, color: '#dbeafe', label: '<500k' },
      { threshold: 1000, color: '#93c5fd', label: '500k-1M' },
      { threshold: 1500, color: '#3b82f6', label: '1M-1.5M' },
      { threshold: 2500, color: '#1e40af', label: '1.5M-2.5M' },
      { threshold: 10000, color: '#1e3a8a', label: '>2.5M' },
    ],
  },
  sidewalk: {
    title: "Sidewalk Economy",
    dataKey: "sidewalk_pct", unit: "%",
    description: "DERIVED — Estimated as 5% of urban employment per province (Huynh 2023). Not a direct survey measure.",
    colorScale: [
      { threshold: 0.5, color: '#fed7aa', label: '<0.5%' },
      { threshold: 1, color: '#fdba74', label: '0.5-1%' },
      { threshold: 2, color: '#fb923c', label: '1-2%' },
      { threshold: 4, color: '#f97316', label: '2-4%' },
      { threshold: 100, color: '#c2410c', label: '>4%' },
    ],
  },
  urbanization: {
    title: "Urbanization Rate",
    dataKey: "urban_pct_gso_2024", unit: "%",
    description: "Urban population as share of provincial total. GSO 2024.",
    colorScale: [
      { threshold: 20, color: '#fef3c7', label: '<20%' },
      { threshold: 40, color: '#fde047', label: '20-40%' },
      { threshold: 60, color: '#facc15', label: '40-60%' },
      { threshold: 80, color: '#eab308', label: '60-80%' },
      { threshold: 100, color: '#a16207', label: '>80%' },
    ],
  },
  nonAgInformal: {
    title: "Non-Agricultural Informal",
    dataKey: "non_ag_informal_pct", unit: "%",
    description: "DERIVED — Informal employment rate minus agricultural employment share. Approximates service/manufacturing informality.",
    colorScale: [
      { threshold: 20, color: '#dcfce7', label: '<20%' },
      { threshold: 30, color: '#86efac', label: '20-30%' },
      { threshold: 40, color: '#22c55e', label: '30-40%' },
      { threshold: 50, color: '#15803d', label: '40-50%' },
      { threshold: 100, color: '#14532d', label: '>50%' },
    ],
  },
  ruralPopulation: {
    title: "Rural Population",
    dataKey: "rural_pct", unit: "%",
    description: "DERIVED — 100 minus urban percentage (GSO 2024). Share of population in rural areas.",
    colorScale: [
      { threshold: 20, color: '#dbeafe', label: '<20%' },
      { threshold: 40, color: '#93c5fd', label: '20-40%' },
      { threshold: 60, color: '#3b82f6', label: '40-60%' },
      { threshold: 80, color: '#1e40af', label: '60-80%' },
      { threshold: 100, color: '#1e3a8a', label: '>80%' },
    ],
  },
};

// ── Shared footer nav ─────────────────────────────────────────────────────
function FooterNav({ onBack, prev, next, onNavigate }) {
  return (
    <div style={{ background: '#080808', borderTop: '1px solid #161616', padding: '18px 48px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', flexShrink: 0 }}>
      <button onClick={prev ? () => onNavigate(prev.page) : onBack} style={{ background: 'none', border: '1px solid #222', color: 'rgba(255,255,255,0.4)', padding: '7px 14px', fontSize: '12px', fontWeight: '600', cursor: 'pointer', fontFamily: '"Inter", sans-serif' }}>
        ← {prev ? prev.label : 'Back to Overview'}
      </button>
      <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.12)', margin: 0, fontFamily: '"Inter", sans-serif' }}>ECON 62 · Topics in Macroeconomics · Winter 2026</p>
      {next && (
        <button onClick={() => onNavigate(next.page)} style={{ background: '#4dd0c4', color: '#0f0f0f', border: 'none', padding: '7px 18px', fontSize: '12px', fontWeight: '700', cursor: 'pointer', fontFamily: '"Inter", sans-serif' }}>
          {next.label} →
        </button>
      )}
    </div>
  );
}

// ── Map insights data ─────────────────────────────────────────────────────
const mapInsights = {
  informal: [
    { label: 'The rural-urban divide is stark', text: 'Northwestern provinces like Dien Bien and Lai Chau exceed 88% informality — nearly double the rate in Hanoi or Ho Chi Minh City. Geography is the single strongest predictor of whether a worker is visible to the state.' },
    { label: 'Urban cores are approaching high-income norms', text: "The Southeast region around HCMC sits at approximately 36% informal employment, close to the 25-35% typical of high-income countries. The formalization challenge is concentrated in the periphery, not the center." },
    { label: 'Current pace falls far short of 2045', text: 'The national rate was 68.5% in 2021 under the ILO-aligned methodology. Pre-2021 figures used a narrower definition excluding agriculture and are not directly comparable. Reaching high-income structural norms requires sustained transformation well beyond current trends.' },
  ],
  agricultural: [
    { label: 'Agriculture is the core of the problem', text: 'Nearly all agricultural workers (97.9%, GSO/ILO 2021) are informally employed. Conventional formalization policy designed for urban wage workers cannot reach this sector without entirely different instruments.' },
    { label: 'Mekong Delta is a fiscal dead zone', text: "Rice-farming provinces combine extreme agricultural density with near-total informality. These workers generate output but contribute essentially nothing to the formal tax base. No registration reform reaches them." },
    { label: 'Which measure you use determines which policy you design', text: "GSO publishes two informality figures: one including and one excluding agriculture. The broader ILO-aligned measure (used here) is 12 percentage points higher. The narrower measure implies different — and weaker — policy conclusions." },
  ],
  nonAgInformal: [
    { label: 'This is a calculated indicator, not a direct survey', text: 'Non-agricultural informal is derived as provincial informal rate minus agricultural employment share. It approximates service and manufacturing informality but is not directly measured. Treat as directional.' },
    { label: 'High non-ag informality signals active barriers', text: 'Where overall informality is moderate but non-ag informal remains high, formal sector growth is not automatically pulling workers into formality. The barrier is cost and administrative complexity, not geography.' },
    { label: 'This is where contribution rate and registration reform can bite', text: 'Non-agricultural informal workers — street vendors, construction labor, small retail, gig drivers — are reachable through the policy tools in Part VI. Agricultural informality is not.' },
  ],
  urbanization: [
    { label: 'Urbanization predicts formalization better than income', text: 'The correlation between urban share and low informality is near-perfect across provinces. Urban wage employment generates payroll records automatically; rural self-employment structurally does not.' },
    { label: 'Industrial zones drive the transition', text: 'Binh Duong and Dong Nai, anchored by large export manufacturing zones, show both high urbanization and relatively low informality. FDI-driven manufacturing is doing what administrative reform alone cannot.' },
    { label: 'Vietnam needs 15-20 more percentage points of urbanization', text: 'To match the structural composition of high-income peers, Vietnam would need to urbanize substantially further. Fiscal policy can support but not shortcut that generational demographic shift.' },
  ],
  sidewalk: [
    { label: 'This is an estimated indicator — read carefully', text: "Sidewalk economy share is estimated by applying Huynh (2023)'s finding that street vending represents approximately 5% of urban employment to each province's urban employment share. This is a rough approximation, not a survey-based measure." },
    { label: 'Vendor bans displace rather than formalize', text: "Hanoi's 2008 ban drove vendors to less visible locations. Turner and Schoenberger (2011) documented that vendors learned which officials had fining authority and adapted their movements accordingly. Enforcement without reform does not produce formalization." },
    { label: 'Street vending is visible but not the core fiscal problem', text: 'Street vending is politically salient but represents a small fraction of total informal employment. Disproportionate policy attention here risks misallocating reform effort away from agricultural and non-agricultural wage work.' },
  ],
  totalEmployment: [
    { label: 'Scale determines fiscal weight', text: 'Large-employment provinces generate disproportionate revenue even at similar informality rates. Small formalization gains in HCMC outweigh large gains in low-population provinces in absolute fiscal terms.' },
    { label: "The formal tax base is geographically concentrated", text: "Vietnam's current revenue depends on a narrow concentration of compliant wage employers in two cities. This concentration is both a strength (easy to enforce) and a vulnerability (easy to disrupt)." },
  ],
  ruralPopulation: [
    { label: 'Rural share and informality are nearly the same thing', text: 'Provinces with the highest rural share almost universally have the highest informality rates. This is a derived indicator (100 minus urban share) — it approximates structural agricultural informality.' },
    { label: 'Rural-urban migration is the natural formalization engine', text: "Vietnam's urbanization since Doi Moi explains much of the gradual informality decline observed over the past decade. Workers moving to cities and entering wage employment automatically enter the formal system." },
    { label: 'The most rural provinces need place-based policy', text: 'The Central Highlands and Northern Midlands cannot formalize through urban migration alone. Extending social protection to farmers in situ, without requiring formal registration, may be the only viable path.' },
  ],
};

// ── Interactive Maps ─────────────────────────────────────────────────────
function InteractiveMaps({ onBack, onNavigate }) {
  const [activeTab, setActiveTab] = useState('informal');
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [hoveredProvince, setHoveredProvince] = useState(null);
  const [urbanFilter, setUrbanFilter] = useState('all');
  const [showInsights, setShowInsights] = useState(false);

  // Zoom/pan state
  const [transform, setTransform] = useState({ x: 0, y: 0, scale: 1 });
  const [isPanning, setIsPanning] = useState(false);
  const panStart = useRef(null);
  const svgContainerRef = useRef(null);

  const currentConfig = mapConfigs[activeTab];

  const getColor = (value, config) => {
    if (value == null || isNaN(value)) return '#e5e7eb';
    for (const { threshold, color } of config.colorScale) {
      if (value < threshold) return color;
    }
    return config.colorScale[config.colorScale.length - 1].color;
  };

  const getProvinceValue = useCallback((name) => {
    let d = completeMapData[name];
    if (!d) for (const [k, v] of Object.entries(completeMapData)) {
      if (k.toLowerCase().includes(name.toLowerCase()) || name.toLowerCase().includes(k.toLowerCase())) { d = v; break; }
    }
    if (!d) return null;
    if (currentConfig.dataKey === 'non_ag_informal_pct') return Math.max(0, d.informal_pct - d.agricultural_pct);
    if (currentConfig.dataKey === 'rural_pct') return 100 - d.urban_pct_gso_2024;
    return d[currentConfig.dataKey];
  }, [activeTab, currentConfig]);

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
    return d?.urban_pct_gso_2024 >= parseInt(urbanFilter);
  };

  const stats = useMemo(() => {
    const vals = Object.values(completeMapData).map(p => p[currentConfig.dataKey]).filter(v => v != null && !isNaN(v));
    if (!vals.length) return { max: 'N/A', min: 'N/A', avg: 'N/A' };
    const fmt = v => currentConfig.unit === '%' ? v.toFixed(1) + '%' : currentConfig.unit === 'k' ? (v / 1000).toFixed(0) + 'k' : v.toFixed(1);
    return { max: fmt(Math.max(...vals)), min: fmt(Math.min(...vals)), avg: fmt(vals.reduce((a, b) => a + b, 0) / vals.length) };
  }, [activeTab]);

  const project = ([lon, lat]) => [((lon - 102) / 8) * 500, 900 - ((lat - 8) / 16) * 900];

  const geoToPath = (coords) => {
    const isMulti = Array.isArray(coords[0][0][0]);
    const rings = isMulti ? coords.flat() : coords;
    return rings.map(ring => ring.map((pt, i) => { const [x, y] = project(pt); return `${i === 0 ? 'M' : 'L'}${x},${y}`; }).join(' ') + ' Z').join(' ');
  };

  const fmtVal = v => {
    if (v == null || isNaN(v)) return 'N/A';
    return currentConfig.unit === '%' ? v.toFixed(1) + '%' : currentConfig.unit === 'k' ? (v / 1000).toFixed(1) + 'k' : v.toFixed(2);
  };

  // Zoom handlers
  const handleWheel = (e) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? 0.85 : 1.18;
    setTransform(t => {
      const newScale = Math.max(0.8, Math.min(6, t.scale * delta));
      return { ...t, scale: newScale };
    });
  };

  const handleMouseDown = (e) => {
    if (e.button !== 0) return;
    setIsPanning(true);
    panStart.current = { x: e.clientX - transform.x, y: e.clientY - transform.y };
  };

  const handleMouseMove = (e) => {
    if (!isPanning || !panStart.current) return;
    setTransform(t => ({ ...t, x: e.clientX - panStart.current.x, y: e.clientY - panStart.current.y }));
  };

  const handleMouseUp = () => { setIsPanning(false); panStart.current = null; };

  const resetZoom = () => setTransform({ x: 0, y: 0, scale: 1 });

  const selectedData = selectedProvince ? getProvinceData(selectedProvince) : null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', fontFamily: '"Inter", sans-serif', background: '#0f0f0f' }}>

      {/* Top bar */}
      <div style={{ background: '#111', borderBottom: '1px solid #1e1e1e', padding: '10px 20px', display: 'flex', alignItems: 'center', gap: '16px', flexShrink: 0, flexWrap: 'wrap' }}>
        <button onClick={onBack} style={{ background: 'transparent', border: '1px solid #2a2a2a', color: 'rgba(255,255,255,0.5)', padding: '5px 12px', fontSize: '12px', fontWeight: '600', cursor: 'pointer', borderRadius: '3px' }}>← Overview</button>
        <span style={{ fontSize: '10px', fontWeight: '700', color: '#4dd0c4', letterSpacing: '2px', textTransform: 'uppercase' }}>Part II · Provincial Maps</span>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <button onClick={() => setUrbanFilter(urbanFilter === 'all' ? '50' : urbanFilter === '50' ? '70' : 'all')}
            style={{ background: urbanFilter !== 'all' ? '#4dd0c4' : '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: '3px', padding: '5px 12px', cursor: 'pointer', fontSize: '11px', fontWeight: '600', color: urbanFilter !== 'all' ? '#0f0f0f' : 'rgba(255,255,255,0.5)', whiteSpace: 'nowrap' }}>
            {urbanFilter === 'all' ? 'Urban Filter: Off' : urbanFilter === '50' ? 'Urban >50%' : 'Urban >70%'}
          </button>
          <button onClick={resetZoom} style={{ background: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: '3px', padding: '5px 12px', cursor: 'pointer', fontSize: '11px', color: 'rgba(255,255,255,0.4)' }}>Reset Zoom</button>
          <button onClick={() => setShowInsights(!showInsights)}
            style={{ background: showInsights ? '#4dd0c4' : '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: '3px', padding: '5px 12px', cursor: 'pointer', fontSize: '11px', fontWeight: '600', color: showInsights ? '#0f0f0f' : 'rgba(255,255,255,0.5)' }}>
            {showInsights ? 'Hide Insights' : 'Show Insights'}
          </button>
          <button onClick={() => onNavigate('case-studies')} style={{ background: 'rgba(14,116,144,0.2)', border: '1px solid rgba(14,116,144,0.5)', borderRadius: '3px', padding: '5px 12px', cursor: 'pointer', fontSize: '11px', fontWeight: '600', color: '#67e8f9' }}>
            → Case Studies
          </button>
        </div>
      </div>

      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>

        {/* LEFT SIDEBAR — indicator selector + province detail */}
        <div style={{ width: '260px', background: '#111', borderRight: '1px solid #1e1e1e', display: 'flex', flexDirection: 'column', flexShrink: 0, overflow: 'hidden' }}>

          {/* Indicator selector */}
          <div style={{ padding: '12px', borderBottom: '1px solid #1e1e1e', overflowY: 'auto', flex: selectedProvince ? '0 0 auto' : 1 }}>
            <div style={{ fontSize: '10px', fontWeight: '700', color: '#4dd0c4', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '8px' }}>Indicator</div>
            {Object.entries(mapConfigs).map(([key, cfg]) => (
              <button key={key} onClick={() => { setActiveTab(key); setSelectedProvince(null); }}
                style={{ display: 'block', width: '100%', padding: '8px 10px', marginBottom: '4px', border: activeTab === key ? '1px solid #4dd0c4' : '1px solid #1e1e1e', background: activeTab === key ? 'rgba(77,208,196,0.1)' : 'transparent', color: activeTab === key ? '#4dd0c4' : 'rgba(255,255,255,0.5)', fontSize: '12px', fontWeight: activeTab === key ? '600' : '400', cursor: 'pointer', textAlign: 'left', borderRadius: '3px', fontFamily: '"Inter", sans-serif' }}>
                {cfg.title}
                {cfg.description.startsWith('DERIVED') && <span style={{ fontSize: '9px', color: '#f97316', marginLeft: '6px' }}>DERIVED</span>}
              </button>
            ))}
            <div style={{ marginTop: '10px', padding: '8px', background: '#0d0d0d', border: '1px solid #1e1e1e', borderRadius: '3px' }}>
              <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.3)', lineHeight: '1.5', fontFamily: '"Inter", sans-serif' }}>{currentConfig.description}</div>
            </div>
            <div style={{ marginTop: '10px', padding: '8px 10px', background: '#0d0d0d', border: '1px solid #1e1e1e', borderRadius: '3px' }}>
              <div style={{ fontSize: '10px', fontWeight: '600', color: '#4dd0c4', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '1px' }}>Summary Stats</div>
              {[['Min', stats.min, '#22c55e'], ['Mean', stats.avg, '#4dd0c4'], ['Max', stats.max, '#dc2626']].map(([lbl, val, col]) => (
                <div key={lbl} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)' }}>{lbl}</span>
                  <span style={{ fontSize: '13px', fontWeight: '700', color: col }}>{val}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Province detail — shows when a province is selected */}
          {selectedProvince && selectedData && (
            <div style={{ flex: 1, overflowY: 'auto', padding: '12px', borderTop: '1px solid #1e1e1e' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                <div style={{ fontSize: '14px', fontWeight: '300', color: 'white', fontFamily: '"Cormorant Garamond", serif', lineHeight: 1.2 }}>{selectedProvince}</div>
                <button onClick={() => setSelectedProvince(null)} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.3)', cursor: 'pointer', fontSize: '16px', padding: 0, lineHeight: 1 }}>×</button>
              </div>
              <div style={{ background: 'rgba(77,208,196,0.08)', padding: '10px 12px', borderLeft: '3px solid #4dd0c4', marginBottom: '10px' }}>
                <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.4)', marginBottom: '2px' }}>{currentConfig.title}</div>
                <div style={{ fontSize: '28px', fontWeight: '300', color: 'white', fontFamily: '"Cormorant Garamond", serif' }}>{fmtVal(getProvinceValue(selectedProvince))}</div>
              </div>
              <div style={{ fontSize: '10px', fontWeight: '600', color: '#4dd0c4', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '6px' }}>All Indicators</div>
              {Object.entries(mapConfigs).map(([key, cfg]) => {
                const pd = getProvinceData(selectedProvince);
                const val = pd?.[cfg.dataKey];
                return (
                  <div key={key} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid #1a1a1a' }}>
                    <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.45)' }}>{cfg.title}</span>
                    <span style={{ fontSize: '12px', fontWeight: '600', color: 'white' }}>
                      {val != null && !isNaN(val) ? (cfg.unit === '%' ? val.toFixed(1) + '%' : cfg.unit === 'k' ? (val / 1000).toFixed(1) + 'k' : val.toFixed(1)) : 'N/A'}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* MAP AREA */}
        <div style={{ flex: 1, position: 'relative', overflow: 'hidden', background: '#181818' }}>

          {/* Zoom/pan container */}
          <div
            ref={svgContainerRef}
            onWheel={handleWheel}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            style={{ width: '100%', height: '100%', cursor: isPanning ? 'grabbing' : 'grab', overflow: 'hidden', userSelect: 'none' }}
          >
            <div style={{ transform: `translate(${transform.x}px, ${transform.y}px) scale(${transform.scale})`, transformOrigin: 'center center', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg viewBox="0 0 500 900" style={{ width: '100%', height: '100%', maxWidth: '560px', maxHeight: 'calc(100vh - 100px)', filter: 'drop-shadow(0 4px 24px rgba(0,0,0,0.5))' }}>
                {vietnamGeoData.features.map((feat, idx) => {
                  const name = feat.properties.NAME_1;
                  const val = getProvinceValue(name);
                  const isSel = selectedProvince === name;
                  const isHov = hoveredProvince === name;
                  const filtered = !isUrbanFiltered(name);
                  return (
                    <path key={idx}
                      d={geoToPath(feat.geometry.coordinates)}
                      fill={getColor(val, currentConfig)}
                      stroke={isSel ? '#4dd0c4' : isHov ? 'rgba(77,208,196,0.6)' : '#0f0f0f'}
                      strokeWidth={isSel ? 2.5 : isHov ? 1.5 : 0.4}
                      opacity={filtered ? 0.12 : 1}
                      style={{ cursor: 'pointer', transition: 'opacity 0.2s, stroke 0.15s' }}
                      onClick={(e) => { e.stopPropagation(); if (!isPanning) setSelectedProvince(name === selectedProvince ? null : name); }}
                      onMouseEnter={() => setHoveredProvince(name)}
                      onMouseLeave={() => setHoveredProvince(null)}
                    >
                      <title>{`${name}: ${fmtVal(val)}`}</title>
                    </path>
                  );
                })}
              </svg>
            </div>
          </div>

          {/* Zoom hint */}
          <div style={{ position: 'absolute', bottom: '12px', left: '12px', fontSize: '10px', color: 'rgba(255,255,255,0.2)', fontFamily: '"Inter", sans-serif', pointerEvents: 'none' }}>
            Scroll to zoom · Drag to pan · Click province for detail
          </div>

          {/* Zoom controls */}
          <div style={{ position: 'absolute', bottom: '32px', right: '16px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {[
              { label: '+', action: () => setTransform(t => ({ ...t, scale: Math.min(6, t.scale * 1.25) })) },
              { label: '−', action: () => setTransform(t => ({ ...t, scale: Math.max(0.8, t.scale * 0.8) })) },
              { label: '⊙', action: resetZoom },
            ].map(({ label, action }) => (
              <button key={label} onClick={action} style={{ width: '32px', height: '32px', background: '#111', border: '1px solid #2a2a2a', color: 'rgba(255,255,255,0.5)', fontSize: '16px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '3px' }}>{label}</button>
            ))}
          </div>

          {/* Legend */}
          <div style={{ position: 'absolute', top: '12px', right: '12px', background: 'rgba(15,15,15,0.92)', border: '1px solid #2a2a2a', borderRadius: '4px', padding: '12px 14px', backdropFilter: 'blur(4px)' }}>
            <div style={{ fontSize: '10px', fontWeight: '700', color: '#4dd0c4', marginBottom: '8px', letterSpacing: '1px', textTransform: 'uppercase' }}>{currentConfig.title}</div>
            {currentConfig.colorScale.map(({ color, label }) => (
              <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '7px', marginBottom: '4px' }}>
                <div style={{ width: '18px', height: '12px', background: color, borderRadius: '2px', flexShrink: 0 }} />
                <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.55)' }}>{label}</span>
              </div>
            ))}
          </div>

          {/* Hover tooltip */}
          {hoveredProvince && !selectedProvince && (
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', background: 'rgba(15,15,15,0.95)', border: '1px solid #4dd0c4', borderRadius: '4px', padding: '12px 16px', pointerEvents: 'none', zIndex: 200, backdropFilter: 'blur(8px)' }}>
              <div style={{ fontSize: '14px', fontWeight: '600', color: 'white', marginBottom: '3px', fontFamily: '"Cormorant Garamond", serif' }}>{hoveredProvince}</div>
              <div style={{ fontSize: '22px', fontWeight: '300', color: '#4dd0c4', fontFamily: '"Cormorant Garamond", serif' }}>{fmtVal(getProvinceValue(hoveredProvince))}</div>
              <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.35)', marginTop: '3px' }}>Click to view all indicators</div>
            </div>
          )}
        </div>

        {/* RIGHT PANEL — Insights, shown when toggle is on */}
        {showInsights && (
          <div style={{ width: '300px', background: '#111', borderLeft: '1px solid #1e1e1e', overflowY: 'auto', flexShrink: 0 }}>
            <div style={{ padding: '14px 16px', borderBottom: '1px solid #1e1e1e', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: '10px', fontWeight: '700', color: '#4dd0c4', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '2px' }}>Map Insights</div>
                <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)' }}>{currentConfig.title}</div>
              </div>
              <button onClick={() => setShowInsights(false)} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.3)', cursor: 'pointer', fontSize: '18px', padding: 0, lineHeight: 1 }}>×</button>
            </div>
            <div style={{ padding: '14px 16px' }}>
              {(mapInsights[activeTab] || []).map((ins, i) => (
                <div key={i} style={{ marginBottom: '20px', paddingBottom: '20px', borderBottom: i < mapInsights[activeTab].length - 1 ? '1px solid #1e1e1e' : 'none' }}>
                  <div style={{ fontSize: '12px', fontWeight: '700', color: '#e8e4e0', marginBottom: '6px', lineHeight: '1.35', fontFamily: '"Inter", sans-serif' }}>{ins.label}</div>
                  <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.45)', lineHeight: '1.7', fontFamily: '"Inter", sans-serif' }}>{ins.text}</div>
                </div>
              ))}
              <div style={{ marginTop: '8px', padding: '10px 12px', background: '#0d0d0d', border: '1px solid #1e1e1e', borderRadius: '3px' }}>
                <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.2)', lineHeight: '1.6', fontFamily: '"Inter", sans-serif' }}>
                  Data: GSO LFS 2023 · GSO 2024 · Huynh (2023). DERIVED indicators are calculated from primary data — see descriptions.
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer nav */}
      <FooterNav
        onBack={onBack}
        prev={{ page: 'informal-explainer', label: 'Part I: Informal Economy' }}
        next={{ page: 'vietnam2045', label: 'Part III: Vietnam 2045' }}
        onNavigate={onNavigate}
      />
    </div>
  );
}

// ── Landing Page ──────────────────────────────────────────────────────────
function LandingPage({ onNavigate, savedScrollY }) {
  const [scrollY, setScrollY] = useState(0);
  const hasRestored = useRef(false);

  // Restore scroll position when returning from a module
  useEffect(() => {
    if (savedScrollY > 0 && !hasRestored.current) {
      hasRestored.current = true;
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          window.scrollTo({ top: savedScrollY, behavior: 'instant' });
        });
      });
    }
  }, [savedScrollY]);

  useEffect(() => {
    const h = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, []);

  const TEAL = '#00897b';
  const TEAL_BRIGHT = '#4dd0c4';

  const chapters = [
    { num: 'I', page: 'informal-explainer', color: TEAL, title: 'What is the Informal Economy', subtitle: 'Who works outside the system and why', body: "From Doi Moi (1986) to the 2008 Hanoi vendor ban: the history of how Vietnam's informal economy was created, who it employs, and why it has proved so hard to escape." },
    { num: 'II', page: 'maps', color: '#1e6fa8', title: 'Interactive Maps', subtitle: '7 provincial indicators · 63 provinces · zoom + filter', body: "Informal employment, agricultural share, urbanization, sidewalk economy, non-agricultural informal, and rural population — mapped with scroll-to-zoom and an insights panel." },
    { num: 'III', page: 'vietnam2045', color: '#7c3aed', title: 'Vietnam 2045', subtitle: "Vietnam's fiscal ambition and the gap", body: "Vietnam needs 7–8% annual GDP growth for 20 years to hit high-income status. That requires public investment the current tax base — at 16.8% of GDP — cannot reliably fund." },
    { num: 'IV', page: 'fiscal', color: '#c2410c', title: 'Fiscal Calculator', subtitle: 'Adjust the formalization rate, see the revenue', body: "An interactive model estimating additional revenue from social insurance, income tax, and VAT under different formalization scenarios. With plain-English model definitions." },
    { num: 'V', page: 'case-studies', color: '#0e7490', title: 'Case Studies', subtitle: 'Chile and South Korea in comparative perspective', body: "Two countries that crossed the high-income threshold within a generation from informality rates comparable to Vietnam's today. Their mechanisms differed. What they share is instructive." },
    { num: 'VI', page: 'policy', color: '#475569', title: 'Policy Analysis', subtitle: 'Four recommendations and the tradeoffs they carry', body: "Formalization fails as enforcement; it succeeds as an offer. Four evidence-based recommendations grounded in Vietnam's own 2024 household business survey data." },
  ];

  return (
    <div style={{ fontFamily: '"Georgia", "Times New Roman", serif', background: '#0f0f0f', color: 'white' }}>

      {/* Sticky nav */}
      <div style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
        background: 'rgba(15,15,15,0.97)', borderBottom: '1px solid #1e1e1e',
        padding: '12px 48px', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        backdropFilter: 'blur(8px)',
        transform: scrollY > 200 ? 'translateY(0)' : 'translateY(-100%)',
        transition: 'transform 0.3s ease',
      }}>
        <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.45)', fontFamily: '"Inter", sans-serif' }}>Vietnam's Invisible Workforce</span>
        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
          {chapters.map(c => (
            <button key={c.page} onClick={() => onNavigate(c.page)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '11px', fontWeight: '600', color: 'rgba(255,255,255,0.38)', fontFamily: '"Inter", sans-serif', transition: 'color 0.2s' }}
              onMouseEnter={e => e.target.style.color = TEAL_BRIGHT}
              onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.38)'}
            >{c.num}. {c.title}</button>
          ))}
          <button onClick={() => onNavigate('exec-summary')} style={{ background: 'rgba(77,208,196,0.12)', border: '1px solid rgba(77,208,196,0.3)', color: TEAL_BRIGHT, padding: '4px 10px', fontSize: '11px', fontWeight: '600', cursor: 'pointer', fontFamily: '"Inter", sans-serif' }}>Summary</button>
        </div>
      </div>

      {/* ── HERO — tighter, more intentional layout ── */}
      <div style={{ position: 'relative', height: '100vh', display: 'grid', gridTemplateColumns: '1fr 1fr', overflow: 'hidden' }}>

        {/* Left: text content, vertically centered */}
        <div style={{
          position: 'relative', zIndex: 2,
          display: 'flex', flexDirection: 'column', justifyContent: 'center',
          padding: '80px 56px 60px 56px',
          background: 'linear-gradient(to right, rgba(10,10,10,1) 60%, rgba(10,10,10,0.7) 100%)',
        }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: `linear-gradient(90deg, ${TEAL}, transparent)` }} />
          <div style={{ fontSize: '10px', fontWeight: '700', color: 'rgba(255,255,255,0.35)', letterSpacing: '3px', textTransform: 'uppercase', fontFamily: '"Inter", sans-serif', marginBottom: '28px' }}>
            ECON 62 · Topics in Macroeconomics · Winter 2026
          </div>
          <h1 style={{ fontSize: 'clamp(40px, 5.5vw, 72px)', fontWeight: '400', lineHeight: '1.0', margin: '0 0 24px 0', letterSpacing: '-2px' }}>
            Vietnam's<br />Invisible<br />Workforce
          </h1>
          <p style={{ fontSize: 'clamp(15px, 1.5vw, 18px)', color: 'rgba(255,255,255,0.6)', lineHeight: '1.7', margin: '0 0 36px 0', maxWidth: '460px', fontStyle: 'italic', fontWeight: '400' }}>
            68.5% of its workers operate without social insurance, contracts, or safety nets. They are uncounted in the tax base, unprotected by labor law, and invisible to the state — and their exclusion is the central constraint on Vietnam's 2045 ambition.
          </p>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <button onClick={() => onNavigate('informal-explainer')} style={{ background: TEAL_BRIGHT, color: '#0f0f0f', border: 'none', padding: '12px 28px', fontSize: '13px', fontWeight: '700', cursor: 'pointer', letterSpacing: '0.5px', textTransform: 'uppercase', fontFamily: '"Inter", sans-serif' }}>
              Begin Reading →
            </button>
            <button onClick={() => onNavigate('exec-summary')} style={{ background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.8)', border: '1px solid rgba(255,255,255,0.25)', padding: '11px 20px', fontSize: '12px', fontWeight: '600', cursor: 'pointer', letterSpacing: '0.5px', textTransform: 'uppercase', fontFamily: '"Inter", sans-serif' }}>
              Executive Summary
            </button>
          </div>
        </div>

        {/* Right: stat column over photo */}
        <div style={{ position: 'relative' }}>
          {/* Background photo */}
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(https://raw.githubusercontent.com/mielwewerka/vietnam-informal-economy/main/vietnam-street.jpg)', backgroundSize: 'cover', backgroundPosition: 'center 40%' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to left, rgba(10,10,10,0.2) 0%, rgba(10,10,10,0.6) 100%)' }} />

          {/* Stat column overlaid on photo */}
          <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '80px 40px 60px 60px', gap: '0' }}>
            {[
              { stat: '68.5%', label: 'of workers are informally employed', source: 'GSO/ILO, 2021', color: TEAL_BRIGHT },
              { stat: '33.6M', label: 'workers outside the formal economy', source: 'GSO/ILO, 2021', color: '#f97316' },
              { stat: '16.8%', label: 'tax-to-GDP ratio, below 19.5% regional avg', source: 'OECD, 2023', color: '#dc2626' },
              { stat: '2045', label: "Vietnam's target year for high-income status", source: 'Resolution 29/NQ-TW', color: TEAL_BRIGHT },
            ].map(({ stat, label, source, color }, i) => (
              <div key={stat} style={{ padding: '20px 0', borderBottom: i < 3 ? '1px solid rgba(255,255,255,0.1)' : 'none' }}>
                <div style={{ fontSize: 'clamp(28px, 3.5vw, 44px)', fontWeight: '400', color, lineHeight: 1, letterSpacing: '-1px', marginBottom: '6px' }}>{stat}</div>
                <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.75)', lineHeight: '1.4', fontFamily: '"Inter", sans-serif', marginBottom: '3px' }}>{label}</div>
                <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.3)', fontFamily: '"Inter", sans-serif', fontStyle: 'italic' }}>{source}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{ position: 'absolute', bottom: '24px', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px', zIndex: 3 }}>
          <span style={{ fontSize: '9px', fontWeight: '700', color: 'rgba(255,255,255,0.25)', letterSpacing: '2px', textTransform: 'uppercase', fontFamily: '"Inter", sans-serif' }}>Scroll</span>
          <div style={{ animation: 'bounce 1.8s infinite' }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2.5 5.5l5.5 5.5 5.5-5.5" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </div>
        </div>
        <style>{`@keyframes bounce{0%,100%{transform:translateY(0)}50%{transform:translateY(4px)}}`}</style>
      </div>

      {/* ── CONTEXT + THESIS ── */}
      <div style={{ background: '#0a0a0a', padding: '80px 56px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2px', background: '#1a1a1a' }}>
          <div style={{ background: '#0f0f0f', padding: '40px' }}>
            <div style={{ fontSize: '10px', fontWeight: '700', color: TEAL_BRIGHT, letterSpacing: '2.5px', textTransform: 'uppercase', marginBottom: '14px', fontFamily: '"Inter", sans-serif' }}>About This Project</div>
            <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.55)', lineHeight: '1.8', margin: '0 0 16px 0', fontFamily: '"Inter", sans-serif' }}>
              This project examines Vietnam's informal economy — the 68.5% of workers who operate outside formal employment — and what it means for the country's ability to fund its 2045 development ambitions. It is structured as a six-part argument built on GSO/ILO data, ILO household business surveys, OECD fiscal data, and comparative evidence from Chile and South Korea.
            </p>
            <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.55)', lineHeight: '1.8', margin: 0, fontFamily: '"Inter", sans-serif' }}>
              The project includes interactive provincial maps (with zoom and insights), a live fiscal calculator, comparative case studies with trajectory charts, four policy recommendations with worker voice quotes, and corrected data throughout.
            </p>
          </div>
          <div style={{ background: '#111', padding: '40px', borderLeft: `4px solid ${TEAL}` }}>
            <div style={{ fontSize: '10px', fontWeight: '700', color: TEAL, letterSpacing: '2.5px', textTransform: 'uppercase', marginBottom: '18px', fontFamily: '"Inter", sans-serif' }}>The Central Question</div>
            <p style={{ fontSize: 'clamp(18px, 2vw, 24px)', color: 'white', lineHeight: '1.45', margin: '0 0 18px 0', letterSpacing: '-0.3px', fontStyle: 'italic', fontWeight: '400' }}>
              Can Vietnam reach high-income status by 2045 when two-thirds of its workers fall outside the formal tax system?
            </p>
            <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.4)', lineHeight: '1.7', margin: 0, fontFamily: '"Inter", sans-serif' }}>
              At 16.8% tax-to-GDP (OECD 2025), Vietnam cannot fund the public investment in infrastructure, education, and social protection that high-income status requires. The informal economy is not a symptom of that constraint. It is the cause.
            </p>
          </div>
        </div>
      </div>

      {/* ── THESIS ── */}
      <div style={{ background: '#0f0f0f', padding: '80px 56px' }}>
        <div style={{ maxWidth: '720px', margin: '0 auto' }}>
          <div style={{ width: '36px', height: '3px', background: TEAL_BRIGHT, marginBottom: '36px' }} />
          <h2 style={{ fontSize: 'clamp(24px, 3vw, 38px)', fontWeight: '400', lineHeight: '1.3', color: 'white', margin: '0 0 28px 0', letterSpacing: '-0.5px' }}>
            Vietnam's development story is told through GDP growth and poverty reduction. This project tells it through the other number.
          </h2>
          <p style={{ fontSize: '17px', color: 'rgba(255,255,255,0.55)', lineHeight: '1.85', margin: '0 0 18px 0', fontFamily: '"Inter", sans-serif' }}>
            68.5% is the share of workers who fall outside the formal system: uncounted in tax records, unprotected by labor law, excluded from the social insurance they help fund through their economic activity. These workers are street vendors and rice farmers and construction workers navigating an economy where formal employment is not always accessible, where contribution rates are high relative to incomes, and where the benefits of registration often do not reach them.
          </p>
          <p style={{ fontSize: '17px', color: 'rgba(255,255,255,0.55)', lineHeight: '1.85', margin: 0, fontFamily: '"Inter", sans-serif' }}>
            The fiscal gap their exclusion creates shapes everything: the roads, the schools, the pensions, the public hospitals. This project maps that reality province by province, quantifies its fiscal consequences, and asks what formalization would actually require — and for whom.
          </p>
        </div>
      </div>

      {/* ── 6-PART CHAPTERS 3x2 ── */}
      <div style={{ background: '#090909', borderTop: '1px solid #1a1a1a', padding: '56px 56px 72px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '16px', marginBottom: '32px' }}>
            <div style={{ fontSize: '10px', fontWeight: '700', color: TEAL_BRIGHT, letterSpacing: '2.5px', textTransform: 'uppercase', fontFamily: '"Inter", sans-serif' }}>The Argument in Six Parts</div>
            <div style={{ flex: 1, height: '1px', background: '#1a1a1a' }} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2px', background: '#1a1a1a' }}>
            {chapters.map(c => (
              <div key={c.num} onClick={() => onNavigate(c.page)}
                style={{ background: '#0f0f0f', padding: '28px 30px', cursor: 'pointer', borderTop: `3px solid ${c.color}`, transition: 'background 0.2s', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '200px' }}
                onMouseEnter={e => e.currentTarget.style.background = '#141414'}
                onMouseLeave={e => e.currentTarget.style.background = '#0f0f0f'}>
                <div>
                  <span style={{ fontSize: '10px', fontWeight: '700', color: c.color, fontFamily: '"Inter", sans-serif', letterSpacing: '1.5px' }}>PART {c.num}</span>
                  <h3 style={{ fontSize: '19px', fontWeight: '400', color: 'white', margin: '8px 0 4px', letterSpacing: '-0.3px', lineHeight: '1.2' }}>{c.title}</h3>
                  <p style={{ fontSize: '12px', color: c.color, fontFamily: '"Inter", sans-serif', fontWeight: '500', margin: '0 0 12px 0', opacity: 0.85 }}>{c.subtitle}</p>
                  <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.45)', lineHeight: '1.65', margin: '0 0 20px 0', fontFamily: '"Inter", sans-serif' }}>{c.body}</p>
                </div>
                <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '14px' }}>
                  <span style={{ background: c.color, color: 'white', fontSize: '10px', fontWeight: '700', letterSpacing: '1px', padding: '4px 10px', textTransform: 'uppercase', fontFamily: '"Inter", sans-serif' }}>Read Part {c.num} →</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{ background: '#070707', borderTop: '1px solid #141414', padding: '28px 56px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.18)', margin: 0, fontFamily: '"Inter", sans-serif' }}>ECON 62: Topics in Macroeconomics · Winter 2026</p>
        <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.14)', margin: 0, fontFamily: '"Inter", sans-serif' }}>Data: GSO/ILO 2021 · OECD 2025 · World Bank · ILO/VIDERI 2024</p>
      </div>
    </div>
  );
}

// ── Main App ──────────────────────────────────────────────────────────────
function App() {
  const [currentPage, setCurrentPage] = useState('landing');
  const savedScrollY = useRef(0);

  const navigate = (page) => {
    // Save scroll position before leaving landing
    if (currentPage === 'landing') {
      savedScrollY.current = window.scrollY;
    }
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const goBack = () => {
    setCurrentPage('landing');
    // Scroll will be restored by LandingPage on mount via savedScrollY prop
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'landing':          return <LandingPage onNavigate={navigate} savedScrollY={savedScrollY.current} />;
      case 'maps':             return <InteractiveMaps onBack={goBack} onNavigate={navigate} />;
      case 'informal-explainer': return <InformalExplainer onBack={goBack} onNavigate={navigate} />;
      case 'exec-summary':     return <ExecutiveSummary onBack={goBack} onNavigate={navigate} />;
      case 'fiscal':           return <FiscalCalculator onBack={goBack} onNavigate={navigate} />;
      case 'vietnam2045':      return <Vietnam2045 onBack={goBack} onNavigate={navigate} />;
      case 'case-studies':     return <CaseStudies onBack={goBack} onNavigate={navigate} />;
      case 'policy':           return <PolicyRecommendations onBack={goBack} onNavigate={navigate} />;
      default:                 return <LandingPage onNavigate={navigate} savedScrollY={savedScrollY.current} />;
    }
  };

  return renderPage();
}

export default App;
