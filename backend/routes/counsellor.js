const express = require('express');
const { getDashboard, getAlerts } = require('../controllers/counsellorController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.use(protect);
router.use(authorize('counsellor'));

router.get('/dashboard', getDashboard);
router.get('/alerts', getAlerts);

module.exports = router;