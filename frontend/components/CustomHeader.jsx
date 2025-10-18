import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function CustomHeader({
    title = "",
    buttonTitle = "Betal",
    onButtonPress,
    onBackPress,
    showBackButton = false,
    showActionButton = true,
}) {
    return (
        <View style={styles.container}>
            {showBackButton ? (
                <TouchableOpacity onPress={onBackPress}>
                    <Text style={styles.backText}>Tilbake</Text>
                </TouchableOpacity>
            ) : (
                <View style={styles.backPlaceholder} />
            )}

            <View style={styles.center}>
                <Text style={styles.title}>{title}</Text>
            </View>

            {showActionButton ? (
                <TouchableOpacity onPress={onButtonPress} style={styles.cta}>
                    <Text style={styles.ctaText}>{buttonTitle}</Text>
                </TouchableOpacity>
            ) : (
                <View style={styles.ctaPlaceholder} />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: 80,
        backgroundColor: "#171718",
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 15,
    },
    center: {
        flex: 1,
        alignItems: "center",
    },
    title: {
        color: "#fff",
        fontFamily: "REMA-bold",
        fontSize: 24,
    },
    backText: {
        color: "#fff",
        fontFamily: "REMA-bold",
        fontSize: 16,
        paddingRight: 32
    },
    backPlaceholder: {
        width: 80, // Same width as back button area for centering
    },
    cta: {
        backgroundColor: "#034C8C",
        borderRadius: 5,
        paddingVertical: 12,
        paddingHorizontal: 20,
        justifyContent: "center",
        alignItems: "center",
    },
    ctaPlaceholder: {
        width: 80, // Same width as CTA button area for centering
    },
    ctaText: {
        color: "#fff",
        fontFamily: "REMA-bold",
        fontSize: 16,
    },
});
