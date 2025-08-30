import React, { Suspense, useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar';
const Landing = React.lazy(() => import('./components/Landing'));
const Login = React.lazy(() => import('./components/Login'));
const Signup = React.lazy(() => import('./components/Signup'));
const UserSurvey = React.lazy(() => import('./components/UserSurvey'));
const Counsellor = React.lazy(() => import('./components/Counsellor'));
const Admin = React.lazy(() => import('./components/Admin'));
const MentorDashboard = React.lazy(() => import('./components/MentorDashboard'));
const StudentDashboard = React.lazy(() => import('./components/StudentDashboard'));

function App() {
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 400);
    return () => clearTimeout(timer);
  }, []);

  const LoadingSpinner = () => (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
      <div style={{ width: 48, height: 48, border: '6px solid #eee', borderTop: '6px solid var(--color-primary)', borderRadius: '50%', animation: 'spin 0.5s linear infinite' }} />
      <style>{`@keyframes spin { 0% { transform: rotate(0deg);} 100% { transform: rotate(360deg);} }`}</style>
    </div>
  );

  return (
    <Router>
      <Suspense fallback={<LoadingSpinner />}>
        {loading ? <LoadingSpinner /> : !role ? (
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login setRole={setRole} />} />
            <Route path="/signup" element={<Signup />} />
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
      </Suspense>
    </Router>
  );
}

export default App;
