const SurveyResponse = require('../models/SurveyResponse');
const asyncHandler = require('../utils/asyncHandler');
const ErrorResponse = require('../utils/errorResponse');

// @desc    Get all survey responses
// @route   GET /api/surveys
// @access  Private (Admin, Counsellor)
exports.getSurveys = asyncHandler(async (req, res, next) => {
  const { page = 1, limit = 10, riskLevel, startDate, endDate } = req.query;
  
  const query = { isProcessed: true };
  if (riskLevel) query.predictedRiskLevel = riskLevel;

  // Date range filter
  if (startDate || endDate) {
    query.submittedAt = {};
    if (startDate) query.submittedAt.$gte = new Date(startDate);
    if (endDate) query.submittedAt.$lte = new Date(endDate);
  }

  const surveys = await SurveyResponse.find(query)
    .populate('student', 'firstName lastName email rollNumber')
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .sort({ submittedAt: -1 });

  const total = await SurveyResponse.countDocuments(query);

  res.status(200).json({
    success: true,
    count: surveys.length,
    total,
    data: surveys
  });
});

// @desc    Get survey statistics
// @route   GET /api/surveys/statistics
// @access  Private (Admin, Counsellor)
exports.getSurveyStatistics = asyncHandler(async (req, res, next) => {
  // Overall statistics
  const totalSurveys = await SurveyResponse.countDocuments();
  const processedSurveys = await SurveyResponse.countDocuments({ isProcessed: true });

  // Risk level distribution
  const riskDistribution = await SurveyResponse.aggregate([
    { $match: { isProcessed: true } },
    { $group: { _id: '$predictedRiskLevel', count: { $sum: 1 } } }
  ]);

  // Average metrics
  const averageMetrics = await SurveyResponse.aggregate([
    { $match: { isProcessed: true } },
    { $group: {
        _id: null,
        avgGPA: { $avg: '$gpa' },
        avgAttendance: { $avg: '$attendance' },
        avgStress: { $avg: '$stressLevel' },
        avgRiskScore: { $avg: '$predictedRiskScore' }
    }}
  ]);

  // Recent survey trend (last 7 days)
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  const recentTrend = await SurveyResponse.aggregate([
    { $match: { submittedAt: { $gte: sevenDaysAgo } } },
    { $group: {
        _id: { $dateToString: { format: "%Y-%m-%d", date: "$submittedAt" } },
        count: { $sum: 1 },
        avgRisk: { $avg: '$predictedRiskScore' }
    }},
    { $sort: { _id: 1 } }
  ]);

  res.status(200).json({
    success: true,
    data: {
      overview: {
        totalSurveys,
        processedSurveys,
        processingRate: totalSurveys > 0 ? (processedSurveys / totalSurveys) * 100 : 0
      },
      riskDistribution,
      averageMetrics: averageMetrics[0] || {},
      recentTrend
    }
  });
});

// @desc    Get survey by ID
// @route   GET /api/surveys/:id
// @access  Private
exports.getSurvey = asyncHandler(async (req, res, next) => {
  const survey = await SurveyResponse.findById(req.params.id)
    .populate('student', 'firstName lastName email rollNumber');

  if (!survey) {
    return next(new ErrorResponse('Survey not found', 404));
  }

  res.status(200).json({
    success: true,
    data: survey
  });
});

// @desc    Delete survey
// @route   DELETE /api/surveys/:id
// @access  Private (Admin)
exports.deleteSurvey = asyncHandler(async (req, res, next) => {
  const survey = await SurveyResponse.findByIdAndDelete(req.params.id);

  if (!survey) {
    return next(new ErrorResponse('Survey not found', 404));
  }

  res.status(200).json({
    success: true,
    data: {}
  });
});