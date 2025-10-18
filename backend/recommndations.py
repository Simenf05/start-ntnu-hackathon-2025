from flask import Blueprint, jsonify, request

recommendations_bp = Blueprint('recommendations', __name__)

@recommendations_bp.route('/recommendations', methods=['POST'])
def getRecommendations():

    data = request.get_json()

    id = data.get("id", None)
    if id is None:
        return jsonify({"error": "ID is required"}), 400



    sort_by_price = data.get("sort_by_price", False)
    sort_by_carbon_footprint = data.get("sort_by_carbon_footprint", False)

    return jsonify([])
