import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';

// RecipeDisplay fetches recipes from the backend and displays them.
export default function RecipeDisplay({ backendUrl = 'http://192.168.1.42:5000' }) {
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

    if (loading) return (
        <View style={styles.center}>
            <ActivityIndicator size="large" />
            <Text style={styles.small}>Loading recipes…</Text>
        </View>
    );

    if (error) return (
        <View style={styles.center}>
            <Text style={styles.error}>Error loading recipes: {error}</Text>
        </View>
    );

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
            {Array.isArray(recipes) && recipes.length > 0 ? (
                recipes.map((recipeList, idx) => (
                    <View key={idx} style={styles.recipeBox}>
                        <Text style={styles.recipeTitle}>Recipe {idx + 1}</Text>
                        {Array.isArray(recipeList) && recipeList.length > 0 ? (
                            recipeList.map((p, i) => (
                                <Text key={i} style={styles.itemText}>- {productTitle(p)}</Text>
                            ))
                        ) : (
                            <Text style={styles.itemText}>No items</Text>
                        )}
                    </View>
                ))
            ) : (
                <Text>No recipes returned</Text>
            )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    content: { padding: 16 },
    center: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 16 },
    small: { marginTop: 8, color: '#666' },
    error: { color: 'red' },
    recipeBox: { marginBottom: 16, padding: 12, borderRadius: 8, backgroundColor: '#f7f7f7' },
    recipeTitle: { fontSize: 18, fontWeight: '600', marginBottom: 8, fontFamily: "REMA-bold" },
    itemText: { fontSize: 14, marginBottom: 4, fontFamily: "REMA-regular" }
});
