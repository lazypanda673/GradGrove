import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.pipeline import Pipeline
from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.impute import SimpleImputer
import joblib
import os

def train_and_save_model():
    # ---------- Load input CSV ----------
    current_dir = os.path.dirname(os.path.abspath(__file__))
    INPUT_CSV = os.path.join(current_dir, "student_risk_testcases.csv")
    df = pd.read_csv(INPUT_CSV)

    # ---------- Rename columns to simpler names ----------
    df.rename(columns={
        "AttendanceRate": "attendance_rate",
        "ExamScores": "exam_score",
        "Backlogs": "num_backlogs",
        "AssignmentSubmissionRate": "assignment_rate",
        "TravelTime": "distance_minutes",
        "FamilyIncome": "family_income",
        "FeePaymentHistory": "fee_payment_status",
        "ScholarshipAid": "scholarship",
        "FamilySupport": "family_support_score",
        "MotivationLevel": "motivation_score",
        "StressLevel": "stress_level",
        "InternetAtHome": "internet_at_home",
        "EarlyMarriagePregnancy": "early_marriage",
        "ChronicIllness": "chronic_illness",
        "UnemploymentRate": "local_unemployment",
        "PovertyIndex": "poverty_index",
        "CommunityLiteracyRate": "community_literacy_rate"
    }, inplace=True)

    # ---------- Select features ----------
    X = df.copy()

    # ---------- Identify numeric & categorical features ----------
    numeric_features = X.select_dtypes(include=[np.number]).columns.tolist()
    categorical_features = [c for c in X.columns if c not in numeric_features]

    # ---------- Preprocessing ----------
    numeric_transformer = Pipeline([
        ("imputer", SimpleImputer(strategy="median")),
        ("scaler", StandardScaler())
    ])

    categorical_transformer = Pipeline([
        ("imputer", SimpleImputer(strategy="most_frequent")),
        ("ohe", OneHotEncoder(handle_unknown="ignore", sparse_output=False))
    ])

    preprocessor = ColumnTransformer([
        ("num", numeric_transformer, numeric_features),
        ("cat", categorical_transformer, categorical_features)
    ])

    # ---------- Model ----------
    rf = RandomForestClassifier(n_estimators=200, random_state=42)
    pipe = Pipeline([
        ("preprocessor", preprocessor),
        ("clf", rf)
    ])

    # ---------- Temporary synthetic target (replace with real dropout labels if available) ----------
    y = np.random.randint(0, 2, size=len(X))  # 0 = No Dropout, 1 = Dropout

    # ---------- Fit pipeline ----------
    pipe.fit(X, y)

    # ---------- Save the model ----------
    model_data = {
        'pipeline': pipe,
        'feature_names': X.columns.tolist(),
        'numeric_features': numeric_features,
        'categorical_features': categorical_features
    }

    # Create directory if it doesn't exist
    os.makedirs('backend/services/ml', exist_ok=True)
    
    # Save the model
    joblib.dump(model_data, 'backend/services/ml/model.pkl')
    
    print("✅ Model trained and saved successfully!")
    print(f"📊 Total features: {len(X.columns)}")
    print(f"🔢 Numeric features: {len(numeric_features)}")
    print(f"📋 Categorical features: {len(categorical_features)}")
    print(f"💾 Saved to: backend/services/ml/model.pkl")

if __name__ == "__main__":
    train_and_save_model()