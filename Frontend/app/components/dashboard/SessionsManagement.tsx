'use client';

import { useState } from 'react';
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

interface SessionsManagementProps {
  mockStudents: Student[];
}

// Color scheme
const COLORS = {
  primary: '#6366f1',
  blue: '#3b82f6',
  green: '#10b981',
  warning: '#f59e0b',
  danger: '#dc2626'
};

interface Session {
  id: number;
  studentName: string;
  date: string;
  duration: string;
  type: 'Academic' | 'Career' | 'Personal' | 'Disciplinary';
  status: 'Scheduled' | 'Completed' | 'Cancelled';
  notes: string;
}

const SessionsManagement: React.FC<SessionsManagementProps> = ({ mockStudents }) => {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'completed' | 'reports'>('upcoming');

  // Mock sessions data
  const mockSessions: Session[] = [
    { id: 1, studentName: 'Rahul Sharma', date: '2025-09-15', duration: '45 min', type: 'Career', status: 'Scheduled', notes: 'Career path discussion for engineering streams' },
    { id: 2, studentName: 'Priya Patel', date: '2025-09-16', duration: '30 min', type: 'Academic', status: 'Scheduled', notes: 'Math performance improvement strategies' },
    { id: 3, studentName: 'Amit Kumar', date: '2025-09-10', duration: '60 min', type: 'Personal', status: 'Completed', notes: 'Stress management and study-life balance' },
    { id: 4, studentName: 'Sneha Singh', date: '2025-09-12', duration: '40 min', type: 'Disciplinary', status: 'Completed', notes: 'Attendance improvement plan discussion' },
    { id: 5, studentName: 'Vikram Das', date: '2025-09-17', duration: '35 min', type: 'Career', status: 'Scheduled', notes: 'College admission guidance' },
  ];

  const upcomingSessions = mockSessions.filter(s => s.status === 'Scheduled');
  const completedSessions = mockSessions.filter(s => s.status === 'Completed');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Scheduled': return COLORS.primary;
      case 'Completed': return COLORS.green;
      case 'Cancelled': return COLORS.danger;
      default: return COLORS.warning;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Academic': return COLORS.blue;
      case 'Career': return COLORS.green;
      case 'Personal': return COLORS.warning;
      case 'Disciplinary': return COLORS.danger;
      default: return COLORS.primary;
    }
  };

  return (
    <div style={{ flex: 1, padding: '24px', background: '#f8fafc', overflowY: 'auto' }}>
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#1a202c', marginBottom: '8px' }}>
          Counseling Sessions & Reports
        </h2>
        <p style={{ color: '#64748b' }}>
          Manage counseling sessions and generate comprehensive reports
        </p>
      </div>

      {/* Tab Navigation */}
      <div style={{ 
        background: '#fff', 
        borderRadius: '12px', 
        padding: '8px',
        marginBottom: '24px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        border: '1px solid #e2e8f0',
        display: 'flex',
        gap: '8px'
      }}>
        {[
          { key: 'upcoming', label: 'Upcoming Sessions', count: upcomingSessions.length },
          { key: 'completed', label: 'Completed Sessions', count: completedSessions.length },
          { key: 'reports', label: 'Reports & Analytics', count: null }
        ].map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as any)}
            style={{
              flex: 1,
              padding: '12px 20px',
              borderRadius: '8px',
              border: 'none',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              background: activeTab === tab.key ? COLORS.primary : 'transparent',
              color: activeTab === tab.key ? 'white' : '#64748b',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px'
            }}
          >
            {tab.label}
            {tab.count !== null && (
              <span style={{
                background: activeTab === tab.key ? 'rgba(255,255,255,0.2)' : '#e2e8f0',
                color: activeTab === tab.key ? 'white' : '#64748b',
                padding: '2px 8px',
                borderRadius: '12px',
                fontSize: '12px',
                fontWeight: '700'
              }}>
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Content based on active tab */}
      {activeTab === 'upcoming' && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1a202c' }}>Upcoming Sessions</h3>
            <button style={{
              background: 'linear-gradient(135deg, #10b981, #059669)',
              color: 'white',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <span>➕</span>
              Schedule New Session
            </button>
          </div>
          
          <div style={{ display: 'grid', gap: '16px' }}>
            {upcomingSessions.map((session, index) => (
              <AnimatedElement key={session.id} animation="slideInUp" delay={index * 100}>
                <div style={{
                  background: '#fff',
                  borderRadius: '12px',
                  padding: '24px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  border: '1px solid #e2e8f0',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                    <div>
                      <h4 style={{ fontSize: '16px', fontWeight: '600', color: '#1a202c', margin: '0 0 4px 0' }}>
                        {session.studentName}
                      </h4>
                      <p style={{ fontSize: '14px', color: '#64748b', margin: '0' }}>
                        {new Date(session.date).toLocaleDateString()} • {session.duration}
                      </p>
                    </div>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <span style={{
                        padding: '4px 12px',
                        borderRadius: '20px',
                        fontSize: '12px',
                        fontWeight: '600',
                        background: `${getTypeColor(session.type)}15`,
                        color: getTypeColor(session.type)
                      }}>
                        {session.type}
                      </span>
                      <span style={{
                        padding: '4px 12px',
                        borderRadius: '20px',
                        fontSize: '12px',
                        fontWeight: '600',
                        background: `${getStatusColor(session.status)}15`,
                        color: getStatusColor(session.status)
                      }}>
                        {session.status}
                      </span>
                    </div>
                  </div>
                  <p style={{ fontSize: '14px', color: '#374151', marginBottom: '16px', fontStyle: 'italic' }}>
                    "{session.notes}"
                  </p>
                  <div style={{ display: 'flex', gap: '12px' }}>
                    <button style={{
                      background: COLORS.primary,
                      color: 'white',
                      border: 'none',
                      padding: '8px 16px',
                      borderRadius: '6px',
                      fontSize: '12px',
                      fontWeight: '600',
                      cursor: 'pointer'
                    }}>
                      Join Session
                    </button>
                    <button style={{
                      background: 'transparent',
                      color: '#64748b',
                      border: '1px solid #e2e8f0',
                      padding: '8px 16px',
                      borderRadius: '6px',
                      fontSize: '12px',
                      fontWeight: '600',
                      cursor: 'pointer'
                    }}>
                      Reschedule
                    </button>
                  </div>
                </div>
              </AnimatedElement>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'completed' && (
        <div>
          <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1a202c', marginBottom: '20px' }}>Completed Sessions</h3>
          <div style={{ display: 'grid', gap: '16px' }}>
            {completedSessions.map((session, index) => (
              <AnimatedElement key={session.id} animation="slideInUp" delay={index * 100}>
                <div style={{
                  background: '#fff',
                  borderRadius: '12px',
                  padding: '24px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  border: '1px solid #e2e8f0',
                  opacity: 0.9
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                    <div>
                      <h4 style={{ fontSize: '16px', fontWeight: '600', color: '#1a202c', margin: '0 0 4px 0' }}>
                        {session.studentName}
                      </h4>
                      <p style={{ fontSize: '14px', color: '#64748b', margin: '0' }}>
                        Completed on {new Date(session.date).toLocaleDateString()} • {session.duration}
                      </p>
                    </div>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <span style={{
                        padding: '4px 12px',
                        borderRadius: '20px',
                        fontSize: '12px',
                        fontWeight: '600',
                        background: `${getTypeColor(session.type)}15`,
                        color: getTypeColor(session.type)
                      }}>
                        {session.type}
                      </span>
                      <span style={{
                        padding: '4px 12px',
                        borderRadius: '20px',
                        fontSize: '12px',
                        fontWeight: '600',
                        background: `${COLORS.green}15`,
                        color: COLORS.green
                      }}>
                        ✓ Completed
                      </span>
                    </div>
                  </div>
                  <p style={{ fontSize: '14px', color: '#374151', marginBottom: '16px', fontStyle: 'italic' }}>
                    "{session.notes}"
                  </p>
                  <button style={{
                    background: 'transparent',
                    color: COLORS.primary,
                    border: `1px solid ${COLORS.primary}`,
                    padding: '8px 16px',
                    borderRadius: '6px',
                    fontSize: '12px',
                    fontWeight: '600',
                    cursor: 'pointer'
                  }}>
                    View Full Report
                  </button>
                </div>
              </AnimatedElement>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'reports' && (
        <div>
          <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1a202c', marginBottom: '20px' }}>Reports & Analytics</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
            <AnimatedElement animation="scaleIn" delay={100}>
              <div style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                borderRadius: '20px',
                padding: '32px',
                color: 'white',
                textAlign: 'center',
                cursor: 'pointer',
                transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                boxShadow: '0 8px 32px rgba(102, 126, 234, 0.3)',
                position: 'relative',
                overflow: 'hidden'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px) scale(1.05)';
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(102, 126, 234, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = '0 8px 32px rgba(102, 126, 234, 0.3)';
              }}
              >
                <div style={{ 
                  fontSize: '56px', 
                  marginBottom: '20px',
                  transition: 'all 0.3s ease',
                  filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.2))'
                }}>📊</div>
                <h4 style={{ 
                  fontSize: '20px', 
                  fontWeight: '700', 
                  marginBottom: '12px',
                  textShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }}>Monthly Report</h4>
                <p style={{ 
                  fontSize: '15px', 
                  opacity: 0.9, 
                  marginBottom: '24px',
                  lineHeight: '1.5'
                }}>
                  Comprehensive analysis of all counseling activities and student progress metrics
                </p>
                <button style={{
                  background: 'rgba(255,255,255,0.25)',
                  color: 'white',
                  border: '2px solid rgba(255,255,255,0.3)',
                  padding: '14px 28px',
                  borderRadius: '12px',
                  fontSize: '14px',
                  fontWeight: '700',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  backdropFilter: 'blur(10px)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.35)';
                  e.currentTarget.style.transform = 'scale(1.05)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.25)';
                  e.currentTarget.style.transform = 'scale(1)';
                }}
                >
                  Generate Report
                </button>
                <div style={{
                  position: 'absolute',
                  top: '-50%',
                  right: '-50%',
                  width: '100%',
                  height: '100%',
                  background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
                  borderRadius: '50%',
                  opacity: 0.5
                }} />
              </div>
            </AnimatedElement>

            <AnimatedElement animation="scaleIn" delay={200}>
              <div style={{
                background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                borderRadius: '20px',
                padding: '32px',
                color: 'white',
                textAlign: 'center',
                cursor: 'pointer',
                transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                boxShadow: '0 8px 32px rgba(245, 87, 108, 0.3)',
                position: 'relative',
                overflow: 'hidden'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px) scale(1.05)';
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(245, 87, 108, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = '0 8px 32px rgba(245, 87, 108, 0.3)';
              }}
              >
                <div style={{ 
                  fontSize: '56px', 
                  marginBottom: '20px',
                  transition: 'all 0.3s ease',
                  filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.2))'
                }}>📈</div>
                <h4 style={{ 
                  fontSize: '20px', 
                  fontWeight: '700', 
                  marginBottom: '12px',
                  textShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }}>Progress Tracking</h4>
                <p style={{ 
                  fontSize: '15px', 
                  opacity: 0.9, 
                  marginBottom: '24px',
                  lineHeight: '1.5'
                }}>
                  Track individual student progress with detailed analytics and visual insights
                </p>
                <button style={{
                  background: 'rgba(255,255,255,0.25)',
                  color: 'white',
                  border: '2px solid rgba(255,255,255,0.3)',
                  padding: '14px 28px',
                  borderRadius: '12px',
                  fontSize: '14px',
                  fontWeight: '700',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  backdropFilter: 'blur(10px)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.35)';
                  e.currentTarget.style.transform = 'scale(1.05)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.25)';
                  e.currentTarget.style.transform = 'scale(1)';
                }}
                >
                  View Analytics
                </button>
                <div style={{
                  position: 'absolute',
                  top: '-50%',
                  left: '-50%',
                  width: '100%',
                  height: '100%',
                  background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
                  borderRadius: '50%',
                  opacity: 0.5
                }} />
              </div>
            </AnimatedElement>

            <AnimatedElement animation="scaleIn" delay={300}>
              <div style={{
                background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                borderRadius: '20px',
                padding: '32px',
                color: 'white',
                textAlign: 'center',
                cursor: 'pointer',
                transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                boxShadow: '0 8px 32px rgba(79, 172, 254, 0.3)',
                position: 'relative',
                overflow: 'hidden'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px) scale(1.05)';
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(79, 172, 254, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = '0 8px 32px rgba(79, 172, 254, 0.3)';
              }}
              >
                <div style={{ 
                  fontSize: '56px', 
                  marginBottom: '20px',
                  transition: 'all 0.3s ease',
                  filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.2))'
                }}>📋</div>
                <h4 style={{ 
                  fontSize: '20px', 
                  fontWeight: '700', 
                  marginBottom: '12px',
                  textShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }}>Custom Reports</h4>
                <p style={{ 
                  fontSize: '15px', 
                  opacity: 0.9, 
                  marginBottom: '24px',
                  lineHeight: '1.5'
                }}>
                  Create tailored reports with advanced filtering and custom metrics
                </p>
                <button style={{
                  background: 'rgba(255,255,255,0.25)',
                  color: 'white',
                  border: '2px solid rgba(255,255,255,0.3)',
                  padding: '14px 28px',
                  borderRadius: '12px',
                  fontSize: '14px',
                  fontWeight: '700',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  backdropFilter: 'blur(10px)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.35)';
                  e.currentTarget.style.transform = 'scale(1.05)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.25)';
                  e.currentTarget.style.transform = 'scale(1)';
                }}
                >
                  Create Report
                </button>
                <div style={{
                  position: 'absolute',
                  bottom: '-50%',
                  right: '-50%',
                  width: '100%',
                  height: '100%',
                  background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
                  borderRadius: '50%',
                  opacity: 0.5
                }} />
              </div>
            </AnimatedElement>
          </div>
        </div>
      )}
    </div>
  );
};

export default SessionsManagement;
