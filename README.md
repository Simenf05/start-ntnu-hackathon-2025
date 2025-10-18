# START NTNU Hackathon 2025 - REMA 1000 Shopping Assistant

A mobile application built for the START NTNU Hackathon 2025 that helps users make smarter, more sustainable shopping decisions at REMA 1000. The app allows users to search for products, scan barcodes, view recipes with ingredients, and compare products based on price and carbon footprint.

## 🎯 Project Overview

This project addresses the challenge of making grocery shopping more efficient, budget-friendly, and environmentally conscious. Our solution provides:

- **Product Search**: Find products by name or description
- **Barcode Scanner**: Quickly look up product information by scanning barcodes
- **Recipe Browser**: Browse recipes with automatic ingredient listing and pricing
- **Sustainability Insights**: View carbon footprint data for products
- **Price Comparison**: Compare prices across different products

### Original Brainstorming Ideas
- **Efficient Shopping Routes**: Map the fastest route through REMA 1000 stores based on shopping lists
- **Recipe-Based Shopping Lists**: Filter recipes by ingredients, budget, and allergies, then generate shopping lists
- **Budget & Sustainability Toggle**: Let users choose between the cheapest or most sustainable alternatives when scanning products

## 🏗️ Architecture

The project consists of two main components:

### Backend (Flask API)
- **Framework**: Flask (Python)
- **API Endpoints**:
  - `/api/test` - Health check endpoint
  - `/api/recipes` - Get example recipes with ingredients and pricing
  - `/api/barcode?gtin=<gtin>` - Look up products by GTIN barcode
  - `/api/search/name?name=<query>` - Search products by name
  - `/api/search/description?description=<query>` - Search products by description

### Frontend (React Native + Expo)
- **Framework**: React Native with Expo
- **Key Features**:
  - Product list view
  - Recipe display with ingredient details
  - Custom REMA 1000 branding
  - Cross-platform support (iOS, Android, Web)

## 🚀 Getting Started

### Prerequisites
- Python 3.8+
- Node.js 16+
- npm or yarn
- Expo CLI (installed automatically with dependencies)

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install Python dependencies:
```bash
pip install -r requirements.txt
```

3. Run the Flask server:
```bash
python app.py
```

The API will be available at `http://localhost:5000` (or `http://0.0.0.0:5000` for LAN access)

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Update the `config.js` file with your backend server address:
```javascript
export default {
  SERVER_ADDRESS: "http://YOUR_IP_ADDRESS:5000"
};
```

4. Start the Expo development server:
```bash
npm start
```

5. Run the app:
   - Press `w` for web browser
   - Press `a` for Android emulator
   - Press `i` for iOS simulator
   - Scan the QR code with Expo Go app on your phone

## 📁 Project Structure

```
start-ntnu-hackathon-2025/
├── backend/
│   ├── app.py              # Main Flask application
│   ├── recipes.py          # Recipe endpoints and logic
│   ├── barcode.py          # Barcode lookup endpoint
│   ├── search.py           # Product search endpoints
│   ├── vespa.py            # Vespa search integration
│   └── requirements.txt    # Python dependencies
├── frontend/
│   ├── App.js              # Main React Native component
│   ├── config.js           # Configuration (API URL)
│   ├── components/
│   │   ├── ListView.jsx
│   │   ├── RecipeDisplay.jsx
│   │   ├── ListItem.jsx
│   │   ├── ChangeIngredient.jsx
│   │   ├── Footer.jsx
│   │   └── SecondPage.jsx
│   ├── assets/
│   │   └── REMA-*.ttf      # REMA 1000 brand fonts
│   └── package.json
└── README.md
```

## 🔌 API Documentation

### Get Recipes
```http
GET /api/recipes
```
Returns a list of recipes with ingredients, prices, and carbon footprint data.

### Search by Barcode
```http
GET /api/barcode?gtin=<gtin>
```
Look up a product by its GTIN barcode number.

### Search by Name
```http
GET /api/search/name?name=<query>
```
Search for products matching the given name (case-insensitive).

### Search by Description
```http
GET /api/search/description?description=<query>
```
Search for products matching the given description (case-insensitive).

## 🛠️ Technologies Used

### Backend
- Flask - Web framework
- Requests - HTTP library
- PyVespa - Vespa search integration
- Docker - Containerization support

### Frontend
- React Native - Mobile framework
- Expo - Development platform
- React Native Elements - UI components
- Expo Vector Icons - Icon library

## 🌱 Sustainability Features

The app includes carbon footprint data for products, helping users make environmentally conscious choices. Each recipe shows:
- Total price
- Total carbon footprint (in grams)
- Individual product environmental impact

## 📱 Screenshots

*(Add screenshots of your app here)*

## 🤝 Contributing

This is a hackathon project. Feel free to fork and experiment!

## 📄 License

MIT License

Copyright (c) 2025 START NTNU Hackathon Team

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

## 🏆 Hackathon Details

- **Event**: START NTNU Hackathon 2025
- **Challenge**: REMA 1000 Case
- **Team**: [Your Team Name]
- **Date**: October 2025

## 📧 Contact

For questions or feedback, please reach out to the team members.

---

Built with ❤️ during START NTNU Hackathon 2025
