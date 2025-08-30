
import { useState } from 'react';
import StudentQuestionnaire from './StudentForm';

function StudentDashboard() {
  // Simulate form status (replace with real API/db logic)
  const [formFilled, setFormFilled] = useState(false);
  const [formData, setFormData] = useState(null);

  const handleFormSubmit = (data) => {
    setFormFilled(true);
    setFormData(data);
  };

  return (
    <div>
      <h1 style={{ color: 'var(--color-primary)' }}>Student Dashboard</h1>
      <div style={{ background: '#f3f4f6', borderRadius: 8, padding: 18, margin: '18px 0', boxShadow: '0 1px 6px rgba(0,0,0,0.06)' }}>
        {!formFilled ? (
          <>
            <span style={{ color: 'var(--color-warning)', fontWeight: 500 }}>You have not filled the Student Form yet.</span>
            <div style={{ marginTop: 10 }}>
              <button className="btn" onClick={() => setFormFilled(false)} style={{ background: 'var(--color-primary)', color: '#fff', cursor: 'pointer' }}>Fill Student Form</button>
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
      {!formFilled && <StudentQuestionnaire onSubmit={handleFormSubmit}/>} 
    </div>
  );
}

export default StudentDashboard;
