
import { useState } from 'react';
import { Link } from 'react-router-dom';

function Navbar({ role }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  return (
  <nav style={{ padding: "10px 32px", background: "var(--color-primary)", color: "var(--color-background)", display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', position: 'sticky', top: 0, zIndex: 100 }}>
      <div>
        {role === "admin" && <Link to="/admin" style={{ margin: 10, color: "#fff" }}>Admin Dashboard</Link>}
        {role === "mentor" && <Link to="/mentor" style={{ margin: 10, color: "#fff" }}>Mentor Dashboard</Link>}
        {role === "student" && <Link to="/student" style={{ margin: 10, color: "#fff" }}>Student Dashboard</Link>}
  {role === "counsellor" && <Link to="/counsellor" style={{ margin: 10, color: "var(--color-background)", fontWeight: 600, fontSize: '1.08rem', textDecoration: 'none' }}>Counsellor Dashboard</Link>}
        {role === "user" && <Link to="/user" style={{ margin: 10, color: "#fff" }}>User Survey</Link>}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 18, position: 'relative' }}>
        {/* Notification icon */}
        <span style={{ cursor: 'pointer', fontSize: 22 }} title="Notifications">🔔</span>
        {/* Profile picture */}
        <span style={{ cursor: 'pointer', borderRadius: '50%', overflow: 'hidden', width: 36, height: 36, display: 'inline-block', background: '#fff' }} onClick={() => setDropdownOpen(!dropdownOpen)}>
          <img src="/Brand_logo.png" alt="Profile" style={{ width: 36, height: 36, objectFit: 'cover' }} />
        </span>
        {/* Dropdown menu */}
        {dropdownOpen && (
          <div style={{ position: 'absolute', top: 48, right: 0, background: '#fff', color: '#222', borderRadius: 8, boxShadow: '0 2px 12px rgba(0,0,0,0.12)', minWidth: 180, zIndex: 100 }}>
            <ul style={{ listStyle: 'none', margin: 0, padding: '12px 0' }}>
              <li style={{ padding: '8px 18px', cursor: 'pointer' }}><Link to="/profile" style={{ color: '#222', textDecoration: 'none' }}>Profile Page</Link></li>
              <li style={{ padding: '8px 18px', cursor: 'pointer' }}><Link to="/settings" style={{ color: '#222', textDecoration: 'none' }}>Settings</Link></li>
              <li style={{ padding: '8px 18px', cursor: 'pointer' }}><Link to="/help" style={{ color: '#222', textDecoration: 'none' }}>Help</Link></li>
              <li style={{ padding: '8px 18px', cursor: 'pointer' }}><Link to="/student" style={{ color: '#222', textDecoration: 'none' }}>Dashboard</Link></li>
              <li style={{ padding: '8px 18px', cursor: 'pointer' }}><Link to="/logout" style={{ color: '#222', textDecoration: 'none' }}>Logout</Link></li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
