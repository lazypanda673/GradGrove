const User = require('../models/User');
const StudentProfile = require('../models/StudentProfile');
const SurveyResponse = require('../models/SurveyResponse');
const asyncHandler = require('../utils/asyncHandler');
const ErrorResponse = require('../utils/errorResponse');

exports.getDashboardStats = asyncHandler(async (req, res, next) => {
  const totalStudents = await User.countDocuments({ role: 'student', isActive: true });
  const totalCounsellors = await User.countDocuments({ role: 'counsellor', isActive: true });
  const totalSurveys = await SurveyResponse.countDocuments();

  const riskDistribution = await StudentProfile.aggregate([
    { $group: { _id: '$riskLevel', count: { $sum: 1 } } }
  ]);

  res.status(200).json({
    success: true,
    data: {
      totalStudents,
      totalCounsellors,
      totalSurveys,
      riskDistribution
    }
  });
});

exports.getAllUsers = asyncHandler(async (req, res, next) => {
  const { role, page = 1, limit = 10 } = req.query;
  
  const query = { isActive: true };
  if (role) query.role = role;

  const users = await User.find(query)
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .sort({ createdAt: -1 })
    .select('-password');

  const total = await User.countDocuments(query);

  res.status(200).json({
    success: true,
    count: users.length,
    total,
    data: users
  });
});