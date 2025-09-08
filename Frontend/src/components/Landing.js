import React, { useState, useEffect } from 'react';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Features', href: '#features' },
  { label: 'How It Works', href: '#howitworks' },
  { label: 'Team', href: '#team' },
  { label: 'Contact', href: '#contact' },
  { label: 'Login', href: '/login' }
];

const carouselImages = [
  { src: 'https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&w=1600&q=80', alt: 'Students collaborating' },
  { src: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=1600&q=80', alt: 'Mentor guiding students' },
  { src: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=80', alt: 'Counseling session' },
  { src: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1600&q=80', alt: 'Analytics dashboard' },
  { src: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=1600&q=80', alt: 'Community support' }
];

function CarouselFade({ images, interval = 4500, children }) {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const timer = setTimeout(() => {
      setActive((active + 1) % images.length);
    }, interval);
    return () => clearTimeout(timer);
  }, [active, images.length, interval]);
  return (
    <div style={{ position: 'relative', width: '100%', height: 'calc(100vh - 70px)', maxWidth: '100vw', margin: 0, overflow: 'hidden', borderRadius: 0, boxShadow: '0 4px 24px #a3bffa22', background: '#fff' }}>
      {images.map((img, idx) => (
        <img
          key={img.src}
          src={img.src}
          alt={img.alt}
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: active === idx ? 1 : 0,
            transition: 'opacity 1s',
            zIndex: active === idx ? 2 : 1
          }}
        />
      ))}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', zIndex: 10, color: '#fff', textShadow: '0 2px 16px rgba(0,0,0,0.45)' }}>
        {children}
      </div>
      <button onClick={() => setActive((active - 1 + images.length) % images.length)} style={{ position: 'absolute', left: 24, top: '50%', transform: 'translateY(-50%)', background: 'rgba(0,0,0,0.18)', border: 'none', borderRadius: '50%', width: 44, height: 44, color: '#fff', fontSize: 28, cursor: 'pointer', zIndex: 20 }}>&lt;</button>
      <button onClick={() => setActive((active + 1) % images.length)} style={{ position: 'absolute', right: 24, top: '50%', transform: 'translateY(-50%)', background: 'rgba(0,0,0,0.18)', border: 'none', borderRadius: '50%', width: 44, height: 44, color: '#fff', fontSize: 28, cursor: 'pointer', zIndex: 20 }}>&gt;</button>
      <div style={{ position: 'absolute', bottom: 28, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 10, zIndex: 20 }}>
        {images.map((_, idx) => (
          <span key={idx} style={{ width: 14, height: 14, borderRadius: '50%', background: active === idx ? 'var(--color-primary)' : '#ccc', display: 'inline-block', transition: 'background 0.2s' }} />
        ))}
      </div>
    </div>
  );
}

function Landing() {
  const [hovered, setHovered] = useState(null);
  return (
    <div style={{ background: 'var(--color-background)', minHeight: '100vh', color: 'var(--color-text)', fontFamily: 'Segoe UI, Arial, sans-serif', position: 'relative', overflow: 'hidden' }}>
      {/* Abstract Art Background */}
      <svg style={{ position: 'absolute', top: -80, left: -120, zIndex: 0 }} width="600" height="320" viewBox="0 0 600 320" fill="none" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="300" cy="160" rx="280" ry="120" fill="var(--color-secondary)" opacity="0.12" />
        <ellipse cx="180" cy="80" rx="90" ry="40" fill="var(--color-primary)" opacity="0.18" />
        <ellipse cx="480" cy="220" rx="120" ry="60" fill="#a3bffa" opacity="0.13" />
      </svg>
      {/* Navbar */}
      <nav style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '18px 0 8px 0', background: 'var(--color-primary)', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', position: 'sticky', top: 0, zIndex: 10 }}>
        <span style={{ background: '#fff', borderRadius: '50%', padding: 4, boxShadow: '0 2px 8px #2222', display: 'inline-block', marginRight: 16 }}>
          <img src="/Brand_logo.png" alt="GradGrove Logo" style={{ width: 32, height: 32, display: 'block' }} />
        </span>
        {navLinks.map((link, idx) => (
          <a
            key={link.label}
            href={link.href}
            style={{
              color: 'var(--color-background)',
              padding: '8px 18px',
              margin: '0 6px',
              borderRadius: 6,
              fontWeight: hovered === idx ? 700 : 500,
              fontSize: '1.08rem',
              textDecoration: 'none',
              transition: 'all 0.2s',
              cursor: 'pointer',
              borderBottom: hovered === idx ? '2px solid var(--color-background)' : '2px solid transparent',
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
      {/* Hero Section - Carousel with overlayed content */}
      <CarouselFade images={carouselImages} interval={3500}>
        <h1 style={{ fontSize: '3.2rem', fontWeight: 800, marginBottom: 12, textShadow: '0 2px 12px #222' }}>GradGrove</h1>
        <h2 style={{ fontSize: '1.7rem', margin: '10px 0 0 0', textShadow: '0 1px 8px #222', fontWeight: 600 }}>AI-based Drop-out Prediction & Counseling System</h2>
        <p style={{ maxWidth: 700, margin: '24px auto', fontSize: '1.12rem', lineHeight: 1.7, background: 'rgba(0,0,0,0.30)', borderRadius: 14, padding: '18px 24px', boxShadow: '0 2px 8px rgba(0,0,0,0.10)', fontWeight: 500 }}>
          Welcome to the SIH 2025 prototype. Our platform leverages artificial intelligence to help students, mentors, and administrators identify drop-out risks early and provide personalized support.
        </p>
        <a href="/signup">
          <button className="btn" style={{ fontSize: '1.15rem', padding: '14px 40px', background: 'var(--color-primary)', color: 'var(--color-background)', border: 'none', borderRadius: 14, cursor: 'pointer', marginTop: 18, boxShadow: '0 8px 32px #222', fontWeight: 700, letterSpacing: '0.5px', transition: 'background 0.2s, box-shadow 0.2s', position: 'relative', zIndex: 100 }}
            onMouseEnter={e => { e.target.style.background = 'var(--color-secondary)'; e.target.style.boxShadow = '0 12px 48px #a3bffa66'; }}
            onMouseLeave={e => { e.target.style.background = 'var(--color-primary)'; e.target.style.boxShadow = '0 8px 32px #222'; }}
          >Get Started</button>
        </a>
      </CarouselFade>
      {/* Testimonials Section - Modern Cards */}
      <section id="testimonials" style={{ maxWidth: 1400, margin: '0 auto', padding: '56px 0', textAlign: 'center', position: 'relative', zIndex: 1, background: 'none' }}>
        <h2 style={{ color: 'var(--color-primary)', fontSize: '2.3rem', marginBottom: 28, fontWeight: 700 }}>What Our Users Say</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 48 }}>
          <div style={{ padding: 32, maxWidth: 340, background: '#fff', boxShadow: '0 4px 16px #a3bffa22', borderRadius: 18, transition: 'transform 0.2s, box-shadow 0.2s', cursor: 'pointer', position: 'relative' }}>
            <div style={{ fontWeight: 600, color: 'var(--color-primary)', fontSize: '1.08rem', marginBottom: 8 }}>
              "GradGrove helped me stay on track and feel supported throughout my studies!"
            </div>
            <div style={{ fontSize: '0.98rem', color: 'var(--color-secondary)' }}>Priya, Student</div>
          </div>
          <div style={{ padding: 32, maxWidth: 340, background: '#fff', boxShadow: '0 4px 16px #a3bffa22', borderRadius: 18, transition: 'transform 0.2s, box-shadow 0.2s', cursor: 'pointer', position: 'relative' }}>
            <div style={{ fontWeight: 600, color: 'var(--color-primary)', fontSize: '1.08rem', marginBottom: 8 }}>
              "The dashboard and alerts make it easy to help students at the right time."
            </div>
            <div style={{ fontSize: '0.98rem', color: 'var(--color-secondary)' }}>Rahul, Mentor</div>
          </div>
          <div style={{ padding: 32, maxWidth: 340, background: '#fff', boxShadow: '0 4px 16px #a3bffa22', borderRadius: 18, transition: 'transform 0.2s, box-shadow 0.2s', cursor: 'pointer', position: 'relative' }}>
            <div style={{ fontWeight: 600, color: 'var(--color-primary)', fontSize: '1.08rem', marginBottom: 8 }}>
              "GradGrove's analytics help us improve student outcomes across the board."
            </div>
            <div style={{ fontSize: '0.98rem', color: 'var(--color-secondary)' }}>Meera, Admin</div>
          </div>
        </div>
      </section>
      {/* Features Section */}
      <section id="features" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 48, margin: '64px 0', position: 'relative', zIndex: 1, background: 'none' }}>
        <div style={{ padding: 32, maxWidth: 360, background: '#fff', boxShadow: '0 4px 16px #a3bffa22', borderRadius: 18, transition: 'transform 0.2s, box-shadow 0.2s', cursor: 'pointer', position: 'relative' }}>
          <h3 style={{ color: 'var(--color-primary)' }}>For Students</h3>
          <ul style={{ textAlign: 'left', fontSize: '1.08rem', margin: '16px 0 0 0', paddingLeft: 20 }}>
            <li>Fill out surveys to assess your well-being</li>
            <li>Get personalized recommendations</li>
            <li>Access resources and support</li>
            <li>Track your progress and achievements</li>
          </ul>
        </div>
        <div style={{ padding: 32, maxWidth: 360, background: '#fff', boxShadow: '0 4px 16px #a3bffa22', borderRadius: 18, transition: 'transform 0.2s, box-shadow 0.2s', cursor: 'pointer', position: 'relative' }}>
          <h3 style={{ color: 'var(--color-primary)' }}>For Mentors & Counsellors</h3>
          <ul style={{ textAlign: 'left', fontSize: '1.08rem', margin: '16px 0 0 0', paddingLeft: 20 }}>
            <li>Monitor student progress</li>
            <li>Identify at-risk students</li>
            <li>Provide timely interventions</li>
            <li>Access analytics and reports</li>
          </ul>
        </div>
        <div style={{ padding: 32, maxWidth: 360, background: '#fff', boxShadow: '0 4px 16px #a3bffa22', borderRadius: 18, transition: 'transform 0.2s, box-shadow 0.2s', cursor: 'pointer', position: 'relative' }}>
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
      <section id="howitworks" style={{ maxWidth: 1200, margin: '64px auto', padding: 56, textAlign: 'center', position: 'relative', zIndex: 1, background: 'none' }}>
        <h2 style={{ color: 'var(--color-primary)', fontSize: '2.1rem', marginBottom: 18 }}>How It Works</h2>
        <ol style={{ fontSize: '1.12rem', maxWidth: 700, margin: '0 auto 24px auto', color: 'var(--color-text)', textAlign: 'left', paddingLeft: 30 }}>
          <li>Students fill out regular surveys and forms</li>
          <li>AI analyzes responses and academic data</li>
          <li>Mentors and counsellors receive alerts for at-risk students</li>
          <li>Admins monitor overall trends and manage interventions</li>
        </ol>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 32 }}>
          <div style={{ padding: 32, minWidth: 180, background: '#fff', boxShadow: '0 2px 8px #a3bffa22', borderRadius: 14, transition: 'transform 0.2s', cursor: 'pointer' }}>
            <div style={{ fontWeight: 600, color: 'var(--color-primary)' }}>AI-Powered Insights</div>
          </div>
          <div style={{ padding: 32, minWidth: 180, background: '#fff', boxShadow: '0 2px 8px #a3bffa22', borderRadius: 14, transition: 'transform 0.2s', cursor: 'pointer' }}>
            <div style={{ fontWeight: 600, color: 'var(--color-primary)' }}>Personalized Counseling</div>
          </div>
          <div style={{ padding: 32, minWidth: 180, background: '#fff', boxShadow: '0 2px 8px #a3bffa22', borderRadius: 14, transition: 'transform 0.2s', cursor: 'pointer' }}>
            <div style={{ fontWeight: 600, color: 'var(--color-primary)' }}>Community Well-being</div>
          </div>
        </div>
      </section>
      {/* Team Section */}
      <section id="team" style={{ maxWidth: 1200, margin: '64px auto', padding: 56, textAlign: 'center', background: 'none' }}>
        <h2 style={{ color: 'var(--color-primary)', fontSize: '2rem', marginBottom: 16 }}>Meet the Team</h2>
        <div style={{ padding: 28, minWidth: 200, background: '#fff', boxShadow: '0 2px 8px #a3bffa22', borderRadius: 14, transition: 'transform 0.2s', cursor: 'pointer' }}>
          <div style={{ fontWeight: 600, color: 'var(--color-primary)', fontSize: '1.08rem' }}>Alice</div>
          <div style={{ fontSize: '0.98rem', color: 'var(--color-secondary)' }}>AI/ML Lead</div>
          <div style={{ fontSize: '0.95rem', color: 'var(--color-text)', marginTop: 6 }}>
            "Building smarter solutions for students everywhere."
          </div>
        </div>
        <div style={{ padding: 28, minWidth: 200, background: '#fff', boxShadow: '0 2px 8px #a3bffa22', borderRadius: 14, transition: 'transform 0.2s', cursor: 'pointer' }}>
          <div style={{ fontWeight: 600, color: 'var(--color-primary)', fontSize: '1.08rem' }}>Bob</div>
          <div style={{ fontSize: '0.98rem', color: 'var(--color-secondary)' }}>Frontend Developer</div>
          <div style={{ fontSize: '0.95rem', color: 'var(--color-text)', marginTop: 6 }}>
            "Crafting beautiful and intuitive user experiences."
          </div>
        </div>
        <div style={{ padding: 28, minWidth: 200, background: '#fff', boxShadow: '0 2px 8px #a3bffa22', borderRadius: 14, transition: 'transform 0.2s', cursor: 'pointer' }}>
          <div style={{ fontWeight: 600, color: 'var(--color-primary)', fontSize: '1.08rem' }}>Charlie</div>
          <div style={{ fontSize: '0.98rem', color: 'var(--color-secondary)' }}>Backend Developer</div>
          <div style={{ fontSize: '0.95rem', color: 'var(--color-text)', marginTop: 6 }}>
            "Ensuring reliability and performance behind the scenes."
          </div>
        </div>
      </section>
      {/* Contact Section */}
      <section id="contact" style={{ maxWidth: 1200, margin: '64px auto', padding: 56, textAlign: 'center', background: 'linear-gradient(90deg, #f3f4f6 60%, #e3e8ff 100%)', borderRadius: 32, boxShadow: '0 8px 32px #a3bffa22', position: 'relative', zIndex: 1 }}>
        <svg style={{ position: 'absolute', right: -80, bottom: -60, zIndex: 0 }} width="320" height="180" viewBox="0 0 320 180" fill="none" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="160" cy="90" rx="120" ry="60" fill="#a3bffa" opacity="0.10" />
        </svg>
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

      <footer style={{ textAlign: 'center', padding: '48px 0 24px 0', color: 'var(--color-background)', fontSize: '1.08rem', background: 'var(--color-primary)', marginTop: 48 }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-start', gap: 32 }}>
          <div style={{ flex: 1, minWidth: 220, textAlign: 'left' }}>
            <div style={{ background: '#fff', borderRadius: 12, padding: 8, display: 'inline-block', boxShadow: '0 2px 8px #2222', marginBottom: 12 }}>
              <img src="/Brand_logo.png" alt="GradGrove Logo" style={{ width: 48, display: 'block' }} />
            </div>
            <div style={{ fontWeight: 700, fontSize: '1.2rem', marginBottom: 8, color: 'var(--color-background)' }}>GradGrove</div>
            <div style={{ fontSize: '1rem', color: 'var(--color-background)', marginBottom: 12 }}>
              AI-based Drop-out Prediction & Counseling System for modern institutions. Empowering students, mentors, and admins with actionable insights and support.
            </div>
          </div>
          <div style={{ flex: 1, minWidth: 180, textAlign: 'left' }}>
            <div style={{ fontWeight: 600, marginBottom: 10 }}>Quick Links</div>
            <a href="/" style={{ color: 'var(--color-background)', textDecoration: 'none', display: 'block', marginBottom: 6, transition: 'color 0.2s, text-decoration 0.2s' }} onMouseEnter={e => { e.target.style.color = 'var(--color-secondary)'; e.target.style.textDecoration = 'underline'; }} onMouseLeave={e => { e.target.style.color = 'var(--color-background)'; e.target.style.textDecoration = 'none'; }}>Home</a>
            <a href="/login" style={{ color: 'var(--color-background)', textDecoration: 'none', display: 'block', marginBottom: 6, transition: 'color 0.2s, text-decoration 0.2s' }} onMouseEnter={e => { e.target.style.color = 'var(--color-secondary)'; e.target.style.textDecoration = 'underline'; }} onMouseLeave={e => { e.target.style.color = 'var(--color-background)'; e.target.style.textDecoration = 'none'; }}>Login</a>
            <a href="/signup" style={{ color: 'var(--color-background)', textDecoration: 'none', display: 'block', marginBottom: 6, transition: 'color 0.2s, text-decoration 0.2s' }} onMouseEnter={e => { e.target.style.color = 'var(--color-secondary)'; e.target.style.textDecoration = 'underline'; }} onMouseLeave={e => { e.target.style.color = 'var(--color-background)'; e.target.style.textDecoration = 'none'; }}>Sign Up</a>
            <a href="#features" style={{ color: 'var(--color-background)', textDecoration: 'none', display: 'block', marginBottom: 6, transition: 'color 0.2s, text-decoration 0.2s' }} onMouseEnter={e => { e.target.style.color = 'var(--color-secondary)'; e.target.style.textDecoration = 'underline'; }} onMouseLeave={e => { e.target.style.color = 'var(--color-background)'; e.target.style.textDecoration = 'none'; }}>Features</a>
            <a href="#team" style={{ color: 'var(--color-background)', textDecoration: 'none', display: 'block', marginBottom: 6, transition: 'color 0.2s, text-decoration 0.2s' }} onMouseEnter={e => { e.target.style.color = 'var(--color-secondary)'; e.target.style.textDecoration = 'underline'; }} onMouseLeave={e => { e.target.style.color = 'var(--color-background)'; e.target.style.textDecoration = 'none'; }}>Team</a>
            <a href="#contact" style={{ color: 'var(--color-background)', textDecoration: 'none', display: 'block', marginBottom: 6, transition: 'color 0.2s, text-decoration 0.2s' }} onMouseEnter={e => { e.target.style.color = 'var(--color-secondary)'; e.target.style.textDecoration = 'underline'; }} onMouseLeave={e => { e.target.style.color = 'var(--color-background)'; e.target.style.textDecoration = 'none'; }}>Contact</a>
          </div>
          <div style={{ flex: 1, minWidth: 180, textAlign: 'left' }}>
            <div style={{ fontWeight: 600, marginBottom: 10 }}>Legal</div>
            <a href="#" style={{ color: 'var(--color-background)', textDecoration: 'none', display: 'block', marginBottom: 6, transition: 'color 0.2s, text-decoration 0.2s' }} onMouseEnter={e => { e.target.style.color = 'var(--color-secondary)'; e.target.style.textDecoration = 'underline'; }} onMouseLeave={e => { e.target.style.color = 'var(--color-background)'; e.target.style.textDecoration = 'none'; }}>Privacy Policy</a>
            <a href="#" style={{ color: 'var(--color-background)', textDecoration: 'none', display: 'block', marginBottom: 6, transition: 'color 0.2s, text-decoration 0.2s' }} onMouseEnter={e => { e.target.style.color = 'var(--color-secondary)'; e.target.style.textDecoration = 'underline'; }} onMouseLeave={e => { e.target.style.color = 'var(--color-background)'; e.target.style.textDecoration = 'none'; }}>Terms of Service</a>
            <a href="#" style={{ color: 'var(--color-background)', textDecoration: 'none', display: 'block', marginBottom: 6, transition: 'color 0.2s, text-decoration 0.2s' }} onMouseEnter={e => { e.target.style.color = 'var(--color-secondary)'; e.target.style.textDecoration = 'underline'; }} onMouseLeave={e => { e.target.style.color = 'var(--color-background)'; e.target.style.textDecoration = 'none'; }}>Careers</a>
          </div>
          <div style={{ flex: 1, minWidth: 180, textAlign: 'left' }}>
            <div style={{ fontWeight: 600, marginBottom: 10 }}>Connect</div>
            <a href="mailto:gradgrove@sih2025.com" style={{ color: 'var(--color-background)', textDecoration: 'none', display: 'block', marginBottom: 6, transition: 'color 0.2s, text-decoration 0.2s' }} onMouseEnter={e => { e.target.style.color = 'var(--color-secondary)'; e.target.style.textDecoration = 'underline'; }} onMouseLeave={e => { e.target.style.color = 'var(--color-background)'; e.target.style.textDecoration = 'none'; }}>Email Us</a>
            <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
              <a href="#" style={{ color: 'var(--color-background)', fontSize: 22, transition: 'color 0.2s' }} onMouseEnter={e => { e.target.style.color = 'var(--color-secondary)'; }} onMouseLeave={e => { e.target.style.color = 'var(--color-background)'; }} title="Twitter">🐦</a>
              <a href="#" style={{ color: 'var(--color-background)', fontSize: 22, transition: 'color 0.2s' }} onMouseEnter={e => { e.target.style.color = 'var(--color-secondary)'; }} onMouseLeave={e => { e.target.style.color = 'var(--color-background)'; }} title="LinkedIn">💼</a>
              <a href="#" style={{ color: 'var(--color-background)', fontSize: 22, transition: 'color 0.2s' }} onMouseEnter={e => { e.target.style.color = 'var(--color-secondary)'; }} onMouseLeave={e => { e.target.style.color = 'var(--color-background)'; }} title="Instagram">📸</a>
            </div>
          </div>
        </div>
        <div style={{ marginTop: 32, color: 'var(--color-background)', fontSize: '0.98rem', opacity: 0.7 }}>
          &copy; 2025 GradGrove Hackathon Prototype. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

export default Landing;
