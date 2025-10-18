from flask import Blueprint, jsonify
import requests

recipes_bp = Blueprint('recipes', __name__)

id_to_url = lambda id: f"https://startcode-hackathon2025.azurewebsites.net/api/GetProductById?productId={id}"

def make_recipe(name, ingredient_ids):
    ingredients = list(map(get_by_id, ingredient_ids))
    total_price = sum(ingredient['price'] for ingredient in ingredients)
    total_carbon_footprint_gram = sum(ingredient['carbonFootprintGram'] for ingredient in ingredients)

    return {
        "name": name,
        "ingredients": ingredients,
        "total_price": total_price,
        "total_carbon_footprint_gram": total_carbon_footprint_gram
    }


def get_by_id(id):
    url = id_to_url(id)
    resp = requests.get(url)
    return resp.json()


@recipes_bp.route('/recipes', methods=['GET'])
def list_recipes():
    """Return a small list of example recipes as JSON."""

    example_recipes = [
        {
            "name": "Pasta with tomato sauce",
            "ingredients": [1008, 1022, 1043, 1034],
        }, {
            "name": "Chicken salad",
            "ingredients": [1001, 1002, 1003, 1004],
        }
    ]

    recipes = []

    for example_recipe in example_recipes:
        recipe = make_recipe(example_recipe["name"], example_recipe["ingredients"])
        recipes.append(recipe)

    return jsonify(recipes)
