import SignupStudent from './SignupStudent';
import SignupCounsellor from './SignupCounsellor';
import { useState } from 'react';

function Signup() {
  const [role, setRole] = useState('student');

  return (
    <div style={{ background: 'var(--color-background)', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ background: '#fff', borderRadius: 12, boxShadow: '0 2px 16px rgba(0,0,0,0.08)', padding: 40, minWidth: 340, maxWidth: 420, width: '100%' }}>
        <h2 style={{ color: 'var(--color-primary)', textAlign: 'center', marginBottom: 24 }}>Sign Up</h2>
        <select value={role} onChange={e => setRole(e.target.value)} style={{ padding: 12, borderRadius: 6, border: '1px solid #ddd', fontSize: '1.08rem', width: '100%', marginBottom: 24 }}>
          <option value="student">Student</option>
          <option value="counsellor">Counsellor</option>
        </select>
        {role === 'student' ? <SignupStudent /> : <SignupCounsellor />}
      </div>
    </div>
  );
}

export default Signup;
