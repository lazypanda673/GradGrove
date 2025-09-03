const mongoose = require('mongoose');

const predictionSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  riskScore: {
    type: Number,
    min: 0,
    max: 1,
    required: true
  },
  riskLevel: {
    type: String,
    enum: ['Low', 'Medium', 'High'],
    required: true
  },
  features: {
    attendance: Number,
    cgpa: Number,
    backlogs: Number,
    assignmentCompletion: Number,
    familySupport: Number,
    motivationLevel: Number,
    stressLevel: Number
  },
  importantFactors: [{
    feature: String,
    importance: Number,
    impact: String // positive/negative
  }],
  modelVersion: {
    type: String,
    required: true
  },
  confidence: {
    type: Number,
    min: 0,
    max: 1
  },
  recommendations: [String]
}, {
  timestamps: true
});

// Indexes
predictionSchema.index({ student: 1, timestamp: -1 });
predictionSchema.index({ riskLevel: 1 });
predictionSchema.index({ timestamp: -1 });

module.exports = mongoose.model('Prediction', predictionSchema);