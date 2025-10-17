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

    example_recipe_1 = [1008, 1022, 1043, 1034]
    example_recipe_2 = [1001, 1002, 1003, 1004]

    recipe_1= list(map(get_by_id, example_recipe_1))
    recipe_2= list(map(get_by_id, example_recipe_2))

    return jsonify([recipe_1, recipe_2])
