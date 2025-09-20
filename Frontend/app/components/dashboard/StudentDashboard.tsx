'use client';

import { useState, useEffect } from 'react';
import Sidebar from '../common/Sidebar';
import AnimatedElement from '../common/AnimatedElement';
import StudentForm from '../pages/StudentForm';

// Add CSS animations
const styleSheet = `
  @keyframes pulse {
    0% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.7; transform: scale(1.1); }
    100% { opacity: 1; transform: scale(1); }
  }
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  @keyframes fadeInUp {
    0% { opacity: 0; transform: translateY(20px); }
    100% { opacity: 1; transform: translateY(0); }
  }
  .pulse-animation {
    animation: pulse 2s infinite;
  }
  .notification-item:hover .click-hint {
    opacity: 1 !important;
  }
  .fade-in-up {
    animation: fadeInUp 0.6s ease-out;
  }
`;

// Inject styles
if (typeof document !== 'undefined') {
  const styleElement = document.createElement('style');
  styleElement.textContent = styleSheet;
  document.head.appendChild(styleElement);
}

// Types
interface FormData {
  [key: string]: string;
}

interface MetricCard {
  title: string;
  value: number | string;
  unit: string;
  color: string;
  icon?: string;
}

interface AcademicRecord {
  semester: string;
  cgpa: number;
  credits: number;
  backlogs: number;
  rank: number;
}

interface CounselingSession {
  id: number;
  date: string;
  counselor: string;
  topic: string;
  status: 'completed' | 'scheduled' | 'cancelled';
  notes?: string;
}

interface Achievement {
  id: number;
  title: string;
  type: 'academic' | 'counseling' | 'workshop' | 'certification';
  date: string;
  description: string;
}

// Mock Student Data (Counselling-focused)
const mockStudentData = {
  id: 1,
  name: 'Rajesh Kumar',
  roll: '21CSE045',
  year: '2nd Year',
  semester: '4th',
  section: 'B',
  dept: 'Computer Science & Engineering',
  gender: 'Male',
  socio: 'Middle',
  risk: 'medium' as 'low' | 'medium' | 'high',
  cgpa: 6.8,
  attendance: 76,
  counselingSessions: 3,
  disciplinaryActions: 1,
  participation: 78,
  totalCredits: 120,
  completedCredits: 72,
  currentBacklogs: 2,
  financialStatus: 'stable',
  emotionalState: 'stressed',
  lastAssessmentDate: '2025-08-15'
};

const academicHistory: AcademicRecord[] = [
  { semester: '1st Sem', cgpa: 7.2, credits: 20, backlogs: 0, rank: 45 },
  { semester: '2nd Sem', cgpa: 6.9, credits: 18, backlogs: 1, rank: 58 },
  { semester: '3rd Sem', cgpa: 6.5, credits: 16, backlogs: 1, rank: 67 },
  { semester: 'Current (4th)', cgpa: 6.8, credits: 18, backlogs: 2, rank: 52 }
];

const counselingSessions: CounselingSession[] = [
  {
    id: 1,
    date: '2025-09-15',
    counselor: 'Dr. Sarah Johnson',
    topic: 'Academic Performance Concerns',
    status: 'completed',
    notes: 'Discussed study strategies and time management. Follow-up scheduled.'
  },
  {
    id: 2,
    date: '2025-08-28',
    counselor: 'Dr. Sarah Johnson', 
    topic: 'Career Path Confusion',
    status: 'completed',
    notes: 'Explored different career options in CS. Recommended industry visits.'
  },
  {
    id: 3,
    date: '2025-09-30',
    counselor: 'Dr. Sarah Johnson',
    topic: 'Stress Management & Mental Health',
    status: 'scheduled'
  }
];

const studentAchievements: Achievement[] = [
  {
    id: 1,
    title: 'Stress Management Workshop',
    type: 'workshop',
    date: '2025-09-10',
    description: 'Completed 3-day workshop on managing academic stress'
  },
  {
    id: 2,
    title: 'Programming Contest - 3rd Place',
    type: 'academic',
    date: '2025-08-20',
    description: 'Secured 3rd position in inter-college programming contest'
  },
  {
    id: 3,
    title: 'Mental Health First Aid Certification',
    type: 'certification',
    date: '2025-07-15',
    description: 'Completed mental health awareness and first aid certification'
  }
];

const recentNotifications = [
  {
    id: 1,
    title: 'Counseling Session Reminder',
    message: 'Your session with Dr. Johnson is scheduled for Sept 30, 2025',
    type: 'session',
    time: '2 hours ago',
    urgent: true
  },
  {
    id: 2,
    title: 'Progress Alert',
    message: 'Your attendance has dropped below 80%. Please improve.',
    type: 'warning',
    time: '1 day ago',
    urgent: true
  },
  {
    id: 3,
    title: 'Career Guidance Available',
    message: 'New career recommendations based on your assessment',
    type: 'info',
    time: '3 days ago',
    urgent: false
  }
];

// Chart color palette (matching counselor dashboard)
const COLORS = {
  primary: '#3b82f6',
  secondary: '#10b981', 
  warning: '#f59e0b',
  danger: '#ef4444',
  accent: '#8b5cf6',
  teal: '#14b8a6',
  yellow: '#eab308',
  blue: '#0ea5e9',
  purple: '#a855f7',
  green: '#22c55e',
  red: '#f87171',
  orange: '#fb923c'
};

function StudentDashboard() {
  const [formFilled, setFormFilled] = useState(mockStudentData.lastAssessmentDate ? true : false);
  const [formData, setFormData] = useState<FormData | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [isLoading, setIsLoading] = useState(false);
  const [activeCard, setActiveCard] = useState<string | null>(null);

  // Refined menu items (counselling-focused only)
  const studentMenuItems = [
    { icon: '🏠', label: 'Dashboard', href: 'dashboard' },
    { icon: '📝', label: 'Assessment Form', href: 'assessment' },
    { icon: '📚', label: 'Academic Records', href: 'records' },
    { icon: '📈', label: 'Progress Report', href: 'progress' },
    { icon: '🏆', label: 'Achievements', href: 'achievements' },
    { icon: '💬', label: 'Counseling Sessions', href: 'sessions' },
    { icon: '🎯', label: 'Career Guidance', href: 'career' },
    { icon: '🔔', label: 'Notifications', href: 'notifications' },
    { icon: '⚙️', label: 'Settings', href: 'settings' },
  ];  // Get current metrics based on student data
  const getCurrentMetrics = (): MetricCard[] => [
    { title: 'CGPA', value: mockStudentData.cgpa, unit: '/10', color: COLORS.primary, icon: '📊' },
    { title: 'Attendance', value: mockStudentData.attendance, unit: '%', color: mockStudentData.attendance > 75 ? COLORS.secondary : COLORS.danger, icon: '📅' },
    { title: 'Credits', value: `${mockStudentData.completedCredits}/${mockStudentData.totalCredits}`, unit: '', color: COLORS.accent, icon: '🎓' },
    { title: 'Risk Level', value: mockStudentData.risk.charAt(0).toUpperCase() + mockStudentData.risk.slice(1), unit: '', color: mockStudentData.risk === 'low' ? COLORS.secondary : mockStudentData.risk === 'medium' ? COLORS.warning : COLORS.danger, icon: '⚠️' },
    { title: 'Counseling Sessions', value: mockStudentData.counselingSessions, unit: 'sessions', color: COLORS.teal, icon: '💬' },
    { title: 'Current Backlogs', value: mockStudentData.currentBacklogs, unit: 'subjects', color: mockStudentData.currentBacklogs > 0 ? COLORS.danger : COLORS.secondary, icon: '📚' }
  ];

  const handleFormSubmit = (data: FormData) => {
    setFormFilled(true);
    setFormData(data);
    setShowForm(false);
    console.log('Assessment submitted:', data);
  };

  // Render content based on current page (matching counselor dashboard structure)
  const renderContent = () => {
    const contentKey = currentPage; // For transition animations
    switch (currentPage) {
      case 'assessment':
        return (
          <div style={{ padding: '20px 0' }}>
            <AnimatedElement animation="fadeIn">
              <div style={{
                background: '#fff',
                borderRadius: '16px',
                padding: '40px',
                boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
                border: '1px solid #e2e8f0',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '64px', marginBottom: '20px' }}>📝</div>
                <h2 style={{ fontSize: '28px', fontWeight: 700, marginBottom: '16px', color: '#1f2937' }}>
                  Student Assessment Form
                </h2>
                <p style={{ color: '#6b7280', marginBottom: '30px', fontSize: '16px' }}>
                  {formFilled 
                    ? `Last assessment completed on ${mockStudentData.lastAssessmentDate}. Update your current status below.`
                    : 'Complete your comprehensive assessment to help us provide personalized counseling support.'
                  }
                </p>
                <button
                  onClick={() => {
                    setIsLoading(true);
                    setTimeout(() => {
                      setIsLoading(false);
                      setShowForm(true);
                    }, 1000);
                  }}
                  disabled={isLoading}
                  style={{
                    padding: '16px 32px',
                    background: isLoading ? '#9ca3af' : 'linear-gradient(135deg, #3b82f6, #1e40af)',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '12px',
                    fontSize: '16px',
                    fontWeight: 600,
                    cursor: isLoading ? 'not-allowed' : 'pointer',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    boxShadow: '0 4px 15px rgba(59, 130, 246, 0.3)',
                    transform: 'translateY(0px) scale(1)',
                    position: 'relative',
                    overflow: 'hidden',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px'
                  }}
                  onMouseEnter={(e) => {
                    if (!isLoading) {
                      e.currentTarget.style.transform = 'translateY(-3px) scale(1.05)';
                      e.currentTarget.style.boxShadow = '0 8px 25px rgba(59, 130, 246, 0.4)';
                      e.currentTarget.style.background = 'linear-gradient(135deg, #2563eb, #1d4ed8)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isLoading) {
                      e.currentTarget.style.transform = 'translateY(0px) scale(1)';
                      e.currentTarget.style.boxShadow = '0 4px 15px rgba(59, 130, 246, 0.3)';
                      e.currentTarget.style.background = 'linear-gradient(135deg, #3b82f6, #1e40af)';
                    }
                  }}
                >
                  {isLoading && (
                    <div style={{
                      width: '16px',
                      height: '16px',
                      border: '2px solid rgba(255,255,255,0.3)',
                      borderTop: '2px solid #fff',
                      borderRadius: '50%',
                      animation: 'spin 1s linear infinite'
                    }} />
                  )}
                  {isLoading ? 'Loading...' : (formFilled ? 'Update Assessment' : 'Start Assessment')}
                </button>
              </div>
            </AnimatedElement>
          </div>
        );

      case 'records':
        return (
          <div style={{ padding: '20px 0' }}>
            <AnimatedElement animation="fadeIn">
              <div style={{
                background: '#fff',
                borderRadius: '16px',
                padding: '30px',
                boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
                border: '1px solid #e2e8f0'
              }}>
                <h2 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '24px', color: '#1f2937' }}>
                  Academic Performance History
                </h2>
                <div style={{ display: 'grid', gap: '16px' }}>
                  {academicHistory.map((record, index) => (
                    <div key={index} style={{
                      padding: '20px',
                      background: '#f8fafc',
                      borderRadius: '12px',
                      border: '1px solid #e2e8f0',
                      display: 'grid',
                      gridTemplateColumns: 'repeat(5, 1fr)',
                      gap: '20px',
                      alignItems: 'center'
                    }}>
                      <div>
                        <div style={{ fontSize: '14px', color: '#6b7280', marginBottom: '4px' }}>Semester</div>
                        <div style={{ fontWeight: 600, color: '#1f2937' }}>{record.semester}</div>
                      </div>
                      <div>
                        <div style={{ fontSize: '14px', color: '#6b7280', marginBottom: '4px' }}>CGPA</div>
                        <div style={{ fontWeight: 600, color: record.cgpa >= 7 ? COLORS.secondary : record.cgpa >= 6 ? COLORS.warning : COLORS.danger }}>
                          {record.cgpa}
                        </div>
                      </div>
                      <div>
                        <div style={{ fontSize: '14px', color: '#6b7280', marginBottom: '4px' }}>Credits</div>
                        <div style={{ fontWeight: 600, color: '#1f2937' }}>{record.credits}</div>
                      </div>
                      <div>
                        <div style={{ fontSize: '14px', color: '#6b7280', marginBottom: '4px' }}>Backlogs</div>
                        <div style={{ fontWeight: 600, color: record.backlogs > 0 ? COLORS.danger : COLORS.secondary }}>
                          {record.backlogs}
                        </div>
                      </div>
                      <div>
                        <div style={{ fontSize: '14px', color: '#6b7280', marginBottom: '4px' }}>Rank</div>
                        <div style={{ fontWeight: 600, color: '#1f2937' }}>{record.rank}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedElement>
          </div>
        );

      case 'progress':
        return (
          <div style={{ padding: '20px 0' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginBottom: '30px' }}>
              {getCurrentMetrics().map((metric, index) => (
                <AnimatedElement key={index} animation="slideInUp" delay={index * 100}>
                  <div style={{
                    background: '#fff',
                    borderRadius: '16px',
                    padding: '24px',
                    boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
                    border: '1px solid #e2e8f0',
                    textAlign: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    transform: 'translateY(0px)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)';
                    e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.15)';
                    e.currentTarget.style.borderColor = metric.color;
                    const icon = e.currentTarget.querySelector('.metric-icon') as HTMLElement;
                    if (icon) {
                      icon.style.transform = 'scale(1.2) rotate(5deg)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0px) scale(1)';
                    e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.08)';
                    e.currentTarget.style.borderColor = '#e2e8f0';
                    const icon = e.currentTarget.querySelector('.metric-icon') as HTMLElement;
                    if (icon) {
                      icon.style.transform = 'scale(1) rotate(0deg)';
                    }
                  }}
                  >
                    <div className="metric-icon" style={{ 
                      fontSize: '32px', 
                      marginBottom: '12px',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                    }}>
                      {metric.icon}
                    </div>
                    <div style={{ fontSize: '24px', fontWeight: 700, color: metric.color, marginBottom: '8px' }}>
                      {metric.value}{metric.unit}
                    </div>
                    <div style={{ fontSize: '14px', color: '#6b7280', fontWeight: 500 }}>
                      {metric.title}
                    </div>
                  </div>
                </AnimatedElement>
              ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
              <AnimatedElement animation="fadeIn" delay={200}>
                <div style={{
                  background: '#fff',
                  borderRadius: '16px',
                  padding: '30px',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
                  border: '1px solid #e2e8f0'
                }}>
                  <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '20px', color: '#1f2937' }}>
                    Risk Assessment Summary
                  </h3>
                  <div style={{
                    padding: '20px',
                    background: mockStudentData.risk === 'high' ? '#fef2f2' : mockStudentData.risk === 'medium' ? '#fffbeb' : '#f0fdf4',
                    borderRadius: '12px',
                    border: `1px solid ${mockStudentData.risk === 'high' ? '#fecaca' : mockStudentData.risk === 'medium' ? '#fed7aa' : '#bbf7d0'}`
                  }}>
                    <div style={{
                      fontSize: '18px',
                      fontWeight: 600,
                      color: mockStudentData.risk === 'high' ? COLORS.danger : mockStudentData.risk === 'medium' ? COLORS.warning : COLORS.secondary,
                      marginBottom: '10px'
                    }}>
                      Current Risk Level: {mockStudentData.risk.toUpperCase()}
                    </div>
                    <p style={{ color: '#6b7280', margin: 0 }}>
                      {mockStudentData.risk === 'high' 
                        ? 'Immediate attention required. Please schedule counseling session.'
                        : mockStudentData.risk === 'medium'
                        ? 'Some concerns identified. Regular monitoring recommended.'
                        : 'Student is performing well with minimal concerns.'
                      }
                    </p>
                  </div>
                </div>
              </AnimatedElement>

              <AnimatedElement animation="fadeIn" delay={300}>
                <div style={{
                  background: '#fff',
                  borderRadius: '16px',
                  padding: '30px',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
                  border: '1px solid #e2e8f0',
                  textAlign: 'center'
                }}>
                  <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '20px', color: '#1f2937' }}>
                    Academic Progress
                  </h3>
                  <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
                    {/* CGPA Circle */}
                    <div style={{ textAlign: 'center' }}>
                      <div style={{
                        width: '80px',
                        height: '80px',
                        borderRadius: '50%',
                        background: `conic-gradient(${COLORS.primary} ${(mockStudentData.cgpa/10) * 360}deg, #e2e8f0 0deg)`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'relative',
                        margin: '0 auto 10px auto'
                      }}>
                        <div style={{
                          width: '60px',
                          height: '60px',
                          borderRadius: '50%',
                          background: '#fff',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '14px',
                          fontWeight: 700,
                          color: COLORS.primary
                        }}>
                          {mockStudentData.cgpa}
                        </div>
                      </div>
                      <div style={{ fontSize: '12px', color: '#6b7280' }}>CGPA</div>
                    </div>

                    {/* Attendance Circle */}
                    <div style={{ textAlign: 'center' }}>
                      <div style={{
                        width: '80px',
                        height: '80px',
                        borderRadius: '50%',
                        background: `conic-gradient(${mockStudentData.attendance > 75 ? COLORS.secondary : COLORS.danger} ${(mockStudentData.attendance/100) * 360}deg, #e2e8f0 0deg)`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'relative',
                        margin: '0 auto 10px auto'
                      }}>
                        <div style={{
                          width: '60px',
                          height: '60px',
                          borderRadius: '50%',
                          background: '#fff',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '14px',
                          fontWeight: 700,
                          color: mockStudentData.attendance > 75 ? COLORS.secondary : COLORS.danger
                        }}>
                          {mockStudentData.attendance}%
                        </div>
                      </div>
                      <div style={{ fontSize: '12px', color: '#6b7280' }}>Attendance</div>
                    </div>
                  </div>
                </div>
              </AnimatedElement>
            </div>
          </div>
        );

      case 'achievements':
        return (
          <div style={{ padding: '20px 0' }}>
            <AnimatedElement animation="fadeIn">
              <div style={{
                background: '#fff',
                borderRadius: '16px',
                padding: '30px',
                boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
                border: '1px solid #e2e8f0'
              }}>
                <h2 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '24px', color: '#1f2937' }}>
                  Academic & Counseling Achievements
                </h2>
                <div style={{ display: 'grid', gap: '16px' }}>
                  {studentAchievements.map((achievement) => (
                    <div key={achievement.id} style={{
                      padding: '20px',
                      background: '#f8fafc',
                      borderRadius: '12px',
                      border: '1px solid #e2e8f0',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '16px'
                    }}>
                      <div style={{
                        width: '48px',
                        height: '48px',
                        borderRadius: '50%',
                        background: achievement.type === 'academic' ? COLORS.blue : 
                                   achievement.type === 'workshop' ? COLORS.purple :
                                   achievement.type === 'certification' ? COLORS.green : COLORS.teal,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#fff',
                        fontSize: '20px'
                      }}>
                        {achievement.type === 'academic' ? '🏆' : 
                         achievement.type === 'workshop' ? '🎓' :
                         achievement.type === 'certification' ? '📜' : '💬'}
                      </div>
                      <div style={{ flex: 1 }}>
                        <h4 style={{ margin: '0 0 8px 0', color: '#1f2937', fontSize: '16px', fontWeight: 600 }}>
                          {achievement.title}
                        </h4>
                        <p style={{ margin: '0 0 4px 0', color: '#6b7280', fontSize: '14px' }}>
                          {achievement.description}
                        </p>
                        <div style={{ fontSize: '12px', color: '#9ca3af' }}>{achievement.date}</div>
                      </div>
                      <div style={{
                        padding: '4px 12px',
                        borderRadius: '20px',
                        fontSize: '12px',
                        fontWeight: 600,
                        background: achievement.type === 'academic' ? 'rgba(59, 130, 246, 0.1)' : 
                                   achievement.type === 'workshop' ? 'rgba(139, 92, 246, 0.1)' :
                                   achievement.type === 'certification' ? 'rgba(34, 197, 94, 0.1)' : 'rgba(20, 184, 166, 0.1)',
                        color: achievement.type === 'academic' ? COLORS.blue : 
                               achievement.type === 'workshop' ? COLORS.purple :
                               achievement.type === 'certification' ? COLORS.green : COLORS.teal
                      }}>
                        {achievement.type.charAt(0).toUpperCase() + achievement.type.slice(1)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedElement>
          </div>
        );

      case 'sessions':
        return (
          <div style={{ padding: '20px 0' }}>
            <AnimatedElement animation="fadeIn">
              <div style={{
                background: '#fff',
                borderRadius: '16px',
                padding: '30px',
                boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
                border: '1px solid #e2e8f0'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                  <h2 style={{ fontSize: '24px', fontWeight: 700, margin: 0, color: '#1f2937' }}>
                    Counseling Sessions
                  </h2>
                  <button style={{
                    padding: '12px 24px',
                    background: 'linear-gradient(135deg, #3b82f6, #1e40af)',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '10px',
                    fontSize: '14px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    transform: 'translateY(0px) scale(1)',
                    boxShadow: '0 2px 10px rgba(59, 130, 246, 0.3)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px) scale(1.05)';
                    e.currentTarget.style.boxShadow = '0 6px 20px rgba(59, 130, 246, 0.4)';
                    e.currentTarget.style.background = 'linear-gradient(135deg, #2563eb, #1d4ed8)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0px) scale(1)';
                    e.currentTarget.style.boxShadow = '0 2px 10px rgba(59, 130, 246, 0.3)';
                    e.currentTarget.style.background = 'linear-gradient(135deg, #3b82f6, #1e40af)';
                  }}
                  >
                    Schedule New Session
                  </button>
                </div>
                <div style={{ display: 'grid', gap: '16px' }}>
                  {counselingSessions.map((session) => (
                    <div key={session.id} style={{
                      padding: '20px',
                      background: '#f8fafc',
                      borderRadius: '12px',
                      border: '1px solid #e2e8f0'
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                        <div>
                          <h4 style={{ margin: '0 0 8px 0', color: '#1f2937', fontSize: '16px', fontWeight: 600 }}>
                            {session.topic}
                          </h4>
                          <p style={{ margin: '0', color: '#6b7280', fontSize: '14px' }}>
                            with {session.counselor}  {session.date}
                          </p>
                        </div>
                        <span style={{
                          padding: '6px 12px',
                          borderRadius: '20px',
                          fontSize: '12px',
                          fontWeight: 600,
                          background: session.status === 'completed' ? 'rgba(34, 197, 94, 0.1)' : 
                                     session.status === 'scheduled' ? 'rgba(59, 130, 246, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                          color: session.status === 'completed' ? COLORS.green : 
                                 session.status === 'scheduled' ? COLORS.blue : COLORS.red
                        }}>
                          {session.status.charAt(0).toUpperCase() + session.status.slice(1)}
                        </span>
                      </div>
                      {session.notes && (
                        <div style={{
                          padding: '12px',
                          background: '#fff',
                          borderRadius: '8px',
                          border: '1px solid #e2e8f0',
                          fontSize: '14px',
                          color: '#374151'
                        }}>
                          <strong>Notes:</strong> {session.notes}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedElement>
          </div>
        );

      case 'career':
        return (
          <div style={{ padding: '20px 0' }}>
            <AnimatedElement animation="fadeIn">
              <div style={{
                background: '#fff',
                borderRadius: '16px',
                padding: '30px',
                boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
                border: '1px solid #e2e8f0'
              }}>
                <h2 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '16px', color: '#1f2937' }}>
                  Career Guidance & Recommendations
                </h2>
                <p style={{ color: '#6b7280', marginBottom: '24px' }}>
                  Based on your assessment and counselor recommendations
                </p>
                
                <div style={{ display: 'grid', gap: '20px' }}>
                  <div style={{
                    padding: '20px',
                    background: '#f0fdf4',
                    borderRadius: '12px',
                    border: '1px solid #bbf7d0'
                  }}>
                    <h3 style={{ margin: '0 0 12px 0', color: COLORS.green, fontSize: '18px', fontWeight: 600 }}>
                      Recommended Path: Software Development
                    </h3>
                    <p style={{ margin: '0 0 12px 0', color: '#374151' }}>
                      Focus on improving programming skills and project development. Consider internships in software companies.
                    </p>
                    <div style={{ fontSize: '14px', color: '#6b7280' }}>
                      Match Score: 85%  Updated: Sept 15, 2025
                    </div>
                  </div>
                  
                  <div style={{
                    padding: '20px',
                    background: '#fffbeb',
                    borderRadius: '12px',
                    border: '1px solid #fed7aa'
                  }}>
                    <h3 style={{ margin: '0 0 12px 0', color: COLORS.warning, fontSize: '18px', fontWeight: 600 }}>
                      Areas for Improvement
                    </h3>
                    <ul style={{ margin: '0', paddingLeft: '20px', color: '#374151' }}>
                      <li>Improve attendance (current: 76%)</li>
                      <li>Clear pending backlogs</li>
                      <li>Enhance problem-solving skills</li>
                      <li>Participate in coding competitions</li>
                    </ul>
                  </div>
                </div>
              </div>
            </AnimatedElement>
          </div>
        );

      case 'notifications':
        return (
          <div style={{ padding: '20px 0' }}>
            <AnimatedElement animation="fadeIn">
              <div style={{
                background: '#fff',
                borderRadius: '16px',
                padding: '30px',
                boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
                border: '1px solid #e2e8f0'
              }}>
                <h2 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '24px', color: '#1f2937' }}>
                  Notifications & Alerts
                </h2>
                <div style={{ display: 'grid', gap: '12px' }}>
                  {recentNotifications.map((notification) => (
                    <div key={notification.id} style={{
                      padding: '16px',
                      background: notification.urgent ? '#fef2f2' : '#f8fafc',
                      borderRadius: '12px',
                      border: `1px solid ${notification.urgent ? '#fecaca' : '#e2e8f0'}`,
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '12px'
                    }}>
                      <div style={{
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        background: notification.type === 'session' ? COLORS.blue :
                                   notification.type === 'warning' ? COLORS.warning : COLORS.teal,
                        marginTop: '6px',
                        flexShrink: 0
                      }} />
                      <div style={{ flex: 1 }}>
                        <h4 style={{ margin: '0 0 4px 0', color: '#1f2937', fontSize: '14px', fontWeight: 600 }}>
                          {notification.title}
                        </h4>
                        <p style={{ margin: '0 0 4px 0', color: '#6b7280', fontSize: '14px' }}>
                          {notification.message}
                        </p>
                        <div style={{ fontSize: '12px', color: '#9ca3af' }}>{notification.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedElement>
          </div>
        );

      case 'settings':
        return (
          <div style={{ padding: '20px 0' }}>
            <AnimatedElement animation="fadeIn">
              <div style={{
                background: '#fff',
                borderRadius: '16px',
                padding: '30px',
                boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
                border: '1px solid #e2e8f0'
              }}>
                <h2 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '24px', color: '#1f2937' }}>
                  Settings & Preferences
                </h2>
                <div style={{ display: 'grid', gap: '20px' }}>
                  <div>
                    <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '16px', color: '#1f2937' }}>
                      Profile Settings
                    </h3>
                    <div style={{ marginBottom: '20px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                        <span style={{ fontSize: '14px', color: '#6b7280' }}>Profile Completion</span>
                        <span style={{ fontSize: '14px', fontWeight: 600, color: COLORS.blue }}>85%</span>
                      </div>
                      <div style={{
                        width: '100%',
                        height: '8px',
                        background: '#e2e8f0',
                        borderRadius: '4px',
                        overflow: 'hidden'
                      }}>
                        <div style={{
                          width: '85%',
                          height: '100%',
                          background: `linear-gradient(90deg, ${COLORS.blue}, ${COLORS.teal})`,
                          borderRadius: '4px',
                          transition: 'width 0.8s ease-in-out'
                        }} />
                      </div>
                    </div>
                    <div style={{ display: 'grid', gap: '12px' }}>
                      <div style={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center', 
                        padding: '12px', 
                        border: '1px solid #e2e8f0', 
                        borderRadius: '8px',
                        transition: 'all 0.2s ease',
                        cursor: 'pointer'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.borderColor = COLORS.blue}
                      onMouseLeave={(e) => e.currentTarget.style.borderColor = '#e2e8f0'}
                      >
                        <span style={{ color: '#374151' }}>📧 Email Notifications</span>
                        <input type="checkbox" defaultChecked />
                      </div>
                      <div style={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center', 
                        padding: '12px', 
                        border: '1px solid #e2e8f0', 
                        borderRadius: '8px',
                        transition: 'all 0.2s ease',
                        cursor: 'pointer'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.borderColor = COLORS.blue}
                      onMouseLeave={(e) => e.currentTarget.style.borderColor = '#e2e8f0'}
                      >
                        <span style={{ color: '#374151' }}>⏰ Session Reminders</span>
                        <input type="checkbox" defaultChecked />
                      </div>
                      <div style={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center', 
                        padding: '12px', 
                        border: '1px solid #e2e8f0', 
                        borderRadius: '8px',
                        transition: 'all 0.2s ease',
                        cursor: 'pointer'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.borderColor = COLORS.blue}
                      onMouseLeave={(e) => e.currentTarget.style.borderColor = '#e2e8f0'}
                      >
                        <span style={{ color: '#374151' }}>📊 Progress Alerts</span>
                        <input type="checkbox" defaultChecked />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedElement>
          </div>
        );

      case 'dashboard':
      default:
        return (
          <div style={{ display: 'flex', flex: 1, gap: '20px', padding: '20px 0' }}>
            {/* Main Content */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {/* Metrics Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                {getCurrentMetrics().slice(0, 4).map((metric, index) => (
                  <AnimatedElement key={index} animation="slideInUp" delay={index * 100}>
                    <div style={{
                      background: '#fff',
                      borderRadius: '16px',
                      padding: '20px',
                      boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
                      border: '1px solid #e2e8f0',
                      textAlign: 'center',
                      cursor: 'pointer',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      transform: 'translateY(0px)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-5px) scale(1.03)';
                      e.currentTarget.style.boxShadow = '0 15px 35px rgba(0,0,0,0.12)';
                      e.currentTarget.style.borderColor = metric.color;
                      const icon = e.currentTarget.querySelector('.dash-metric-icon') as HTMLElement;
                      if (icon) {
                        icon.style.transform = 'scale(1.1) rotate(-5deg)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0px) scale(1)';
                      e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.08)';
                      e.currentTarget.style.borderColor = '#e2e8f0';
                      const icon = e.currentTarget.querySelector('.dash-metric-icon') as HTMLElement;
                      if (icon) {
                        icon.style.transform = 'scale(1) rotate(0deg)';
                      }
                    }}
                    >
                      <div className="dash-metric-icon" style={{ 
                        fontSize: '24px', 
                        marginBottom: '8px',
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                      }}>
                        {metric.icon}
                      </div>
                      <div style={{ fontSize: '20px', fontWeight: 700, color: metric.color, marginBottom: '4px' }}>
                        {metric.value}{metric.unit}
                      </div>
                      <div style={{ fontSize: '12px', color: '#6b7280', fontWeight: 500 }}>
                        {metric.title}
                      </div>
                    </div>
                  </AnimatedElement>
                ))}
              </div>

              {/* Main Dashboard Content */}
              <AnimatedElement animation="fadeIn" delay={200}>
                <div style={{
                  background: '#fff',
                  borderRadius: '16px',
                  padding: '30px',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
                  border: '1px solid #e2e8f0'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                    <h2 style={{ fontSize: '20px', fontWeight: 700, margin: 0, color: '#1f2937' }}>
                      Recent Activity & Alerts
                    </h2>
                    {!formFilled && (
                      <button
                        onClick={() => setShowForm(true)}
                        style={{
                          padding: '10px 20px',
                          background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                          color: '#fff',
                          border: 'none',
                          borderRadius: '8px',
                          fontSize: '14px',
                          fontWeight: 600,
                          cursor: 'pointer',
                          transition: 'transform 0.2s ease'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                        onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                      >
                        Complete Assessment
                      </button>
                    )}
                  </div>
                  
                  <div style={{ display: 'grid', gap: '12px' }}>
                    {recentNotifications.slice(0, 3).map((notification) => (
                      <div key={notification.id} className="notification-item" style={{
                        padding: '16px',
                        background: '#f8fafc',
                        borderRadius: '10px',
                        border: '1px solid #e2e8f0',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        cursor: 'pointer',
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        transform: 'translateX(0px)',
                        position: 'relative'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = notification.urgent ? '#fef2f2' : '#f0f9ff';
                        e.currentTarget.style.borderColor = notification.urgent ? COLORS.danger : COLORS.blue;
                        e.currentTarget.style.transform = 'translateX(5px) scale(1.01)';
                        e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.1)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = '#f8fafc';
                        e.currentTarget.style.borderColor = '#e2e8f0';
                        e.currentTarget.style.transform = 'translateX(0px) scale(1)';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                      onClick={() => setCurrentPage('notifications')}
                      >
                        <div className={notification.urgent ? 'pulse-animation' : ''} style={{
                          width: notification.urgent ? '8px' : '6px',
                          height: notification.urgent ? '8px' : '6px',
                          borderRadius: '50%',
                          background: notification.urgent ? COLORS.danger : COLORS.blue,
                          flexShrink: 0,
                          transition: 'all 0.3s ease'
                        }} />
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: '14px', fontWeight: 600, color: '#1f2937', marginBottom: '2px' }}>
                            {notification.title}
                            {notification.urgent && <span style={{ color: COLORS.danger, marginLeft: '4px' }}>🔥</span>}
                          </div>
                          <div style={{ fontSize: '13px', color: '#6b7280' }}>
                            {notification.message}
                          </div>
                        </div>
                        <div style={{ 
                          fontSize: '11px', 
                          color: '#9ca3af',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'flex-end',
                          gap: '4px'
                        }}>
                          <span>{notification.time}</span>
                          <span style={{ 
                            fontSize: '10px', 
                            color: COLORS.blue,
                            opacity: 0,
                            transition: 'opacity 0.3s ease'
                          }} className="click-hint">
                            Click to view
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </AnimatedElement>
            </div>

            {/* Right Sidebar */}
            <div style={{ width: '320px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {/* Student Info Card */}
              <AnimatedElement animation="slideInRight" delay={100}>
                <div style={{
                  background: '#fff',
                  borderRadius: '16px',
                  padding: '24px',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
                  border: '1px solid #e2e8f0'
                }}>
                  <div style={{ textAlign: 'center', marginBottom: '16px' }}>
                    <div style={{
                      width: '60px',
                      height: '60px',
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #3b82f6, #1e40af)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#fff',
                      fontSize: '24px',
                      fontWeight: 700,
                      margin: '0 auto 12px auto'
                    }}>
                      {mockStudentData.name.charAt(0)}
                    </div>
                    <h3 style={{ margin: '0 0 4px 0', fontSize: '16px', fontWeight: 600, color: '#1f2937' }}>
                      {mockStudentData.name}
                    </h3>
                    <p style={{ margin: '0', fontSize: '12px', color: '#6b7280' }}>
                      {mockStudentData.roll}  {mockStudentData.year}
                    </p>
                  </div>
                  <div style={{ display: 'grid', gap: '8px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: '12px', color: '#6b7280' }}>Department</span>
                      <span style={{ fontSize: '12px', fontWeight: 600, color: '#1f2937' }}>{mockStudentData.dept}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: '12px', color: '#6b7280' }}>Section</span>
                      <span style={{ fontSize: '12px', fontWeight: 600, color: '#1f2937' }}>{mockStudentData.section}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: '12px', color: '#6b7280' }}>Semester</span>
                      <span style={{ fontSize: '12px', fontWeight: 600, color: '#1f2937' }}>{mockStudentData.semester}</span>
                    </div>
                  </div>
                </div>
              </AnimatedElement>

              {/* Quick Actions */}
              <AnimatedElement animation="slideInRight" delay={200}>
                <div style={{
                  background: '#fff',
                  borderRadius: '16px',
                  padding: '20px',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
                  border: '1px solid #e2e8f0'
                }}>
                  <h3 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: 600, color: '#1f2937' }}>
                    Quick Actions
                  </h3>
                  <div style={{ display: 'grid', gap: '8px' }}>
                    {[
                      { label: 'View Progress', action: () => setCurrentPage('progress'), color: COLORS.blue },
                      { label: 'Book Session', action: () => setCurrentPage('sessions'), color: COLORS.teal },
                      { label: 'Check Records', action: () => setCurrentPage('records'), color: COLORS.purple }
                    ].map((action, index) => (
                      <button
                        key={index}
                        onClick={action.action}
                        style={{
                          padding: '10px 16px',
                          background: 'rgba(59, 130, 246, 0.05)',
                          color: action.color,
                          border: `1px solid rgba(59, 130, 246, 0.2)`,
                          borderRadius: '8px',
                          fontSize: '13px',
                          fontWeight: 500,
                          textAlign: 'left',
                          cursor: 'pointer',
                          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                          transform: 'translateX(0px) scale(1)'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = 'rgba(59, 130, 246, 0.15)';
                          e.currentTarget.style.borderColor = action.color;
                          e.currentTarget.style.transform = 'translateX(5px) scale(1.02)';
                          e.currentTarget.style.boxShadow = '0 4px 15px rgba(59, 130, 246, 0.2)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = 'rgba(59, 130, 246, 0.05)';
                          e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.2)';
                          e.currentTarget.style.transform = 'translateX(0px) scale(1)';
                          e.currentTarget.style.boxShadow = 'none';
                        }}
                      >
                        {action.label}
                      </button>
                    ))}
                  </div>
                </div>
              </AnimatedElement>
            </div>
          </div>
        );
    }
  };

  if (showForm) {
    return (
      <div style={{ minHeight: '100vh', width: '100%' }}>
        <StudentForm onSubmit={handleFormSubmit} onCancel={() => setShowForm(false)} />
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', fontFamily: 'Segoe UI, Arial, sans-serif', display: 'flex' }}>
      {/* Sidebar Component */}
      <Sidebar 
        role="student" 
        currentPage={currentPage} 
        onPageChange={setCurrentPage}
        customMenuItems={studentMenuItems}
      />
      
      {/* Main Content Area */}
      <div style={{ 
        marginLeft: '72px', 
        flex: 1, 
        transition: 'margin-left 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column'
      }}>
        
        {/* Header Section */}
        <div style={{ background: '#fff', borderBottom: '1px solid #e2e8f0', padding: '20px 40px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{
                width: '50px',
                height: '50px',
                borderRadius: '16px',
                background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                fontSize: '20px',
                fontWeight: '700',
                border: `3px solid ${COLORS.primary}`,
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
              }}>
                {mockStudentData.name.charAt(0)}
              </div>
              <div>
                <h1 style={{ fontSize: '28px', fontWeight: '700', color: '#1a202c', margin: '0 0 8px 0' }}>
                  {currentPage === 'dashboard' ? `${mockStudentData.name} Dashboard` :
                   currentPage === 'assessment' ? 'Student Assessment' :
                   currentPage === 'records' ? 'Academic Records' :
                   currentPage === 'progress' ? 'Progress Report' :
                   currentPage === 'achievements' ? 'Achievements' :
                   currentPage === 'sessions' ? 'Counseling Sessions' :
                   currentPage === 'career' ? 'Career Guidance' :
                   currentPage === 'notifications' ? 'Notifications Center' :
                   currentPage === 'settings' ? 'Settings & Preferences' : 'Student Dashboard'}
                </h1>
                <p style={{ color: '#64748b', margin: 0 }}>
                  {currentPage === 'dashboard' ? `Roll: ${mockStudentData.roll} | ${mockStudentData.year} | Sem: ${mockStudentData.semester} | Sec: ${mockStudentData.section} | ${mockStudentData.dept}` :
                   currentPage === 'assessment' ? 'Complete your comprehensive psychological and academic assessment' :
                   currentPage === 'records' ? 'Track your academic performance and semester history' :
                   currentPage === 'progress' ? 'Monitor your academic progress and risk assessment' :
                   currentPage === 'achievements' ? 'Your academic and counseling milestones' :
                   currentPage === 'sessions' ? 'Manage your counseling appointments and history' :
                   currentPage === 'career' ? 'Personalized career recommendations and guidance' :
                   currentPage === 'notifications' ? 'Important alerts and updates' :
                   currentPage === 'settings' ? 'Manage your profile and preferences' : 'Your academic and counseling dashboard'}
                </p>
              </div>
            </div>

            {!formFilled && currentPage === 'dashboard' && (
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <AnimatedElement>
                  <button
                    onClick={() => setShowForm(true)}
                    style={{
                      background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                      color: 'white',
                      border: 'none',
                      padding: '12px 24px',
                      borderRadius: '10px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      fontSize: '14px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      boxShadow: '0 4px 15px rgba(245, 158, 11, 0.3)',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      transform: 'translateY(0)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 8px 25px rgba(245, 158, 11, 0.4)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 4px 15px rgba(245, 158, 11, 0.3)';
                    }}
                  >
                    <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    Complete Assessment
                  </button>
                </AnimatedElement>
              </div>
            )}
          </div>
        </div>

        {/* Render Current Page Content */}
        <div key={currentPage} className="fade-in-up" style={{
          animation: 'fadeInUp 0.5s ease-out',
          padding: '0 40px 40px 40px'
        }}>
          {renderContent()}
        </div>

        {/* Floating Action Button */}
        {currentPage === 'dashboard' && (
          <button
            onClick={() => setCurrentPage('sessions')}
            style={{
              position: 'fixed',
              bottom: '30px',
              right: '30px',
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #10b981, #059669)',
              color: '#fff',
              border: 'none',
              fontSize: '24px',
              cursor: 'pointer',
              boxShadow: '0 8px 25px rgba(16, 185, 129, 0.3)',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              transform: 'scale(1)',
              zIndex: 1000
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.1) rotate(10deg)';
              e.currentTarget.style.boxShadow = '0 12px 35px rgba(16, 185, 129, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1) rotate(0deg)';
              e.currentTarget.style.boxShadow = '0 8px 25px rgba(16, 185, 129, 0.3)';
            }}
            title="Book Counseling Session"
          >
            💬
          </button>
        )}
      </div>
    </div>
  );
}

export default StudentDashboard;
