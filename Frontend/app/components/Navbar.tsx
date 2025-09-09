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
        margin: 10,
        color: hover ? 'var(--color-secondary)' : '#fff',
        background: hover ? 'rgba(255,255,255,0.10)' : 'transparent',
        fontWeight: hover ? 700 : 500,
        fontSize: '1.08rem',
        textDecoration: 'none',
        borderRadius: 6,
        padding: '8px 18px',
        boxShadow: hover ? '0 2px 8px rgba(0,0,0,0.10)' : 'none',
        transition: 'all 0.18s',
        letterSpacing: hover ? '0.5px' : 'normal',
        cursor: 'pointer',
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
        padding: '8px 18px',
        cursor: 'pointer',
        background: hover ? 'var(--color-primary)' : 'transparent',
        color: hover ? '#fff' : '#222',
        fontWeight: hover ? 600 : 500,
        borderRadius: 6,
        transition: 'all 0.18s',
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <Link 
        href={to}
        style={{ 
          color: hover ? '#fff' : '#222', 
          textDecoration: 'none', 
          fontWeight: 'inherit' 
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
    <nav style={{ padding: "10px 32px", background: "var(--color-primary)", color: "var(--color-background)", display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', position: 'sticky', top: 0, zIndex: 100 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <span className="hover-scale transition-all" style={{ background: '#fff', borderRadius: '50%', padding: 4, boxShadow: '0 2px 8px #2222', display: 'inline-block' }}>
          <img src="/Brand_logo.png" alt="GradGrove Logo" style={{ width: 32, height: 32, display: 'block' }} />
        </span>
        <span style={{ fontWeight: 700, fontSize: '1.2rem', color: 'var(--color-background)' }}>GradGrove</span>
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
        {role && <span style={{ cursor: 'pointer', fontSize: 22 }} title="Notifications">🔔</span>}
        {/* Send Alert button for counsellor */}
        {role === "counsellor" && (
          <button
            className="btn"
            style={{ background: 'var(--color-secondary)', color: 'var(--color-background)', fontWeight: 600, borderRadius: 8, padding: '8px 20px', border: 'none', cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.10)', transition: 'background 0.2s' }}
            onMouseEnter={e => (e.target as HTMLButtonElement).style.background = 'var(--color-primary)'}
            onMouseLeave={e => (e.target as HTMLButtonElement).style.background = 'var(--color-secondary)'}
            onClick={() => alert('Alert sent to students!')}
          >
            Send Alert
          </button>
        )}
        {/* Profile picture */}
        {role && (
          <>
            <span style={{ cursor: 'pointer', borderRadius: '50%', overflow: 'hidden', width: 36, height: 36, display: 'inline-block', background: '#fff' }} onClick={() => setDropdownOpen(!dropdownOpen)}>
              <img src="/Brand_logo.png" alt="Profile" style={{ width: 36, height: 36, objectFit: 'cover' }} />
            </span>
            {/* Dropdown menu */}
            {dropdownOpen && (
              <div style={{ position: 'absolute', top: 48, right: 0, background: '#fff', color: '#222', borderRadius: 8, boxShadow: '0 2px 12px rgba(0,0,0,0.12)', minWidth: 180, zIndex: 100 }}>
                <ul style={{ listStyle: 'none', margin: 0, padding: '12px 0' }}>
                  <DropdownItem to="/profile">Profile Page</DropdownItem>
                  <DropdownItem to="/settings">Settings</DropdownItem>
                  <DropdownItem to="/help">Help</DropdownItem>
                  <DropdownItem to={`/${role}`}>Dashboard</DropdownItem>
                  <DropdownItem to="/logout">Logout</DropdownItem>
                </ul>
              </div>
            )}
          </>
        )}
      </div>
    </nav>
  );
}
