const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  courseCode: {
    type: String,
    required: true,
    unique: true,
    uppercase: true
  },
  courseName: {
    type: String,
    required: true
  },
  credits: {
    type: Number,
    min: 1,
    max: 6,
    required: true
  },
  department: {
    type: String,
    required: true
  },
  semester: {
    type: Number,
    min: 1,
    max: 8,
    required: true
  },
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  prerequisites: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course'
  }],
  description: String,
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Indexes
courseSchema.index({ courseCode: 1 });
courseSchema.index({ department: 1, semester: 1 });

module.exports = mongoose.model('Course', courseModel);