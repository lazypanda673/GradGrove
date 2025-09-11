'use client';

import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, LineChart, Line, PieChart, Pie, Cell, Area, AreaChart } from 'recharts';
import AnimatedElement from '../common/AnimatedElement';

// Types
interface Student {
  id: number;
  name: string;
  roll: string;
  class: string;
  dept: string;
  gender: string;
  socio: string;
  risk: 'low' | 'medium' | 'high';
  grades: number;
  attendance: number;
  counselingSessions: number;
  disciplinaryActions: number;
  participation: number;
}

interface MetricCard {
  title: string;
  value: number | string;
  unit: string;
  color: string;
  icon: string;
}

interface DashboardContentProps {
  selectedStudent: Student | null;
  mockStudents: Student[];
}

// Color scheme
const COLORS = {
  primary: '#6366f1',
  blue: '#3b82f6',
  green: '#10b981',
  red: '#ef4444',
  warning: '#f59e0b',
  purple: '#8b5cf6',
  teal: '#14b8a6',
  danger: '#dc2626'
};

const DashboardContent: React.FC<DashboardContentProps> = ({ selectedStudent, mockStudents }) => {
  
  // Helper functions for data generation
  const generateRiskData = () => {
    const riskCounts = mockStudents.reduce((acc, s) => {
      acc[s.risk] = (acc[s.risk] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return [
      { name: 'Low Risk', value: riskCounts.low || 0, fill: COLORS.green },
      { name: 'Medium Risk', value: riskCounts.medium || 0, fill: COLORS.warning },
      { name: 'High Risk', value: riskCounts.high || 0, fill: COLORS.danger }
    ];
  };

  const generateDepartmentData = () => {
    const deptCounts = mockStudents.reduce((acc, s) => {
      acc[s.dept] = (acc[s.dept] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(deptCounts).map(([name, value]) => ({ name, value }));
  };

  const generateGradeDistribution = () => {
    const gradeBuckets = mockStudents.reduce((acc, s) => {
      const bucket = s.grades >= 9 ? 'A+' : s.grades >= 8 ? 'A' : s.grades >= 7 ? 'B' : s.grades >= 6 ? 'C' : 'D';
      acc[bucket] = (acc[bucket] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(gradeBuckets).map(([name, value]) => ({ name, value }));
  };

  const generateMonthlyTrends = () => [
    { month: 'Jan', sessions: 45, disciplinary: 8 },
    { month: 'Feb', sessions: 52, disciplinary: 6 },
    { month: 'Mar', sessions: 48, disciplinary: 12 },
    { month: 'Apr', sessions: 61, disciplinary: 4 },
    { month: 'May', sessions: 55, disciplinary: 9 },
    { month: 'Jun', sessions: 58, disciplinary: 7 },
  ];

  const getStudentMetrics = (student: Student): MetricCard[] => [
    { title: 'Overall Grade', value: student.grades.toFixed(1), unit: '/10', color: COLORS.blue, icon: '📊' },
    { title: 'Attendance', value: student.attendance, unit: '%', color: COLORS.green, icon: '✅' },
    { title: 'Participation', value: student.participation, unit: '%', color: COLORS.purple, icon: '🙋' },
    { title: 'Sessions', value: student.counselingSessions, unit: '', color: COLORS.teal, icon: '💬' },
    { title: 'Risk Level', value: student.risk.toUpperCase(), unit: '', color: student.risk === 'low' ? COLORS.green : student.risk === 'medium' ? COLORS.warning : COLORS.danger, icon: '⚠️' },
  ];

  const getOverviewMetrics = (): MetricCard[] => [
    { title: 'Total Students', value: mockStudents.length, unit: '', color: COLORS.blue, icon: '👥' },
    { title: 'High Risk', value: mockStudents.filter(s => s.risk === 'high').length, unit: '', color: COLORS.danger, icon: '🚨' },
    { title: 'Avg Attendance', value: Math.round(mockStudents.reduce((sum, s) => sum + s.attendance, 0) / mockStudents.length), unit: '%', color: COLORS.green, icon: '📈' },
    { title: 'Sessions This Month', value: mockStudents.reduce((sum, s) => sum + s.counselingSessions, 0), unit: '', color: COLORS.teal, icon: '💬' },
  ];

  const currentMetrics = selectedStudent ? getStudentMetrics(selectedStudent) : getOverviewMetrics();

  return (
    <div style={{ flex: 1, padding: '24px', background: '#f8fafc', overflowY: 'auto' }}>
      
      {/* Metric Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '24px' }}>
        {currentMetrics.map((metric, idx) => (
          <AnimatedElement key={metric.title} animation="scaleIn" delay={100 + (idx * 50)}>
            <div style={{
              background: '#fff',
              borderRadius: '12px',
              padding: '24px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              border: '1px solid #e2e8f0',
              transition: 'transform 0.2s, box-shadow 0.2s',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)';
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                <div style={{ fontSize: '14px', fontWeight: '500', color: '#64748b' }}>{metric.title}</div>
                <div style={{ fontSize: '20px' }}>{metric.icon}</div>
              </div>
              <div style={{ fontSize: '32px', fontWeight: '700', color: metric.color, marginBottom: '4px' }}>
                {metric.value}
                {metric.unit && <span style={{ fontSize: '16px', color: '#64748b', marginLeft: '4px' }}>{metric.unit}</span>}
              </div>
            </div>
          </AnimatedElement>
        ))}
      </div>

      {/* Charts Section */}
      <div style={{ display: 'grid', gridTemplateColumns: selectedStudent ? '1fr' : 'repeat(2, 1fr)', gap: '24px' }}>
        
        {!selectedStudent && (
          <>
            {/* Risk Distribution Chart */}
            <AnimatedElement animation="slideInUp" delay={300}>
              <div style={{ background: '#fff', borderRadius: '12px', padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', border: '1px solid #e2e8f0' }}>
                <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1a202c', marginBottom: '20px' }}>Risk Level Distribution</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={generateRiskData()}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={120}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {generateRiskData().map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </AnimatedElement>

            {/* Department Distribution */}
            <AnimatedElement animation="slideInUp" delay={400}>
              <div style={{ background: '#fff', borderRadius: '12px', padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', border: '1px solid #e2e8f0' }}>
                <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1a202c', marginBottom: '20px' }}>Students by Department</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={generateDepartmentData()}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill={COLORS.blue} radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </AnimatedElement>

            {/* Grade Distribution */}
            <AnimatedElement animation="slideInUp" delay={500}>
              <div style={{ background: '#fff', borderRadius: '12px', padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', border: '1px solid #e2e8f0' }}>
                <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1a202c', marginBottom: '20px' }}>Grade Distribution</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={generateGradeDistribution()}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill={COLORS.purple} radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </AnimatedElement>

            {/* Monthly Trends */}
            <AnimatedElement animation="slideInUp" delay={600}>
              <div style={{ background: '#fff', borderRadius: '12px', padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', border: '1px solid #e2e8f0' }}>
                <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1a202c', marginBottom: '20px' }}>Monthly Counseling Trends</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={generateMonthlyTrends()}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="sessions" stroke={COLORS.green} strokeWidth={3} dot={{ fill: COLORS.green }} />
                    <Line type="monotone" dataKey="disciplinary" stroke={COLORS.red} strokeWidth={3} dot={{ fill: COLORS.red }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </AnimatedElement>
          </>
        )}

        {selectedStudent && (
          <AnimatedElement animation="slideInUp" delay={300}>
            <div style={{ background: '#fff', borderRadius: '12px', padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', border: '1px solid #e2e8f0' }}>
              <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1a202c', marginBottom: '20px' }}>
                {selectedStudent.name}'s Performance Trends
              </h3>
              <ResponsiveContainer width="100%" height={400}>
                <AreaChart data={[
                  { month: 'Jan', attendance: selectedStudent.attendance - 10, grades: selectedStudent.grades - 0.5, participation: selectedStudent.participation - 15 },
                  { month: 'Feb', attendance: selectedStudent.attendance - 5, grades: selectedStudent.grades - 0.2, participation: selectedStudent.participation - 8 },
                  { month: 'Mar', attendance: selectedStudent.attendance + 2, grades: selectedStudent.grades + 0.1, participation: selectedStudent.participation + 3 },
                  { month: 'Apr', attendance: selectedStudent.attendance, grades: selectedStudent.grades, participation: selectedStudent.participation },
                ]}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Area type="monotone" dataKey="attendance" stackId="1" stroke={COLORS.blue} fill={COLORS.blue} fillOpacity={0.3} />
                  <Area type="monotone" dataKey="participation" stackId="2" stroke={COLORS.green} fill={COLORS.green} fillOpacity={0.3} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </AnimatedElement>
        )}
      </div>
    </div>
  );
};

export default DashboardContent;
