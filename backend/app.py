from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={
    r"/*": {
        "origins": ["http://localhost:3000"],
        "methods": ["GET", "POST", "OPTIONS"],
        "allow_headers": ["Content-Type"]
    }
})

@app.route('/')
def home():
    return jsonify({
        "message": "Hello, World!"
    })

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000) 