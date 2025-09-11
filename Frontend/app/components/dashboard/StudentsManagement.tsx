'use client';

import { useState } from 'react';
import AnimatedElement from '../common/AnimatedElement';

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

interface StudentsManagementProps {
  mockStudents: Student[];
}

// Color scheme
const COLORS = {
  primary: '#6366f1',
  green: '#10b981',
  warning: '#f59e0b',
  danger: '#dc2626'
};

const StudentsManagement: React.FC<StudentsManagementProps> = ({ mockStudents }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRisk, setFilterRisk] = useState<string>('');
  const [filterDept, setFilterDept] = useState<string>('');

  const filteredStudents = mockStudents.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.roll.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRisk = !filterRisk || student.risk === filterRisk;
    const matchesDept = !filterDept || student.dept === filterDept;
    
    return matchesSearch && matchesRisk && matchesDept;
  });

  const departments = [...new Set(mockStudents.map(s => s.dept))];

  return (
    <div style={{ flex: 1, padding: '24px', background: '#f8fafc', overflowY: 'auto' }}>
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#1a202c', marginBottom: '8px' }}>
          Student Records & Analytics
        </h2>
        <p style={{ color: '#64748b' }}>
          Comprehensive view of all students with detailed analytics and management tools
        </p>
      </div>

      {/* Advanced Search and Filters */}
      <div style={{ 
        background: 'linear-gradient(135deg, #fff 0%, #f8fafc 100%)', 
        borderRadius: '16px', 
        padding: '28px', 
        marginBottom: '28px',
        boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
        border: '1px solid #e2e8f0'
      }}>
        <div style={{ marginBottom: '20px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1a202c', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            🔍 Advanced Search & Filters
          </h3>
          <p style={{ fontSize: '14px', color: '#64748b', margin: 0 }}>
            Use comprehensive filters to find specific students and analyze patterns
          </p>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', alignItems: 'end' }}>
          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>
              🔍 Search Students
            </label>
            <input
              type="text"
              placeholder="Search by name or roll number..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 16px',
                borderRadius: '10px',
                border: '2px solid #e2e8f0',
                fontSize: '14px',
                boxSizing: 'border-box',
                transition: 'all 0.3s ease',
                background: '#fff'
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = COLORS.primary;
                e.currentTarget.style.boxShadow = `0 0 0 3px ${COLORS.primary}20`;
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = '#e2e8f0';
                e.currentTarget.style.boxShadow = 'none';
              }}
            />
          </div>
          
          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>
              ⚠️ Risk Level
            </label>
            <select
              value={filterRisk}
              onChange={(e) => setFilterRisk(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 16px',
                borderRadius: '10px',
                border: '2px solid #e2e8f0',
                fontSize: '14px',
                background: '#fff',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = COLORS.primary;
                e.currentTarget.style.boxShadow = `0 0 0 3px ${COLORS.primary}20`;
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = '#e2e8f0';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <option value="">All Risk Levels</option>
              <option value="low">🟢 Low Risk</option>
              <option value="medium">🟡 Medium Risk</option>
              <option value="high">🔴 High Risk</option>
            </select>
          </div>
          
          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>
              📚 Department
            </label>
            <select
              value={filterDept}
              onChange={(e) => setFilterDept(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 16px',
                borderRadius: '10px',
                border: '2px solid #e2e8f0',
                fontSize: '14px',
                background: '#fff',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = COLORS.primary;
                e.currentTarget.style.boxShadow = `0 0 0 3px ${COLORS.primary}20`;
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = '#e2e8f0';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <option value="">All Departments</option>
              {departments.map(dept => (
                <option key={dept} value={dept}>
                  {dept === 'Science' ? '🧪' : dept === 'Commerce' ? '💼' : '🎨'} {dept}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <button
              style={{
                padding: '12px 20px',
                borderRadius: '10px',
                background: (filterRisk || filterDept || searchTerm) ? 
                  'linear-gradient(135deg, #dc2626, #b91c1c)' : 
                  'linear-gradient(135deg, #64748b, #475569)',
                color: '#fff',
                border: 'none',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                opacity: (filterRisk || filterDept || searchTerm) ? 1 : 0.6
              }}
              onClick={() => {
                setSearchTerm('');
                setFilterRisk('');
                setFilterDept('');
              }}
              disabled={!(filterRisk || filterDept || searchTerm)}
              onMouseEnter={(e) => {
                if (filterRisk || filterDept || searchTerm) {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.2)';
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              🗑️ Clear Filters
            </button>
          </div>
        </div>
        
        {/* Filter Summary */}
        <div style={{ marginTop: '20px', padding: '16px', background: 'rgba(99, 102, 241, 0.05)', borderRadius: '8px', border: '1px solid rgba(99, 102, 241, 0.1)' }}>
          <div style={{ fontSize: '14px', color: '#64748b' }}>
            <strong style={{ color: COLORS.primary }}>
              {filteredStudents.length}
            </strong> students found
            {(filterRisk || filterDept || searchTerm) && (
              <span> with applied filters: 
                {searchTerm && <span style={{ marginLeft: '8px', padding: '2px 8px', background: '#e0e7ff', color: COLORS.primary, borderRadius: '12px', fontSize: '12px' }}>Search: "{searchTerm}"</span>}
                {filterRisk && <span style={{ marginLeft: '8px', padding: '2px 8px', background: '#fef3c7', color: '#d97706', borderRadius: '12px', fontSize: '12px' }}>Risk: {filterRisk}</span>}
                {filterDept && <span style={{ marginLeft: '8px', padding: '2px 8px', background: '#dcfce7', color: '#16a34a', borderRadius: '12px', fontSize: '12px' }}>Dept: {filterDept}</span>}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Students Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
        {filteredStudents.map((student, index) => (
          <AnimatedElement key={student.id} animation="scaleIn" delay={index * 50}>
            <div style={{
              background: '#fff',
              borderRadius: '12px',
              padding: '24px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              border: '1px solid #e2e8f0',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)';
            }}>
              
              {/* Student Header with Profile Picture */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
                {/* Profile Picture */}
                <div style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '16px',
                  background: `url(${{
                    1: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
                    2: 'https://images.unsplash.com/photo-1494790108755-2616b612b1a1?w=150&h=150&fit=crop&crop=face',
                    3: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
                    4: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face',
                    5: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&h=150&fit=crop&crop=face',
                    6: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&h=150&fit=crop&crop=face'
                  }[student.id % 6 || 1]}) center/cover`,
                  border: `3px solid ${student.risk === 'low' ? COLORS.green : student.risk === 'medium' ? COLORS.warning : COLORS.danger}`,
                  flexShrink: 0
                }} />
                
                {/* Student Info */}
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                    <div>
                      <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1a202c', margin: '0 0 4px 0' }}>
                        {student.name}
                      </h3>
                      <p style={{ fontSize: '14px', color: '#64748b', margin: '0' }}>
                        {student.roll} • {student.class} • {student.dept}
                      </p>
                    </div>
                    <div style={{
                      padding: '4px 12px',
                      borderRadius: '20px',
                      fontSize: '12px',
                      fontWeight: '600',
                      textTransform: 'uppercase',
                      background: student.risk === 'low' ? 'rgba(16, 185, 129, 0.1)' : 
                                 student.risk === 'medium' ? 'rgba(245, 158, 11, 0.1)' : 
                                 'rgba(239, 68, 68, 0.1)',
                      color: student.risk === 'low' ? COLORS.green : 
                             student.risk === 'medium' ? COLORS.warning : 
                             COLORS.danger
                    }}>
                      {student.risk} Risk
                    </div>
                  </div>
                </div>
              </div>

              {/* Student Metrics */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '16px' }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '20px', fontWeight: '700', color: COLORS.primary, marginBottom: '4px' }}>
                    {student.grades.toFixed(1)}
                  </div>
                  <div style={{ fontSize: '12px', color: '#64748b' }}>Grade</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '20px', fontWeight: '700', color: COLORS.green, marginBottom: '4px' }}>
                    {student.attendance}%
                  </div>
                  <div style={{ fontSize: '12px', color: '#64748b' }}>Attendance</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '20px', fontWeight: '700', color: COLORS.warning, marginBottom: '4px' }}>
                    {student.counselingSessions}
                  </div>
                  <div style={{ fontSize: '12px', color: '#64748b' }}>Sessions</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
                <button
                  style={{
                    flex: 1,
                    padding: '10px 16px',
                    borderRadius: '8px',
                    background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
                    color: '#fff',
                    border: 'none',
                    fontSize: '13px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px'
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    alert(`Viewing analytics for ${student.name}`);
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-1px)';
                    e.currentTarget.style.boxShadow = '0 4px 15px rgba(59, 130, 246, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  📊 Analytics
                </button>
                
                <button
                  style={{
                    flex: 1,
                    padding: '10px 16px',
                    borderRadius: '8px',
                    background: 'linear-gradient(135deg, #10b981, #059669)',
                    color: '#fff',
                    border: 'none',
                    fontSize: '13px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px'
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    alert(`Editing profile for ${student.name}`);
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-1px)';
                    e.currentTarget.style.boxShadow = '0 4px 15px rgba(16, 185, 129, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  ✏️ Edit
                </button>
                
                <button
                  style={{
                    flex: 1,
                    padding: '10px 16px',
                    borderRadius: '8px',
                    background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                    color: '#fff',
                    border: 'none',
                    fontSize: '13px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px'
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    alert(`Scheduling session with ${student.name}`);
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-1px)';
                    e.currentTarget.style.boxShadow = '0 4px 15px rgba(245, 158, 11, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  💬 Session
                </button>
              </div>

              {/* Department Badge */}
              <div style={{
                background: 'linear-gradient(135deg, #f1f5f9, #e2e8f0)',
                padding: '8px 12px',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '600',
                color: '#475569',
                textAlign: 'center',
                border: '1px solid #e2e8f0'
              }}>
                📚 {student.dept} Department
              </div>
            </div>
          </AnimatedElement>
        ))}
      </div>

      {filteredStudents.length === 0 && (
        <div style={{
          background: '#fff',
          borderRadius: '12px',
          padding: '60px',
          textAlign: 'center',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          border: '1px solid #e2e8f0'
        }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>🔍</div>
          <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1a202c', marginBottom: '8px' }}>
            No Students Found
          </h3>
          <p style={{ color: '#64748b' }}>
            Try adjusting your search criteria or filters
          </p>
        </div>
      )}
    </div>
  );
};

export default StudentsManagement;
