from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib  # Thay pickle bằng joblib
import numpy as np

app = Flask(__name__)
CORS(app)

# Tải mô hình
try:
    model = joblib.load("model/model.pkl")  # Sử dụng joblib.load()
    print("✅ Đã tải mô hình thành công")
except FileNotFoundError:
    model = None
    print("⚠️ Không tìm thấy model.pkl, sử dụng logic giả lập")
except Exception as e:
    model = None
    print(f"⚠️ Lỗi khi tải mô hình: {str(e)}, sử dụng logic giả lập")

# Danh sách tay đua (giả lập để ánh xạ driverId thành tên)
drivers = {
    "456": "Lewis Hamilton",
    "789": "Max Verstappen",
}

# Hàm dự đoán (dùng mô hình nếu có)
def predict_outcome(race_id: str, driver_id: str) -> str:
    if model:
        try:
            # Giả lập các đặc trưng khác (vì mô hình cần 4 đặc trưng)
            driver_points = 90  # Giả lập điểm tay đua
            race_difficulty = 0.7  # Giả lập độ khó
            input_data = np.array([[int(race_id), int(driver_id), driver_points, race_difficulty]])
            prediction = model.predict(input_data)[0]
            probability = model.predict_proba(input_data)[0][1]  # Xác suất thắng
            driver_name = drivers.get(driver_id, "Unknown Driver")
            if prediction == 1:
                return f"Predicted winner for race {race_id}: {driver_name} (Probability: {probability:.2f})"
            else:
                return f"Driver {driver_name} is not predicted to win race {race_id} (Probability: {probability:.2f})"
        except Exception as e:
            return f"Error using model: {str(e)}"
    else:
        # Logic giả lập
        winner = drivers.get(driver_id, "Lewis Hamilton")
        return f"Predicted winner for race {race_id} and driver {driver_id}: {winner}"

# Hàm xử lý tin nhắn chatbot
def process_chat_message(message: str) -> str:
    message = message.lower()
    parts = message.split()
    race_id = None
    driver_id = None

    if "predict" in parts and "race" in parts and "driver" in parts:
        try:
            race_idx = parts.index("race") + 1
            driver_idx = parts.index("driver") + 1
            race_id = parts[race_idx]
            driver_id = parts[driver_idx]
        except (IndexError, ValueError):
            pass

    if race_id and driver_id:
        return predict_outcome(race_id, driver_id)
    elif "hello" in message or "hi" in message:
        return "Xin chào! Tôi là AI, rất vui được trò chuyện với bạn!"
    elif "help" in message:
        return "Vui lòng nhập 'Predict race <raceId> with driver <driverId>' để dự đoán."
    else:
        return "Tôi không hiểu lắm. Hãy thử 'Predict race <raceId> with driver <driverId>' hoặc 'Help'!"

# Endpoint /predict
@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.get_json()
        race_id = data.get("raceId")
        driver_id = data.get("driverId")
        
        if not race_id or not driver_id:
            return jsonify({"error": "Missing raceId or driverId"}), 400
        
        result = predict_outcome(race_id, driver_id)
        return jsonify({"prediction": result})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Endpoint /predict_team
@app.route("/predict_team", methods=["POST"])
def predict_team():
    try:
        data = request.get_json()
        team_id = data.get("teamId")
        total_points = data.get("totalPoints")
        
        if not team_id or total_points is None:
            return jsonify({"error": "Missing teamId or totalPoints"}), 400
        
        if model:
            # Giả lập dữ liệu đầu vào cho mô hình
            race_id = 123  # Giả lập
            driver_id = 456  # Giả lập
            race_difficulty = 0.7
            input_data = np.array([[race_id, driver_id, total_points, race_difficulty]])
            prediction = model.predict(input_data)[0]
            probability = model.predict_proba(input_data)[0][1]
            return f"Team {team_id} with {total_points} points has a {probability:.2f} chance of ranking high!", 200
        else:
            return f"Team {team_id} with {total_points} points is predicted to rank in the top 3!", 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Endpoint /chat
@app.route("/chat", methods=["POST"])
def chat():
    try:
        data = request.get_json()
        user_message = data.get("message", "")
        if not user_message:
            return jsonify({"error": "Missing message"}), 400

        ai_response = process_chat_message(user_message)
        return jsonify({"response": ai_response})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Chạy server
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8080, debug=True)