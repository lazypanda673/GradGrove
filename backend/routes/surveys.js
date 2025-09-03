const express = require('express');
const {
  getSurveys,
  getSurveyStatistics,
  getSurvey,
  deleteSurvey
} = require('../controllers/surveyController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.use(protect);

router.get('/', authorize('admin', 'counsellor'), getSurveys);
router.get('/statistics', authorize('admin', 'counsellor'), getSurveyStatistics);
router.get('/:id', getSurvey);
router.delete('/:id', authorize('admin'), deleteSurvey);

module.exports = router;