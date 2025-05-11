from flask import Flask, request, jsonify
import json

app = Flask(__name__)

# Hàm giả lập dự đoán (thay thế bằng mô hình AI thực tế nếu cần)
def predict_outcome(race_id: str, driver_id: str) -> str:
    # Đây là logic giả lập, bạn có thể thay bằng mô hình ML (như scikit-learn, TensorFlow)
    return f"Predicted winner for race {race_id} and driver {driver_id}: Lewis Hamilton"

# Endpoint /predict để dự đoán kết quả
@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()  # Nhận dữ liệu JSON từ request
        race_id = data.get('raceId')
        driver_id = data.get('driverId')
        
        if not race_id or not driver_id:
            return jsonify({"error": "Missing raceId or driverId"}), 400
        
        result = predict_outcome(race_id, driver_id)
        return jsonify({"prediction": result})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Chạy server
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)