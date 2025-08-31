


import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


function Login({ setRole }) {
  const [input, setInput] = useState("");
  const [password, setPassword] = useState("");
  const [roleInput, setRoleInput] = useState("student");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");
    if (roleInput === "student" && !/^\d+$/.test(input)) {
      setError("Roll number must be an integer value.");
      return;
    }
    setRole(roleInput);
    if (roleInput === "admin") navigate("/admin");
    else if (roleInput === "counsellor") navigate("/counsellor");
    else if (roleInput === "student") navigate("/student");
  };

  return (
    <div style={{ background: 'var(--color-background)', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ background: '#fff', borderRadius: 12, boxShadow: '0 2px 16px rgba(0,0,0,0.08)', padding: 40, minWidth: 340, maxWidth: 380, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <img src="/Brand_logo.png" alt="GradGrove Logo" style={{ width: 70, marginBottom: 18 }} />
        <h2 style={{ color: 'var(--color-primary)', fontSize: '2rem', marginBottom: 8, fontWeight: 700 }}>Log in</h2>
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: 18, width: '100%' }}>
          {roleInput === 'student' ? (
            <input type="text" placeholder="Roll Number" value={input} onChange={e => setInput(e.target.value)} required style={{ padding: 14, borderRadius: 6, border: '1px solid #ddd', fontSize: '1.08rem', width: '100%' }} />
          ) : (
            <input type="text" placeholder="Username" value={input} onChange={e => setInput(e.target.value)} required style={{ padding: 14, borderRadius: 6, border: '1px solid #ddd', fontSize: '1.08rem', width: '100%' }} />
          )}
          {error && <span style={{ color: 'red', fontSize: '0.95em' }}>{error}</span>}
          <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required style={{ padding: 14, borderRadius: 6, border: '1px solid #ddd', fontSize: '1.08rem', width: '100%' }} />
          <select value={roleInput} onChange={e => setRoleInput(e.target.value)} style={{ padding: 14, borderRadius: 6, border: '1px solid #ddd', fontSize: '1.08rem', width: '100%' }}>
            <option value="student">Student</option>
            <option value="counsellor">Counsellor</option>
            <option value="admin">Admin</option>
          </select>
          <button type="submit" className="btn" style={{ fontSize: '1.08rem', padding: '14px 0', borderRadius: 6, width: '100%' }}>Login</button>
        </form>
        <div style={{ marginTop: 24, color: 'var(--color-secondary)', fontSize: '1rem' }}>
          <span>New to GradGrove? <a href="/signup" style={{ color: 'var(--color-primary)', textDecoration: 'underline' }}>Sign Up</a></span>
        </div>
      </div>
      <footer style={{ textAlign: 'center', padding: '32px 0', color: 'var(--color-secondary)', fontSize: '0.95rem', position: 'absolute', bottom: 0, width: '100%' }}>
        &copy; 2025 GradGrove Hackathon Prototype. All rights reserved.
      </footer>
    </div>
  );
}

export default Login;
