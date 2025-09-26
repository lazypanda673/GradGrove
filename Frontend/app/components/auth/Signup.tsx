"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import SignupStudent from "./SignupStudent";
import SignupCounsellor from "./SignupCounsellor";
import AnimatedElement from "../common/AnimatedElement";

export default function Signup() {
  const [roleInput, setRoleInput] = useState("");
  const [step, setStep] = useState(1); // 1: Role selection, 2: Signup form
  const [isTransitioning, setIsTransitioning] = useState(false);
  const router = useRouter();

  const handleRoleSelection = (role: string) => {
    setRoleInput(role);
  };

  const handleContinue = () => {
    if (roleInput && !isTransitioning) {
      setIsTransitioning(true);
      setTimeout(() => {
        setStep(2);
        setTimeout(() => setIsTransitioning(false), 100);
      }, 600); // Delay to allow role selection to fully disappear
    }
  };

  const handleBack = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setStep(1);
      setTimeout(() => setIsTransitioning(false), 100);
    }, 300);
  };

  const handleSignup = () => {
    // Handle successful signup
    router.push('/login');
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'student':
        return (
          <svg width="32" height="32" fill="var(--color-primary)" viewBox="0 0 24 24">
            <path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z"/>
          </svg>
        );
      case 'counsellor':
        return (
          <svg width="32" height="32" fill="var(--color-primary)" viewBox="0 0 24 24">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div style={{ 
      background: 'linear-gradient(135deg, var(--color-background) 0%, #e0f2f1 100%)', 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      padding: '16px',
      position: 'relative'
    }}>
      {/* Enhanced Background decorations - Static to prevent refresh */}
      <div style={{ 
        position: 'fixed', 
        inset: '0', 
        overflow: 'hidden', 
        pointerEvents: 'none',
        zIndex: -1
      }}>
        {/* Floating shapes - positioned relative to viewport */}
        <div style={{ 
          position: 'fixed', 
          top: '10vh', 
          right: '15vw', 
          width: '200px', 
          height: '200px', 
          borderRadius: '50%', 
          background: 'linear-gradient(45deg, var(--color-primary), var(--color-secondary))', 
          opacity: '0.1',
          animation: 'float 6s ease-in-out infinite',
          willChange: 'transform'
        }}></div>
        
        {/* Subtle animated background graphics */}
        <div style={{ 
          position: 'fixed', 
          top: '25vh', 
          right: '8vw', 
          width: '120px', 
          height: '120px', 
          borderRadius: '50%', 
          background: 'linear-gradient(45deg, var(--color-primary), var(--color-secondary))', 
          opacity: '0.06',
          animation: 'subtleFloat 8s ease-in-out infinite',
          willChange: 'transform'
        }}></div>
        <div style={{ 
          position: 'fixed', 
          bottom: '30vh', 
          left: '12vw', 
          width: '80px', 
          height: '80px', 
          borderRadius: '30%', 
          background: 'var(--color-secondary)', 
          opacity: '0.05',
          animation: 'subtleFloat 6s ease-in-out infinite reverse',
          willChange: 'transform'
        }}></div>
        <div style={{ 
          position: 'fixed', 
          top: '45vh', 
          right: '3vw', 
          width: '60px', 
          height: '60px', 
          borderRadius: '20%', 
          background: 'var(--color-primary)', 
          opacity: '0.04',
          animation: 'subtleFloat 10s ease-in-out infinite',
          willChange: 'transform'
        }}></div>
        <div style={{ 
          position: 'fixed', 
          bottom: '20vh', 
          left: '10vw', 
          width: '150px', 
          height: '150px', 
          borderRadius: '30%', 
          background: 'var(--color-secondary)', 
          opacity: '0.08',
          animation: 'float 4s ease-in-out infinite reverse',
          willChange: 'transform'
        }}></div>
        <div style={{ 
          position: 'fixed', 
          top: '60vh', 
          right: '5vw', 
          width: '100px', 
          height: '100px', 
          borderRadius: '20%', 
          background: 'var(--color-primary)', 
          opacity: '0.05',
          animation: 'float 8s ease-in-out infinite',
          willChange: 'transform'
        }}></div>
      </div>

      {/* Add floating and container animation keyframes */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        @keyframes containerFadeIn {
          0% { 
            opacity: 0; 
            transform: translateY(8px) scale(0.98); 
          }
          50% {
            opacity: 0.8;
            transform: translateY(-2px) scale(0.99);
          }
          100% { 
            opacity: 1; 
            transform: translateY(0) scale(1); 
          }
        }
        @keyframes progressFadeIn {
          0% { 
            opacity: 0; 
            transform: scaleX(0);
          }
          100% { 
            opacity: 1; 
            transform: scaleX(1);
          }
        }
        
        @keyframes subtleFloat {
          0%, 100% { 
            transform: translateY(0px) translateX(0px) rotate(0deg);
          }
          33% { 
            transform: translateY(-8px) translateX(3px) rotate(2deg);
          }
          66% { 
            transform: translateY(5px) translateX(-2px) rotate(-1deg);
          }
        }

        @keyframes loadingSpin {
          0% { 
            transform: rotate(0deg);
          }
          100% { 
            transform: rotate(360deg);
          }
        }
      `}</style>

      <AnimatedElement animation="fadeIn" delay={0}>
        <div style={{
          position: 'relative',
          background: 'rgba(255, 255, 255, 0.98)',
          backdropFilter: 'blur(20px)',
          borderRadius: '24px',
          boxShadow: '0 32px 64px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.3), 0 8px 32px rgba(0, 0, 0, 0.12)',
          padding: '40px',
          width: '100%',
          maxWidth: '620px',
          height: '530px',
          border: '1px solid rgba(229, 231, 235, 0.2)',
          overflow: 'visible',
          opacity: 0,
          animation: 'containerFadeIn 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards'
        }}>
          {/* Animated Progress Loading */}
          {isTransitioning && (
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 10,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '16px'
            }}>
              <div style={{
                width: '40px',
                height: '40px',
                border: '3px solid rgba(102, 126, 234, 0.1)',
                borderTop: '3px solid var(--color-primary)',
                borderRadius: '50%',
                animation: 'loadingSpin 1s linear infinite'
              }}></div>
              <p style={{ 
                color: '#6b7280', 
                fontSize: '14px', 
                fontWeight: '500',
                margin: '0'
              }}>
                {step === 1 ? 'Loading...' : 'Going back...'}
              </p>
            </div>
          )}

          {/* Step Progress Dots */}
          <div style={{ 
            position: 'absolute',
            top: '20px',
            right: '20px',
            display: 'flex',
            gap: '8px',
            opacity: isTransitioning ? 0.3 : 1,
            transition: 'opacity 0.3s ease'
          }}>
            <div style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: step >= 1 ? 'var(--color-primary)' : '#e5e7eb',
              transition: 'all 0.3s ease'
            }}></div>
            <div style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: step >= 2 ? 'var(--color-primary)' : '#e5e7eb',
              transition: 'all 0.3s ease'
            }}></div>
          </div>

          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '24px', position: 'relative' }}>
            {/* Back button for step 2 - positioned beside the title */}
            {step === 2 && (
              <button
                type="button"
                onClick={handleBack}
                style={{
                  position: 'absolute',
                  left: '0',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  padding: '10px',
                  color: '#6b7280',
                  fontWeight: '600',
                  borderRadius: '12px',
                  border: '2px solid #e5e7eb',
                  cursor: 'pointer',
                  background: 'white',
                  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '44px',
                  height: '44px'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--color-secondary)';
                  e.currentTarget.style.color = 'var(--color-primary)';
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.12)';
                  e.currentTarget.style.transform = 'translateY(-50%) translateY(-1px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#e5e7eb';
                  e.currentTarget.style.color = '#6b7280';
                  e.currentTarget.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.08)';
                  e.currentTarget.style.transform = 'translateY(-50%)';
                }}
              >
                <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            )}
            
            <AnimatedElement animation="slideInUp" delay={600}>
              <h1 style={{ 
                fontSize: '32px', 
                fontWeight: '700', 
                marginBottom: '8px', 
                background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                {step === 1 ? 'Join GradGrove' : `Create ${roleInput.charAt(0).toUpperCase() + roleInput.slice(1)} Account`}
              </h1>
              <p style={{ 
                color: '#6b7280', 
                fontSize: '16px',
                fontWeight: '400'
              }}>
                {step === 1 ? 'Choose your role to get started' : 'Enter your details to create account'}
              </p>
            </AnimatedElement>
          </div>

          {/* Content Container with smooth transitions */}
          <div style={{ 
            position: 'relative', 
            height: step === 2 ? '320px' : '250px',
            overflow: 'hidden',
            transition: 'height 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
          }}>
            {/* Step 1: Role Selection */}
            <div style={{
              position: step === 1 ? 'static' : 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              opacity: step === 1 && !isTransitioning ? 1 : 0,
              transform: step === 1 && !isTransitioning ? 'translateX(0)' : 'translateX(-50px)',
              transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
              pointerEvents: step === 1 && !isTransitioning ? 'auto' : 'none'
            }}>
              <AnimatedElement animation="fadeIn" delay={step === 1 ? 700 : 0}>
                <div>
                  <h3 style={{ 
                    fontSize: '20px', 
                    fontWeight: '600', 
                    color: '#374151',
                    marginBottom: '16px',
                    textAlign: 'center'
                  }}>Select your role</h3>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', marginBottom: '20px' }}>
                    {[
                      { role: 'student', title: 'Student' },
                      { role: 'counsellor', title: 'Counsellor' }
                    ].map((item, index) => (
                      <AnimatedElement key={item.role} animation="scaleIn" delay={800 + index * 80}>
                        <button
                          type="button"
                          onClick={() => handleRoleSelection(item.role)}
                          style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '8px',
                            padding: '20px 12px',
                            background: roleInput === item.role ? 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))' : 'white',
                            border: '2px solid',
                            borderColor: roleInput === item.role ? 'transparent' : '#e5e7eb',
                            borderRadius: '16px',
                            cursor: 'pointer',
                            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                            boxShadow: roleInput === item.role ? '0 12px 32px rgba(0, 0, 0, 0.2), 0 4px 16px rgba(0, 0, 0, 0.1)' : '0 4px 16px rgba(0, 0, 0, 0.08)',
                            transform: roleInput === item.role ? 'translateY(-2px) scale(1.02)' : 'translateY(0) scale(1)',
                            width: '100%'
                          }}
                          onMouseEnter={(e) => {
                            if (roleInput !== item.role) {
                              e.currentTarget.style.borderColor = 'var(--color-secondary)';
                              e.currentTarget.style.transform = 'translateY(-2px) scale(1.01)';
                              e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.12)';
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (roleInput !== item.role) {
                              e.currentTarget.style.borderColor = '#e5e7eb';
                              e.currentTarget.style.transform = 'translateY(0) scale(1)';
                              e.currentTarget.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.08)';
                            }
                          }}
                        >
                          <div style={{
                            width: '40px',
                            height: '40px',
                            borderRadius: '10px',
                            background: roleInput === item.role ? 'rgba(255, 255, 255, 0.2)' : 'var(--color-background)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: roleInput === item.role ? 'white' : 'var(--color-primary)'
                          }}>
                            {getRoleIcon(item.role)}
                          </div>
                          <h4 style={{ 
                            fontSize: '14px', 
                            fontWeight: '600', 
                            color: roleInput === item.role ? 'white' : '#1f2937',
                            margin: '0',
                            textAlign: 'center'
                          }}>
                            {item.title}
                          </h4>
                        </button>
                      </AnimatedElement>
                    ))}
                  </div>

                  {/* Continue Button */}
                  <AnimatedElement animation="slideInUp" delay={1000}>
                    <button
                      type="button"
                      onClick={handleContinue}
                      disabled={!roleInput}
                      style={{
                        width: '100%',
                        padding: '16px',
                        color: 'white',
                        fontWeight: '600',
                        borderRadius: '14px',
                        border: 'none',
                        cursor: roleInput ? 'pointer' : 'not-allowed',
                        background: roleInput 
                          ? 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))' 
                          : '#e5e7eb',
                        boxShadow: roleInput ? '0 12px 32px rgba(0, 0, 0, 0.2), 0 4px 16px rgba(0, 0, 0, 0.1)' : 'none',
                        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                        fontSize: '16px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        opacity: roleInput ? 1 : 0.6
                      }}
                      onMouseEnter={(e) => {
                        if (roleInput) {
                          e.currentTarget.style.transform = 'translateY(-2px)';
                          e.currentTarget.style.boxShadow = '0 12px 30px rgba(0, 0, 0, 0.18)';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (roleInput) {
                          e.currentTarget.style.transform = 'translateY(0)';
                          e.currentTarget.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.12)';
                        }
                      }}
                    >
                      Continue
                      <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{
                        transform: roleInput ? 'translateX(0)' : 'translateX(-8px)',
                        transition: 'transform 0.3s ease'
                      }}>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </button>
                  </AnimatedElement>
                </div>
              </AnimatedElement>
            </div>

            {/* Step 2: Signup Form */}
            {step === 2 && !isTransitioning && (
              <div style={{
                opacity: step === 2 && !isTransitioning ? 1 : 0,
                transform: step === 2 && !isTransitioning ? 'translateX(0)' : 'translateX(50px)',
                transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
              }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', paddingTop: '0px' }}>
                  {/* Signup Form */}
                  <AnimatedElement animation="fadeIn" delay={step === 2 ? 400 : 500}>
                    <div style={{ marginTop: '0px' }}>
                      {roleInput === 'student' ? (
                        <SignupStudent onSignup={handleSignup} />
                      ) : (
                        <SignupCounsellor onSignup={handleSignup} />
                      )}
                    </div>
                  </AnimatedElement>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div style={{ marginTop: '12px', textAlign: 'center' }}>
            <p style={{ fontSize: '14px', color: '#6b7280' }}>
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => router.push('/login')}
                style={{
                  color: 'var(--color-primary)',
                  fontWeight: '600',
                  textDecoration: 'none',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: 'inherit',
                  transition: 'color 0.2s ease'
                }}
                onMouseEnter={(e) => (e.target as HTMLButtonElement).style.color = '#4f46e5'}
                onMouseLeave={(e) => (e.target as HTMLButtonElement).style.color = 'var(--color-primary)'}
              >
                Sign in
              </button>
            </p>
          </div>
        </div>
      </AnimatedElement>
    </div>
  );
}
