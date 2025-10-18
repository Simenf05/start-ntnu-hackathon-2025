#!/usr/bin/env python3
import requests
import json

url = "https://startcode-hackathon2025.azurewebsites.net/api/GetProducts"

data = requests.get(url).json()

line = ""

# "productId": 1001,"name": "Grovt brød 750 g","description": "Nybakt, grovt brød med høy fiber.","price": 44.18,"pricePerUnit": 58.91,"allergens": ["hvete", "gluten", "melk"],"carbonFootprintGram": 325,"organic": false

def do_name(name):
    new_name = ""
    for c in name:
        if c.isnumeric():
            return new_name[:-1]
        new_name += c
    return new_name[:-1]

def allergenes_to_list(allergens):
    if allergens == "ingen":
        return []
    return json.dumps(allergens.split(", "))

for i, item in enumerate(data):

    # line += '{"put": "id:products:product::' + f"{i+1}" + '", "fields": {'
    # line += f'"productId": {int(item["productId"])}, '
    line += f'{int(item["productId"])},'
    # line += f'"name": "{do_name(item["name"])}", '
    line += f'{do_name(item["name"])},'
    # line += f'"description": "{item["description"]}", '
    # line += f'"price": {item["price"]}, '
    # line += f'"pricePerUnit": {item["pricePerUnit"]}, '
    # line += f'"allergens": {allergenes_to_list(item["allergens"])}, '
    # line += f'"carbonFootprintGram": {item["carbonFootprintGram"]}, '
    # line += f'"organic": {str(item["organic"]).lower()}'
    # line+= '}}\n'
    line += '\n'


print(line)