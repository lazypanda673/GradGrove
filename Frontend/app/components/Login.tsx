"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import AnimatedElement from "./AnimatedElement";

export default function Login({ setRole }: { setRole?: (role: string) => void }) {
  const [input, setInput] = useState("");
  const [password, setPassword] = useState("");
  const [roleInput, setRoleInput] = useState("student");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (roleInput === "student" && !/^\d+$/.test(input)) {
      setError("Roll number must be an integer value.");
      return;
    }
    setRole?.(roleInput);
    if (roleInput === "admin") router.push("/admin");
    else if (roleInput === "counsellor") router.push("/counsellor");
    else if (roleInput === "student") router.push("/student");
  };

  return (
    <div style={{ background: 'var(--color-background)', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <AnimatedElement animation="scaleIn" delay={100}>
        <div className="hover-lift transition-all" style={{ background: '#fff', borderRadius: 12, boxShadow: '0 2px 16px rgba(0,0,0,0.08)', padding: 40, minWidth: 340, maxWidth: 380, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <AnimatedElement animation="fadeIn" delay={200}>
            <Image src="/Brand_logo.png" alt="GradGrove Logo" width={70} height={70} style={{ marginBottom: 18 }} />
          </AnimatedElement>
          <AnimatedElement animation="slideInUp" delay={300}>
            <h2 style={{ color: 'var(--color-primary)', fontSize: '2rem', marginBottom: 8, fontWeight: 700 }}>Log in</h2>
          </AnimatedElement>
          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: 18, width: '100%' }}>
            <AnimatedElement animation="slideInLeft" delay={400}>
              {roleInput === 'student' ? (
                <input type="text" placeholder="Roll Number" value={input} onChange={e => setInput(e.target.value)} required className="transition-all" style={{ padding: 14, borderRadius: 6, border: '1px solid #ddd', fontSize: '1.08rem', width: '100%' }} />
              ) : (
                <input type="text" placeholder="Username" value={input} onChange={e => setInput(e.target.value)} required className="transition-all" style={{ padding: 14, borderRadius: 6, border: '1px solid #ddd', fontSize: '1.08rem', width: '100%' }} />
              )}
            </AnimatedElement>
            {error && <AnimatedElement animation="slideInUp" delay={450}><span style={{ color: 'red', fontSize: '0.95em' }}>{error}</span></AnimatedElement>}
            <AnimatedElement animation="slideInRight" delay={500}>
              <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required className="transition-all" style={{ padding: 14, borderRadius: 6, border: '1px solid #ddd', fontSize: '1.08rem', width: '100%' }} />
            </AnimatedElement>
            <AnimatedElement animation="slideInUp" delay={600}>
              <select value={roleInput} onChange={e => setRoleInput(e.target.value)} className="transition-all" style={{ padding: 12, borderRadius: 6, border: '1px solid #ddd', fontSize: '1.08rem', width: '100%' }}>
                <option value="student">Student</option>
                <option value="counsellor">Counsellor</option>
                <option value="admin">Admin</option>
              </select>
            </AnimatedElement>
            <AnimatedElement animation="scaleIn" delay={700}>
              <button type="submit" className="btn hover-scale transition-all" style={{ background: 'var(--color-primary)', color: '#fff', padding: '12px 32px', borderRadius: 8, fontWeight: 600, fontSize: 17, boxShadow: '0 1px 4px rgba(0,0,0,0.10)' }}>Log in</button>
            </AnimatedElement>
          </form>
        </div>
      </AnimatedElement>
    </div>
  );
}
