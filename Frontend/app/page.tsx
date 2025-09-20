"use client";

import React, { useState, useEffect } from "react";
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import AnimatedElement from "./components/common/AnimatedElement";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#howitworks" },
  { label: "Team", href: "#team" },
  { label: "Contact", href: "#contact" },
  { label: "Login", href: "/login" }
];

const carouselImages = [
  { src: "https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&w=1600&q=80", alt: "Students collaborating" },
  { src: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=1600&q=80", alt: "Mentor guiding students" },
  { src: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=80", alt: "Counseling session" },
  { src: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1600&q=80", alt: "Analytics dashboard" },
  { src: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=1600&q=80", alt: "Community support" }
];

function CarouselFade({ images, interval = 4500, children }: { images: { src: string; alt: string }[]; interval?: number; children?: React.ReactNode }) {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const timer = setTimeout(() => {
      setActive((active + 1) % images.length);
    }, interval);
    return () => clearTimeout(timer);
  }, [active, images.length, interval]);
  return (
    <div style={{ position: "relative", width: "100%", height: "calc(100vh - 70px)", maxWidth: "100vw", margin: 0, overflow: "hidden", borderRadius: 0, boxShadow: "0 4px 24px #a3bffa22", background: "#fff" }}>
      {images.map((img, idx) => (
        <img
          key={img.src}
          src={img.src}
          alt={img.alt}
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: active === idx ? 1 : 0,
            transition: "opacity 1s",
            zIndex: active === idx ? 2 : 1
          }}
        />
      ))}
      <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", zIndex: 10, color: "#fff", textShadow: "0 2px 16px rgba(0,0,0,0.45)" }}>
        {children}
      </div>
      <button onClick={() => setActive((active - 1 + images.length) % images.length)} style={{ position: "absolute", left: 24, top: "50%", transform: "translateY(-50%)", background: "rgba(0,0,0,0.18)", border: "none", borderRadius: "50%", width: 44, height: 44, color: "#fff", fontSize: 28, cursor: "pointer", zIndex: 20 }}>&lt;</button>
      <button onClick={() => setActive((active + 1) % images.length)} style={{ position: "absolute", right: 24, top: "50%", transform: "translateY(-50%)", background: "rgba(0,0,0,0.18)", border: "none", borderRadius: "50%", width: 44, height: 44, color: "#fff", fontSize: 28, cursor: "pointer", zIndex: 20 }}>&gt;</button>
      <div style={{ position: "absolute", bottom: 28, left: "50%", transform: "translateX(-50%)", display: "flex", gap: 10, zIndex: 20 }}>
        {images.map((_, idx) => (
          <span key={idx} style={{ width: 14, height: 14, borderRadius: "50%", background: active === idx ? "var(--color-primary)" : "#ccc", display: "inline-block", transition: "background 0.2s" }} />
        ))}
      </div>
    </div>
  );
  // ...existing code...
}

export default function Page() {
  const [hovered, setHovered] = useState(null);

  return (
    <div className="min-h-screen bg-gg-bg-light text-gg-foreground font-sans relative overflow-hidden">
      {/* Modern Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-gg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute -top-40 -right-20 w-80 h-80 bg-gg-green/10 rounded-full blur-3xl"></div>
        <div className="absolute top-96 left-1/2 w-64 h-64 bg-gg-blue/10 rounded-full blur-3xl"></div>
      </div>
      
      <Navbar />
      
      {/* Hero Section - Modern Hero with Carousel */}
      <main className="relative z-10">
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          {/* Carousel Background */}
          <div className="absolute inset-0 z-0">
            <CarouselFade images={carouselImages} interval={4000}>
              <div></div>
            </CarouselFade>
          </div>
          
          {/* Hero Content */}
          <div className="relative z-20 text-center text-white px-6 max-w-4xl mx-auto">
            <AnimatedElement animation="fadeIn" delay={200}>
              <h1 className="text-6xl md:text-7xl font-extrabold mb-4 drop-shadow-2xl">GradGrove</h1>
            </AnimatedElement>
            <AnimatedElement animation="slideInUp" delay={400}>
              <h2 className="text-2xl md:text-3xl font-semibold mb-6 drop-shadow-xl">AI-based Drop-out Prediction & Counseling System</h2>
            </AnimatedElement>
            <AnimatedElement animation="fadeIn" delay={600}>
              <p className="text-lg md:text-xl leading-relaxed mb-8 bg-black/30 backdrop-blur-sm rounded-2xl px-8 py-6 shadow-2xl max-w-3xl mx-auto">
                Welcome to the SIH 2025 prototype. Our platform leverages artificial intelligence to help students, mentors, and administrators identify drop-out risks early and provide personalized support.
              </p>
            </AnimatedElement>
            <AnimatedElement animation="scaleIn" delay={800}>
              <a href="/signup" className="inline-block">
                <button className="bg-gg-primary hover:bg-gg-blue text-white px-10 py-4 rounded-2xl font-bold text-lg shadow-2xl hover:shadow-gg-primary/30 hover:-translate-y-1 transition-all duration-300 border-2 border-white/20 backdrop-blur-sm">
                  Get Started
                </button>
              </a>
            </AnimatedElement>
          </div>
          
          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </section>

        {/* Testimonials Section - Modern Cards */}
        <section id="testimonials" className="max-w-7xl mx-auto py-20 px-6 text-center relative z-10">
          <AnimatedElement animation="fadeIn" delay={100}>
            <h2 className="text-gg-primary text-4xl md:text-5xl font-bold mb-4">What Our Users Say</h2>
            <p className="text-gg-foreground/70 text-xl mb-12">Real feedback from students, mentors, and administrators</p>
          </AnimatedElement>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatedElement animation="slideInLeft" delay={200}>
              <div className="bg-gg-card-bg p-8 rounded-gg-card shadow-gg-soft hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gg-muted-border">
                <div className="text-6xl mb-4">👩‍🎓</div>
                <blockquote className="text-gg-foreground font-medium text-lg mb-4 leading-relaxed">
                  "GradGrove helped me stay on track and feel supported throughout my studies!"
                </blockquote>
                <cite className="text-gg-green font-semibold">— Priya, Student</cite>
              </div>
            </AnimatedElement>
            <AnimatedElement animation="slideInUp" delay={300}>
              <div className="bg-gg-card-bg p-8 rounded-gg-card shadow-gg-soft hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gg-muted-border">
                <div className="text-6xl mb-4">👨‍🏫</div>
                <blockquote className="text-gg-foreground font-medium text-lg mb-4 leading-relaxed">
                  "The dashboard and alerts make it easy to help students at the right time."
                </blockquote>
                <cite className="text-gg-blue font-semibold">— Rahul, Mentor</cite>
              </div>
            </AnimatedElement>
            <AnimatedElement animation="slideInRight" delay={400}>
              <div className="bg-gg-card-bg p-8 rounded-gg-card shadow-gg-soft hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gg-muted-border">
                <div className="text-6xl mb-4">👩‍💼</div>
                <blockquote className="text-gg-foreground font-medium text-lg mb-4 leading-relaxed">
                  "GradGrove's analytics help us improve student outcomes across the board."
                </blockquote>
                <cite className="text-gg-primary font-semibold">— Meera, Admin</cite>
              </div>
            </AnimatedElement>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="max-w-7xl mx-auto py-20 px-6 relative z-10">
          <div className="text-center mb-16">
            <AnimatedElement animation="fadeIn" delay={100}>
              <h2 className="text-gg-primary text-4xl md:text-5xl font-bold mb-4">Powerful Features</h2>
              <p className="text-gg-foreground/70 text-xl">Tailored solutions for every user in the education ecosystem</p>
            </AnimatedElement>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatedElement animation="slideInLeft" delay={200}>
              <div className="bg-gradient-to-br from-gg-green/10 to-gg-green/5 p-8 rounded-2xl border border-gg-green/20 hover:border-gg-green/40 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
                <div className="w-16 h-16 bg-gg-green rounded-2xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="text-gg-green text-2xl font-bold mb-4">For Students</h3>
                <ul className="text-gg-foreground space-y-3 text-left">
                  <li className="flex items-center"><span className="w-2 h-2 bg-gg-green rounded-full mr-3"></span>Fill out surveys to assess your well-being</li>
                  <li className="flex items-center"><span className="w-2 h-2 bg-gg-green rounded-full mr-3"></span>Get personalized recommendations</li>
                  <li className="flex items-center"><span className="w-2 h-2 bg-gg-green rounded-full mr-3"></span>Access resources and support</li>
                  <li className="flex items-center"><span className="w-2 h-2 bg-gg-green rounded-full mr-3"></span>Track your progress and achievements</li>
                </ul>
              </div>
            </AnimatedElement>
            
            <AnimatedElement animation="slideInUp" delay={300}>
              <div className="bg-gradient-to-br from-gg-blue/10 to-gg-blue/5 p-8 rounded-2xl border border-gg-blue/20 hover:border-gg-blue/40 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
                <div className="w-16 h-16 bg-gg-blue rounded-2xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-gg-blue text-2xl font-bold mb-4">For Mentors & Counsellors</h3>
                <ul className="text-gg-foreground space-y-3 text-left">
                  <li className="flex items-center"><span className="w-2 h-2 bg-gg-blue rounded-full mr-3"></span>Monitor student progress</li>
                  <li className="flex items-center"><span className="w-2 h-2 bg-gg-blue rounded-full mr-3"></span>Identify at-risk students</li>
                  <li className="flex items-center"><span className="w-2 h-2 bg-gg-blue rounded-full mr-3"></span>Provide timely interventions</li>
                  <li className="flex items-center"><span className="w-2 h-2 bg-gg-blue rounded-full mr-3"></span>Access analytics and reports</li>
                </ul>
              </div>
            </AnimatedElement>
            
            <AnimatedElement animation="slideInRight" delay={400}>
              <div className="bg-gradient-to-br from-gg-primary/10 to-gg-primary/5 p-8 rounded-2xl border border-gg-primary/20 hover:border-gg-primary/40 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
                <div className="w-16 h-16 bg-gg-primary rounded-2xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-gg-primary text-2xl font-bold mb-4">For Admins</h3>
                <ul className="text-gg-foreground space-y-3 text-left">
                  <li className="flex items-center"><span className="w-2 h-2 bg-gg-primary rounded-full mr-3"></span>View analytics and reports</li>
                  <li className="flex items-center"><span className="w-2 h-2 bg-gg-primary rounded-full mr-3"></span>Manage users and permissions</li>
                  <li className="flex items-center"><span className="w-2 h-2 bg-gg-primary rounded-full mr-3"></span>Track overall well-being trends</li>
                  <li className="flex items-center"><span className="w-2 h-2 bg-gg-primary rounded-full mr-3"></span>Configure platform settings</li>
                </ul>
              </div>
            </AnimatedElement>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="howitworks" className="max-w-7xl mx-auto py-20 px-6 relative z-10">
          <div className="bg-gradient-to-br from-gg-primary/5 to-gg-blue/5 rounded-3xl p-12 backdrop-blur-sm border border-white/10">
            <div className="text-center mb-16">
              <AnimatedElement animation="fadeIn" delay={100}>
                <h2 className="text-gg-primary text-4xl md:text-5xl font-bold mb-4">How It Works</h2>
                <p className="text-gg-foreground/70 text-xl">Simple steps to transform student well-being</p>
              </AnimatedElement>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
              <AnimatedElement animation="slideInUp" delay={200}>
                <div className="bg-gradient-to-br from-gg-blue/10 to-gg-blue/5 p-8 rounded-2xl border border-gg-blue/20 hover:border-gg-blue/40 transition-all duration-300 hover:-translate-y-2 text-center">
                  <div className="w-20 h-20 bg-gg-blue rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                    </svg>
                  </div>
                  <div className="bg-gg-blue text-white text-sm font-bold rounded-full w-8 h-8 flex items-center justify-center mx-auto mb-4">1</div>
                  <h3 className="text-gg-blue text-xl font-bold mb-4">Assessment</h3>
                  <p className="text-gg-foreground/70 leading-relaxed">Students fill out regular surveys and forms to provide insights into their well-being.</p>
                </div>
              </AnimatedElement>
              
              <AnimatedElement animation="slideInUp" delay={300}>
                <div className="bg-gradient-to-br from-gg-green/10 to-gg-green/5 p-8 rounded-2xl border border-gg-green/20 hover:border-gg-green/40 transition-all duration-300 hover:-translate-y-2 text-center">
                  <div className="w-20 h-20 bg-gg-green rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="bg-gg-green text-white text-sm font-bold rounded-full w-8 h-8 flex items-center justify-center mx-auto mb-4">2</div>
                  <h3 className="text-gg-green text-xl font-bold mb-4">Analysis</h3>
                  <p className="text-gg-foreground/70 leading-relaxed">AI analyzes responses and academic data to identify patterns and insights.</p>
                </div>
              </AnimatedElement>
              
              <AnimatedElement animation="slideInUp" delay={400}>
                <div className="bg-gradient-to-br from-gg-orange/10 to-gg-orange/5 p-8 rounded-2xl border border-gg-orange/20 hover:border-gg-orange/40 transition-all duration-300 hover:-translate-y-2 text-center">
                  <div className="w-20 h-20 bg-gg-orange rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM8.124 9.79c-1.438-1.437-1.438-3.77 0-5.206 1.438-1.438 3.769-1.438 5.207 0l2.598 2.598c1.438 1.437 1.438 3.769 0 5.206-1.438 1.438-3.769 1.438-5.207 0L8.124 9.79z" />
                    </svg>
                  </div>
                  <div className="bg-gg-orange text-white text-sm font-bold rounded-full w-8 h-8 flex items-center justify-center mx-auto mb-4">3</div>
                  <h3 className="text-gg-orange text-xl font-bold mb-4">Intervention</h3>
                  <p className="text-gg-foreground/70 leading-relaxed">Mentors and counsellors receive alerts for at-risk students and can provide support.</p>
                </div>
              </AnimatedElement>
              
              <AnimatedElement animation="slideInUp" delay={500}>
                <div className="bg-gradient-to-br from-gg-primary/10 to-gg-primary/5 p-8 rounded-2xl border border-gg-primary/20 hover:border-gg-primary/40 transition-all duration-300 hover:-translate-y-2 text-center">
                  <div className="w-20 h-20 bg-gg-primary rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <div className="bg-gg-primary text-white text-sm font-bold rounded-full w-8 h-8 flex items-center justify-center mx-auto mb-4">4</div>
                  <h3 className="text-gg-primary text-xl font-bold mb-4">Monitor</h3>
                  <p className="text-gg-foreground/70 leading-relaxed">Admins monitor overall trends and manage interventions for community well-being.</p>
                </div>
              </AnimatedElement>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section id="team" className="max-w-7xl mx-auto py-20 px-6 relative z-10">
          <div className="text-center mb-16">
            <AnimatedElement animation="fadeIn" delay={100}>
              <h2 className="text-gg-primary text-4xl md:text-5xl font-bold mb-4">Meet the Team</h2>
              <p className="text-gg-foreground/70 text-xl">The passionate minds behind GradGrove</p>
            </AnimatedElement>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatedElement animation="slideInLeft" delay={200}>
              <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl border border-gg-primary/10 hover:border-gg-primary/30 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl text-center group">
                <div className="w-24 h-24 bg-gradient-to-br from-gg-primary to-gg-blue rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl font-bold text-white">A</span>
                </div>
                <h3 className="text-gg-primary text-2xl font-bold mb-2">Alice</h3>
                <p className="text-gg-blue font-semibold mb-4">AI/ML Lead</p>
                <p className="text-gg-foreground/70 italic leading-relaxed">"Building smarter solutions for students everywhere."</p>
              </div>
            </AnimatedElement>
            
            <AnimatedElement animation="slideInUp" delay={300}>
              <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl border border-gg-primary/10 hover:border-gg-primary/30 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl text-center group">
                <div className="w-24 h-24 bg-gradient-to-br from-gg-green to-gg-blue rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl font-bold text-white">B</span>
                </div>
                <h3 className="text-gg-primary text-2xl font-bold mb-2">Bob</h3>
                <p className="text-gg-green font-semibold mb-4">Frontend Developer</p>
                <p className="text-gg-foreground/70 italic leading-relaxed">"Crafting beautiful and intuitive user experiences."</p>
              </div>
            </AnimatedElement>
            
            <AnimatedElement animation="slideInRight" delay={400}>
              <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl border border-gg-primary/10 hover:border-gg-primary/30 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl text-center group">
                <div className="w-24 h-24 bg-gradient-to-br from-gg-orange to-gg-primary rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl font-bold text-white">C</span>
                </div>
                <h3 className="text-gg-primary text-2xl font-bold mb-2">Charlie</h3>
                <p className="text-gg-orange font-semibold mb-4">Backend Developer</p>
                <p className="text-gg-foreground/70 italic leading-relaxed">"Ensuring reliability and performance behind the scenes."</p>
              </div>
            </AnimatedElement>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="max-w-7xl mx-auto py-20 px-6 relative z-10">
          <div className="bg-gradient-to-br from-gg-primary/10 to-gg-blue/10 rounded-3xl p-12 backdrop-blur-sm border border-white/10 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent"></div>
            <div className="relative z-10">
              <div className="text-center mb-12">
                <AnimatedElement animation="fadeIn" delay={100}>
                  <h2 className="text-gg-primary text-4xl md:text-5xl font-bold mb-4">Contact Us</h2>
                  <p className="text-gg-foreground/70 text-xl mb-6">Have questions or feedback? We'd love to hear from you!</p>
                  <p className="text-gg-foreground">
                    Reach out to our team at{' '}
                    <a href="mailto:gradgrove@sih2025.com" className="text-gg-blue hover:text-gg-primary font-semibold underline transition-colors">
                      gradgrove@sih2025.com
                    </a>
                  </p>
                </AnimatedElement>
              </div>
              
              <AnimatedElement animation="slideInUp" delay={200}>
                <form className="max-w-2xl mx-auto space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <input 
                        type="text" 
                        placeholder="Your Name" 
                        className="w-full px-4 py-3 bg-white/70 backdrop-blur-sm border border-gg-primary/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-gg-primary/50 focus:border-transparent transition-all"
                      />
                    </div>
                    <div>
                      <input 
                        type="email" 
                        placeholder="Your Email" 
                        className="w-full px-4 py-3 bg-white/70 backdrop-blur-sm border border-gg-primary/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-gg-primary/50 focus:border-transparent transition-all"
                      />
                    </div>
                  </div>
                  <div>
                    <textarea 
                      placeholder="Your Message" 
                      rows={6}
                      className="w-full px-4 py-3 bg-white/70 backdrop-blur-sm border border-gg-primary/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-gg-primary/50 focus:border-transparent transition-all resize-none"
                    />
                  </div>
                  <div className="text-center">
                    <button 
                      type="submit" 
                      className="bg-gradient-to-r from-gg-primary to-gg-blue text-white font-bold px-8 py-4 rounded-xl hover:from-gg-blue hover:to-gg-primary transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                    >
                      Send Message
                    </button>
                  </div>
                </form>
              </AnimatedElement>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
