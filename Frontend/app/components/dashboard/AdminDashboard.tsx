 'use client';

import { useState, useMemo } from 'react';
import Sidebar from '../common/Sidebar';
import AnimatedElement from '../common/AnimatedElement';
import DashboardContent from './DashboardContent';

// Mock datasets for admin views
const mockStudents = [
  { id: 1, name: 'Amit Sharma', roll: '21CSE001', dept: 'CSE', year: '2nd', riskScore: 0.12, riskLevel: 'low', counselor: 'Dr. Rao', lastActivity: '2025-09-10' },
  { id: 2, name: 'Priya Singh', roll: '21IT002', dept: 'IT', year: '2nd', riskScore: 0.45, riskLevel: 'medium', counselor: 'Ms. Kapoor', lastActivity: '2025-09-12' },
  { id: 3, name: 'Rahul Verma', roll: '20ECE003', dept: 'ECE', year: '3rd', riskScore: 0.78, riskLevel: 'high', counselor: 'Dr. Sen', lastActivity: '2025-09-15' },
];

const mockCounselors = [
  { id: 1, name: 'Dr. Rao', dept: 'CSE', assigned: 45, highRisk: 5, perfScore: 0.88, level: 'Senior' },
  { id: 2, name: 'Ms. Kapoor', dept: 'IT', assigned: 32, highRisk: 8, perfScore: 0.76, level: 'Mid' },
  { id: 3, name: 'Dr. Sen', dept: 'ECE', assigned: 28, highRisk: 12, perfScore: 0.65, level: 'Senior' },
];

export default function AdminDashboard() {
  const [currentPage, setCurrentPage] = useState<string>('dashboard');
  const [selectedStudent, setSelectedStudent] = useState<number | null>(null);

  const adminMenu = [
    { icon: '🏠', label: 'Overview', href: 'dashboard' },
    { icon: '👥', label: 'Students', href: 'students' },
    { icon: '🧑‍⚕️', label: 'Counselors', href: 'counselors' },
    { icon: '🔗', label: 'Mapping', href: 'mapping' },
    { icon: '📊', label: 'Analytics', href: 'analytics' },
    { icon: '✉️', label: 'Communication', href: 'communication' },
    { icon: '🔔', label: 'Alerts', href: 'alerts' },
    { icon: '⚙️', label: 'Settings', href: 'settings' },
  ];

  const students = useMemo(() => mockStudents, []);
  const counselors = useMemo(() => mockCounselors, []);

  const sendAlert = (message: string, target: string) => {
    // placeholder - in a real app this would call an API
    alert(`Alert sent to ${target}: ${message}`);
  };

  const renderStudents = () => (
    <div style={{ background: '#fff', borderRadius: 12, padding: 20, boxShadow: '0 4px 16px rgba(0,0,0,0.06)', border: '1px solid #e2e8f0' }}>
      <h2 style={{ marginBottom: 12 }}>Students</h2>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ textAlign: 'left', borderBottom: '1px solid #e6eef8' }}>
              <th style={{ padding: '8px 12px' }}>Name</th>
              <th style={{ padding: '8px 12px' }}>Roll No</th>
              <th style={{ padding: '8px 12px' }}>Risk Score</th>
              <th style={{ padding: '8px 12px' }}>Risk Level</th>
              <th style={{ padding: '8px 12px' }}>Counselor</th>
              <th style={{ padding: '8px 12px' }}>Last Activity</th>
              <th style={{ padding: '8px 12px' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map(s => (
              <tr key={s.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                <td style={{ padding: '10px 12px' }}>{s.name}</td>
                <td style={{ padding: '10px 12px' }}>{s.roll}</td>
                <td style={{ padding: '10px 12px' }}>{(s.riskScore * 100).toFixed(0)}%</td>
                <td style={{ padding: '10px 12px' }}>{s.riskLevel}</td>
                <td style={{ padding: '10px 12px' }}>{s.counselor}</td>
                <td style={{ padding: '10px 12px' }}>{s.lastActivity}</td>
                <td style={{ padding: '10px 12px' }}>
                  <button onClick={() => setSelectedStudent(s.id)} style={{ marginRight: 8 }}>View</button>
                  <button onClick={() => sendAlert('Please check in', s.name)}>Alert</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderCounselors = () => (
    <div style={{ background: '#fff', borderRadius: 12, padding: 20, boxShadow: '0 4px 16px rgba(0,0,0,0.06)', border: '1px solid #e2e8f0' }}>
      <h2 style={{ marginBottom: 12 }}>Counselors</h2>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ textAlign: 'left', borderBottom: '1px solid #e6eef8' }}>
              <th style={{ padding: '8px 12px' }}>Name</th>
              <th style={{ padding: '8px 12px' }}>Dept</th>
              <th style={{ padding: '8px 12px' }}>Students Assigned</th>
              <th style={{ padding: '8px 12px' }}>High-Risk Students</th>
              <th style={{ padding: '8px 12px' }}>Performance</th>
              <th style={{ padding: '8px 12px' }}>Level</th>
              <th style={{ padding: '8px 12px' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {counselors.map(c => (
              <tr key={c.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                <td style={{ padding: '10px 12px' }}>{c.name}</td>
                <td style={{ padding: '10px 12px' }}>{c.dept}</td>
                <td style={{ padding: '10px 12px' }}>{c.assigned}</td>
                <td style={{ padding: '10px 12px' }}>{c.highRisk}</td>
                <td style={{ padding: '10px 12px' }}>{(c.perfScore * 100).toFixed(0)}%</td>
                <td style={{ padding: '10px 12px' }}>{c.level}</td>
                <td style={{ padding: '10px 12px' }}>
                  <button style={{ marginRight: 8 }} onClick={() => alert(`View counselor ${c.name}`)}>View</button>
                  <button onClick={() => alert(`Reassign students from ${c.name}`)}>Reassign</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderOverview = () => (
    <div>
      <AnimatedElement animation="scaleIn" delay={80}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 20, marginBottom: 20 }}>
          <div style={{ background: '#fff', borderRadius: 12, padding: 20 }}>
            <div style={{ fontSize: 14, color: '#64748b' }}>Total Students</div>
            <div style={{ fontSize: 28, fontWeight: 700, color: '#3b82f6' }}>{students.length}</div>
          </div>
          <div style={{ background: '#fff', borderRadius: 12, padding: 20 }}>
            <div style={{ fontSize: 14, color: '#64748b' }}>Active Counselors</div>
            <div style={{ fontSize: 28, fontWeight: 700, color: '#10b981' }}>{counselors.length}</div>
          </div>
          <div style={{ background: '#fff', borderRadius: 12, padding: 20 }}>
            <div style={{ fontSize: 14, color: '#64748b' }}>High Risk Students</div>
            <div style={{ fontSize: 28, fontWeight: 700, color: '#ef4444' }}>{students.filter(s => s.riskLevel === 'high').length}</div>
          </div>
        </div>
      </AnimatedElement>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 24 }}>
        <AnimatedElement animation="slideInUp" delay={200}>
          <div style={{ background: '#fff', borderRadius: 12, padding: 20 }}>
            <h3>Risk Distribution</h3>
            <div style={{ height: 240 }}>{/* charts placeholder */}</div>
          </div>
        </AnimatedElement>

        <AnimatedElement animation="slideInUp" delay={300}>
          <div style={{ background: '#fff', borderRadius: 12, padding: 20 }}>
            <h3>Counselor Effectiveness</h3>
            <div style={{ height: 240 }}>{/* charts placeholder */}</div>
          </div>
        </AnimatedElement>
      </div>
    </div>
  );

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f8fafc' }}>
      <Sidebar role="admin" currentPage={currentPage} onPageChange={setCurrentPage} customMenuItems={adminMenu} />

      <div style={{ flex: 1, padding: 24 }}>
        <AnimatedElement animation="fadeIn" delay={50}>
          <h1 style={{ fontSize: 20, fontWeight: 700, marginBottom: 12 }}>{currentPage === 'dashboard' ? 'Overview' : currentPage.charAt(0).toUpperCase() + currentPage.slice(1)}</h1>
        </AnimatedElement>

        <div style={{ marginTop: 12 }}>
          {currentPage === 'dashboard' && renderOverview()}
          {currentPage === 'students' && renderStudents()}
          {currentPage === 'counselors' && renderCounselors()}
          {currentPage === 'mapping' && <div style={{ background: '#fff', padding: 20, borderRadius: 12 }}>Mapping tools placeholder</div>}
          {currentPage === 'alerts' && <div style={{ background: '#fff', padding: 20, borderRadius: 12 }}>
            <h3>Alerts</h3>
            <div style={{ marginTop: 8 }}>
              <button onClick={() => sendAlert('Immediate intervention required', 'All counselors')} style={{ marginRight: 8 }}>Send Global Alert</button>
              <button onClick={() => sendAlert('Reminder: update sessions', 'All counselors')}>Send Reminder</button>
            </div>
          </div>}
        </div>
      </div>
    </div>
  );
}
