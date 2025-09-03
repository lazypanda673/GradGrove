const mongoose = require('mongoose');

const surveyResponseSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  
  // Academic metrics
  gpa: {
    type: Number,
    required: true,
    min: 0,
    max: 10
  },
  attendance: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  
  // Activity participation
  participatesInActivities: {
    type: Boolean,
    required: true
  },
  activityTypes: [{
    type: String,
    trim: true
  }],
  
  // Psychological metrics
  stressLevel: {
    type: Number,
    required: true,
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
  financialStress: {
    type: Number,
    min: 1,
    max: 5
  },
  socialSupport: {
    type: Number,
    min: 1,
    max: 5
  },
  
  // Additional information
  studyHoursPerWeek: {
    type: Number,
    min: 0,
    max: 168
  },
  partTimeJob: {
    type: Boolean,
    default: false
  },
  jobHoursPerWeek: {
    type: Number,
    min: 0,
    max: 40
  },
  
  // Risk prediction (filled by ML)
  predictedRiskScore: {
    type: Number,
    min: 0,
    max: 1
  },
  predictedRiskLevel: {
    type: String,
    enum: ['Low', 'Medium', 'High']
  },
  importantFactors: [{
    factor: String,
    importance: Number
  }],
  
  // Status
  isProcessed: {
    type: Boolean,
    default: false
  },
  
  // Timestamps
  submittedAt: {
    type: Date,
    default: Date.now
  },
  processedAt: {
    type: Date
  }
});

// Indexes for efficient querying
surveyResponseSchema.index({ student: 1, submittedAt: -1 });
surveyResponseSchema.index({ predictedRiskLevel: 1 });
surveyResponseSchema.index({ submittedAt: -1 });

module.exports = mongoose.model('SurveyResponse', surveyResponseSchema);