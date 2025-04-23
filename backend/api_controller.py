from flask import Flask, request, jsonify
import os

app = Flask(__name__)

@app.route('/submit', methods=['POST'])
def submit_data():
    return jsonify({
        "message": "Data received successfully"
    }), 200

    return jsonify({"error": "Only PDF files are allowed"}), 400

if __name__ == '__main__':
    app.run(debug=True)
