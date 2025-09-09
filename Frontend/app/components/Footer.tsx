"use client";
import React from "react";

export default function Footer() {
    return (
        <footer className="fade-in" style={{ textAlign: 'center', padding: '48px 0 24px 0', color: 'var(--color-background)', fontSize: '1.08rem', background: 'var(--color-primary)', marginTop: 48 }}>
            <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-start', gap: 32 }}>
                <div className="slide-in-left animate-delay-100" style={{ flex: 1, minWidth: 220, textAlign: 'left' }}>
                    <div className="hover-scale transition-all" style={{ background: '#fff', borderRadius: 12, padding: 8, display: 'inline-block', boxShadow: '0 2px 8px #2222', marginBottom: 12 }}>
                        <img src="/Brand_logo.png" alt="GradGrove Logo" style={{ width: 48, display: 'block' }} />
                    </div>
                    <div style={{ fontWeight: 700, fontSize: '1.2rem', marginBottom: 8, color: 'var(--color-background)' }}>GradGrove</div>
                    <div style={{ fontSize: '1rem', color: 'var(--color-background)', marginBottom: 12 }}>
                        AI-based Drop-out Prediction & Counseling System for modern institutions. Empowering students, mentors, and admins with actionable insights and support.
                    </div>
                </div>
                <div className="slide-in-up animate-delay-200" style={{ flex: 1, minWidth: 180, textAlign: 'left' }}>
                    <div style={{ fontWeight: 600, marginBottom: 10 }}>Quick Links</div>
                    <a href="/" style={{ color: 'var(--color-background)', textDecoration: 'none', display: 'block', marginBottom: 6, transition: 'color 0.2s, text-decoration 0.2s' }} onMouseEnter={e => { (e.target as HTMLAnchorElement).style.color = 'var(--color-secondary)'; (e.target as HTMLAnchorElement).style.textDecoration = 'underline'; }} onMouseLeave={e => { (e.target as HTMLAnchorElement).style.color = 'var(--color-background)'; (e.target as HTMLAnchorElement).style.textDecoration = 'none'; }}>Home</a>
                    <a href="/login" style={{ color: 'var(--color-background)', textDecoration: 'none', display: 'block', marginBottom: 6, transition: 'color 0.2s, text-decoration 0.2s' }} onMouseEnter={e => { (e.target as HTMLAnchorElement).style.color = 'var(--color-secondary)'; (e.target as HTMLAnchorElement).style.textDecoration = 'underline'; }} onMouseLeave={e => { (e.target as HTMLAnchorElement).style.color = 'var(--color-background)'; (e.target as HTMLAnchorElement).style.textDecoration = 'none'; }}>Login</a>
                    <a href="/signup" style={{ color: 'var(--color-background)', textDecoration: 'none', display: 'block', marginBottom: 6, transition: 'color 0.2s, text-decoration 0.2s' }} onMouseEnter={e => { (e.target as HTMLAnchorElement).style.color = 'var(--color-secondary)'; (e.target as HTMLAnchorElement).style.textDecoration = 'underline'; }} onMouseLeave={e => { (e.target as HTMLAnchorElement).style.color = 'var(--color-background)'; (e.target as HTMLAnchorElement).style.textDecoration = 'none'; }}>Sign Up</a>
                    <a href="#features" style={{ color: 'var(--color-background)', textDecoration: 'none', display: 'block', marginBottom: 6, transition: 'color 0.2s, text-decoration 0.2s' }} onMouseEnter={e => { (e.target as HTMLAnchorElement).style.color = 'var(--color-secondary)'; (e.target as HTMLAnchorElement).style.textDecoration = 'underline'; }} onMouseLeave={e => { (e.target as HTMLAnchorElement).style.color = 'var(--color-background)'; (e.target as HTMLAnchorElement).style.textDecoration = 'none'; }}>Features</a>
                    <a href="#team" style={{ color: 'var(--color-background)', textDecoration: 'none', display: 'block', marginBottom: 6, transition: 'color 0.2s, text-decoration 0.2s' }} onMouseEnter={e => { (e.target as HTMLAnchorElement).style.color = 'var(--color-secondary)'; (e.target as HTMLAnchorElement).style.textDecoration = 'underline'; }} onMouseLeave={e => { (e.target as HTMLAnchorElement).style.color = 'var(--color-background)'; (e.target as HTMLAnchorElement).style.textDecoration = 'none'; }}>Team</a>
                    <a href="#contact" style={{ color: 'var(--color-background)', textDecoration: 'none', display: 'block', marginBottom: 6, transition: 'color 0.2s, text-decoration 0.2s' }} onMouseEnter={e => { (e.target as HTMLAnchorElement).style.color = 'var(--color-secondary)'; (e.target as HTMLAnchorElement).style.textDecoration = 'underline'; }} onMouseLeave={e => { (e.target as HTMLAnchorElement).style.color = 'var(--color-background)'; (e.target as HTMLAnchorElement).style.textDecoration = 'none'; }}>Contact</a>
                </div>
                <div style={{ flex: 1, minWidth: 180, textAlign: 'left' }}>
                    <div style={{ fontWeight: 600, marginBottom: 10 }}>Legal</div>
                    <a href="#" style={{ color: 'var(--color-background)', textDecoration: 'none', display: 'block', marginBottom: 6, transition: 'color 0.2s, text-decoration 0.2s' }} onMouseEnter={e => { (e.target as HTMLAnchorElement).style.color = 'var(--color-secondary)'; (e.target as HTMLAnchorElement).style.textDecoration = 'underline'; }} onMouseLeave={e => { (e.target as HTMLAnchorElement).style.color = 'var(--color-background)'; (e.target as HTMLAnchorElement).style.textDecoration = 'none'; }}>Privacy Policy</a>
                    <a href="#" style={{ color: 'var(--color-background)', textDecoration: 'none', display: 'block', marginBottom: 6, transition: 'color 0.2s, text-decoration 0.2s' }} onMouseEnter={e => { (e.target as HTMLAnchorElement).style.color = 'var(--color-secondary)'; (e.target as HTMLAnchorElement).style.textDecoration = 'underline'; }} onMouseLeave={e => { (e.target as HTMLAnchorElement).style.color = 'var(--color-background)'; (e.target as HTMLAnchorElement).style.textDecoration = 'none'; }}>Terms of Service</a>
                    <a href="#" style={{ color: 'var(--color-background)', textDecoration: 'none', display: 'block', marginBottom: 6, transition: 'color 0.2s, text-decoration 0.2s' }} onMouseEnter={e => { (e.target as HTMLAnchorElement).style.color = 'var(--color-secondary)'; (e.target as HTMLAnchorElement).style.textDecoration = 'underline'; }} onMouseLeave={e => { (e.target as HTMLAnchorElement).style.color = 'var(--color-background)'; (e.target as HTMLAnchorElement).style.textDecoration = 'none'; }}>Careers</a>
                </div>
                <div style={{ flex: 1, minWidth: 180, textAlign: 'left' }}>
                    <div style={{ fontWeight: 600, marginBottom: 10 }}>Connect</div>
                    <a href="mailto:gradgrove@sih2025.com" style={{ color: 'var(--color-background)', textDecoration: 'none', display: 'block', marginBottom: 6, transition: 'color 0.2s, text-decoration 0.2s' }} onMouseEnter={e => { (e.target as HTMLAnchorElement).style.color = 'var(--color-secondary)'; (e.target as HTMLAnchorElement).style.textDecoration = 'underline'; }} onMouseLeave={e => { (e.target as HTMLAnchorElement).style.color = 'var(--color-background)'; (e.target as HTMLAnchorElement).style.textDecoration = 'none'; }}>Email Us</a>
                    <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
                        <a href="#" style={{ color: 'var(--color-background)', fontSize: 22, transition: 'color 0.2s' }} onMouseEnter={e => { (e.target as HTMLAnchorElement).style.color = 'var(--color-secondary)'; }} onMouseLeave={e => { (e.target as HTMLAnchorElement).style.color = 'var(--color-background)'; }} title="Twitter">🐦</a>
                        <a href="#" style={{ color: 'var(--color-background)', fontSize: 22, transition: 'color 0.2s' }} onMouseEnter={e => { (e.target as HTMLAnchorElement).style.color = 'var(--color-secondary)'; }} onMouseLeave={e => { (e.target as HTMLAnchorElement).style.color = 'var(--color-background)'; }} title="LinkedIn">💼</a>
                        <a href="#" style={{ color: 'var(--color-background)', fontSize: 22, transition: 'color 0.2s' }} onMouseEnter={e => { (e.target as HTMLAnchorElement).style.color = 'var(--color-secondary)'; }} onMouseLeave={e => { (e.target as HTMLAnchorElement).style.color = 'var(--color-background)'; }} title="Instagram">📸</a>
                    </div>
                </div>
            </div>
            <div style={{ marginTop: 32, color: 'var(--color-background)', fontSize: '0.98rem', opacity: 0.7 }}>
                &copy; 2025 GradGrove Hackathon Prototype. All rights reserved.
            </div>
        </footer>
    );
}
