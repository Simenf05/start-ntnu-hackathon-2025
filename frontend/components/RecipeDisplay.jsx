import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView, TouchableOpacity } from 'react-native';
import CustomHeader from './CustomHeader';

// RecipeDisplay fetches recipes from the backend and displays them.
export default function RecipeDisplay({ backendUrl = 'http://192.168.1.42:5000', onSelectRecipe }) {
    const [recipes, setRecipes] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let mounted = true;
        async function load() {
            setLoading(true);
            setError(null);
            try {
                const res = await fetch(`${backendUrl}/api/recipes`);
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                const data = await res.json();
                if (mounted) setRecipes(data);
            } catch (err) {
                if (mounted) setError(err.message || String(err));
            } finally {
                if (mounted) setLoading(false);
            }
        }

        load();
        return () => { mounted = false };
    }, [backendUrl]);

    function productTitle(item) {
        if (!item) return '';
        return item.name || item.Title || item.title || item.productName || item.DisplayName || item.Name || JSON.stringify(item);
    }

    const handleRecipeSelect = (recipe) => {
        if (onSelectRecipe) {
            // Pass the ingredients array and recipe name
            onSelectRecipe(recipe.ingredients || [], recipe.name);
        }
    };

    if (loading) return (
        <View style={styles.fullContainer}>
            <CustomHeader title="Velg Oppskrift" showActionButton={false} />
            <View style={styles.center}>
                <ActivityIndicator size="large" color="#fff" />
                <Text style={styles.small}>Laster oppskrifter…</Text>
            </View>
        </View>
    );

    if (error) return (
        <View style={styles.fullContainer}>
            <CustomHeader title="Velg Oppskrift" showActionButton={false} />
            <View style={styles.center}>
                <Text style={styles.error}>Feil ved lasting av oppskrifter: {error}</Text>
            </View>
        </View>
    );

    return (
        <View style={styles.fullContainer}>
            <CustomHeader title="Velg Oppskrift" showActionButton={false} />
            <ScrollView style={styles.container} contentContainerStyle={styles.content}>
                {Array.isArray(recipes) && recipes.length > 0 ? (
                    recipes.map((recipe, idx) => (
                        <TouchableOpacity 
                            key={idx} 
                            style={styles.recipeBox}
                            onPress={() => handleRecipeSelect(recipe)}
                            activeOpacity={0.7}
                        >
                            <Text style={styles.recipeTitle}>{recipe.name || `Oppskrift ${idx + 1}`}</Text>
                            {Array.isArray(recipe.ingredients) && recipe.ingredients.length > 0 ? (
                                recipe.ingredients.map((p, i) => (
                                    <Text key={i} style={styles.itemText}>• {productTitle(p)}</Text>
                                ))
                            ) : (
                                <Text style={styles.itemText}>Ingen ingredienser</Text>
                            )}
                            <Text style={styles.selectText}>Trykk for å velge</Text>
                        </TouchableOpacity>
                    ))
                ) : (
                    <Text style={styles.noRecipes}>Ingen oppskrifter funnet</Text>
                )}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    fullContainer: { flex: 1, backgroundColor: '#171718' },
    container: { flex: 1 },
    content: { padding: 16 },
    center: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 16 },
    small: { marginTop: 8, color: '#999', fontFamily: "REMA-regular" },
    error: { color: '#ff6b6b', fontFamily: "REMA-regular" },
    recipeBox: { 
        marginBottom: 16, 
        padding: 16, 
        borderRadius: 12, 
        backgroundColor: '#2a2a2b',
        borderWidth: 2,
        borderColor: '#3a3a3b'
    },
    recipeTitle: { 
        fontSize: 22, 
        fontWeight: '600', 
        marginBottom: 12, 
        fontFamily: "REMA-bold",
        color: '#fff'
    },
    itemText: { 
        fontSize: 15, 
        marginBottom: 6, 
        fontFamily: "REMA-regular",
        color: '#ddd'
    },
    selectText: {
        marginTop: 12,
        fontSize: 14,
        color: '#183D9F',
        fontFamily: "REMA-bold",
        textAlign: 'center'
    },
    noRecipes: {
        color: '#999',
        fontFamily: "REMA-regular",
        fontSize: 16,
        textAlign: 'center'
    }
});
