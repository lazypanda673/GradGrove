import { useState } from 'react';
import { toast } from 'react-toastify';

function UserSurvey() {
  const [gpa, setGpa] = useState("");
  const [attendance, setAttendance] = useState("");
  const [activity, setActivity] = useState("yes");
  const [stress, setStress] = useState(3);

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Survey submitted!");
    // You can send data to backend here
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 350, margin: '40px auto' }}>
      <h2 style={{ color: 'var(--color-secondary)' }}>User Questionnaire</h2>
      <input type="number" placeholder="GPA" value={gpa} onChange={e => setGpa(e.target.value)} required style={{ padding: 8, borderRadius: 4, border: '1px solid #ddd' }} />
      <input type="number" placeholder="Attendance %" value={attendance} onChange={e => setAttendance(e.target.value)} required style={{ padding: 8, borderRadius: 4, border: '1px solid #ddd' }} />
      <select value={activity} onChange={e => setActivity(e.target.value)} style={{ padding: 8, borderRadius: 4, border: '1px solid #ddd' }}>
        <option value="yes">Participates</option>
        <option value="no">Does not participate</option>
      </select>
      <input type="number" placeholder="Stress Level (1-5)" value={stress} onChange={e => setStress(e.target.value)} min="1" max="5" style={{ padding: 8, borderRadius: 4, border: '1px solid #ddd' }} />
      <button type="submit" className="btn">Submit</button>
    </form>
  );
}
export default UserSurvey;
