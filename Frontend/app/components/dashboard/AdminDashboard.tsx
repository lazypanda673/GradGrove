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

  // Settings state
  const [lowRiskThreshold, setLowRiskThreshold] = useState('0.3');
  const [mediumRiskThreshold, setMediumRiskThreshold] = useState('0.6');
  const [highRiskThreshold, setHighRiskThreshold] = useState('0.8');
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(true);
  const [dailyReports, setDailyReports] = useState(false);
  const [sessionTimeout, setSessionTimeout] = useState('30 minutes');

  // File upload state
  const [uploadingFiles, setUploadingFiles] = useState<{[key: string]: boolean}>({});
  const [uploadedFiles, setUploadedFiles] = useState<{[key: string]: string}>({});

  const students = useMemo(() => mockStudents, []);
  const counselors = useMemo(() => mockCounselors, []);

  // File upload handlers
  const handleFileUpload = (fileType: string, event?: React.ChangeEvent<HTMLInputElement>) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = fileType === 'general' ? '.csv,.xlsx,.json' : '.xlsx';
    
    input.onchange = (e: Event) => {
      const target = e.target as HTMLInputElement;
      const file = target.files?.[0];
      if (file) {
        setUploadingFiles(prev => ({ ...prev, [fileType]: true }));
        
        // Simulate file upload process
        setTimeout(() => {
          setUploadingFiles(prev => ({ ...prev, [fileType]: false }));
          setUploadedFiles(prev => ({ ...prev, [fileType]: file.name }));
          alert(`Successfully uploaded ${file.name} for ${fileType} data!`);
        }, 2000);
      }
    };
    
    input.click();
  };

  // Import data handlers (for server-side data import)
  const handleDataImport = (dataType: string) => {
    setUploadingFiles(prev => ({ ...prev, [dataType]: true }));
    
    // Simulate server data import process
    setTimeout(() => {
      setUploadingFiles(prev => ({ ...prev, [dataType]: false }));
      const messages = {
        students: 'Student data has been successfully imported from the system database. 1,247 student records processed.',
        counselors: 'Counselor data has been successfully imported from the system database. 15 counselor profiles processed.',
        historical: 'Historical assessment and intervention data has been successfully imported from the system database. 892 records processed.'
      };
      alert(`Import Complete!\n\n${messages[dataType as keyof typeof messages]}\n\nNote: This is a demo. In the future, this will connect to the actual system database to import live data.`);
    }, 3000);
  };

  const handleDragAndDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      setUploadingFiles(prev => ({ ...prev, general: true }));
      
      // Simulate file upload process
      setTimeout(() => {
        setUploadingFiles(prev => ({ ...prev, general: false }));
        setUploadedFiles(prev => ({ ...prev, general: file.name }));
        alert(`Successfully uploaded ${file.name}!`);
      }, 2000);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

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
              suppressHydrationWarning
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
              suppressHydrationWarning
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
      { icon: '📥', label: 'Data Management', key: 'import' },
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
                suppressHydrationWarning
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
          <button suppressHydrationWarning className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors">
            Assign Counselors
          </button>
          <button suppressHydrationWarning className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors">
            Send High-Risk Alerts
          </button>
          <button suppressHydrationWarning className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors">
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

  // Mapping Page
  const MappingPage = () => (
    <div className="space-y-6">
      {/* Mapping Controls */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Counselor-Student Assignment</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Unassigned Students */}
          <div className="border rounded-lg p-4">
            <h4 className="font-medium text-gray-900 mb-3">Unassigned Students (12)</h4>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {mockStudents.slice(0, 3).map(student => (
                <div key={student.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <div>
                    <p className="font-medium text-sm">{student.name}</p>
                    <p className="text-xs text-gray-500">{student.roll} • {student.dept}</p>
                  </div>
                  <button className="px-3 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600">
                    Assign
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Counselor Workload */}
          <div className="border rounded-lg p-4">
            <h4 className="font-medium text-gray-900 mb-3">Counselor Workload</h4>
            <div className="space-y-3">
              {mockCounselors.map(counselor => (
                <div key={counselor.id} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-sm">{counselor.name}</p>
                    <p className="text-xs text-gray-500">{counselor.dept}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{counselor.assigned} students</p>
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${
                          counselor.workload === 'Normal' ? 'bg-green-500' :
                          counselor.workload === 'High' ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${Math.min((counselor.assigned / 50) * 100, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Auto-Assignment */}
        <div className="mt-4 p-4 bg-blue-50 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-blue-900">Smart Auto-Assignment</h4>
              <p className="text-sm text-blue-700">Automatically assign students based on department, risk level, and counselor workload</p>
            </div>
            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
              Run Auto-Assignment
            </button>
          </div>
        </div>
      </div>

      {/* Assignment Matrix */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Assignment Matrix</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Counselor</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Department</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total Assigned</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">High Risk</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Performance</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {mockCounselors.map(counselor => (
                <tr key={counselor.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {counselor.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {counselor.dept}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {counselor.assigned}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600">
                    {counselor.highRisk}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {(counselor.perfScore * 100).toFixed(0)}%
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      counselor.workload === 'Normal' ? 'bg-green-100 text-green-800' :
                      counselor.workload === 'High' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {counselor.workload}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  // Analytics Page
  const AnalyticsPage = () => (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">87%</div>
            <div className="text-sm text-gray-600">Prediction Accuracy</div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600">34</div>
            <div className="text-sm text-gray-600">Early Interventions</div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-600">12%</div>
            <div className="text-sm text-gray-600">Risk Reduction</div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600">92%</div>
            <div className="text-sm text-gray-600">Student Satisfaction</div>
          </div>
        </div>
      </div>

      {/* Advanced Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Risk Trend Analysis */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Risk Trend Analysis</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={riskTrendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="high" stackId="1" stroke="#ef4444" fill="#ef4444" />
              <Area type="monotone" dataKey="medium" stackId="1" stroke="#f59e0b" fill="#f59e0b" />
              <Area type="monotone" dataKey="low" stackId="1" stroke="#10b981" fill="#10b981" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Department Performance */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Department Risk Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={deptRiskData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="dept" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="low" fill="#10b981" name="Low Risk" />
              <Bar dataKey="medium" fill="#f59e0b" name="Medium Risk" />
              <Bar dataKey="high" fill="#ef4444" name="High Risk" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Predictive Analytics */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Predictive Analytics Dashboard</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border-l-4 border-blue-500 pl-4">
            <h4 className="font-medium text-gray-900">Risk Prediction Model</h4>
            <p className="text-sm text-gray-600 mt-1">Machine learning model with 87% accuracy in predicting student dropout risk</p>
            <div className="mt-2">
              <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">Active</span>
            </div>
          </div>
          <div className="border-l-4 border-green-500 pl-4">
            <h4 className="font-medium text-gray-900">Intervention Effectiveness</h4>
            <p className="text-sm text-gray-600 mt-1">Tracking success rates of different intervention strategies</p>
            <div className="mt-2">
              <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">92% Success Rate</span>
            </div>
          </div>
          <div className="border-l-4 border-orange-500 pl-4">
            <h4 className="font-medium text-gray-900">Early Warning System</h4>
            <p className="text-sm text-gray-600 mt-1">Automated alerts for students showing risk indicators</p>
            <div className="mt-2">
              <span className="px-2 py-1 bg-orange-100 text-orange-800 text-xs rounded">12 Active Alerts</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Communication Page
  const CommunicationPage = () => (
    <div className="space-y-6">
      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <button className="bg-blue-500 text-white p-4 rounded-lg hover:bg-blue-600 transition-colors">
          <div className="text-center">
            <div className="text-2xl mb-2">📧</div>
            <div className="font-medium">Send Email</div>
          </div>
        </button>
        <button className="bg-green-500 text-white p-4 rounded-lg hover:bg-green-600 transition-colors">
          <div className="text-center">
            <div className="text-2xl mb-2">📱</div>
            <div className="font-medium">SMS Alert</div>
          </div>
        </button>
        <button className="bg-purple-500 text-white p-4 rounded-lg hover:bg-purple-600 transition-colors">
          <div className="text-center">
            <div className="text-2xl mb-2">🔔</div>
            <div className="font-medium">Push Notification</div>
          </div>
        </button>
        <button className="bg-orange-500 text-white p-4 rounded-lg hover:bg-orange-600 transition-colors">
          <div className="text-center">
            <div className="text-2xl mb-2">📢</div>
            <div className="font-medium">Broadcast</div>
          </div>
        </button>
      </div>

      {/* Message Composer */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Compose Message</h3>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Recipients</label>
              <select className="w-full border border-gray-300 rounded-lg px-3 py-2">
                <option>All Students</option>
                <option>High Risk Students</option>
                <option>All Counselors</option>
                <option>Specific Department</option>
                <option>Custom Group</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Message Type</label>
              <select className="w-full border border-gray-300 rounded-lg px-3 py-2">
                <option>General Notification</option>
                <option>Risk Alert</option>
                <option>Appointment Reminder</option>
                <option>System Update</option>
                <option>Emergency Alert</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
            <input type="text" placeholder="Enter message subject" className="w-full border border-gray-300 rounded-lg px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
            <textarea rows={6} placeholder="Type your message here..." className="w-full border border-gray-300 rounded-lg px-3 py-2"></textarea>
          </div>
          <div className="flex items-center space-x-4">
            <button className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">Send Now</button>
            <button className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600">Schedule Later</button>
            <button className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">Save Draft</button>
          </div>
        </div>
      </div>

      {/* Recent Messages */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Messages</h3>
        <div className="space-y-4">
          {[
            { id: 1, subject: 'High Risk Alert - Immediate Attention Required', recipients: 'All Counselors', type: 'Risk Alert', sent: '2025-09-20 10:30 AM', status: 'Delivered' },
            { id: 2, subject: 'Monthly Progress Review Meeting', recipients: '15 Students', type: 'Appointment', sent: '2025-09-19 02:15 PM', status: 'Delivered' },
            { id: 3, subject: 'System Maintenance Notification', recipients: 'All Users', type: 'System Update', sent: '2025-09-18 09:00 AM', status: 'Delivered' }
          ].map(message => (
            <div key={message.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-900">{message.subject}</h4>
                  <p className="text-sm text-gray-600">{message.recipients} • {message.sent}</p>
                </div>
                <div className="text-right">
                  <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">{message.status}</span>
                  <p className="text-xs text-gray-500 mt-1">{message.type}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Reports Page
  const ReportsPage = () => (
    <div className="space-y-6">
      {/* Report Generation */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Generate New Report</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer">
            <div className="text-center">
              <div className="text-3xl mb-3">📊</div>
              <h4 className="font-medium text-gray-900 mb-2">Student Risk Summary</h4>
              <p className="text-sm text-gray-600 mb-4">Comprehensive overview of all student risk assessments</p>
              <button className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">Generate</button>
            </div>
          </div>
          <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer">
            <div className="text-center">
              <div className="text-3xl mb-3">👥</div>
              <h4 className="font-medium text-gray-900 mb-2">Counselor Performance</h4>
              <p className="text-sm text-gray-600 mb-4">Detailed analysis of counselor effectiveness and workload</p>
              <button className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600">Generate</button>
            </div>
          </div>
          <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer">
            <div className="text-center">
              <div className="text-3xl mb-3">📈</div>
              <h4 className="font-medium text-gray-900 mb-2">Intervention Outcomes</h4>
              <p className="text-sm text-gray-600 mb-4">Success rates and effectiveness of intervention programs</p>
              <button className="w-full bg-purple-500 text-white py-2 rounded-lg hover:bg-purple-600">Generate</button>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Report Builder */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Custom Report Builder</h3>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Report Type</label>
              <select className="w-full border border-gray-300 rounded-lg px-3 py-2">
                <option>Student Analytics</option>
                <option>Counselor Performance</option>
                <option>Risk Assessment</option>
                <option>Intervention Tracking</option>
                <option>Departmental Overview</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Time Period</label>
              <select className="w-full border border-gray-300 rounded-lg px-3 py-2">
                <option>Last 30 Days</option>
                <option>Last 3 Months</option>
                <option>Last 6 Months</option>
                <option>Last Year</option>
                <option>Custom Range</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Department Filter</label>
              <select className="w-full border border-gray-300 rounded-lg px-3 py-2">
                <option>All Departments</option>
                <option>Computer Science (CSE)</option>
                <option>Information Technology (IT)</option>
                <option>Electronics (ECE)</option>
                <option>Mechanical (MECH)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Format</label>
              <select className="w-full border border-gray-300 rounded-lg px-3 py-2">
                <option>PDF Report</option>
                <option>Excel Spreadsheet</option>
                <option>CSV Data</option>
                <option>PowerPoint Presentation</option>
              </select>
            </div>
          </div>
          <div className="flex space-x-4">
            <button className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">Generate Report</button>
            <button className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">Schedule Recurring</button>
          </div>
        </div>
      </div>

      {/* Recent Reports */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Reports</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Report Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Generated</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Size</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {[
                { name: 'September Risk Assessment Report', type: 'Student Analytics', date: '2025-09-20', size: '2.4 MB' },
                { name: 'Q3 Counselor Performance Review', type: 'Performance Report', date: '2025-09-18', size: '1.8 MB' },
                { name: 'Intervention Success Analysis', type: 'Outcome Report', date: '2025-09-15', size: '3.1 MB' }
              ].map((report, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{report.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{report.type}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{report.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{report.size}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button className="text-blue-600 hover:text-blue-900 mr-3">Download</button>
                    <button className="text-red-600 hover:text-red-900">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  // Data Management Page (formerly Import Data Page)
  const ImportDataPage = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Side - General Data Import */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">General Data Import</h3>
            <p className="text-sm text-gray-600 mb-6">Import general system data including student records, counselor profiles, and historical information</p>
            
            {/* Import Options */}
            <div className="space-y-4 mb-6">
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center space-x-3">
                  <div className="text-2xl">📊</div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">Student Data</h4>
                    <p className="text-sm text-gray-600">Import student records, grades, and personal information</p>
                  </div>
                  <button 
                    className={`text-white px-4 py-2 rounded-lg text-sm transition-colors ${
                      uploadingFiles.students 
                        ? 'bg-gray-400 cursor-not-allowed' 
                        : 'bg-blue-500 hover:bg-blue-600'
                    }`}
                    onClick={() => handleDataImport('students')}
                    disabled={uploadingFiles.students}
                  >
                    {uploadingFiles.students ? 'Importing...' : 'Import'}
                  </button>
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center space-x-3">
                  <div className="text-2xl">👥</div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">Counselor Data</h4>
                    <p className="text-sm text-gray-600">Import counselor profiles and assignment information</p>
                  </div>
                  <button 
                    className={`text-white px-4 py-2 rounded-lg text-sm transition-colors ${
                      uploadingFiles.counselors 
                        ? 'bg-gray-400 cursor-not-allowed' 
                        : 'bg-green-500 hover:bg-green-600'
                    }`}
                    onClick={() => handleDataImport('counselors')}
                    disabled={uploadingFiles.counselors}
                  >
                    {uploadingFiles.counselors ? 'Importing...' : 'Import'}
                  </button>
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center space-x-3">
                  <div className="text-2xl">📈</div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">Historical Data</h4>
                    <p className="text-sm text-gray-600">Import past assessment and intervention records</p>
                  </div>
                  <button 
                    className={`text-white px-4 py-2 rounded-lg text-sm transition-colors ${
                      uploadingFiles.historical 
                        ? 'bg-gray-400 cursor-not-allowed' 
                        : 'bg-purple-500 hover:bg-purple-600'
                    }`}
                    onClick={() => handleDataImport('historical')}
                    disabled={uploadingFiles.historical}
                  >
                    {uploadingFiles.historical ? 'Importing...' : 'Import'}
                  </button>
                </div>
              </div>
            </div>

            {/* File Upload Interface */}
            <div 
              className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors"
              onDrop={handleDragAndDrop}
              onDragOver={handleDragOver}
              onDragEnter={(e) => e.preventDefault()}
            >
              <div className="text-4xl mb-4">📁</div>
              <h4 className="text-lg font-medium text-gray-900 mb-2">
                {uploadingFiles.general ? 'Uploading...' : 'Drag and drop your file here'}
              </h4>
              <p className="text-gray-600 mb-4">Supported formats: CSV, Excel (.xlsx), JSON</p>
              <p className="text-sm text-gray-500 mb-4">Maximum file size: 50MB</p>
              {uploadedFiles.general && (
                <p className="text-sm text-green-600 mb-4">✅ Uploaded: {uploadedFiles.general}</p>
              )}
              <button 
                className={`px-6 py-2 rounded-lg transition-colors ${
                  uploadingFiles.general 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-blue-500 hover:bg-blue-600'
                } text-white`}
                onClick={() => handleFileUpload('general')}
                disabled={uploadingFiles.general}
              >
                {uploadingFiles.general ? 'Uploading...' : 'Choose File'}
              </button>
            </div>
          </div>
        </div>

        {/* Right Side - Specific Student Data Uploads */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Specialized Student Data Upload</h3>
            <p className="text-sm text-gray-600 mb-6">Upload specific student data files in Excel format for detailed analysis</p>
            
            {/* Test Score Data Section */}
            <div className="mb-6">
              <div className="border border-blue-200 rounded-lg p-4 bg-blue-50">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                      <span className="text-white text-lg">📝</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-blue-900">Test Score Data</h4>
                      <p className="text-sm text-blue-700">Upload student exam and assessment scores</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-xs text-blue-600">Required format: Excel (.xlsx) with columns: Student_ID, Test_Name, Subject, Score, Max_Score, Date</p>
                  {uploadedFiles.testScores && (
                    <p className="text-xs text-green-600">✅ Uploaded: {uploadedFiles.testScores}</p>
                  )}
                  <button 
                    className={`w-full py-2 px-4 rounded-lg transition-colors text-white ${
                      uploadingFiles.testScores 
                        ? 'bg-gray-400 cursor-not-allowed' 
                        : 'bg-blue-600 hover:bg-blue-700'
                    }`}
                    onClick={() => handleFileUpload('testScores')}
                    disabled={uploadingFiles.testScores}
                  >
                    {uploadingFiles.testScores ? 'Uploading...' : 'Upload Test Scores (.xlsx)'}
                  </button>
                </div>
              </div>
            </div>

            {/* Financial Data Section */}
            <div className="mb-6">
              <div className="border border-green-200 rounded-lg p-4 bg-green-50">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                      <span className="text-white text-lg">�</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-green-900">Financial Data</h4>
                      <p className="text-sm text-green-700">Upload student fee and financial information</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-xs text-green-600">Required format: Excel (.xlsx) with columns: Student_ID, Fee_Type, Amount, Due_Date, Payment_Status, Semester</p>
                  {uploadedFiles.financial && (
                    <p className="text-xs text-green-600">✅ Uploaded: {uploadedFiles.financial}</p>
                  )}
                  <button 
                    className={`w-full py-2 px-4 rounded-lg transition-colors text-white ${
                      uploadingFiles.financial 
                        ? 'bg-gray-400 cursor-not-allowed' 
                        : 'bg-green-600 hover:bg-green-700'
                    }`}
                    onClick={() => handleFileUpload('financial')}
                    disabled={uploadingFiles.financial}
                  >
                    {uploadingFiles.financial ? 'Uploading...' : 'Upload Financial Data (.xlsx)'}
                  </button>
                </div>
              </div>
            </div>

            {/* Attendance Data Section */}
            <div className="mb-6">
              <div className="border border-orange-200 rounded-lg p-4 bg-orange-50">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
                      <span className="text-white text-lg">📅</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-orange-900">Attendance Data</h4>
                      <p className="text-sm text-orange-700">Upload student attendance records</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-xs text-orange-600">Required format: Excel (.xlsx) with columns: Student_ID, Subject, Date, Status, Class_Hours, Semester</p>
                  {uploadedFiles.attendance && (
                    <p className="text-xs text-orange-600">✅ Uploaded: {uploadedFiles.attendance}</p>
                  )}
                  <button 
                    className={`w-full py-2 px-4 rounded-lg transition-colors text-white ${
                      uploadingFiles.attendance 
                        ? 'bg-gray-400 cursor-not-allowed' 
                        : 'bg-orange-600 hover:bg-orange-700'
                    }`}
                    onClick={() => handleFileUpload('attendance')}
                    disabled={uploadingFiles.attendance}
                  >
                    {uploadingFiles.attendance ? 'Uploading...' : 'Upload Attendance Data (.xlsx)'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Uploads Status */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Upload Status</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-medium text-green-900">Test Scores</h4>
                <p className="text-sm text-green-700">September 2025</p>
              </div>
              <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">Success</span>
            </div>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-medium text-blue-900">Financial Data</h4>
                <p className="text-sm text-blue-700">Q3 2025</p>
              </div>
              <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">Processing</span>
            </div>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-medium text-green-900">Attendance</h4>
                <p className="text-sm text-green-700">August 2025</p>
              </div>
              <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">Success</span>
            </div>
          </div>
        </div>
      </div>

      {/* Data Configuration and Mapping */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Data Configuration</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Data Type</label>
            <select className="w-full border border-gray-300 rounded-lg px-3 py-2">
              <option>Test Score Data</option>
              <option>Financial Data</option>
              <option>Attendance Data</option>
              <option>Student Records</option>
              <option>Counselor Profiles</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Validation Rules</label>
            <div className="space-y-2">
              <div className="flex items-center">
                <input type="checkbox" className="mr-2" />
                <label className="text-sm text-gray-700">Validate data before import</label>
              </div>
              <div className="flex items-center">
                <input type="checkbox" className="mr-2" />
                <label className="text-sm text-gray-700">Update existing records</label>
              </div>
              <div className="flex items-center">
                <input type="checkbox" className="mr-2" />
                <label className="text-sm text-gray-700">Send notification on completion</label>
              </div>
            </div>
          </div>
        </div>

        {/* Column Mapping Section */}
        <div className="mt-6">
          <h4 className="font-medium text-gray-900 mb-4">Column Mapping</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h5 className="font-medium text-gray-700 mb-3">File Columns</h5>
              <div className="space-y-2">
                {['student_id', 'full_name', 'email_address', 'department_code', 'year_level'].map(col => (
                  <div key={col} className="p-2 bg-gray-50 rounded text-sm font-mono">{col}</div>
                ))}
              </div>
            </div>
            <div>
              <h5 className="font-medium text-gray-700 mb-3">System Fields</h5>
              <div className="space-y-2">
                {['Student ID', 'Name', 'Email', 'Department', 'Year'].map(field => (
                  <select key={field} className="w-full border border-gray-300 rounded px-2 py-1 text-sm">
                    <option>Map to {field}</option>
                    <option>student_id</option>
                    <option>full_name</option>
                    <option>email_address</option>
                    <option>department_code</option>
                    <option>year_level</option>
                  </select>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex space-x-4">
          <button className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">Preview Import</button>
          <button className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">Start Import</button>
        </div>
      </div>

      {/* Import History */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Import History</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">File Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Records</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {[
                { file: 'test_scores_sept_2025.xlsx', type: 'Test Score Data', records: 1247, date: '2025-09-20', status: 'Success' },
                { file: 'financial_data_q3.xlsx', type: 'Financial Data', records: 892, date: '2025-09-18', status: 'Success' },
                { file: 'attendance_aug_2025.xlsx', type: 'Attendance Data', records: 1158, date: '2025-09-15', status: 'Success' },
                { file: 'students_fall_2025.csv', type: 'Student Data', records: 1247, date: '2025-09-12', status: 'Success' },
                { file: 'counselor_assignments.xlsx', type: 'Counselor Data', records: 15, date: '2025-09-10', status: 'Partial' }
              ].map((import_, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{import_.file}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{import_.type}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{import_.records}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{import_.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      import_.status === 'Success' ? 'bg-green-100 text-green-800' :
                      import_.status === 'Partial' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {import_.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  // Settings Page
  const SettingsPage = () => (
    <div className="space-y-6">
      {/* System Settings */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">System Configuration</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Risk Threshold Settings</label>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Low Risk Threshold</span>
                <input 
                  type="number" 
                  value={lowRiskThreshold} 
                  onChange={(e) => setLowRiskThreshold(e.target.value)}
                  className="w-20 border border-gray-300 rounded px-2 py-1 text-sm" 
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Medium Risk Threshold</span>
                <input 
                  type="number" 
                  value={mediumRiskThreshold} 
                  onChange={(e) => setMediumRiskThreshold(e.target.value)}
                  className="w-20 border border-gray-300 rounded px-2 py-1 text-sm" 
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">High Risk Threshold</span>
                <input 
                  type="number" 
                  value={highRiskThreshold} 
                  onChange={(e) => setHighRiskThreshold(e.target.value)}
                  className="w-20 border border-gray-300 rounded px-2 py-1 text-sm" 
                />
              </div>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Notification Settings</label>
            <div className="space-y-3">
              <div className="flex items-center">
                <input 
                  type="checkbox" 
                  checked={emailNotifications} 
                  onChange={(e) => setEmailNotifications(e.target.checked)}
                  className="mr-2" 
                />
                <span className="text-sm text-gray-700">Email notifications for high-risk students</span>
              </div>
              <div className="flex items-center">
                <input 
                  type="checkbox" 
                  checked={smsAlerts} 
                  onChange={(e) => setSmsAlerts(e.target.checked)}
                  className="mr-2" 
                />
                <span className="text-sm text-gray-700">SMS alerts for critical cases</span>
              </div>
              <div className="flex items-center">
                <input 
                  type="checkbox" 
                  checked={dailyReports} 
                  onChange={(e) => setDailyReports(e.target.checked)}
                  className="mr-2" 
                />
                <span className="text-sm text-gray-700">Daily summary reports</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* User Management */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">User Management</h3>
        <div className="flex justify-between items-center mb-4">
          <div className="flex space-x-4">
            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">Add User</button>
            <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">Bulk Import</button>
          </div>
          <div className="flex space-x-2">
            <button className="px-3 py-1 text-sm bg-gray-200 text-gray-700 rounded">All</button>
            <button className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded">Admins</button>
            <button className="px-3 py-1 text-sm bg-green-100 text-green-700 rounded">Counselors</button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Last Active</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {[
                { name: 'Admin User', email: 'admin@college.edu', role: 'Administrator', lastActive: '2025-09-20', status: 'Active' },
                { name: 'Dr. Rao', email: 'rao@college.edu', role: 'Counselor', lastActive: '2025-09-20', status: 'Active' },
                { name: 'Ms. Kapoor', email: 'kapoor@college.edu', role: 'Counselor', lastActive: '2025-09-19', status: 'Active' }
              ].map((user, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.role}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.lastActive}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">{user.status}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button className="text-blue-600 hover:text-blue-900 mr-3">Edit</button>
                    <button className="text-red-600 hover:text-red-900">Deactivate</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Security Settings */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Security & Privacy</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div>
              <h4 className="font-medium text-gray-900">Two-Factor Authentication</h4>
              <p className="text-sm text-gray-600">Add an extra layer of security to user accounts</p>
            </div>
            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">Enable</button>
          </div>
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div>
              <h4 className="font-medium text-gray-900">Session Timeout</h4>
              <p className="text-sm text-gray-600">Automatically log out inactive users</p>
            </div>
            <select 
              value={sessionTimeout}
              onChange={(e) => setSessionTimeout(e.target.value)}
              className="border border-gray-300 rounded px-3 py-2"
            >
              <option>30 minutes</option>
              <option>1 hour</option>
              <option>2 hours</option>
              <option>4 hours</option>
            </select>
          </div>
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div>
              <h4 className="font-medium text-gray-900">Data Encryption</h4>
              <p className="text-sm text-gray-600">Encrypt sensitive student and counselor data</p>
            </div>
            <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">Enabled</span>
          </div>
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
      case 'mapping': return <MappingPage />;
      case 'analytics': return <AnalyticsPage />;
      case 'communication': return <CommunicationPage />;
      case 'reports': return <ReportsPage />;
      case 'import': return <ImportDataPage />;
      case 'settings': return <SettingsPage />;
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
                {currentPage === 'import' && 'Comprehensive data management and specialized student data uploads'}
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
