
import { useState } from 'react';
import StudentForm from './StudentForm';
import Navbar from './Navbar';


function StudentDashboard() {
  // Simulate form status (replace with real API/db logic)
  const [formFilled, setFormFilled] = useState(false);
  const [formData, setFormData] = useState(null);
  const [showForm, setShowForm] = useState(false);

  // Callback for when form is submitted
  const handleFormSubmit = (data) => {
    setFormFilled(true);
    setFormData(data);
    setShowForm(false);
  };

  return (
    <div style={{ background: 'var(--color-background)', minHeight: '100vh' }}>
      <Navbar role="student" />
      <h1 style={{ color: 'var(--color-primary)', marginTop: 24, textAlign: 'center', fontWeight: 700 }}>Student Dashboard</h1>
      <div style={{ background: '#f3f4f6', borderRadius: 12, padding: 24, margin: '24px auto', boxShadow: '0 1px 8px rgba(0,0,0,0.08)', maxWidth: 800 }}>
        {!formFilled ? (
          <>
            <span style={{ color: 'var(--color-warning)', fontWeight: 500 }}>You have not filled the Student Form yet.</span>
            <div style={{ marginTop: 16 }}>
              {!showForm ? (
                <button className="btn" style={{ background: 'var(--color-primary)', color: '#fff', padding: '12px 32px', borderRadius: 8, fontWeight: 600, fontSize: 17, boxShadow: '0 1px 4px rgba(0,0,0,0.10)' }} onClick={() => setShowForm(true)}>
                  Fill Student Form
                </button>
              ) : null}
            </div>
            {showForm && (
              <div style={{ marginTop: 32 }}>
                <StudentFormInline onSubmit={handleFormSubmit} onCancel={() => setShowForm(false)} />
              </div>
            )}
          </>
        ) : (
          <>
            <span style={{ color: 'var(--color-success)', fontWeight: 500 }}>Student Form already filled.</span>
            <div style={{ marginTop: 16, color: '#555' }}>
              <b>Details:</b>
              <ul style={{ marginTop: 8 }}>
                {formData && Object.entries(formData).map(([key, value]) => (
                  <li key={key}><b>{key}:</b> {value}</li>
                ))}
              </ul>
              <button className="btn" disabled style={{ background: '#ddd', color: '#888', cursor: 'not-allowed', marginTop: 12, borderRadius: 6 }}>Already Filled</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// Inline version of StudentForm with cancel and submit callback
function StudentFormInline({ onSubmit, onCancel }) {
  const [form, setForm] = useState({
    attendance: '',
    gradeTrend: '',
    languageProficiency: '',
    languageMatch: '',
    schoolTransfers: '',
    maritalStatus: '',
    chronicIllness: '',
    caregiving: '',
    earlyMarriage: '',
    tuitionStatus: '',
    financialStatus: '',
    parentsMarital: '',
    migrantBackground: '',
    peerRelations: '',
    substanceAbuse: '',
    disciplinary: '',
    counselingAttendance: '',
    additionalInfo: ''
  });
  const [sectionIdx, setSectionIdx] = useState(0);
  const [completed, setCompleted] = useState(false);

  // Section definitions (copied from StudentForm)
  const sections = [
    {
      name: 'Academic Information',
      fields: [
        { label: 'What is your current attendance rate? (0-100%)', name: 'attendance', type: 'number', min: 0, max: 100 },
        { label: 'How would you describe your grade trend over the past year?', name: 'gradeTrend', type: 'select', options: ['Improving consistently', 'Remaining stable', 'Declining gradually', 'Declining rapidly', 'Fluctuating unpredictably'] },
        { label: 'How would you rate your proficiency in the language of instruction?', name: 'languageProficiency', type: 'select', options: ['Native speaker', 'Fluent', 'Intermediate', 'Basic', 'Beginner'] },
        { label: 'Does the language of instruction match your proficiency level?', name: 'languageMatch', type: 'select', options: ['Yes', 'No'] },
        { label: 'How many times have you transferred schools in the past 3 years?', name: 'schoolTransfers', type: 'select', options: ['None', 'Once', 'Twice', 'Three or more times'] },
      ]
    },
    {
      name: 'Personal Information',
      fields: [
        { label: 'What is your current marital status?', name: 'maritalStatus', type: 'select', options: ['Single', 'Married', 'Divorced', 'Separated', 'Widowed'] },
        { label: 'Are you experiencing any chronic illness or health condition?', name: 'chronicIllness', type: 'select', options: ['Yes', 'No', 'Prefer not to say'] },
        { label: 'Do you have caregiving responsibilities for family members?', name: 'caregiving', type: 'select', options: ['Yes, significant responsibilities', 'Yes, minor responsibilities', 'No'] },
        { label: 'Have you entered into marriage at an early age?', name: 'earlyMarriage', type: 'select', options: ['Yes', 'No', 'Not applicable'] },
      ]
    },
    {
      name: 'Financial Background',
      fields: [
        { label: 'How would you describe your tuition fee payment status?', name: 'tuitionStatus', type: 'select', options: ['Always paid on time', 'Occasionally delayed', 'Frequently delayed', 'Relying on financial aid/scholarships', 'Facing significant financial constraints'] },
      ]
    },
    {
      name: 'Family Background',
      fields: [
        { label: "What is your parents' marital status?", name: 'parentsMarital', type: 'select', options: ['Married and living together', 'Separated', 'Divorced', 'Widowed', 'Never married'] },
        { label: 'Does your family have a migrant background?', name: 'migrantBackground', type: 'select', options: ['Yes, first-generation migrants', 'Yes, second-generation migrants', 'No'] },
      ]
    },
    {
      name: 'Social Factors',
      fields: [
        { label: 'How would you describe your relationships with peers?', name: 'peerRelations', type: 'select', options: ['Excellent - I have many friends and good relationships', 'Good - I have some friends and generally positive relationships', 'Fair - I have few friends but no major conflicts', 'Poor - I experience regular conflicts or feel isolated', 'Very poor - I face bullying or complete social isolation'] },
        { label: 'Have you engaged in substance abuse (alcohol, drugs, etc.)?', name: 'substanceAbuse', type: 'select', options: ['Never', 'Experimented occasionally', 'Use regularly', 'Have struggled with addiction in the past', 'Prefer not to answer'] },
        { label: 'Do you have any disciplinary records or behavioral issues at school?', name: 'disciplinary', type: 'select', options: ['None', 'Minor incidents', 'Multiple incidents', 'Serious behavioral issues', 'Prefer not to answer'] },
        { label: 'How often do you attend counseling sessions when offered?', name: 'counselingAttendance', type: 'select', options: ['Always', 'Often', 'Occasionally', 'Rarely', 'Never'] },
      ]
    },
    {
      name: 'Additional Information',
      fields: [
        { label: 'Is there any other personal circumstance that you believe affects your academic performance that you would like to share?', name: 'additionalInfo', type: 'textarea' },
      ]
    }
  ];

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSectionSubmit = e => {
    e.preventDefault();
    if (sectionIdx < sections.length - 1) {
      setSectionIdx(sectionIdx + 1);
    } else {
      setCompleted(true);
      if (onSubmit) onSubmit(form);
    }
  };

  if (completed) {
    return (
      <div style={{ maxWidth: 600, margin: '0 auto', background: '#fff', padding: 32, borderRadius: 12, boxShadow: '0 2px 12px rgba(0,0,0,0.06)', textAlign: 'center' }}>
        <h2 style={{ color: 'var(--color-success)' }}>Thank you for submitting the Student Questionnaire!</h2>
        <p>Your responses have been saved.</p>
        <button className="btn" style={{ marginTop: 18, background: 'var(--color-primary)', color: '#fff', borderRadius: 6, fontWeight: 600, padding: '10px 24px' }} onClick={onCancel}>Close</button>
      </div>
    );
  }

  const currentSection = sections[sectionIdx];
  const progress = ((sectionIdx + 1) / sections.length) * 100;

  return (
    <div style={{ minHeight: '1px', background: 'linear-gradient(120deg, #f3f4f6 60%, #e3e8ff 100%)', paddingTop: 8, paddingBottom: 8, animation: 'fadeIn 0.7s' }}>
      <div style={{ width: '80%', margin: '0 auto', marginTop: 12, marginBottom: 8, position: 'relative', display: 'flex', alignItems: 'center' }}>
        <div style={{ flex: 1 }}>
          <div style={{ height: 12, background: '#eee', borderRadius: 6, overflow: 'hidden', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
            <div style={{ width: `${progress}%`, height: '100%', background: 'var(--color-primary)', transition: 'width 0.3s', borderRadius: 6 }} />
          </div>
        </div>
        <span style={{ marginLeft: 16, fontWeight: 600, color: 'var(--color-primary)', fontSize: 15 }}>{Math.round(progress)}%</span>
      </div>
      <form onSubmit={handleSectionSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 24, width: '80%', margin: '24px auto 0 auto', background: '#fff', padding: 32, borderRadius: 18, boxShadow: '0 4px 24px rgba(0,0,0,0.10)', animation: 'slideUp 0.7s' }}>
        <h2 style={{ color: 'var(--color-secondary)', marginBottom: 12, fontWeight: 700, letterSpacing: 1 }}>Student Details</h2>
        <div style={{ display: 'flex', gap: 8, marginBottom: 18, justifyContent: 'center' }}>
          {sections.map((sec, idx) => (
            <div key={sec.name} style={{ flex: 1, textAlign: 'center' }}>
              <div style={{
                height: 10,
                borderRadius: 5,
                background:
                  idx === sectionIdx
                    ? 'var(--color-primary)'
                    : idx < sectionIdx
                      ? '#28a745'
                      : '#eee',
                marginBottom: 4,
                transition: 'background 0.3s',
                boxShadow: idx === sectionIdx ? '0 2px 8px rgba(0,0,0,0.10)' : undefined
              }} />
              <span style={{ fontSize: 14, color: idx === sectionIdx ? 'var(--color-primary)' : idx < sectionIdx ? '#28a745' : '#888', fontWeight: idx === sectionIdx ? 700 : 500 }}>{sec.name}</span>
            </div>
          ))}
        </div>
        <h3 style={{ color: 'var(--color-primary)', marginBottom: 8, fontWeight: 600 }}>{currentSection.name}</h3>
        {currentSection.fields.map(field => (
          <label key={field.name} style={{ display: 'flex', flexDirection: 'column', gap: 4, fontWeight: 500, color: '#333', background: '#f7f9fc', borderRadius: 8, padding: '12px 16px', marginBottom: 6, boxShadow: '0 1px 4px rgba(0,0,0,0.03)' }}>
            {field.label}
            {field.type === 'select' ? (
              <select name={field.name} value={form[field.name]} onChange={handleChange} required style={{ padding: 10, borderRadius: 6, border: '1px solid #cfd8dc', marginTop: 6, fontSize: 15, background: '#fff' }}>
                <option value="">Select</option>
                {field.options.map(opt => <option key={opt}>{opt}</option>)}
              </select>
            ) : field.type === 'number' ? (
              <input type="number" name={field.name} value={form[field.name]} onChange={handleChange} min={field.min} max={field.max} required style={{ padding: 10, borderRadius: 6, border: '1px solid #cfd8dc', marginTop: 6, fontSize: 15, background: '#fff' }} />
            ) : field.type === 'textarea' ? (
              <textarea name={field.name} value={form[field.name]} onChange={handleChange} rows={3} style={{ padding: 10, borderRadius: 6, border: '1px solid #cfd8dc', marginTop: 6, fontSize: 15, background: '#fff' }} />
            ) : null}
          </label>
        ))}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
          <button
            type="button"
            className="btn"
            style={{
              background: '#fff5f5',
              color: '#c62828',
              borderRadius: 8,
              fontWeight: 700,
              fontSize: 18,
              padding: '12px 32px',
              border: '2px solid #c62828',
              boxShadow: '0 2px 8px rgba(198,40,40,0.10)',
              transition: 'background 0.2s, box-shadow 0.2s, color 0.2s',
              cursor: 'pointer'
            }}
            onMouseOver={e => {
              e.currentTarget.style.background = '#c62828';
              e.currentTarget.style.color = '#fff';
              e.currentTarget.style.boxShadow = '0 4px 16px rgba(198,40,40,0.18)';
              e.currentTarget.style.borderColor = '#b71c1c';
            }}
            onMouseOut={e => {
              e.currentTarget.style.background = '#fff5f5';
              e.currentTarget.style.color = '#c62828';
              e.currentTarget.style.boxShadow = '0 2px 8px rgba(198,40,40,0.10)';
              e.currentTarget.style.borderColor = '#c62828';
            }}
            onClick={onCancel}
          >
            Cancel
          </button>
          <button type="submit" className="btn" style={{ background: 'var(--color-primary)', color: '#fff', borderRadius: 6, fontWeight: 600, fontSize: 16, letterSpacing: 0.5 }}>{sectionIdx < sections.length - 1 ? 'Save & Next' : 'Submit'}</button>
        </div>
      </form>
      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { transform: translateY(40px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
      `}</style>
    </div>
  );
}

export default StudentDashboard;
