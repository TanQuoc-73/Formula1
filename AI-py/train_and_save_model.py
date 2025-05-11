import pandas as pd
from sklearn.linear_model import LogisticRegression
import joblib

# Dữ liệu giả lập về đua xe
# Đặc trưng: [raceId, driverId, driverPoints, raceDifficulty]
# Nhãn: 1 (thắng), 0 (thua)
data = {
    "raceId": [123, 123, 124, 124, 125, 125],
    "driverId": [456, 789, 456, 789, 456, 789],
    "driverPoints": [100, 80, 90, 85, 95, 70],
    "raceDifficulty": [0.8, 0.8, 0.6, 0.6, 0.9, 0.9],
    "winner": [1, 0, 0, 1, 1, 0]  # 1: thắng, 0: thua
}

# Chuyển thành DataFrame
df = pd.DataFrame(data)

# Đặc trưng và nhãn
X = df[["raceId", "driverId", "driverPoints", "raceDifficulty"]]
y = df["winner"]

# Huấn luyện mô hình
model = LogisticRegression(random_state=42)
model.fit(X, y)

# Lưu mô hình
joblib.dump(model, "model/model.pkl")  # Lưu vào thư mục model/
print("✅ Đã lưu model vào model/model.pkl")