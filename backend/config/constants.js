module.exports = {
  ROLES: {
    ADMIN: 'admin',
    COUNSELOR: 'counselor',
    FACULTY: 'faculty',
    STUDENT: 'student'
  },

  RISK_LEVELS: {
    LOW: 'Low',
    MEDIUM: 'Medium',
    HIGH: 'High'
  },

  STUDENT_STATUS: {
    ACTIVE: 'Active',
    AT_RISK: 'AtRisk',
    INACTIVE: 'Inactive',
    GRADUATED: 'Graduated',
    DROPPED: 'Dropped'
  },

  ACADEMIC_PROGRAMS: [
    'Computer Science',
    'Electrical Engineering',
    'Mechanical Engineering',
    'Civil Engineering',
    'Business Administration',
    'Mathematics',
    'Physics',
    'Chemistry',
    'Biology',
    'Psychology'
  ],

  DEPARTMENTS: [
    'Computer Science',
    'Engineering',
    'Sciences',
    'Business',
    'Arts',
    'Mathematics'
  ],

  PREDICTION_THRESHOLDS: {
    LOW: 0.3,
    MEDIUM: 0.6,
    HIGH: 0.8
  },

  PAGINATION: {
    DEFAULT_LIMIT: 10,
    MAX_LIMIT: 100
  }
};