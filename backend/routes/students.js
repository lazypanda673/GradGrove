/*const express = require('express');
const { getStudents, submitSurvey, getStudentProfile } = require('../controllers/studentController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.use(protect);

router.get('/', authorize('admin', 'counsellor'), getStudents);
router.post('/survey', authorize('student'), submitSurvey);
router.get('/profile', authorize('student'), getStudentProfile);

module.exports = router;*/

// backend/routes/student.js
const express = require('express');
const router = express.Router();
const db = require('../db');

router.post('/submit', async (req, res) => {
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

  try {
    await db.query(`
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

    res.status(200).json({ message: 'Student data saved successfully!' });
  } catch (err) {
    console.error('Error inserting data:', err);
    res.status(500).json({ error: 'Database error' });
  }
});

module.exports = router;