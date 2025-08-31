
import { useState } from 'react';


function StudentDashboard() {
  // Simulate form status (replace with real API/db logic)
  const [formFilled] = useState(false);
  const [formData] = useState(null);



  return (
    <div>
      <h1 style={{ color: 'var(--color-primary)' }}>Student Dashboard</h1>
      <div style={{ background: '#f3f4f6', borderRadius: 8, padding: 18, margin: '18px 0', boxShadow: '0 1px 6px rgba(0,0,0,0.06)' }}>
        {!formFilled ? (
          <>
            <span style={{ color: 'var(--color-warning)', fontWeight: 500 }}>You have not filled the Student Form yet.</span>
            <div style={{ marginTop: 10 }}>
              <a href="/student-form" className="btn" style={{ background: 'var(--color-primary)', color: '#fff', padding: '10px 24px', borderRadius: 6, textDecoration: 'none', fontWeight: 500 }}>Fill Student Form</a>
            </div>
          </>
        ) : (
          <>
            <span style={{ color: 'var(--color-success)', fontWeight: 500 }}>Student Form already filled.</span>
            <div style={{ marginTop: 10, color: '#555' }}>
              <b>Details:</b>
              <ul style={{ marginTop: 6 }}>
                {formData && Object.entries(formData).map(([key, value]) => (
                  <li key={key}><b>{key}:</b> {value}</li>
                ))}
              </ul>
              <button className="btn" disabled style={{ background: '#ddd', color: '#888', cursor: 'not-allowed', marginTop: 8 }}>Already Filled</button>
            </div>
          </>
        )}
      </div>
      {/* No extra CTA button, only the original above */}
    </div>
  );
}

export default StudentDashboard;
