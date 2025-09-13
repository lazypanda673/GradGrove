'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface SidebarProps {
  role?: string;
  currentPage?: string;
  onPageChange?: (page: string) => void;
}

interface MenuItem {
  icon: string;
  label: string;
  href: string;
  isActive: boolean;
}

export default function Sidebar({ role = 'counsellor', currentPage = 'dashboard', onPageChange }: SidebarProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isPinned, setIsPinned] = useState(false);
  const router = useRouter();

  // Menu items based on role
  const getMenuItems = (): MenuItem[] => {
    const baseItems: MenuItem[] = [
      { icon: '📊', label: 'Dashboard', href: 'dashboard', isActive: false },
      { icon: '👥', label: 'Students', href: 'students', isActive: false },
      { icon: '📈', label: 'Analytics', href: 'analytics', isActive: false },
      { icon: '💬', label: 'Sessions', href: 'sessions', isActive: false },
      { icon: '🎯', label: 'Interventions', href: 'interventions', isActive: false },
      { icon: '📅', label: 'Schedule', href: 'schedule', isActive: false },
      { icon: '⚙️', label: 'Settings', href: 'settings', isActive: false },
      { icon: '🔔', label: 'Notifications', href: 'notifications', isActive: false },
    ];

    return baseItems.map(item => ({
      ...item,
      isActive: currentPage === item.href
    }));
  };

  // Logout function
  const handleLogout = () => {
    // In a real app, this would clear tokens, redirect to login, etc.
    if (confirm('Are you sure you want to logout?')) {
      // Clear any stored authentication data
      localStorage.removeItem('userToken');
      localStorage.removeItem('userRole');
      // Redirect to login page
      window.location.href = '/login';
    }
  };

  const menuItems = getMenuItems();

  // Handle click outside to close sidebar if not pinned
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const sidebar = document.getElementById('sidebar');
      if (sidebar && !sidebar.contains(event.target as Node) && !isPinned && isExpanded) {
        setIsExpanded(false);
      }
    };

    if (isExpanded && !isPinned) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isExpanded, isPinned]);

  const handleNavigation = (href: string) => {
    if (onPageChange) {
      onPageChange(href);
    }
    // Keep sidebar open after navigation - user can close manually if needed
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isExpanded && !isPinned && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 40,
            display: window.innerWidth < 1024 ? 'block' : 'none'
          }}
          onClick={() => setIsExpanded(false)}
        />
      )}

      {/* Sidebar */}
      <div 
        id="sidebar"
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          height: '100vh',
          background: 'linear-gradient(180deg, #1e3a8a 0%, #1e40af 50%, #1e3a8a 100%)',
          color: 'white',
          zIndex: 50,
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          width: isExpanded ? '256px' : '64px'
        }}
      >
        {/* Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '16px',
          borderBottom: '1px solid #1e40af'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              style={{
                padding: '8px',
                borderRadius: '8px',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                transition: 'background-color 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#1e40af';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              <div style={{
                width: '20px',
                height: '20px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                gap: '4px'
              }}>
                <div style={{
                  width: '100%',
                  height: '2px',
                  backgroundColor: 'white',
                  borderRadius: '1px',
                  transition: 'all 0.3s ease'
                }} />
                <div style={{
                  width: '100%',
                  height: '2px',
                  backgroundColor: 'white',
                  borderRadius: '1px',
                  transition: 'all 0.3s ease'
                }} />
                <div style={{
                  width: '100%',
                  height: '2px',
                  backgroundColor: 'white',
                  borderRadius: '1px',
                  transition: 'all 0.3s ease'
                }} />
              </div>
            </button>
            
            {isExpanded && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{
                  fontSize: '20px',
                  fontWeight: 'bold',
                  background: 'linear-gradient(135deg, #fbbf24, #f59e0b)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}>
                  GradGrove Analytics
                </div>
                <button
                  onClick={() => setIsPinned(!isPinned)}
                  style={{
                    padding: '4px',
                    borderRadius: '4px',
                    background: 'transparent',
                    border: 'none',
                    color: isPinned ? '#fbbf24' : 'white',
                    cursor: 'pointer',
                    transition: 'color 0.2s ease'
                  }}
                  title={isPinned ? 'Unpin Sidebar' : 'Pin Sidebar'}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = isPinned ? '#f59e0b' : '#d1d5db';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = isPinned ? '#fbbf24' : 'white';
                  }}
                >
                  📌
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Navigation Menu */}
        <nav style={{ flex: 1, paddingTop: '32px', paddingBottom: '32px', display: 'flex', flexDirection: 'column' }}>
          <ul style={{ listStyle: 'none', margin: 0, padding: '0 8px', flex: 1 }}>
            {menuItems.map((item, index) => (
              <li key={index} style={{ marginBottom: '8px' }}>
                <button
                  onClick={() => handleNavigation(item.href)}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: isExpanded ? '10px 12px' : '10px 8px',
                    borderRadius: '10px',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    position: 'relative',
                    background: item.isActive 
                      ? 'rgba(255, 255, 255, 0.12)' 
                      : 'transparent',
                    color: item.isActive ? '#fbbf24' : 'white',
                    fontSize: '14px',
                    textAlign: 'left',
                    overflow: 'hidden'
                  }}
                  onMouseEnter={(e) => {
                    if (!item.isActive) {
                      e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!item.isActive) {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }
                  }}
                >
                  {/* Symmetric left accent line for active state */}
                  {item.isActive && (
                    <div style={{
                      position: 'absolute',
                      left: '0',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      width: '4px',
                      height: '20px',
                      background: '#fbbf24',
                      borderRadius: '0 2px 2px 0'
                    }} />
                  )}
                  
                  <span style={{
                    fontSize: '18px',
                    flexShrink: 0,
                    width: isExpanded ? '24px' : '100%',
                    textAlign: 'center',
                    marginLeft: isExpanded ? '8px' : '0'
                  }}>
                    {item.icon}
                  </span>
                  {isExpanded && (
                    <span style={{
                      fontWeight: item.isActive ? '600' : '500',
                      fontSize: '14px',
                      flex: 1,
                      marginRight: '8px'
                    }}>
                      {item.label}
                    </span>
                  )}
                  
                  {/* Symmetric right accent line for active state */}
                  {item.isActive && (
                    <div style={{
                      position: 'absolute',
                      right: '0',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      width: '4px',
                      height: '20px',
                      background: '#fbbf24',
                      borderRadius: '2px 0 0 2px'
                    }} />
                  )}
                </button>
              </li>
            ))}
          </ul>
          
          {/* Logout Button */}
          <div style={{ padding: '0 8px', marginTop: 'auto' }}>
            <button
              onClick={handleLogout}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: isExpanded ? '10px 12px' : '10px 8px',
                borderRadius: '10px',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                background: 'transparent',
                color: '#fbbf24',
                fontSize: '14px',
                fontWeight: '500'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
              }}
            >
              <span style={{
                fontSize: '18px',
                flexShrink: 0,
                width: isExpanded ? '24px' : '100%',
                textAlign: 'center',
                marginLeft: isExpanded ? '4px' : '0'
              }}>
                🚪
              </span>
              {isExpanded && (
                <span>Logout</span>
              )}
            </button>
          </div>
        </nav>

        {/* Footer */}
        <div style={{
          padding: '16px',
          borderTop: '1px solid #1e40af'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '32px',
              height: '32px',
              background: 'linear-gradient(135deg, #fbbf24, #f59e0b)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#1e3a8a',
              fontWeight: 'bold'
            }}>
              C
            </div>
            {isExpanded && (
              <div>
                <div style={{ fontWeight: '500' }}>Counselor</div>
                <div style={{
                  fontSize: '14px',
                  color: '#93c5fd',
                  textTransform: 'capitalize'
                }}>
                  {role}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content Spacer */}
      <div style={{
        transition: 'all 0.3s ease',
        marginLeft: isPinned && isExpanded ? '256px' : isPinned ? '64px' : '0'
      }}>
        {/* This div ensures content doesn't overlap with pinned sidebar */}
      </div>
    </>
  );
}
