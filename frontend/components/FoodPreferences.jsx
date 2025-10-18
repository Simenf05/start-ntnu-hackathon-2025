import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import CustomHeader from './CustomHeader';
import FoodType from './FoodType';

export default function FoodPreferences({ onBack }) {
    return (
        <View>
            <CustomHeader title="Matpreferanser" showActionButton={false} showBackButton={true} onBackPress={onBack} />
            <Text style={{textAlign: "center", color: "#bdbdbd", marginBottom: 20}} >Kategorier som er på vil ikke anbefales</Text>
            <ScrollView>
                <FoodType name="Halal"></FoodType>
                <FoodType name="Halal"></FoodType>
                <FoodType name="Halal"></FoodType>
                <FoodType name="Halal"></FoodType>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#171718' },
    header: { padding: 16, borderBottomWidth: 1, borderColor: '#2a2a2a' },
    backBtn: { paddingVertical: 8 },
    backText: { color: '#fff', fontFamily: 'REMA-regular' },
    title: { color: '#fff', fontSize: 20, fontFamily: 'REMA-bold', marginTop: 8 },
    content: { padding: 16 },
    info: { color: '#ddd', fontFamily: 'REMA-regular' }
});
