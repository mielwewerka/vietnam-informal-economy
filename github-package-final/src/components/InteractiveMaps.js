// ========================================
// INTERACTIVE MAPS - Geographic Data Visualization
// ========================================

import React, { useState, useMemo } from 'react';
import { mapConfigs } from '../config/mapConfigs';
import vietnamGeoData from '../data/vietnamGeoData.json';
import completeMapData from '../data/completeMapData.json';

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

export default InteractiveMaps;
