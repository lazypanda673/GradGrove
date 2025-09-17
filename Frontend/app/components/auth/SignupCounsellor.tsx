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

interface SignupCounsellorProps {
    onSignup?: (data: any) => void;
}

export default function SignupCounsellor({ onSignup }: SignupCounsellorProps) {
    const [form, setForm] = useState({
        firstName: '',
        middleName: '',
        lastName: '',
        email: '',
        password: '',
        phone: ''
    });
    const [errors, setErrors] = useState<any>({});
    const [countryCode, setCountryCode] = useState('+91');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newErrors: any = {};
        newErrors.firstName = validateFirstName(form.firstName);
        newErrors.middleName = validateMiddleName(form.middleName);
        newErrors.lastName = validateLastName(form.lastName);
        newErrors.email = validateEmail(form.email);
        newErrors.password = validatePassword(form.password);
        newErrors.phone = validatePhone(form.phone);
        setErrors(newErrors);
        if (Object.values(newErrors).every(x => !x || (Array.isArray(x) && x.length === 0))) {
            onSignup && onSignup({ ...form, phone: countryCode + form.phone });
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 350, margin: '40px auto', background: '#fff', padding: 32, borderRadius: 12, boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
            <h2 style={{ color: 'var(--color-primary)' }}>Counsellor Sign Up</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <input name="firstName" type="text" placeholder="First Name *" value={form.firstName} onChange={handleChange} required style={{ padding: 10, borderRadius: 6, border: '1px solid #ddd' }} />
                {errors.firstName && <span style={{ color: 'red', fontSize: '0.95em' }}>{errors.firstName}</span>}
                <input name="middleName" type="text" placeholder="Middle Name" value={form.middleName} onChange={handleChange} style={{ padding: 10, borderRadius: 6, border: '1px solid #ddd' }} />
                {errors.middleName && <span style={{ color: 'red', fontSize: '0.95em' }}>{errors.middleName}</span>}
                <input name="lastName" type="text" placeholder="Last Name" value={form.lastName} onChange={handleChange} style={{ padding: 10, borderRadius: 6, border: '1px solid #ddd' }} />
                {errors.lastName && <span style={{ color: 'red', fontSize: '0.95em' }}>{errors.lastName}</span>}
            </div>
            <input name="email" type="email" placeholder="Email *" value={form.email} onChange={handleChange} required style={{ padding: 10, borderRadius: 6, border: '1px solid #ddd' }} />
            {errors.email && <span style={{ color: 'red', fontSize: '0.95em' }}>{errors.email}</span>}
            <input name="password" type="password" placeholder="Password *" value={form.password} onChange={handleChange} required style={{ padding: 10, borderRadius: 6, border: '1px solid #ddd' }} />
            {Array.isArray(errors.password) && errors.password.length > 0 && (
                <ul style={{ color: 'red', fontSize: '0.95em', margin: '8px 0 0 0', paddingLeft: 18 }}>
                    <li>Password must include:</li>
                    {errors.password.map((rule: string, idx: number) => <li key={idx}>{rule}</li>)}
                    <li style={{ color: '#555', fontSize: '0.93em', marginTop: 4 }}>Example: <b>Abcdef12!</b></li>
                </ul>
            )}
            <div style={{ display: 'flex', gap: 8 }}>
                <select value={countryCode} onChange={e => setCountryCode(e.target.value)} style={{ padding: 10, borderRadius: 6, border: '1px solid #ddd', width: 80 }}>
                    <option value="+91">+91</option>
                    <option value="+1">+1</option>
                    <option value="+44">+44</option>
                    <option value="+61">+61</option>
                </select>
                <input name="phone" type="text" placeholder="Phone Number *" value={form.phone} onChange={handleChange} required style={{ padding: 10, borderRadius: 6, border: '1px solid #ddd', flex: 1 }} />
            </div>
            {errors.phone && <span style={{ color: 'red', fontSize: '0.95em' }}>{errors.phone}</span>}
            <button type="submit" style={{ padding: '12px 24px', background: 'var(--color-primary)', color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer', fontSize: '1rem', fontWeight: 600 }}>Sign Up</button>
        </form>
    );
}
