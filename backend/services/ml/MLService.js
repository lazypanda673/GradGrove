const { PythonShell } = require('python-shell');
const path = require('path');

class MLService {
  constructor() {
    this.initialized = false;
    this.pythonScriptPath = path.join(__dirname, '../../scripts/predict.py');
  }

  async initialize() {
    try {
      console.log('🔄 Initializing ML Service...');
      this.initialized = true;
      console.log('✅ ML Service initialized successfully');
    } catch (error) {
      console.error('❌ ML Service initialization failed:', error);
      throw error;
    }
  }

  async predictDropoutRisk(studentData) {
    if (!this.initialized) {
      await this.initialize();
    }

    return new Promise((resolve, reject) => {
      const options = {
        mode: 'json',
        pythonOptions: ['-u'],
        scriptPath: path.dirname(this.pythonScriptPath),
        args: [JSON.stringify(studentData)]
      };

      PythonShell.run('predict.py', options, (err, results) => {
        if (err) {
          console.error('❌ Python script error:', err);
          return reject(new Error('ML prediction failed: ' + err.message));
        }
        
        try {
          const prediction = results[0];
          
          if (prediction.error) {
            return reject(new Error(prediction.error));
          }

          const formattedPrediction = this._formatPrediction(prediction);
          resolve(formattedPrediction);
        } catch (parseError) {
          reject(new Error('Failed to parse prediction results: ' + parseError.message));
        }
      });
    });
  }

  async batchPredict(studentsData) {
    const predictions = [];
    
    for (const [index, studentData] of studentsData.entries()) {
      try {
        console.log(`🔮 Predicting for student ${index + 1}/${studentsData.length}`);
        const prediction = await this.predictDropoutRisk(studentData);
        predictions.push({
          success: true,
          data: prediction
        });
      } catch (error) {
        predictions.push({
          success: false,
          error: error.message,
          data: null
        });
      }
    }
    
    return predictions;
  }

  _formatPrediction(prediction) {
    return {
      riskScore: prediction.probability || prediction.risk_score,
      riskLevel: this._getRiskLevel(prediction.probability || prediction.risk_score),
      importantFactors: prediction.important_factors || prediction.factors || [],
      modelVersion: prediction.model_version || process.env.ML_MODEL_VERSION,
      confidence: prediction.confidence || 0.85,
      recommendations: this._generateRecommendations(prediction)
    };
  }

  _getRiskLevel(riskScore) {
    if (riskScore < 0.3) return 'Low';
    if (riskScore < 0.6) return 'Medium';
    return 'High';
  }

  _generateRecommendations(prediction) {
    const recommendations = [];
    const factors = prediction.important_factors || [];
    
    factors.forEach(factor => {
      switch(factor.feature) {
        case 'attendance_rate':
          recommendations.push('Improve class attendance');
          break;
        case 'exam_score':
          recommendations.push('Seek academic tutoring');
          break;
        case 'assignment_rate':
          recommendations.push('Complete pending assignments');
          break;
        case 'family_support_score':
          recommendations.push('Schedule family counseling session');
          break;
        case 'stress_level':
          recommendations.push('Practice stress management techniques');
          break;
      }
    });
    
    return recommendations.length > 0 ? recommendations : ['Schedule meeting with academic advisor'];
  }

  async getStatus() {
    return {
      initialized: this.initialized,
      modelVersion: process.env.ML_MODEL_VERSION,
      lastUpdated: new Date()
    };
  }
}

module.exports = new MLService();