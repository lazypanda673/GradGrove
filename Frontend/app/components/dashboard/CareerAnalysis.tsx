'use client';

import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import AnimatedElement from '../common/AnimatedElement';

// Types
interface Student {
  id: number;
  name: string;
  roll: string;
  year: string;
  semester: string;
  section: string;
  dept: string;
  gender: string;
  socio: string;
  risk: 'low' | 'medium' | 'high';
  cgpa: number;
  attendance: number;
  counselingSessions: number;
  disciplinaryActions: number;
  participation: number;
}

interface CareerAnalysisProps {
  mockStudents: Student[];
}

// Color scheme
const COLORS = {
  primary: '#6366f1',
  blue: '#3b82f6',
  green: '#10b981',
  purple: '#8b5cf6',
  teal: '#14b8a6',
  orange: '#f97316'
};

const CareerAnalysis: React.FC<CareerAnalysisProps> = ({ mockStudents }) => {
  
  // Career readiness data
  const careerReadinessData = [
    { subject: 'Technical Skills', A: 85, B: 78, fullMark: 100 },
    { subject: 'Communication', A: 92, B: 88, fullMark: 100 },
    { subject: 'Problem Solving', A: 78, B: 85, fullMark: 100 },
    { subject: 'Leadership', A: 88, B: 82, fullMark: 100 },
    { subject: 'Teamwork', A: 95, B: 90, fullMark: 100 },
    { subject: 'Adaptability', A: 82, B: 78, fullMark: 100 },
  ];

  // Industry preference data
  const industryData = [
    { name: 'Technology', students: 45, growth: '+12%' },
    { name: 'Healthcare', students: 32, growth: '+8%' },
    { name: 'Finance', students: 28, growth: '+15%' },
    { name: 'Education', students: 24, growth: '+5%' },
    { name: 'Manufacturing', students: 18, growth: '+3%' },
    { name: 'Consulting', students: 15, growth: '+18%' },
  ];

  // Skills gap analysis
  const skillsGapData = [
    { skill: 'Data Analysis', demand: 95, current: 68, gap: 27 },
    { skill: 'Digital Marketing', demand: 88, current: 72, gap: 16 },
    { skill: 'Project Management', demand: 92, current: 58, gap: 34 },
    { skill: 'Cloud Computing', demand: 85, current: 45, gap: 40 },
    { skill: 'AI/ML', demand: 90, current: 35, gap: 55 },
    { skill: 'Cybersecurity', demand: 87, current: 52, gap: 35 },
  ];

  return (
    <div style={{ flex: 1, padding: '24px', background: '#f8fafc', overflowY: 'auto' }}>
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#1a202c', marginBottom: '8px' }}>
          Career Analysis & Guidance
        </h2>
        <p style={{ color: '#64748b' }}>
          Comprehensive career readiness assessment and industry trend analysis
        </p>
      </div>

      {/* Animated Summary Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', marginBottom: '32px' }}>
        <AnimatedElement animation="scaleIn" delay={100}>
          <div style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            borderRadius: '20px',
            padding: '28px',
            color: 'white',
            boxShadow: '0 8px 32px rgba(102, 126, 234, 0.3)',
            cursor: 'pointer',
            transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
            position: 'relative',
            overflow: 'hidden'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)';
            e.currentTarget.style.boxShadow = '0 20px 40px rgba(102, 126, 234, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0) scale(1)';
            e.currentTarget.style.boxShadow = '0 8px 32px rgba(102, 126, 234, 0.3)';
          }}
          >
            <div style={{ fontSize: '48px', marginBottom: '12px', opacity: 0.2, position: 'absolute', top: '16px', right: '20px' }}>🎯</div>
            <div style={{ fontSize: '14px', opacity: 0.9, marginBottom: '8px', fontWeight: '500' }}>Career Ready Students</div>
            <div style={{ fontSize: '36px', fontWeight: '800', marginBottom: '6px', textShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
              {Math.round(mockStudents.filter(s => s.cgpa >= 7.5 && s.attendance >= 80).length / mockStudents.length * 100)}%
            </div>
            <div style={{ fontSize: '13px', opacity: 0.8, display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span style={{ color: '#4ade80' }}>↗</span> +5% from last month
            </div>
          </div>
        </AnimatedElement>

        <AnimatedElement animation="scaleIn" delay={200}>
          <div style={{
            background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
            borderRadius: '20px',
            padding: '28px',
            color: 'white',
            boxShadow: '0 8px 32px rgba(240, 147, 251, 0.3)',
            cursor: 'pointer',
            transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
            position: 'relative',
            overflow: 'hidden'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)';
            e.currentTarget.style.boxShadow = '0 20px 40px rgba(240, 147, 251, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0) scale(1)';
            e.currentTarget.style.boxShadow = '0 8px 32px rgba(240, 147, 251, 0.3)';
          }}
          >
            <div style={{ fontSize: '48px', marginBottom: '12px', opacity: 0.2, position: 'absolute', top: '16px', right: '20px' }}>⭐</div>
            <div style={{ fontSize: '14px', opacity: 0.9, marginBottom: '8px', fontWeight: '500' }}>Average Skill Rating</div>
            <div style={{ fontSize: '36px', fontWeight: '800', marginBottom: '6px', textShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>8.2/10</div>
            <div style={{ fontSize: '13px', opacity: 0.8, display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span style={{ color: '#4ade80' }}>↗</span> Across all competencies
            </div>
          </div>
        </AnimatedElement>

        <AnimatedElement animation="scaleIn" delay={300}>
          <div style={{
            background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
            borderRadius: '20px',
            padding: '28px',
            color: 'white',
            boxShadow: '0 8px 32px rgba(79, 172, 254, 0.3)',
            cursor: 'pointer',
            transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
            position: 'relative',
            overflow: 'hidden'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)';
            e.currentTarget.style.boxShadow = '0 20px 40px rgba(79, 172, 254, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0) scale(1)';
            e.currentTarget.style.boxShadow = '0 8px 32px rgba(79, 172, 254, 0.3)';
          }}
          >
            <div style={{ fontSize: '48px', marginBottom: '12px', opacity: 0.2, position: 'absolute', top: '16px', right: '20px' }}>🚀</div>
            <div style={{ fontSize: '14px', opacity: 0.9, marginBottom: '8px', fontWeight: '500' }}>Placement Rate</div>
            <div style={{ fontSize: '36px', fontWeight: '800', marginBottom: '6px', textShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>87%</div>
            <div style={{ fontSize: '13px', opacity: 0.8, display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span style={{ color: '#4ade80' }}>↗</span> Last academic year
            </div>
          </div>
        </AnimatedElement>

        <AnimatedElement animation="scaleIn" delay={400}>
          <div style={{
            background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
            borderRadius: '20px',
            padding: '28px',
            color: 'white',
            boxShadow: '0 8px 32px rgba(250, 112, 154, 0.3)',
            cursor: 'pointer',
            transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
            position: 'relative',
            overflow: 'hidden'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)';
            e.currentTarget.style.boxShadow = '0 20px 40px rgba(250, 112, 154, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0) scale(1)';
            e.currentTarget.style.boxShadow = '0 8px 32px rgba(250, 112, 154, 0.3)';
          }}
          >
            <div style={{ fontSize: '48px', marginBottom: '12px', opacity: 0.2, position: 'absolute', top: '16px', right: '20px' }}>🤝</div>
            <div style={{ fontSize: '14px', opacity: 0.9, marginBottom: '8px', fontWeight: '500' }}>Industry Partners</div>
            <div style={{ fontSize: '36px', fontWeight: '800', marginBottom: '6px', textShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>24</div>
            <div style={{ fontSize: '13px', opacity: 0.8, display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span style={{ color: '#4ade80' }}>↗</span> Active collaborations
            </div>
          </div>
        </AnimatedElement>
      </div>

      {/* Charts Section */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px', marginBottom: '32px' }}>
        
        {/* Career Readiness Radar */}
        <AnimatedElement animation="slideInUp" delay={300}>
          <div style={{ background: '#fff', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', border: '1px solid #e2e8f0' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1a202c', marginBottom: '20px' }}>
              Career Readiness Assessment
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={careerReadinessData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" tick={{ fontSize: 12 }} />
                <PolarRadiusAxis angle={90} domain={[0, 100]} tick={false} />
                <Radar name="Current Batch" dataKey="A" stroke={COLORS.primary} fill={COLORS.primary} fillOpacity={0.3} strokeWidth={2} />
                <Radar name="Previous Batch" dataKey="B" stroke={COLORS.teal} fill={COLORS.teal} fillOpacity={0.2} strokeWidth={2} />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </AnimatedElement>

        {/* Industry Preferences */}
        <AnimatedElement animation="slideInUp" delay={400}>
          <div style={{ 
            background: 'linear-gradient(135deg, #fff 0%, #f8fafc 100%)', 
            borderRadius: '16px', 
            padding: '24px', 
            boxShadow: '0 8px 32px rgba(0,0,0,0.12)', 
            border: '1px solid #e2e8f0',
            transition: 'all 0.3s ease',
            cursor: 'pointer'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-4px)';
            e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.15)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.12)';
          }}
          >
            <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1a202c', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              📊 Industry Preferences
            </h3>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart 
                data={industryData} 
                layout="horizontal"
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis 
                  type="number" 
                  tick={{ fontSize: 12, fill: '#64748b' }}
                  axisLine={{ stroke: '#e2e8f0' }}
                />
                <YAxis 
                  dataKey="name" 
                  type="category" 
                  width={100} 
                  tick={{ fontSize: 12, fill: '#64748b' }} 
                  axisLine={{ stroke: '#e2e8f0' }}
                />
                <Tooltip 
                  contentStyle={{
                    background: 'rgba(255, 255, 255, 0.95)',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
                  }}
                  formatter={(value: any, name: any) => [
                    `${value} students`, 
                    'Interest Level'
                  ]}
                  labelFormatter={(label: any) => `Industry: ${label}`}
                />
                <Bar 
                  dataKey="students" 
                  fill="url(#industryGradient)" 
                  radius={[0, 6, 6, 0]}
                  animationDuration={1000}
                  animationBegin={200}
                />
                <defs>
                  <linearGradient id="industryGradient" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor={COLORS.blue} />
                    <stop offset="100%" stopColor={COLORS.purple} />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
            
            {/* Industry Growth Indicators */}
            <div style={{ marginTop: '16px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '12px' }}>
              {industryData.map((industry, index) => (
                <div key={industry.name} style={{
                  padding: '12px',
                  background: `linear-gradient(135deg, ${COLORS.primary}10, ${COLORS.blue}05)`,
                  borderRadius: '8px',
                  border: '1px solid #e2e8f0',
                  textAlign: 'center'
                }}>
                  <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '4px' }}>
                    {industry.name}
                  </div>
                  <div style={{ fontSize: '14px', fontWeight: '600', color: COLORS.green }}>
                    {industry.growth} Growth
                  </div>
                </div>
              ))}
            </div>
          </div>
        </AnimatedElement>
      </div>

      {/* Skills Gap Analysis */}
      <AnimatedElement animation="slideInUp" delay={500}>
        <div style={{ background: '#fff', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', border: '1px solid #e2e8f0', marginBottom: '32px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1a202c', marginBottom: '20px' }}>
            Skills Gap Analysis
          </h3>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #e2e8f0' }}>
                  <th style={{ textAlign: 'left', padding: '12px', fontSize: '14px', fontWeight: '600', color: '#374151' }}>Skill</th>
                  <th style={{ textAlign: 'center', padding: '12px', fontSize: '14px', fontWeight: '600', color: '#374151' }}>Market Demand</th>
                  <th style={{ textAlign: 'center', padding: '12px', fontSize: '14px', fontWeight: '600', color: '#374151' }}>Current Level</th>
                  <th style={{ textAlign: 'center', padding: '12px', fontSize: '14px', fontWeight: '600', color: '#374151' }}>Gap</th>
                  <th style={{ textAlign: 'center', padding: '12px', fontSize: '14px', fontWeight: '600', color: '#374151' }}>Priority</th>
                </tr>
              </thead>
              <tbody>
                {skillsGapData.map((skill, index) => (
                  <tr key={skill.skill} style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '16px 12px', fontSize: '14px', fontWeight: '500', color: '#1a202c' }}>
                      {skill.skill}
                    </td>
                    <td style={{ padding: '16px 12px', textAlign: 'center' }}>
                      <div style={{
                        background: `linear-gradient(90deg, ${COLORS.green} 0%, ${COLORS.green} ${skill.demand}%, #f1f5f9 ${skill.demand}%, #f1f5f9 100%)`,
                        borderRadius: '20px',
                        padding: '4px 12px',
                        fontSize: '12px',
                        fontWeight: '600',
                        color: '#1a202c'
                      }}>
                        {skill.demand}%
                      </div>
                    </td>
                    <td style={{ padding: '16px 12px', textAlign: 'center' }}>
                      <div style={{
                        background: `linear-gradient(90deg, ${COLORS.blue} 0%, ${COLORS.blue} ${skill.current}%, #f1f5f9 ${skill.current}%, #f1f5f9 100%)`,
                        borderRadius: '20px',
                        padding: '4px 12px',
                        fontSize: '12px',
                        fontWeight: '600',
                        color: '#1a202c'
                      }}>
                        {skill.current}%
                      </div>
                    </td>
                    <td style={{ padding: '16px 12px', textAlign: 'center' }}>
                      <span style={{
                        padding: '4px 12px',
                        borderRadius: '20px',
                        fontSize: '12px',
                        fontWeight: '600',
                        background: skill.gap > 30 ? 'rgba(239, 68, 68, 0.1)' : skill.gap > 15 ? 'rgba(245, 158, 11, 0.1)' : 'rgba(16, 185, 129, 0.1)',
                        color: skill.gap > 30 ? '#dc2626' : skill.gap > 15 ? '#d97706' : '#059669'
                      }}>
                        {skill.gap}%
                      </span>
                    </td>
                    <td style={{ padding: '16px 12px', textAlign: 'center' }}>
                      <span style={{
                        padding: '4px 12px',
                        borderRadius: '20px',
                        fontSize: '12px',
                        fontWeight: '600',
                        background: skill.gap > 30 ? 'rgba(239, 68, 68, 0.1)' : skill.gap > 15 ? 'rgba(245, 158, 11, 0.1)' : 'rgba(16, 185, 129, 0.1)',
                        color: skill.gap > 30 ? '#dc2626' : skill.gap > 15 ? '#d97706' : '#059669'
                      }}>
                        {skill.gap > 30 ? 'High' : skill.gap > 15 ? 'Medium' : 'Low'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </AnimatedElement>

      {/* Recommendations */}
      <AnimatedElement animation="slideInUp" delay={600}>
        <div style={{ background: '#fff', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', border: '1px solid #e2e8f0' }}>
          <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1a202c', marginBottom: '20px' }}>
            Recommended Actions
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
            <button style={{
              background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(99, 102, 241, 0.05))',
              borderRadius: '16px',
              padding: '24px',
              border: '2px solid rgba(99, 102, 241, 0.2)',
              cursor: 'pointer',
              transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
              textAlign: 'left',
              width: '100%',
              position: 'relative',
              overflow: 'hidden'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px) scale(1.02)';
              e.currentTarget.style.boxShadow = '0 12px 24px rgba(99, 102, 241, 0.15)';
              e.currentTarget.style.borderColor = COLORS.primary;
              e.currentTarget.style.background = 'linear-gradient(135deg, rgba(99, 102, 241, 0.15), rgba(99, 102, 241, 0.08))';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
              e.currentTarget.style.boxShadow = 'none';
              e.currentTarget.style.borderColor = 'rgba(99, 102, 241, 0.2)';
              e.currentTarget.style.background = 'linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(99, 102, 241, 0.05))';
            }}
            onClick={() => {
              console.log('Launching Skill Development Programs...');
              // Add navigation logic here
            }}
            >
              <div style={{ fontSize: '18px', fontWeight: '700', color: COLORS.primary, marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '24px' }}>📚</span>
                Skill Development Programs
              </div>
              <p style={{ fontSize: '14px', color: '#64748b', margin: 0, lineHeight: '1.5' }}>
                Launch intensive training programs for AI/ML and Cloud Computing to bridge critical skill gaps
              </p>
              <div style={{ 
                position: 'absolute', 
                bottom: '16px', 
                right: '20px', 
                fontSize: '20px', 
                color: COLORS.primary,
                opacity: 0.6,
                transition: 'all 0.3s ease'
              }}>
                →
              </div>
            </button>
            
            <button style={{
              background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(16, 185, 129, 0.05))',
              borderRadius: '16px',
              padding: '24px',
              border: '2px solid rgba(16, 185, 129, 0.2)',
              cursor: 'pointer',
              transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
              textAlign: 'left',
              width: '100%',
              position: 'relative',
              overflow: 'hidden'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px) scale(1.02)';
              e.currentTarget.style.boxShadow = '0 12px 24px rgba(16, 185, 129, 0.15)';
              e.currentTarget.style.borderColor = COLORS.green;
              e.currentTarget.style.background = 'linear-gradient(135deg, rgba(16, 185, 129, 0.15), rgba(16, 185, 129, 0.08))';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
              e.currentTarget.style.boxShadow = 'none';
              e.currentTarget.style.borderColor = 'rgba(16, 185, 129, 0.2)';
              e.currentTarget.style.background = 'linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(16, 185, 129, 0.05))';
            }}
            onClick={() => {
              console.log('Expanding Industry Partnerships...');
              // Add navigation logic here
            }}
            >
              <div style={{ fontSize: '18px', fontWeight: '700', color: COLORS.green, marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '24px' }}>🤝</span>
                Industry Partnerships
              </div>
              <p style={{ fontSize: '14px', color: '#64748b', margin: 0, lineHeight: '1.5' }}>
                Expand partnerships with tech companies to provide real-world project experience
              </p>
              <div style={{ 
                position: 'absolute', 
                bottom: '16px', 
                right: '20px', 
                fontSize: '20px', 
                color: COLORS.green,
                opacity: 0.6,
                transition: 'all 0.3s ease'
              }}>
                →
              </div>
            </button>
            
            <button style={{
              background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.1), rgba(245, 158, 11, 0.05))',
              borderRadius: '16px',
              padding: '24px',
              border: '2px solid rgba(245, 158, 11, 0.2)',
              cursor: 'pointer',
              transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
              textAlign: 'left',
              width: '100%',
              position: 'relative',
              overflow: 'hidden'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px) scale(1.02)';
              e.currentTarget.style.boxShadow = '0 12px 24px rgba(245, 158, 11, 0.15)';
              e.currentTarget.style.borderColor = '#d97706';
              e.currentTarget.style.background = 'linear-gradient(135deg, rgba(245, 158, 11, 0.15), rgba(245, 158, 11, 0.08))';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
              e.currentTarget.style.boxShadow = 'none';
              e.currentTarget.style.borderColor = 'rgba(245, 158, 11, 0.2)';
              e.currentTarget.style.background = 'linear-gradient(135deg, rgba(245, 158, 11, 0.1), rgba(245, 158, 11, 0.05))';
            }}
            onClick={() => {
              console.log('Implementing Personalized Guidance...');
              // Add navigation logic here
            }}
            >
              <div style={{ fontSize: '18px', fontWeight: '700', color: '#d97706', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '24px' }}>🎯</span>
                Personalized Guidance
              </div>
              <p style={{ fontSize: '14px', color: '#64748b', margin: 0, lineHeight: '1.5' }}>
                Implement AI-driven career counseling for personalized career pathway recommendations
              </p>
              <div style={{ 
                position: 'absolute', 
                bottom: '16px', 
                right: '20px', 
                fontSize: '20px', 
                color: '#d97706',
                opacity: 0.6,
                transition: 'all 0.3s ease'
              }}>
                →
              </div>
            </button>
          </div>
        </div>
      </AnimatedElement>
    </div>
  );
};

export default CareerAnalysis;
