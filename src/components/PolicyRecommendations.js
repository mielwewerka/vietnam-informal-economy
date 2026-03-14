// ========================================
// POLICY RECOMMENDATIONS
// Part VI of Vietnam Informal Economy project
// Exhibits: Social insurance coverage gap chart
// + contribution rate comparison chart
// Four accordion recommendations with
// analysis, worker voices, tradeoffs.
// Save as src/components/PolicyRecommendations.js
// ========================================

import React, { useState, useEffect, useRef } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Cell, LabelList
} from 'recharts';

const TEAL = '#00897b';
const TEAL_BRIGHT = '#4dd0c4';

function useInView(threshold = 0.1) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function Fade({ children, delay = 0 }) {
  const [ref, visible] = useInView();
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(22px)',
      transition: `opacity 0.65s ease ${delay}s, transform 0.65s ease ${delay}s`,
    }}>
      {children}
    </div>
  );
}

// ── Exhibit 1: Social insurance coverage gap ─────────────────────────────
// Sources: ILO/VIDERI HHB Survey 2024 (Vietnam HHB owners);
// ILO ILOSTAT (Korea 2019, Chile 2021);
// Resolution 28 target (Vietnam 2030 goal)
const coverageData = [
  { country: 'Vietnam\nHHB owners\n(2023)', coverage: 4, color: '#dc2626', note: 'ILO/VIDERI 2024' },
  { country: 'Vietnam\nall workers\n(2021)', coverage: 38, color: '#f97316', note: 'World Bank 2024' },
  { country: 'Vietnam\n2030 target', coverage: 60, color: TEAL_BRIGHT, note: 'Resolution 28' },
  { country: 'Chile\n(2021)', coverage: 72, color: '#1e6fa8', note: 'ILOSTAT' },
  { country: 'Korea\n(2019)', coverage: 73, color: '#7c3aed', note: 'ILOSTAT' },
];

// ── Exhibit 2: Social insurance contribution rate comparison ─────────────
// Sources: ILO Expanding Social Insurance 2024 (Vietnam);
// World Bank SEA Labor Market comparisons;
// OECD Revenue Statistics 2025
const rateData = [
  { country: 'Thailand', rate: 10, color: '#22c55e', note: 'OECD 2025' },
  { country: 'Indonesia', rate: 18, color: '#84cc16', note: 'World Bank 2024' },
  { country: 'Philippines', rate: 20, color: '#eab308', note: 'World Bank 2024' },
  { country: 'Vietnam\n(employees)', rate: 28, color: '#f97316', note: 'ILO 2024 (approx.)' },
  { country: 'Vietnam\n(HHB owners)', rate: 25, color: '#dc2626', note: '2024 SI Law' },
];

const CustomTooltip = ({ active, payload, label, noteKey }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: '#1a1a1a', border: '1px solid #2a2a2a', padding: '10px 14px', fontSize: '12px', fontFamily: '"Inter", sans-serif' }}>
      <div style={{ color: '#4dd0c4', fontWeight: '600', marginBottom: '4px' }}>{label?.replace(/\\n/g, ' ')}</div>
      <div style={{ color: 'white' }}>{payload[0].value}{noteKey === 'coverage' ? '%' : '%'}</div>
      {payload[0].payload.note && <div style={{ color: 'rgba(255,255,255,0.4)', marginTop: '4px', fontSize: '11px' }}>{payload[0].payload.note}</div>}
    </div>
  );
};

// ── Recommendation accordion items ───────────────────────────────────────
const recommendations = [
  {
    num: '01',
    tag: 'Social Protection Design',
    color: TEAL_BRIGHT,
    title: 'Make Social Insurance Legible Before Making It Mandatory',
    tension: "The 2024 Social Insurance Law now requires registered household businesses to enroll in compulsory social insurance. The impulse is correct. The sequencing is risky.",
    analysis: [
      "As of 2023, fewer than 4% of household business owners contributed to any form of social insurance (ILO/VIDERI Survey, 2024). When the ILO surveyed 827 registered household businesses in 2024, more than 60% of those unwilling to join cited not lack of income but commercial insurance and personal savings as sufficient alternatives. This is a trust problem, not a capacity problem.",
      "The critical design failure in Vietnam's voluntary scheme is opacity. Workers cannot calculate what they will receive at retirement. Private insurers provide clear spreadsheets showing projected returns. The state offers ambiguity. When the expected return is unclear, rational actors defect to alternatives they can evaluate. Mandating enrollment without fixing this produces two predictable behavioral responses: transfer of business registration to retired relatives already covered, or outright deregistration. The ILO fieldwork documented both responses already occurring in anticipation of the July 2025 implementation date.",
    ],
    voice: {
      quote: "The State encourages participation in voluntary social insurance, so I participate. But if you ask me how much pension I will receive when I retire, I don't know who to ask or how to look it up.",
      source: "Female registered household business owner, 38, Hanoi (ILO/VIDERI Survey, 2024)"
    },
    recommendation: "Phase compulsory enrollment with income-graduated contribution rates and flexible payment schedules that accommodate seasonal income patterns. Publish a standardized pension benefit calculator so every contributor can see projected retirement income before they commit. This mirrors what private insurers already offer and is the minimum necessary to make the state scheme competitive with alternatives workers currently prefer.",
    tradeoff: "Speed vs. real coverage. Moving faster on mandates reaches more workers on paper but produces lower actual compliance. A slower phase-in that builds trust reaches fewer workers initially but generates durable enrollment that does not collapse the moment enforcement relaxes.",
    sources: ["ILO/VIDERI Household Business Survey, 2024", "ILO: Expanding Social Insurance for Household Businesses in Viet Nam, 2024", "Resolution No. 28-NQ/TW on Social Insurance Reform"],
  },
  {
    num: '02',
    tag: 'Registration Reform',
    color: '#1e6fa8',
    title: 'Redesign Registration as an Invitation, Not a Compliance Burden',
    tension: "Only one-third of Vietnam's household businesses are formally registered. Among unregistered businesses, social insurance participation is essentially zero. Registration is the gateway to protection, but the gate is designed to exclude.",
    analysis: [
      "The data shows a stark gradient: registered household business owners are nearly five times more likely to contribute to social insurance than unregistered ones — 6.2% versus 1.3% (ILO/VIDERI LFS 2023). Registration is not just a legal category. It is the single most powerful predictor of whether a worker has any formal protection.",
      "Yet the registration system creates disincentives at every step. Business registration offices, tax authorities, and social insurance agencies operate from separate databases with no real-time information sharing. Tax data for 2023 did not reach the social insurance agency until July 2024. For a worker operating a small food stall on an irregular income, this fragmented bureaucracy is not a minor inconvenience. It is a rational reason to stay invisible.",
      "Turner and Schoenberger's Hanoi fieldwork (2011) documents the calculus vendors make in real time: which police have authority to fine them, which do not, which officials accept informal payments. These workers are not failing to engage with the state. They are navigating it constantly, under adversarial conditions. A registration system that functions as a threat produces workers who are skilled at avoiding it. India's One District One Product scheme transitioned 200,000 unregistered micro-enterprises into the formal system by making formalization feel like a gain rather than a concession.",
    ],
    voice: {
      quote: "In terms of scale and resources, we are very different from enterprises. We have limited capital, no employees, and unstable income. It does not seem reasonable to apply the same regulations to household businesses as to formal enterprises.",
      source: "Focus group, registered household business owners (ILO/VIDERI Survey, 2024)"
    },
    recommendation: "Link business registration to immediate, tangible benefits: access to formal credit, legal protection for public space use, health insurance eligibility, and simplified VAT treatment for micro-enterprises with fewer than three employees. Integrate the registration, tax, and social insurance databases so a worker registers once and is linked to all relevant systems automatically. Eliminate the information delay between agencies that currently means the social insurance system does not know about newly registered businesses for months.",
    tradeoff: "The fiscal cost of incentivizing registration is real. But it is a one-time administrative investment that permanently expands the tax and contribution base. Leaving workers unregistered has no upside for the state and significant long-run costs in social protection exclusion.",
    sources: ["Turner & Schoenberger: Street Vendor Livelihoods and Everyday Politics in Hanoi, 2011", "ILO: Innovative Approaches to Formalization in Asia and the Pacific, 2025", "ILO/VIDERI Household Business Survey, 2024"],
  },
  {
    num: '03',
    tag: 'Geographic Targeting',
    color: '#7c3aed',
    title: 'Segment Policy by Region and Sector: One Size Actively Fails',
    tension: "Vietnam's formalization policy is designed as a national program. Vietnam's informality is profoundly regional. Applying urban household business policy to the Central Highlands, where 82% of informal employment is in agriculture, is not just inefficient. It is the wrong intervention entirely.",
    analysis: [
      "The ILO labor force data reveals structurally different informality profiles across Vietnam's regions. In the Northern Midlands and Mountain Areas, 74% of informal employment is in agriculture, where the relevant policy levers are land tenure security and agricultural insurance, not household business registration. In the Southeast (HCMC and surrounding provinces), agriculture accounts for only 23% of informal employment, while market services represent 43%. These workers are street vendors, repair shops, and transport operators. They are reachable through urban registration reform.",
      "This geographic heterogeneity is the central analytical finding that the maps in this project make visible. Provinces above 50% urbanization have a fundamentally different informal economy structure than rural provinces. Policy instruments well-designed for one context will be irrelevant or counterproductive in the other. The current 2030 social insurance coverage target of 60% is set nationally. Without geographic segmentation, provinces with high agricultural informality will anchor overall progress downward while urban provinces are measured by the same yardstick.",
    ],
    voice: null,
    recommendation: "Develop province-specific formalization roadmaps that classify informal workers by sector type: agricultural subsistence, rural non-farm household business, and urban service sector. For agricultural provinces, prioritize expansion of agricultural social insurance and land rights formalization before household business registration. For urban provinces, deploy the registration and social insurance reforms described above. Set differentiated provincial targets for the 2030 coverage goal that reflect actual structural composition.",
    tradeoff: "Geographic targeting requires more administrative capacity and more complex monitoring systems. It is more expensive to implement than a single national program. The counterargument: a national program will demonstrably fail in contexts it was not designed for, producing both low coverage and wasted administrative effort.",
    sources: ["ILO: Informal Employment in Viet Nam: Trends and Determinants, 2021", "GSO Labour Force Survey Regional Data, 2023", "ILO: Innovative Approaches to Formalization in Asia and the Pacific, 2025"],
  },
  {
    num: '04',
    tag: 'Fiscal Sequencing',
    color: '#c2410c',
    title: 'Sequence the Fiscal Integration: Protect First, Then Tax',
    tension: "Vietnam's tax-to-GDP ratio fell to 16.8% in 2023, well below the regional average of 19.5% (OECD Revenue Statistics Asia-Pacific 2025). The informal sector contributes approximately 15% of non-farm GDP while contributing almost nothing to the tax base. The fiscal case for formalization is clear. The political economy of getting there is not.",
    analysis: [
      "The IRD/GSO joint research program found that Vietnam's official statistics underestimate informal sector output by 25 to 48%. This creates a paradox: Vietnam's debt-to-GDP ratio looks better than it is because GDP is understated. But its revenue-to-GDP ratio looks worse because informal sector output goes untaxed and unmeasured. Better statistical measurement would simultaneously reveal a larger economy and expose a larger fiscal coverage gap.",
      "The IMF and World Bank recommend broadening the VAT base and expanding personal income tax coverage. These are sound prescriptions for a formal economy. Applied to informal workers without first extending social protection, they function as extraction without reciprocity. The behavioral economics literature is consistent: compliance rises when taxpayers perceive the system as fair and can see the benefits of their contributions. A street vendor paying a lump-sum business tax while receiving no health insurance, no pension, and no legal recognition of her workspace will not experience that tax as legitimate.",
      "The sequencing matters as much as the policy content. Social protection extension should precede or accompany tax base expansion in the informal sector. This is not a welfare argument. It is a compliance argument. Workers who receive visible benefits from formal participation have a reason to maintain that participation.",
    ],
    voice: {
      quote: "When business is difficult, we wake up in the morning worrying about so many expenses. If the State forces us to pay compulsory social insurance, that's just another burden. Instead of helping us recover, the State adds another compulsory payment.",
      source: "Focus group, registered household business owner (ILO/VIDERI Survey, 2024)"
    },
    recommendation: "Adopt an explicit sequencing principle: formalization efforts targeting informal workers should deliver measurable social protection gains before, or simultaneously with, any new tax obligations. Use the 2024 Social Insurance Law implementation (effective July 2025) as the first phase. In years three through five, as enrollment data improve, extend VAT and personal income tax coverage to household businesses already in the social insurance system. Pair this with a simplified presumptive tax for micro-enterprises, calibrated to actual income levels rather than formal-sector equivalents.",
    tradeoff: "Delay in tax base expansion has real near-term fiscal costs. The argument: premature extraction from informal workers before trust and protection are established produces compliance rates low enough to make the revenue gains negligible, while generating political resistance that undermines the broader formalization agenda.",
    sources: ["IMF Staff Country Report: Vietnam Selected Issues, 2024", "OECD Revenue Statistics Asia-Pacific 2025", "IRD/GSO: Measuring the Non-Observed Economy in Vietnam, 2019", "OECD Economic Survey of Viet Nam, 2025"],
  },
];

// ── Recommendation accordion card ────────────────────────────────────────
function RecCard({ rec, isOpen, onToggle }) {
  return (
    <div style={{
      border: `1px solid ${isOpen ? rec.color + '40' : 'rgba(255,255,255,0.07)'}`,
      background: isOpen ? `${rec.color}09` : '#111820',
      marginBottom: '2px',
      transition: 'all 0.25s',
    }}>
      <button onClick={onToggle} style={{
        width: '100%', background: 'none', border: 'none', cursor: 'pointer',
        padding: '24px 28px', textAlign: 'left', display: 'flex',
        alignItems: 'flex-start', gap: '20px',
      }}>
        <div style={{ minWidth: 44, paddingTop: 2 }}>
          <span style={{ fontSize: '10px', color: rec.color, fontFamily: '"Inter", sans-serif', letterSpacing: '0.1em' }}>{rec.num}</span>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ marginBottom: '8px' }}>
            <span style={{ fontSize: '10px', padding: '2px 9px', border: `1px solid ${rec.color}50`, color: rec.color, fontFamily: '"Inter", sans-serif', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              {rec.tag}
            </span>
          </div>
          <h3 style={{ fontSize: 'clamp(15px, 1.6vw, 18px)', fontWeight: '400', color: '#e8e4e0', margin: 0, lineHeight: 1.3, fontFamily: '"Georgia", "Times New Roman", serif' }}>
            {rec.title}
          </h3>
          {!isOpen && (
            <p style={{ fontSize: '13px', color: '#9e9587', marginTop: '8px', marginBottom: 0, lineHeight: 1.6, fontFamily: '"Inter", sans-serif' }}>
              {rec.tension.substring(0, 130)}...
            </p>
          )}
        </div>
        <div style={{ minWidth: 22, paddingTop: 4 }}>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.25s' }}>
            <path d="M4.5 6.75l4.5 4.5 4.5-4.5" stroke="#5a544d" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </button>

      {isOpen && (
        <div style={{ padding: '0 28px 32px 92px' }}>

          <div style={{ marginBottom: '24px' }}>
            <p style={{ fontSize: '10px', letterSpacing: '0.14em', textTransform: 'uppercase', color: rec.color, fontFamily: '"Inter", sans-serif', marginBottom: '8px' }}>The Tension</p>
            <p style={{ fontSize: '15px', color: '#e8e4e0', lineHeight: 1.75, margin: 0, fontStyle: 'italic', fontFamily: '"Georgia", "Times New Roman", serif' }}>{rec.tension}</p>
          </div>

          <div style={{ marginBottom: '24px' }}>
            <p style={{ fontSize: '10px', letterSpacing: '0.14em', textTransform: 'uppercase', color: rec.color, fontFamily: '"Inter", sans-serif', marginBottom: '8px' }}>The Analysis</p>
            {rec.analysis.map((para, i) => (
              <p key={i} style={{ fontSize: '14px', color: '#9e9587', lineHeight: 1.85, marginBottom: '14px', marginTop: 0, fontFamily: '"Inter", sans-serif' }}>{para}</p>
            ))}
          </div>

          {rec.voice && (
            <div style={{ margin: '20px 0', padding: '18px 22px', borderLeft: `3px solid ${rec.color}60`, background: `${rec.color}08` }}>
              <p style={{ fontSize: '14px', color: '#e8e4e0', lineHeight: 1.75, margin: '0 0 8px', fontStyle: 'italic', fontFamily: '"Georgia", "Times New Roman", serif' }}>
                "{rec.voice.quote}"
              </p>
              <p style={{ fontSize: '11px', color: '#5a544d', margin: 0, fontFamily: '"Inter", sans-serif' }}>{rec.voice.source}</p>
            </div>
          )}

          <div style={{ marginBottom: '20px' }}>
            <p style={{ fontSize: '10px', letterSpacing: '0.14em', textTransform: 'uppercase', color: rec.color, fontFamily: '"Inter", sans-serif', marginBottom: '8px' }}>The Recommendation</p>
            <p style={{ fontSize: '14px', color: '#e8e4e0', lineHeight: 1.85, margin: 0, fontFamily: '"Inter", sans-serif' }}>{rec.recommendation}</p>
          </div>

          <div style={{ padding: '14px 18px', border: '1px solid rgba(255,255,255,0.07)', background: 'rgba(255,255,255,0.02)', marginBottom: '20px' }}>
            <p style={{ fontSize: '10px', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#5a544d', fontFamily: '"Inter", sans-serif', marginBottom: '6px' }}>Key Tradeoff</p>
            <p style={{ fontSize: '13px', color: '#9e9587', lineHeight: 1.7, margin: 0, fontFamily: '"Inter", sans-serif' }}>{rec.tradeoff}</p>
          </div>

          <div>
            <p style={{ fontSize: '10px', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#5a544d', fontFamily: '"Inter", sans-serif', marginBottom: '8px' }}>Sources</p>
            {rec.sources.map((s, i) => (
              <div key={i} style={{ display: 'flex', gap: '8px', alignItems: 'flex-start', marginBottom: '4px' }}>
                <span style={{ color: rec.color, fontSize: '10px', marginTop: 3, flexShrink: 0 }}>▸</span>
                <span style={{ fontSize: '11px', color: '#5a544d', fontFamily: '"Inter", sans-serif' }}>{s}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────
export default function PolicyRecommendations({ onBack, onNavigate }) {
  const [openIndex, setOpenIndex] = useState(0);
  const [chartRef, chartVisible] = useInView(0.1);

  return (
    <div style={{ fontFamily: '"Georgia", "Times New Roman", serif', background: '#0d1117', minHeight: '100vh', color: '#e8e4e0' }}>

      {/* NAV */}
      <nav style={{ background: '#0d1117', borderBottom: '1px solid rgba(255,255,255,0.07)', padding: '14px 48px', display: 'flex', alignItems: 'center', gap: '16px', position: 'sticky', top: 0, zIndex: 100 }}>
        <button onClick={onBack} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '13px', fontWeight: '600', color: TEAL_BRIGHT, fontFamily: '"Inter", sans-serif', padding: 0 }}>← Back to Overview</button>
        <span style={{ color: 'rgba(255,255,255,0.15)' }}>|</span>
        <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.35)', fontFamily: '"Inter", sans-serif' }}>Part VI: Policy Analysis</span>
      </nav>

      {/* HERO */}
      <header style={{ background: '#0d1117', borderBottom: '1px solid rgba(255,255,255,0.07)', padding: '64px 48px 56px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: `linear-gradient(90deg, #475569, transparent)` }} />
        <div style={{ maxWidth: '1060px', margin: '0 auto' }}>
          <Fade>
            <div style={{ fontSize: '10px', fontWeight: '700', color: '#475569', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '16px', fontFamily: '"Inter", sans-serif' }}>
              Part VI · Policy Analysis
            </div>
            <h1 style={{ fontSize: 'clamp(32px, 4.5vw, 58px)', fontWeight: '400', lineHeight: 1.05, margin: '0 0 24px', letterSpacing: '-1.5px' }}>
              Four Recommendations
              <br />
              <span style={{ color: '#9e9587', fontWeight: '300', fontStyle: 'italic' }}>and the tradeoffs they carry</span>
            </h1>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', maxWidth: '900px' }}>
              <p style={{ fontSize: '16px', lineHeight: 1.8, color: '#9e9587', margin: 0, fontFamily: '"Inter", sans-serif' }}>
                Vietnam's 2030 social insurance coverage target of 60% requires bringing tens of millions of informal workers into a system many of them distrust, cannot understand, or cannot afford. These recommendations follow a deliberate sequencing logic: social protection must precede fiscal extraction if formalization is to be durable rather than coercive.
              </p>
              <div style={{ padding: '18px 22px', border: '1px solid rgba(77,208,196,0.2)', background: 'rgba(77,208,196,0.05)' }}>
                <p style={{ fontSize: '10px', color: TEAL_BRIGHT, fontFamily: '"Inter", sans-serif', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '10px' }}>Central Argument</p>
                <p style={{ fontSize: '14px', color: '#e8e4e0', lineHeight: 1.75, margin: 0, fontFamily: '"Inter", sans-serif' }}>
                  Formalization fails when designed as enforcement. It succeeds when designed as an offer that informal workers have reason to accept. Vietnam's own household business surveys support this conclusion directly.
                </p>
              </div>
            </div>
          </Fade>
        </div>
      </header>

      <div style={{ maxWidth: '1060px', margin: '0 auto', padding: '56px 48px' }}>

        {/* ── EXHIBIT 1: Coverage Gap ─────────────────────────── */}
        <Fade>
          <div style={{ marginBottom: '48px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
              <div style={{ width: '32px', height: '1px', background: TEAL_BRIGHT }} />
              <span style={{ fontSize: '10px', letterSpacing: '0.16em', textTransform: 'uppercase', color: TEAL_BRIGHT, fontFamily: '"Inter", sans-serif' }}>
                Exhibit 1 — Social Insurance Coverage Gap
              </span>
            </div>
            <h2 style={{ fontSize: 'clamp(20px, 2.5vw, 30px)', fontWeight: '400', lineHeight: 1.2, margin: '0 0 8px', letterSpacing: '-0.5px' }}>
              Vietnam's coverage rate is far below its own 2030 target —
              <span style={{ color: '#9e9587', fontStyle: 'italic' }}> and far below comparable economies.</span>
            </h2>
            <p style={{ fontSize: '14px', color: '#9e9587', margin: '0 0 28px', fontFamily: '"Inter", sans-serif', lineHeight: 1.6 }}>
              Among household business owners — the largest informal employer category — fewer than 4% contribute to any social insurance as of 2023. Korea and Chile achieved comparable formalization starting from Vietnam's current income level.
            </p>

            <div ref={chartRef} style={{ background: '#111820', border: '1px solid rgba(255,255,255,0.07)', padding: '28px 24px 20px' }}>
              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={coverageData} margin={{ top: 20, right: 20, left: 0, bottom: 8 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" vertical={false} />
                  <XAxis dataKey="country" tick={{ fontSize: 11, fill: 'rgba(255,255,255,0.4)', fontFamily: 'Inter,sans-serif', whiteSpace: 'pre-wrap' }} interval={0} height={50} />
                  <YAxis tickFormatter={v => v + '%'} tick={{ fontSize: 11, fill: 'rgba(255,255,255,0.4)', fontFamily: 'Inter,sans-serif' }} domain={[0, 100]} />
                  <Tooltip content={<CustomTooltip noteKey="coverage" />} />
                  <Bar dataKey="coverage" radius={[2, 2, 0, 0]}>
                    {coverageData.map((entry, i) => <Cell key={i} fill={entry.color} opacity={chartVisible ? 1 : 0} style={{ transition: `opacity 0.5s ease ${i * 0.1}s` }} />)}
                    <LabelList dataKey="coverage" position="top" formatter={v => v + '%'} style={{ fill: 'rgba(255,255,255,0.5)', fontSize: 11, fontFamily: 'Inter,sans-serif' }} />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
              <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.2)', margin: '8px 0 0', fontFamily: '"Inter", sans-serif', fontStyle: 'italic' }}>
                Sources: ILO/VIDERI HHB Survey 2024 (Vietnam HHB owners); World Bank 2024 (Vietnam all workers); Resolution 28 (2030 target); ILOSTAT (Korea 2019, Chile 2021).
              </p>
            </div>
          </div>
        </Fade>

        {/* ── EXHIBIT 2: Contribution Rate Comparison ───────── */}
        <Fade delay={0.1}>
          <div style={{ marginBottom: '64px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
              <div style={{ width: '32px', height: '1px', background: '#f97316' }} />
              <span style={{ fontSize: '10px', letterSpacing: '0.16em', textTransform: 'uppercase', color: '#f97316', fontFamily: '"Inter", sans-serif' }}>
                Exhibit 2 — Social Insurance Contribution Rate by Country
              </span>
            </div>
            <h2 style={{ fontSize: 'clamp(20px, 2.5vw, 30px)', fontWeight: '400', lineHeight: 1.2, margin: '0 0 8px', letterSpacing: '-0.5px' }}>
              Vietnam's contribution burden is among the highest in Southeast Asia
              <span style={{ color: '#9e9587', fontStyle: 'italic' }}> for a country at its income level.</span>
            </h2>
            <p style={{ fontSize: '14px', color: '#9e9587', margin: '0 0 28px', fontFamily: '"Inter", sans-serif', lineHeight: 1.6 }}>
              For wage employees, combined employer and employee contributions total approximately 28% of insurable wages. For household business owners under the 2024 Social Insurance Law, the self-financed rate is 25%. Both figures exceed Thailand and Indonesia, the regional peer benchmarks.
            </p>

            <div style={{ background: '#111820', border: '1px solid rgba(255,255,255,0.07)', padding: '28px 24px 20px' }}>
              <ResponsiveContainer width="100%" height={240}>
                <BarChart data={rateData} layout="vertical" margin={{ top: 8, right: 50, left: 20, bottom: 8 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" horizontal={false} />
                  <XAxis type="number" tickFormatter={v => v + '%'} tick={{ fontSize: 11, fill: 'rgba(255,255,255,0.4)', fontFamily: 'Inter,sans-serif' }} domain={[0, 35]} />
                  <YAxis type="category" dataKey="country" tick={{ fontSize: 11, fill: 'rgba(255,255,255,0.5)', fontFamily: 'Inter,sans-serif', whiteSpace: 'pre-wrap' }} width={90} />
                  <Tooltip content={<CustomTooltip noteKey="rate" />} />
                  <Bar dataKey="rate" radius={[0, 2, 2, 0]}>
                    {rateData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                    <LabelList dataKey="rate" position="right" formatter={v => v + '%'} style={{ fill: 'rgba(255,255,255,0.5)', fontSize: 11, fontFamily: 'Inter,sans-serif' }} />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
              <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.2)', margin: '8px 0 0', fontFamily: '"Inter", sans-serif', fontStyle: 'italic' }}>
                Sources: ILO Expanding Social Insurance 2024 (Vietnam rates); World Bank SEA Labor Market Comparisons (Indonesia, Thailand, Philippines). Rates are approximate combined employer and employee totals and may exclude health insurance contributions administered separately. Vietnam HHB owner rate is the self-financed rate under the 2024 Social Insurance Law.
              </p>
            </div>
          </div>
        </Fade>

        {/* ── RECOMMENDATIONS ACCORDION ─────────────────────── */}
        <Fade>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
            <div style={{ width: '32px', height: '1px', background: '#475569' }} />
            <span style={{ fontSize: '10px', letterSpacing: '0.16em', textTransform: 'uppercase', color: '#9e9587', fontFamily: '"Inter", sans-serif' }}>
              Policy Recommendations
            </span>
          </div>
        </Fade>

        <div>
          {recommendations.map((rec, i) => (
            <RecCard
              key={i}
              rec={rec}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </div>

        {/* SYNTHESIS */}
        <Fade>
          <div style={{ marginTop: '56px', padding: '36px 44px', border: `1px solid ${TEAL_BRIGHT}25`, background: 'rgba(77,208,196,0.04)' }}>
            <p style={{ fontSize: '10px', letterSpacing: '0.14em', textTransform: 'uppercase', color: TEAL_BRIGHT, fontFamily: '"Inter", sans-serif', marginBottom: '18px' }}>Synthesis</p>
            <p style={{ fontSize: 'clamp(16px, 1.8vw, 22px)', fontWeight: '400', lineHeight: 1.55, color: '#e8e4e0', margin: '0 0 16px', fontFamily: '"Georgia", "Times New Roman", serif' }}>
              These four recommendations share a common logic: the informal economy is not a failure to be erased. It is a livelihood system that rational actors built because the formal one excluded them.
            </p>
            <p style={{ fontSize: '14px', lineHeight: 1.85, color: '#9e9587', margin: 0, fontFamily: '"Inter", sans-serif', maxWidth: '820px' }}>
              Vietnam's policy tradition has treated informality primarily as an enforcement problem. Turner and Schoenberger's Hanoi fieldwork documents what this produces: vendors who learn which police have fining authority and which do not, ward officials who selectively enforce based on personal relationships and informal payments, and workers who remain permanently outside the systems meant to protect them. Durable formalization requires redesigning the incentives that make informality the rational choice. That means legible benefits, integrated administration, geographically differentiated implementation, and a sequencing principle that prioritizes protection before extraction. Vietnam has the legal framework in the 2024 Social Insurance Law. The question is whether implementation will match the evidence on what actually changes worker behavior.
            </p>
          </div>
        </Fade>

        {/* DATA NOTES */}
        <Fade>
          <div style={{ marginTop: '40px', padding: '24px 28px', border: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)' }}>
            <p style={{ fontSize: '10px', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#5a544d', fontFamily: '"Inter", sans-serif', marginBottom: '12px' }}>Data Notes &amp; Caveats</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px 40px' }}>
              {[
                ["Social insurance coverage rates", "Vietnam HHB owner figure (4%) is from the ILO/VIDERI survey of 827 registered household business owners, 2023 LFS data. This is not the national informal workforce figure. National coverage for all employed workers is approximately 38% (World Bank 2024). The pre-2021 GSO methodology gave different figures due to definitional changes."],
                ["Contribution rate data", "Rates are approximate combined employer and employee social insurance contributions. Health insurance, occupational accident, and unemployment insurance rates vary by scheme and may not be included. Vietnam HHB owner rate (25%) reflects the 2024 Social Insurance Law; wage employee rate (approx. 28%) reflects the pre-2024 structure and includes employer-side sickness contributions."],
                ["Korea and Chile coverage figures", "From ILOSTAT model estimates based on national household surveys. Historical trajectory data for Korea (1963-1995) and Chile (1981-2013) in the Case Studies module are derived from secondary literature and should be treated as approximate."],
                ["Policy analysis sources", "Analysis draws on ILO/VIDERI HHB Survey 2024, ILO Recommendation No. 204 (2015), OECD Economic Survey of Viet Nam 2025, IMF Vietnam Article IV 2024, and Turner & Schoenberger (2011). Contribution rate comparisons use OECD and World Bank SEA data. Brazil and India simplified tax scheme outcomes are from ILO and World Bank enterprise survey analyses."],
              ].map(([title, note], i) => (
                <div key={i}>
                  <p style={{ fontSize: '11px', fontWeight: '700', color: '#9e9587', fontFamily: '"Inter", sans-serif', marginBottom: '4px' }}>{title}</p>
                  <p style={{ fontSize: '11px', color: '#5a544d', lineHeight: 1.65, margin: 0, fontFamily: '"Inter", sans-serif' }}>{note}</p>
                </div>
              ))}
            </div>
          </div>
        </Fade>
      </div>

      {/* FOOTER NAV */}
      <div style={{ background: '#080808', borderTop: '1px solid #161616', padding: '20px 48px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <button onClick={() => onNavigate('case-studies')} style={{ background: 'none', border: '1px solid #222', color: 'rgba(255,255,255,0.4)', padding: '7px 14px', fontSize: '12px', fontWeight: '600', cursor: 'pointer', fontFamily: '"Inter", sans-serif' }}>
          ← Part V: Case Studies
        </button>
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.12)', margin: '0 0 2px 0', fontFamily: '"Inter", sans-serif' }}>ECON 62 · Topics in Macroeconomics · Winter 2026</p>
          <p style={{ fontSize: '10px', color: 'rgba(255,255,255,0.08)', margin: 0, fontFamily: '"Inter", sans-serif' }}>Designed and Built by Miel Wewerka · Dartmouth College</p>
        </div>
        <button onClick={() => onNavigate('exec-summary')} style={{ background: TEAL_BRIGHT, color: '#0f0f0f', border: 'none', padding: '7px 18px', fontSize: '12px', fontWeight: '700', cursor: 'pointer', fontFamily: '"Inter", sans-serif' }}>
          Executive Summary →
        </button>
      </div>

    </div>
  );
}
