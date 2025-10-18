from flask import Flask, jsonify, request
from flask_cors import CORS

from recipes import recipes_bp
from barcode import barcode_bp 
from search import search_bp


app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Register blueprints
app.register_blueprint(recipes_bp, url_prefix='/api')

# Register blueprints
app.register_blueprint(barcode_bp, url_prefix='/api')

# Register blueprints
app.register_blueprint(search_bp, url_prefix='/api')

# Example route
@app.route('/api/test', methods=['GET'])
def test_route():
    return jsonify({"message": "API is working!"})

# Simple test endpoint for recipes
@app.route('/api/recipes-simple', methods=['GET'])
def simple_recipes():
    return jsonify([
        {
            "name": "Test Recipe 1",
            "ingredients": [{"name": "Item 1", "price": 10.5}],
            "total_price": 10.5,
            "total_carbon_footprint_gram": 100
        },
        {
            "name": "Test Recipe 2",
            "ingredients": [{"name": "Item 2", "price": 20.0}],
            "total_price": 20.0,
            "total_carbon_footprint_gram": 200
        }
    ])

# Error handling
@app.errorhandler(404)
def not_found(error):
    return jsonify({"error": "Resource not found"}), 404

@app.errorhandler(500)
def internal_error(error):
    return jsonify({"error": "Internal server error"}), 500

if __name__ == '__main__':
    # Bind to 0.0.0.0 so the API is reachable from other devices on the LAN
    app.run(debug=True, host='0.0.0.0')