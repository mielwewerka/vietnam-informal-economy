// ========================================
// VIETNAM INFORMAL ECONOMY PROJECT
// Professional Academic Style
// ========================================
//Yay!
import React, { useState, useMemo } from 'react';
import vietnamGeoData from './data/vietnamGeoData.json';
import completeMapData from './data/completeMapData.json';

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
  }
};

// ========================================
// LANDING PAGE COMPONENT
// ========================================
function LandingPage({ onNavigate }) {
  return (
    <div style={{ minHeight: '100vh', background: '#fafafa', fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Helvetica Neue", Arial, sans-serif' }}>
      {/* Header */}
      <div style={{ background: 'white', borderBottom: '1px solid #e0e0e0', padding: '24px 40px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 style={{ margin: 0, fontSize: '24px', fontWeight: '600', color: '#333', letterSpacing: '-0.5px' }}>
              Vietnam Informal Employment
            </h1>
            <p style={{ margin: '4px 0 0 0', fontSize: '14px', color: '#666' }}>
              Economic Analysis & Policy Implications
            </p>
          </div>
          <div style={{ fontSize: '13px', color: '#999' }}>
            ECON 62 • Winter 2026
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '60px 40px' }}>
        
        {/* Hero Section */}
        <div style={{ marginBottom: '60px' }}>
          <div style={{ maxWidth: '800px' }}>
            <h2 style={{ fontSize: '42px', fontWeight: '700', color: '#1a1a1a', lineHeight: '1.2', marginBottom: '24px', letterSpacing: '-1px' }}>
              Understanding Fiscal Challenges in Vietnam's Informal Economy
            </h2>
            <p style={{ fontSize: '20px', color: '#555', lineHeight: '1.6', marginBottom: '32px' }}>
              This research examines how Vietnam's high rate of informal employment affects fiscal revenue and explores evidence-based policy interventions to address this challenge.
            </p>
          </div>
        </div>

        {/* Key Statistics */}
        <div style={{ background: 'white', border: '1px solid #e0e0e0', borderRadius: '4px', padding: '40px', marginBottom: '60px' }}>
          <div style={{ fontSize: '12px', fontWeight: '600', color: '#666', marginBottom: '24px', textTransform: 'uppercase', letterSpacing: '1px' }}>
            Key Findings
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '40px' }}>
            <div>
              <div style={{ fontSize: '48px', fontWeight: '700', color: '#00bfa5', marginBottom: '8px' }}>64.5%</div>
              <div style={{ fontSize: '14px', color: '#666', lineHeight: '1.5' }}>
                of Vietnam's workforce operates in the informal sector as of 2024
              </div>
            </div>
            <div>
              <div style={{ fontSize: '48px', fontWeight: '700', color: '#00bfa5', marginBottom: '8px' }}>63</div>
              <div style={{ fontSize: '14px', color: '#666', lineHeight: '1.5' }}>
                provinces analyzed with detailed employment pattern variations
              </div>
            </div>
            <div>
              <div style={{ fontSize: '48px', fontWeight: '700', color: '#00bfa5', marginBottom: '8px' }}>85.9%</div>
              <div style={{ fontSize: '14px', color: '#666', lineHeight: '1.5' }}>
                highest provincial informal employment rate (Hà Giang)
              </div>
            </div>
          </div>
        </div>

        {/* Research Overview */}
        <div style={{ marginBottom: '60px' }}>
          <h3 style={{ fontSize: '28px', fontWeight: '600', color: '#333', marginBottom: '24px' }}>
            Research Overview
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
            <div style={{ background: 'white', border: '1px solid #e0e0e0', borderRadius: '4px', padding: '32px' }}>
              <h4 style={{ fontSize: '16px', fontWeight: '600', color: '#333', marginBottom: '12px' }}>
                Research Question
              </h4>
              <p style={{ fontSize: '14px', color: '#666', lineHeight: '1.6', margin: 0 }}>
                How does Vietnam's high informal employment rate affect fiscal revenue capacity, and what evidence-based policy interventions can effectively address this structural challenge while promoting economic formalization?
              </p>
            </div>
            <div style={{ background: 'white', border: '1px solid #e0e0e0', borderRadius: '4px', padding: '32px' }}>
              <h4 style={{ fontSize: '16px', fontWeight: '600', color: '#333', marginBottom: '12px' }}>
                Methodology
              </h4>
              <p style={{ fontSize: '14px', color: '#666', lineHeight: '1.6', margin: 0 }}>
                Analysis of General Statistics Office Labor Force Survey 2023 data, combined with provincial-level employment patterns, fiscal revenue data, and comparative policy research from similar middle-income economies.
              </p>
            </div>
          </div>
        </div>

        {/* Main Findings */}
        <div style={{ marginBottom: '60px' }}>
          <h3 style={{ fontSize: '28px', fontWeight: '600', color: '#333', marginBottom: '24px' }}>
            Principal Findings
          </h3>
          <div style={{ background: 'white', border: '1px solid #e0e0e0', borderRadius: '4px', padding: '32px' }}>
            <div style={{ marginBottom: '24px', paddingBottom: '24px', borderBottom: '1px solid #f0f0f0' }}>
              <div style={{ fontSize: '14px', fontWeight: '600', color: '#333', marginBottom: '8px' }}>
                Geographic Variation
              </div>
              <p style={{ fontSize: '14px', color: '#666', lineHeight: '1.6', margin: 0 }}>
                Informal employment rates vary significantly across provinces, from 43.1% in Hải Phòng to 85.9% in Hà Giang, correlating strongly with urbanization levels and agricultural dependency.
              </p>
            </div>
            <div style={{ marginBottom: '24px', paddingBottom: '24px', borderBottom: '1px solid #f0f0f0' }}>
              <div style={{ fontSize: '14px', fontWeight: '600', color: '#333', marginBottom: '8px' }}>
                Fiscal Implications
              </div>
              <p style={{ fontSize: '14px', color: '#666', lineHeight: '1.6', margin: 0 }}>
                High informal employment rates constrain tax revenue collection, limit social insurance coverage, and create challenges for effective public service provision and fiscal sustainability.
              </p>
            </div>
            <div>
              <div style={{ fontSize: '14px', fontWeight: '600', color: '#333', marginBottom: '8px' }}>
                Sectoral Patterns
              </div>
              <p style={{ fontSize: '14px', color: '#666', lineHeight: '1.6', margin: 0 }}>
                Agriculture sector shows nearly universal informality (97.9%), while urban services and manufacturing sectors demonstrate more formalization, particularly in major metropolitan areas.
              </p>
            </div>
          </div>
        </div>

        {/* Navigation Sections */}
        <div style={{ marginBottom: '40px' }}>
          <h3 style={{ fontSize: '28px', fontWeight: '600', color: '#333', marginBottom: '24px' }}>
            Project Components
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
            
            {/* Interactive Data */}
            <button
              onClick={() => onNavigate('maps')}
              style={{ 
                background: 'white', 
                border: '2px solid #00bfa5', 
                borderRadius: '4px', 
                padding: '32px', 
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.2s'
              }}
            >
              <div style={{ fontSize: '12px', fontWeight: '600', color: '#00bfa5', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '1px' }}>
                Available Now
              </div>
              <h4 style={{ fontSize: '20px', fontWeight: '600', color: '#333', marginBottom: '12px' }}>
                Interactive Geographic Data
              </h4>
              <p style={{ fontSize: '14px', color: '#666', lineHeight: '1.6', margin: 0 }}>
                Explore provincial-level employment patterns across four key dimensions: informal employment, agricultural workers, total employment, and the sidewalk economy.
              </p>
              <div style={{ marginTop: '16px', fontSize: '14px', fontWeight: '600', color: '#00bfa5' }}>
                View Data →
              </div>
            </button>

            {/* Narrative Analysis */}
            <div style={{ background: 'white', border: '1px solid #e0e0e0', borderRadius: '4px', padding: '32px', opacity: 0.6 }}>
              <div style={{ fontSize: '12px', fontWeight: '600', color: '#999', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '1px' }}>
                In Development
              </div>
              <h4 style={{ fontSize: '20px', fontWeight: '600', color: '#333', marginBottom: '12px' }}>
                Narrative Analysis
              </h4>
              <p style={{ fontSize: '14px', color: '#666', lineHeight: '1.6', margin: 0 }}>
                A detailed examination of Vietnam's informal economy evolution, structural patterns, and the human stories behind the statistics.
              </p>
            </div>

            {/* Sector Analysis */}
            <div style={{ background: 'white', border: '1px solid #e0e0e0', borderRadius: '4px', padding: '32px', opacity: 0.6 }}>
              <div style={{ fontSize: '12px', fontWeight: '600', color: '#999', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '1px' }}>
                In Development
              </div>
              <h4 style={{ fontSize: '20px', fontWeight: '600', color: '#333', marginBottom: '12px' }}>
                Sectoral Deep Dive
              </h4>
              <p style={{ fontSize: '14px', color: '#666', lineHeight: '1.6', margin: 0 }}>
                Comprehensive analysis of informal employment patterns across economic sectors with interactive comparisons and trend analysis.
              </p>
            </div>

            {/* Policy Tools */}
            <div style={{ background: 'white', border: '1px solid #e0e0e0', borderRadius: '4px', padding: '32px', opacity: 0.6 }}>
              <div style={{ fontSize: '12px', fontWeight: '600', color: '#999', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '1px' }}>
                In Development
              </div>
              <h4 style={{ fontSize: '20px', fontWeight: '600', color: '#333', marginBottom: '12px' }}>
                Policy Impact Analysis
              </h4>
              <p style={{ fontSize: '14px', color: '#666', lineHeight: '1.6', margin: 0 }}>
                Interactive tool to model the fiscal and employment effects of various policy interventions and formalization strategies.
              </p>
            </div>

          </div>
        </div>

        {/* Data Sources */}
        <div style={{ background: 'white', border: '1px solid #e0e0e0', borderRadius: '4px', padding: '32px' }}>
          <h4 style={{ fontSize: '16px', fontWeight: '600', color: '#333', marginBottom: '16px' }}>
            Data Sources & Acknowledgments
          </h4>
          <p style={{ fontSize: '13px', color: '#666', lineHeight: '1.6', marginBottom: '12px' }}>
            Primary data from the General Statistics Office of Vietnam Labor Force Survey 2023. Provincial boundary data from GADM (Database of Global Administrative Areas). Additional analysis incorporates World Bank development indicators and ILO informal economy research.
          </p>
          <p style={{ fontSize: '13px', color: '#999', lineHeight: '1.6', margin: 0 }}>
            Project developed for ECON 62: Development Economics, Winter 2026
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
  const [activeTab, setActiveTab] = useState('informal');
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [hoveredProvince, setHoveredProvince] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);

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
    if (completeMapData[provinceName]) {
      return completeMapData[provinceName][currentConfig.dataKey];
    }
    for (const [key, value] of Object.entries(completeMapData)) {
      if (key.toLowerCase().includes(provinceName.toLowerCase()) ||
          provinceName.toLowerCase().includes(key.toLowerCase())) {
        return value[currentConfig.dataKey];
      }
    }
    return null;
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
        <button onClick={() => setSidebarOpen(!sidebarOpen)} style={{ position: 'absolute', top: '20px', left: '20px', zIndex: 1000, background: 'white', border: '1px solid #e0e0e0', borderRadius: '4px', padding: '8px 12px', cursor: 'pointer', fontSize: '14px', fontWeight: '500', color: '#666', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>{sidebarOpen ? '◀ Hide' : '▶ Show'} Panel</button>
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
              return (<path key={idx} d={pathData} fill={fillColor} stroke={isSelected ? '#00bfa5' : isHovered ? '#00bfa5' : 'white'} strokeWidth={isSelected ? 3 : isHovered ? 2 : 0.5} style={{ cursor: 'pointer', transition: 'all 0.2s', filter: isHovered ? 'brightness(1.1)' : 'none' }} onClick={() => setSelectedProvince(provinceName)} onMouseEnter={() => setHoveredProvince(provinceName)} onMouseLeave={() => setHoveredProvince(null)}><title>{`${provinceName}: ${formatValue(value)}`}</title></path>);
            })}
          </svg>
          {hoveredProvince && !selectedProvince && (<div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', background: 'white', border: '2px solid #00bfa5', borderRadius: '4px', padding: '16px', boxShadow: '0 4px 12px rgba(0,0,0,0.15)', pointerEvents: 'none', zIndex: 1001 }}><div style={{ fontSize: '14px', fontWeight: '600', color: '#333', marginBottom: '4px' }}>{hoveredProvince}</div><div style={{ fontSize: '24px', fontWeight: '700', color: '#00bfa5' }}>{formatValue(getProvinceValue(hoveredProvince))}</div><div style={{ fontSize: '11px', color: '#999', marginTop: '4px' }}>Click to view details</div></div>)}
        </div>
      </div>
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
      default:
        return <LandingPage onNavigate={setCurrentPage} />;
    }
  };

  return renderPage();
}

export default App;
