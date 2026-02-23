// ========================================
// PLACEHOLDER PAGE - Template for Future Sections
// ========================================

import React from 'react';

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

export default PlaceholderPage;
