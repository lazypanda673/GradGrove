"use client";
import React, { useState } from "react";
// Next.js uses <Link> from 'next/link', not 'react-router-dom'
import Link from "next/link";

export function NavLink({ to, children }: { to: string; children: React.ReactNode }) {
  const [hover, setHover] = useState(false);
  return (
    <Link
      href={to}
      style={{
        margin: 8,
        color: hover ? '#fff' : 'rgba(255,255,255,0.9)',
        background: hover ? 'rgba(255,255,255,0.15)' : 'transparent',
        fontWeight: hover ? 600 : 500,
        fontSize: '1rem',
        textDecoration: 'none',
        borderRadius: 10,
        padding: '10px 20px',
        boxShadow: hover ? '0 4px 12px rgba(0,0,0,0.15)' : 'none',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        letterSpacing: hover ? '0.3px' : 'normal',
        cursor: 'pointer',
        border: hover ? '1px solid rgba(255,255,255,0.2)' : '1px solid transparent',
        transform: hover ? 'translateY(-2px)' : 'translateY(0)',
        backdropFilter: hover ? 'blur(10px)' : 'none'
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {children}
    </Link>
  );
}

export function DropdownItem({ to, children }: { to: string; children: React.ReactNode }) {
  const [hover, setHover] = useState(false);
  return (
    <li
      style={{
        padding: '12px 16px',
        cursor: 'pointer',
        background: hover ? 'linear-gradient(135deg, var(--color-primary), #4f46e5)' : 'transparent',
        color: hover ? '#fff' : '#374151',
        fontWeight: hover ? 600 : 500,
        borderRadius: 8,
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        margin: '4px 0',
        transform: hover ? 'translateX(4px)' : 'translateX(0)',
        boxShadow: hover ? '0 4px 12px rgba(99, 102, 241, 0.3)' : 'none'
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <Link 
        href={to}
        style={{ 
          color: hover ? '#fff' : '#374151', 
          textDecoration: 'none', 
          fontWeight: 'inherit',
          fontSize: '14px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}
      >
        {children}
      </Link>
    </li>
  );
}

export default function Navbar({ role }: { role?: string }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  return (
    <>
      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        @keyframes slideInDown {
          0% { 
            opacity: 0; 
            transform: translateY(-10px); 
          }
          100% { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }
      `}</style>
      <nav style={{ 
      padding: "16px 32px", 
      background: "linear-gradient(135deg, var(--color-primary), #4f46e5)", 
      color: "var(--color-background)", 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'space-between', 
      boxShadow: '0 4px 20px rgba(0,0,0,0.12), 0 1px 4px rgba(0,0,0,0.08)', 
      position: 'sticky', 
      top: 0, 
      zIndex: 100,
      backdropFilter: 'blur(10px)',
      borderBottom: '1px solid rgba(255,255,255,0.1)'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <span 
          style={{ 
            background: 'rgba(255,255,255,0.15)', 
            borderRadius: '50%', 
            padding: 8, 
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)', 
            display: 'inline-block',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            cursor: 'pointer'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.1) rotate(5deg)';
            e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,0,0,0.2)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1) rotate(0deg)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
          }}
        >
          <img src="/Brand_logo.png" alt="GradGrove Logo" style={{ width: 36, height: 36, display: 'block' }} />
        </span>
        <span style={{ 
          fontWeight: 700, 
          fontSize: '1.4rem', 
          color: 'var(--color-background)',
          background: 'linear-gradient(135deg, #fff, #e2e8f0)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          letterSpacing: '0.5px'
        }}>
          GradGrove
        </span>
      </div>
      <div style={{ display: 'flex', gap: 8 }}>
        {role === "admin" && <NavLink to="/admin">Admin Dashboard</NavLink>}
        {role === "mentor" && <NavLink to="/mentor">Mentor Dashboard</NavLink>}
        {role === "student" && <NavLink to="/student">Student Dashboard</NavLink>}
        {role === "counsellor" && <NavLink to="/counsellor">Counsellor Dashboard</NavLink>}
        {!role && (
          <>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/#features">Features</NavLink>
            <NavLink to="/#team">Team</NavLink>
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/signup">Sign Up</NavLink>
          </>
        )}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 18, position: 'relative' }}>
        {/* Notification icon */}
        {role && (
          <span 
            style={{ 
              cursor: 'pointer', 
              fontSize: 22, 
              padding: '8px', 
              borderRadius: '50%', 
              background: 'rgba(255,255,255,0.1)', 
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              position: 'relative'
            }} 
            title="Notifications"
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.2)';
              e.currentTarget.style.transform = 'scale(1.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            🔔
            {/* Notification badge */}
            <span style={{
              position: 'absolute',
              top: '4px',
              right: '4px',
              background: '#ef4444',
              borderRadius: '50%',
              width: '8px',
              height: '8px',
              fontSize: '10px',
              animation: 'pulse 2s infinite'
            }}></span>
          </span>
        )}
        {/* Send Alert button for counsellor */}
        {role === "counsellor" && (
          <button
            style={{ 
              background: 'linear-gradient(135deg, var(--color-secondary), #06b6d4)', 
              color: 'var(--color-background)', 
              fontWeight: 600, 
              borderRadius: 10, 
              padding: '10px 20px', 
              border: 'none', 
              cursor: 'pointer', 
              boxShadow: '0 4px 12px rgba(6, 182, 212, 0.3)', 
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              fontSize: '14px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
            onMouseEnter={e => {
              (e.target as HTMLButtonElement).style.transform = 'translateY(-2px) scale(1.02)';
              (e.target as HTMLButtonElement).style.boxShadow = '0 8px 20px rgba(6, 182, 212, 0.4)';
            }}
            onMouseLeave={e => {
              (e.target as HTMLButtonElement).style.transform = 'translateY(0) scale(1)';
              (e.target as HTMLButtonElement).style.boxShadow = '0 4px 12px rgba(6, 182, 212, 0.3)';
            }}
            onClick={() => alert('Alert sent to students!')}
          >
            <span style={{ fontSize: '16px' }}>📢</span>
            Send Alert
          </button>
        )}
        {/* Profile picture */}
        {role && (
          <>
            <span 
              style={{ 
                cursor: 'pointer', 
                borderRadius: '50%', 
                overflow: 'hidden', 
                width: 40, 
                height: 40, 
                display: 'inline-block', 
                background: 'linear-gradient(135deg, rgba(255,255,255,0.2), rgba(255,255,255,0.1))', 
                border: '2px solid rgba(255,255,255,0.3)',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
              }} 
              onClick={() => setDropdownOpen(!dropdownOpen)}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.1)';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,0,0,0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
              }}
            >
              <img src="/Brand_logo.png" alt="Profile" style={{ width: 36, height: 36, objectFit: 'cover', margin: '2px' }} />
            </span>
            {/* Dropdown menu */}
            {dropdownOpen && (
              <div style={{ 
                position: 'absolute', 
                top: 56, 
                right: 0, 
                background: 'rgba(255,255,255,0.95)', 
                backdropFilter: 'blur(20px)',
                color: '#222', 
                borderRadius: 12, 
                boxShadow: '0 8px 32px rgba(0,0,0,0.15)', 
                minWidth: 200, 
                zIndex: 100,
                border: '1px solid rgba(255,255,255,0.3)',
                animation: 'slideInDown 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
              }}>
                <ul style={{ listStyle: 'none', margin: 0, padding: '16px 8px' }}>
                  <DropdownItem to="/profile">👤 Profile Page</DropdownItem>
                  <DropdownItem to="/settings">⚙️ Settings</DropdownItem>
                  <DropdownItem to="/help">❓ Help</DropdownItem>
                  <DropdownItem to={`/${role}`}>📊 Dashboard</DropdownItem>
                  <DropdownItem to="/logout">🚪 Logout</DropdownItem>
                </ul>
              </div>
            )}
          </>
        )}
      </div>
    </nav>
    </>
  );
}
