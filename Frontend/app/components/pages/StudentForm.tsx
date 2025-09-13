"use client";
import React, { useState } from "react";
import { toast } from "react-toastify";

interface Field {
  label: string;
  name: string;
  type: 'select' | 'number' | 'textarea' | 'text' | 'email' | 'date';
  options?: string[];
  min?: number;
  max?: number;
  placeholder?: string;
}

interface Section {
  name: string;
  fields: Field[];
  icon: string;
}

interface StudentFormProps {
  onSubmit?: (data: Record<string, string>) => void;
  onCancel?: () => void;
}

export default function StudentForm({ onSubmit, onCancel }: StudentFormProps = {}) {
  // Section definitions
  const sections: Section[] = [
    {
      name: 'Personal Information',
      icon: '👤',
      fields: [
        { label: 'Enter your full name:', name: 'fullName', type: 'text', placeholder: 'e.g., John Doe' },
        { label: 'Email Address:', name: 'email', type: 'email', placeholder: 'e.g., john.doe@email.com' },
        { label: 'Date of Birth:', name: 'dateOfBirth', type: 'date' },
        { label: 'Roll Number:', name: 'rollNumber', type: 'text', placeholder: 'e.g., 21CSE001' },
        { label: 'Current Year:', name: 'currentYear', type: 'select', options: ['1st Year', '2nd Year', '3rd Year', '4th Year'] },
        { label: 'Current Semester:', name: 'currentSemester', type: 'select', options: ['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th'] },
        { label: 'Section:', name: 'section', type: 'select', options: ['A', 'B', 'C'] },
        { label: 'Department:', name: 'department', type: 'select', options: ['CSE', 'IT', 'ECE', 'EEE', 'Mechanical', 'Civil'] },
        { label: 'Gender:', name: 'gender', type: 'select', options: ['Male', 'Female', 'Other', 'Prefer not to say'] },
        { label: 'Phone Number:', name: 'phoneNumber', type: 'text', placeholder: 'e.g., +91 9876543210' },
      ]
    },
    {
      name: 'Academic Details',
      icon: '📚',
      fields: [
        { label: 'What is your current attendance rate? (0-100%)', name: 'attendance', type: 'number', min: 0, max: 100 },
        { label: 'How would you describe your grade trend over the past year?', name: 'gradeTrend', type: 'select', options: ['Improving consistently', 'Remaining stable', 'Declining gradually', 'Declining rapidly', 'Fluctuating unpredictably'] },
        { label: 'How would you rate your proficiency in the language of instruction?', name: 'languageProficiency', type: 'select', options: ['Native speaker', 'Fluent', 'Intermediate', 'Basic', 'Beginner'] },
        { label: 'Does the language of instruction match your proficiency level?', name: 'languageMatch', type: 'select', options: ['Yes', 'No'] },
        { label: 'How many times have you transferred schools in the past 3 years?', name: 'schoolTransfers', type: 'select', options: ['None', 'Once', 'Twice', 'Three or more times'] },
      ]
    },
    {
      name: 'Background Information',
      icon: '🏠',
      fields: [
        { label: 'What is your current marital status?', name: 'maritalStatus', type: 'select', options: ['Single', 'Married', 'Divorced', 'Separated', 'Widowed'] },
        { label: 'Are you experiencing any chronic illness or health condition?', name: 'chronicIllness', type: 'select', options: ['Yes', 'No', 'Prefer not to say'] },
        { label: 'Do you have caregiving responsibilities for family members?', name: 'caregiving', type: 'select', options: ['Yes, significant responsibilities', 'Yes, minor responsibilities', 'No'] },
        { label: 'Have you entered into marriage at an early age?', name: 'earlyMarriage', type: 'select', options: ['Yes', 'No', 'Not applicable'] },
      ]
    },
    {
      name: 'Financial Background',
      icon: '💰',
      fields: [
        { label: 'How would you describe your tuition fee payment status?', name: 'tuitionStatus', type: 'select', options: ['Always paid on time', 'Occasionally delayed', 'Frequently delayed', 'Relying on financial aid/scholarships', 'Facing significant financial constraints'] },
      ]
    },
    {
      name: 'Family Background',
      icon: '👨‍👩‍👧‍👦',
      fields: [
        { label: "What is your parents' marital status?", name: 'parentsMarital', type: 'select', options: ['Married and living together', 'Separated', 'Divorced', 'Widowed', 'Never married'] },
        { label: 'Does your family have a migrant background?', name: 'migrantBackground', type: 'select', options: ['Yes, first-generation migrants', 'Yes, second-generation migrants', 'No'] },
      ]
    },
    {
      name: 'Social Factors',
      icon: '👥',
      fields: [
        { label: 'How would you describe your relationships with peers?', name: 'peerRelations', type: 'select', options: ['Excellent - I have many friends and good relationships', 'Good - I have some friends and generally positive relationships', 'Fair - I have few friends but no major conflicts', 'Poor - I experience regular conflicts or feel isolated', 'Very poor - I face bullying or complete social isolation'] },
        { label: 'Have you engaged in substance abuse (alcohol, drugs, etc.)?', name: 'substanceAbuse', type: 'select', options: ['Never', 'Experimented occasionally', 'Use regularly', 'Have struggled with addiction in the past', 'Prefer not to answer'] },
        { label: 'Do you have any disciplinary records or behavioral issues at school?', name: 'disciplinary', type: 'select', options: ['None', 'Minor incidents', 'Multiple incidents', 'Serious behavioral issues', 'Prefer not to answer'] },
        { label: 'How often do you attend counseling sessions when offered?', name: 'counselingAttendance', type: 'select', options: ['Always', 'Often', 'Occasionally', 'Rarely', 'Never'] },
      ]
    },
    {
      name: 'Additional Information',
      icon: '📝',
      fields: [
        { label: 'Is there any other personal circumstance that you believe affects your academic performance that you would like to share?', name: 'additionalInfo', type: 'textarea' },
      ]
    }
  ];

  const [form, setForm] = useState<Record<string, string>>({
    // Personal Information
    fullName: '',
    dateOfBirth: '',
    email: '',
    rollNumber: '',
    currentYear: '',
    currentSemester: '',
    section: '',
    department: '',
    gender: '',
    phoneNumber: '',
    // Academic Details
    attendance: '',
    gradeTrend: '',
    languageProficiency: '',
    languageMatch: '',
    schoolTransfers: '',
    // Background Information
    maritalStatus: '',
    chronicIllness: '',
    caregiving: '',
    earlyMarriage: '',
    // Financial Background
    tuitionStatus: '',
    // Family Background
    parentsMarital: '',
    migrantBackground: '',
    // Social Factors
    peerRelations: '',
    substanceAbuse: '',
    disciplinary: '',
    counselingAttendance: '',
    // Additional Information
    additionalInfo: ''
  });
  const [activeSection, setActiveSection] = useState(0);
  const [completed, setCompleted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCompleted(true);
    if (onSubmit) {
      onSubmit(form);
    } else {
      toast.success('Form submitted successfully!');
    }
  };

  const handleSectionClick = (index: number) => {
    setActiveSection(index);
  };

  const isFormValid = () => {
    const currentSection = sections[activeSection];
    return currentSection.fields.every(field => {
      if (field.type === 'textarea' && activeSection === sections.length - 1) {
        return true; // Additional info is optional
      }
      return form[field.name] && form[field.name].trim() !== '';
    });
  };

  if (completed) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        padding: '20px'
      }}>
        <div style={{ 
          maxWidth: 600, 
          background: '#fff', 
          padding: 60, 
          borderRadius: 20, 
          boxShadow: '0 20px 60px rgba(0,0,0,0.1)', 
          textAlign: 'center' 
        }}>
          <div style={{ fontSize: 80, marginBottom: 20 }}>🎉</div>
          <h2 style={{ color: '#2d3748', marginBottom: 16, fontSize: 28, fontWeight: 700 }}>
            Thank you for submitting the Student Questionnaire!
          </h2>
          <p style={{ color: '#718096', fontSize: 16, lineHeight: 1.6 }}>
            Your responses have been saved successfully. Our counseling team will review your information and reach out to you soon.
          </p>
        </div>
      </div>
    );
  }

  const currentSection = sections[activeSection];
  const completedSections = sections.reduce((count, section, index) => {
    const allFieldsFilled = section.fields.every(field => {
      if (field.type === 'textarea' && index === sections.length - 1) return true;
      return form[field.name] && form[field.name].trim() !== '';
    });
    return count + (allFieldsFilled ? 1 : 0);
  }, 0);
  const progress = (completedSections / sections.length) * 100;

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
      fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
      display: 'flex'
    }}>
      <div style={{ display: 'flex', width: '100%', minHeight: '100vh' }}>
        
        {/* Left Sidebar - Navigation Panel (20-25% width) */}
        <div style={{ 
          width: '280px', 
          minWidth: '280px',
          background: '#fff', 
          borderRight: '1px solid #e2e8f0',
          boxShadow: '2px 0 15px rgba(0,0,0,0.08)',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative'
        }}>
          {/* Header */}
          <div style={{ 
            padding: '32px 24px 24px', 
            borderBottom: '1px solid #e2e8f0',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: '#fff'
          }}>
            <h1 style={{ 
              fontSize: 24, 
              fontWeight: 700, 
              margin: '0 0 8px 0' 
            }}>
              Student Form
            </h1>
            <p style={{ 
              margin: 0, 
              opacity: 0.9, 
              fontSize: 14 
            }}>
              Complete all sections to proceed
            </p>
          </div>

          {/* Progress Indicator */}
          <div style={{ 
            padding: '24px', 
            borderBottom: '1px solid #f1f5f9',
            background: '#fafbfc'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <span style={{ fontSize: 15, fontWeight: 600, color: '#374151' }}>
                Progress
              </span>
              <span style={{ fontSize: 16, fontWeight: 700, color: '#667eea' }}>
                {Math.round((completedSections / sections.length) * 100)}%
              </span>
            </div>
            <div style={{ 
              height: 10, 
              background: '#e5e7eb', 
              borderRadius: 6, 
              overflow: 'hidden',
              boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.1)'
            }}>
              <div style={{ 
                width: `${(completedSections / sections.length) * 100}%`, 
                height: '100%', 
                background: 'linear-gradient(90deg, #667eea, #764ba2)',
                borderRadius: 6,
                transition: 'width 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
              }} />
            </div>
          </div>

          {/* Section Navigation */}
          <div style={{ 
            flex: 1,
            overflowY: 'auto',
            padding: '8px 0'
          }}>
            {sections.map((section, index) => {
              const isActive = activeSection === index;
              const isCompleted = sections.slice(0, index).every((sec, idx) => 
                sec.fields.every(field => {
                  if (field.type === 'textarea' && idx === sections.length - 1) return true;
                  return form[field.name] && form[field.name].trim() !== '';
                })
              );
              
              return (
                <button
                  key={index}
                  onClick={() => handleSectionClick(index)}
                  style={{
                    width: '100%',
                    padding: '18px 24px',
                    background: isActive ? 'linear-gradient(135deg, #eff6ff, #dbeafe)' : 'transparent',
                    border: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 14,
                    color: isActive ? '#1e40af' : '#6b7280',
                    fontSize: 15,
                    fontWeight: isActive ? 600 : 500,
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    borderLeft: isActive ? '4px solid #3b82f6' : '4px solid transparent',
                    margin: '2px 0'
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.background = '#f9fafb';
                      e.currentTarget.style.color = '#374151';
                      e.currentTarget.style.transform = 'translateX(4px)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.background = 'transparent';
                      e.currentTarget.style.color = '#6b7280';
                      e.currentTarget.style.transform = 'translateX(0)';
                    }
                  }}
                >
                  <span style={{ fontSize: 20 }}>{section.icon}</span>
                  <span style={{ flex: 1, lineHeight: 1.4 }}>{section.name}</span>
                  {isCompleted && (
                    <span style={{ 
                      color: '#10b981', 
                      fontSize: 18,
                      transform: 'scale(1.1)'
                    }}>
                      ✓
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Main Content Area (75-80% width) */}
        <div style={{ 
          flex: 1, 
          minHeight: '100vh',
          background: '#fff',
          display: 'flex',
          flexDirection: 'column'
        }}>
          {/* Progress Bar at Top */}
          <div style={{
            position: 'sticky',
            top: 0,
            zIndex: 5,
            background: '#fff',
            borderBottom: '1px solid #e5e7eb',
            padding: '20px 40px'
          }}>
            <div style={{ 
              width: '100%'
            }}>
              <div style={{ 
                height: 4, 
                background: '#f3f4f6', 
                borderRadius: 4, 
                overflow: 'hidden',
                boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.1)'
              }}>
                <div style={{ 
                  width: `${((activeSection + 1) / sections.length) * 100}%`, 
                  height: '100%', 
                  background: 'linear-gradient(90deg, #3b82f6, #1d4ed8)',
                  borderRadius: 4,
                  transition: 'width 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
                }} />
              </div>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: 8
              }}>
                <span style={{ fontSize: 14, color: '#6b7280' }}>
                  Step {activeSection + 1} of {sections.length}
                </span>
                <span style={{ fontSize: 14, fontWeight: 600, color: '#3b82f6' }}>
                  {Math.round(((activeSection + 1) / sections.length) * 100)}% Complete
                </span>
              </div>
            </div>
          </div>

          {/* Form Container */}
          <div style={{ 
            flex: 1,
            padding: '48px 40px',
            width: '100%',
            boxSizing: 'border-box'
          }}>
            <form onSubmit={handleSubmit}>
              {/* Section Header */}
              <div style={{ marginBottom: 48 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 12 }}>
                  <span style={{ fontSize: 32 }}>{currentSection.icon}</span>
                  <h1 style={{ 
                    fontSize: 36, 
                    fontWeight: 700, 
                    color: '#1f2937', 
                    margin: 0,
                    letterSpacing: '-0.02em'
                  }}>
                    {currentSection.name}
                  </h1>
                </div>
                <p style={{ 
                  color: '#6b7280', 
                  fontSize: 18, 
                  margin: 0,
                  lineHeight: 1.6,
                  maxWidth: '800px'
                }}>
                  {activeSection === 0 && "Please provide your basic information to help us serve you better and ensure accurate records."}
                  {activeSection === 1 && "Tell us about your academic performance, learning experience, and educational background."}
                  {activeSection === 2 && "Share information about your personal circumstances and current situation."}
                  {activeSection === 3 && "Help us understand your financial situation and any support requirements."}
                  {activeSection === 4 && "Tell us about your family background and support system."}
                  {activeSection === 5 && "Share information about your social interactions, behaviors, and personal development."}
                  {activeSection === 6 && "Add any additional information you'd like to share that might be helpful."}
                </p>
              </div>

              {/* Form Fields Grid */}
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: '1fr 1fr', 
                gap: '32px 56px',
                marginBottom: 48,
                width: '100%',
                alignItems: 'start'
              }}>
                {currentSection.fields.map((field, fieldIndex) => {
                  // Simple logic: if only one question in section AND it's long answer type, then full width
                  // Otherwise, use two columns for all fields
                  const isFullWidth = 
                    (currentSection.fields.length === 1 && field.type === 'textarea');

                  return (
                    <div 
                      key={field.name} 
                      style={{ 
                        gridColumn: isFullWidth ? '1 / 3' : 'auto',
                        animation: `fadeInUp 0.4s ease ${fieldIndex * 0.05}s both`,
                        width: '100%'
                      }}
                    >
                      <style jsx>{`
                        @keyframes fadeInUp {
                          from {
                            opacity: 0;
                            transform: translateY(20px);
                          }
                          to {
                            opacity: 1;
                            transform: translateY(0);
                          }
                        }
                      `}</style>
                      
                      <label style={{ 
                        display: 'flex', 
                        flexDirection: 'column', 
                        gap: 12
                      }}>
                        <span style={{ 
                          fontSize: 16, 
                          fontWeight: 600, 
                          color: '#374151',
                          lineHeight: 1.4
                        }}>
                          {field.label}
                          {field.name !== 'additionalInfo' && (
                            <span style={{ color: '#dc2626', fontSize: 14, marginLeft: 4 }}>*</span>
                          )}
                        </span>
                    
                        {field.type === 'select' ? (
                          <select 
                            name={field.name} 
                            value={form[field.name]} 
                            onChange={handleChange} 
                            required={field.name !== 'additionalInfo'}
                            style={{ 
                              padding: '16px 20px', 
                              borderRadius: 12, 
                              border: '2px solid #e5e7eb', 
                              fontSize: 16, 
                              background: '#fff',
                              color: '#374151',
                              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                              outline: 'none',
                              width: '100%',
                              boxSizing: 'border-box',
                              cursor: 'pointer'
                            }}
                            onFocus={(e) => {
                              e.target.style.borderColor = '#3b82f6';
                              e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
                            }}
                            onBlur={(e) => {
                              e.target.style.borderColor = '#e5e7eb';
                              e.target.style.boxShadow = 'none';
                            }}
                          >
                            <option value="">Select an option</option>
                            {field.options?.map((opt: string) => (
                              <option key={opt} value={opt}>{opt}</option>
                            ))}
                          </select>
                        ) : field.type === 'textarea' ? (
                          <textarea 
                            name={field.name} 
                            value={form[field.name]} 
                            onChange={handleChange} 
                            rows={5}
                            placeholder={field.placeholder || "Share any additional information here..."}
                            style={{ 
                              padding: '16px 20px', 
                              borderRadius: 12, 
                              border: '2px solid #e5e7eb', 
                              fontSize: 16, 
                              background: '#fff',
                              color: '#374151',
                              resize: 'vertical',
                              fontFamily: 'inherit',
                              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                              outline: 'none',
                              width: '100%',
                              boxSizing: 'border-box',
                              minHeight: '120px'
                            }}
                            onFocus={(e) => {
                              e.target.style.borderColor = '#3b82f6';
                              e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
                            }}
                            onBlur={(e) => {
                              e.target.style.borderColor = '#e5e7eb';
                              e.target.style.boxShadow = 'none';
                            }}
                          />
                        ) : (
                          <input 
                            type={field.type} 
                            name={field.name} 
                            value={form[field.name]} 
                            onChange={handleChange} 
                            min={field.min} 
                            max={field.max}
                            placeholder={field.placeholder}
                        required={field.name !== 'additionalInfo'}
                        style={{ 
                          padding: '16px 20px', 
                          borderRadius: 12, 
                          border: '2px solid #e5e7eb', 
                          fontSize: 16, 
                          background: '#fff',
                          color: '#374151',
                          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                          outline: 'none',
                          fontFamily: 'inherit',
                          width: '100%',
                          boxSizing: 'border-box'
                        }}
                        onFocus={(e) => {
                          e.target.style.borderColor = '#3b82f6';
                          e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = '#e5e7eb';
                          e.target.style.boxShadow = 'none';
                        }}
                      />
                    )}
                      </label>
                    </div>
                  );
                })}
              </div>

              {/* Navigation Buttons */}
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                marginTop: 56,
                paddingTop: 32,
                borderTop: '2px solid #f3f4f6'
              }}>
                <div style={{ display: 'flex', gap: '16px' }}>
                  {onCancel && (
                    <button
                      type="button"
                      onClick={onCancel}
                      style={{
                        padding: '16px 32px',
                        borderRadius: 12,
                        border: '2px solid #dc2626',
                        background: '#fff',
                        color: '#dc2626',
                        fontSize: 16,
                        fontWeight: 600,
                        cursor: 'pointer',
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        transform: 'translateY(0)'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = '#dc2626';
                        e.currentTarget.style.color = '#fff';
                        e.currentTarget.style.transform = 'translateY(-2px)';
                        e.currentTarget.style.boxShadow = '0 8px 25px rgba(220, 38, 38, 0.3)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = '#fff';
                        e.currentTarget.style.color = '#dc2626';
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    >
                      Cancel
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => activeSection > 0 && handleSectionClick(activeSection - 1)}
                    disabled={activeSection === 0}
                    style={{
                      padding: '16px 32px',
                      borderRadius: 12,
                      border: '2px solid #e5e7eb',
                      background: '#fff',
                      color: activeSection === 0 ? '#9ca3af' : '#374151',
                      fontSize: 16,
                      fontWeight: 600,
                      cursor: activeSection === 0 ? 'not-allowed' : 'pointer',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      opacity: activeSection === 0 ? 0.5 : 1,
                      transform: 'translateY(0)'
                    }}
                    onMouseEnter={(e) => {
                      if (activeSection > 0) {
                        e.currentTarget.style.borderColor = '#d1d5db';
                        e.currentTarget.style.background = '#f9fafb';
                        e.currentTarget.style.transform = 'translateY(-2px)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (activeSection > 0) {
                        e.currentTarget.style.borderColor = '#e5e7eb';
                        e.currentTarget.style.background = '#fff';
                        e.currentTarget.style.transform = 'translateY(0)';
                      }
                    }}
                  >
                    ← Previous
                  </button>
                </div>

                {activeSection < sections.length - 1 ? (
                  <button
                    type="button"
                    onClick={() => isFormValid() && handleSectionClick(activeSection + 1)}
                    disabled={!isFormValid()}
                    style={{
                      padding: '16px 40px',
                      borderRadius: 12,
                      border: 'none',
                      background: !isFormValid() ? '#9ca3af' : 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
                      color: '#fff',
                      fontSize: 16,
                      fontWeight: 600,
                      cursor: !isFormValid() ? 'not-allowed' : 'pointer',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      opacity: !isFormValid() ? 0.6 : 1,
                      transform: 'translateY(0)',
                      boxShadow: !isFormValid() ? 'none' : '0 4px 15px rgba(59, 130, 246, 0.3)'
                    }}
                    onMouseEnter={(e) => {
                      if (isFormValid()) {
                        e.currentTarget.style.transform = 'translateY(-3px)';
                        e.currentTarget.style.boxShadow = '0 10px 30px rgba(59, 130, 246, 0.4)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (isFormValid()) {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = '0 4px 15px rgba(59, 130, 246, 0.3)';
                      }
                    }}
                  >
                    Next →
                  </button>
                ) : (
                  <button
                    type="submit"
                    style={{
                      padding: '16px 40px',
                      borderRadius: 12,
                      border: 'none',
                      background: 'linear-gradient(135deg, #10b981, #059669)',
                      color: '#fff',
                      fontSize: 16,
                      fontWeight: 600,
                      cursor: 'pointer',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      transform: 'translateY(0)',
                      boxShadow: '0 4px 15px rgba(16, 185, 129, 0.3)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-3px)';
                      e.currentTarget.style.boxShadow = '0 10px 30px rgba(16, 185, 129, 0.4)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 4px 15px rgba(16, 185, 129, 0.3)';
                    }}
                  >
                    🎉 Submit Form
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
