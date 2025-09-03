const StudentProfile = require('../models/StudentProfile');
const Alert = require('../models/Alert');
const asyncHandler = require('../utils/asyncHandler');

exports.getDashboard = asyncHandler(async (req, res, next) => {
  const assignedStudents = await StudentProfile.find({ counsellor: req.user.id })
    .populate('student', 'firstName lastName email rollNumber')
    .sort({ riskLevel: -1, updatedAt: -1 });

  const alerts = await Alert.find({ counsellor: req.user.id, status: 'New' })
    .populate('student', 'firstName lastName')
    .sort({ createdAt: -1 })
    .limit(10);

  const highRiskCount = await StudentProfile.countDocuments({
    counsellor: req.user.id,
    riskLevel: 'High'
  });

  res.status(200).json({
    success: true,
    data: {
      assignedStudents,
      alerts,
      statistics: {
        totalStudents: assignedStudents.length,
        highRiskCount,
        newAlerts: alerts.length
      }
    }
  });
});

exports.getAlerts = asyncHandler(async (req, res, next) => {
  const alerts = await Alert.find({ counsellor: req.user.id })
    .populate('student', 'firstName lastName email rollNumber')
    .sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    count: alerts.length,
    data: alerts
  });
});