// ========================================
// INFORMAL ECONOMY EXPLAINER
// ========================================

import React from 'react';

function InformalEconomyExplainer({ onBack }) {
  return (
    <div style={{ minHeight: '100vh', background: '#fafafa', fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Helvetica Neue", Arial, sans-serif' }}>
      <div style={{ background: 'white', borderBottom: '1px solid #e0e0e0', padding: '24px 40px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <button onClick={onBack} style={{ background: 'transparent', color: '#00bfa5', padding: '8px 16px', fontSize: '14px', fontWeight: '600', border: '1px solid #00bfa5', borderRadius: '4px', cursor: 'pointer', marginBottom: '16px' }}>
            ← Back to Overview
          </button>
          <h1 style={{ margin: 0, fontSize: '36px', fontWeight: '700', color: '#333' }}>Understanding the Informal Economy</h1>
          <p style={{ margin: '8px 0 0 0', fontSize: '16px', color: '#666' }}>History, Significance, and Human Impact</p>
        </div>
      </div>
      
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '60px 40px' }}>
        
        {/* Visual Header */}
        <div style={{ background: 'linear-gradient(to right, #f97316, #fb923c)', borderRadius: '8px', padding: '48px 40px', marginBottom: '48px', textAlign: 'center', color: 'white' }}>
          <div style={{ fontSize: '64px', marginBottom: '16px' }}>🏪</div>
          <h2 style={{ fontSize: '36px', fontWeight: '700', margin: '0 0 12px 0' }}>The Sidewalk Economy</h2>
          <p style={{ fontSize: '18px', opacity: 0.95, margin: 0 }}>
            Street vendors, motorbike taxis, home-based businesses—the backbone of daily life
          </p>
        </div>

        {/* What is Informal Work */}
        <div style={{ background: 'white', border: '1px solid #e0e0e0', borderRadius: '4px', padding: '40px', marginBottom: '32px' }}>
          <h3 style={{ fontSize: '24px', fontWeight: '600', color: '#333', marginBottom: '20px' }}>
            What is Informal Employment?
          </h3>
          <p style={{ fontSize: '16px', color: '#666', lineHeight: '1.7', marginBottom: '20px' }}>
            Informal employment includes all work arrangements that fall outside formal regulations—jobs without written contracts, social insurance, legal registration, or regular tax compliance. In Vietnam, this encompasses:
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginTop: '24px' }}>
            <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '4px', borderLeft: '3px solid #f97316' }}>
              <div style={{ fontSize: '24px', marginBottom: '8px' }}>🛵</div>
              <h4 style={{ fontSize: '14px', fontWeight: '600', color: '#333', marginBottom: '6px' }}>Street Vendors</h4>
              <p style={{ fontSize: '13px', color: '#666', lineHeight: '1.5', margin: 0 }}>Mobile food sellers, market stall operators</p>
            </div>
            <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '4px', borderLeft: '3px solid #f97316' }}>
              <div style={{ fontSize: '24px', marginBottom: '8px' }}>🏠</div>
              <h4 style={{ fontSize: '14px', fontWeight: '600', color: '#333', marginBottom: '6px' }}>Home-Based Work</h4>
              <p style={{ fontSize: '13px', color: '#666', lineHeight: '1.5', margin: 0 }}>Tailoring, food preparation, small manufacturing</p>
            </div>
            <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '4px', borderLeft: '3px solid #f97316' }}>
              <div style={{ fontSize: '24px', marginBottom: '8px' }}>🌾</div>
              <h4 style={{ fontSize: '14px', fontWeight: '600', color: '#333', marginBottom: '6px' }}>Smallholder Farming</h4>
              <p style={{ fontSize: '13px', color: '#666', lineHeight: '1.5', margin: 0 }}>Family farms, agricultural day laborers</p>
            </div>
            <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '4px', borderLeft: '3px solid #f97316' }}>
              <div style={{ fontSize: '24px', marginBottom: '8px' }}>🔧</div>
              <h4 style={{ fontSize: '14px', fontWeight: '600', color: '#333', marginBottom: '6px' }}>Repair Services</h4>
              <p style={{ fontSize: '13px', color: '#666', lineHeight: '1.5', margin: 0 }}>Motorbike repair, phone fixes, construction</p>
            </div>
          </div>
        </div>

        {/* Historical Context */}
        <div style={{ marginBottom: '32px' }}>
          <h3 style={{ fontSize: '24px', fontWeight: '600', color: '#333', marginBottom: '20px' }}>
            Historical Evolution in Vietnam
          </h3>
          <div style={{ background: 'white', border: '1px solid #e0e0e0', borderRadius: '4px', padding: '32px' }}>
            <div style={{ borderBottom: '2px solid #f0f0f0', paddingBottom: '20px', marginBottom: '20px' }}>
              <div style={{ fontSize: '14px', fontWeight: '600', color: '#00bfa5', marginBottom: '8px' }}>1986 - Đổi Mới Reforms</div>
              <p style={{ fontSize: '14px', color: '#666', lineHeight: '1.6', margin: 0 }}>
                Market liberalization created explosion of small businesses and self-employment, much of it informal
              </p>
            </div>
            <div style={{ borderBottom: '2px solid #f0f0f0', paddingBottom: '20px', marginBottom: '20px' }}>
              <div style={{ fontSize: '14px', fontWeight: '600', color: '#00bfa5', marginBottom: '8px' }}>1990s - Rapid Growth</div>
              <p style={{ fontSize: '14px', color: '#666', lineHeight: '1.6', margin: 0 }}>
                Urban migration intensified, street economy became essential livelihood strategy for rural-to-urban migrants
              </p>
            </div>
            <div style={{ borderBottom: '2px solid #f0f0f0', paddingBottom: '20px', marginBottom: '20px' }}>
              <div style={{ fontSize: '14px', fontWeight: '600', color: '#00bfa5', marginBottom: '8px' }}>2000s - Persistence</div>
              <p style={{ fontSize: '14px', color: '#666', lineHeight: '1.6', margin: 0 }}>
                Despite industrialization, informal work remained dominant—flexible, accessible, and deeply embedded in urban life
              </p>
            </div>
            <div>
              <div style={{ fontSize: '14px', fontWeight: '600', color: '#00bfa5', marginBottom: '8px' }}>2020s - Current Challenge</div>
              <p style={{ fontSize: '14px', color: '#666', lineHeight: '1.6', margin: 0 }}>
                64.5% informal rate creates fiscal constraints, limits social protection, and complicates path to high-income status
              </p>
            </div>
          </div>
        </div>

        {/* Why It Matters */}
        <div style={{ marginBottom: '32px' }}>
          <h3 style={{ fontSize: '24px', fontWeight: '600', color: '#333', marginBottom: '20px' }}>
            Why the Informal Economy Matters
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '16px' }}>
            <div style={{ background: 'white', border: '1px solid #e0e0e0', borderRadius: '4px', padding: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                <div style={{ fontSize: '32px', flexShrink: 0 }}>👥</div>
                <div>
                  <h4 style={{ fontSize: '16px', fontWeight: '600', color: '#333', marginBottom: '8px' }}>
                    Human Scale
                  </h4>
                  <p style={{ fontSize: '14px', color: '#666', lineHeight: '1.6', margin: 0 }}>
                    Millions depend on informal work for daily survival. Street vendors support families, send children to school, and build modest savings—all outside the formal system.
                  </p>
                </div>
              </div>
            </div>
            <div style={{ background: 'white', border: '1px solid #e0e0e0', borderRadius: '4px', padding: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                <div style={{ fontSize: '32px', flexShrink: 0 }}>💰</div>
                <div>
                  <h4 style={{ fontSize: '16px', fontWeight: '600', color: '#333', marginBottom: '8px' }}>
                    Fiscal Impact
                  </h4>
                  <p style={{ fontSize: '14px', color: '#666', lineHeight: '1.6', margin: 0 }}>
                    Informal workers pay minimal taxes but need public services. This constrains government revenue, limiting infrastructure investment and social programs.
                  </p>
                </div>
              </div>
            </div>
            <div style={{ background: 'white', border: '1px solid #e0e0e0', borderRadius: '4px', padding: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                <div style={{ fontSize: '32px', flexShrink: 0 }}>🛡️</div>
                <div>
                  <h4 style={{ fontSize: '16px', fontWeight: '600', color: '#333', marginBottom: '8px' }}>
                    Vulnerability
                  </h4>
                  <p style={{ fontSize: '14px', color: '#666', lineHeight: '1.6', margin: 0 }}>
                    No social insurance means medical emergencies or economic shocks can push informal workers into poverty. Limited legal protection exposes them to exploitation.
                  </p>
                </div>
              </div>
            </div>
            <div style={{ background: 'white', border: '1px solid #e0e0e0', borderRadius: '4px', padding: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                <div style={{ fontSize: '32px', flexShrink: 0 }}>📊</div>
                <div>
                  <h4 style={{ fontSize: '16px', fontWeight: '600', color: '#333', marginBottom: '8px' }}>
                    Development Constraint
                  </h4>
                  <p style={{ fontSize: '14px', color: '#666', lineHeight: '1.6', margin: 0 }}>
                    High informality correlates with lower productivity, limited technology adoption, and barriers to economic upgrading—challenging Vietnam's path to developed status.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* The Challenge */}
        <div style={{ background: '#e3f2fd', border: '1px solid #64b5f6', borderLeft: '4px solid #2196f3', borderRadius: '4px', padding: '32px' }}>
          <h3 style={{ fontSize: '24px', fontWeight: '600', color: '#0d47a1', marginBottom: '16px' }}>
            The Policy Challenge
          </h3>
          <p style={{ fontSize: '16px', color: '#1565c0', lineHeight: '1.7', marginBottom: '16px' }}>
            Formalization cannot happen through enforcement alone. Heavy-handed approaches risk pushing workers deeper into informality or unemployment. 
          </p>
          <p style={{ fontSize: '16px', color: '#1565c0', lineHeight: '1.7', margin: 0 }}>
            Successful policy must balance <strong>incentives</strong> (making formal work attractive), <strong>support</strong> (reducing barriers to formalization), and <strong>protection</strong> (extending basic services to informal workers while encouraging transition).
          </p>
        </div>

      </div>
    </div>
  );
}

export default InformalEconomyExplainer;
