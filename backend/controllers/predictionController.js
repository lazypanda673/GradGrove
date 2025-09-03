const Prediction = require('../models/Prediction');
const Student = require('../models/Student');
const asyncHandler = require('../utils/asyncHandler');
const ErrorResponse = require('../utils/errorResponse');

// @desc    Get all predictions
// @route   GET /api/predictions
// @access  Private
exports.getPredictions = asyncHandler(async (req, res, next) => {
  const { page = 1, limit = 10, riskLevel } = req.query;
  
  const query = {};
  if (riskLevel) query.riskLevel = riskLevel;

  const predictions = await Prediction.find(query)
    .populate('student', 'studentId personalInfo academicInfo')
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .sort({ timestamp: -1 });

  const total = await Prediction.countDocuments(query);

  res.status(200).json({
    success: true,
    count: predictions.length,
    total,
    data: predictions
  });
});

// @desc    Get predictions for a student
// @route   GET /api/students/:id/predictions
// @access  Private
exports.getStudentPredictions = asyncHandler(async (req, res, next) => {
  const predictions = await Prediction.find({ student: req.params.id })
    .sort({ timestamp: -1 });

  res.status(200).json({
    success: true,
    count: predictions.length,
    data: predictions
  });
});

// @desc    Get prediction by ID
// @route   GET /api/predictions/:id
// @access  Private
exports.getPrediction = asyncHandler(async (req, res, next) => {
  const prediction = await Prediction.findById(req.params.id)
    .populate('student', 'studentId personalInfo academicInfo');

  if (!prediction) {
    return next(new ErrorResponse('Prediction not found', 404));
  }

  res.status(200).json({
    success: true,
    data: prediction
  });
});