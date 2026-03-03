// ========================================
// VIETNAM 2045 — Complete replacement component
// Paste into src/components/Vietnam2045.js
// ========================================

import React, { useState, useEffect, useRef } from 'react';

// ── Scroll-triggered fade-in hook ──────────────────────────────────────────
function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

function FadeSection({ children, delay = 0, style = {} }) {
  const [ref, visible] = useInView();
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(24px)',
      transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
      ...style
    }}>
      {children}
    </div>
  );
}

// ── Label component ────────────────────────────────────────────────────────
function Label({ children }) {
  return (
    <div style={{
      fontSize: '11px', fontWeight: '700', color: '#00897b',
      letterSpacing: '2.5px', textTransform: 'uppercase',
      marginBottom: '14px', fontFamily: '"Inter", sans-serif'
    }}>{children}</div>
  );
}

// ── Divider ────────────────────────────────────────────────────────────────
function Divider() {
  return <div style={{ borderTop: '1px solid #e8e4e0', margin: '0' }} />;
}

// ── Main component ─────────────────────────────────────────────────────────
function Vietnam2045({ onBack }) {
  const [activeInstitution, setActiveInstitution] = useState(null);

  const institutions = [
    {
      id: 'creating',
      label: 'Market-Creating',
      short: 'Property rights, contract enforcement',
      detail: 'These institutions establish the foundational rules for market exchange — secure property rights, enforceable contracts, and legal systems that protect private ownership. Vietnam has made substantial progress since Doi Moi: firms now report strong confidence in property rights protections (83% in 2023 said the legal system would uphold their rights), and expropriation risk has declined significantly. Land management and compensation disputes remain areas requiring continued reform.',
      color: '#00897b',
    },
    {
      id: 'stabilizing',
      label: 'Market-Stabilizing',
      short: 'Monetary policy, fiscal discipline, macroeconomic stability',
      detail: "These institutions smooth economic cycles and reduce uncertainty for businesses — monetary authorities, fiscal rules, financial sector regulation, and the capacity to deploy countercyclical stimulus. Vietnam successfully managed both the 2008 global financial crisis and COVID-19 disruptions. The challenge ahead is maintaining stability while sustaining the 7–8% annual growth required to reach high-income status. An official 8% growth target has been set for 2025, with double-digit targets for 2026–2030.",
      color: '#0288d1',
    },
    {
      id: 'legitimizing',
      label: 'Market-Legitimizing',
      short: 'Social protection, equity, public trust',
      detail: "Market-legitimizing institutions ensure that growth doesn't leave people behind — social insurance systems, healthcare access, pension coverage, and labor protections. Vietnam's social insurance coverage is expanding but gaps remain large: the 2024 Social Insurance Law expanded mandatory enrollment, yet millions of informal workers remain outside the system. Ensuring that the transition to a high-income economy is broadly shared is both a moral and a political imperative.",
      color: '#7b1fa2',
    },
    {
      id: 'complementing',
      label: 'Market-Complementing',
      short: 'Public goods: infrastructure, health, education',
      detail: "These institutions provide what private markets generally will not — public infrastructure, quality education, health systems, and other public goods. Vietnam needs public investment of 7.3% of GDP annually to reach high-income status by 2045. As of 2024, actual disbursement reached only 77.5% of the annual plan — well below the 95–96% average for upper-middle and high-income countries. Closing this gap requires not just funding but improved processes for planning, approving, and executing public investment.",
      color: '#e65100',
    },
    {
      id: 'regulating',
      label: 'Market-Regulating',
      short: 'Externalities, environmental standards, business regulations',
      detail: "Market-regulating institutions address what markets price poorly or ignore — environmental externalities, public health risks, competition policy, and consumer protection. Vietnam has committed to carbon neutrality by 2050, requiring a major shift from coal-powered electricity toward low-carbon alternatives. The business regulatory environment continues to improve but firms still report burdensome ex ante administrative procedures as a significant constraint.",
      color: '#558b2f',
    },
    {
      id: 'state',
      label: 'Capable & Accountable State',
      short: 'Civil service, public administration, anticorruption',
      detail: 'Underpinning all other institutional categories is the state\'s capacity to actually deliver: an efficient central and local government, a motivated civil service, and systems of accountability and anticorruption. Vietnam\'s landmark anticorruption campaign under General Secretary Nguyen Phu Trong significantly shifted norms and perceptions. However, an unintended consequence has been risk-aversion among decision-makers, slowing public investment implementation. Civil servant wages lagged GDP growth from 2019–2023; a 30% base salary increase was implemented in July 2024.',
      color: '#1565c0',
    },
  ];

  const reformAreas = [
    {
      number: '01',
      title: 'Public Investment Reform',
      body: "Vietnam's public investment management system is governed by eight overlapping laws and a complex web of approval requirements. The government has estimated that 7.3% of GDP in annual public investment is needed to reach 2045 targets — but disbursement has consistently fallen short. In 2024, budget revenue collection exceeded plans while public investment disbursement reached only 77.5% of target. The current institutional structure has also produced perverse incentives: excess capacity in seaports and airports while connective infrastructure between regions remains underbuilt. Recent amendments to the Public Investment Law address some procedural bottlenecks; deeper reforms to realign incentives between central and local governments are ongoing.",
    },
    {
      number: '02',
      title: 'Regulatory Streamlining',
      body: "Businesses in Vietnam continue to identify administrative procedures as a major operational constraint. Successive reform programs have made progress — Project 30 in 2011 and subsequent initiatives have reduced the volume of administrative requirements — but the underlying lawmaking process itself remains slow and sometimes inconsistent. Strengthening the quality of regulatory impact assessments, improving inter-agency coordination on new regulations, and reducing compliance costs for firms are central goals of the 2045 plan. A more predictable regulatory environment is seen as essential for attracting the private investment needed to sustain high growth.",
    },
    {
      number: '03',
      title: 'Intergovernmental Fiscal Reform',
      body: "Vietnam operates as a unitary state in which provinces have significant spending responsibilities but limited own-source revenue authority. Tax sharing formulas for VAT, corporate income tax (CIT), and personal income tax (PIT) are set nationally and do not always align with where economic activity and population growth are occurring. The 2045 plan calls for reforming these formulas to better match fiscal resources with actual spending needs — particularly for fast-growing metropolitan areas. Longer-term reforms under discussion include new property taxes, surtaxes on PIT and CIT at the subnational level, and innovative financing mechanisms such as carbon credits and project-based revenues.",
    },
    {
      number: '04',
      title: 'Civil Service & Accountability',
      body: "The institutions for the civil service and public administration directly shape whether all other reforms can be implemented. Vietnam's public sector is large relative to high-income countries, and the wage bill absorbs a significant share of public expenditure. Civil servant salaries tracked GDP growth well until COVID-19 wage freezes; in the years following, many skilled officials resigned, affecting public investment implementation and service delivery. Plans to reduce the public workforce by 20% require careful management to minimize service disruption while improving the performance of those who remain. Stronger incentive systems, clearer performance accountability, and competitive compensation are identified as priorities.",
    },
  ];

  return (
    <div style={{
      minHeight: '100vh',
      background: '#f5f3f0',
      fontFamily: '"Cormorant Garamond", "Georgia", serif',
      color: '#1a1a1a'
    }}>

      {/* ── Sticky nav ── */}
      <div style={{
        position: 'sticky', top: 0, zIndex: 100,
        background: '#1a1a1a', borderBottom: '1px solid #2a2a2a',
        padding: '14px 40px', display: 'flex', alignItems: 'center', gap: '24px'
      }}>
        <button onClick={onBack} style={{
          background: 'transparent', border: 'none',
          color: 'rgba(255,255,255,0.5)', fontSize: '13px',
          fontFamily: '"Inter", sans-serif', cursor: 'pointer',
          padding: 0, letterSpacing: '0.2px'
        }}>← Back</button>
        <div style={{ width: '1px', height: '16px', background: '#333' }} />
        <div style={{
          fontSize: '14px', color: 'rgba(255,255,255,0.8)',
          fontFamily: '"Cormorant Garamond", serif', fontWeight: '400', letterSpacing: '0.3px'
        }}>Vietnam 2045</div>
      </div>

      {/* ── Hero ── */}
      <div style={{
        background: '#1a1a1a',
        padding: '80px 40px 72px',
        position: 'relative', overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: '3px',
          background: 'linear-gradient(90deg, #00897b, transparent)'
        }} />
        <div style={{ maxWidth: '820px', margin: '0 auto' }}>
          <div style={{
            fontSize: '11px', fontWeight: '700', color: '#4dd0c4',
            letterSpacing: '3px', textTransform: 'uppercase',
            marginBottom: '20px', fontFamily: '"Inter", sans-serif'
          }}>National Development Vision</div>
          <h1 style={{
            fontSize: 'clamp(36px, 5vw, 60px)', fontWeight: '300',
            color: 'white', margin: '0 0 24px 0',
            letterSpacing: '-1px', lineHeight: '1.1'
          }}>
            Vietnam 2045:<br />Breaking Through
          </h1>
          <p style={{
            fontSize: 'clamp(17px, 2vw, 22px)', fontStyle: 'italic',
            color: 'rgba(255,255,255,0.65)', margin: '0',
            lineHeight: '1.6', fontWeight: '300', maxWidth: '640px'
          }}>
            A plan to transform Vietnam into a high-income developed nation by the 100th anniversary of independence — one of the most ambitious development targets in the world.
          </p>
        </div>
      </div>

      {/* ── Progress context strip ── */}
      <div style={{ background: 'white', borderBottom: '1px solid #e8e4e0' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 40px' }}>
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '1px', background: '#e8e4e0'
          }}>
            {[
              ['5×', 'larger economy than 1986 in real terms'],
              ['5.7×', 'rise in per-capita income, 1990–2023'],
              ['7.1%', 'workers in extreme poverty today, vs. 72% in 2000'],
              ['7.3%', 'of GDP public investment needed annually to reach 2045 target'],
            ].map(([stat, label]) => (
              <div key={stat} style={{ background: 'white', padding: '32px 28px' }}>
                <div style={{
                  fontSize: '38px', fontWeight: '300', color: '#00897b',
                  letterSpacing: '-1px', lineHeight: 1, marginBottom: '8px'
                }}>{stat}</div>
                <div style={{
                  fontSize: '13px', color: '#777', lineHeight: '1.5',
                  fontFamily: '"Inter", sans-serif'
                }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Main content ── */}
      <div style={{ maxWidth: '820px', margin: '0 auto', padding: '72px 40px' }}>

        {/* The Goal */}
        <FadeSection>
          <Label>The Goal</Label>
          <h2 style={{
            fontSize: 'clamp(28px, 3.5vw, 40px)', fontWeight: '400',
            margin: '0 0 28px 0', lineHeight: '1.2', letterSpacing: '-0.3px'
          }}>
            High-income status by 2045
          </h2>
          <p style={{ fontSize: '18px', lineHeight: '1.85', color: '#444', marginBottom: '20px' }}>
            Vietnam's official development target is to achieve high-income country status — defined by the World Bank as a GNI per capita above roughly $14,000 — by 2045, the 100th anniversary of the declaration of independence. Vietnam became an upper-middle-income country in 2023 and now has approximately 20 years to make the transition.
          </p>
          <p style={{ fontSize: '18px', lineHeight: '1.85', color: '#444', marginBottom: '20px' }}>
            The World Bank's analysis of this goal is frank: very few countries have passed from lower-middle-income to high-income status in 20 years. Most countries that became upper-middle-income economies during this period spent 30 or more years before crossing the high-income threshold — and many have not crossed it at all. The plan itself describes reaching high-income status by 2045 as a "stretch goal."
          </p>
          <p style={{ fontSize: '18px', lineHeight: '1.85', color: '#444' }}>
            To achieve it, Vietnam needs to sustain annual GDP growth of 7–8%, a rate the country has maintained over three decades since Doi Moi but which will become harder to sustain as demographic advantages fade and the economy becomes more complex. An official growth target of 8% has been set for 2025, with double-digit targets for 2026–2030.
          </p>
        </FadeSection>

        <div style={{ margin: '64px 0' }}><Divider /></div>

        {/* Historical context */}
        <FadeSection>
          <Label>Historical Context</Label>
          <h2 style={{
            fontSize: 'clamp(28px, 3.5vw, 40px)', fontWeight: '400',
            margin: '0 0 28px 0', lineHeight: '1.2', letterSpacing: '-0.3px'
          }}>
            Doi Moi and the decades of transformation
          </h2>
          <p style={{ fontSize: '18px', lineHeight: '1.85', color: '#444', marginBottom: '20px' }}>
            The 1986 Doi Moi reforms initiated Vietnam's transition from a centrally planned economy to a market-oriented one. In the decades since, the economy has grown fivefold in real terms, averaging 5–6% annual growth over three decades — an achievement matched by very few countries. Poverty has been dramatically reduced, life expectancy has risen from 69 to 75 years, and adult literacy has reached 96%.
          </p>
          <p style={{ fontSize: '18px', lineHeight: '1.85', color: '#444', marginBottom: '20px' }}>
            Doi Moi established the basics of property rights, rationalized the lawmaking process, streamlined administrative procedures, and significantly improved transparency. Vietnam's integration into global value chains — particularly through export-oriented manufacturing in electronics, textiles, and footwear — drove the bulk of growth in the 2000s and 2010s.
          </p>
          <p style={{ fontSize: '18px', lineHeight: '1.85', color: '#444' }}>
            The 2045 vision is explicitly modeled on this precedent: as Doi Moi addressed the constraints of the planned-economy era, the current reform wave is designed to address the institutional constraints that could prevent Vietnam from making the transition from middle-income to high-income status.
          </p>
        </FadeSection>

        {/* Pull quote */}
        <FadeSection delay={0.1}>
          <div style={{
            margin: '48px 0',
            borderLeft: '3px solid #00897b',
            paddingLeft: '28px',
          }}>
            <p style={{
              fontSize: '22px', fontStyle: 'italic', fontWeight: '300',
              color: '#2a2a2a', lineHeight: '1.6', margin: '0 0 12px 0'
            }}>
              "Institutions will make or break Vietnam's ambitions to become a high-income country by 2045."
            </p>
            <div style={{
              fontSize: '12px', color: '#999', fontFamily: '"Inter", sans-serif',
              letterSpacing: '0.5px', textTransform: 'uppercase'
            }}>World Bank — Vietnam 2045: Breaking Through (2024)</div>
          </div>
        </FadeSection>

        <div style={{ margin: '64px 0' }}><Divider /></div>

        {/* Institutional Framework */}
        <FadeSection>
          <Label>The Framework</Label>
          <h2 style={{
            fontSize: 'clamp(28px, 3.5vw, 40px)', fontWeight: '400',
            margin: '0 0 16px 0', lineHeight: '1.2', letterSpacing: '-0.3px'
          }}>
            Six types of institutions
          </h2>
          <p style={{ fontSize: '17px', lineHeight: '1.8', color: '#555', marginBottom: '36px', fontStyle: 'italic' }}>
            The Vietnam 2045 plan, as analyzed by the World Bank, organizes the required institutional reforms into six complementary and mutually reinforcing categories. Click any to expand.
          </p>
        </FadeSection>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', marginBottom: '64px' }}>
          {institutions.map((inst, i) => (
            <FadeSection key={inst.id} delay={i * 0.05}>
              <div
                onClick={() => setActiveInstitution(activeInstitution === inst.id ? null : inst.id)}
                style={{
                  background: activeInstitution === inst.id ? 'white' : '#faf9f7',
                  border: '1px solid',
                  borderColor: activeInstitution === inst.id ? inst.color : '#e8e4e0',
                  borderLeft: `4px solid ${inst.color}`,
                  padding: '20px 24px',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{
                      fontSize: '18px', fontWeight: '400', color: '#1a1a1a',
                      marginBottom: '4px'
                    }}>{inst.label}</div>
                    <div style={{
                      fontSize: '13px', color: '#888',
                      fontFamily: '"Inter", sans-serif'
                    }}>{inst.short}</div>
                  </div>
                  <div style={{
                    fontSize: '18px', color: inst.color,
                    fontFamily: '"Inter", sans-serif',
                    transform: activeInstitution === inst.id ? 'rotate(45deg)' : 'rotate(0)',
                    transition: 'transform 0.2s'
                  }}>+</div>
                </div>
                {activeInstitution === inst.id && (
                  <div style={{
                    marginTop: '16px', paddingTop: '16px',
                    borderTop: '1px solid #f0ece8'
                  }}>
                    <p style={{
                      fontSize: '16px', lineHeight: '1.8', color: '#444',
                      margin: 0
                    }}>{inst.detail}</p>
                  </div>
                )}
              </div>
            </FadeSection>
          ))}
        </div>

        <Divider />
        <div style={{ margin: '64px 0 0 0' }} />

        {/* Three deep-dive reform areas */}
        <FadeSection>
          <Label>Priority Reform Areas</Label>
          <h2 style={{
            fontSize: 'clamp(28px, 3.5vw, 40px)', fontWeight: '400',
            margin: '0 0 16px 0', lineHeight: '1.2', letterSpacing: '-0.3px'
          }}>
            Four areas of focused action
          </h2>
          <p style={{ fontSize: '17px', lineHeight: '1.8', color: '#555', marginBottom: '48px', fontStyle: 'italic' }}>
            Within the broader institutional framework, the 2045 plan identifies four areas where targeted reforms are most critical and most urgent.
          </p>
        </FadeSection>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', marginBottom: '64px' }}>
          {reformAreas.map((area, i) => (
            <FadeSection key={area.number} delay={i * 0.08}>
              <div style={{
                background: 'white',
                border: '1px solid #e8e4e0',
                borderTop: '3px solid #00897b',
                padding: '36px'
              }}>
                <div style={{
                  fontSize: '12px', fontWeight: '700', color: '#bbb',
                  letterSpacing: '2px', fontFamily: '"Inter", sans-serif',
                  marginBottom: '10px'
                }}>{area.number}</div>
                <h3 style={{
                  fontSize: '24px', fontWeight: '400', margin: '0 0 20px 0',
                  letterSpacing: '-0.2px'
                }}>{area.title}</h3>
                <p style={{ fontSize: '16px', lineHeight: '1.8', color: '#555', margin: 0 }}>
                  {area.body}
                </p>
              </div>
            </FadeSection>
          ))}
        </div>

        <Divider />
        <div style={{ margin: '64px 0 0 0' }} />

        {/* The 2024 Reform Wave */}
        <FadeSection>
          <Label>August 2024 — The New Reform Wave</Label>
          <h2 style={{
            fontSize: 'clamp(28px, 3.5vw, 40px)', fontWeight: '400',
            margin: '0 0 28px 0', lineHeight: '1.2', letterSpacing: '-0.3px'
          }}>
            A once-in-a-generation reorganization
          </h2>
          <p style={{ fontSize: '18px', lineHeight: '1.85', color: '#444', marginBottom: '20px' }}>
            Beginning in August 2024, Vietnam launched its most significant structural reorganization since Doi Moi. The entire state apparatus was restructured in just six months, from September 2024 to February 2025. The number of government ministries was reduced from 22 to 17 through a series of mergers:
          </p>
        </FadeSection>

        <FadeSection delay={0.1}>
          <div style={{
            background: '#1a1a1a', padding: '36px',
            marginBottom: '32px'
          }}>
            <div style={{
              fontSize: '11px', fontWeight: '700', color: '#4dd0c4',
              letterSpacing: '2px', textTransform: 'uppercase',
              marginBottom: '20px', fontFamily: '"Inter", sans-serif'
            }}>Ministry Mergers</div>
            {[
              ['Ministry of Planning & Investment', 'merged with', 'Ministry of Finance'],
              ['Ministry of Transport', 'merged with', 'Ministry of Construction'],
              ['Ministry of Information & Communications', 'merged with', 'Ministry of Science & Technology'],
              ['Ministry of Natural Resources & Environment', 'merged with', 'Ministry of Agriculture & Rural Development'],
              ['Ministry of Labor, War Invalids & Social Affairs', 'dissolved —', 'functions distributed to Home Affairs, Education, Health'],
            ].map(([from, action, to]) => (
              <div key={from} style={{
                display: 'grid', gridTemplateColumns: '1fr auto 1fr',
                gap: '16px', alignItems: 'center',
                borderBottom: '1px solid #2a2a2a', padding: '14px 0',
                fontFamily: '"Inter", sans-serif'
              }}>
                <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.75)' }}>{from}</div>
                <div style={{ fontSize: '11px', color: '#4dd0c4', textAlign: 'center', whiteSpace: 'nowrap' }}>{action}</div>
                <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.75)', textAlign: 'right' }}>{to}</div>
              </div>
            ))}
          </div>
        </FadeSection>

        <FadeSection delay={0.1}>
          <p style={{ fontSize: '18px', lineHeight: '1.85', color: '#444', marginBottom: '20px' }}>
            Provincial consolidation is equally sweeping. Of 63 provinces and cities, 52 are being merged with others by August 2025. The district level of government is being eliminated entirely. Approximately 70–75% of commune-level administrative units are also being merged. Functional units within each ministry are being streamlined by as much as 40%.
          </p>
          <p style={{ fontSize: '18px', lineHeight: '1.85', color: '#444', marginBottom: '20px' }}>
            The National Assembly has also been restructured: its committees reduced from 10 to 6. Plans call for reducing the public workforce by approximately 20% over the reform period, with an initial 5% reduction targeted for 2025.
          </p>
          <p style={{ fontSize: '18px', lineHeight: '1.85', color: '#444' }}>
            The stated goals of this reorganization are improved efficiency, reduced administrative burden for businesses and citizens, stronger accountability, and better alignment between where government revenue is collected and where spending occurs. The scale of implementation — achieved in under six months — is described by analysts as remarkable for a country that has traditionally relied on gradual, step-by-step reforms.
          </p>
        </FadeSection>

        <div style={{ margin: '64px 0' }}><Divider /></div>

        {/* Key acknowledged challenges */}
        <FadeSection>
          <Label>Acknowledged Challenges</Label>
          <h2 style={{
            fontSize: 'clamp(28px, 3.5vw, 40px)', fontWeight: '400',
            margin: '0 0 28px 0', lineHeight: '1.2', letterSpacing: '-0.3px'
          }}>
            Structural constraints identified in the plan
          </h2>
          <p style={{ fontSize: '17px', lineHeight: '1.8', color: '#555', marginBottom: '36px', fontStyle: 'italic' }}>
            The Vietnam 2045 analysis is candid about the obstacles that must be addressed alongside the reforms.
          </p>
        </FadeSection>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '64px' }}>
          {[
            {
              title: 'Decision-Maker Risk Aversion',
              body: "Vietnam's anticorruption campaign has shifted norms significantly, but an unintended effect has been widespread reluctance among officials to make decisions — contributing to delays in public investment disbursement and implementation."
            },
            {
              title: 'Civil Service Compensation',
              body: "Civil servant salaries tracked GDP growth closely until the COVID-19 wage freeze. In the years following, pay fell behind both GDP growth and inflation, contributing to elevated resignation rates among skilled officials in 2022–2023. A 30% salary increase was implemented in July 2024."
            },
            {
              title: 'Interprovincial Competition',
              body: "While decentralization has given provinces greater spending control, it has also created incentives for wasteful competition between provinces — resulting in excess capacity in seaports and airports while cross-regional connective infrastructure remains underbuilt."
            },
            {
              title: 'Land & Property Rights Gaps',
              body: "While overall property rights confidence is high (83% of firms trust the legal system to uphold rights), land expropriation compensation disputes remain a significant concern — only 40% of firms in 2023 reported that compensation is fair when land is expropriated."
            },
            {
              title: 'Regulatory Complexity',
              body: "The public investment framework is governed by eight separate laws with overlapping requirements. Successive deregulation programs have made progress, but the underlying lawmaking process remains slow, and legal ambiguity leaves many approvals delayed."
            },
            {
              title: 'Informal Economy Scale',
              body: "With 64.5% of the workforce in the informal sector, the government's fiscal capacity to fund the public investments and social protections required by the 2045 plan is constrained. Formalization is both a goal and a prerequisite of the broader development agenda."
            },
          ].map((item) => (
            <FadeSection key={item.title}>
              <div style={{
                background: 'white', border: '1px solid #e8e4e0',
                padding: '28px', height: '100%', boxSizing: 'border-box'
              }}>
                <h4 style={{
                  fontSize: '17px', fontWeight: '400', margin: '0 0 14px 0',
                  color: '#1a1a1a'
                }}>{item.title}</h4>
                <p style={{
                  fontSize: '14px', lineHeight: '1.75', color: '#666',
                  margin: 0, fontFamily: '"Inter", sans-serif'
                }}>{item.body}</p>
              </div>
            </FadeSection>
          ))}
        </div>

        <Divider />
        <div style={{ margin: '64px 0 0 0' }} />

        {/* Bridge to informal economy */}
        <FadeSection>
          <div style={{
            background: '#1a1a1a', padding: '48px',
          }}>
            <div style={{
              fontSize: '11px', fontWeight: '700', color: '#4dd0c4',
              letterSpacing: '2.5px', textTransform: 'uppercase',
              marginBottom: '16px', fontFamily: '"Inter", sans-serif'
            }}>Connection to This Project</div>
            <h3 style={{
              fontSize: '26px', fontWeight: '300', color: 'white',
              margin: '0 0 20px 0', lineHeight: '1.3'
            }}>
              The informal economy is both an obstacle and a target
            </h3>
            <p style={{
              fontSize: '16px', lineHeight: '1.8', color: 'rgba(255,255,255,0.65)',
              margin: '0 0 20px 0', fontFamily: '"Inter", sans-serif'
            }}>
              Reaching high-income status by 2045 requires the fiscal capacity to fund large-scale public investment in infrastructure, education, and social protection. That fiscal capacity depends heavily on the tax base — which is constrained by an informal sector that accounts for 64.5% of employment and pays minimal taxes.
            </p>
            <p style={{
              fontSize: '16px', lineHeight: '1.8', color: 'rgba(255,255,255,0.65)',
              margin: 0, fontFamily: '"Inter", sans-serif'
            }}>
              Formalization — bringing informal workers and businesses into the formal economy — is therefore not just a labor market goal but a fiscal and development one. This project maps where informal employment is concentrated across Vietnam's 63 provinces, and examines the structural factors that explain its persistence.
            </p>
          </div>
        </FadeSection>

      </div>

      {/* ── Sources ── */}
      <div style={{
        background: 'white', borderTop: '1px solid #e8e4e0',
        padding: '40px'
      }}>
        <div style={{ maxWidth: '820px', margin: '0 auto' }}>
          <div style={{
            fontSize: '11px', fontWeight: '700', color: '#bbb',
            letterSpacing: '2px', textTransform: 'uppercase',
            marginBottom: '16px', fontFamily: '"Inter", sans-serif'
          }}>Sources</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px 40px' }}>
            {[
              'World Bank. Vietnam 2045: Breaking Through — Institutions for a High-Income Future. 2024.',
              'OECD. Economic Survey of Viet Nam 2025 — Executive Summary.',
              'World Bank / ILO. Overall Situation of Workers in Informal Employment in Viet Nam. GSO, 2023.',
              'World Bank. Vietnam Country Profile. 2023.',
              'IMF. Vietnam: Selected Issues. IMF Country Reports 2024(307).',
              'Viet Nam Ministry of Investment and Planning. Socio-Economic Development Strategy 2021–2030.',
            ].map(src => (
              <div key={src} style={{
                fontSize: '12px', color: '#999', lineHeight: '1.6',
                fontFamily: '"Inter", sans-serif', paddingBottom: '8px',
                borderBottom: '1px solid #f0ece8'
              }}>{src}</div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Footer ── */}
      <div style={{
        background: '#1a1a1a', borderTop: '1px solid #2a2a2a',
        padding: '24px 40px', textAlign: 'center'
      }}>
        <p style={{
          fontSize: '12px', color: 'rgba(255,255,255,0.3)',
          margin: 0, fontFamily: '"Inter", sans-serif', letterSpacing: '0.3px'
        }}>
          ECON 62 — Topics in Macroeconomics · Winter 2026 · Data: GSO Labor Force Survey 2023, World Bank, ILO
        </p>
      </div>

    </div>
  );
}

export default Vietnam2045;
