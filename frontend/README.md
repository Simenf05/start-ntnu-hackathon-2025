# Frontend - NTNU Hackathon 2025 👋

This is an [Expo](https://expo.dev) React Native project for the NTNU Hackathon 2025.

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Make sure the Flask backend is running first:
   
   ```bash
   # In the backend directory
   cd ../backend
   python app.py
   ```

3. Start the Expo development server:

   ```bash
   npx expo start
   ```

4. Check if services are running:
   
   ```bash
   # Check Flask backend (port 5000)
   lsof -i :5000 -sTCP:LISTEN
   
   # Check Expo dev server (port 8081)
   lsof -i :8081 -sTCP:LISTEN
   ```

In the output, you'll find options to open the app in a:

- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go) app on your physical device

## Project Structure

- **components/** - React components (RecipeDisplay, ListView, Footer, etc.)
- **assets/** - Images and other static assets
- **App.js** - Main application entry point
- **config.js** - Configuration file for API endpoints

## Backend Integration

The app connects to a Flask backend API running on `http://localhost:5000`. Make sure the backend is running before starting the frontend.

### API Endpoints:
- `/api/test` - Health check
- `/api/recipes` - Get recipes
- `/api/barcode` - Barcode scanning functionality

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
