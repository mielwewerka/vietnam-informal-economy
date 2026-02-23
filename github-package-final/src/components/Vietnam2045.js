// ========================================
// VIETNAM 2045 - Policy Context Page
// ========================================

import React from 'react';

function Vietnam2045({ onBack }) {
  return (
    <div style={{ minHeight: '100vh', background: '#fafafa', fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Helvetica Neue", Arial, sans-serif' }}>
      <div style={{ background: 'white', borderBottom: '1px solid #e0e0e0', padding: '24px 40px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <button onClick={onBack} style={{ background: 'transparent', color: '#00bfa5', padding: '8px 16px', fontSize: '14px', fontWeight: '600', border: '1px solid #00bfa5', borderRadius: '4px', cursor: 'pointer', marginBottom: '16px' }}>
            ← Back to Overview
          </button>
          <h1 style={{ margin: 0, fontSize: '36px', fontWeight: '700', color: '#333' }}>Vietnam 2045</h1>
          <p style={{ margin: '8px 0 0 0', fontSize: '16px', color: '#666' }}>National Development Vision & Fiscal Challenges</p>
        </div>
      </div>
      
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '60px 40px' }}>
        
        {/* Hero Visual */}
        <div style={{ background: 'linear-gradient(135deg, #00bfa5 0%, #00897b 100%)', borderRadius: '8px', padding: '60px 40px', marginBottom: '48px', textAlign: 'center' }}>
          <div style={{ fontSize: '72px', marginBottom: '16px' }}>🇻🇳</div>
          <h2 style={{ fontSize: '42px', fontWeight: '700', color: 'white', margin: '0 0 16px 0' }}>Vision 2045</h2>
          <p style={{ fontSize: '20px', color: 'rgba(255,255,255,0.9)', margin: 0 }}>
            A developed nation with high income
          </p>
        </div>

        {/* Overview */}
        <div style={{ background: 'white', border: '1px solid #e0e0e0', borderRadius: '4px', padding: '40px', marginBottom: '32px' }}>
          <h3 style={{ fontSize: '24px', fontWeight: '600', color: '#333', marginBottom: '20px' }}>
            The Vision
          </h3>
          <p style={{ fontSize: '16px', color: '#666', lineHeight: '1.7', marginBottom: '20px' }}>
            Vietnam 2045 represents the country's ambitious development strategy, targeting transformation into a <strong>high-income developed nation</strong> by the 100th anniversary of independence. This vision requires sustained economic growth, industrial modernization, and crucially—substantial fiscal capacity.
          </p>
          <p style={{ fontSize: '16px', color: '#666', lineHeight: '1.7', margin: 0 }}>
            However, Vietnam faces a fundamental challenge: with 64.5% of the workforce in the informal sector, the government's ability to generate tax revenue and fund development priorities is severely constrained.
          </p>
        </div>

        {/* Key Targets */}
        <div style={{ marginBottom: '32px' }}>
          <h3 style={{ fontSize: '24px', fontWeight: '600', color: '#333', marginBottom: '20px' }}>
            Key Development Targets
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div style={{ background: 'white', border: '1px solid #e0e0e0', borderRadius: '4px', padding: '24px' }}>
              <div style={{ fontSize: '36px', marginBottom: '12px' }}>📈</div>
              <h4 style={{ fontSize: '16px', fontWeight: '600', color: '#333', marginBottom: '8px' }}>
                Economic Growth
              </h4>
              <p style={{ fontSize: '14px', color: '#666', lineHeight: '1.6', margin: 0 }}>
                Achieve high-income status (>$12,000 GDP per capita) with sustained 7%+ annual growth
              </p>
            </div>
            <div style={{ background: 'white', border: '1px solid #e0e0e0', borderRadius: '4px', padding: '24px' }}>
              <div style={{ fontSize: '36px', marginBottom: '12px' }}>🏭</div>
              <h4 style={{ fontSize: '16px', fontWeight: '600', color: '#333', marginBottom: '8px' }}>
                Industrial Modernization
              </h4>
              <p style={{ fontSize: '14px', color: '#666', lineHeight: '1.6', margin: 0 }}>
                Transform from labor-intensive to technology-driven economy with advanced manufacturing
              </p>
            </div>
            <div style={{ background: 'white', border: '1px solid #e0e0e0', borderRadius: '4px', padding: '24px' }}>
              <div style={{ fontSize: '36px', marginBottom: '12px' }}>🏥</div>
              <h4 style={{ fontSize: '16px', fontWeight: '600', color: '#333', marginBottom: '8px' }}>
                Social Protection
              </h4>
              <p style={{ fontSize: '14px', color: '#666', lineHeight: '1.6', margin: 0 }}>
                Universal healthcare, comprehensive social insurance, and modern public services
              </p>
            </div>
            <div style={{ background: 'white', border: '1px solid #e0e0e0', borderRadius: '4px', padding: '24px' }}>
              <div style={{ fontSize: '36px', marginBottom: '12px' }}>🌱</div>
              <h4 style={{ fontSize: '16px', fontWeight: '600', color: '#333', marginBottom: '8px' }}>
                Sustainable Development
              </h4>
              <p style={{ fontSize: '14px', color: '#666', lineHeight: '1.6', margin: 0 }}>
                Green growth, climate resilience, and environmental protection alongside economic progress
              </p>
            </div>
          </div>
        </div>

        {/* The Fiscal Challenge */}
        <div style={{ background: '#fff4e6', border: '1px solid #ffb74d', borderLeft: '4px solid #ff9800', borderRadius: '4px', padding: '32px', marginBottom: '32px' }}>
          <h3 style={{ fontSize: '24px', fontWeight: '600', color: '#e65100', marginBottom: '16px' }}>
            The Fiscal Challenge
          </h3>
          <p style={{ fontSize: '16px', color: '#5d4037', lineHeight: '1.7', marginBottom: '16px' }}>
            Achieving these ambitious goals requires <strong>substantial public investment</strong> in infrastructure, education, healthcare, and technology. However, Vietnam's tax-to-GDP ratio remains low by regional standards, hovering around 18-19%.
          </p>
          <p style={{ fontSize: '16px', color: '#5d4037', lineHeight: '1.7', margin: 0 }}>
            The informal sector—where 64.5% of workers operate—pays minimal taxes and receives limited government services. This creates a fiscal trap: insufficient revenue limits public investment, which in turn constrains formalization and economic upgrading.
          </p>
        </div>

        {/* Why Formalization Matters */}
        <div style={{ background: 'white', border: '1px solid #e0e0e0', borderRadius: '4px', padding: '40px' }}>
          <h3 style={{ fontSize: '24px', fontWeight: '600', color: '#333', marginBottom: '20px' }}>
            Why Formalization is Critical
          </h3>
          <div style={{ borderLeft: '3px solid #00bfa5', paddingLeft: '20px', marginBottom: '20px' }}>
            <h4 style={{ fontSize: '16px', fontWeight: '600', color: '#333', marginBottom: '8px' }}>Revenue Generation</h4>
            <p style={{ fontSize: '14px', color: '#666', lineHeight: '1.6', margin: 0 }}>
              Formal businesses contribute income tax, VAT, and social insurance—essential for funding Vision 2045 priorities
            </p>
          </div>
          <div style={{ borderLeft: '3px solid #00bfa5', paddingLeft: '20px', marginBottom: '20px' }}>
            <h4 style={{ fontSize: '16px', fontWeight: '600', color: '#333', marginBottom: '8px' }}>Worker Protection</h4>
            <p style={{ fontSize: '14px', color: '#666', lineHeight: '1.6', margin: 0 }}>
              Formal employment provides social insurance, healthcare, pensions, and labor protections—critical for shared prosperity
            </p>
          </div>
          <div style={{ borderLeft: '3px solid #00bfa5', paddingLeft: '20px' }}>
            <h4 style={{ fontSize: '16px', fontWeight: '600', color: '#333', marginBottom: '8px' }}>Economic Upgrading</h4>
            <p style={{ fontSize: '14px', color: '#666', lineHeight: '1.6', margin: 0 }}>
              Formal firms invest more in training, technology, and innovation—necessary for the high-value economy Vietnam aspires to build
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Vietnam2045;
