/* const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const xss = require('xss-clean');
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');
const mongoSanitize = require('express-mongo-sanitize');
const connectDB = require('./config/database');
const errorHandler = require('./middleware/error');
require('dotenv').config();

// Route imports
const authRoutes = require('./routes/auth');
const studentRoutes = require('./routes/students');
const adminRoutes = require('./routes/admin');
const counsellorRoutes = require('./routes/counsellor');

// Connect to database
connectDB();

const app = express();

// Body parser middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Security middleware
app.use(mongoSanitize());
app.use(helmet());
app.use(xss());
app.use(hpp());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});
app.use(limiter);

// Enable CORS
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));

// Mount routers
app.use('/api/auth', authRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/counsellor', counsellorRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'GradGrove Backend is running',
    timestamp: new Date().toISOString()
  });
});

// Error handler middleware
app.use(errorHandler);

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'API endpoint not found'
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
*/

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Pool } = require('pg');

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

// PostgreSQL DB connection
const pool = new Pool({
  user: 'your_db_user',
  host: 'localhost',
  database: 'your_db_name',
  password: 'your_password',
  port: 5432,
});

// POST route to receive student form data
app.post('/api/student-form', async (req, res) => {
  try {
    const {
      attendance,
      gradeTrend,
      languageProficiency,
      languageMatch,
      schoolTransfers,
      maritalStatus,
      chronicIllness,
      caregiving,
      earlyMarriage,
      tuitionStatus,
      parentsMarital,
      migrantBackground,
      peerRelations,
      substanceAbuse,
      disciplinary,
      counselingAttendance,
      additionalInfo
    } = req.body;

    await pool.query(`
      INSERT INTO student_profiles (
        attendance, grade_trend, language_proficiency, language_match, school_transfers,
        marital_status, chronic_illness, caregiving, early_marriage, tuition_status,
        parents_marital, migrant_background, peer_relations, substance_abuse,
        disciplinary, counseling_attendance, additional_info
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17)
    `, [
      attendance,
      gradeTrend,
      languageProficiency,
      languageMatch,
      schoolTransfers,
      maritalStatus,
      chronicIllness,
      caregiving,
      earlyMarriage,
      tuitionStatus,
      parentsMarital,
      migrantBackground,
      peerRelations,
      substanceAbuse,
      disciplinary,
      counselingAttendance,
      additionalInfo
    ]);

    res.status(200).json({ message: 'Data saved successfully' });
  } catch (err) {
    console.error('Error saving form:', err);
    res.status(500).json({ error: 'Failed to save data' });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
