# AI-py/ai_server.py
from flask import Flask, request, jsonify
import joblib

app = Flask(__name__)

# Load model khi server khởi động
model = joblib.load('model.pkl')

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    features = data.get('features')  # ví dụ: [1, 1]
    prediction = model.predict([features])
    return jsonify({'prediction': int(prediction[0])})

if __name__ == "__main__":
    print("🚀 Đang khởi động server AI...")
    app.run(debug=True)
