// ========================================
// VIETNAM INFORMAL ECONOMY PROJECT
// Professional Academic Style
// ========================================
//Yay!
import React, { useState, useMemo, useEffect } from 'react';
import vietnamGeoData from './data/vietnamGeoData.json';
import completeMapData from './data/completeMapData.json';
import InformalExplainer from './components/InformalExplainer';


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
      { threshold: 100, color: '#7f1d1d', label: '≥80%' }
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
      { threshold: 100, color: '#14532d', label: '≥60%' }
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
      { threshold: 10000, color: '#1e3a8a', label: '≥2500k' }
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
      { threshold: 100, color: '#c2410c', label: '≥4%' }
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
      { threshold: 100, color: '#a16207', label: '≥80%' }
    ]
  },
  nonAgInformal: {
  title: "Non-Agricultural Informal",
  dataKey: "non_ag_informal_pct",
  unit: "%",
  description: "Informal employment outside of agriculture — captures the urban informal economy. Derived from GSO LFS 2023.",
  colorScale: [
    { threshold: 20, color: '#dcfce7', label: '<20%' },
    { threshold: 30, color: '#86efac', label: '20-30%' },
    { threshold: 40, color: '#22c55e', label: '30-40%' },
    { threshold: 50, color: '#15803d', label: '40-50%' },
    { threshold: 100, color: '#14532d', label: '≥50%' }
  ]
},
ruralPopulation: {
  title: "Rural Population",
  dataKey: "rural_pct",
  unit: "%",
  description: "Share of provincial population living in rural areas. Source: GSO Population Statistics 2023.",
  colorScale: [
    { threshold: 20, color: '#dbeafe', label: '<20%' },
    { threshold: 40, color: '#93c5fd', label: '20-40%' },
    { threshold: 60, color: '#3b82f6', label: '40-60%' },
    { threshold: 80, color: '#1e40af', label: '60-80%' },
    { threshold: 100, color: '#1e3a8a', label: '≥80%' }
  ]
},
};

// ========================================
// LANDING PAGE COMPONENT
// ========================================
function LandingPage({ onNavigate }) {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const heroHeight = window.innerHeight * 0.5;
  const heroOpacity = Math.max(0, 1 - (scrollY / (heroHeight * 0.6)));
  const heroTranslate = scrollY * 0.4;
  const navVisible = scrollY > heroHeight * 0.8;

  return (
    <div style={{ fontFamily: '"Cormorant Garamond", "Georgia", "Times New Roman", serif' }}>

      {/* STICKY NAV - appears after scrolling past hero */}
      <div style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
        background: 'white', borderBottom: '1px solid #e0e0e0',
        padding: '14px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
        transform: navVisible ? 'translateY(0)' : 'translateY(-100%)',
        transition: 'transform 0.3s ease'
      }}>
        <div style={{ fontSize: '15px', fontWeight: '700', color: '#00897b' }}>Vietnam Informal Economy</div>
        <div style={{ display: 'flex', gap: '20px' }}>
          {[['maps','Data & Maps'],['vietnam2045','Vietnam 2045'],['informal-explainer','Informal Economy']].map(([page, label]) => (
            <button key={page} onClick={() => onNavigate(page)} style={{ background: 'none', border: 'none', color: '#555', fontSize: '14px', fontWeight: '500', cursor: 'pointer' }}>{label}</button>
          ))}
        </div>
      </div>

      {/* HERO - half screen, teal overlay on image */}
      <div style={{
  height: '50vh',
  position: 'relative',
  overflow: 'hidden',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  opacity: heroOpacity,
  transform: `translateY(-${heroTranslate}px)`,
  transition: 'none'
}}>
       {/* Background image */}
<div style={{
  position: 'absolute', inset: 0,
  backgroundImage: 'url(https://raw.githubusercontent.com/mielwewerka/vietnam-informal-economy/main/vietnam-street.jpg)',
  backgroundSize: 'cover',
  backgroundPosition: 'center'
}} />

{/* Teal overlay on top of image */}
<div style={{
  position: 'absolute', inset: 0,
  background: 'linear-gradient(135deg, rgba(0,191,165,0.85) 0%, rgba(0,137,123,0.92) 100%)'
}} />
        {/* Hero text */}
        <div style={{ position: 'relative', textAlign: 'center', padding: '0 40px', maxWidth: '800px' }}>
          <div style={{ fontSize: '12px', fontWeight: '700', color: 'rgba(255,255,255,0.8)', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '16px' }}>
            ECON 62 — Topics in Macroeconomics
          </div>
          <h1 style={{ fontSize: '52px', fontWeight: '800', color: 'white', margin: '0 0 16px 0', lineHeight: '1.1', letterSpacing: '-1.5px' }}>
            Vietnam's Informal Workforce
          </h1>
          <p style={{ fontSize: '18px', fontStyle: 'italic', color: 'rgba(255,255,255,0.9)', margin: '0 0 28px 0', lineHeight: '1.6' }}>
            65% of Vietnamese workers exist outside the formal economy — and it's shaping the country's fiscal path.
          </p>
          <button onClick={() => onNavigate('maps')} style={{
            background: 'white', color: '#00897b', border: 'none',
            padding: '14px 32px', fontSize: '15px', fontWeight: '700',
            borderRadius: '4px', cursor: 'pointer', letterSpacing: '0.3px'
          }}>
            Explore the Data →
          </button>
        </div>
      </div>

      {/* CONTENT BELOW HERO */}
      <div style={{ background: '#fafafa' }}>

        {/* Key stat strip */}
        <div style={{ background: 'white', borderBottom: '1px solid #e0e0e0', padding: '32px 40px' }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '40px' }}>
            {[
  ['64.5%', 'Of workers are informally employed'],
  ['~1M', 'People work in the sidewalk economy alone'],
  ['2045', "Vietnam's target year to reach high-income status"],
].map(([stat, label]) => (
  <div key={stat} style={{ textAlign: 'center' }}>
    <div style={{ fontSize: '42px', fontWeight: '800', color: '#00897b', marginBottom: '8px' }}>{stat}</div>
    <div style={{ fontSize: '14px', color: '#666', lineHeight: '1.5' }}>{label}</div>
  </div>
))}
          </div>
        </div>

        {/* About section */}
        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '72px 40px' }}>
          <div style={{ fontSize: '12px', fontWeight: '700', color: '#00897b', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '16px' }}>About This Project</div>
          <h2 style={{ fontSize: '36px', fontWeight: '700', color: '#1a1a1a', margin: '0 0 24px 0', lineHeight: '1.2' }}>
            A country racing toward prosperity — with most of its economy invisible to the state.
          </h2>
          <p style={{ fontSize: '17px', color: '#555', lineHeight: '1.8', marginBottom: '20px' }}>
            Vietnam has achieved extraordinary growth since Doi Moi. But beneath the headline numbers lies a structural challenge: the majority of Vietnamese workers operate outside the formal economy — unprotected, untaxed, and uncounted. This project maps that reality province by province, and asks what it means for Vietnam's ambition to become a high-income country by 2045.
          </p>
          <p style={{ fontSize: '17px', color: '#555', lineHeight: '1.8' }}>
            Built from GSO Labor Force Survey data, ILO research, and World Bank analysis, this is meant as an interactive replacement for a traditional paper — a way to explore the data, understand the stakes, and follow the argument as it unfolds.
          </p>
        </div>

        {/* Navigation cards */}
        <div style={{ background: 'white', borderTop: '1px solid #e0e0e0', padding: '72px 40px' }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <div style={{ fontSize: '12px', fontWeight: '700', color: '#00897b', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '12px' }}>Explore</div>
            <h2 style={{ fontSize: '28px', fontWeight: '700', color: '#1a1a1a', margin: '0 0 40px 0' }}>Project Sections</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px' }}>
              {[
                { page: 'maps', label: 'Interactive Maps', tag: 'Available', desc: 'Explore 7 provincial-level indicators — from informal employment rates to the sidewalk economy — across all 63 provinces.', color: '#00bfa5' },
                { page: 'vietnam2045', label: 'Vietnam 2045', tag: 'Available', desc: 'How does informality threaten Vietnam\'s ambitious goal of high-income status by its centennial?', color: '#00bfa5' },
                { page: 'informal-explainer', label: 'What is the Informal Economy?', tag: 'Available', desc: 'From street vendors to agricultural day laborers — unpacking what informality means and why it persists.', color: '#00bfa5' },
                { page: null, label: 'Narrative Analysis', tag: 'Coming Soon', desc: 'The human story behind the statistics — migration, the sidewalk ban, and everyday survival in Hanoi.', color: '#999' },
              ].map(({ page, label, tag, desc, color }) => (
                <div
                  key={label}
                  onClick={() => page && onNavigate(page)}
                  style={{
                    border: page ? '2px solid #00bfa5' : '1px solid #e0e0e0',
                    borderRadius: '6px', padding: '32px',
                    cursor: page ? 'pointer' : 'default',
                    opacity: page ? 1 : 0.6,
                    transition: 'all 0.2s', background: 'white'
                  }}
                >
                  <div style={{ fontSize: '11px', fontWeight: '700', color, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '10px' }}>{tag}</div>
                  <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#1a1a1a', margin: '0 0 12px 0' }}>{label}</h3>
                  <p style={{ fontSize: '14px', color: '#666', lineHeight: '1.6', margin: 0 }}>{desc}</p>
                  {page && <div style={{ marginTop: '16px', fontSize: '14px', fontWeight: '600', color: '#00897b' }}>Explore →</div>}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={{ borderTop: '1px solid #e0e0e0', padding: '32px 40px', textAlign: 'center' }}>
          <p style={{ fontSize: '13px', color: '#999', margin: 0 }}>
            ECON 62 — Topics in Macroeconomics · Winter 2026 · Data: GSO Labor Force Survey 2023, World Bank, ILO
          </p>
        </div>

      </div>
    </div>
  );
}

// ========================================
// PLACEHOLDER COMPONENTS
// ========================================
function PlaceholderPage({ title, description, onBack }) {
  return (
    <div style={{ minHeight: '100vh', background: '#fafafa', fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Helvetica Neue", Arial, sans-serif' }}>
      <div style={{ background: 'white', borderBottom: '1px solid #e0e0e0', padding: '24px 40px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <button onClick={onBack} style={{ background: 'transparent', color: '#00bfa5', padding: '8px 16px', fontSize: '14px', fontWeight: '600', border: '1px solid #00bfa5', borderRadius: '4px', cursor: 'pointer', marginBottom: '16px' }}>
            ← Back to Overview
          </button>
          <h1 style={{ margin: 0, fontSize: '32px', fontWeight: '600', color: '#333' }}>{title}</h1>
        </div>
      </div>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '60px 40px' }}>
        <div style={{ background: 'white', border: '1px solid #e0e0e0', borderRadius: '4px', padding: '48px' }}>
          <p style={{ fontSize: '16px', color: '#666', lineHeight: '1.6', marginBottom: '24px' }}>{description}</p>
          <div style={{ background: '#f0f9ff', border: '1px solid #bae6fd', borderLeft: '4px solid #0ea5e9', padding: '20px', borderRadius: '4px' }}>
            <p style={{ fontSize: '14px', color: '#0c4a6e', margin: 0, lineHeight: '1.6' }}>
              <strong>Status:</strong> This component is currently under development and will be available in a future update. Please check the Interactive Geographic Data section for currently available analysis.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ========================================
// INTERACTIVE MAPS COMPONENT
// ========================================
function InteractiveMaps({ onBack }) {
  const [showIntro, setShowIntro] = useState(true);
  const [activeTab, setActiveTab] = useState('informal');
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [hoveredProvince, setHoveredProvince] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [urbanFilter, setUrbanFilter] = useState('all');

  const currentConfig = mapConfigs[activeTab];

  const getColor = (value, config) => {
    if (!value || value === null || isNaN(value)) return '#e5e7eb';
    for (let i = 0; i < config.colorScale.length; i++) {
      if (value < config.colorScale[i].threshold) {
        return config.colorScale[i].color;
      }
    }
    return config.colorScale[config.colorScale.length - 1].color;
  };

  const getProvinceValue = (provinceName) => {
    let pdata = completeMapData[provinceName];
    if (!pdata) {
      for (const [key, value] of Object.entries(completeMapData)) {
        if (key.toLowerCase().includes(provinceName.toLowerCase()) ||
            provinceName.toLowerCase().includes(key.toLowerCase())) {
          pdata = value; break;
        }
      }
    }
    if (!pdata) return null;
    if (currentConfig.dataKey === 'non_ag_informal_pct')
      return Math.max(0, pdata.informal_pct - pdata.agricultural_pct);
    if (currentConfig.dataKey === 'rural_pct')
      return 100 - pdata.urban_pct_gso_2024;
    return pdata[currentConfig.dataKey];
  };

  const getProvinceData = (provinceName) => {
    if (completeMapData[provinceName]) {
      return completeMapData[provinceName];
    }
    for (const [key, value] of Object.entries(completeMapData)) {
      if (key.toLowerCase().includes(provinceName.toLowerCase()) ||
          provinceName.toLowerCase().includes(key.toLowerCase())) {
        return value;
      }
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
    const values = Object.values(completeMapData)
      .map(p => p[currentConfig.dataKey])
      .filter(v => v !== null && v !== undefined && !isNaN(v));
    
    if (values.length === 0) return { max: 'N/A', min: 'N/A', avg: 'N/A' };

    const max = Math.max(...values);
    const min = Math.min(...values);
    const avg = values.reduce((a, b) => a + b, 0) / values.length;
    
    const formatValue = (val) => {
      if (currentConfig.unit === '%') return val.toFixed(1) + '%';
      if (currentConfig.unit === 'k') return (val / 1000).toFixed(0) + 'k';
      return val.toFixed(1);
    };
    
    return { max: formatValue(max), min: formatValue(min), avg: formatValue(avg) };
  }, [activeTab, currentConfig]);

  const geoToSVGPath = (coordinates, projection) => {
    const coordinateType = Array.isArray(coordinates[0][0][0]) ? 'MultiPolygon' : 'Polygon';
    
    if (coordinateType === 'MultiPolygon') {
      return coordinates.map(polygon => 
        polygon.map(ring => 
          ring.map((point, i) => {
            const [x, y] = projection(point);
            return `${i === 0 ? 'M' : 'L'}${x},${y}`;
          }).join(' ') + ' Z'
        ).join(' ')
      ).join(' ');
    } else {
      return coordinates.map(ring => 
        ring.map((point, i) => {
          const [x, y] = projection(point);
          return `${i === 0 ? 'M' : 'L'}${x},${y}`;
        }).join(' ') + ' Z'
      ).join(' ');
    }
  };

  const project = (coord) => {
    const [lon, lat] = coord;
    const width = 500, height = 900;
    const lonMin = 102, lonMax = 110, latMin = 8, latMax = 24;
    const x = ((lon - lonMin) / (lonMax - lonMin)) * width;
    const y = height - ((lat - latMin) / (latMax - latMin)) * height;
    return [x, y];
  };

  const formatValue = (value) => {
    if (value === null || value === undefined || isNaN(value)) return 'N/A';
    if (currentConfig.unit === '%') return value.toFixed(1) + '%';
    if (currentConfig.unit === 'k') return (value / 1000).toFixed(1) + 'k';
    return value.toFixed(2);
  };

  return (
    <div style={{ display: 'flex', height: '100vh', fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Helvetica Neue", Arial, sans-serif', background: '#f5f5f5' }}>
      <div style={{ width: sidebarOpen ? '380px' : '0', background: 'white', borderRight: '1px solid #e0e0e0', overflow: 'hidden', transition: 'width 0.3s', display: 'flex', flexDirection: 'column' }}>
        <div style={{ background: '#00bfa5', color: 'white', padding: '20px 24px', borderBottom: '3px solid #00897b' }}>
          <button onClick={onBack} style={{ background: 'rgba(255,255,255,0.2)', color: 'white', padding: '6px 12px', fontSize: '12px', fontWeight: '600', border: 'none', borderRadius: '4px', cursor: 'pointer', marginBottom: '12px' }}>
            ← Back to Overview
          </button>
          <h1 style={{ margin: 0, fontSize: '20px', fontWeight: '600', letterSpacing: '0.5px' }}>Geographic Data</h1>
          <p style={{ margin: '8px 0 0 0', fontSize: '13px', opacity: 0.9 }}>Provincial employment patterns</p>
        </div>
        <div style={{ background: '#fafafa', borderBottom: '1px solid #e0e0e0', padding: '12px 16px' }}>
          <div style={{ fontSize: '11px', fontWeight: '600', color: '#666', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Select Indicator</div>
          {Object.entries(mapConfigs).map(([key, config]) => (
            <button key={key} onClick={() => { setActiveTab(key); setSelectedProvince(null); }} style={{ display: 'block', width: '100%', padding: '10px 12px', marginBottom: '6px', border: activeTab === key ? '2px solid #00bfa5' : '1px solid #e0e0e0', background: activeTab === key ? '#e0f7f4' : 'white', color: activeTab === key ? '#00897b' : '#333', fontWeight: activeTab === key ? '600' : '400', fontSize: '14px', cursor: 'pointer', borderRadius: '4px', textAlign: 'left', transition: 'all 0.2s' }}>{config.title}</button>
          ))}
        </div>
        <div style={{ flex: 1, overflowY: 'auto', padding: '20px 24px' }}>
          {selectedProvince ? (
            <div>
              <div style={{ fontSize: '11px', fontWeight: '600', color: '#00bfa5', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Selected Province</div>
              <h2 style={{ margin: '0 0 20px 0', fontSize: '22px', fontWeight: '600', color: '#333' }}>{selectedProvince}</h2>
              <div style={{ background: '#fafafa', padding: '16px', borderRadius: '4px', marginBottom: '20px', borderLeft: '4px solid #00bfa5' }}>
                <div style={{ fontSize: '12px', color: '#666', marginBottom: '4px', fontWeight: '500' }}>{currentConfig.title}</div>
                <div style={{ fontSize: '36px', fontWeight: '700', color: '#333' }}>{formatValue(getProvinceValue(selectedProvince))}</div>
              </div>
              <div style={{ fontSize: '11px', fontWeight: '600', color: '#666', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>All Indicators</div>
              {Object.entries(mapConfigs).map(([key, config]) => {
                const provinceData = getProvinceData(selectedProvince);
                const val = provinceData?.[config.dataKey];
                return (
                  <div key={key} style={{ borderBottom: '1px solid #f0f0f0', padding: '12px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ fontSize: '13px', color: '#666' }}>{config.title}</div>
                    <div style={{ fontSize: '16px', fontWeight: '600', color: '#333' }}>{val !== null && val !== undefined && !isNaN(val) ? (config.unit === '%' ? val.toFixed(1) + '%' : config.unit === 'k' ? (val/1000).toFixed(1) + 'k' : val.toFixed(1)) : 'N/A'}</div>
                  </div>
                );
              })}
              <button onClick={() => setSelectedProvince(null)} style={{ width: '100%', marginTop: '20px', padding: '10px', background: 'white', border: '1px solid #e0e0e0', color: '#666', fontSize: '13px', fontWeight: '500', borderRadius: '4px', cursor: 'pointer' }}>Clear Selection</button>
            </div>
          ) : (
            <div>
              <div style={{ fontSize: '11px', fontWeight: '600', color: '#00bfa5', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Current Indicator</div>
              <h2 style={{ margin: '0 0 16px 0', fontSize: '22px', fontWeight: '600', color: '#333' }}>{currentConfig.title}</h2>
              <p style={{ fontSize: '14px', color: '#666', lineHeight: '1.6', marginBottom: '20px' }}>{currentConfig.description}</p>
              <div style={{ fontSize: '11px', fontWeight: '600', color: '#666', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Summary Statistics</div>
              <div style={{ background: '#fafafa', padding: '16px', borderRadius: '4px', marginBottom: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}><span style={{ fontSize: '13px', color: '#666' }}>Minimum</span><span style={{ fontSize: '16px', fontWeight: '600', color: '#22c55e' }}>{stats.min}</span></div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}><span style={{ fontSize: '13px', color: '#666' }}>Mean</span><span style={{ fontSize: '16px', fontWeight: '600', color: '#3b82f6' }}>{stats.avg}</span></div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ fontSize: '13px', color: '#666' }}>Maximum</span><span style={{ fontSize: '16px', fontWeight: '600', color: '#dc2626' }}>{stats.max}</span></div>
              </div>
              <div style={{ background: '#e0f7f4', padding: '12px', borderRadius: '4px', fontSize: '13px', color: '#00897b', lineHeight: '1.5' }}>Click any province to view detailed statistics.</div>
            </div>
          )}
        </div>
        <div style={{ padding: '16px 24px', borderTop: '1px solid #e0e0e0', background: '#fafafa', fontSize: '11px', color: '#999' }}>Data: GSO Labor Force Survey 2023</div>
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#f5f5f5', position: 'relative' }}>
        <div style={{ position: 'absolute', top: '20px', left: '20px', zIndex: 1000, display: 'flex', gap: '8px' }}>
          <button onClick={() => setSidebarOpen(!sidebarOpen)} style={{ background: 'white', border: '1px solid #e0e0e0', borderRadius: '4px', padding: '8px 12px', cursor: 'pointer', fontSize: '14px', fontWeight: '500', color: '#666', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>{sidebarOpen ? '◀ Hide' : '▶ Show'} Panel</button>
          <button onClick={() => setUrbanFilter(urbanFilter === 'all' ? '50' : urbanFilter === '50' ? '70' : 'all')} style={{ background: urbanFilter !== 'all' ? '#00bfa5' : 'white', border: '1px solid #e0e0e0', borderRadius: '4px', padding: '8px 12px', cursor: 'pointer', fontSize: '13px', fontWeight: '500', color: urbanFilter !== 'all' ? 'white' : '#666', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', whiteSpace: 'nowrap' }}>{urbanFilter === 'all' ? ' Urban Filter: Off' : urbanFilter === '50' ? ' Urban >50%' : ' Urban >70%'}</button>
        </div>
        <div style={{ position: 'absolute', bottom: '20px', right: '20px', background: 'white', border: '1px solid #e0e0e0', borderRadius: '4px', padding: '16px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', zIndex: 1000, minWidth: '200px' }}>
          <div style={{ fontSize: '12px', fontWeight: '600', color: '#333', marginBottom: '12px' }}>{currentConfig.title}</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>{currentConfig.colorScale.map(({ color, label }) => (<div key={label} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><div style={{ width: '24px', height: '16px', backgroundColor: color, borderRadius: '2px' }}></div><span style={{ fontSize: '11px', color: '#666' }}>{label}</span></div>))}</div>
        </div>
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px', position: 'relative' }}>
          <svg viewBox="0 0 500 900" style={{ width: '100%', height: '100%', maxWidth: '600px', maxHeight: '900px', filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.1))' }}>
            {vietnamGeoData.features.map((feature, idx) => {
              const provinceName = feature.properties.NAME_1;
              const value = getProvinceValue(provinceName);
              const fillColor = getColor(value, currentConfig);
              const isSelected = selectedProvince === provinceName;
              const isHovered = hoveredProvince === provinceName;
              const pathData = geoToSVGPath(feature.geometry.coordinates, project);
              return (<path key={idx} d={pathData} fill={fillColor} stroke={isSelected ? '#00bfa5' : isHovered ? '#00bfa5' : 'white'} strokeWidth={isSelected ? 3 : isHovered ? 2 : 0.5} style={{ cursor: 'pointer', transition: 'all 0.2s', filter: isHovered ? 'brightness(1.1)' : 'none', opacity: isUrbanFiltered(provinceName) ? 1 : 0.15 }} onClick={() => setSelectedProvince(provinceName)} onMouseEnter={() => setHoveredProvince(provinceName)} onMouseLeave={() => setHoveredProvince(null)}><title>{`${provinceName}: ${formatValue(value)}`}</title></path>);
            })}
          </svg>
          {hoveredProvince && !selectedProvince && (<div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', background: 'white', border: '2px solid #00bfa5', borderRadius: '4px', padding: '16px', boxShadow: '0 4px 12px rgba(0,0,0,0.15)', pointerEvents: 'none', zIndex: 1001 }}><div style={{ fontSize: '14px', fontWeight: '600', color: '#333', marginBottom: '4px' }}>{hoveredProvince}</div><div style={{ fontSize: '24px', fontWeight: '700', color: '#00bfa5' }}>{formatValue(getProvinceValue(hoveredProvince))}</div><div style={{ fontSize: '11px', color: '#999', marginTop: '4px' }}>Click to view details</div></div>)}
        </div>
      </div>
      {showIntro && (
  <div style={{
    position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)',
    zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center'
  }}>
    <div style={{
      background: 'white', borderRadius: '8px', padding: '48px',
      maxWidth: '560px', width: '90%', boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
    }}>
      <div style={{ fontSize: '11px', fontWeight: '700', color: '#00897b', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '12px' }}>
        Interactive Geographic Data
      </div>
      <h2 style={{ fontSize: '28px', fontWeight: '700', color: '#1a1a1a', margin: '0 0 16px 0', lineHeight: '1.2' }}>
        Mapping Vietnam's Informal Economy
      </h2>
      <p style={{ fontSize: '15px', color: '#555', lineHeight: '1.7', marginBottom: '16px' }}>
        This tool visualizes 7 provincial-level indicators across all 63 provinces of Vietnam, from informal employment rates to rural population share and the sidewalk economy.
      </p>
      <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '6px', padding: '16px', marginBottom: '24px' }}>
        <div style={{ fontSize: '13px', fontWeight: '600', color: '#166534', marginBottom: '8px' }}>How to use</div>
        <div style={{ fontSize: '13px', color: '#166534', lineHeight: '1.8' }}>
          • Select an indicator from the left panel<br/>
          • Click any province to see all its data<br/>
          • Use the Urban Filter to focus on urbanized provinces<br/>
          • Toggle the panel with the Hide/Show button
        </div>
      </div>
      <button
        onClick={() => setShowIntro(false)}
        style={{
          width: '100%', padding: '14px', background: '#00897b',
          color: 'white', border: 'none', borderRadius: '6px',
          fontSize: '15px', fontWeight: '700', cursor: 'pointer'
        }}
      >
        Start Exploring →
      </button>
    </div>
  </div>
)}
    </div>
  );
}

// ========================================
// MAIN APP COMPONENT
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
        return <PlaceholderPage 
          title="Narrative Analysis" 
          description="This section will provide a detailed narrative examination of Vietnam's informal economy, exploring historical context, current challenges, and human impact through an interactive storytelling experience." 
          onBack={() => setCurrentPage('landing')} 
        />;
      case 'sector':
        return <PlaceholderPage 
          title="Sectoral Analysis" 
          description="Comprehensive breakdown of informal employment patterns across economic sectors including agriculture, manufacturing, services, and the urban sidewalk economy with comparative visualizations." 
          onBack={() => setCurrentPage('landing')} 
        />;
      case 'policy':
        return <PlaceholderPage 
          title="Policy Impact Analysis" 
          description="Interactive modeling tool to examine the potential fiscal and employment effects of various policy interventions including tax reform, social insurance expansion, and formalization incentives." 
          onBack={() => setCurrentPage('landing')} 
        />;
      case 'informal-explainer':
        return <InformalExplainer onBack={() => setCurrentPage('landing')} />;
      default:
        return <LandingPage onNavigate={setCurrentPage} />;
    }
  };

  return renderPage();
}

export default App;
