import React, { useState, useRef, useEffect } from "react";
import {
    View,
    TextInput,
    Modal,
    TouchableOpacity,
    Text,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
} from "react-native";

export default function SearchPopup({ visible, onClose, onSearch }) {
    const inputRef = useRef(null);

    useEffect(() => {
        if (visible && inputRef.current) {
            setTimeout(() => {
                inputRef.current.focus(); // ensures keyboard opens
            }, 100);
        }
    }, [visible]);

    return (
        <Modal
            visible={visible}
            transparent
            animationType="fade"
            onRequestClose={onClose}
        >
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : undefined}
                style={styles.overlay}
            >
                {/* Touchable to close if clicked outside the popup */}
                <TouchableOpacity style={styles.overlayTouchable} activeOpacity={1} onPress={onClose} />

                {/* Actual popup */}
                <View style={styles.container}>
                    <TextInput
                        ref={inputRef}
                        placeholder="Search..."
                        style={styles.input}
                        onChangeText={onSearch}
                    />
                    <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                        <Text style={styles.closeText}>X</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    overlayTouchable: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "rgba(0,0,0,0.5)",
    },
    container: {
        width: "90%",
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 15,
        zIndex: 2,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        padding: 10,
        fontSize: 16,
    },
    closeButton: {
        position: "absolute",
        top: 10,
        right: 10,
        padding: 5,
    },
    closeText: {
        fontSize: 18,
        fontWeight: "bold",
    },
});
