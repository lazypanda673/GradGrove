"use client";
import React, { useState } from 'react';
import AnimatedElement from '../common/AnimatedElement';

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

interface ScheduleEvent {
  id: number;
  title: string;
  type: 'counseling' | 'meeting' | 'workshop' | 'assessment';
  studentName?: string;
  studentId?: number;
  startTime: string;
  endTime: string;
  date: string;
  location: string;
  priority: 'high' | 'medium' | 'low';
  status: 'scheduled' | 'completed' | 'cancelled' | 'in-progress';
  description: string;
}

interface ScheduleProps {
  mockStudents: Student[];
}

const mockEvents: ScheduleEvent[] = [
  {
    id: 1,
    title: 'Career Guidance Session',
    type: 'counseling',
    studentName: 'Rahul Sharma',
    studentId: 1,
    startTime: '09:00',
    endTime: '10:00',
    date: '2024-01-25',
    location: 'Counseling Room A',
    priority: 'high',
    status: 'scheduled',
    description: 'Discussion about engineering career paths and college admissions'
  },
  {
    id: 2,
    title: 'Academic Performance Review',
    type: 'counseling',
    studentName: 'Priya Patel',
    studentId: 2,
    startTime: '10:30',
    endTime: '11:30',
    date: '2024-01-25',
    location: 'Counseling Room B',
    priority: 'medium',
    status: 'scheduled',
    description: 'Addressing mathematics performance and study strategies'
  },
  {
    id: 3,
    title: 'Study Skills Workshop',
    type: 'workshop',
    startTime: '14:00',
    endTime: '15:30',
    date: '2024-01-25',
    location: 'Main Auditorium',
    priority: 'medium',
    status: 'scheduled',
    description: 'Group workshop on effective study techniques and time management'
  },
  {
    id: 4,
    title: 'Faculty Meeting',
    type: 'meeting',
    startTime: '16:00',
    endTime: '17:00',
    date: '2024-01-25',
    location: 'Conference Room',
    priority: 'high',
    status: 'scheduled',
    description: 'Weekly faculty meeting to discuss student progress and interventions'
  },
  {
    id: 5,
    title: 'Student Assessment',
    type: 'assessment',
    studentName: 'Amit Kumar',
    studentId: 3,
    startTime: '11:00',
    endTime: '12:00',
    date: '2024-01-26',
    location: 'Testing Center',
    priority: 'high',
    status: 'scheduled',
    description: 'Psychological assessment for stress and anxiety management'
  }
];

const COLORS = {
  primary: '#6366f1',
  secondary: '#8b5cf6',
  accent: '#06b6d4',
  success: '#10b981',
  warning: '#f59e0b',
  danger: '#ef4444',
  light: '#f8fafc',
  dark: '#1e293b'
};

const getTypeColor = (type: string) => {
  switch (type) {
    case 'counseling': return COLORS.primary;
    case 'meeting': return COLORS.secondary;
    case 'workshop': return COLORS.accent;
    case 'assessment': return COLORS.warning;
    default: return COLORS.primary;
  }
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'high': return COLORS.danger;
    case 'medium': return COLORS.warning;
    case 'low': return COLORS.success;
    default: return COLORS.primary;
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'completed': return COLORS.success;
    case 'in-progress': return COLORS.primary;
    case 'scheduled': return COLORS.accent;
    case 'cancelled': return COLORS.danger;
    default: return COLORS.primary;
  }
};

export default function Schedule({ mockStudents }: ScheduleProps) {
  const [selectedDate, setSelectedDate] = useState('2024-01-25');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'day' | 'week' | 'month'>('day');
  const [showCreateForm, setShowCreateForm] = useState(false);

  const filteredEvents = mockEvents.filter(event => {
    return (
      event.date === selectedDate &&
      (selectedType === 'all' || event.type === selectedType)
    );
  });

  const todayStats = {
    total: filteredEvents.length,
    counseling: filteredEvents.filter(e => e.type === 'counseling').length,
    meetings: filteredEvents.filter(e => e.type === 'meeting').length,
    workshops: filteredEvents.filter(e => e.type === 'workshop').length,
    highPriority: filteredEvents.filter(e => e.priority === 'high').length
  };

  return (
    <div style={{ padding: '0', maxWidth: '100%' }}>
      {/* Stats Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '24px' }}>
        <AnimatedElement animation="scaleIn" delay={100}>
          <div style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            borderRadius: '16px',
            padding: '24px',
            color: 'white',
            boxShadow: '0 8px 32px rgba(102, 126, 234, 0.3)',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-4px) scale(1.02)';
            e.currentTarget.style.boxShadow = '0 12px 40px rgba(102, 126, 234, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0) scale(1)';
            e.currentTarget.style.boxShadow = '0 8px 32px rgba(102, 126, 234, 0.3)';
          }}
          >
            <div style={{ fontSize: '48px', marginBottom: '12px', opacity: 0.2, position: 'absolute', top: '16px', right: '20px' }}>📅</div>
            <div style={{ fontSize: '14px', opacity: 0.9, marginBottom: '8px', fontWeight: '500' }}>Today's Events</div>
            <div style={{ fontSize: '36px', fontWeight: '800', marginBottom: '6px' }}>{todayStats.total}</div>
            <div style={{ fontSize: '13px', opacity: 0.8 }}>Scheduled activities</div>
          </div>
        </AnimatedElement>

        <AnimatedElement animation="scaleIn" delay={200}>
          <div style={{
            background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
            borderRadius: '16px',
            padding: '24px',
            color: 'white',
            boxShadow: '0 8px 32px rgba(245, 87, 108, 0.3)',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-4px) scale(1.02)';
            e.currentTarget.style.boxShadow = '0 12px 40px rgba(245, 87, 108, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0) scale(1)';
            e.currentTarget.style.boxShadow = '0 8px 32px rgba(245, 87, 108, 0.3)';
          }}
          >
            <div style={{ fontSize: '48px', marginBottom: '12px', opacity: 0.2, position: 'absolute', top: '16px', right: '20px' }}>💬</div>
            <div style={{ fontSize: '14px', opacity: 0.9, marginBottom: '8px', fontWeight: '500' }}>Counseling Sessions</div>
            <div style={{ fontSize: '36px', fontWeight: '800', marginBottom: '6px' }}>{todayStats.counseling}</div>
            <div style={{ fontSize: '13px', opacity: 0.8 }}>Student meetings</div>
          </div>
        </AnimatedElement>

        <AnimatedElement animation="scaleIn" delay={300}>
          <div style={{
            background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
            borderRadius: '16px',
            padding: '24px',
            color: 'white',
            boxShadow: '0 8px 32px rgba(79, 172, 254, 0.3)',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-4px) scale(1.02)';
            e.currentTarget.style.boxShadow = '0 12px 40px rgba(79, 172, 254, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0) scale(1)';
            e.currentTarget.style.boxShadow = '0 8px 32px rgba(79, 172, 254, 0.3)';
          }}
          >
            <div style={{ fontSize: '48px', marginBottom: '12px', opacity: 0.2, position: 'absolute', top: '16px', right: '20px' }}>🏫</div>
            <div style={{ fontSize: '14px', opacity: 0.9, marginBottom: '8px', fontWeight: '500' }}>Workshops</div>
            <div style={{ fontSize: '36px', fontWeight: '800', marginBottom: '6px' }}>{todayStats.workshops}</div>
            <div style={{ fontSize: '13px', opacity: 0.8 }}>Group activities</div>
          </div>
        </AnimatedElement>

        <AnimatedElement animation="scaleIn" delay={400}>
          <div style={{
            background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
            borderRadius: '16px',
            padding: '24px',
            color: 'white',
            boxShadow: '0 8px 32px rgba(250, 112, 154, 0.3)',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-4px) scale(1.02)';
            e.currentTarget.style.boxShadow = '0 12px 40px rgba(250, 112, 154, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0) scale(1)';
            e.currentTarget.style.boxShadow = '0 8px 32px rgba(250, 112, 154, 0.3)';
          }}
          >
            <div style={{ fontSize: '48px', marginBottom: '12px', opacity: 0.2, position: 'absolute', top: '16px', right: '20px' }}>🚨</div>
            <div style={{ fontSize: '14px', opacity: 0.9, marginBottom: '8px', fontWeight: '500' }}>High Priority</div>
            <div style={{ fontSize: '36px', fontWeight: '800', marginBottom: '6px' }}>{todayStats.highPriority}</div>
            <div style={{ fontSize: '13px', opacity: 0.8 }}>Urgent tasks</div>
          </div>
        </AnimatedElement>
      </div>

      {/* Controls */}
      <AnimatedElement animation="fadeIn" delay={200}>
        <div style={{ 
          background: '#fff', 
          borderRadius: '16px', 
          padding: '24px', 
          marginBottom: '24px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
          border: '1px solid #e2e8f0'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'between', marginBottom: '20px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1a202c', margin: 0 }}>
              Schedule Management
            </h3>
            <button
              onClick={() => setShowCreateForm(true)}
              style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                padding: '12px 24px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 6px 16px rgba(102, 126, 234, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(102, 126, 234, 0.3)';
              }}
            >
              + Add Event
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', alignItems: 'end' }}>
            <div>
              <label style={{ fontSize: '12px', fontWeight: '600', color: '#64748b', marginBottom: '6px', display: 'block' }}>
                Date
              </label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '8px',
                  border: '1px solid #e2e8f0',
                  fontSize: '14px'
                }}
              />
            </div>

            <div>
              <label style={{ fontSize: '12px', fontWeight: '600', color: '#64748b', marginBottom: '6px', display: 'block' }}>
                Event Type
              </label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '8px',
                  border: '1px solid #e2e8f0',
                  fontSize: '14px'
                }}
              >
                <option value="all">All Types</option>
                <option value="counseling">Counseling</option>
                <option value="meeting">Meeting</option>
                <option value="workshop">Workshop</option>
                <option value="assessment">Assessment</option>
              </select>
            </div>

            <div>
              <label style={{ fontSize: '12px', fontWeight: '600', color: '#64748b', marginBottom: '6px', display: 'block' }}>
                View Mode
              </label>
              <div style={{ display: 'flex', background: '#f1f5f9', borderRadius: '8px', padding: '4px' }}>
                {(['day', 'week', 'month'] as const).map((mode) => (
                  <button
                    key={mode}
                    onClick={() => setViewMode(mode)}
                    style={{
                      flex: 1,
                      padding: '8px 16px',
                      borderRadius: '6px',
                      border: 'none',
                      fontSize: '12px',
                      fontWeight: '600',
                      textTransform: 'capitalize',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      background: viewMode === mode ? '#fff' : 'transparent',
                      color: viewMode === mode ? COLORS.primary : '#64748b',
                      boxShadow: viewMode === mode ? '0 2px 4px rgba(0,0,0,0.1)' : 'none'
                    }}
                  >
                    {mode}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </AnimatedElement>

      {/* Schedule List */}
      <AnimatedElement animation="fadeIn" delay={300}>
        <div style={{ 
          background: '#fff', 
          borderRadius: '16px', 
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
          border: '1px solid #e2e8f0',
          overflow: 'hidden'
        }}>
          <div style={{ padding: '24px', borderBottom: '1px solid #e2e8f0' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1a202c', margin: 0 }}>
              Schedule for {new Date(selectedDate).toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </h3>
          </div>

          <div style={{ maxHeight: '600px', overflowY: 'auto' }}>
            {filteredEvents.length > 0 ? (
              filteredEvents
                .sort((a, b) => a.startTime.localeCompare(b.startTime))
                .map((event, index) => (
                  <AnimatedElement key={event.id} animation="slideInUp" delay={100 + index * 50}>
                    <div style={{
                      padding: '24px',
                      borderBottom: index < filteredEvents.length - 1 ? '1px solid #f1f5f9' : 'none',
                      transition: 'all 0.2s ease',
                      cursor: 'pointer'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = '#f8fafc';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'transparent';
                    }}
                    >
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                        <div style={{
                          background: `${getTypeColor(event.type)}15`,
                          borderRadius: '12px',
                          padding: '12px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          minWidth: '48px',
                          height: '48px'
                        }}>
                          <span style={{ fontSize: '20px' }}>
                            {event.type === 'counseling' ? '💬' : 
                             event.type === 'meeting' ? '👥' :
                             event.type === 'workshop' ? '🏫' : '📝'}
                          </span>
                        </div>

                        <div style={{ flex: 1 }}>
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'between', marginBottom: '8px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                              <h4 style={{ fontSize: '16px', fontWeight: '600', color: '#1a202c', margin: 0 }}>
                                {event.title}
                              </h4>
                              <span style={{
                                padding: '4px 8px',
                                borderRadius: '12px',
                                fontSize: '11px',
                                fontWeight: '600',
                                textTransform: 'uppercase',
                                background: `${getTypeColor(event.type)}15`,
                                color: getTypeColor(event.type)
                              }}>
                                {event.type}
                              </span>
                              <span style={{
                                padding: '4px 8px',
                                borderRadius: '12px',
                                fontSize: '11px',
                                fontWeight: '600',
                                textTransform: 'uppercase',
                                background: `${getPriorityColor(event.priority)}15`,
                                color: getPriorityColor(event.priority)
                              }}>
                                {event.priority}
                              </span>
                            </div>
                            
                            <span style={{
                              padding: '6px 12px',
                              borderRadius: '20px',
                              fontSize: '12px',
                              fontWeight: '600',
                              background: `${getStatusColor(event.status)}15`,
                              color: getStatusColor(event.status)
                            }}>
                              {event.status}
                            </span>
                          </div>

                          <p style={{ fontSize: '14px', color: '#64748b', margin: '0 0 12px 0', lineHeight: '1.5' }}>
                            {event.description}
                          </p>

                          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '13px', color: '#64748b' }}>
                            <span><strong>Time:</strong> {event.startTime} - {event.endTime}</span>
                            <span><strong>Location:</strong> {event.location}</span>
                            {event.studentName && (
                              <span><strong>Student:</strong> {event.studentName}</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </AnimatedElement>
                ))
            ) : (
              <div style={{ 
                padding: '60px 24px', 
                textAlign: 'center', 
                color: '#64748b',
                fontSize: '14px'
              }}>
                <div style={{ fontSize: '48px', marginBottom: '16px', opacity: 0.5 }}>📅</div>
                No events scheduled for this date.
              </div>
            )}
          </div>
        </div>
      </AnimatedElement>
    </div>
  );
}
