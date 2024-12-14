# app.py
from flask import Flask, render_template, jsonify
import time

app = Flask(__name__)

# グローバル変数
study_time = 25 * 60  # 25分（秒単位）
break_time = 5 * 60  # 5分（休憩時間）
time_remaining = study_time
level = 1
popcorn_count = 0
is_running = False

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/start')
def start_timer():
    global time_remaining, is_running, popcorn_count
    if not is_running:
        is_running = True
        while time_remaining > 0:
            time_remaining -= 1
            popcorn_count += 1
            time.sleep(1)  # 1秒待つ（実際には非同期処理を推奨）
        return jsonify({
            'time': time_remaining,
            'popcorn_count': popcorn_count
        })
    return jsonify({'message': 'Timer is already running'})

@app.route('/reset')
def reset_timer():
    global time_remaining, popcorn_count, level, is_running
    time_remaining = study_time
    popcorn_count = 0
    level = 1
    is_running = False
    return jsonify({
        'time': time_remaining,
        'popcorn_count': popcorn_count,
        'level': level
    })

if __name__ == '__main__':
    app.run(debug=True)
