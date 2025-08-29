import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login({ setRole }) {
  const [username, setUsername] = useState("");
  const [roleInput, setRoleInput] = useState("user");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setRole(roleInput);
    if(roleInput === "admin") navigate("/admin");
    else if(roleInput === "counsellor") navigate("/counsellor");
    else navigate("/user");
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '80vh', justifyContent: 'center' }}>
      <h2 style={{ color: 'var(--color-primary)' }}>Login</h2>
      <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: 16, minWidth: 300 }}>
        <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} required style={{ padding: 8, borderRadius: 4, border: '1px solid #ddd' }} />
        <select value={roleInput} onChange={e => setRoleInput(e.target.value)} style={{ padding: 8, borderRadius: 4, border: '1px solid #ddd' }}>
          <option value="user">User</option>
          <option value="counsellor">Counsellor</option>
          <option value="admin">Admin</option>
        </select>
        <button type="submit" className="btn">Login</button>
      </form>
    </div>
  );
}
export default Login;
