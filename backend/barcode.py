from flask import Blueprint, jsonify, request
import requests

barcode_bp = Blueprint('barcode', __name__)

url = "https://startcode-hackathon2025.azurewebsites.net/api/GetProducts"

@barcode_bp.route('/barcode', methods=['GET'])
def getByGtin():
    gtin = request.args.get('gtin')

    items = requests.get(url).json()

    matches = list(filter(lambda item: item['gtin'] == gtin, items))

    if len(matches) == 0:
        return jsonify({"error": "GTIN not found"}), 404

    return jsonify(matches[0])
