
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login({ setRole }) {
  const [username, setUsername] = useState("");
  const [roleInput, setRoleInput] = useState("student");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
  setRole(roleInput);
  if(roleInput === "admin") navigate("/admin");
  else if(roleInput === "counsellor") navigate("/counsellor");
  else if(roleInput === "student") navigate("/student");
  };

  return (
    <div style={{ background: 'var(--color-background)', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, justifyContent: 'center', marginTop: 40 }}>
        <img src="/Brand_logo.png" alt="GradGrove Logo" style={{ width: 60, marginBottom: 18 }} />
        <h2 style={{ color: 'var(--color-primary)', fontSize: '2rem', marginBottom: 8 }}>Login to GradGrove</h2>
        <p style={{ color: 'var(--color-text)', marginBottom: 24, fontSize: '1.08rem' }}>Access your dashboard and start your journey.</p>
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: 18, minWidth: 320, background: 'rgba(255,255,255,0.08)', padding: 32, borderRadius: 12, boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
          <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} required style={{ padding: 12, borderRadius: 6, border: '1px solid #ddd', fontSize: '1.08rem' }} />
          <select value={roleInput} onChange={e => setRoleInput(e.target.value)} style={{ padding: 12, borderRadius: 6, border: '1px solid #ddd', fontSize: '1.08rem' }}>
            <option value="student">Student</option>
            <option value="counsellor">Counsellor</option>
            <option value="admin">Admin</option>
          </select>
          <button type="submit" className="btn" style={{ fontSize: '1.08rem', padding: '12px 0', borderRadius: 6 }}>Login</button>
        </form>
        <div style={{ marginTop: 24, color: 'var(--color-secondary)', fontSize: '1rem' }}>
          <span>New to GradGrove? <a href="/" style={{ color: 'var(--color-primary)', textDecoration: 'underline' }}>Go to Home</a></span>
        </div>
      </div>
      <footer style={{ textAlign: 'center', padding: '32px 0', color: 'var(--color-secondary)', fontSize: '0.95rem', marginTop: 40 }}>
        &copy; 2025 GradGrove Hackathon Prototype. All rights reserved.
      </footer>
    </div>
  );
}

export default Login;
