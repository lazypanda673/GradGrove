'use client';

import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, Area, AreaChart } from 'recharts';
import Navbar from './Navbar';
import Footer from './Footer';
import AnimatedElement from './AnimatedElement';

// Types
interface Student {
  id: number;
  name: string;
  roll: string;
  class: string;
  dept: string;
  gender: string;
  socio: string;
  risk: 'low' | 'medium' | 'high';
  grades: number;
  attendance: number;
  counselingSessions: number;
  disciplinaryActions: number;
  participation: number;
}

interface MetricCard {
  title: string;
  value: number | string;
  unit: string;
  color: string;
  icon?: string;
}

interface ChartData {
  name: string;
  value: number;
  fill?: string;
}

// Mock data with enhanced metrics
const mockStudents: Student[] = [
  { id: 1, name: 'Amit Sharma', roll: '1001', class: '10A', dept: 'Science', gender: 'Male', socio: 'Middle', risk: 'low', grades: 8.2, attendance: 92, counselingSessions: 1, disciplinaryActions: 0, participation: 95 },
  { id: 2, name: 'Priya Singh', roll: '1002', class: '10B', dept: 'Commerce', gender: 'Female', socio: 'High', risk: 'medium', grades: 6.5, attendance: 78, counselingSessions: 3, disciplinaryActions: 1, participation: 80 },
  { id: 3, name: 'Rahul Verma', roll: '1003', class: '10A', dept: 'Science', gender: 'Male', socio: 'Low', risk: 'high', grades: 5.2, attendance: 60, counselingSessions: 5, disciplinaryActions: 2, participation: 50 },
  { id: 4, name: 'Sneha Patel', roll: '1004', class: '10C', dept: 'Arts', gender: 'Female', socio: 'Middle', risk: 'low', grades: 7.9, attendance: 88, counselingSessions: 2, disciplinaryActions: 0, participation: 92 },
  { id: 5, name: 'Vikram Rao', roll: '1005', class: '10B', dept: 'Commerce', gender: 'Male', socio: 'High', risk: 'medium', grades: 7.0, attendance: 80, counselingSessions: 2, disciplinaryActions: 1, participation: 85 },
  { id: 6, name: 'Riya Mehra', roll: '1006', class: '10A', dept: 'Science', gender: 'Female', socio: 'Low', risk: 'high', grades: 5.8, attendance: 65, counselingSessions: 4, disciplinaryActions: 1, participation: 60 },
  { id: 7, name: 'Karan Gupta', roll: '1007', class: '10C', dept: 'Arts', gender: 'Male', socio: 'Middle', risk: 'low', grades: 8.0, attendance: 85, counselingSessions: 1, disciplinaryActions: 0, participation: 88 },
  { id: 8, name: 'Fatima Khan', roll: '1008', class: '10B', dept: 'Commerce', gender: 'Female', socio: 'High', risk: 'medium', grades: 6.2, attendance: 82, counselingSessions: 3, disciplinaryActions: 1, participation: 75 },
  { id: 9, name: 'Suresh Das', roll: '1009', class: '10A', dept: 'Science', gender: 'Male', socio: 'Low', risk: 'high', grades: 4.9, attendance: 55, counselingSessions: 6, disciplinaryActions: 3, participation: 45 },
  { id: 10, name: 'Neha Joshi', roll: '1010', class: '10C', dept: 'Arts', gender: 'Female', socio: 'Middle', risk: 'low', grades: 7.7, attendance: 90, counselingSessions: 1, disciplinaryActions: 0, participation: 87 },
  { id: 11, name: 'Arjun Yadav', roll: '1011', class: '10A', dept: 'Science', gender: 'Male', socio: 'High', risk: 'medium', grades: 6.8, attendance: 77, counselingSessions: 2, disciplinaryActions: 1, participation: 82 },
  { id: 12, name: 'Megha Jain', roll: '1012', class: '10B', dept: 'Commerce', gender: 'Female', socio: 'Middle', risk: 'low', grades: 7.5, attendance: 89, counselingSessions: 1, disciplinaryActions: 0, participation: 90 },
  { id: 13, name: 'Deepak Kumar', roll: '1013', class: '10C', dept: 'Arts', gender: 'Male', socio: 'Low', risk: 'high', grades: 5.1, attendance: 58, counselingSessions: 5, disciplinaryActions: 2, participation: 48 },
  { id: 14, name: 'Simran Kaur', roll: '1014', class: '10A', dept: 'Science', gender: 'Female', socio: 'High', risk: 'medium', grades: 6.3, attendance: 79, counselingSessions: 3, disciplinaryActions: 1, participation: 78 },
  { id: 15, name: 'Mohit Sinha', roll: '1015', class: '10B', dept: 'Commerce', gender: 'Male', socio: 'Middle', risk: 'low', grades: 7.8, attendance: 87, counselingSessions: 1, disciplinaryActions: 0, participation: 89 },
  { id: 16, name: 'Anjali Roy', roll: '1016', class: '10C', dept: 'Arts', gender: 'Female', socio: 'Low', risk: 'high', grades: 5.6, attendance: 62, counselingSessions: 4, disciplinaryActions: 2, participation: 55 },
  { id: 17, name: 'Rakesh Nair', roll: '1017', class: '10A', dept: 'Science', gender: 'Male', socio: 'High', risk: 'medium', grades: 6.9, attendance: 81, counselingSessions: 2, disciplinaryActions: 1, participation: 83 },
  { id: 18, name: 'Pooja Desai', roll: '1018', class: '10B', dept: 'Commerce', gender: 'Female', socio: 'Middle', risk: 'low', grades: 7.2, attendance: 86, counselingSessions: 1, disciplinaryActions: 0, participation: 85 },
  { id: 19, name: 'Tarun Mishra', roll: '1019', class: '10C', dept: 'Arts', gender: 'Male', socio: 'Low', risk: 'high', grades: 5.3, attendance: 59, counselingSessions: 5, disciplinaryActions: 2, participation: 52 },
  { id: 20, name: 'Shweta Agarwal', roll: '1020', class: '10A', dept: 'Science', gender: 'Female', socio: 'High', risk: 'medium', grades: 6.7, attendance: 80, counselingSessions: 2, disciplinaryActions: 1, participation: 81 },
  { id: 21, name: 'Nitin Bansal', roll: '1021', class: '10B', dept: 'Commerce', gender: 'Male', socio: 'Middle', risk: 'low', grades: 7.6, attendance: 88, counselingSessions: 1, disciplinaryActions: 0, participation: 86 },
  { id: 22, name: 'Isha Kapoor', roll: '1022', class: '10C', dept: 'Arts', gender: 'Female', socio: 'Low', risk: 'high', grades: 5.4, attendance: 61, counselingSessions: 4, disciplinaryActions: 2, participation: 54 },
  { id: 23, name: 'Manish Dubey', roll: '1023', class: '10A', dept: 'Science', gender: 'Male', socio: 'High', risk: 'medium', grades: 6.1, attendance: 76, counselingSessions: 3, disciplinaryActions: 1, participation: 79 },
  { id: 24, name: 'Ritu Sharma', roll: '1024', class: '10B', dept: 'Commerce', gender: 'Female', socio: 'Middle', risk: 'low', grades: 7.3, attendance: 84, counselingSessions: 1, disciplinaryActions: 0, participation: 87 },
  { id: 25, name: 'Sanjay Singh', roll: '1025', class: '10C', dept: 'Arts', gender: 'Male', socio: 'Low', risk: 'high', grades: 5.0, attendance: 52, counselingSessions: 6, disciplinaryActions: 3, participation: 43 },
  { id: 26, name: 'Ayesha Khan', roll: '1026', class: '10A', dept: 'Science', gender: 'Female', socio: 'High', risk: 'medium', grades: 6.6, attendance: 78, counselingSessions: 2, disciplinaryActions: 1, participation: 80 },
  { id: 27, name: 'Rohit Chawla', roll: '1027', class: '10B', dept: 'Commerce', gender: 'Male', socio: 'Middle', risk: 'low', grades: 7.1, attendance: 83, counselingSessions: 1, disciplinaryActions: 0, participation: 84 },
  { id: 28, name: 'Neelam Joshi', roll: '1028', class: '10C', dept: 'Arts', gender: 'Female', socio: 'Low', risk: 'high', grades: 5.7, attendance: 63, counselingSessions: 4, disciplinaryActions: 2, participation: 57 },
  { id: 29, name: 'Vivek Saxena', roll: '1029', class: '10A', dept: 'Science', gender: 'Male', socio: 'High', risk: 'medium', grades: 6.4, attendance: 77, counselingSessions: 3, disciplinaryActions: 1, participation: 76 },
  { id: 30, name: 'Divya Pillai', roll: '1030', class: '10B', dept: 'Commerce', gender: 'Female', socio: 'Middle', risk: 'low', grades: 7.4, attendance: 85, counselingSessions: 1, disciplinaryActions: 0, participation: 88 },
];

// Chart color palette
const COLORS = {
  primary: '#3b82f6',
  secondary: '#10b981', 
  warning: '#f59e0b',
  danger: '#ef4444',
  accent: '#8b5cf6',
  teal: '#14b8a6',
  yellow: '#eab308',
  blue: '#0ea5e9',
  purple: '#a855f7',
  green: '#22c55e',
  red: '#f87171',
  orange: '#fb923c'
};

// Generate chart data for various metrics
const generateRiskData = (): ChartData[] => [
  { name: 'Low Risk', value: mockStudents.filter(s => s.risk === 'low').length, fill: COLORS.green },
  { name: 'Medium Risk', value: mockStudents.filter(s => s.risk === 'medium').length, fill: COLORS.warning },
  { name: 'High Risk', value: mockStudents.filter(s => s.risk === 'high').length, fill: COLORS.danger },
];

const generateDepartmentData = (): ChartData[] => [
  { name: 'Science', value: mockStudents.filter(s => s.dept === 'Science').length, fill: COLORS.blue },
  { name: 'Commerce', value: mockStudents.filter(s => s.dept === 'Commerce').length, fill: COLORS.teal },
  { name: 'Arts', value: mockStudents.filter(s => s.dept === 'Arts').length, fill: COLORS.purple },
];

const generateGradeDistribution = (): ChartData[] => [
  { name: 'Excellent (8-10)', value: mockStudents.filter(s => s.grades >= 8).length, fill: COLORS.green },
  { name: 'Good (6-8)', value: mockStudents.filter(s => s.grades >= 6 && s.grades < 8).length, fill: COLORS.yellow },
  { name: 'Average (4-6)', value: mockStudents.filter(s => s.grades >= 4 && s.grades < 6).length, fill: COLORS.orange },
  { name: 'Poor (<4)', value: mockStudents.filter(s => s.grades < 4).length, fill: COLORS.red },
];

const generateAttendanceData = (): ChartData[] => [
  { name: 'High (>85%)', value: mockStudents.filter(s => s.attendance > 85).length, fill: COLORS.green },
  { name: 'Medium (70-85%)', value: mockStudents.filter(s => s.attendance >= 70 && s.attendance <= 85).length, fill: COLORS.yellow },
  { name: 'Low (<70%)', value: mockStudents.filter(s => s.attendance < 70).length, fill: COLORS.red },
];

const generateMonthlyTrends = () => [
  { month: 'Jan', sessions: 15, disciplinary: 2, newStudents: 5 },
  { month: 'Feb', sessions: 22, disciplinary: 1, newStudents: 3 },
  { month: 'Mar', sessions: 28, disciplinary: 4, newStudents: 7 },
  { month: 'Apr', sessions: 35, disciplinary: 2, newStudents: 4 },
  { month: 'May', sessions: 31, disciplinary: 3, newStudents: 6 },
  { month: 'Jun', sessions: 18, disciplinary: 1, newStudents: 2 },
];

// Individual student data graphs
const studentGraphs: Record<number, MetricCard[]> = {
  1: [
    { title: 'Attendance', value: 92, unit: '%', color: 'var(--color-secondary)' },
    { title: 'Grades', value: 8.2, unit: 'GPA', color: 'var(--color-warning)' },
    { title: 'Risk Level', value: 'Low', unit: '', color: 'var(--color-success)' },
    { title: 'Counseling Sessions', value: 1, unit: 'sessions', color: 'var(--color-primary)' },
    { title: 'Disciplinary Actions', value: 0, unit: 'incidents', color: 'var(--color-danger)' },
    { title: 'Participation', value: 95, unit: '%', color: 'var(--color-success)' },
  ],
  2: [
    { title: 'Attendance', value: 78, unit: '%', color: 'var(--color-secondary)' },
    { title: 'Grades', value: 6.5, unit: 'GPA', color: 'var(--color-warning)' },
    { title: 'Risk Level', value: 'Medium', unit: '', color: 'var(--color-warning)' },
    { title: 'Counseling Sessions', value: 3, unit: 'sessions', color: 'var(--color-primary)' },
    { title: 'Disciplinary Actions', value: 1, unit: 'incidents', color: 'var(--color-danger)' },
    { title: 'Participation', value: 80, unit: '%', color: 'var(--color-success)' },
  ],
  3: [
    { title: 'Attendance', value: 60, unit: '%', color: 'var(--color-secondary)' },
    { title: 'Grades', value: 5.2, unit: 'GPA', color: 'var(--color-warning)' },
    { title: 'Risk Level', value: 'High', unit: '', color: 'var(--color-danger)' },
    { title: 'Counseling Sessions', value: 5, unit: 'sessions', color: '#6f42c1' },
    { title: 'Disciplinary Actions', value: 2, unit: 'incidents', color: 'var(--color-danger)' },
    { title: 'Participation', value: 50, unit: '%', color: 'var(--color-success)' },
  ],
  4: [
    { title: 'Attendance', value: 88, unit: '%', color: '#4f8cff' },
    { title: 'Grades', value: 7.9, unit: 'GPA', color: '#ffb347' },
    { title: 'Risk Level', value: 'Low', unit: '', color: 'var(--color-success)' },
    { title: 'Counseling Sessions', value: 2, unit: 'sessions', color: 'var(--color-primary)' },
    { title: 'Disciplinary Actions', value: 0, unit: 'incidents', color: 'var(--color-danger)' },
    { title: 'Participation', value: 92, unit: '%', color: 'var(--color-success)' },
  ],
  5: [
    { title: 'Attendance', value: 80, unit: '%', color: '#4f8cff' },
    { title: 'Grades', value: 7.0, unit: 'GPA', color: '#ffb347' },
    { title: 'Risk Level', value: 'Medium', unit: '', color: 'var(--color-warning)' },
    { title: 'Counseling Sessions', value: 2, unit: 'sessions', color: '#6f42c1' },
    { title: 'Disciplinary Actions', value: 1, unit: 'incidents', color: 'var(--color-danger)' },
    { title: 'Participation', value: 85, unit: '%', color: 'var(--color-success)' },
  ],
};

export function CounsellorDashboard() {
  const [search, setSearch] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [activeFilter, setActiveFilter] = useState('');
  const [filterClass, setFilterClass] = useState('');
  const [filterDept, setFilterDept] = useState('');
  const [filterGender, setFilterGender] = useState('');
  const [filterSocio, setFilterSocio] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(null as Student | null);

  // Unique filter options
  const classes = [...new Set(mockStudents.map(s => s.class))];
  const depts = [...new Set(mockStudents.map(s => s.dept))];
  const genders = [...new Set(mockStudents.map(s => s.gender))];
  const socioGroups = [...new Set(mockStudents.map(s => s.socio))];

  // Filter and search logic
  const filtered = mockStudents.filter(s =>
    (!filterClass || s.class === filterClass) &&
    (!filterDept || s.dept === filterDept) &&
    (!filterGender || s.gender === filterGender) &&
    (!filterSocio || s.socio === filterSocio) &&
    (s.name.toLowerCase().includes(search.toLowerCase()) || s.roll.includes(search))
  );

  // Reset filters and selection
  const handleReset = () => {
    setFilterClass('');
    setFilterDept('');
    setFilterGender('');
    setFilterSocio('');
    setSelectedStudent(null);
    setSearch('');
    setShowFilters(false);
  };

  // Generate metric cards
  const getOverviewMetrics = (): MetricCard[] => [
    { title: 'Total Students', value: mockStudents.length, unit: '', color: COLORS.primary, icon: '👥' },
    { title: 'High Risk Students', value: mockStudents.filter(s => s.risk === 'high').length, unit: '', color: COLORS.danger, icon: '⚠️' },
    { title: 'Avg Attendance', value: Math.round(mockStudents.reduce((acc, s) => acc + s.attendance, 0) / mockStudents.length), unit: '%', color: COLORS.blue, icon: '📊' },
    { title: 'Total Sessions', value: mockStudents.reduce((acc, s) => acc + s.counselingSessions, 0), unit: '', color: COLORS.green, icon: '💬' },
    { title: 'Disciplinary Cases', value: mockStudents.reduce((acc, s) => acc + s.disciplinaryActions, 0), unit: '', color: COLORS.orange, icon: '📋' },
    { title: 'Avg Grade', value: (mockStudents.reduce((acc, s) => acc + s.grades, 0) / mockStudents.length).toFixed(1), unit: 'GPA', color: COLORS.purple, icon: '🎯' },
  ];

  const getStudentMetrics = (student: Student): MetricCard[] => [
    { title: 'Attendance', value: student.attendance, unit: '%', color: COLORS.blue, icon: '📅' },
    { title: 'Current Grade', value: student.grades, unit: 'GPA', color: COLORS.purple, icon: '📝' },
    { title: 'Risk Level', value: student.risk.charAt(0).toUpperCase() + student.risk.slice(1), unit: '', color: student.risk === 'low' ? COLORS.green : student.risk === 'medium' ? COLORS.warning : COLORS.danger, icon: '⚡' },
    { title: 'Sessions Attended', value: student.counselingSessions, unit: '', color: COLORS.teal, icon: '💬' },
    { title: 'Disciplinary Actions', value: student.disciplinaryActions, unit: '', color: COLORS.red, icon: '📋' },
    { title: 'Participation', value: student.participation, unit: '%', color: COLORS.green, icon: '🎯' },
  ];

  // Current metrics to display
  const currentMetrics = selectedStudent ? getStudentMetrics(selectedStudent) : getOverviewMetrics();

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', fontFamily: 'Segoe UI, Arial, sans-serif' }}>
      <Navbar role="counsellor" />
      
      {/* Header Section */}
      <div style={{ background: '#fff', borderBottom: '1px solid #e2e8f0', padding: '20px 40px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '1400px', margin: '0 auto' }}>
          <div>
            <h1 style={{ fontSize: '28px', fontWeight: '700', color: '#1a202c', margin: '0 0 8px 0' }}>
              {selectedStudent ? `${selectedStudent.name} Dashboard` : 'Counsellor Dashboard'}
            </h1>
            <p style={{ color: '#64748b', margin: 0 }}>
              {selectedStudent ? `Roll: ${selectedStudent.roll} | Class: ${selectedStudent.class} | Dept: ${selectedStudent.dept}` : 'Student Analytics & Counseling Overview'}
            </p>
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button 
              onClick={() => window.location.reload()} 
              style={{ 
                background: COLORS.yellow, 
                color: '#fff', 
                border: 'none', 
                borderRadius: '8px', 
                padding: '12px 24px', 
                fontWeight: '600', 
                cursor: 'pointer',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }}
            >
              🔄 Refresh
            </button>
            {selectedStudent && (
              <button 
                onClick={() => setSelectedStudent(null)} 
                style={{ 
                  background: COLORS.primary, 
                  color: '#fff', 
                  border: 'none', 
                  borderRadius: '8px', 
                  padding: '12px 24px', 
                  fontWeight: '600', 
                  cursor: 'pointer',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }}
              >
                ← Back to Overview
              </button>
            )}
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', maxWidth: '1400px', margin: '0 auto' }}>
        {/* Sidebar */}
        <AnimatedElement animation="slideInLeft" delay={100}>
          <div style={{ width: '280px', minWidth: '280px', background: '#fff', borderRight: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', height: 'calc(100vh - 120px)', overflowY: 'auto' }}>
            
            {/* Search and Filters */}
            <div style={{ padding: '24px' }}>
              <div style={{ marginBottom: '16px' }}>
                <input
                  type="text"
                  placeholder="Search students..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  style={{ 
                    width: '100%', 
                    padding: '12px', 
                    borderRadius: '8px', 
                    border: '1px solid #e2e8f0', 
                    fontSize: '14px',
                    boxSizing: 'border-box'
                  }}
                />
              </div>
              <button
                style={{ 
                  width: '100%', 
                  padding: '12px', 
                  borderRadius: '8px', 
                  background: showFilters ? COLORS.primary : '#f1f5f9', 
                  color: showFilters ? '#fff' : '#64748b', 
                  border: 'none', 
                  fontWeight: '600', 
                  cursor: 'pointer' 
                }}
                onClick={() => setShowFilters(!showFilters)}
              >
                {showFilters ? '✓ Hide Filters' : '⚙️ Show Filters'}
              </button>
            </div>

            {/* Filter Options */}
            {showFilters && (
              <div style={{ padding: '0 24px 24px', borderBottom: '1px solid #e2e8f0' }}>
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', color: '#374151' }}>Class</label>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    {classes.map(c => (
                      <span 
                        key={c} 
                        style={{ 
                          background: filterClass === c ? COLORS.primary : '#f1f5f9', 
                          color: filterClass === c ? '#fff' : '#64748b', 
                          borderRadius: '6px', 
                          padding: '6px 12px', 
                          cursor: 'pointer', 
                          fontSize: '12px',
                          fontWeight: '500'
                        }} 
                        onClick={() => setFilterClass(filterClass === c ? '' : c)}
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', color: '#374151' }}>Department</label>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    {depts.map(d => (
                      <span 
                        key={d} 
                        style={{ 
                          background: filterDept === d ? COLORS.teal : '#f1f5f9', 
                          color: filterDept === d ? '#fff' : '#64748b', 
                          borderRadius: '6px', 
                          padding: '6px 12px', 
                          cursor: 'pointer', 
                          fontSize: '12px',
                          fontWeight: '500'
                        }} 
                        onClick={() => setFilterDept(filterDept === d ? '' : d)}
                      >
                        {d}
                      </span>
                    ))}
                  </div>
                </div>

                <button 
                  onClick={handleReset} 
                  style={{ 
                    width: '100%',
                    marginTop: '12px', 
                    background: COLORS.red, 
                    color: '#fff', 
                    border: 'none', 
                    borderRadius: '6px', 
                    padding: '8px 16px', 
                    fontWeight: '600', 
                    cursor: 'pointer' 
                  }}
                >
                  Reset All
                </button>
              </div>
            )}
            
            {/* Students List */}
            <div style={{ flex: 1, overflowY: 'auto' }}>
              {filtered.length === 0 ? (
                <div style={{ padding: '40px 24px', textAlign: 'center', color: '#64748b' }}>
                  No students found
                </div>
              ) : (
                filtered.map(s => (
                  <div
                    key={s.id}
                    style={{ 
                      padding: '16px 24px', 
                      borderBottom: '1px solid #f1f5f9',
                      cursor: 'pointer', 
                      background: selectedStudent?.id === s.id ? '#eff6ff' : 'transparent',
                      borderLeft: selectedStudent?.id === s.id ? `4px solid ${COLORS.primary}` : '4px solid transparent'
                    }}
                    onClick={() => setSelectedStudent(s)}
                  >
                    <div style={{ fontWeight: '600', color: '#1a202c', marginBottom: '4px' }}>{s.name}</div>
                    <div style={{ fontSize: '12px', color: '#64748b' }}>
                      {s.roll} • {s.class} • {s.dept}
                    </div>
                    <div style={{ 
                      fontSize: '12px', 
                      fontWeight: '500',
                      color: s.risk === 'low' ? COLORS.green : s.risk === 'medium' ? COLORS.warning : COLORS.danger,
                      marginTop: '4px'
                    }}>
                      {s.risk.toUpperCase()} RISK
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </AnimatedElement>
        
        {/* Main Dashboard Content */}
        <div style={{ flex: 1, padding: '24px', background: '#f8fafc' }}>
          
          {/* Metric Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '24px' }}>
            {currentMetrics.map((metric, idx) => (
              <AnimatedElement key={metric.title} animation="scaleIn" delay={100 + (idx * 50)}>
                <div style={{
                  background: '#fff',
                  borderRadius: '12px',
                  padding: '24px',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                  border: '1px solid #e2e8f0',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  cursor: 'pointer'
                }}
                className="hover:transform hover:scale-105 hover:shadow-lg"
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                    <div style={{ fontSize: '14px', fontWeight: '500', color: '#64748b' }}>{metric.title}</div>
                    <div style={{ fontSize: '20px' }}>{metric.icon}</div>
                  </div>
                  <div style={{ fontSize: '32px', fontWeight: '700', color: metric.color, marginBottom: '4px' }}>
                    {metric.value}
                    {metric.unit && <span style={{ fontSize: '16px', color: '#64748b', marginLeft: '4px' }}>{metric.unit}</span>}
                  </div>
                </div>
              </AnimatedElement>
            ))}
          </div>

          {/* Charts Section */}
          <div style={{ display: 'grid', gridTemplateColumns: selectedStudent ? '1fr' : 'repeat(2, 1fr)', gap: '24px' }}>
            
            {!selectedStudent && (
              <>
                {/* Risk Distribution Chart */}
                <AnimatedElement animation="slideInUp" delay={300}>
                  <div style={{ background: '#fff', borderRadius: '12px', padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', border: '1px solid #e2e8f0' }}>
                    <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1a202c', marginBottom: '20px' }}>Risk Level Distribution</h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={generateRiskData()}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={120}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {generateRiskData().map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.fill} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </AnimatedElement>

                {/* Department Distribution */}
                <AnimatedElement animation="slideInUp" delay={400}>
                  <div style={{ background: '#fff', borderRadius: '12px', padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', border: '1px solid #e2e8f0' }}>
                    <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1a202c', marginBottom: '20px' }}>Students by Department</h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={generateDepartmentData()}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="value" fill={COLORS.blue} radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </AnimatedElement>

                {/* Grade Distribution */}
                <AnimatedElement animation="slideInUp" delay={500}>
                  <div style={{ background: '#fff', borderRadius: '12px', padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', border: '1px solid #e2e8f0' }}>
                    <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1a202c', marginBottom: '20px' }}>Grade Distribution</h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={generateGradeDistribution()}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="value" fill={COLORS.purple} radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </AnimatedElement>

                {/* Monthly Trends */}
                <AnimatedElement animation="slideInUp" delay={600}>
                  <div style={{ background: '#fff', borderRadius: '12px', padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', border: '1px solid #e2e8f0' }}>
                    <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1a202c', marginBottom: '20px' }}>Monthly Counseling Trends</h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={generateMonthlyTrends()}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="sessions" stroke={COLORS.green} strokeWidth={3} dot={{ fill: COLORS.green }} />
                        <Line type="monotone" dataKey="disciplinary" stroke={COLORS.red} strokeWidth={3} dot={{ fill: COLORS.red }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </AnimatedElement>
              </>
            )}

            {selectedStudent && (
              <AnimatedElement animation="slideInUp" delay={300}>
                <div style={{ background: '#fff', borderRadius: '12px', padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', border: '1px solid #e2e8f0' }}>
                  <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1a202c', marginBottom: '20px' }}>
                    {selectedStudent.name}'s Performance Trends
                  </h3>
                  <ResponsiveContainer width="100%" height={400}>
                    <AreaChart data={[
                      { month: 'Jan', attendance: selectedStudent.attendance - 10, grades: selectedStudent.grades - 0.5, participation: selectedStudent.participation - 15 },
                      { month: 'Feb', attendance: selectedStudent.attendance - 5, grades: selectedStudent.grades - 0.2, participation: selectedStudent.participation - 8 },
                      { month: 'Mar', attendance: selectedStudent.attendance + 2, grades: selectedStudent.grades + 0.1, participation: selectedStudent.participation + 3 },
                      { month: 'Apr', attendance: selectedStudent.attendance, grades: selectedStudent.grades, participation: selectedStudent.participation },
                    ]}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Area type="monotone" dataKey="attendance" stackId="1" stroke={COLORS.blue} fill={COLORS.blue} fillOpacity={0.3} />
                      <Area type="monotone" dataKey="participation" stackId="2" stroke={COLORS.green} fill={COLORS.green} fillOpacity={0.3} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </AnimatedElement>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CounsellorDashboard;
