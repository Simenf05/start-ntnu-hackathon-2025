from flask import Blueprint, jsonify, request
import re
import requests

search_bp = Blueprint('search', __name__)

url = "https://startcode-hackathon2025.azurewebsites.net/api/GetProducts"

@search_bp.route('/search/name', methods=['GET'])
def getByNameSearch():
    name = request.args.get('name')
    if name is None:
        return jsonify({"error": "Name parameter is required"}), 400

    items = requests.get(url).json()

    matches = list(filter(lambda item: re.search(name, item['name'], re.IGNORECASE), items))

    if len(matches) == 0:
        return jsonify({"error": "No matches found"}), 404

    return jsonify(matches)

@search_bp.route('/search/description', methods=['GET'])
def getByDescriptionSearch():
    description = request.args.get('description')
    if description is None:
        return jsonify({"error": "Description parameter is required"}), 400

    items = requests.get(url).json()

    matches = list(filter(lambda item: re.search(description, item['description'], re.IGNORECASE), items))

    if len(matches) == 0:
        return jsonify({"error": "No matches found"}), 404

    return jsonify(matches)
