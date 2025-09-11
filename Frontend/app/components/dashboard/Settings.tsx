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

interface SettingsProps {
  mockStudents: Student[];
}

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

export default function Settings({ mockStudents }: SettingsProps) {
  const [activeTab, setActiveTab] = useState<'profile' | 'preferences' | 'notifications' | 'security' | 'system'>('profile');
  const [profileData, setProfileData] = useState({
    name: 'Dr. Sarah Johnson',
    email: 'sarah.johnson@gradgrove.edu',
    phone: '+1 (555) 123-4567',
    department: 'Student Counseling',
    specialization: 'Career Guidance & Academic Support',
    experience: '8 years',
    bio: 'Experienced counselor specializing in career guidance and academic support for engineering students.'
  });

  const [preferences, setPreferences] = useState({
    language: 'en',
    timezone: 'EST',
    theme: 'light',
    dashboardLayout: 'default',
    defaultView: 'dashboard',
    itemsPerPage: 10
  });

  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    sessionReminders: true,
    reportAlerts: true,
    systemUpdates: false,
    newStudentAlerts: true,
    urgentInterventions: true
  });

  const [security, setSecurity] = useState({
    twoFactorAuth: false,
    sessionTimeout: 30,
    loginAlerts: true,
    passwordLastChanged: '2024-01-15',
    lastLogin: '2024-01-24 09:30 AM'
  });

  const tabs = [
    { key: 'profile', label: 'Profile', icon: '👤' },
    { key: 'preferences', label: 'Preferences', icon: '⚙️' },
    { key: 'notifications', label: 'Notifications', icon: '🔔' },
    { key: 'security', label: 'Security', icon: '🔒' },
    { key: 'system', label: 'System', icon: '💻' }
  ];

  const handleSave = () => {
    // Implement save functionality
    console.log('Settings saved');
  };

  return (
    <div style={{ padding: '0', maxWidth: '100%' }}>
      {/* Header */}
      <AnimatedElement animation="fadeIn" delay={100}>
        <div style={{ marginBottom: '24px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#1a202c', marginBottom: '8px' }}>
            Settings & Preferences
          </h2>
          <p style={{ color: '#64748b' }}>
            Manage your account settings, preferences, and system configuration
          </p>
        </div>
      </AnimatedElement>

      <div style={{ display: 'flex', gap: '24px' }}>
        {/* Sidebar Navigation */}
        <AnimatedElement animation="slideInLeft" delay={200}>
          <div style={{ width: '280px', minWidth: '280px' }}>
            <div style={{ 
              background: '#fff', 
              borderRadius: '16px', 
              padding: '20px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
              border: '1px solid #e2e8f0',
              position: 'sticky',
              top: '20px'
            }}>
              <nav>
                {tabs.map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key as any)}
                    style={{
                      width: '100%',
                      padding: '16px',
                      borderRadius: '12px',
                      border: 'none',
                      background: activeTab === tab.key ? `${COLORS.primary}15` : 'transparent',
                      color: activeTab === tab.key ? COLORS.primary : '#64748b',
                      fontSize: '14px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      textAlign: 'left',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      marginBottom: '8px'
                    }}
                    onMouseEnter={(e) => {
                      if (activeTab !== tab.key) {
                        e.currentTarget.style.background = '#f8fafc';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (activeTab !== tab.key) {
                        e.currentTarget.style.background = 'transparent';
                      }
                    }}
                  >
                    <span style={{ fontSize: '18px' }}>{tab.icon}</span>
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>
          </div>
        </AnimatedElement>

        {/* Main Content */}
        <div style={{ flex: 1 }}>
          {/* Profile Settings */}
          {activeTab === 'profile' && (
            <AnimatedElement animation="fadeIn" delay={300}>
              <div style={{ 
                background: '#fff', 
                borderRadius: '16px', 
                padding: '32px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                border: '1px solid #e2e8f0'
              }}>
                <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#1a202c', marginBottom: '24px' }}>
                  Profile Information
                </h3>

                {/* Profile Picture */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '32px' }}>
                  <div style={{
                    width: '80px',
                    height: '80px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '32px',
                    fontWeight: '700'
                  }}>
                    SJ
                  </div>
                  <div>
                    <button style={{
                      background: COLORS.primary,
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      padding: '10px 20px',
                      fontSize: '14px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      marginRight: '12px'
                    }}>
                      Change Photo
                    </button>
                    <button style={{
                      background: 'transparent',
                      color: '#64748b',
                      border: '1px solid #e2e8f0',
                      borderRadius: '8px',
                      padding: '10px 20px',
                      fontSize: '14px',
                      fontWeight: '600',
                      cursor: 'pointer'
                    }}>
                      Remove
                    </button>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
                  <div>
                    <label style={{ fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px', display: 'block' }}>
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={profileData.name}
                      onChange={(e) => setProfileData({...profileData, name: e.target.value})}
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
                    <label style={{ fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px', display: 'block' }}>
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData({...profileData, email: e.target.value})}
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
                    <label style={{ fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px', display: 'block' }}>
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={profileData.phone}
                      onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
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
                    <label style={{ fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px', display: 'block' }}>
                      Department
                    </label>
                    <input
                      type="text"
                      value={profileData.department}
                      onChange={(e) => setProfileData({...profileData, department: e.target.value})}
                      style={{
                        width: '100%',
                        padding: '12px',
                        borderRadius: '8px',
                        border: '1px solid #e2e8f0',
                        fontSize: '14px'
                      }}
                    />
                  </div>

                  <div style={{ gridColumn: '1 / -1' }}>
                    <label style={{ fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px', display: 'block' }}>
                      Specialization
                    </label>
                    <input
                      type="text"
                      value={profileData.specialization}
                      onChange={(e) => setProfileData({...profileData, specialization: e.target.value})}
                      style={{
                        width: '100%',
                        padding: '12px',
                        borderRadius: '8px',
                        border: '1px solid #e2e8f0',
                        fontSize: '14px'
                      }}
                    />
                  </div>

                  <div style={{ gridColumn: '1 / -1' }}>
                    <label style={{ fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px', display: 'block' }}>
                      Bio
                    </label>
                    <textarea
                      value={profileData.bio}
                      onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                      rows={4}
                      style={{
                        width: '100%',
                        padding: '12px',
                        borderRadius: '8px',
                        border: '1px solid #e2e8f0',
                        fontSize: '14px',
                        resize: 'vertical'
                      }}
                    />
                  </div>
                </div>
              </div>
            </AnimatedElement>
          )}

          {/* Preferences Settings */}
          {activeTab === 'preferences' && (
            <AnimatedElement animation="fadeIn" delay={300}>
              <div style={{ 
                background: '#fff', 
                borderRadius: '16px', 
                padding: '32px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                border: '1px solid #e2e8f0'
              }}>
                <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#1a202c', marginBottom: '24px' }}>
                  Application Preferences
                </h3>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
                  <div>
                    <label style={{ fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px', display: 'block' }}>
                      Language
                    </label>
                    <select
                      value={preferences.language}
                      onChange={(e) => setPreferences({...preferences, language: e.target.value})}
                      style={{
                        width: '100%',
                        padding: '12px',
                        borderRadius: '8px',
                        border: '1px solid #e2e8f0',
                        fontSize: '14px'
                      }}
                    >
                      <option value="en">English</option>
                      <option value="es">Spanish</option>
                      <option value="fr">French</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px', display: 'block' }}>
                      Timezone
                    </label>
                    <select
                      value={preferences.timezone}
                      onChange={(e) => setPreferences({...preferences, timezone: e.target.value})}
                      style={{
                        width: '100%',
                        padding: '12px',
                        borderRadius: '8px',
                        border: '1px solid #e2e8f0',
                        fontSize: '14px'
                      }}
                    >
                      <option value="EST">Eastern Time (EST)</option>
                      <option value="CST">Central Time (CST)</option>
                      <option value="PST">Pacific Time (PST)</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px', display: 'block' }}>
                      Theme
                    </label>
                    <select
                      value={preferences.theme}
                      onChange={(e) => setPreferences({...preferences, theme: e.target.value})}
                      style={{
                        width: '100%',
                        padding: '12px',
                        borderRadius: '8px',
                        border: '1px solid #e2e8f0',
                        fontSize: '14px'
                      }}
                    >
                      <option value="light">Light</option>
                      <option value="dark">Dark</option>
                      <option value="auto">Auto</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px', display: 'block' }}>
                      Default Dashboard View
                    </label>
                    <select
                      value={preferences.defaultView}
                      onChange={(e) => setPreferences({...preferences, defaultView: e.target.value})}
                      style={{
                        width: '100%',
                        padding: '12px',
                        borderRadius: '8px',
                        border: '1px solid #e2e8f0',
                        fontSize: '14px'
                      }}
                    >
                      <option value="dashboard">Dashboard</option>
                      <option value="students">Students</option>
                      <option value="analytics">Analytics</option>
                    </select>
                  </div>
                </div>
              </div>
            </AnimatedElement>
          )}

          {/* Notifications Settings */}
          {activeTab === 'notifications' && (
            <AnimatedElement animation="fadeIn" delay={300}>
              <div style={{ 
                background: '#fff', 
                borderRadius: '16px', 
                padding: '32px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                border: '1px solid #e2e8f0'
              }}>
                <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#1a202c', marginBottom: '24px' }}>
                  Notification Preferences
                </h3>

                <div style={{ display: 'grid', gap: '20px' }}>
                  {Object.entries(notifications).map(([key, value]) => (
                    <div key={key} style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'between',
                      padding: '16px',
                      borderRadius: '8px',
                      border: '1px solid #e2e8f0'
                    }}>
                      <div>
                        <div style={{ fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '4px' }}>
                          {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                        </div>
                        <div style={{ fontSize: '13px', color: '#64748b' }}>
                          {key === 'emailNotifications' && 'Receive notifications via email'}
                          {key === 'smsNotifications' && 'Receive notifications via SMS'}
                          {key === 'pushNotifications' && 'Receive push notifications in browser'}
                          {key === 'sessionReminders' && 'Get reminders for upcoming sessions'}
                          {key === 'reportAlerts' && 'Alerts for new reports and analytics'}
                          {key === 'systemUpdates' && 'Notifications about system updates'}
                          {key === 'newStudentAlerts' && 'Alerts when new students are added'}
                          {key === 'urgentInterventions' && 'Immediate alerts for urgent interventions'}
                        </div>
                      </div>
                      <label style={{ 
                        position: 'relative',
                        display: 'inline-block',
                        width: '48px',
                        height: '24px'
                      }}>
                        <input
                          type="checkbox"
                          checked={value}
                          onChange={(e) => setNotifications({...notifications, [key]: e.target.checked})}
                          style={{ opacity: 0, width: 0, height: 0 }}
                        />
                        <span style={{
                          position: 'absolute',
                          cursor: 'pointer',
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          background: value ? COLORS.primary : '#ccc',
                          borderRadius: '24px',
                          transition: '0.4s',
                          transform: 'translate3d(0, 0, 0)',
                        }}>
                          <span style={{
                            position: 'absolute',
                            content: '',
                            height: '18px',
                            width: '18px',
                            left: value ? '27px' : '3px',
                            bottom: '3px',
                            background: 'white',
                            borderRadius: '50%',
                            transition: '0.4s',
                            transform: 'translate3d(0, 0, 0)',
                          }} />
                        </span>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedElement>
          )}

          {/* Security Settings */}
          {activeTab === 'security' && (
            <AnimatedElement animation="fadeIn" delay={300}>
              <div style={{ 
                background: '#fff', 
                borderRadius: '16px', 
                padding: '32px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                border: '1px solid #e2e8f0'
              }}>
                <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#1a202c', marginBottom: '24px' }}>
                  Security Settings
                </h3>

                <div style={{ display: 'grid', gap: '24px' }}>
                  <div style={{ 
                    padding: '20px',
                    borderRadius: '12px',
                    border: '1px solid #e2e8f0',
                    background: '#f8fafc'
                  }}>
                    <h4 style={{ fontSize: '16px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>
                      Password Security
                    </h4>
                    <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '16px' }}>
                      Last changed: {security.passwordLastChanged}
                    </p>
                    <button style={{
                      background: COLORS.primary,
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      padding: '10px 20px',
                      fontSize: '14px',
                      fontWeight: '600',
                      cursor: 'pointer'
                    }}>
                      Change Password
                    </button>
                  </div>

                  <div style={{ 
                    padding: '20px',
                    borderRadius: '12px',
                    border: '1px solid #e2e8f0'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'between' }}>
                      <div>
                        <h4 style={{ fontSize: '16px', fontWeight: '600', color: '#374151', marginBottom: '4px' }}>
                          Two-Factor Authentication
                        </h4>
                        <p style={{ fontSize: '14px', color: '#64748b', margin: 0 }}>
                          Add an extra layer of security to your account
                        </p>
                      </div>
                      <button style={{
                        background: security.twoFactorAuth ? COLORS.success : COLORS.primary,
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        padding: '10px 20px',
                        fontSize: '14px',
                        fontWeight: '600',
                        cursor: 'pointer'
                      }}>
                        {security.twoFactorAuth ? 'Enabled' : 'Enable'}
                      </button>
                    </div>
                  </div>

                  <div style={{ 
                    padding: '20px',
                    borderRadius: '12px',
                    border: '1px solid #e2e8f0'
                  }}>
                    <h4 style={{ fontSize: '16px', fontWeight: '600', color: '#374151', marginBottom: '12px' }}>
                      Login Activity
                    </h4>
                    <div style={{ fontSize: '14px', color: '#64748b' }}>
                      <p>Last login: {security.lastLogin}</p>
                      <p>Session timeout: {security.sessionTimeout} minutes</p>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedElement>
          )}

          {/* System Settings */}
          {activeTab === 'system' && (
            <AnimatedElement animation="fadeIn" delay={300}>
              <div style={{ 
                background: '#fff', 
                borderRadius: '16px', 
                padding: '32px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                border: '1px solid #e2e8f0'
              }}>
                <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#1a202c', marginBottom: '24px' }}>
                  System Information
                </h3>

                <div style={{ display: 'grid', gap: '20px' }}>
                  <div style={{ 
                    padding: '20px',
                    borderRadius: '12px',
                    border: '1px solid #e2e8f0',
                    background: '#f8fafc'
                  }}>
                    <h4 style={{ fontSize: '16px', fontWeight: '600', color: '#374151', marginBottom: '12px' }}>
                      Application Version
                    </h4>
                    <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '8px' }}>
                      GradGrove Counseling Platform v2.1.0
                    </p>
                    <p style={{ fontSize: '13px', color: '#64748b' }}>
                      Last updated: January 20, 2024
                    </p>
                  </div>

                  <div style={{ 
                    padding: '20px',
                    borderRadius: '12px',
                    border: '1px solid #e2e8f0'
                  }}>
                    <h4 style={{ fontSize: '16px', fontWeight: '600', color: '#374151', marginBottom: '12px' }}>
                      Data Management
                    </h4>
                    <div style={{ display: 'flex', gap: '12px' }}>
                      <button style={{
                        background: COLORS.accent,
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        padding: '10px 20px',
                        fontSize: '14px',
                        fontWeight: '600',
                        cursor: 'pointer'
                      }}>
                        Export Data
                      </button>
                      <button style={{
                        background: COLORS.warning,
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        padding: '10px 20px',
                        fontSize: '14px',
                        fontWeight: '600',
                        cursor: 'pointer'
                      }}>
                        Backup Settings
                      </button>
                    </div>
                  </div>

                  <div style={{ 
                    padding: '20px',
                    borderRadius: '12px',
                    border: '1px solid #e2e8f0'
                  }}>
                    <h4 style={{ fontSize: '16px', fontWeight: '600', color: '#374151', marginBottom: '12px' }}>
                      Support & Help
                    </h4>
                    <div style={{ display: 'flex', gap: '12px' }}>
                      <button style={{
                        background: COLORS.success,
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        padding: '10px 20px',
                        fontSize: '14px',
                        fontWeight: '600',
                        cursor: 'pointer'
                      }}>
                        Contact Support
                      </button>
                      <button style={{
                        background: 'transparent',
                        color: COLORS.primary,
                        border: `1px solid ${COLORS.primary}`,
                        borderRadius: '8px',
                        padding: '10px 20px',
                        fontSize: '14px',
                        fontWeight: '600',
                        cursor: 'pointer'
                      }}>
                        View Documentation
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedElement>
          )}

          {/* Save Button */}
          <AnimatedElement animation="slideInUp" delay={400}>
            <div style={{ 
              background: '#fff', 
              borderRadius: '16px', 
              padding: '24px',
              marginTop: '24px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
              border: '1px solid #e2e8f0',
              display: 'flex',
              justifyContent: 'flex-end',
              gap: '12px'
            }}>
              <button style={{
                background: 'transparent',
                color: '#64748b',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                padding: '12px 24px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer'
              }}>
                Cancel
              </button>
              <button
                onClick={handleSave}
                style={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '12px 24px',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)',
                  transition: 'all 0.3s ease'
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
                Save Changes
              </button>
            </div>
          </AnimatedElement>
        </div>
      </div>
    </div>
  );
}
