const express = require('express');
const {
  getDashboardStats,
  getRiskDistribution,
  getProgramStats
} = require('../controllers/dashboardController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.use(protect);

router.get('/stats', getDashboardStats);
router.get('/risk-distribution', getRiskDistribution);
router.get('/program-stats', getProgramStats);

module.exports = router;