'use client';

import { useState } from 'react';
import Sidebar from '../common/Sidebar';
import AnimatedElement from '../common/AnimatedElement';
import DashboardContent from './DashboardContent';
import StudentsManagement from './StudentsManagement';
import CareerAnalysis from './CareerAnalysis';
import SessionsManagement from './SessionsManagement';
import Interventions from './Interventions';
import Schedule from './Schedule';
import Settings from './Settings';
import Notifications from './Notifications';

// Types
interface Student {
  id: number;
  name: string;
  roll: string;
  year: string;
  semester: string;
  section: string;
  dept: string;
  gender: string;
  socio: string;
  risk: 'low' | 'medium' | 'high';
  cgpa: number;
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

// Mock data with enhanced metrics - College Students
const mockStudents: Student[] = [
  { id: 1, name: 'Amit Sharma', roll: '21CSE001', year: '2nd Year', semester: '4th', section: 'A', dept: 'CSE', gender: 'Male', socio: 'Middle', risk: 'low', cgpa: 8.2, attendance: 92, counselingSessions: 1, disciplinaryActions: 0, participation: 95 },
  { id: 2, name: 'Priya Singh', roll: '21IT002', year: '2nd Year', semester: '4th', section: 'B', dept: 'IT', gender: 'Female', socio: 'High', risk: 'medium', cgpa: 6.5, attendance: 78, counselingSessions: 3, disciplinaryActions: 1, participation: 80 },
  { id: 3, name: 'Rahul Verma', roll: '20ECE003', year: '3rd Year', semester: '6th', section: 'A', dept: 'ECE', gender: 'Male', socio: 'Low', risk: 'high', cgpa: 5.2, attendance: 60, counselingSessions: 5, disciplinaryActions: 2, participation: 50 },
  { id: 4, name: 'Sneha Patel', roll: '22CSE004', year: '1st Year', semester: '2nd', section: 'C', dept: 'CSE', gender: 'Female', socio: 'Middle', risk: 'low', cgpa: 7.9, attendance: 88, counselingSessions: 2, disciplinaryActions: 0, participation: 92 },
  { id: 5, name: 'Vikram Rao', roll: '21ME005', year: '2nd Year', semester: '4th', section: 'B', dept: 'Mechanical', gender: 'Male', socio: 'High', risk: 'medium', cgpa: 7.0, attendance: 80, counselingSessions: 2, disciplinaryActions: 1, participation: 85 },
  { id: 6, name: 'Riya Mehra', roll: '20EEE006', year: '3rd Year', semester: '5th', section: 'A', dept: 'EEE', gender: 'Female', socio: 'Low', risk: 'high', cgpa: 5.8, attendance: 65, counselingSessions: 4, disciplinaryActions: 1, participation: 60 },
  { id: 7, name: 'Karan Gupta', roll: '21Civil007', year: '2nd Year', semester: '3rd', section: 'C', dept: 'Civil', gender: 'Male', socio: 'Middle', risk: 'low', cgpa: 8.0, attendance: 85, counselingSessions: 1, disciplinaryActions: 0, participation: 88 },
  { id: 8, name: 'Fatima Khan', roll: '22IT008', year: '1st Year', semester: '2nd', section: 'B', dept: 'IT', gender: 'Female', socio: 'High', risk: 'medium', cgpa: 6.2, attendance: 82, counselingSessions: 3, disciplinaryActions: 1, participation: 75 },
  { id: 9, name: 'Suresh Das', roll: '20CSE009', year: '3rd Year', semester: '6th', section: 'A', dept: 'CSE', gender: 'Male', socio: 'Low', risk: 'high', cgpa: 4.9, attendance: 55, counselingSessions: 6, disciplinaryActions: 3, participation: 45 },
  { id: 10, name: 'Neha Joshi', roll: '21ECE010', year: '2nd Year', semester: '4th', section: 'C', dept: 'ECE', gender: 'Female', socio: 'Middle', risk: 'low', cgpa: 7.7, attendance: 90, counselingSessions: 1, disciplinaryActions: 0, participation: 87 },
  { id: 11, name: 'Arjun Yadav', roll: '22ME011', year: '1st Year', semester: '1st', section: 'A', dept: 'Mechanical', gender: 'Male', socio: 'High', risk: 'medium', cgpa: 6.8, attendance: 77, counselingSessions: 2, disciplinaryActions: 1, participation: 82 },
  { id: 12, name: 'Megha Jain', roll: '21CSE012', year: '2nd Year', semester: '3rd', section: 'B', dept: 'CSE', gender: 'Female', socio: 'Middle', risk: 'low', cgpa: 7.5, attendance: 89, counselingSessions: 1, disciplinaryActions: 0, participation: 90 },
  { id: 13, name: 'Deepak Kumar', roll: '20EEE013', year: '3rd Year', semester: '5th', section: 'C', dept: 'EEE', gender: 'Male', socio: 'Low', risk: 'high', cgpa: 5.1, attendance: 58, counselingSessions: 5, disciplinaryActions: 2, participation: 48 },
  { id: 14, name: 'Simran Kaur', roll: '21IT014', year: '2nd Year', semester: '4th', section: 'A', dept: 'IT', gender: 'Female', socio: 'High', risk: 'medium', cgpa: 6.3, attendance: 79, counselingSessions: 3, disciplinaryActions: 1, participation: 78 },
  { id: 15, name: 'Mohit Sinha', roll: '22Civil015', year: '1st Year', semester: '2nd', section: 'B', dept: 'Civil', gender: 'Male', socio: 'Middle', risk: 'low', cgpa: 7.8, attendance: 87, counselingSessions: 1, disciplinaryActions: 0, participation: 89 },
  { id: 16, name: 'Anjali Roy', roll: '20ECE016', year: '3rd Year', semester: '6th', section: 'C', dept: 'ECE', gender: 'Female', socio: 'Low', risk: 'high', cgpa: 5.6, attendance: 62, counselingSessions: 4, disciplinaryActions: 2, participation: 55 },
  { id: 17, name: 'Rakesh Nair', roll: '21CSE017', year: '2nd Year', semester: '3rd', section: 'A', dept: 'CSE', gender: 'Male', socio: 'High', risk: 'medium', cgpa: 6.9, attendance: 81, counselingSessions: 2, disciplinaryActions: 1, participation: 83 },
  { id: 18, name: 'Pooja Desai', roll: '22IT018', year: '1st Year', semester: '1st', section: 'B', dept: 'IT', gender: 'Female', socio: 'Middle', risk: 'low', cgpa: 7.2, attendance: 86, counselingSessions: 1, disciplinaryActions: 0, participation: 85 },
  { id: 19, name: 'Tarun Mishra', roll: '20ME019', year: '3rd Year', semester: '5th', section: 'C', dept: 'Mechanical', gender: 'Male', socio: 'Low', risk: 'high', cgpa: 5.3, attendance: 59, counselingSessions: 5, disciplinaryActions: 2, participation: 52 },
  { id: 20, name: 'Shweta Agarwal', roll: '21EEE020', year: '2nd Year', semester: '4th', section: 'A', dept: 'EEE', gender: 'Female', socio: 'High', risk: 'medium', cgpa: 6.7, attendance: 80, counselingSessions: 2, disciplinaryActions: 1, participation: 81 },
  { id: 21, name: 'Nitin Bansal', roll: '22Civil021', year: '1st Year', semester: '2nd', section: 'B', dept: 'Civil', gender: 'Male', socio: 'Middle', risk: 'low', cgpa: 7.6, attendance: 88, counselingSessions: 1, disciplinaryActions: 0, participation: 86 },
  { id: 22, name: 'Isha Kapoor', roll: '20CSE022', year: '3rd Year', semester: '6th', section: 'C', dept: 'CSE', gender: 'Female', socio: 'Low', risk: 'high', cgpa: 5.4, attendance: 61, counselingSessions: 4, disciplinaryActions: 2, participation: 54 },
  { id: 23, name: 'Manish Dubey', roll: '21ECE023', year: '2nd Year', semester: '3rd', section: 'A', dept: 'ECE', gender: 'Male', socio: 'High', risk: 'medium', cgpa: 6.1, attendance: 76, counselingSessions: 3, disciplinaryActions: 1, participation: 79 },
  { id: 24, name: 'Ritu Sharma', roll: '22IT024', year: '1st Year', semester: '1st', section: 'B', dept: 'IT', gender: 'Female', socio: 'Middle', risk: 'low', cgpa: 7.3, attendance: 84, counselingSessions: 1, disciplinaryActions: 0, participation: 87 },
  { id: 25, name: 'Sanjay Singh', roll: '20ME025', year: '3rd Year', semester: '5th', section: 'C', dept: 'Mechanical', gender: 'Male', socio: 'Low', risk: 'high', cgpa: 5.0, attendance: 52, counselingSessions: 6, disciplinaryActions: 3, participation: 43 },
  { id: 26, name: 'Ayesha Khan', roll: '21EEE026', year: '2nd Year', semester: '4th', section: 'A', dept: 'EEE', gender: 'Female', socio: 'High', risk: 'medium', cgpa: 6.6, attendance: 78, counselingSessions: 2, disciplinaryActions: 1, participation: 80 },
  { id: 27, name: 'Rohit Chawla', roll: '22CSE027', year: '1st Year', semester: '2nd', section: 'B', dept: 'CSE', gender: 'Male', socio: 'Middle', risk: 'low', cgpa: 7.1, attendance: 83, counselingSessions: 1, disciplinaryActions: 0, participation: 84 },
  { id: 28, name: 'Neelam Joshi', roll: '20Civil028', year: '3rd Year', semester: '6th', section: 'C', dept: 'Civil', gender: 'Female', socio: 'Low', risk: 'high', cgpa: 5.7, attendance: 63, counselingSessions: 4, disciplinaryActions: 2, participation: 57 },
  { id: 29, name: 'Vivek Saxena', roll: '21IT029', year: '2nd Year', semester: '3rd', section: 'A', dept: 'IT', gender: 'Male', socio: 'High', risk: 'medium', cgpa: 6.4, attendance: 77, counselingSessions: 3, disciplinaryActions: 1, participation: 76 },
  { id: 30, name: 'Divya Pillai', roll: '22ECE030', year: '1st Year', semester: '1st', section: 'B', dept: 'ECE', gender: 'Female', socio: 'Middle', risk: 'low', cgpa: 7.4, attendance: 85, counselingSessions: 1, disciplinaryActions: 0, participation: 88 },
  // 4th Year Students
  { id: 31, name: 'Abhishek Kumar', roll: '19CSE031', year: '4th Year', semester: '8th', section: 'A', dept: 'CSE', gender: 'Male', socio: 'High', risk: 'low', cgpa: 9.1, attendance: 94, counselingSessions: 0, disciplinaryActions: 0, participation: 96 },
  { id: 32, name: 'Kritika Sharma', roll: '19IT032', year: '4th Year', semester: '7th', section: 'B', dept: 'IT', gender: 'Female', socio: 'Middle', risk: 'low', cgpa: 8.7, attendance: 91, counselingSessions: 1, disciplinaryActions: 0, participation: 93 },
  { id: 33, name: 'Rohan Mishra', roll: '19ECE033', year: '4th Year', semester: '8th', section: 'C', dept: 'ECE', gender: 'Male', socio: 'Low', risk: 'medium', cgpa: 7.2, attendance: 79, counselingSessions: 2, disciplinaryActions: 1, participation: 81 },
  { id: 34, name: 'Sunita Devi', roll: '19EEE034', year: '4th Year', semester: '7th', section: 'A', dept: 'EEE', gender: 'Female', socio: 'High', risk: 'low', cgpa: 8.3, attendance: 89, counselingSessions: 1, disciplinaryActions: 0, participation: 90 },
  { id: 35, name: 'Gaurav Singh', roll: '19ME035', year: '4th Year', semester: '8th', section: 'B', dept: 'Mechanical', gender: 'Male', socio: 'Middle', risk: 'medium', cgpa: 6.8, attendance: 75, counselingSessions: 3, disciplinaryActions: 1, participation: 77 },
  { id: 36, name: 'Preeti Nair', roll: '19Civil036', year: '4th Year', semester: '7th', section: 'C', dept: 'Civil', gender: 'Female', socio: 'Low', risk: 'high', cgpa: 5.9, attendance: 68, counselingSessions: 4, disciplinaryActions: 2, participation: 65 },
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
  { name: 'CSE', value: mockStudents.filter(s => s.dept === 'CSE').length, fill: COLORS.blue },
  { name: 'IT', value: mockStudents.filter(s => s.dept === 'IT').length, fill: COLORS.teal },
  { name: 'ECE', value: mockStudents.filter(s => s.dept === 'ECE').length, fill: COLORS.purple },
  { name: 'EEE', value: mockStudents.filter(s => s.dept === 'EEE').length, fill: COLORS.yellow },
  { name: 'Mechanical', value: mockStudents.filter(s => s.dept === 'Mechanical').length, fill: COLORS.orange },
  { name: 'Civil', value: mockStudents.filter(s => s.dept === 'Civil').length, fill: COLORS.green },
];

const generateGradeDistribution = (): ChartData[] => [
  { name: 'Excellent (8-10)', value: mockStudents.filter(s => s.cgpa >= 8).length, fill: COLORS.green },
  { name: 'Good (6-8)', value: mockStudents.filter(s => s.cgpa >= 6 && s.cgpa < 8).length, fill: COLORS.yellow },
  { name: 'Average (4-6)', value: mockStudents.filter(s => s.cgpa >= 4 && s.cgpa < 6).length, fill: COLORS.orange },
  { name: 'Poor (<4)', value: mockStudents.filter(s => s.cgpa < 4).length, fill: COLORS.red },
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
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('');
  const [filterClass, setFilterClass] = useState<string[]>([]);
  const [filterDept, setFilterDept] = useState<string[]>([]);
  const [filterSection, setFilterSection] = useState<string[]>([]);
  const [filterGender, setFilterGender] = useState<string[]>([]);
  const [filterSocio, setFilterSocio] = useState<string[]>([]);
  const [filterRisk, setFilterRisk] = useState<string[]>([]);
  const [pendingFilters, setPendingFilters] = useState({
    class: [] as string[],
    dept: [] as string[],
    section: [] as string[],
    gender: [] as string[],
    socio: [] as string[],
    risk: [] as string[]
  });
  const [selectedStudent, setSelectedStudent] = useState(null as Student | null);
  const [currentPage, setCurrentPage] = useState('dashboard');

  // Unique filter options
  const years = [...new Set(mockStudents.map(s => s.year))];
  const semesters = [...new Set(mockStudents.map(s => s.semester))];
  const sections = [...new Set(mockStudents.map(s => s.section))];
  const depts = [...new Set(mockStudents.map(s => s.dept))];
  const genders = [...new Set(mockStudents.map(s => s.gender))];
  const socioGroups = [...new Set(mockStudents.map(s => s.socio))];

  // Filter and search logic
  const filtered = mockStudents.filter(s =>
    (filterClass.length === 0 || filterClass.includes(s.year)) &&
    (filterDept.length === 0 || filterDept.includes(s.dept)) &&
    (filterSection.length === 0 || filterSection.includes(s.section)) &&
    (filterGender.length === 0 || filterGender.includes(s.gender)) &&
    (filterSocio.length === 0 || filterSocio.includes(s.socio)) &&
    (filterRisk.length === 0 || filterRisk.includes(s.risk)) &&
    (s.name.toLowerCase().includes(search.toLowerCase()) || s.roll.includes(search))
  );

  // Check if any filters are active
  const hasActiveFilters = filterClass.length > 0 || filterDept.length > 0 || filterSection.length > 0 || filterGender.length > 0 || filterSocio.length > 0 || filterRisk.length > 0;

  // Apply filters
  const applyFilters = () => {
    setFilterClass(pendingFilters.class);
    setFilterDept(pendingFilters.dept);
    setFilterSection(pendingFilters.section);
    setFilterGender(pendingFilters.gender);
    setFilterSocio(pendingFilters.socio);
    setFilterRisk(pendingFilters.risk);
    setIsDropdownOpen(false);
  };

  // Clear all filters
  const clearFilters = () => {
    setFilterClass([]);
    setFilterDept([]);
    setFilterSection([]);
    setFilterGender([]);
    setFilterSocio([]);
    setFilterRisk([]);
    setPendingFilters({
      class: [],
      dept: [],
      section: [],
      gender: [],
      socio: [],
      risk: []
    });
    setIsDropdownOpen(false);
  };

  // Reset filters and selection
  const handleReset = () => {
    clearFilters();
    setSelectedStudent(null);
    setSearch('');
    setShowFilters(false);
  };

  // Handle updating student data
  const handleUpdateStudentData = (student: Student) => {
    // For now, show an alert with student information
    // In a real implementation, this would open a modal or navigate to an edit form
    alert(`Update data for ${student.name} (Roll: ${student.roll})\n\nThis would typically:\n- Open a form with current student data\n- Allow editing of grades, attendance, counseling notes\n- Save changes to database\n- Refresh the dashboard`);

    // TODO: Implement actual update functionality
    // This could involve:
    // 1. Opening a modal with editable form
    // 2. Making API calls to update student data
    // 3. Refreshing the component state
    console.log('Update student data:', student);
  };

  // Generate metric cards
  const getOverviewMetrics = (): MetricCard[] => [
    { title: 'Total Students', value: mockStudents.length, unit: '', color: COLORS.primary, icon: '👥' },
    { title: 'High Risk Students', value: mockStudents.filter(s => s.risk === 'high').length, unit: '', color: COLORS.danger, icon: '⚠️' },
    { title: 'Avg Attendance', value: Math.round(mockStudents.reduce((acc, s) => acc + s.attendance, 0) / mockStudents.length), unit: '%', color: COLORS.blue, icon: '📊' },
    { title: 'Total Sessions', value: mockStudents.reduce((acc, s) => acc + s.counselingSessions, 0), unit: '', color: COLORS.green, icon: '💬' },
    { title: 'Disciplinary Cases', value: mockStudents.reduce((acc, s) => acc + s.disciplinaryActions, 0), unit: '', color: COLORS.orange, icon: '📋' },
    { title: 'Avg CGPA', value: (mockStudents.reduce((acc, s) => acc + s.cgpa, 0) / mockStudents.length).toFixed(1), unit: 'CGPA', color: COLORS.purple, icon: '🎯' },
  ];

  const getStudentMetrics = (student: Student): MetricCard[] => [
    { title: 'Attendance', value: student.attendance, unit: '%', color: COLORS.blue, icon: '📅' },
    { title: 'Current CGPA', value: student.cgpa, unit: 'CGPA', color: COLORS.purple, icon: '📝' },
    { title: 'Risk Level', value: student.risk.charAt(0).toUpperCase() + student.risk.slice(1), unit: '', color: student.risk === 'low' ? COLORS.green : student.risk === 'medium' ? COLORS.warning : COLORS.danger, icon: '⚡' },
    { title: 'Sessions Attended', value: student.counselingSessions, unit: '', color: COLORS.teal, icon: '💬' },
    { title: 'Disciplinary Actions', value: student.disciplinaryActions, unit: '', color: COLORS.red, icon: '📋' },
    { title: 'Participation', value: student.participation, unit: '%', color: COLORS.green, icon: '🎯' },
  ];

  // Current metrics to display
  const currentMetrics = selectedStudent ? getStudentMetrics(selectedStudent) : getOverviewMetrics();

  // Render content based on current page
  const renderContent = () => {
    switch (currentPage) {
      case 'students':
        return <StudentsManagement mockStudents={mockStudents} />;
      case 'analytics':
        return <CareerAnalysis mockStudents={mockStudents} />;
      case 'sessions':
        return <SessionsManagement mockStudents={mockStudents} />;
      case 'interventions':
        return <Interventions mockStudents={mockStudents} />;
      case 'schedule':
        return <Schedule mockStudents={mockStudents} />;
      case 'settings':
        return <Settings mockStudents={mockStudents} />;
      case 'notifications':
        return <Notifications mockStudents={mockStudents} />;
      case 'dashboard':
      default:
        return (
          <div style={{ display: 'flex', flex: 1, gap: '20px', padding: '20px 0' }}>
            {/* Students Sidebar */}
            <AnimatedElement animation="slideInLeft" delay={100}>
              <div style={{
                width: '350px',
                minWidth: '350px',
                background: '#fff',
                borderRadius: '16px',
                boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
                border: '1px solid #e2e8f0',
                display: 'flex',
                flexDirection: 'column',
                maxHeight: 'calc(100vh - 180px)',
                overflow: 'hidden'
              }}>

                {/* Search and Filters */}
                <div style={{ padding: '24px', borderBottom: '1px solid #e2e8f0' }}>
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

                  {/* Filter Controls */}
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <div style={{ position: 'relative', flex: 1 }}>
                      <button
                        style={{
                          width: '100%',
                          padding: '12px',
                          borderRadius: '8px',
                          background: hasActiveFilters ? COLORS.primary : '#f1f5f9',
                          color: hasActiveFilters ? '#fff' : '#64748b',
                          border: 'none',
                          fontWeight: '600',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          fontSize: '14px',
                          transition: 'all 0.3s ease'
                        }}
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        onMouseEnter={(e) => {
                          if (!hasActiveFilters) {
                            e.currentTarget.style.background = '#e2e8f0';
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (!hasActiveFilters) {
                            e.currentTarget.style.background = '#f1f5f9';
                          }
                        }}
                      >
                        <span>
                          {hasActiveFilters ? '🔍 Filters Active' : '⚙️ Filter Students'}
                        </span>
                        <span style={{
                          transform: isDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                          transition: 'transform 0.3s ease'
                        }}>
                          ▼
                        </span>
                      </button>

                      {/* Dropdown Menu */}
                      {isDropdownOpen && (
                        <div style={{
                          position: 'absolute',
                          top: '100%',
                          left: 0,
                          right: 0,
                          background: '#fff',
                          border: '1px solid #e2e8f0',
                          borderRadius: '12px',
                          boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                          zIndex: 100,
                          marginTop: '4px',
                          padding: '20px',
                          maxHeight: '400px',
                          overflowY: 'auto'
                        }}>
                          {/* Risk Level Filter */}
                          <div style={{ marginBottom: '16px' }}>
                            <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', color: '#374151', fontSize: '13px' }}>
                              Risk Level
                            </label>
                            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                              {['low', 'medium', 'high'].map(risk => (
                                <button
                                  key={risk}
                                  style={{
                                    background: pendingFilters.risk.includes(risk) ?
                                      (risk === 'low' ? COLORS.green : risk === 'medium' ? COLORS.warning : COLORS.danger) :
                                      '#f8fafc',
                                    color: pendingFilters.risk.includes(risk) ? '#fff' : '#64748b',
                                    border: `1px solid ${pendingFilters.risk.includes(risk) ? 'transparent' : '#e2e8f0'}`,
                                    borderRadius: '6px',
                                    padding: '6px 12px',
                                    cursor: 'pointer',
                                    fontSize: '12px',
                                    fontWeight: '500',
                                    transition: 'all 0.2s ease'
                                  }}
                                  onClick={() => setPendingFilters(prev => ({
                                    ...prev,
                                    risk: prev.risk.includes(risk)
                                      ? prev.risk.filter(item => item !== risk)
                                      : [...prev.risk, risk]
                                  }))}
                                >
                                  {risk.toUpperCase()}
                                </button>
                              ))}
                            </div>
                          </div>

                          {/* Class Filter */}
                          <div style={{ marginBottom: '16px' }}>
                            <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', color: '#374151', fontSize: '13px' }}>
                              Year
                            </label>
                            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                              {years.map(c => (
                                <button
                                  key={c}
                                  style={{
                                    background: pendingFilters.class.includes(c) ? COLORS.primary : '#f8fafc',
                                    color: pendingFilters.class.includes(c) ? '#fff' : '#64748b',
                                    border: `1px solid ${pendingFilters.class.includes(c) ? 'transparent' : '#e2e8f0'}`,
                                    borderRadius: '6px',
                                    padding: '6px 12px',
                                    cursor: 'pointer',
                                    fontSize: '12px',
                                    fontWeight: '500',
                                    transition: 'all 0.2s ease'
                                  }}
                                  onClick={() => setPendingFilters(prev => ({
                                    ...prev,
                                    class: prev.class.includes(c)
                                      ? prev.class.filter(item => item !== c)
                                      : [...prev.class, c]
                                  }))}
                                >
                                  {c}
                                </button>
                              ))}
                            </div>
                          </div>

                          {/* Department Filter */}
                          <div style={{ marginBottom: '20px' }}>
                            <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', color: '#374151', fontSize: '13px' }}>
                              Department
                            </label>
                            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                              {depts.map(d => (
                                <button
                                  key={d}
                                  style={{
                                    background: pendingFilters.dept.includes(d) ? COLORS.blue : '#f8fafc',
                                    color: pendingFilters.dept.includes(d) ? '#fff' : '#64748b',
                                    border: `1px solid ${pendingFilters.dept.includes(d) ? 'transparent' : '#e2e8f0'}`,
                                    borderRadius: '6px',
                                    padding: '6px 12px',
                                    cursor: 'pointer',
                                    fontSize: '12px',
                                    fontWeight: '500',
                                    transition: 'all 0.2s ease'
                                  }}
                                  onClick={() => setPendingFilters(prev => ({
                                    ...prev,
                                    dept: prev.dept.includes(d)
                                      ? prev.dept.filter(item => item !== d)
                                      : [...prev.dept, d]
                                  }))}
                                >
                                  {d}
                                </button>
                              ))}
                            </div>
                          </div>

                          {/* Section Filter */}
                          <div style={{ marginBottom: '16px' }}>
                            <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', color: '#374151', fontSize: '13px' }}>
                              Section
                            </label>
                            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                              {sections.map(s => (
                                <button
                                  key={s}
                                  style={{
                                    background: pendingFilters.section.includes(s) ? COLORS.purple : '#f8fafc',
                                    color: pendingFilters.section.includes(s) ? '#fff' : '#64748b',
                                    border: `1px solid ${pendingFilters.section.includes(s) ? 'transparent' : '#e2e8f0'}`,
                                    borderRadius: '6px',
                                    padding: '6px 12px',
                                    cursor: 'pointer',
                                    fontSize: '12px',
                                    fontWeight: '500',
                                    transition: 'all 0.2s ease'
                                  }}
                                  onClick={() => setPendingFilters(prev => ({
                                    ...prev,
                                    section: prev.section.includes(s)
                                      ? prev.section.filter(item => item !== s)
                                      : [...prev.section, s]
                                  }))}
                                >
                                  {s}
                                </button>
                              ))}
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div style={{ display: 'flex', gap: '8px', paddingTop: '16px', borderTop: '1px solid #f1f5f9' }}>
                            <button
                              style={{
                                flex: 1,
                                padding: '10px 16px',
                                borderRadius: '8px',
                                background: 'linear-gradient(135deg, #10b981, #059669)',
                                color: '#fff',
                                border: 'none',
                                fontWeight: '600',
                                cursor: 'pointer',
                                fontSize: '13px',
                                transition: 'all 0.3s ease'
                              }}
                              onClick={applyFilters}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-1px)';
                                e.currentTarget.style.boxShadow = '0 4px 15px rgba(16, 185, 129, 0.3)';
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = 'none';
                              }}
                            >
                              Apply Filters
                            </button>
                            <button
                              style={{
                                flex: 1,
                                padding: '10px 16px',
                                borderRadius: '8px',
                                background: '#fff',
                                color: '#64748b',
                                border: '1px solid #e2e8f0',
                                fontWeight: '600',
                                cursor: 'pointer',
                                fontSize: '13px',
                                transition: 'all 0.3s ease'
                              }}
                              onClick={clearFilters}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.background = '#f8fafc';
                                e.currentTarget.style.color = '#374151';
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.background = '#fff';
                                e.currentTarget.style.color = '#64748b';
                              }}
                            >
                              Clear All
                            </button>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Clear Filters Button (only show when filters are active) */}
                    {hasActiveFilters && (
                      <button
                        style={{
                          padding: '12px',
                          borderRadius: '8px',
                          background: '#fff',
                          color: COLORS.danger,
                          border: `1px solid ${COLORS.danger}`,
                          cursor: 'pointer',
                          fontSize: '12px',
                          fontWeight: '600',
                          transition: 'all 0.3s ease',
                          whiteSpace: 'nowrap'
                        }}
                        onClick={clearFilters}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = COLORS.danger;
                          e.currentTarget.style.color = '#fff';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = '#fff';
                          e.currentTarget.style.color = COLORS.danger;
                        }}
                      >
                        Clear
                      </button>
                    )}
                  </div>
                </div>



                {/* Students List */}
                <div style={{
                  flex: 1,
                  overflowY: 'auto',
                  /* Custom scrollbar styles */
                  scrollbarWidth: 'thin',
                  scrollbarColor: '#cbd5e1 #f1f5f9'
                }} className="custom-scrollbar">
                  <style jsx>{`
                    .custom-scrollbar::-webkit-scrollbar {
                      width: 6px;
                    }
                    .custom-scrollbar::-webkit-scrollbar-track {
                      background: #f1f5f9;
                      border-radius: 10px;
                    }
                    .custom-scrollbar::-webkit-scrollbar-thumb {
                      background: #cbd5e1;
                      border-radius: 10px;
                    }
                    .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                      background: #94a3b8;
                    }
                  `}</style>
                  {filtered.length === 0 ? (
                    <div style={{ padding: '40px 24px', textAlign: 'center', color: '#64748b' }}>
                      No students found
                    </div>
                  ) : (
                    filtered.map(s => {
                      // Generate consistent profile picture based on student ID
                      const profilePictures = [
                        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
                        'https://images.unsplash.com/photo-1494790108755-2616b612b1a1?w=150&h=150&fit=crop&crop=face',
                        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
                        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face',
                        'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&h=150&fit=crop&crop=face',
                        'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&h=150&fit=crop&crop=face'
                      ];
                      const profilePic = profilePictures[s.id % profilePictures.length];

                      return (
                        <div
                          key={s.id}
                          style={{
                            padding: '16px 20px',
                            borderBottom: '1px solid #f1f5f9',
                            cursor: 'pointer',
                            background: selectedStudent?.id === s.id ? '#eff6ff' : 'transparent',
                            borderLeft: selectedStudent?.id === s.id ? `4px solid ${COLORS.primary}` : '4px solid transparent',
                            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                            transform: selectedStudent?.id === s.id ? 'translateX(4px)' : 'translateX(0)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px'
                          }}
                          onClick={() => setSelectedStudent(s)}
                          onMouseEnter={(e) => {
                            if (selectedStudent?.id !== s.id) {
                              e.currentTarget.style.background = '#f8fafc';
                              e.currentTarget.style.transform = 'translateX(2px)';
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (selectedStudent?.id !== s.id) {
                              e.currentTarget.style.background = 'transparent';
                              e.currentTarget.style.transform = 'translateX(0)';
                            }
                          }}
                        >
                          {/* Profile Picture */}
                          <div style={{
                            width: '40px',
                            height: '40px',
                            borderRadius: '12px',
                            background: `url(${profilePic}) center/cover`,
                            border: selectedStudent?.id === s.id ? `2px solid ${COLORS.primary}` : '2px solid #e2e8f0',
                            transition: 'all 0.3s ease',
                            flexShrink: 0
                          }} />

                          {/* Student Info */}
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ fontWeight: '600', color: '#1a202c', marginBottom: '4px', fontSize: '14px' }}>
                              {s.name}
                            </div>
                            <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '4px' }}>
                              {s.roll} • {s.year} • Sem {s.semester} • Sec {s.section} • {s.dept}
                            </div>
                            <div style={{
                              fontSize: '11px',
                              fontWeight: '600',
                              color: s.risk === 'low' ? COLORS.green : s.risk === 'medium' ? COLORS.warning : COLORS.danger,
                              background: s.risk === 'low' ? `${COLORS.green}15` : s.risk === 'medium' ? `${COLORS.warning}15` : `${COLORS.danger}15`,
                              padding: '2px 8px',
                              borderRadius: '12px',
                              display: 'inline-block'
                            }}>
                              {s.risk.toUpperCase()} RISK
                            </div>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            </AnimatedElement>

            {/* Dashboard Content */}
            <DashboardContent selectedStudent={selectedStudent} mockStudents={mockStudents} />
          </div>
        );
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', fontFamily: 'Segoe UI, Arial, sans-serif', display: 'flex' }}>
      {/* Sidebar Component */}
      <Sidebar
        role="counsellor"
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />

      {/* Main Content Area */}
      <div style={{
        marginLeft: '72px',
        flex: 1,
        transition: 'margin-left 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column'
      }}>

        {/* Header Section */}
        <div style={{ background: '#fff', borderBottom: '1px solid #e2e8f0', padding: '20px 40px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              {currentPage === 'dashboard' && selectedStudent && (
                <div style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '16px',
                  background: `url(${[
                    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
                    'https://images.unsplash.com/photo-1494790108755-2616b612b1a1?w=150&h=150&fit=crop&crop=face',
                    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
                    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face',
                    'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&h=150&fit=crop&crop=face',
                    'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&h=150&fit=crop&crop=face'
                  ][selectedStudent.id % 6]}) center/cover`,
                  border: `3px solid ${COLORS.primary}`,
                  boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                }} />
              )}
              <div>
                <h1 style={{ fontSize: '28px', fontWeight: '700', color: '#1a202c', margin: '0 0 8px 0' }}>
                  {currentPage === 'dashboard' && selectedStudent ? `${selectedStudent.name} Dashboard` :
                    currentPage === 'students' ? 'Students Management' :
                      currentPage === 'analytics' ? 'Career Analysis' :
                        currentPage === 'interventions' ? 'Interventions Management' :
                          currentPage === 'sessions' ? 'Sessions Management' :
                            currentPage === 'schedule' ? 'Schedule & Calendar' :
                              currentPage === 'settings' ? 'Settings & Preferences' :
                                currentPage === 'notifications' ? 'Notifications Center' : 'Counsellor Dashboard'}
                </h1>
                <p style={{ color: '#64748b', margin: 0 }}>
                  {currentPage === 'dashboard' && selectedStudent ? `Roll: ${selectedStudent.roll} | ${selectedStudent.year} | Sem: ${selectedStudent.semester} | Sec: ${selectedStudent.section} | ${selectedStudent.dept}` :
                    currentPage === 'students' ? 'Manage and monitor all student records' :
                      currentPage === 'analytics' ? 'Career readiness and industry trend analysis' :
                        currentPage === 'interventions' ? 'Track and manage student intervention programs' :
                          currentPage === 'sessions' ? 'Schedule and monitor counseling sessions' :
                            currentPage === 'schedule' ? 'Manage your daily schedule and appointments' :
                              currentPage === 'settings' ? 'Configure your account and system preferences' :
                                currentPage === 'notifications' ? 'View and manage all system notifications' : 'Student Analytics & Counseling Overview'}
                </p>
              </div>
            </div>

            {currentPage === 'dashboard' && selectedStudent && (
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <AnimatedElement>
                  <button
                    onClick={() => selectedStudent && handleUpdateStudentData(selectedStudent)}
                    style={{
                      background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
                      color: 'white',
                      border: 'none',
                      padding: '12px 24px',
                      borderRadius: '10px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      fontSize: '14px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      boxShadow: '0 4px 15px rgba(59, 130, 246, 0.3)',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      transform: 'translateY(0)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 8px 25px rgba(59, 130, 246, 0.4)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 4px 15px rgba(59, 130, 246, 0.3)';
                    }}
                  >
                    <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    Update Data
                  </button>
                </AnimatedElement>
                <AnimatedElement>
                  <button
                    onClick={() => setSelectedStudent(null)}
                    style={{
                      background: 'rgba(239, 68, 68, 0.1)',
                      color: '#dc2626',
                      border: '1px solid rgba(239, 68, 68, 0.3)',
                      padding: '12px 24px',
                      borderRadius: '10px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      fontSize: '14px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      transform: 'translateY(0)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.background = 'rgba(239, 68, 68, 0.15)';
                      e.currentTarget.style.borderColor = 'rgba(239, 68, 68, 0.4)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)';
                      e.currentTarget.style.borderColor = 'rgba(239, 68, 68, 0.3)';
                    }}
                  >
                    <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    Back to Overview
                  </button>
                </AnimatedElement>
              </div>
            )}
          </div>
        </div>

        {/* Render Current Page Content */}
        {renderContent()}
      </div>
    </div>
  );
}

export default CounsellorDashboard;
