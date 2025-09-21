"use client";
import React, { useState } from "react";

function validateFirstName(name: string): string {
  if (!name.trim()) return 'First name is required.';
  if (!/^[A-Za-z]+$/.test(name)) return 'First name must only contain letters.';
  return '';
}

function validateMiddleName(name: string): string {
  if (name && !/^[A-Za-z]+$/.test(name)) return 'Middle name must only contain letters.';
  return '';
}

function validateLastName(name: string): string {
  if (name && !/^[A-Za-z]+$/.test(name)) return 'Last name must only contain letters.';
  return '';
}

function validatePhone(phone: string): string {
  // Must be 10 digits
  if (!/^\d{10}$/.test(phone)) return 'Phone number must be 10 digits.';
  return '';
}

function validateRoll(roll: string): string {
  if (!/^\d+$/.test(roll)) return 'Roll number must be numeric.';
  return '';
}

function validateEmail(email: string): string {
  // Basic email regex
  if (!/^\S+@\S+\.\S+$/.test(email)) return 'Enter a valid email address.';
  return '';
}

function validatePassword(password: string): string[] {
  let errors = [];
  if (password.length < 8) errors.push('• At least 8 characters (e.g. Abcdef12!)');
  if (!/[A-Z]/.test(password)) errors.push('• At least one uppercase letter (A-Z)');
  if (!/[a-z]/.test(password)) errors.push('• At least one lowercase letter (a-z)');
  if (!/\d/.test(password)) errors.push('• At least one number (0-9)');
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) errors.push('• At least one special character (e.g. !, @, #, $)');
  return errors;
}

interface SignupStudentProps {
  onSignup?: (data: any) => void;
}

export default function SignupStudent({ onSignup }: SignupStudentProps) {
  const [form, setForm] = useState({
    roll: '',
    email: '',
    password: '',
    firstName: '',
    middleName: '',
    lastName: '',
    phone: ''
  });
  const [errors, setErrors] = useState<any>({});
  const [countryCode, setCountryCode] = useState('+91');
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: any = {};
    newErrors.roll = validateRoll(form.roll);
    newErrors.email = validateEmail(form.email);
    newErrors.password = validatePassword(form.password);
    newErrors.firstName = validateFirstName(form.firstName);
    newErrors.middleName = validateMiddleName(form.middleName);
    newErrors.lastName = validateLastName(form.lastName);
    newErrors.phone = validatePhone(form.phone);
    setErrors(newErrors);
    if (Object.values(newErrors).every(x => !x || (Array.isArray(x) && x.length === 0))) {
      onSignup && onSignup({ ...form, phone: countryCode + form.phone });
    }
  };

  const inputStyle = {
    width: '100%',
    padding: '12px',
    border: '2px solid #e5e7eb',
    borderRadius: '10px',
    fontSize: '14px',
    background: 'white',
    color: '#111827',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    outline: 'none',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)'
  };

  const focusStyle = {
    borderColor: 'var(--color-secondary)',
    boxShadow: '0 0 0 3px rgba(24, 154, 180, 0.1), 0 8px 24px rgba(0, 0, 0, 0.08)',
    transform: 'translateY(-1px)'
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* Row 1: Roll Number and Email */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <label style={{ fontSize: '14px', fontWeight: '600', color: '#374151' }}>
            Roll Number *
          </label>
          <input
            name="roll"
            type="text"
            placeholder="Roll number"
            value={form.roll}
            onChange={handleChange}
            required
            style={inputStyle}
            onFocus={(e) => {
              e.target.style.borderColor = 'var(--color-secondary)';
              e.target.style.boxShadow = '0 0 0 3px rgba(24, 154, 180, 0.1), 0 8px 24px rgba(0, 0, 0, 0.08)';
              e.target.style.transform = 'translateY(-1px)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = '#e5e7eb';
              e.target.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.04)';
              e.target.style.transform = 'translateY(0)';
            }}
          />
          {errors.roll && (
            <span style={{ color: '#dc2626', fontSize: '12px', fontWeight: '500' }}>
              {errors.roll}
            </span>
          )}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <label style={{ fontSize: '14px', fontWeight: '600', color: '#374151' }}>
            Email *
          </label>
          <input
            name="email"
            type="email"
            placeholder="Email address"
            value={form.email}
            onChange={handleChange}
            required
            style={inputStyle}
            onFocus={(e) => {
              e.target.style.borderColor = 'var(--color-secondary)';
              e.target.style.boxShadow = '0 0 0 3px rgba(24, 154, 180, 0.1), 0 8px 24px rgba(0, 0, 0, 0.08)';
              e.target.style.transform = 'translateY(-1px)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = '#e5e7eb';
              e.target.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.04)';
              e.target.style.transform = 'translateY(0)';
            }}
          />
          {errors.email && (
            <span style={{ color: '#dc2626', fontSize: '12px', fontWeight: '500' }}>
              {errors.email}
            </span>
          )}
        </div>
      </div>

      {/* Row 2: Name Fields */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <label style={{ fontSize: '14px', fontWeight: '600', color: '#374151' }}>
            First Name *
          </label>
          <input
            name="firstName"
            type="text"
            placeholder="First name"
            value={form.firstName}
            onChange={handleChange}
            required
            style={inputStyle}
            onFocus={(e) => {
              e.target.style.borderColor = 'var(--color-secondary)';
              e.target.style.boxShadow = '0 0 0 3px rgba(24, 154, 180, 0.1), 0 8px 24px rgba(0, 0, 0, 0.08)';
              e.target.style.transform = 'translateY(-1px)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = '#e5e7eb';
              e.target.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.04)';
              e.target.style.transform = 'translateY(0)';
            }}
          />
          {errors.firstName && (
            <span style={{ color: '#dc2626', fontSize: '12px', fontWeight: '500' }}>
              {errors.firstName}
            </span>
          )}
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <label style={{ fontSize: '14px', fontWeight: '600', color: '#374151' }}>
            Middle Name
          </label>
          <input
            name="middleName"
            type="text"
            placeholder="Middle name"
            value={form.middleName}
            onChange={handleChange}
            style={inputStyle}
            onFocus={(e) => {
              e.target.style.borderColor = 'var(--color-secondary)';
              e.target.style.boxShadow = '0 0 0 3px rgba(24, 154, 180, 0.1), 0 8px 24px rgba(0, 0, 0, 0.08)';
              e.target.style.transform = 'translateY(-1px)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = '#e5e7eb';
              e.target.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.04)';
              e.target.style.transform = 'translateY(0)';
            }}
          />
          {errors.middleName && (
            <span style={{ color: '#dc2626', fontSize: '12px', fontWeight: '500' }}>
              {errors.middleName}
            </span>
          )}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <label style={{ fontSize: '14px', fontWeight: '600', color: '#374151' }}>
            Last Name
          </label>
          <input
            name="lastName"
            type="text"
            placeholder="Last name"
            value={form.lastName}
            onChange={handleChange}
            style={inputStyle}
            onFocus={(e) => {
              e.target.style.borderColor = 'var(--color-secondary)';
              e.target.style.boxShadow = '0 0 0 3px rgba(24, 154, 180, 0.1), 0 8px 24px rgba(0, 0, 0, 0.08)';
              e.target.style.transform = 'translateY(-1px)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = '#e5e7eb';
              e.target.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.04)';
              e.target.style.transform = 'translateY(0)';
            }}
          />
          {errors.lastName && (
            <span style={{ color: '#dc2626', fontSize: '12px', fontWeight: '500' }}>
              {errors.lastName}
            </span>
          )}
        </div>
      </div>

      {/* Row 3: Password and Phone */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <label style={{ fontSize: '14px', fontWeight: '600', color: '#374151' }}>Password *</label>
          <div style={{ position: 'relative' }}>
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter password"
              value={form.password}
              onChange={handleChange}
              required
              style={{
                ...inputStyle,
                paddingRight: '48px'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = 'var(--color-secondary)';
                e.target.style.boxShadow = '0 0 0 3px rgba(24, 154, 180, 0.1), 0 8px 24px rgba(0, 0, 0, 0.08)';
                e.target.style.transform = 'translateY(-1px)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#e5e7eb';
                e.target.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.04)';
                e.target.style.transform = 'translateY(0)';
              }}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: 'absolute',
                top: '50%',
                right: '16px',
                transform: 'translateY(-50%)',
                background: 'none',
                border: 'none',
                color: '#9ca3af',
                cursor: 'pointer',
                padding: '4px',
                borderRadius: '4px',
                transition: 'color 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-primary)'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#9ca3af'}
            >
              {showPassword ? (
                <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                </svg>
              ) : (
                <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              )}
            </button>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <label style={{ fontSize: '14px', fontWeight: '600', color: '#374151' }}>
            Phone Number *
          </label>
          <div style={{ display: 'flex', gap: '6px' }}>
            <select
              value={countryCode}
              onChange={(e) => setCountryCode(e.target.value)}
              style={{
                ...inputStyle,
                width: '70px',
                flexShrink: 0
              }}
            >
              <option value="+91">+91</option>
              <option value="+1">+1</option>
              <option value="+44">+44</option>
              <option value="+61">+61</option>
            </select>
            <input
              name="phone"
              type="text"
              placeholder="Phone number"
              value={form.phone}
              onChange={handleChange}
              required
              style={{
                ...inputStyle,
                flex: 1
              }}
              onFocus={(e) => {
                e.target.style.borderColor = 'var(--color-secondary)';
                e.target.style.boxShadow = '0 0 0 3px rgba(24, 154, 180, 0.1), 0 8px 24px rgba(0, 0, 0, 0.08)';
                e.target.style.transform = 'translateY(-1px)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#e5e7eb';
                e.target.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.04)';
                e.target.style.transform = 'translateY(0)';
              }}
            />
          </div>
          {errors.phone && (
            <span style={{ color: '#dc2626', fontSize: '12px', fontWeight: '500' }}>
              {errors.phone}
            </span>
          )}
        </div>
      </div>

      {/* Password validation errors */}
      {Array.isArray(errors.password) && errors.password.length > 0 && (
        <div style={{
          color: '#dc2626',
          fontSize: '12px',
          background: '#fef2f2',
          padding: '8px',
          borderRadius: '6px',
          border: '1px solid #fecaca'
        }}>
          <div style={{ fontWeight: '600', marginBottom: '4px' }}>Password must include:</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2px' }}>
            {errors.password.map((rule: string, idx: number) => (
              <div key={idx} style={{ fontSize: '11px' }}>{rule}</div>
            ))}
          </div>
          <div style={{ color: '#6b7280', fontSize: '11px', marginTop: '4px' }}>
            Example: <strong>Abcdef12!</strong>
          </div>
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        style={{
          width: '100%',
          padding: '12px 24px',
          color: 'white',
          fontWeight: '600',
          borderRadius: '12px',
          border: 'none',
          cursor: 'pointer',
          background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))',
          boxShadow: '0 8px 24px rgba(102, 126, 234, 0.3), 0 4px 12px rgba(0, 0, 0, 0.1)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          fontSize: '15px',
          marginTop: '4px'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-2px)';
          e.currentTarget.style.boxShadow = '0 12px 32px rgba(102, 126, 234, 0.4), 0 6px 16px rgba(0, 0, 0, 0.15)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 8px 24px rgba(102, 126, 234, 0.3), 0 4px 12px rgba(0, 0, 0, 0.1)';
        }}
      >
        Create Student Account
      </button>
    </form>
  );
}
