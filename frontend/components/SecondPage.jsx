import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

export default function SecondPage({ onBack }) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Second Page</Text>
            <Text style={styles.body}>This is a separate page component you can navigate to without installing navigation libraries.</Text>
            <View style={styles.button}>
                <Button title="Go back" onPress={onBack} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: '600',
        marginBottom: 8,
    },
    body: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 16,
    },
    button: {
        width: '60%'
    }
});
