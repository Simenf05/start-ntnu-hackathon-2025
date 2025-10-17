from flask import Blueprint, jsonify
import requests

recipes_bp = Blueprint('recipes', __name__)

id_to_url = lambda id: f"https://startcode-hackathon2025.azurewebsites.net/api/GetProductById?productId={id}"

def get_by_id(id):
    url = id_to_url(id)
    resp = requests.get(url)
    return resp.json()


@recipes_bp.route('/recipes', methods=['GET'])
def list_recipes():
    """Return a small list of example recipes as JSON."""

    example_recipe = [1001, 1002, 1003, 1004]

    json = list(map(get_by_id, example_recipe))

    return jsonify(json)
