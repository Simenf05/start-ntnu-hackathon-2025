from flask import Flask, jsonify, request

app = Flask(__name__)

# Example route
@app.route('/api/test', methods=['GET'])
def test_route():
    return jsonify({"message": "API is working!"})

# Error handling
@app.errorhandler(404)
def not_found(error):
    return jsonify({"error": "Resource not found"}), 404

@app.errorhandler(500)
def internal_error(error):
    return jsonify({"error": "Internal server error"}), 500

if __name__ == '__main__':
    app.run(debug=True)