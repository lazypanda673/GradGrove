

import React, { useState } from 'react';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Features', href: '#features' },
  { label: 'How It Works', href: '#howitworks' },
  { label: 'Team', href: '#team' },
  { label: 'Contact', href: '#contact' },
  { label: 'Login', href: '/login' }
];

function Landing() {
  const [hovered, setHovered] = useState(null);

  return (
    <div style={{ background: 'var(--color-background)', minHeight: '100vh', color: 'var(--color-text)', fontFamily: 'Segoe UI, Arial, sans-serif' }}>
      {/* Navbar */}
      <nav style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '18px 0', background: 'var(--color-primary)', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', position: 'sticky', top: 0, zIndex: 10 }}>
        <img src="/Brand_logo.png" alt="GradGrove Logo" style={{ width: 40, marginRight: 16 }} />
        {navLinks.map((link, idx) => (
          <a
            key={link.label}
            href={link.href}
            style={{
              color: '#fff',
              background: hovered === idx ? 'var(--color-secondary)' : 'transparent',
              padding: '8px 18px',
              margin: '0 6px',
              borderRadius: 6,
              fontWeight: hovered === idx ? 700 : 500,
              fontSize: '1.08rem',
              textDecoration: hovered === idx ? 'underline' : 'none',
              transition: 'all 0.2s',
              boxShadow: hovered === idx ? '0 2px 8px rgba(0,0,0,0.12)' : 'none',
              cursor: 'pointer',
              borderBottom: hovered === idx ? '2px solid #fff' : '2px solid transparent',
              letterSpacing: hovered === idx ? '0.5px' : 'normal',
              textShadow: hovered === idx ? '0 1px 8px rgba(0,0,0,0.18)' : 'none'
            }}
            onMouseEnter={() => setHovered(idx)}
            onMouseLeave={() => setHovered(null)}
          >
            {link.label}
          </a>
        ))}
      </nav>

      {/* Hero Section */}
      <header style={{ padding: '60px 0 30px 0', textAlign: 'center' }}>
        <img src="/Brand_logo.png" alt="GradGrove Logo" style={{ width: 80, marginBottom: 16 }} />
        <h1 style={{ color: 'var(--color-primary)', fontSize: '3rem', fontWeight: 700, marginBottom: 10 }}>GradGrove</h1>
        <h2 style={{ fontSize: '1.7rem', color: 'var(--color-secondary)', margin: '10px 0 0 0' }}>AI-based Drop-out Prediction & Counseling System</h2>
        <p style={{ maxWidth: 650, margin: '28px auto', fontSize: '1.18rem', color: 'var(--color-text)' }}>
          Welcome to the SIH 2025 prototype. Our platform leverages artificial intelligence to help students, mentors, and administrators identify drop-out risks early and provide personalized support.
        </p>
        <a href="/signup">
          <button className="btn" style={{ fontSize: '1.2rem', padding: '14px 38px', background: 'var(--color-primary)', color: '#fff', border: 'none', borderRadius: 8, cursor: 'pointer', marginTop: 18, boxShadow: '0 2px 8px rgba(0,0,0,0.08)', transition: 'background 0.2s' }}
            onMouseEnter={e => e.target.style.background = 'var(--color-secondary)'}
            onMouseLeave={e => e.target.style.background = 'var(--color-primary)'}
          >Get Started</button>
        </a>
      </header>

      {/* Features Section */}
      <section id="features" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 32, margin: '40px 0' }}>
        <div style={{ background: 'rgba(255,255,255,0.07)', borderRadius: 14, padding: 28, maxWidth: 340, boxShadow: '0 2px 8px rgba(0,0,0,0.04)', transition: 'transform 0.2s', cursor: 'pointer' }}
          onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.04)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}>
          <h3 style={{ color: 'var(--color-primary)' }}>For Students</h3>
          <ul style={{ textAlign: 'left', fontSize: '1.08rem', margin: '16px 0 0 0', paddingLeft: 20 }}>
            <li>Fill out surveys to assess your well-being</li>
            <li>Get personalized recommendations</li>
            <li>Access resources and support</li>
            <li>Track your progress and achievements</li>
          </ul>
        </div>
        <div style={{ background: 'rgba(255,255,255,0.07)', borderRadius: 14, padding: 28, maxWidth: 340, boxShadow: '0 2px 8px rgba(0,0,0,0.04)', transition: 'transform 0.2s', cursor: 'pointer' }}
          onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.04)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}>
          <h3 style={{ color: 'var(--color-primary)' }}>For Mentors & Counsellors</h3>
          <ul style={{ textAlign: 'left', fontSize: '1.08rem', margin: '16px 0 0 0', paddingLeft: 20 }}>
            <li>Monitor student progress</li>
            <li>Identify at-risk students</li>
            <li>Provide timely interventions</li>
            <li>Access analytics and reports</li>
          </ul>
        </div>
        <div style={{ background: 'rgba(255,255,255,0.07)', borderRadius: 14, padding: 28, maxWidth: 340, boxShadow: '0 2px 8px rgba(0,0,0,0.04)', transition: 'transform 0.2s', cursor: 'pointer' }}
          onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.04)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}>
          <h3 style={{ color: 'var(--color-primary)' }}>For Admins</h3>
          <ul style={{ textAlign: 'left', fontSize: '1.08rem', margin: '16px 0 0 0', paddingLeft: 20 }}>
            <li>View analytics and reports</li>
            <li>Manage users and permissions</li>
            <li>Track overall well-being trends</li>
            <li>Configure platform settings</li>
          </ul>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="howitworks" style={{ background: 'rgba(255,255,255,0.03)', borderRadius: 14, maxWidth: 900, margin: '40px auto', padding: 36, textAlign: 'center' }}>
        <h2 style={{ color: 'var(--color-primary)', fontSize: '2.1rem', marginBottom: 18 }}>How It Works</h2>
        <ol style={{ fontSize: '1.12rem', maxWidth: 700, margin: '0 auto 24px auto', color: 'var(--color-text)', textAlign: 'left', paddingLeft: 30 }}>
          <li>Students fill out regular surveys and forms</li>
          <li>AI analyzes responses and academic data</li>
          <li>Mentors and counsellors receive alerts for at-risk students</li>
          <li>Admins monitor overall trends and manage interventions</li>
        </ol>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 32 }}>
          <div style={{ minWidth: 180 }}>
            <img src="/logo512.png" alt="AI" style={{ width: 48, marginBottom: 8 }} />
            <div style={{ fontWeight: 600, color: 'var(--color-primary)' }}>AI-Powered Insights</div>
          </div>
          <div style={{ minWidth: 180 }}>
            <img src="/logo192.png" alt="Support" style={{ width: 48, marginBottom: 8 }} />
            <div style={{ fontWeight: 600, color: 'var(--color-primary)' }}>Personalized Counseling</div>
          </div>
          <div style={{ minWidth: 180 }}>
            <img src="/logo512.png" alt="Community" style={{ width: 48, marginBottom: 8 }} />
            <div style={{ fontWeight: 600, color: 'var(--color-primary)' }}>Community Well-being</div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" style={{ maxWidth: 900, margin: '40px auto', padding: 36, textAlign: 'center' }}>
        <h2 style={{ color: 'var(--color-primary)', fontSize: '2rem', marginBottom: 16 }}>Meet the Team</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 32 }}>
          <div style={{ background: 'rgba(255,255,255,0.07)', borderRadius: 12, padding: 24, minWidth: 180 }}>
            <img src="/logo192.png" alt="Team Member" style={{ width: 48, marginBottom: 8 }} />
            <div style={{ fontWeight: 600, color: 'var(--color-primary)' }}>Alice</div>
            <div style={{ fontSize: '0.98rem', color: 'var(--color-secondary)' }}>AI/ML Lead</div>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.07)', borderRadius: 12, padding: 24, minWidth: 180 }}>
            <img src="/logo512.png" alt="Team Member" style={{ width: 48, marginBottom: 8 }} />
            <div style={{ fontWeight: 600, color: 'var(--color-primary)' }}>Bob</div>
            <div style={{ fontSize: '0.98rem', color: 'var(--color-secondary)' }}>Frontend Developer</div>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.07)', borderRadius: 12, padding: 24, minWidth: 180 }}>
            <img src="/logo192.png" alt="Team Member" style={{ width: 48, marginBottom: 8 }} />
            <div style={{ fontWeight: 600, color: 'var(--color-primary)' }}>Charlie</div>
            <div style={{ fontSize: '0.98rem', color: 'var(--color-secondary)' }}>Backend Developer</div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" style={{ maxWidth: 900, margin: '40px auto', padding: 36, textAlign: 'center', background: 'rgba(255,255,255,0.03)', borderRadius: 14 }}>
        <h2 style={{ color: 'var(--color-primary)', fontSize: '2rem', marginBottom: 16 }}>Contact Us</h2>
        <p style={{ fontSize: '1.08rem', color: 'var(--color-text)', marginBottom: 18 }}>
          Have questions or feedback? Reach out to our team at <a href="mailto:gradgrove@sih2025.com" style={{ color: 'var(--color-secondary)', textDecoration: 'underline' }}>gradgrove@sih2025.com</a>
        </p>
        <form style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, maxWidth: 400, margin: '0 auto' }}>
          <input type="text" placeholder="Your Name" style={{ padding: '10px', borderRadius: 6, border: '1px solid #ccc', width: '100%' }} />
          <input type="email" placeholder="Your Email" style={{ padding: '10px', borderRadius: 6, border: '1px solid #ccc', width: '100%' }} />
          <textarea placeholder="Message" rows={4} style={{ padding: '10px', borderRadius: 6, border: '1px solid #ccc', width: '100%' }} />
          <button type="submit" style={{ fontSize: '1.08rem', padding: '10px 28px', background: 'var(--color-primary)', color: '#fff', border: 'none', borderRadius: 8, cursor: 'pointer', marginTop: 8 }}>Send</button>
        </form>
      </section>

      <footer style={{ textAlign: 'center', padding: '32px 0', color: 'var(--color-secondary)', fontSize: '0.95rem' }}>
        &copy; 2025 GradGrove Hackathon Prototype. All rights reserved.
      </footer>
    </div>
  );
}

export default Landing;
