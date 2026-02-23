// ========================================
// MAP CONFIGURATIONS
// ========================================
// Shared settings for all 4 map types

export const mapConfigs = {
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
  }
};
