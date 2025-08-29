import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Navbar from './components/Navbar';
import Landing from './components/Landing';
import Login from './components/Login';
import UserSurvey from './components/UserSurvey';
import Counsellor from './components/Counsellor';
import Admin from './components/Admin';
import MentorDashboard from './components/MentorDashboard';
import StudentDashboard from './components/StudentDashboard';

function App() {
  const [role, setRole] = useState(null);

  return (
    <Router>
      {!role ? (
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login setRole={setRole} />} />
        </Routes>
      ) : (
        <>
          <Navbar role={role} />
          <div style={{ padding: "20px" }}>
            <Routes>
              <Route path="/user" element={<UserSurvey />} />
              <Route path="/counsellor" element={<Counsellor />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/mentor" element={<MentorDashboard />} />
              <Route path="/student" element={<StudentDashboard />} />
            </Routes>
          </div>
          <ToastContainer />
        </>
      )}
    </Router>
  );
}

export default App;
