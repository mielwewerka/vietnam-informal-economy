// ========================================
// EXECUTIVE SUMMARY
// ECON 62 — Vietnam Informal Economy
// Full rewrite: narrative summary, appendix,
// bibliography, dedication
// ========================================

import React, { useState, useEffect, useRef } from 'react';

const TEAL = '#00897b';
const TEAL_BRIGHT = '#4dd0c4';

function useInView(threshold = 0.12) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
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
      transform: visible ? 'translateY(0)' : 'translateY(24px)',
      transition: `opacity 0.65s ease ${delay}s, transform 0.65s ease ${delay}s`,
    }}>
      {children}
    </div>
  );
}

const appendixEntries = [
  {
    id: 'A1',
    title: 'Figure 1: Vietnam Informal Employment Rate by Province (Interactive Choropleth Map)',
    desc: 'A color-graded choropleth map of all 63 provinces showing the ILO-aligned informal employment rate. Northwestern provinces (Dien Bien, Lai Chau) exceed 88%; Ho Chi Minh City\'s Southeast registers approximately 36%. An Urban Filter toggle allows isolation of provinces above 50% or 70% urbanization thresholds to reveal how the urban-rural divide structures the data.',
    source: 'GSO Labor Force Survey 2023; GSO/ILO, Overall Situation of Workers in Informal Employment in Viet Nam, 2021.',
  },
  {
    id: 'A2',
    title: 'Figure 2: Agricultural Employment Share by Province (Interactive Choropleth Map)',
    desc: 'Provincial share of workers in agriculture, forestry, and fishing. The Mekong River Delta and Northern Midlands show the highest densities. Because 97.9% of agricultural workers are informally employed, this map functions as a near-perfect proxy for the structurally unreachable portion of the informal workforce.',
    source: 'GSO Labor Force Survey 2023.',
  },
  {
    id: 'A3',
    title: 'Figure 3: Urbanization Rate by Province (Interactive Choropleth Map)',
    desc: 'Urban population share by province, sourced from GSO 2024. The map reveals the strong negative correlation between urbanization and informality. Industrial corridor provinces (Binh Duong, Dong Nai) show high urbanization alongside comparatively lower informality, illustrating the structural transformation channel.',
    source: 'GSO, Statistical Yearbook 2024.',
  },
  {
    id: 'A4',
    title: 'Figure 4: Non-Agricultural Informal Employment Rate by Province (Derived, Interactive Map)',
    desc: 'A derived indicator: provincial informal employment rate minus agricultural employment share, yielding an approximation of non-farm informal employment. This isolates the policy-responsive category: street vendors, construction workers, domestic workers, and service-sector informal workers who are within reach of registration reform.',
    source: 'Derived from GSO LFS 2023 provincial data. Methodology described in interactive map data notes.',
  },
  {
    id: 'A5',
    title: 'Figure 5: Sidewalk Economy Density by Province (Derived, Interactive Map)',
    desc: 'Estimated share of provincial employment attributable to street and sidewalk trade, derived by applying Huynh\'s (2023) estimate of 5% of urban employment to provincial urban share. An approximation only; treated as a relative density indicator rather than a precise measure.',
    source: 'Derived from GSO LFS 2023 urban share data. Huynh, T.N.Q. (2023) for baseline estimate.',
  },
  {
    id: 'A6',
    title: 'Figure 6: Rural Population Share by Province (Derived, Interactive Map)',
    desc: 'Share of provincial population in rural areas, calculated as 100 minus the GSO 2024 urban percentage. Included because rural population share is a near-perfect structural predictor of informality at the provincial level.',
    source: 'Derived from GSO Statistical Yearbook 2024 urbanization data.',
  },
  {
    id: 'A7',
    title: 'Table 1: Social Insurance Coverage Gap (Policy Analysis)',
    desc: 'Bar chart comparing social insurance coverage rates across five benchmarks: Vietnam household business owners (4%), all Vietnamese workers (38%), Vietnam\'s 2030 target (60%), Chile (72%), and South Korea (73%). Illustrates the scale of the coverage gap and the distance to the government\'s own declared target.',
    source: 'ILO/VIDERI Survey 2024 (Vietnam HHB owners); World Bank 2024 (Vietnam all workers); Resolution No. 28-NQ/TW (2030 target); ILOSTAT (Korea 2019, Chile 2021).',
  },
  {
    id: 'A8',
    title: 'Table 2: Social Insurance Contribution Rate Comparison (Policy Analysis)',
    desc: 'Horizontal bar chart comparing combined employer-employee social insurance contribution rates across five Southeast Asian economies: Thailand (10%), Indonesia (18%), Philippines (20%), Vietnam wage employees (approx. 28%), Vietnam HHB owners (25%). Demonstrates that Vietnam\'s contribution burden is among the highest in the region relative to per capita income.',
    source: 'ILO, Expanding Social Insurance for Household Businesses in Viet Nam, 2024; World Bank SEA Labor Market Comparisons 2024; OECD Revenue Statistics Asia-Pacific 2025.',
  },
  {
    id: 'A9',
    title: 'Table 3: Fiscal Revenue Model (Interactive, Fiscal Calculator)',
    desc: 'An interactive model allowing the user to adjust the formalization rate and observe projected annual revenue gains from three streams: social insurance contributions, personal income tax, and VAT pass-through. At 25% formalization with a 25% SI rate, the model estimates approximately $5.3 billion in additional annual revenue. At full formalization, over $21 billion. These are upper-bound estimates assuming no behavioral response.',
    source: 'Model assumptions: GSO/ILO 2021 (68.5% informality, 35.9M informal workers); GSO LFS 2023 (52.4M total employed); GSO/ILO 2021 average informal wage $185/month; 2024 Social Insurance Law (25% HHB rate); Vietnam PIT schedule 2024; World Bank VAT pass-through estimates.',
  },
  {
    id: 'A10',
    title: 'Figure 7: South Korea Informality and GDP Trajectory, 1963-1995 (Case Studies)',
    desc: 'Scatter plot tracking South Korea\'s informal employment rate against GDP per capita from 1963 to 1995. The data show a steady formalization trajectory driven primarily by manufacturing employment growth rather than administrative reform. Informality fell from approximately 72% to 19% as GDP per capita rose from $335 to $12,558.',
    source: 'Derived from secondary literature; ILO historical estimates; World Bank historical national accounts. Treated as approximation; see Case Studies data notes.',
  },
  {
    id: 'A11',
    title: 'Figure 8: Chile Informality and GDP Trajectory, 1981-2013 (Case Studies)',
    desc: 'Scatter plot tracking Chile\'s informal employment rate against GDP per capita from 1981 to 2013. The chart illustrates the formalization effect of Chile\'s 1981 pension privatization reform, which created individual retirement accounts and made formal employment personally valuable to workers. Informality fell from approximately 48% to 28% over the period.',
    source: 'Derived from secondary literature; ILO historical estimates; World Bank historical national accounts. Treated as approximation; see Case Studies data notes.',
  },
];

const bibliography = [
  {
    id: 'B1',
    cite: 'GSO/ILO. (2021). Overall Situation of Workers in Informal Employment in Viet Nam. General Statistics Office of Vietnam and International Labour Organization Country Office for Viet Nam.',
    note: 'Primary data source. Provides the 68.5% ILO-aligned informality rate, 33.6 million informal worker count, regional breakdowns, occupational distribution, earnings differentials, and gender disaggregation used throughout this project.',
  },
  {
    id: 'B2',
    cite: 'ILO/VIDERI. (2024). Expanding Social Insurance for Household Businesses in Viet Nam: Challenges, Policy Options, and the Way Forward. International Labour Organization.',
    note: 'Source for the 4% household business social insurance enrollment rate, behavioral evidence on formalization barriers, focus group findings on the opacity of the voluntary scheme, and the 6.2% vs 1.3% registration gradient. Central to the policy analysis.',
  },
  {
    id: 'B3',
    cite: 'World Bank. (2024). Viet Nam 2045: Breaking Through. Washington, DC: World Bank Group.',
    note: 'Institutional framework for Vietnam\'s high-income transition. Source for GNI per capita trajectory, infrastructure investment gaps, and the 2045 development scenario analysis.',
  },
  {
    id: 'B4',
    cite: 'OECD. (2025). Revenue Statistics in Asia and the Pacific 2025: Viet Nam. Paris: OECD Publishing.',
    note: 'Source for Vietnam\'s 16.8% tax-to-GDP ratio in 2023, regional peer comparisons, and the fiscal framework analysis in the Vietnam 2045 section.',
  },
  {
    id: 'B5',
    cite: 'ILO. (2015). Recommendation No. 204 Concerning the Transition from the Informal to the Formal Economy. International Labour Organization.',
    note: 'The international policy standard for formalization. Provides the legal and normative framework against which Vietnam\'s approach is evaluated in the policy recommendations section.',
  },
  {
    id: 'B6',
    cite: 'Turner, S. and Schoenberger, L. (2012). Street Vendor Livelihoods and Everyday Politics in Hanoi, Vietnam: The Seeds of a Diverse Economy or Centralised Visions of Urban Modernisation? Urban Studies, 49(5), 1027-1044.',
    note: 'Ground-level qualitative analysis of the 2008 Hanoi vending ban. Documents vendor adaptation strategies, the economics of enforcement negotiation, and the failure of removal-based approaches. Central to the sidewalk economy and policy analysis sections.',
  },
  {
    id: 'B7',
    cite: 'GSO. (2024). Report on Labor Force Survey 2023. General Statistics Office of Vietnam, Hanoi.',
    note: 'Source for the 52.4 million total employed figure, provincial employment breakdowns, and sector composition data used in the interactive maps and fiscal model.',
  },
  {
    id: 'B8',
    cite: 'ILO. (2021). Informal Employment in Viet Nam: Trends and Determinants. ILO Country Office for Viet Nam.',
    note: 'Methodological companion to the GSO/ILO dataset. Explains the ILO-aligned definition shift from the pre-2021 methodology, the transition probability analysis, and occupational composition of informality.',
  },
  {
    id: 'B9',
    cite: 'ILO. (2025). Innovative Approaches to Formalization in Asia and the Pacific. Bangkok: ILO Regional Office for Asia and the Pacific.',
    note: 'Comparative regional evidence on formalization policy mechanisms. Source for the India One District One Product case and registration-as-invitation design principles.',
  },
  {
    id: 'B10',
    cite: 'Huynh, T.N.Q. (2023). Street Vendors in Vietnam: Short Cultural and Economic Insight. International Journal of Culture and Education, 11(2).',
    note: 'Source for the estimate of 5% of urban employment in the sidewalk economy, the 200,000 dong starting capital figure, and the 11-13% of major city GDP estimate.',
  },
  {
    id: 'B11',
    cite: 'Oudin, X. and Vu Hoang Dat. (2019). Measuring the Non-Observable Informal Economy in Vietnam. IRD/GSO Joint Research Programme, Hanoi.',
    note: 'Documents the 25-48% underestimation of informal sector GDP in Vietnam\'s national accounts. Source for the 15% non-farm GDP contribution and sector-level undercount analysis.',
  },
  {
    id: 'B12',
    cite: 'IMF. (2024). Vietnam: 2024 Article IV Consultation Staff Report. Washington, DC: International Monetary Fund.',
    note: 'Macroeconomic framework and fiscal projections. Source for IMF recommendations on VAT base broadening and PIT expansion, cited in the fiscal sequencing discussion.',
  },
  {
    id: 'B13',
    cite: 'OECD. (2025). OECD Economic Survey of Viet Nam 2025. Paris: OECD Publishing.',
    note: 'Structural reform assessment including tax policy, social insurance, and labor market recommendations. Companion source to OECD Revenue Statistics data.',
  },
  {
    id: 'B14',
    cite: 'Dang, H.A. and Nguyen, C.V. (2018). Urbanization, Migration, and Poverty in a Rapidly Urbanizing Economy: Evidence from Vietnam. IOP Conference Series: Earth and Environmental Science, 143, 012064.',
    note: 'Empirical analysis of rural-to-urban migration patterns and their relationship to informality. Background source for the migration-informality nexus discussion.',
  },
  {
    id: 'B15',
    cite: 'Dao Thi Thu Huong. (2023). Study on the Impacts of Vietnam\'s Sidewalk Economy. Ho Chi Minh City University of Technology and Education.',
    note: 'Documents the sidewalk economy\'s contribution, the age distribution of street vendors, and the role of low entry capital in urban economic resilience. GDP contribution estimated at 12-15% of the informal sector.',
  },
  {
    id: 'B16',
    cite: 'Van Lang University Research Group. (2024). Study on the Dual Impact of Informal Spaces in Ho Chi Minh City. Journal of Science, Technology and Engineering, Mien Tay Construction University, 11.',
    note: 'Urban planning perspective on informal spaces, their role as economic and cultural assets, and the case against wholesale eradication.',
  },
  {
    id: 'B17',
    cite: 'Government of Vietnam. (2024). 2024 Law on Social Insurance. National Assembly of the Socialist Republic of Viet Nam.',
    note: 'Primary legal source. Establishes the 25% contribution rate for household business owners under compulsory social insurance, effective July 2025. Central to the policy analysis and fiscal model assumptions.',
  },
  {
    id: 'B18',
    cite: 'ILO. (2024). ILO Brief on Informality in Viet Nam. ILO Country Office for Viet Nam.',
    note: 'Summary brief providing updated headline figures and policy context. Cross-reference source for informality rate and coverage gap statistics.',
  },
  {
    id: 'B19',
    cite: 'GSO. (2024). PCT_URBAN: Urban Population Percentage by Province 2024. General Statistics Office of Vietnam.',
    note: 'Primary data source for provincial urbanization rates used in the interactive maps, the urban filter feature, and the derived rural population and sidewalk economy indicators.',
  },
  {
    id: 'B20',
    cite: 'Resolution No. 29-NQ/TW. (2022). On Continuing to Promote Industrialization and Modernization of the Country by 2030 with a Vision to 2045. Communist Party of Vietnam Central Committee.',
    note: 'Source for the 2045 high-income target and the 2030 formalization benchmarks referenced throughout the Vietnam 2045 analysis.',
  },
];

const chapters = [
  { num: 'I', page: 'informal-explainer', title: 'The Story', desc: 'What the informal economy is, where it came from, and who it contains.' },
  { num: 'II', page: 'maps', title: 'The Map', desc: 'Seven provincial indicators across 63 provinces with zoom, filter, and insights.' },
  { num: 'III', page: 'vietnam2045', title: 'The Stakes', desc: "Vietnam's 2045 ambition, the fiscal gap, and the institutional plan." },
  { num: 'IV', page: 'fiscal', title: 'The Model', desc: 'Interactive revenue model: adjust formalization rate, see fiscal consequences.' },
  { num: 'V', page: 'case-studies', title: 'The Cases', desc: "South Korea and Chile: two paths to formalization from Vietnam's starting point." },
  { num: 'VI', page: 'policy', title: 'The Argument', desc: 'Four policy recommendations grounded in behavioral evidence.' },
];

export default function ExecutiveSummary({ onBack, onNavigate }) {
  const [activeSection, setActiveSection] = useState('summary');

  const sectionLabel = { fontSize: '11px', fontWeight: '700', color: TEAL, letterSpacing: '2.5px', textTransform: 'uppercase', marginBottom: '18px', fontFamily: '"Inter", sans-serif' };
  const h2 = { fontSize: 'clamp(24px, 2.8vw, 36px)', fontWeight: '400', lineHeight: '1.2', margin: '0 0 28px 0', letterSpacing: '-0.5px', color: '#1a1a1a' };
  const body = { fontSize: '17px', lineHeight: '1.88', color: '#333', margin: '0 0 20px 0' };

  return (
    <div style={{ fontFamily: '"Georgia", "Times New Roman", serif', background: '#fafafa', color: '#1a1a1a', minHeight: '100vh' }}>

      {/* NAV */}
      <nav style={{ background: 'white', borderBottom: '1px solid #e0e0e0', padding: '14px 48px', display: 'flex', alignItems: 'center', gap: '16px', position: 'sticky', top: 0, zIndex: 100, boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
        <button onClick={onBack} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '13px', fontWeight: '600', color: TEAL, fontFamily: '"Inter", sans-serif', padding: 0 }}>← Back</button>
        <span style={{ color: '#ddd' }}>|</span>
        <span style={{ fontSize: '13px', color: '#999', fontFamily: '"Inter", sans-serif' }}>Executive Summary</span>
        <span style={{ flex: 1 }} />
        {[['summary', 'Summary'], ['appendix', 'Appendix'], ['bibliography', 'Bibliography']].map(([key, label]) => (
          <button key={key} onClick={() => setActiveSection(key)} style={{
            background: 'none', border: 'none', cursor: 'pointer',
            fontSize: '13px', fontWeight: activeSection === key ? '700' : '500',
            color: activeSection === key ? TEAL : '#aaa',
            fontFamily: '"Inter", sans-serif', padding: '4px 0',
            borderBottom: activeSection === key ? `2px solid ${TEAL}` : '2px solid transparent',
            transition: 'all 0.15s',
          }}>{label}</button>
        ))}
      </nav>

      {/* ── SUMMARY ── */}
      {activeSection === 'summary' && (
        <>
          <header style={{ background: '#1a1a1a', color: 'white', padding: '80px 48px 72px', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: `linear-gradient(90deg, ${TEAL}, #26a69a)` }} />
            <div style={{ maxWidth: '820px' }}>
              <div style={{ fontSize: '11px', fontWeight: '700', color: TEAL, letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '20px', fontFamily: '"Inter", sans-serif' }}>
                ECON 62 · Topics in Macroeconomics · Winter 2026
              </div>
              <h1 style={{ fontSize: 'clamp(32px, 5vw, 58px)', fontWeight: '400', lineHeight: '1.1', margin: '0 0 24px 0', letterSpacing: '-1.5px' }}>
                The Fiscal Cost of<br />Vietnam's Invisible Workforce
              </h1>
              <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.65)', lineHeight: '1.75', margin: '0 0 32px 0', maxWidth: '640px', fontFamily: '"Inter", sans-serif', fontWeight: '400' }}>
                An interactive policy analysis of informal employment, its structural origins,
                and its consequences for Vietnam's 2045 high-income development agenda.
              </p>
              <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.3)', fontFamily: '"Inter", sans-serif', margin: 0, lineHeight: '1.6' }}>
                Miel Wewerka · Dartmouth College · Culminating Project of ECON 62
              </p>
            </div>
          </header>

          {/* PROBLEM */}
          <div style={{ background: 'white', padding: '72px 48px 56px' }}>
            <div style={{ maxWidth: '820px', margin: '0 auto' }}>
              <Fade>
                <div style={sectionLabel}>The Problem</div>
                <h2 style={h2}>Vietnam has one of the most ambitious development targets in the world and one of the weakest tax bases to fund it.</h2>
                <p style={body}>By 2045, the centennial of the Socialist Republic of Vietnam, the government has committed to achieving high-income country status. This goal requires sustained public investment in infrastructure, education, healthcare, and social protection at a scale that Vietnam's current fiscal capacity cannot support. The 2023 tax-to-GDP ratio was 16.8 percent (OECD Revenue Statistics Asia-Pacific 2025), well below the 19 to 22 percent typical of comparable middle-income economies making the transition to high-income status. The gap is not primarily a consequence of low growth rates. Vietnam's GDP has grown at 5 to 7 percent annually for three decades. The gap is structural: 68.5 percent of Vietnam's workers operate entirely outside the formal tax and social insurance system.</p>
                <p style={body}>That figure represents 33.6 million people (GSO/ILO 2021). They are street vendors and rice farmers, garment factory piece workers and construction subcontractors, domestic workers and motorbike taxi drivers. They earn real income and produce real output that the IRD-GSO joint research program estimates is undercounted in national accounts by 25 to 48 percent. But they pay no income tax, make no social insurance contributions, and receive no formal labor protections. The fiscal gap their exclusion creates shapes everything else: the quality of roads built, the schools funded, the pensions paid, the hospitals staffed.</p>
                <p style={body}>This project examines that gap, where it comes from, what it costs, and what it would actually take to close it.</p>
              </Fade>
            </div>
          </div>

          {/* CENTRAL ARGUMENT */}
          <div style={{ background: '#f5f3f0', borderTop: '1px solid #e8e4e0', borderBottom: '1px solid #e8e4e0', padding: '56px 48px' }}>
            <div style={{ maxWidth: '820px', margin: '0 auto' }}>
              <Fade>
                <div style={sectionLabel}>The Central Argument</div>
                <blockquote style={{ margin: 0, padding: '0 0 0 24px', borderLeft: `4px solid ${TEAL}` }}>
                  <p style={{ fontSize: 'clamp(20px, 2.5vw, 28px)', fontWeight: '400', lineHeight: '1.45', color: '#1a1a1a', margin: 0, letterSpacing: '-0.3px', fontStyle: 'italic' }}>
                    Vietnam's informal economy is not a failure to be erased. It is a rational response to an exclusionary formal system, and durable formalization requires redesigning the incentives that make informality the rational choice, not sharpening enforcement of the ones that already fail.
                  </p>
                </blockquote>
              </Fade>
            </div>
          </div>

          {/* KEY FINDINGS */}
          <div style={{ background: 'white', padding: '72px 48px' }}>
            <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
              <Fade>
                <div style={sectionLabel}>Key Findings</div>
                <h2 style={{ ...h2, maxWidth: '600px' }}>Four conclusions, each grounded in the data.</h2>
              </Fade>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', marginTop: '40px' }}>
                {[
                  {
                    n: '01', color: TEAL,
                    heading: "Informality is not declining at the pace Vietnam's 2045 plan requires",
                    body: "At 68.5 percent of workers, Vietnam's informality rate has declined only modestly despite decades of rapid GDP growth. The informal economy is not a development lag that growth alone will resolve. It is reproduced by the same structural forces driving the formal economy's expansion: the dominance of agricultural employment in rural provinces, rural-to-urban migration patterns that consistently outpace formal job creation, and social insurance contribution rates that make formalization economically irrational for the 5.1 million household businesses that form the backbone of informal urban employment. The government's 2030 target of 60 percent social insurance coverage requires reaching 22 additional percentage points in less than a decade. The current trajectory does not support that outcome.",
                  },
                  {
                    n: '02', color: '#1e6fa8',
                    heading: 'The geographic distribution reveals structurally distinct problems requiring different solutions',
                    body: "The provincial map analysis reveals two largely separate informal economies within Vietnam. The Northern Midlands, Mountain Areas, and Central Highlands show informality rates above 80 percent, driven almost entirely by agricultural subsistence employment. These workers are structurally unreachable through urban registration reform or social insurance mandates. The Southeast and Red River Delta show rates of 36 to 55 percent, concentrated in service-sector and manufacturing informality. These are the policy-responsive workers. A single national formalization program cannot serve both populations effectively. Vietnam's current approach sets a national 60 percent coverage target without geographic differentiation, guaranteeing that high-agricultural provinces anchor overall progress.",
                  },
                  {
                    n: '03', color: '#c2410c',
                    heading: 'The fiscal gap is quantifiable, significant, and contingent on behavioral assumptions',
                    body: "Using GSO/ILO 2021 informal worker data, average informal wages of approximately $185 per month, and the 2024 Social Insurance Law contribution rate of 25 percent for household business owners, our model estimates that 25 percent formalization of the informal workforce would generate approximately $5.3 billion in additional annual revenue from social insurance, personal income tax, and VAT combined. Full formalization would generate over $21 billion annually. These are upper-bound estimates that assume no behavioral response from workers or firms. The true revenue gain will be lower. But even a conservative scenario implies substantial additional fiscal capacity. The gap is real. Its magnitude justifies serious policy attention regardless of the exact figure.",
                  },
                  {
                    n: '04', color: '#7c3aed',
                    heading: 'Enforcement-led formalization fails; incentive-based formalization works',
                    body: "The case studies of South Korea (1963 to 1995) and Chile (1981 to 2013) provide the comparative evidence. Korea formalized through mass manufacturing employment creation: workers did not register because they were required to, but because formal factory jobs offered wages and stability that informal work could not match. Chile formalized through pension privatization: workers enrolled in formal employment because their individual retirement savings depended on it. Both mechanisms made formality personally beneficial rather than merely legally mandated. In Vietnam, ILO fieldwork finds that fewer than 4 percent of registered household business owners contribute to any social insurance. The primary reason is not an inability to afford contributions but an inability to calculate what they would receive. The binding constraint is legibility and trust, not capacity. Mandating enrollment without fixing this produces two predictable behavioral responses: transfer of business registration to already-covered family members, or outright deregistration.",
                  },
                ].map(({ n, color, heading, body: fb }, i) => (
                  <Fade key={n} delay={i * 0.05}>
                    <div style={{ background: '#fafafa', padding: '40px 44px', borderLeft: `4px solid ${color}`, borderBottom: '1px solid #e8e4e0' }}>
                      <div style={{ display: 'grid', gridTemplateColumns: '56px 1fr', gap: '28px', alignItems: 'start' }}>
                        <div style={{ fontSize: '40px', fontWeight: '300', color, lineHeight: 1, letterSpacing: '-2px', paddingTop: '4px' }}>{n}</div>
                        <div>
                          <h3 style={{ fontSize: '19px', fontWeight: '400', margin: '0 0 16px 0', lineHeight: '1.3', letterSpacing: '-0.2px', color: '#1a1a1a' }}>{heading}</h3>
                          <p style={{ fontSize: '16px', color: '#555', lineHeight: '1.85', margin: 0 }}>{fb}</p>
                        </div>
                      </div>
                    </div>
                  </Fade>
                ))}
              </div>
            </div>
          </div>

          {/* POLICY RECOMMENDATIONS */}
          <div style={{ background: '#1a1a1a', padding: '72px 48px' }}>
            <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
              <Fade>
                <div style={{ fontSize: '11px', fontWeight: '700', color: TEAL, letterSpacing: '2.5px', textTransform: 'uppercase', marginBottom: '16px', fontFamily: '"Inter", sans-serif' }}>Policy Recommendations</div>
                <h2 style={{ fontSize: 'clamp(22px, 2.5vw, 32px)', fontWeight: '400', color: 'white', margin: '0 0 12px 0', letterSpacing: '-0.3px' }}>Four recommendations, sequenced deliberately.</h2>
                <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.5)', fontFamily: '"Inter", sans-serif', margin: '0 0 40px 0', lineHeight: '1.7', maxWidth: '680px' }}>
                  Social protection must precede fiscal extraction. Workers who cannot see a tangible benefit from formal participation will not maintain it the moment enforcement relaxes.
                </p>
              </Fade>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2px', background: '#2a2a2a' }}>
                {[
                  { num: '01', color: TEAL_BRIGHT, tag: 'Social Protection Design', title: 'Make social insurance legible before making it mandatory', body: 'Publish a standardized pension benefit calculator. Phase compulsory enrollment with income-graduated rates and flexible payment schedules for seasonal incomes. Make the state scheme competitive with private alternatives workers already use.' },
                  { num: '02', color: '#60a5fa', tag: 'Registration Reform', title: 'Redesign registration as an invitation, not a compliance burden', body: 'Link registration to tangible immediate benefits: formal credit access, legal public space protection, simplified VAT. Integrate registration, tax, and social insurance databases so a worker registers once and is connected to all systems automatically.' },
                  { num: '03', color: '#c084fc', tag: 'Geographic Targeting', title: 'Segment policy by region and sector', body: 'Develop province-specific formalization roadmaps. For agricultural provinces, prioritize agricultural social insurance and land rights formalization. For urban provinces, deploy registration and contribution reform. Set differentiated provincial targets for the 2030 coverage goal.' },
                  { num: '04', color: '#fb923c', tag: 'Fiscal Sequencing', title: 'Protect first, then tax', body: 'Formalization efforts should deliver measurable social protection gains before introducing new tax obligations. Use the 2024 Social Insurance Law as phase one. In years three to five, extend VAT and PIT to businesses already enrolled in the social insurance system.' },
                ].map(({ num, color, tag, title, body: rb }, i) => (
                  <Fade key={num} delay={i * 0.05}>
                    <div style={{ background: '#111820', padding: '32px 36px', height: '100%', boxSizing: 'border-box' }}>
                      <div style={{ fontSize: '10px', fontWeight: '700', color, fontFamily: '"Inter", sans-serif', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '6px' }}>{num} · {tag}</div>
                      <h3 style={{ fontSize: '17px', fontWeight: '400', color: 'white', margin: '0 0 14px 0', lineHeight: '1.3' }}>{title}</h3>
                      <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.5)', lineHeight: '1.75', margin: 0, fontFamily: '"Inter", sans-serif' }}>{rb}</p>
                    </div>
                  </Fade>
                ))}
              </div>
              <Fade>
                <div style={{ marginTop: '40px', padding: '32px 40px', border: `1px solid ${TEAL}30`, background: `${TEAL}08` }}>
                  <p style={{ fontSize: '17px', color: 'rgba(255,255,255,0.8)', lineHeight: '1.75', margin: 0, fontStyle: 'italic' }}>
                    "Vietnam's policy tradition has treated informality primarily as an enforcement problem. Turner and Schoenberger's Hanoi fieldwork documents what this produces: vendors who learn which officials have fining authority, ward officials who selectively enforce based on personal relationships, and workers who remain permanently outside the systems meant to protect them."
                  </p>
                </div>
              </Fade>
            </div>
          </div>

          {/* PROJECT STRUCTURE */}
          <div style={{ background: 'white', padding: '72px 48px' }}>
            <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
              <Fade>
                <div style={sectionLabel}>Project Structure</div>
                <h2 style={{ ...h2, maxWidth: '480px' }}>Six parts. One argument.</h2>
              </Fade>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1px', background: '#e0e0e0', marginTop: '32px' }}>
                {chapters.map((c, i) => (
                  <Fade key={c.num} delay={i * 0.05}>
                    <div
                      onClick={() => onNavigate(c.page)}
                      style={{ background: '#fafafa', padding: '28px 30px', cursor: 'pointer', transition: 'background 0.2s', height: '100%', boxSizing: 'border-box', borderTop: `3px solid ${TEAL}` }}
                      onMouseEnter={e => e.currentTarget.style.background = '#f0f0f0'}
                      onMouseLeave={e => e.currentTarget.style.background = '#fafafa'}
                    >
                      <div style={{ fontSize: '11px', fontWeight: '700', color: TEAL, fontFamily: '"Inter", sans-serif', letterSpacing: '2px', marginBottom: '8px' }}>PART {c.num}</div>
                      <div style={{ fontSize: '17px', fontWeight: '400', color: '#1a1a1a', marginBottom: '8px' }}>{c.title}</div>
                      <div style={{ fontSize: '13px', color: '#888', lineHeight: '1.6', fontFamily: '"Inter", sans-serif', marginBottom: '16px' }}>{c.desc}</div>
                      <div style={{ fontSize: '12px', fontWeight: '600', color: TEAL, fontFamily: '"Inter", sans-serif' }}>Open →</div>
                    </div>
                  </Fade>
                ))}
              </div>
            </div>
          </div>

          {/* APPENDIX + BIBLIOGRAPHY LINKS */}
          <div style={{ background: '#f5f3f0', borderTop: '1px solid #e8e4e0', padding: '40px 48px' }}>
            <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
              <div style={{ fontSize: '11px', fontWeight: '700', color: '#bbb', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '16px', fontFamily: '"Inter", sans-serif' }}>Supporting Materials</div>
              <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
                <button onClick={() => setActiveSection('appendix')}
                  style={{ background: 'white', border: `1px solid ${TEAL}`, color: TEAL, padding: '12px 28px', fontSize: '14px', fontWeight: '600', cursor: 'pointer', fontFamily: '"Inter", sans-serif' }}
                  onMouseEnter={e => { e.currentTarget.style.background = TEAL; e.currentTarget.style.color = 'white'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'white'; e.currentTarget.style.color = TEAL; }}
                >
                  Appendix: Exhibits and Data Tables
                </button>
                <button onClick={() => setActiveSection('bibliography')}
                  style={{ background: 'white', border: '1px solid #bbb', color: '#555', padding: '12px 28px', fontSize: '14px', fontWeight: '600', cursor: 'pointer', fontFamily: '"Inter", sans-serif' }}
                  onMouseEnter={e => { e.currentTarget.style.background = '#1a1a1a'; e.currentTarget.style.color = 'white'; e.currentTarget.style.borderColor = '#1a1a1a'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'white'; e.currentTarget.style.color = '#555'; e.currentTarget.style.borderColor = '#bbb'; }}
                >
                  Full Bibliography (20 sources)
                </button>
              </div>
            </div>
          </div>

          {/* DEDICATION */}
          <div style={{ background: '#1a1a1a', padding: '80px 48px' }}>
            <div style={{ maxWidth: '620px', margin: '0 auto', textAlign: 'center' }}>
              <Fade>
                <div style={{ width: '28px', height: '1px', background: `rgba(77,208,196,0.4)`, margin: '0 auto 40px' }} />
                <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.45)', lineHeight: '2.0', margin: '0 0 40px 0', fontStyle: 'italic' }}>
                  This project is dedicated with gratitude to the guidance of Professor Levin, the wisdom of Ms. Amy Moore, and the love for learning cultivated by Professor Finkel. Thank you to the Dartmouth department of Economics for an amazing, challenging, and growth-filled four years. We are a learning enterprise forever.
                </p>
                <div style={{ width: '28px', height: '1px', background: `rgba(77,208,196,0.4)`, margin: '0 auto' }} />
              </Fade>
            </div>
          </div>

          {/* FOOTER */}
          <div style={{ background: '#111', borderTop: '1px solid #1a1a1a', padding: '24px 48px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
            <button onClick={onBack} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '13px', fontWeight: '600', color: TEAL, fontFamily: '"Inter", sans-serif' }}>Back to Overview</button>
            <div style={{ textAlign: 'center' }}>
              <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.2)', margin: '0 0 2px 0', fontFamily: '"Inter", sans-serif' }}>ECON 62 · Topics in Macroeconomics · Winter 2026</p>
              <p style={{ fontSize: '10px', color: 'rgba(255,255,255,0.12)', margin: 0, fontFamily: '"Inter", sans-serif' }}>Designed and Built by Miel Wewerka · Dartmouth College</p>
            </div>
            <button onClick={() => onNavigate('policy')} style={{ background: TEAL_BRIGHT, color: '#0f0f0f', border: 'none', padding: '9px 20px', fontSize: '13px', fontWeight: '700', cursor: 'pointer', fontFamily: '"Inter", sans-serif' }}>
              Read Policy Analysis
            </button>
          </div>
        </>
      )}

      {/* ── APPENDIX ── */}
      {activeSection === 'appendix' && (
        <div style={{ background: 'white', minHeight: '100vh' }}>
          <div style={{ background: '#1a1a1a', padding: '56px 48px' }}>
            <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
              <div style={{ fontSize: '11px', fontWeight: '700', color: TEAL, letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '16px', fontFamily: '"Inter", sans-serif' }}>Appendix</div>
              <h1 style={{ fontSize: 'clamp(28px, 4vw, 46px)', fontWeight: '400', color: 'white', margin: '0 0 16px 0', letterSpacing: '-1px' }}>Exhibits, Maps, and Data Tables</h1>
              <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.45)', fontFamily: '"Inter", sans-serif', lineHeight: '1.7', margin: 0, maxWidth: '640px' }}>
                A catalogue of all visual exhibits, with descriptions, methodology notes, and source citations. Interactive exhibits are accessible through the project navigation.
              </p>
            </div>
          </div>
          <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '64px 48px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
              {appendixEntries.map(({ id, title, desc, source }, i) => (
                <Fade key={id} delay={i * 0.03}>
                  <div style={{ display: 'grid', gridTemplateColumns: '64px 1fr', gap: '32px', padding: '40px 0', borderTop: '1px solid #e8e4e0', alignItems: 'start' }}>
                    <div style={{ paddingTop: '3px' }}>
                      <div style={{ fontSize: '12px', fontWeight: '700', color: TEAL, fontFamily: '"Inter", sans-serif', letterSpacing: '1px' }}>{id}</div>
                    </div>
                    <div>
                      <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#1a1a1a', margin: '0 0 12px 0', lineHeight: '1.35', fontFamily: '"Inter", sans-serif' }}>{title}</h3>
                      <p style={{ fontSize: '15px', color: '#444', lineHeight: '1.8', margin: '0 0 12px 0' }}>{desc}</p>
                      <p style={{ fontSize: '12px', color: '#999', fontFamily: '"Inter", sans-serif', fontStyle: 'italic', margin: 0, lineHeight: '1.6' }}>
                        <span style={{ fontStyle: 'normal', color: '#ccc', fontWeight: '600' }}>Source: </span>{source}
                      </p>
                    </div>
                  </div>
                </Fade>
              ))}
              <div style={{ borderTop: '1px solid #e8e4e0' }} />
            </div>
          </div>
          <div style={{ background: '#f5f3f0', borderTop: '1px solid #e8e4e0', padding: '24px 48px', display: 'flex', gap: '24px' }}>
            <button onClick={() => setActiveSection('summary')} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '13px', fontWeight: '600', color: TEAL, fontFamily: '"Inter", sans-serif' }}>← Back to Summary</button>
            <button onClick={() => setActiveSection('bibliography')} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '13px', fontWeight: '600', color: '#888', fontFamily: '"Inter", sans-serif' }}>View Bibliography →</button>
          </div>
        </div>
      )}

      {/* ── BIBLIOGRAPHY ── */}
      {activeSection === 'bibliography' && (
        <div style={{ background: 'white', minHeight: '100vh' }}>
          <div style={{ background: '#1a1a1a', padding: '56px 48px' }}>
            <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
              <div style={{ fontSize: '11px', fontWeight: '700', color: TEAL, letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '16px', fontFamily: '"Inter", sans-serif' }}>Bibliography</div>
              <h1 style={{ fontSize: 'clamp(28px, 4vw, 46px)', fontWeight: '400', color: 'white', margin: '0 0 16px 0', letterSpacing: '-1px' }}>Sources and Data References</h1>
              <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.45)', fontFamily: '"Inter", sans-serif', lineHeight: '1.7', margin: 0, maxWidth: '640px' }}>
                All primary data sources, academic literature, institutional reports, and government documents cited in this project, with annotations on their role in the analysis.
              </p>
            </div>
          </div>
          <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '64px 48px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
              {bibliography.map(({ id, cite, note }, i) => (
                <Fade key={id} delay={i * 0.02}>
                  <div style={{ display: 'grid', gridTemplateColumns: '64px 1fr', gap: '32px', padding: '32px 0', borderTop: '1px solid #e8e4e0', alignItems: 'start' }}>
                    <div style={{ paddingTop: '3px' }}>
                      <div style={{ fontSize: '12px', fontWeight: '700', color: '#bbb', fontFamily: '"Inter", sans-serif', letterSpacing: '1px' }}>{id}</div>
                    </div>
                    <div>
                      <p style={{ fontSize: '15px', color: '#222', lineHeight: '1.7', margin: '0 0 10px 0', fontFamily: '"Inter", sans-serif', fontWeight: '500' }}>{cite}</p>
                      <p style={{ fontSize: '14px', color: '#777', lineHeight: '1.75', margin: 0, fontStyle: 'italic' }}>{note}</p>
                    </div>
                  </div>
                </Fade>
              ))}
              <div style={{ borderTop: '1px solid #e8e4e0' }} />
            </div>
            <Fade>
              <div style={{ marginTop: '48px', padding: '28px 36px', background: '#f5f3f0', borderLeft: '4px solid #e8e4e0' }}>
                <div style={{ fontSize: '11px', fontWeight: '700', color: '#bbb', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '10px', fontFamily: '"Inter", sans-serif' }}>Data Notes</div>
                <p style={{ fontSize: '13px', color: '#888', lineHeight: '1.8', margin: 0, fontFamily: '"Inter", sans-serif' }}>
                  The 68.5% informality rate and 33.6M worker count are from GSO/ILO 2021 using the ILO-aligned ICLS-19 methodology, which includes agriculture and forestry workers. The pre-2021 GSO measure (approximately 56%) used a narrower definition and is not directly comparable across time. The 16.8% tax-to-GDP ratio is from OECD Revenue Statistics Asia-Pacific 2025 for the year 2023. Fiscal model assumptions: 52.4M total employed (GSO LFS 2023), average informal wage $185/month (GSO/ILO 2021 earnings data), 25% social insurance rate (2024 Social Insurance Law, HHB owners). Korea and Chile historical informality trajectories are derived from secondary literature and should be treated as illustrative approximations rather than precise empirical series.
                </p>
              </div>
            </Fade>
          </div>
          <div style={{ background: '#f5f3f0', borderTop: '1px solid #e8e4e0', padding: '24px 48px', display: 'flex', gap: '24px' }}>
            <button onClick={() => setActiveSection('summary')} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '13px', fontWeight: '600', color: TEAL, fontFamily: '"Inter", sans-serif' }}>← Back to Summary</button>
            <button onClick={() => setActiveSection('appendix')} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '13px', fontWeight: '600', color: '#888', fontFamily: '"Inter", sans-serif' }}>← View Appendix</button>
          </div>
        </div>
      )}

    </div>
  );
}
