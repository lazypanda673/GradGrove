"use client";
import React, { useState } from "react";
import SignupStudent from "./SignupStudent";
import SignupCounsellor from "./SignupCounsellor";
import AnimatedElement from "../common/AnimatedElement";

export default function Signup() {
    const [role, setRole] = useState("student");
    return (
        <div style={{ background: 'var(--color-background)', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <AnimatedElement animation="scaleIn" delay={100}>
                <div className="hover-lift transition-all" style={{ background: '#fff', borderRadius: 12, boxShadow: '0 2px 16px rgba(0,0,0,0.08)', padding: 40, minWidth: 340, maxWidth: 420, width: '100%' }}>
                    <AnimatedElement animation="fadeIn" delay={200}>
                        <h2 style={{ color: 'var(--color-primary)', textAlign: 'center', marginBottom: 24 }}>Sign Up</h2>
                    </AnimatedElement>
                    <AnimatedElement animation="slideInUp" delay={300}>
                        <select value={role} onChange={e => setRole(e.target.value)} className="transition-all" style={{ padding: 12, borderRadius: 6, border: '1px solid #ddd', fontSize: '1.08rem', width: '100%', marginBottom: 24 }}>
                            <option value="student">Student</option>
                            <option value="counsellor">Counsellor</option>
                        </select>
                    </AnimatedElement>
                    <AnimatedElement animation="slideInUp" delay={400}>
                        {role === 'student' ? <SignupStudent onSignup={() => {}} /> : <SignupCounsellor onSignup={() => {}} />}
                    </AnimatedElement>
                </div>
            </AnimatedElement>
        </div>
    );
}
