"use client";
import React, { useState } from "react";
import StudentForm from "../pages/StudentForm";
import Navbar from "../common/Navbar";
import Footer from "../common/Footer";
import AnimatedElement from "../common/AnimatedElement";

interface FormData {
  [key: string]: string;
}

function StudentDashboard() {
  // Simulate form status (replace with real API/db logic)
  const [formFilled, setFormFilled] = useState(false);
  const [formData, setFormData] = useState<FormData | null>(null);
  const [showForm, setShowForm] = useState(false);

  // Callback for when form is submitted (this would typically make an API call)
  const handleFormSubmit = (data: FormData) => {
    setFormFilled(true);
    setFormData(data);
    setShowForm(false);
    console.log('Form submitted:', data);
  };

  // If showing form, render it full width without constraints
  if (showForm) {
    return (
      <div style={{ minHeight: '100vh', width: '100%' }}>
        <StudentForm onSubmit={handleFormSubmit} onCancel={() => setShowForm(false)} />
      </div>
    );
  }

  return (
    <div style={{ background: 'var(--color-background)', minHeight: '100vh', paddingBottom: '100px' }}>
      <AnimatedElement animation="fadeIn">
        <h1 style={{ color: 'var(--color-primary)', marginTop: 24, textAlign: 'center', fontWeight: 700, paddingTop: 24 }}>Student Dashboard</h1>
      </AnimatedElement>
      
      <AnimatedElement animation="scaleIn" delay={200}>
        <div className="hover-lift transition-all" style={{ background: '#f3f4f6', borderRadius: 12, padding: 24, margin: '24px auto', boxShadow: '0 1px 8px rgba(0,0,0,0.08)', maxWidth: 800 }}>
          {!formFilled ? (
            <>
              <AnimatedElement animation="slideInLeft" delay={300}>
                <span style={{ color: 'var(--color-warning)', fontWeight: 500 }}>You have not filled the Student Form yet.</span>
              </AnimatedElement>
              <div style={{ marginTop: 16 }}>
                <AnimatedElement animation="slideInUp" delay={400}>
                  <button 
                    className="hover-scale transition-all" 
                    style={{ 
                      background: 'var(--color-primary)', 
                      color: '#fff', 
                      padding: '12px 32px', 
                      borderRadius: 8, 
                      fontWeight: 600, 
                      fontSize: 17, 
                      boxShadow: '0 1px 4px rgba(0,0,0,0.10)', 
                      border: 'none', 
                      cursor: 'pointer' 
                    }} 
                    onClick={() => setShowForm(true)}
                  >
                    Fill Student Form
                  </button>
                </AnimatedElement>
              </div>
            </>
          ) : (
            <>
              <AnimatedElement animation="slideInRight" delay={300}>
                <span style={{ color: 'var(--color-success)', fontWeight: 500 }}>Student Form already filled.</span>
              </AnimatedElement>
              <AnimatedElement animation="slideInUp" delay={400}>
                <div style={{ marginTop: 16, color: '#555' }}>
                  <b>Details:</b>
                  <ul style={{ marginTop: 8 }}>
                    {formData && Object.entries(formData).slice(0, 5).map(([key, value], index) => (
                      <AnimatedElement key={key} animation="fadeIn" delay={500 + (index * 50)}>
                        <li><b>{key}:</b> {value}</li>
                      </AnimatedElement>
                    ))}
                    {formData && Object.keys(formData).length > 5 && (
                      <li style={{ color: '#888', fontStyle: 'italic' }}>
                        ... and {Object.keys(formData).length - 5} more fields
                      </li>
                    )}
                  </ul>
                  <button 
                    disabled 
                    className="transition-all" 
                    style={{ 
                      background: '#ddd', 
                      color: '#888', 
                      cursor: 'not-allowed', 
                      marginTop: 12, 
                      borderRadius: 6, 
                      padding: '8px 16px', 
                      border: 'none' 
                    }}
                  >
                    Already Filled
                  </button>
                </div>
              </AnimatedElement>
            </>
          )}
        </div>
      </AnimatedElement>
    </div>
  );
}

export default StudentDashboard;