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

interface Notification {
  id: number;
  type: 'info' | 'warning' | 'success' | 'urgent';
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  category: 'session' | 'intervention' | 'system' | 'student' | 'report';
  studentId?: number;
  actionRequired?: boolean;
}

interface NotificationsProps {
  mockStudents: Student[];
}

const mockNotifications: Notification[] = [
  {
    id: 1,
    type: 'urgent',
    title: 'High-Risk Student Alert',
    message: 'Rahul Sharma requires immediate intervention - attendance dropped below 75%',
    timestamp: '2024-01-24T10:30:00Z',
    isRead: false,
    category: 'student',
    studentId: 1,
    actionRequired: true
  },
  {
    id: 2,
    type: 'info',
    title: 'Upcoming Session Reminder',
    message: 'Career guidance session with Priya Patel scheduled for today at 2:00 PM',
    timestamp: '2024-01-24T09:00:00Z',
    isRead: false,
    category: 'session',
    studentId: 2,
    actionRequired: false
  },
  {
    id: 3,
    type: 'success',
    title: 'Intervention Completed',
    message: 'Mathematics support program for Amit Kumar has been successfully completed',
    timestamp: '2024-01-24T08:15:00Z',
    isRead: false,
    category: 'intervention',
    studentId: 3,
    actionRequired: false
  },
  {
    id: 4,
    type: 'warning',
    title: 'Report Deadline Approaching',
    message: 'Monthly counseling report is due in 2 days',
    timestamp: '2024-01-23T16:45:00Z',
    isRead: true,
    category: 'report',
    actionRequired: true
  },
  {
    id: 5,
    type: 'info',
    title: 'System Update',
    message: 'GradGrove platform will undergo maintenance tonight from 11 PM to 1 AM',
    timestamp: '2024-01-23T14:20:00Z',
    isRead: true,
    category: 'system',
    actionRequired: false
  },
  {
    id: 6,
    type: 'warning',
    title: 'New Student Assignment',
    message: 'You have been assigned as counselor for 3 new students in Computer Science department',
    timestamp: '2024-01-23T11:30:00Z',
    isRead: false,
    category: 'student',
    actionRequired: true
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
    case 'urgent': return COLORS.danger;
    case 'warning': return COLORS.warning;
    case 'success': return COLORS.success;
    case 'info': return COLORS.primary;
    default: return COLORS.primary;
  }
};

const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'session': return '💬';
    case 'intervention': return '🎯';
    case 'system': return '🔧';
    case 'student': return '👤';
    case 'report': return '📊';
    default: return '🔔';
  }
};

const formatTime = (timestamp: string) => {
  const date = new Date(timestamp);
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const days = Math.floor(hours / 24);

  if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
  if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  return 'Just now';
};

export default function Notifications({ mockStudents }: NotificationsProps) {
  const [notifications, setNotifications] = useState(mockNotifications);
  const [filter, setFilter] = useState<'all' | 'unread' | 'urgent' | 'today'>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const markAsRead = (id: number) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, isRead: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, isRead: true }))
    );
  };

  const deleteNotification = (id: number) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const filteredNotifications = notifications.filter(notif => {
    if (filter === 'unread' && notif.isRead) return false;
    if (filter === 'urgent' && notif.type !== 'urgent') return false;
    if (filter === 'today') {
      const today = new Date().toDateString();
      const notifDate = new Date(notif.timestamp).toDateString();
      if (today !== notifDate) return false;
    }
    if (selectedCategory !== 'all' && notif.category !== selectedCategory) return false;
    return true;
  });

  const stats = {
    total: notifications.length,
    unread: notifications.filter(n => !n.isRead).length,
    urgent: notifications.filter(n => n.type === 'urgent').length,
    actionRequired: notifications.filter(n => n.actionRequired && !n.isRead).length
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
            <div style={{ fontSize: '48px', marginBottom: '12px', opacity: 0.2, position: 'absolute', top: '16px', right: '20px' }}>🔔</div>
            <div style={{ fontSize: '14px', opacity: 0.9, marginBottom: '8px', fontWeight: '500' }}>Total Notifications</div>
            <div style={{ fontSize: '36px', fontWeight: '800', marginBottom: '6px' }}>{stats.total}</div>
            <div style={{ fontSize: '13px', opacity: 0.8 }}>All messages</div>
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
            <div style={{ fontSize: '48px', marginBottom: '12px', opacity: 0.2, position: 'absolute', top: '16px', right: '20px' }}>📩</div>
            <div style={{ fontSize: '14px', opacity: 0.9, marginBottom: '8px', fontWeight: '500' }}>Unread</div>
            <div style={{ fontSize: '36px', fontWeight: '800', marginBottom: '6px' }}>{stats.unread}</div>
            <div style={{ fontSize: '13px', opacity: 0.8 }}>Need attention</div>
          </div>
        </AnimatedElement>

        <AnimatedElement animation="scaleIn" delay={300}>
          <div style={{
            background: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
            borderRadius: '16px',
            padding: '24px',
            color: 'white',
            boxShadow: '0 8px 32px rgba(255, 154, 158, 0.3)',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-4px) scale(1.02)';
            e.currentTarget.style.boxShadow = '0 12px 40px rgba(255, 154, 158, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0) scale(1)';
            e.currentTarget.style.boxShadow = '0 8px 32px rgba(255, 154, 158, 0.3)';
          }}
          >
            <div style={{ fontSize: '48px', marginBottom: '12px', opacity: 0.2, position: 'absolute', top: '16px', right: '20px' }}>🚨</div>
            <div style={{ fontSize: '14px', opacity: 0.9, marginBottom: '8px', fontWeight: '500' }}>Urgent</div>
            <div style={{ fontSize: '36px', fontWeight: '800', marginBottom: '6px' }}>{stats.urgent}</div>
            <div style={{ fontSize: '13px', opacity: 0.8 }}>Immediate action</div>
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
            <div style={{ fontSize: '48px', marginBottom: '12px', opacity: 0.2, position: 'absolute', top: '16px', right: '20px' }}>⚡</div>
            <div style={{ fontSize: '14px', opacity: 0.9, marginBottom: '8px', fontWeight: '500' }}>Action Required</div>
            <div style={{ fontSize: '36px', fontWeight: '800', marginBottom: '6px' }}>{stats.actionRequired}</div>
            <div style={{ fontSize: '13px', opacity: 0.8 }}>Tasks pending</div>
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
              Notification Center
            </h3>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                onClick={markAllAsRead}
                style={{
                  background: 'transparent',
                  color: COLORS.primary,
                  border: `1px solid ${COLORS.primary}`,
                  borderRadius: '8px',
                  padding: '8px 16px',
                  fontSize: '12px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = COLORS.primary;
                  e.currentTarget.style.color = 'white';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.color = COLORS.primary;
                }}
              >
                Mark All Read
              </button>
              <button
                style={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '8px 16px',
                  fontSize: '12px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-1px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                Settings
              </button>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', alignItems: 'end' }}>
            <div>
              <label style={{ fontSize: '12px', fontWeight: '600', color: '#64748b', marginBottom: '6px', display: 'block' }}>
                Filter
              </label>
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value as any)}
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '8px',
                  border: '1px solid #e2e8f0',
                  fontSize: '14px'
                }}
              >
                <option value="all">All Notifications</option>
                <option value="unread">Unread Only</option>
                <option value="urgent">Urgent Only</option>
                <option value="today">Today</option>
              </select>
            </div>

            <div>
              <label style={{ fontSize: '12px', fontWeight: '600', color: '#64748b', marginBottom: '6px', display: 'block' }}>
                Category
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '8px',
                  border: '1px solid #e2e8f0',
                  fontSize: '14px'
                }}
              >
                <option value="all">All Categories</option>
                <option value="session">Sessions</option>
                <option value="intervention">Interventions</option>
                <option value="student">Students</option>
                <option value="report">Reports</option>
                <option value="system">System</option>
              </select>
            </div>
          </div>
        </div>
      </AnimatedElement>

      {/* Notifications List */}
      <AnimatedElement animation="fadeIn" delay={300}>
        <div style={{ 
          background: '#fff', 
          borderRadius: '16px', 
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
          border: '1px solid #e2e8f0',
          overflow: 'hidden'
        }}>
          <div style={{ maxHeight: '600px', overflowY: 'auto' }}>
            {filteredNotifications.length > 0 ? (
              filteredNotifications.map((notification, index) => (
                <AnimatedElement key={notification.id} animation="slideInUp" delay={100 + index * 50}>
                  <div style={{
                    padding: '20px 24px',
                    borderBottom: index < filteredNotifications.length - 1 ? '1px solid #f1f5f9' : 'none',
                    transition: 'all 0.2s ease',
                    cursor: 'pointer',
                    background: notification.isRead ? 'transparent' : '#f8fafc',
                    borderLeft: `4px solid ${getTypeColor(notification.type)}`
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#f8fafc';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = notification.isRead ? 'transparent' : '#f8fafc';
                  }}
                  onClick={() => markAsRead(notification.id)}
                  >
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                      <div style={{
                        background: `${getTypeColor(notification.type)}15`,
                        borderRadius: '12px',
                        padding: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        minWidth: '48px',
                        height: '48px'
                      }}>
                        <span style={{ fontSize: '20px' }}>
                          {getCategoryIcon(notification.category)}
                        </span>
                      </div>

                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'between', marginBottom: '8px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <h4 style={{ 
                              fontSize: '16px', 
                              fontWeight: notification.isRead ? '500' : '700', 
                              color: '#1a202c', 
                              margin: 0 
                            }}>
                              {notification.title}
                            </h4>
                            {!notification.isRead && (
                              <div style={{
                                width: '8px',
                                height: '8px',
                                borderRadius: '50%',
                                background: getTypeColor(notification.type)
                              }} />
                            )}
                            <span style={{
                              padding: '2px 6px',
                              borderRadius: '8px',
                              fontSize: '10px',
                              fontWeight: '600',
                              textTransform: 'uppercase',
                              background: `${getTypeColor(notification.type)}15`,
                              color: getTypeColor(notification.type)
                            }}>
                              {notification.type}
                            </span>
                            {notification.actionRequired && (
                              <span style={{
                                padding: '2px 6px',
                                borderRadius: '8px',
                                fontSize: '10px',
                                fontWeight: '600',
                                textTransform: 'uppercase',
                                background: `${COLORS.warning}15`,
                                color: COLORS.warning
                              }}>
                                Action Required
                              </span>
                            )}
                          </div>
                          
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ fontSize: '12px', color: '#64748b' }}>
                              {formatTime(notification.timestamp)}
                            </span>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                deleteNotification(notification.id);
                              }}
                              style={{
                                background: 'transparent',
                                border: 'none',
                                color: '#64748b',
                                cursor: 'pointer',
                                padding: '4px',
                                borderRadius: '4px',
                                fontSize: '12px'
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.background = '#f1f5f9';
                                e.currentTarget.style.color = COLORS.danger;
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.background = 'transparent';
                                e.currentTarget.style.color = '#64748b';
                              }}
                            >
                              ✕
                            </button>
                          </div>
                        </div>

                        <p style={{ 
                          fontSize: '14px', 
                          color: '#64748b', 
                          margin: 0, 
                          lineHeight: '1.5',
                          opacity: notification.isRead ? 0.8 : 1
                        }}>
                          {notification.message}
                        </p>
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
                <div style={{ fontSize: '48px', marginBottom: '16px', opacity: 0.5 }}>🔔</div>
                No notifications found matching your criteria.
              </div>
            )}
          </div>
        </div>
      </AnimatedElement>
    </div>
  );
}
