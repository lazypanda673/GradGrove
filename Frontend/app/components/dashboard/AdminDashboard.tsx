'use client';

import { useState, useMemo } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, AreaChart, Area
} from 'recharts';

// Enhanced mock data for comprehensive admin dashboard
const mockStudents = [
  { id: 1, name: 'Amit Sharma', roll: '21CSE001', dept: 'CSE', year: '2nd', riskScore: 0.12, riskLevel: 'low', counselor: 'Dr. Rao', lastActivity: '2025-09-10', email: 'amit@college.edu' },
  { id: 2, name: 'Priya Singh', roll: '21IT002', dept: 'IT', year: '2nd', riskScore: 0.45, riskLevel: 'medium', counselor: 'Ms. Kapoor', lastActivity: '2025-09-12', email: 'priya@college.edu' },
  { id: 3, name: 'Rahul Verma', roll: '20ECE003', dept: 'ECE', year: '3rd', riskScore: 0.78, riskLevel: 'high', counselor: 'Dr. Sen', lastActivity: '2025-09-15', email: 'rahul@college.edu' },
  { id: 4, name: 'Sneha Patel', roll: '21CSE004', dept: 'CSE', year: '2nd', riskScore: 0.82, riskLevel: 'high', counselor: 'Dr. Rao', lastActivity: '2025-09-08', email: 'sneha@college.edu' },
  { id: 5, name: 'Arjun Kumar', roll: '20IT005', dept: 'IT', year: '3rd', riskScore: 0.25, riskLevel: 'low', counselor: 'Ms. Kapoor', lastActivity: '2025-09-14', email: 'arjun@college.edu' },
  { id: 6, name: 'Kavya Reddy', roll: '21ECE006', dept: 'ECE', year: '2nd', riskScore: 0.68, riskLevel: 'high', counselor: 'Dr. Sen', lastActivity: '2025-09-11', email: 'kavya@college.edu' },
];

const mockCounselors = [
  { id: 1, name: 'Dr. Rao', dept: 'CSE', assigned: 45, highRisk: 5, perfScore: 0.88, level: 'Senior', email: 'rao@college.edu', workload: 'Normal' },
  { id: 2, name: 'Ms. Kapoor', dept: 'IT', assigned: 32, highRisk: 8, perfScore: 0.76, level: 'Mid', email: 'kapoor@college.edu', workload: 'High' },
  { id: 3, name: 'Dr. Sen', dept: 'ECE', assigned: 28, highRisk: 12, perfScore: 0.65, level: 'Senior', email: 'sen@college.edu', workload: 'Overloaded' },
  { id: 4, name: 'Prof. Mehta', dept: 'CSE', assigned: 22, highRisk: 3, perfScore: 0.92, level: 'Senior', email: 'mehta@college.edu', workload: 'Normal' },
];

const riskTrendData = [
  { month: 'Jan', high: 15, medium: 25, low: 60 },
  { month: 'Feb', high: 18, medium: 28, low: 54 },
  { month: 'Mar', high: 22, medium: 30, low: 48 },
  { month: 'Apr', high: 25, medium: 32, low: 43 },
  { month: 'May', high: 20, medium: 28, low: 52 },
  { month: 'Jun', high: 16, medium: 24, low: 60 },
];

const riskDistributionData = [
  { name: 'Low Risk', value: 60, color: '#10b981' },
  { name: 'Medium Risk', value: 25, color: '#f59e0b' },
  { name: 'High Risk', value: 15, color: '#ef4444' },
];

const deptRiskData = [
  { dept: 'CSE', low: 45, medium: 20, high: 8 },
  { dept: 'IT', low: 38, medium: 15, high: 12 },
  { dept: 'ECE', low: 32, medium: 18, high: 15 },
  { dept: 'MECH', low: 42, medium: 22, high: 9 },
];

export default function AdminDashboard() {
  const [currentPage, setCurrentPage] = useState<string>('overview');
  const [selectedStudent, setSelectedStudent] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDept, setFilterDept] = useState('all');
  const [filterRisk, setFilterRisk] = useState('all');
  const [notifications, setNotifications] = useState([
    { id: 1, type: 'high-risk', message: 'Sneha Patel flagged as high-risk', time: '2 min ago' },
    { id: 2, type: 'workload', message: 'Dr. Sen is overloaded (45+ students)', time: '1 hour ago' },
    { id: 3, type: 'system', message: 'Weekly report generated successfully', time: '3 hours ago' },
  ]);
  const [showNotifications, setShowNotifications] = useState(false);

  const students = useMemo(() => mockStudents, []);
  const counselors = useMemo(() => mockCounselors, []);

  const filteredStudents = useMemo(() => {
    return students.filter(student => {
      const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           student.roll.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesDept = filterDept === 'all' || student.dept === filterDept;
      const matchesRisk = filterRisk === 'all' || student.riskLevel === filterRisk;
      return matchesSearch && matchesDept && matchesRisk;
    });
  }, [students, searchTerm, filterDept, filterRisk]);

  const sendAlert = (message: string, target: string) => {
    // placeholder - in a real app this would call an API
    alert(`Alert sent to ${target}: ${message}`);
  };

  const getRiskBadgeColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getWorkloadColor = (workload: string) => {
    switch (workload) {
      case 'Overloaded': return 'text-red-600';
      case 'High': return 'text-yellow-600';
      case 'Normal': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  // Top Navigation Bar
  const TopNavbar = () => (
    <div className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold text-gray-900">GradGrove Admin</h1>
          <div className="relative">
            <input
              type="text"
              placeholder="Global search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {/* Notifications Bell */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-3.403-3.403A7.001 7.001 0 0116 12V8a8 8 0 10-16 0v4a7.001 7.001 0 01-.597 2.597L3 17h5m8 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              {notifications.length > 0 && (
                <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  {notifications.length}
                </span>
              )}
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                <div className="p-4 border-b border-gray-200">
                  <h3 className="text-lg font-semibold">Notifications</h3>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {notifications.map(notif => (
                    <div key={notif.id} className="p-4 border-b border-gray-100 hover:bg-gray-50">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-sm text-gray-800">{notif.message}</p>
                          <p className="text-xs text-gray-500 mt-1">{notif.time}</p>
                        </div>
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          notif.type === 'high-risk' ? 'bg-red-100 text-red-800' :
                          notif.type === 'workload' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {notif.type}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Profile Menu */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-medium">A</span>
            </div>
            <span className="text-sm font-medium text-gray-700">Admin</span>
          </div>
        </div>
      </div>
    </div>
  );

  // Left Sidebar Menu
  const Sidebar = () => {
    const menuItems = [
      { icon: '📊', label: 'Overview', key: 'overview' },
      { icon: '👥', label: 'Students', key: 'students' },
      { icon: '🧑‍⚕️', label: 'Counselors', key: 'counselors' },
      { icon: '🔗', label: 'Mapping', key: 'mapping' },
      { icon: '📈', label: 'Analytics', key: 'analytics' },
      { icon: '✉️', label: 'Communication', key: 'communication' },
      { icon: '📋', label: 'Reports', key: 'reports' },
      { icon: '⚙️', label: 'Settings', key: 'settings' },
    ];

    return (
      <div className="w-64 bg-gray-900 text-white h-full">
        <div className="p-6">
          <div className="space-y-2">
            {menuItems.map(item => (
              <button
                key={item.key}
                onClick={() => setCurrentPage(item.key)}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                  currentPage === item.key 
                    ? 'bg-blue-600 text-white' 
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // Overview Page
  const OverviewPage = () => (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                <span className="text-white text-sm">👥</span>
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Students</p>
              <p className="text-2xl font-bold text-gray-900">{students.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center">
                <span className="text-white text-sm">⚠️</span>
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">High Risk</p>
              <p className="text-2xl font-bold text-red-600">{students.filter(s => s.riskLevel === 'high').length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                <span className="text-white text-sm">🧑‍⚕️</span>
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Active Counselors</p>
              <p className="text-2xl font-bold text-green-600">{counselors.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-yellow-500 rounded-lg flex items-center justify-center">
                <span className="text-white text-sm">📈</span>
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Avg Performance</p>
              <p className="text-2xl font-bold text-yellow-600">78%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Risk Distribution Pie Chart */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Risk Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={riskDistributionData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${((percent as number) * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {riskDistributionData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Department Risk Bar Chart */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Department-wise Risk</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={deptRiskData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="dept" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="low" stackId="a" fill="#10b981" />
              <Bar dataKey="medium" stackId="a" fill="#f59e0b" />
              <Bar dataKey="high" stackId="a" fill="#ef4444" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Risk Trend Line Chart */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Risk Trends Over Time</h3>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={riskTrendData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="high" stroke="#ef4444" strokeWidth={2} />
            <Line type="monotone" dataKey="medium" stroke="#f59e0b" strokeWidth={2} />
            <Line type="monotone" dataKey="low" stroke="#10b981" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors">
            Assign Counselors
          </button>
          <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors">
            Send High-Risk Alerts
          </button>
          <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors">
            Generate Report
          </button>
        </div>
      </div>
    </div>
  );

  // Students Management Page
  const StudentsPage = () => (
    <div className="space-y-6">
      {/* Filters and Search */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex-1 min-w-64">
            <input
              type="text"
              placeholder="Search students..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <select
            value={filterDept}
            onChange={(e) => setFilterDept(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Departments</option>
            <option value="CSE">CSE</option>
            <option value="IT">IT</option>
            <option value="ECE">ECE</option>
            <option value="MECH">MECH</option>
          </select>
          <select
            value={filterRisk}
            onChange={(e) => setFilterRisk(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Risk Levels</option>
            <option value="high">High Risk</option>
            <option value="medium">Medium Risk</option>
            <option value="low">Low Risk</option>
          </select>
        </div>
      </div>

      {/* Students Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Students ({filteredStudents.length})</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Roll No</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Risk Level</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Counselor</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Activity</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredStudents.map(student => (
                <tr key={student.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-medium">{student.name.charAt(0)}</span>
                      </div>
                      <div className="ml-3">
                        <div className="text-sm font-medium text-gray-900">{student.name}</div>
                        <div className="text-sm text-gray-500">{student.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{student.roll}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{student.dept}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getRiskBadgeColor(student.riskLevel)}`}>
                      {student.riskLevel.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{student.counselor}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.lastActivity}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900 mr-3">View</button>
                    <button className="text-yellow-600 hover:text-yellow-900 mr-3">Assign</button>
                    <button className="text-red-600 hover:text-red-900">Alert</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  // Counselors Management Page
  const CounselorsPage = () => (
    <div className="space-y-6">
      {/* Counselors Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Counselors ({counselors.length})</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Students Assigned</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">High-Risk Students</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Performance</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Workload</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {counselors.map(counselor => (
                <tr key={counselor.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-medium">{counselor.name.charAt(0)}</span>
                      </div>
                      <div className="ml-3">
                        <div className="text-sm font-medium text-gray-900">{counselor.name}</div>
                        <div className="text-sm text-gray-500">{counselor.level}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{counselor.dept}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{counselor.assigned}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600 font-medium">{counselor.highRisk}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{(counselor.perfScore * 100).toFixed(0)}%</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`text-sm font-medium ${getWorkloadColor(counselor.workload)}`}>
                      {counselor.workload}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900 mr-3">View</button>
                    <button className="text-yellow-600 hover:text-yellow-900 mr-3">Reassign</button>
                    <button className="text-green-600 hover:text-green-900">Message</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  // Render current page content
  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'overview': return <OverviewPage />;
      case 'students': return <StudentsPage />;
      case 'counselors': return <CounselorsPage />;
      case 'mapping': return <div className="bg-white rounded-lg shadow p-6"><h3 className="text-lg font-semibold text-gray-900 mb-4">Counselor-Student Mapping</h3><p className="text-gray-600">Interactive mapping interface coming soon...</p></div>;
      case 'analytics': return <div className="bg-white rounded-lg shadow p-6"><h3 className="text-lg font-semibold text-gray-900 mb-4">Advanced Analytics</h3><p className="text-gray-600">Detailed analytics dashboard coming soon...</p></div>;
      case 'communication': return <div className="bg-white rounded-lg shadow p-6"><h3 className="text-lg font-semibold text-gray-900 mb-4">Communication Tools</h3><p className="text-gray-600">Email and messaging interface coming soon...</p></div>;
      case 'reports': return <div className="bg-white rounded-lg shadow p-6"><h3 className="text-lg font-semibold text-gray-900 mb-4">Reports & Downloads</h3><p className="text-gray-600">Report generation and export tools coming soon...</p></div>;
      case 'settings': return <div className="bg-white rounded-lg shadow p-6"><h3 className="text-lg font-semibold text-gray-900 mb-4">Admin Settings</h3><p className="text-gray-600">System configuration and user management coming soon...</p></div>;
      default: return <OverviewPage />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navigation */}
        <TopNavbar />
        
        {/* Page Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto">
            {/* Page Header */}
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-900 capitalize">{currentPage}</h1>
              <p className="text-gray-600 mt-2">
                {currentPage === 'overview' && 'Comprehensive view of student risk analytics and system performance'}
                {currentPage === 'students' && 'Manage student profiles, risk assessments, and counselor assignments'}
                {currentPage === 'counselors' && 'Monitor counselor performance, workload, and student assignments'}
                {currentPage === 'mapping' && 'Interactive counselor-student assignment and performance mapping'}
                {currentPage === 'analytics' && 'Advanced analytics and insights for risk management'}
                {currentPage === 'communication' && 'Send alerts, messages, and notifications to students and counselors'}
                {currentPage === 'reports' && 'Generate, schedule, and export comprehensive reports'}
                {currentPage === 'settings' && 'System configuration and administrative settings'}
              </p>
            </div>

            {/* Page Content */}
            {renderCurrentPage()}
          </div>
        </main>
      </div>
    </div>
  );
}
