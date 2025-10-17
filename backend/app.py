from flask import Flask, jsonify, request

from recipes import recipes_bp
from barcode import barcode_bp 


app = Flask(__name__)

# Register blueprints
app.register_blueprint(recipes_bp, url_prefix='/api')

# Register blueprints
app.register_blueprint(barcode_bp, url_prefix='/api')

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