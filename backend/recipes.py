from flask import Blueprint, jsonify

recipes_bp = Blueprint('recipes', __name__)


@recipes_bp.route('/recipes', methods=['GET'])
def list_recipes():
    """Return a small list of example recipes as JSON."""
    example_recipe = {
        "id": 1,
        "title": "Simple Pancakes",
        "description": "Quick and easy fluffy pancakes.",
        "ingredients": [
            "2 cups all-purpose flour",
            "2 tablespoons sugar",
            "2 teaspoons baking powder",
            "1/2 teaspoon salt",
            "1 1/2 cups milk",
            "2 eggs",
            "2 tablespoons melted butter"
        ],
        "steps": [
            "Mix dry ingredients together in a bowl.",
            "Whisk in milk, eggs and melted butter until just combined.",
            "Heat a skillet over medium heat and pour 1/4 cup batter per pancake.",
            "Cook until bubbles form, flip and cook until golden brown."
        ],
        "servings": 4
    }

    return jsonify([example_recipe])
