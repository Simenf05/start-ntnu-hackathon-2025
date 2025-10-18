import { useState, useEffect } from "react"
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import ListItem from './components/ListItem'
import RecipeDisplay from './components/RecipeDisplay'
import { useFonts } from "expo-font";
import ListView from "./components/ListView";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context"
import config from "./config";
import FoodPreferences from './components/FoodPreferences';


export default function App() {

    // Load fonts globally
    const [fontsLoaded] = useFonts({
        "REMA-regular": require("./assets/REMA-Regular.ttf"),
        "REMA-bold": require("./assets/REMA-Bold.ttf"),
    });

    const API_URL = config.SERVER_ADDRESS;

    const [currentView, setCurrentView] = useState('recipes'); // 'recipes' or 'list'
    const [listItems, setListItems] = useState([]);

    const handleSelectRecipe = (ingredients, recipeName) => {
        // Convert recipe ingredients to list items format
        const convertedItems = ingredients.map((item, index) => {
            // Extract product details with fallbacks
            const name = item.name || item.Title || item.title || item.productName || item.DisplayName || item.Name || `Item ${index + 1}`;
            const price = item.price || item.Price || 0;
            const unit = item.unit || item.Unit || 'stk';
            const pricePerUnit = item.pricePerUnit || item.price_per_unit || price;
            const productId = item.productId || item.product_id || item.id || `${recipeName}-${index}`;
            
            return {
                productId,
                name,
                brand: "" + Math.round(100 * (price / pricePerUnit)) / 100 + "" + unit,
                price,
                unit,
                pricePerUnit,
                count: 1,
                checked: false
            };
        });

        setListItems(convertedItems);
        setCurrentView('list');
    };

    const handleBackToRecipes = () => {
        setCurrentView('recipes');
    };

    const handleGoToPreferences = () => {
        setCurrentView('preferences');
    };


    if (!fontsLoaded) return null; // wait for fonts to load

    return (
        <SafeAreaProvider>
            <SafeAreaView style={[styles.container, {paddingTop: 0}]} >
                <View style={styles.container}>
                    <StatusBar style="light" />
                    {currentView === 'recipes' ? (
                        <RecipeDisplay 
                            backendUrl={API_URL} 
                            onSelectRecipe={handleSelectRecipe}
                            onAdminPreferences={handleGoToPreferences}
                        />
                    ) : currentView === 'list' ? (
                        <ListView 
                            data={listItems} 
                            setListItems={setListItems} 
                            listItems={listItems}
                            onBackPress={handleBackToRecipes}
                        />
                    ) : currentView === 'preferences' ? (
                        <FoodPreferences onBack={handleBackToRecipes} />
                    ) : null}
                </View>
            </SafeAreaView>
        </SafeAreaProvider>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#171718",
    },
});
