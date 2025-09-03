const Student = require('../models/Student');
const Prediction = require('../models/Prediction');
const asyncHandler = require('../utils/asyncHandler');
const ErrorResponse = require('../utils/errorResponse');

// @desc    Get dashboard statistics
// @route   GET /api/dashboard/stats
// @access  Private
exports.getDashboardStats = asyncHandler(async (req, res, next) => {
  const totalStudents = await Student.countDocuments();
  const atRiskStudents = await Student.countDocuments({ status: 'AtRisk' });
  const totalPredictions = await Prediction.countDocuments();
  
  const recentPredictions = await Prediction.find()
    .populate('student', 'studentId personalInfo')
    .sort({ timestamp: -1 })
    .limit(5);

  const programStats = await Student.aggregate([
    { $group: { _id: '$academicInfo.program', count: { $sum: 1 } } }
  ]);

  const riskDistribution = await Prediction.aggregate([
    { $group: { _id: '$riskLevel', count: { $sum: 1 } } }
  ]);

  res.status(200).json({
    success: true,
    data: {
      totalStudents,
      atRiskStudents,
      totalPredictions,
      recentPredictions,
      programStats,
      riskDistribution
    }
  });
});

// @desc    Get risk distribution
// @route   GET /api/dashboard/risk-distribution
// @access  Private
exports.getRiskDistribution = asyncHandler(async (req, res, next) => {
  const riskDistribution = await Prediction.aggregate([
    { $group: { _id: '$riskLevel', count: { $sum: 1 } } }
  ]);

  res.status(200).json({
    success: true,
    data: riskDistribution
  });
});

// @desc    Get program-wise statistics
// @route   GET /api/dashboard/program-stats
// @access  Private
exports.getProgramStats = asyncHandler(async (req, res, next) => {
  const programStats = await Student.aggregate([
    { 
      $group: { 
        _id: '$academicInfo.program', 
        total: { $sum: 1 },
        averageRisk: { $avg: '$riskAssessment.score' }
      } 
    }
  ]);

  res.status(200).json({
    success: true,
    data: programStats
  });
});