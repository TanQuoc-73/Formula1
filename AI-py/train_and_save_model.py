# AI-py/train_and_save_model.py
from sklearn.linear_model import LogisticRegression
import joblib

# Dữ liệu giả
X = [[0, 0], [1, 1]]
y = [0, 1]

model = LogisticRegression()
model.fit(X, y)

# Lưu mô hình
joblib.dump(model, 'model.pkl')
print("✅ Đã lưu model vào model.pkl")
