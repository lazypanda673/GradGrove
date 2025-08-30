import { Link } from 'react-router-dom';

function Navbar({ role }) {
  return (
    <nav style={{ padding: "10px", background: "rgba(37,99,235,0.85)", color: "#fff" }}>
      {role === "admin" && <Link to="/admin" style={{ margin: 10, color: "#fff" }}>Admin Dashboard</Link>}
      {role === "mentor" && <Link to="/mentor" style={{ margin: 10, color: "#fff" }}>Mentor Dashboard</Link>}
      {role === "student" && <Link to="/student" style={{ margin: 10, color: "#fff" }}>Student Dashboard</Link>}
      {role === "counsellor" && <Link to="/counsellor" style={{ margin: 10, color: "#fff" }}>Counsellor Dashboard</Link>}
      {role === "user" && <Link to="/user" style={{ margin: 10, color: "#fff" }}>User Survey</Link>}
    </nav>
  );
}

export default Navbar;
