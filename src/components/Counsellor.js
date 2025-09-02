


import { useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

const mockStudents = [
  { id: 1, name: 'Amit Sharma', roll: '1001', class: '10A', dept: 'Science', gender: 'Male', socio: 'Middle', risk: 'low', grades: 8.2 },
  { id: 2, name: 'Priya Singh', roll: '1002', class: '10B', dept: 'Commerce', gender: 'Female', socio: 'High', risk: 'medium', grades: 6.5 },
  { id: 3, name: 'Rahul Verma', roll: '1003', class: '10A', dept: 'Science', gender: 'Male', socio: 'Low', risk: 'high', grades: 5.2 },
  { id: 4, name: 'Sneha Patel', roll: '1004', class: '10C', dept: 'Arts', gender: 'Female', socio: 'Middle', risk: 'low', grades: 7.9 },
  { id: 5, name: 'Vikram Rao', roll: '1005', class: '10B', dept: 'Commerce', gender: 'Male', socio: 'High', risk: 'medium', grades: 7.0 },
];

const riskColors = {
  low: 'var(--color-success)',
  medium: 'var(--color-warning)',
  high: 'var(--color-warning)',
};

const dummyGraphs = [
  { title: 'Low Risk Students', value: mockStudents.filter(s => s.risk === 'low').length, unit: '', color: 'var(--color-success)' },
  { title: 'Medium Risk Students', value: mockStudents.filter(s => s.risk === 'medium').length, unit: '', color: 'var(--color-warning)' },
  { title: 'High Risk Students', value: mockStudents.filter(s => s.risk === 'high').length, unit: '', color: 'var(--color-danger)' },
  { title: 'Below Threshold Grades (<6.0)', value: mockStudents.filter(s => s.grades < 6.0).length, unit: '', color: 'var(--color-danger)' },
  { title: 'Above Threshold Grades (>=6.0)', value: mockStudents.filter(s => s.grades >= 6.0).length, unit: '', color: 'var(--color-success)' },
  { title: 'Total Students', value: mockStudents.length, unit: '', color: 'var(--color-primary)' },
];

const studentGraphs = {
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

function Counsellor() {
  const [search, setSearch] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [activeFilter, setActiveFilter] = useState('');
  const [filterClass, setFilterClass] = useState('');
  const [filterDept, setFilterDept] = useState('');
  const [filterGender, setFilterGender] = useState('');
  const [filterSocio, setFilterSocio] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(null);

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

  // Two-level filter dropdown logic
  const filterDropdown = showFilters && (
    <div style={{ position: 'absolute', left: 70, top: 54, zIndex: 1000, background: 'var(--color-primary)', color: '#fff', borderRadius: 10, boxShadow: '0 2px 16px rgba(0,0,0,0.18)', minWidth: 220, padding: '18px 18px 12px 18px', fontWeight: 500 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {['Class', 'Department', 'Gender', 'Socio-Economic'].map(cat => (
          <div key={cat} style={{ position: 'relative' }}>
            <span
              style={{ fontWeight: 600, cursor: 'pointer', background: activeFilter === cat ? 'var(--color-secondary)' : 'transparent', color: activeFilter === cat ? '#fff' : '#fff', borderRadius: 6, padding: '6px 14px', display: 'inline-block' }}
              onClick={() => setActiveFilter(activeFilter === cat ? '' : cat)}
              onMouseEnter={() => setActiveFilter(cat)}
            >{cat}</span>
            {activeFilter === cat && (
              <div style={{ position: 'absolute', left: '110%', top: 0, background: '#fff', color: 'var(--color-primary)', borderRadius: 8, boxShadow: '0 2px 12px rgba(0,0,0,0.10)', minWidth: 120, padding: '10px 0', zIndex: 1100 }}>
                {cat === 'Class' && classes.map(c => (
                  <div key={c} style={{ padding: '8px 18px', cursor: 'pointer', background: filterClass === c ? 'var(--color-secondary)' : 'transparent', color: filterClass === c ? '#fff' : 'var(--color-primary)' }} onClick={() => setFilterClass(filterClass === c ? '' : c)}>{c}</div>
                ))}
                {cat === 'Department' && depts.map(d => (
                  <div key={d} style={{ padding: '8px 18px', cursor: 'pointer', background: filterDept === d ? 'var(--color-secondary)' : 'transparent', color: filterDept === d ? '#fff' : 'var(--color-primary)' }} onClick={() => setFilterDept(filterDept === d ? '' : d)}>{d}</div>
                ))}
                {cat === 'Gender' && genders.map(g => (
                  <div key={g} style={{ padding: '8px 18px', cursor: 'pointer', background: filterGender === g ? 'var(--color-secondary)' : 'transparent', color: filterGender === g ? '#fff' : 'var(--color-primary)' }} onClick={() => setFilterGender(filterGender === g ? '' : g)}>{g}</div>
                ))}
                {cat === 'Socio-Economic' && socioGroups.map(sg => (
                  <div key={sg} style={{ padding: '8px 18px', cursor: 'pointer', background: filterSocio === sg ? 'var(--color-secondary)' : 'transparent', color: filterSocio === sg ? '#fff' : 'var(--color-primary)' }} onClick={() => setFilterSocio(filterSocio === sg ? '' : sg)}>{sg}</div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      <button onClick={handleReset} style={{ marginTop: 18, background: 'var(--color-danger)', color: '#fff', border: 'none', borderRadius: 6, padding: '8px 18px', fontWeight: 600, cursor: 'pointer', boxShadow: '0 1px 4px rgba(0,0,0,0.10)' }}>Reset Filters</button>
    </div>
  );

  // Graphs to show (overview or selected student)
  const graphs = selectedStudent ? studentGraphs[selectedStudent.id] : dummyGraphs;

  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-background)', fontFamily: 'Segoe UI, Arial, sans-serif' }}>
      <Navbar role="counsellor" />
      <div style={{ display: 'flex', maxWidth: 1400, margin: '0 auto', width: '100%' }}>
        {/* Sidebar absolutely flush left, fixed height */}
        <div style={{ width: 260, minWidth: 260, background: 'var(--color-primary)', color: 'var(--color-background)', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', padding: '32px 0 24px 0', boxShadow: '2px 0 12px rgba(0,0,0,0.08)', height: 'calc(100vh - 48px)', position: 'sticky', top: 48, left: 0, zIndex: 101 }}>
          <div style={{ display: 'flex', alignItems: 'center', width: '90%', marginBottom: 18 }}>
            <input
              type="text"
              placeholder="Search by name/roll..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{ padding: 10, borderRadius: 6, border: '1px solid #ccc', width: '60%' }}
            />
            <button
              style={{ marginLeft: 10, padding: '10px 16px', borderRadius: 6, background: 'var(--color-danger)', color: '#fff', border: 'none', fontWeight: 600, cursor: 'pointer' }}
              onClick={() => setShowFilters(!showFilters)}
            >
              Filters
            </button>
          </div>
          {showFilters && (
            <div style={{ position: 'absolute', left: 0, top: 70, zIndex: 1000, background: 'var(--color-primary)', color: '#fff', borderRadius: 10, boxShadow: '0 2px 16px rgba(0,0,0,0.18)', minWidth: 220, padding: '18px 18px 12px 18px', fontWeight: 500 }}>
              <div style={{ marginBottom: 10 }}>
                <span style={{ fontWeight: 600 }}>Class</span>
                <div style={{ display: 'flex', gap: 8, marginTop: 6 }}>
                  {classes.map(c => (
                    <span key={c} style={{ background: filterClass === c ? 'var(--color-secondary)' : '#fff', color: filterClass === c ? '#fff' : 'var(--color-primary)', borderRadius: 6, padding: '6px 14px', cursor: 'pointer', boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }} onClick={() => setFilterClass(c)}>{c}</span>
                  ))}
                </div>
              </div>
              <div style={{ marginBottom: 10 }}>
                <span style={{ fontWeight: 600 }}>Department</span>
                <div style={{ display: 'flex', gap: 8, marginTop: 6 }}>
                  {depts.map(d => (
                    <span key={d} style={{ background: filterDept === d ? 'var(--color-secondary)' : '#fff', color: filterDept === d ? '#fff' : 'var(--color-primary)', borderRadius: 6, padding: '6px 14px', cursor: 'pointer', boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }} onClick={() => setFilterDept(d)}>{d}</span>
                  ))}
                </div>
              </div>
              <div style={{ marginBottom: 10 }}>
                <span style={{ fontWeight: 600 }}>Gender</span>
                <div style={{ display: 'flex', gap: 8, marginTop: 6 }}>
                  {genders.map(g => (
                    <span key={g} style={{ background: filterGender === g ? 'var(--color-secondary)' : '#fff', color: filterGender === g ? '#fff' : 'var(--color-primary)', borderRadius: 6, padding: '6px 14px', cursor: 'pointer', boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }} onClick={() => setFilterGender(g)}>{g}</span>
                  ))}
                </div>
              </div>
              <div style={{ marginBottom: 10 }}>
                <span style={{ fontWeight: 600 }}>Socio-Economic</span>
                <div style={{ display: 'flex', gap: 8, marginTop: 6 }}>
                  {socioGroups.map(sg => (
                    <span key={sg} style={{ background: filterSocio === sg ? 'var(--color-secondary)' : '#fff', color: filterSocio === sg ? '#fff' : 'var(--color-primary)', borderRadius: 6, padding: '6px 14px', cursor: 'pointer', boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }} onClick={() => setFilterSocio(sg)}>{sg}</span>
                  ))}
                </div>
              </div>
              <button onClick={handleReset} style={{ marginTop: 8, background: 'var(--color-danger)', color: '#fff', border: 'none', borderRadius: 6, padding: '8px 18px', fontWeight: 600, cursor: 'pointer', boxShadow: '0 1px 4px rgba(0,0,0,0.10)' }}>Reset Filters</button>
            </div>
          )}
          <div style={{ width: '90%', background: 'var(--color-secondary)', borderRadius: 12, padding: '12px 0', minHeight: 400, marginTop: 8, boxShadow: '0 2px 12px rgba(0,0,0,0.10)' }}>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
              {filtered.length === 0 ? (
                <li style={{ color: '#fff', textAlign: 'center', padding: '24px 0' }}>No students found.</li>
              ) : filtered.map(s => (
                <li
                  key={s.id}
                  style={{ color: '#fff', padding: '12px 0', textAlign: 'center', fontWeight: selectedStudent && selectedStudent.id === s.id ? 700 : 500, cursor: 'pointer', background: selectedStudent && selectedStudent.id === s.id ? 'var(--color-accent-light)' : 'transparent', borderRadius: 8, margin: '2px 0', transition: 'background 0.2s' }}
                  onClick={() => setSelectedStudent(s)}
                >
                  {s.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
        {/* Main Graphs Area, with left margin for sidebar */}
        <div style={{ flex: 1, padding: '32px 24px', marginLeft: 0, display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gridTemplateRows: 'repeat(3, 1fr)', gap: 24, background: 'var(--color-background)' }}>
          {graphs.map((g, idx) => (
            <div key={g.title} style={{ background: '#fff', borderRadius: 14, boxShadow: idx === 1 ? '0 0 0 2px var(--color-primary)' : '0 2px 12px rgba(0,0,0,0.08)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 140, fontWeight: 600, fontSize: 22, color: g.color, border: idx === 1 ? '2px solid var(--color-primary)' : 'none', transition: 'box-shadow 0.2s' }}>
              <span style={{ fontSize: 18, color: 'var(--color-text)', marginBottom: 8 }}>{g.title}</span>
              <span style={{ fontSize: 32 }}>{g.value}{g.unit && <span style={{ fontSize: 18, color: '#555', marginLeft: 4 }}>{g.unit}</span>}</span>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Counsellor;
