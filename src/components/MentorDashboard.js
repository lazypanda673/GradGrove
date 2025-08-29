import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

function MentorDashboard() {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const riskStudents = [
        { name: "Alice", risk: "High" },
        { name: "Bob", risk: "Medium" }
      ];
      riskStudents.forEach(student => {
        if(student.risk === "High") toast.error(`ALERT: ${student.name} at High Risk!`);
      });
      setAlerts(riskStudents);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h1 style={{ color: 'var(--color-warning)' }}>Mentor Dashboard</h1>
      <h2>Alerts</h2>
      <ul>
        {alerts.map((s, idx) => <li key={idx}>{s.name} - {s.risk} Risk</li>)}
      </ul>
    </div>
  );
}

export default MentorDashboard;
