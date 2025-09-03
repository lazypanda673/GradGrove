const User = require('../models/User');
const StudentProfile = require('../models/StudentProfile');
const SurveyResponse = require('../models/SurveyResponse');
const asyncHandler = require('../utils/asyncHandler');
const ErrorResponse = require('../utils/errorResponse');

exports.getStudents = asyncHandler(async (req, res, next) => {
  const { page = 1, limit = 10, program, riskLevel, search } = req.query;
  
  const query = { role: 'student', isActive: true };
  if (search) {
    query.$or = [
      { firstName: new RegExp(search, 'i') },
      { lastName: new RegExp(search, 'i') },
      { email: new RegExp(search, 'i') },
      { rollNumber: new RegExp(search, 'i') }
    ];
  }

  const students = await User.find(query)
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .sort({ createdAt: -1 });

  const total = await User.countDocuments(query);

  res.status(200).json({
    success: true,
    count: students.length,
    total,
    data: students
  });
});

exports.submitSurvey = asyncHandler(async (req, res, next) => {
  const student = await User.findById(req.user.id);
  
  if (!student || student.role !== 'student') {
    return next(new ErrorResponse('Student not found', 404));
  }

  const surveyResponse = await SurveyResponse.create({
    student: student._id,
    ...req.body
  });

  // Update student profile
  await StudentProfile.findOneAndUpdate(
    { student: student._id },
    {
      gpa: req.body.gpa,
      attendance: req.body.attendance,
      stressLevel: req.body.stressLevel,
      participatesInActivities: req.body.participatesInActivities,
      activityTypes: req.body.activityTypes || []
    },
    { upsert: true, new: true }
  );

  res.status(201).json({
    success: true,
    data: surveyResponse
  });
});

exports.getStudentProfile = asyncHandler(async (req, res, next) => {
  const profile = await StudentProfile.findOne({ student: req.user.id })
    .populate('counsellor', 'firstName lastName email');

  if (!profile) {
    return next(new ErrorResponse('Profile not found', 404));
  }

  res.status(200).json({
    success: true,
    data: profile
  });
});