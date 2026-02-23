// ========================================
// LANDING PAGE - Home with Scroll Effects
// ========================================

import React, { useState, useEffect } from 'react';

function LandingPage({ onNavigate }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div style={{ minHeight: '100vh', background: '#fafafa', fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Helvetica Neue", Arial, sans-serif' }}>
      
      {/* Sticky Header (appears on scroll) */}
      <div style={{ 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        right: 0, 
        background: 'white', 
        borderBottom: '1px solid #e0e0e0', 
        padding: '16px 40px',
        zIndex: 1000,
        transform: scrolled ? 'translateY(0)' : 'translateY(-100%)',
        transition: 'transform 0.3s ease',
        boxShadow: scrolled ? '0 2px 8px rgba(0,0,0,0.05)' : 'none'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontSize: '16px', fontWeight: '600', color: '#333' }}>
            Vietnam Informal Employment
          </div>
          <div style={{ display: 'flex', gap: '24px' }}>
            <button onClick={() => onNavigate('maps')} style={{ background: 'transparent', border: 'none', color: '#666', fontSize: '14px', fontWeight: '500', cursor: 'pointer' }}>Data</button>
            <button onClick={() => onNavigate('vietnam2045')} style={{ background: 'transparent', border: 'none', color: '#666', fontSize: '14px', fontWeight: '500', cursor: 'pointer' }}>Vietnam 2045</button>
            <button onClick={() => onNavigate('informal-explainer')} style={{ background: 'transparent', border: 'none', color: '#666', fontSize: '14px', fontWeight: '500', cursor: 'pointer' }}>Informal Economy</button>
          </div>
        </div>
      </div>

      {/* Full-Screen Hero Section */}
      <div style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #00bfa5 0%, #00897b 100%)',
        padding: '40px',
        position: 'relative'
      }}>
        <div style={{ textAlign: 'center', maxWidth: '900px' }}>
          <h1 style={{ 
            fontSize: '72px', 
            fontWeight: '800', 
            color: 'white', 
            margin: '0 0 32px 0', 
            letterSpacing: '-2px', 
            lineHeight: '1.1' 
          }}>
            Vietnam's Informal Economy
          </h1>
          <p style={{ 
            fontSize: '28px', 
            color: 'rgba(255,255,255,0.95)', 
            margin: '0 0 48px 0', 
            lineHeight: '1.5',
            fontWeight: '400'
          }}>
            Examining fiscal implications and policy pathways toward formalization
          </p>
          <div style={{ fontSize: '16px', color: 'rgba(255,255,255,0.8)', marginBottom: '48px' }}>
            ECON 62 Final Project • Winter 2026
          </div>
          <div style={{ 
            color: 'rgba(255,255,255,0.7)', 
            fontSize: '14px',
            animation: 'bounce 2s infinite'
          }}>
            ↓ Scroll to explore
          </div>
        </div>
        <style>{`
          @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(10px); }
          }
        `}</style>
      </div>

      {/* Content Section */}
      <div style={{ background: '#fafafa' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '80px 40px' }}>
          
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

          {/* Navigation Grid */}
          <div style={{ marginBottom: '40px' }}>
            <h3 style={{ fontSize: '28px', fontWeight: '600', color: '#333', marginBottom: '24px' }}>
              Explore the Project
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '24px' }}>
              
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
                <h4 style={{ fontSize: '18px', fontWeight: '600', color: '#333', marginBottom: '12px' }}>
                  Interactive Geographic Data
                </h4>
                <p style={{ fontSize: '14px', color: '#666', lineHeight: '1.6', margin: 0 }}>
                  Explore provincial employment patterns across four key dimensions.
                </p>
                <div style={{ marginTop: '16px', fontSize: '14px', fontWeight: '600', color: '#00bfa5' }}>
                  View Data →
                </div>
              </button>

              <button
                onClick={() => onNavigate('vietnam2045')}
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
                  Policy Context
                </div>
                <h4 style={{ fontSize: '18px', fontWeight: '600', color: '#333', marginBottom: '12px' }}>
                  Vietnam 2045
                </h4>
                <p style={{ fontSize: '14px', color: '#666', lineHeight: '1.6', margin: 0 }}>
                  Understanding Vietnam's development vision and fiscal challenges.
                </p>
                <div style={{ marginTop: '16px', fontSize: '14px', fontWeight: '600', color: '#00bfa5' }}>
                  Learn More →
                </div>
              </button>

              <button
                onClick={() => onNavigate('informal-explainer')}
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
                  Background
                </div>
                <h4 style={{ fontSize: '18px', fontWeight: '600', color: '#333', marginBottom: '12px' }}>
                  The Informal Economy
                </h4>
                <p style={{ fontSize: '14px', color: '#666', lineHeight: '1.6', margin: 0 }}>
                  History, significance, and human impact of informal work.
                </p>
                <div style={{ marginTop: '16px', fontSize: '14px', fontWeight: '600', color: '#00bfa5' }}>
                  Explore →
                </div>
              </button>

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
    </div>
  );
}

export default LandingPage;
