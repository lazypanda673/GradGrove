const express = require('express');
const {
  getPredictions,
  getPrediction,
  getStudentPredictions
} = require('../controllers/predictionController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.use(protect);

router.get('/', getPredictions);
router.get('/:id', getPrediction);
router.get('/student/:id', getStudentPredictions);

module.exports = router;