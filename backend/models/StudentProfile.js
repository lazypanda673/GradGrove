const mongoose = require('mongoose');

const studentProfileSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  gpa: {
    type: Number,
    min: 0,
    max: 10
  },
  attendance: {
    type: Number,
    min: 0,
    max: 100
  },
  semester: {
    type: Number,
    min: 1,
    max: 8
  },
  program: {
    type: String,
    trim: true
  },
  participatesInActivities: {
    type: Boolean,
    default: false
  },
  activityTypes: [{
    type: String,
    trim: true
  }],
  stressLevel: {
    type: Number,
    min: 1,
    max: 5
  },
  motivationLevel: {
    type: Number,
    min: 1,
    max: 5
  },
  familySupport: {
    type: Number,
    min: 1,
    max: 5
  },
  riskScore: {
    type: Number,
    min: 0,
    max: 1
  },
  riskLevel: {
    type: String,
    enum: ['Low', 'Medium', 'High'],
    default: 'Low'
  },
  counsellor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('StudentProfile', studentProfileSchema);