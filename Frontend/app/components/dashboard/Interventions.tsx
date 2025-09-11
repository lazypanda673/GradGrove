"use client";
import React, { useState } from 'react';
import AnimatedElement from '../common/AnimatedElement';

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

interface Intervention {
  id: number;
  studentId: number;
  type: 'academic' | 'career' | 'personal' | 'behavioral';
  priority: 'high' | 'medium' | 'low';
  title: string;
  description: string;
  assignedTo: string;
  status: 'pending' | 'in-progress' | 'completed' | 'cancelled';
  createdDate: string;
  dueDate: string;
  progress: number;
}

interface InterventionsProps {
  mockStudents: Student[];
}

const mockInterventions: Intervention[] = [
  {
    id: 1,
    studentId: 1,
    type: 'academic',
    priority: 'high',
    title: 'Mathematics Support Program',
    description: 'Student struggling with advanced calculus. Requires additional tutoring sessions.',
    assignedTo: 'Dr. Sarah Johnson',
    status: 'in-progress',
    createdDate: '2024-01-15',
    dueDate: '2024-02-15',
    progress: 65
  },
  {
    id: 2,
    studentId: 2,
    type: 'career',
    priority: 'medium',
    title: 'Career Path Guidance',
    description: 'Provide personalized career counseling for software development track.',
    assignedTo: 'Career Counselor',
    status: 'pending',
    createdDate: '2024-01-20',
    dueDate: '2024-02-20',
    progress: 0
  },
  {
    id: 3,
    studentId: 3,
    type: 'personal',
    priority: 'high',
    title: 'Stress Management Workshop',
    description: 'Student showing signs of academic stress. Enroll in stress management program.',
    assignedTo: 'Dr. Michael Chen',
    status: 'completed',
    createdDate: '2024-01-10',
    dueDate: '2024-01-25',
    progress: 100
  },
  {
    id: 4,
    studentId: 4,
    type: 'behavioral',
    priority: 'medium',
    title: 'Team Collaboration Training',
    description: 'Improve teamwork skills through structured group activities.',
    assignedTo: 'Prof. Lisa Wang',
    status: 'in-progress',
    createdDate: '2024-01-18',
    dueDate: '2024-02-10',
    progress: 40
  },
  {
    id: 5,
    studentId: 5,
    type: 'academic',
    priority: 'low',
    title: 'Study Skills Enhancement',
    description: 'Develop better study habits and time management skills.',
    assignedTo: 'Academic Advisor',
    status: 'pending',
    createdDate: '2024-01-22',
    dueDate: '2024-02-25',
    progress: 0
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
    case 'academic': return COLORS.primary;
    case 'career': return COLORS.accent;
    case 'personal': return COLORS.success;
    case 'behavioral': return COLORS.warning;
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
    case 'pending': return COLORS.warning;
    case 'cancelled': return COLORS.danger;
    default: return COLORS.primary;
  }
};

export default function Interventions({ mockStudents }: InterventionsProps) {
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedPriority, setSelectedPriority] = useState<string>('all');
  const [search, setSearch] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);

  const filteredInterventions = mockInterventions.filter(intervention => {
    const student = mockStudents.find(s => s.id === intervention.studentId);
    const studentName = student?.name || '';
    
    return (
      (selectedType === 'all' || intervention.type === selectedType) &&
      (selectedStatus === 'all' || intervention.status === selectedStatus) &&
      (selectedPriority === 'all' || intervention.priority === selectedPriority) &&
      (search === '' || 
       intervention.title.toLowerCase().includes(search.toLowerCase()) ||
       studentName.toLowerCase().includes(search.toLowerCase()) ||
       intervention.description.toLowerCase().includes(search.toLowerCase()))
    );
  });

  const getStudentName = (studentId: number) => {
    const student = mockStudents.find(s => s.id === studentId);
    return student ? student.name : 'Unknown Student';
  };

  const getStudentPicture = (studentId: number) => {
    // Generate a consistent profile picture based on student ID
    const pictures = [
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1494790108755-2616b612b1cf?w=150&h=150&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face'
    ];
    return pictures[studentId % pictures.length];
  };

  const stats = {
    total: mockInterventions.length,
    pending: mockInterventions.filter(i => i.status === 'pending').length,
    inProgress: mockInterventions.filter(i => i.status === 'in-progress').length,
    completed: mockInterventions.filter(i => i.status === 'completed').length,
    highPriority: mockInterventions.filter(i => i.priority === 'high').length
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
            <div style={{ fontSize: '48px', marginBottom: '12px', opacity: 0.2, position: 'absolute', top: '16px', right: '20px' }}>📋</div>
            <div style={{ fontSize: '14px', opacity: 0.9, marginBottom: '8px', fontWeight: '500' }}>Total Interventions</div>
            <div style={{ fontSize: '36px', fontWeight: '800', marginBottom: '6px' }}>{stats.total}</div>
            <div style={{ fontSize: '13px', opacity: 0.8 }}>Active cases</div>
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
            <div style={{ fontSize: '48px', marginBottom: '12px', opacity: 0.2, position: 'absolute', top: '16px', right: '20px' }}>🚨</div>
            <div style={{ fontSize: '14px', opacity: 0.9, marginBottom: '8px', fontWeight: '500' }}>High Priority</div>
            <div style={{ fontSize: '36px', fontWeight: '800', marginBottom: '6px' }}>{stats.highPriority}</div>
            <div style={{ fontSize: '13px', opacity: 0.8 }}>Urgent cases</div>
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
            <div style={{ fontSize: '48px', marginBottom: '12px', opacity: 0.2, position: 'absolute', top: '16px', right: '20px' }}>⏳</div>
            <div style={{ fontSize: '14px', opacity: 0.9, marginBottom: '8px', fontWeight: '500' }}>In Progress</div>
            <div style={{ fontSize: '36px', fontWeight: '800', marginBottom: '6px' }}>{stats.inProgress}</div>
            <div style={{ fontSize: '13px', opacity: 0.8 }}>Active work</div>
          </div>
        </AnimatedElement>

        <AnimatedElement animation="scaleIn" delay={400}>
          <div style={{
            background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
            borderRadius: '16px',
            padding: '24px',
            color: 'white',
            boxShadow: '0 8px 32px rgba(67, 233, 123, 0.3)',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-4px) scale(1.02)';
            e.currentTarget.style.boxShadow = '0 12px 40px rgba(67, 233, 123, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0) scale(1)';
            e.currentTarget.style.boxShadow = '0 8px 32px rgba(67, 233, 123, 0.3)';
          }}
          >
            <div style={{ fontSize: '48px', marginBottom: '12px', opacity: 0.2, position: 'absolute', top: '16px', right: '20px' }}>✅</div>
            <div style={{ fontSize: '14px', opacity: 0.9, marginBottom: '8px', fontWeight: '500' }}>Completed</div>
            <div style={{ fontSize: '36px', fontWeight: '800', marginBottom: '6px' }}>{stats.completed}</div>
            <div style={{ fontSize: '13px', opacity: 0.8 }}>Success rate</div>
          </div>
        </AnimatedElement>
      </div>

      {/* Filters and Actions */}
      <AnimatedElement animation="fadeIn" delay={200}>
        <div style={{ 
          background: '#fff', 
          borderRadius: '16px', 
          padding: '24px', 
          marginBottom: '24px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
          border: '1px solid #e2e8f0'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1a202c', margin: 0 }}>
              Intervention Management
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
              + Create Intervention
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', alignItems: 'end' }}>
            <div>
              <label style={{ fontSize: '12px', fontWeight: '600', color: '#64748b', marginBottom: '6px', display: 'block' }}>
                Search
              </label>
              <input
                type="text"
                placeholder="Search by title, student, description..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '8px',
                  border: '1px solid #e2e8f0',
                  fontSize: '14px',
                  transition: 'all 0.2s ease'
                }}
              />
            </div>

            <div>
              <label style={{ fontSize: '12px', fontWeight: '600', color: '#64748b', marginBottom: '6px', display: 'block' }}>
                Type
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
                <option value="academic">Academic</option>
                <option value="career">Career</option>
                <option value="personal">Personal</option>
                <option value="behavioral">Behavioral</option>
              </select>
            </div>

            <div>
              <label style={{ fontSize: '12px', fontWeight: '600', color: '#64748b', marginBottom: '6px', display: 'block' }}>
                Status
              </label>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '8px',
                  border: '1px solid #e2e8f0',
                  fontSize: '14px'
                }}
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>

            <div>
              <label style={{ fontSize: '12px', fontWeight: '600', color: '#64748b', marginBottom: '6px', display: 'block' }}>
                Priority
              </label>
              <select
                value={selectedPriority}
                onChange={(e) => setSelectedPriority(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '8px',
                  border: '1px solid #e2e8f0',
                  fontSize: '14px'
                }}
              >
                <option value="all">All Priority</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>
          </div>
        </div>
      </AnimatedElement>

      {/* Interventions List */}
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
              Active Interventions ({filteredInterventions.length})
            </h3>
          </div>

          <div style={{ maxHeight: '600px', overflowY: 'auto' }}>
            {filteredInterventions.map((intervention, index) => (
              <AnimatedElement key={intervention.id} animation="slideInUp" delay={100 + index * 50}>
                <div style={{
                  padding: '24px',
                  borderBottom: index < filteredInterventions.length - 1 ? '1px solid #f1f5f9' : 'none',
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
                    {/* Student Profile Picture */}
                    <img
                      src={getStudentPicture(intervention.studentId)}
                      alt={getStudentName(intervention.studentId)}
                      style={{
                        width: '48px',
                        height: '48px',
                        borderRadius: '50%',
                        objectFit: 'cover',
                        border: '2px solid #e2e8f0'
                      }}
                    />

                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'between', marginBottom: '8px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <h4 style={{ fontSize: '16px', fontWeight: '600', color: '#1a202c', margin: 0 }}>
                            {intervention.title}
                          </h4>
                          <span style={{
                            padding: '4px 8px',
                            borderRadius: '12px',
                            fontSize: '11px',
                            fontWeight: '600',
                            textTransform: 'uppercase',
                            background: `${getTypeColor(intervention.type)}15`,
                            color: getTypeColor(intervention.type)
                          }}>
                            {intervention.type}
                          </span>
                          <span style={{
                            padding: '4px 8px',
                            borderRadius: '12px',
                            fontSize: '11px',
                            fontWeight: '600',
                            textTransform: 'uppercase',
                            background: `${getPriorityColor(intervention.priority)}15`,
                            color: getPriorityColor(intervention.priority)
                          }}>
                            {intervention.priority}
                          </span>
                        </div>
                        
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{
                            padding: '6px 12px',
                            borderRadius: '20px',
                            fontSize: '12px',
                            fontWeight: '600',
                            background: `${getStatusColor(intervention.status)}15`,
                            color: getStatusColor(intervention.status)
                          }}>
                            {intervention.status.replace('-', ' ')}
                          </span>
                        </div>
                      </div>

                      <p style={{ fontSize: '14px', color: '#64748b', margin: '0 0 12px 0', lineHeight: '1.5' }}>
                        {intervention.description}
                      </p>

                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'between' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '13px', color: '#64748b' }}>
                          <span><strong>Student:</strong> {getStudentName(intervention.studentId)}</span>
                          <span><strong>Assigned to:</strong> {intervention.assignedTo}</span>
                          <span><strong>Due:</strong> {new Date(intervention.dueDate).toLocaleDateString()}</span>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          {intervention.status === 'in-progress' && (
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <div style={{
                                width: '60px',
                                height: '4px',
                                background: '#e2e8f0',
                                borderRadius: '2px',
                                overflow: 'hidden'
                              }}>
                                <div style={{
                                  width: `${intervention.progress}%`,
                                  height: '100%',
                                  background: getStatusColor(intervention.status),
                                  borderRadius: '2px',
                                  transition: 'width 0.3s ease'
                                }} />
                              </div>
                              <span style={{ fontSize: '12px', color: '#64748b', fontWeight: '500' }}>
                                {intervention.progress}%
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </AnimatedElement>
            ))}

            {filteredInterventions.length === 0 && (
              <div style={{ 
                padding: '60px 24px', 
                textAlign: 'center', 
                color: '#64748b',
                fontSize: '14px'
              }}>
                <div style={{ fontSize: '48px', marginBottom: '16px', opacity: 0.5 }}>🔍</div>
                No interventions found matching your criteria.
              </div>
            )}
          </div>
        </div>
      </AnimatedElement>
    </div>
  );
}
