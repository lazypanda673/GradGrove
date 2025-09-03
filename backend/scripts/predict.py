import sys
import json
import pandas as pd
import numpy as np
import joblib
import os

def load_model():
    """
    Load the pre-trained model from the specified path
    """
    try:
        model_path = os.path.join(os.path.dirname(__file__), '../services/ml/model.pkl')
        
        if not os.path.exists(model_path):
            return {
                "error": "Model file not found. Please train the model first.",
                "probability": 0.5
            }
        
        model_data = joblib.load(model_path)
        return model_data
    except Exception as e:
        return {
            "error": f"Error loading model: {str(e)}",
            "probability": 0.5
        }

def risk_bucket(p):
    """
    Risk bucketing function exactly as in your analysis
    """
    if p < 0.3:
        return "Green"
    elif p < 0.6:
        return "Yellow"
    else:
        return "Red"

def predict(student_data):
    """
    Make prediction using the loaded model (matching your analysis exactly)
    """
    model_data = load_model()
    
    if isinstance(model_data, dict) and "error" in model_data:
        return model_data
    
    try:
        # Extract the complete pipeline
        pipeline = model_data.get('pipeline')
        feature_names = model_data.get('feature_names', [])
        
        if pipeline is None:
            return {
                "error": "Invalid model format",
                "probability": 0.5
            }
        
        # Convert input to DataFrame
        df = pd.DataFrame([student_data])
        
        # Ensure all required features are present
        for feature in feature_names:
            if feature not in df.columns:
                # Provide sensible defaults based on feature type
                if feature in ['attendance_rate', 'exam_score', 'assignment_rate']:
                    df[feature] = 75  # Default percentage
                elif feature == 'num_backlogs':
                    df[feature] = 0   # Default no backlogs
                elif feature in ['family_support_score', 'motivation_score', 'stress_level']:
                    df[feature] = 3   # Default rating (1-5 scale)
                elif feature == 'family_income':
                    df[feature] = 5000  # Default income
                elif feature == 'distance_minutes':
                    df[feature] = 30    # Default travel time
                else:
                    df[feature] = 0     # Default for other numeric features
        
        # Reorder columns to match training data exactly
        df = df[feature_names]
        
        # Make predictions (exactly as in your analysis)
        pred_proba = pipeline.predict_proba(df)[:, 1]   # probability of dropout
        pred_class = pipeline.predict(df)               # predicted class (0/1)
        
        probability = float(pred_proba[0].round(2))
        dropout_prediction = "Yes" if pred_class[0] == 1 else "No"
        
        # Risk bucketing (exactly as in your analysis)
        risk_bucket_val = risk_bucket(probability)
        
        # Risk color mapping as in your analysis
        risk_color_map = {
            "Green": "🟢 Safe",
            "Yellow": "🟡 Monitor", 
            "Red": "🔴 High Risk"
        }
        risk_color = risk_color_map.get(risk_bucket_val, "❓ Unknown")
        
        return {
            "probability": probability,
            "risk_bucket": risk_bucket_val,
            "risk_color": risk_color,
            "dropout": dropout_prediction,
            "model_version": "1.0.0"
        }
        
    except Exception as e:
        return {
            "error": f"Prediction error: {str(e)}",
            "probability": 0.5
        }

if __name__ == '__main__':
    try:
        if len(sys.argv) > 1:
            input_data = json.loads(sys.argv[1])
            result = predict(input_data)
            print(json.dumps(result))
        else:
            # Sample test data matching your analysis format
            sample_data = {
                "attendance_rate": 85,
                "exam_score": 72,
                "num_backlogs": 1,
                "assignment_rate": 90,
                "distance_minutes": 60,
                "family_income": 8000,
                "fee_payment_status": "Timely",
                "scholarship": "Yes",
                "family_support_score": 4,
                "motivation_score": 3,
                "stress_level": 2,
                "internet_at_home": "Yes",
                "early_marriage": "No",
                "chronic_illness": "No",
                "local_unemployment": 5.2,
                "poverty_index": 12.5,
                "community_literacy_rate": 85.3
            }
            result = predict(sample_data)
            print(json.dumps(result, indent=2))
    except Exception as e:
        print(json.dumps({
            "error": f"Failed to process request: {str(e)}",
            "probability": 0.5
        }))