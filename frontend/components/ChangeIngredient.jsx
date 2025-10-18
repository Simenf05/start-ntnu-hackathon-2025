import { Modal, View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function ChangeIngredient({ visible, setVisible, ingredient }) {

    return (
        <View style={styles.container}>

            <Modal
                animationType="slide"
                transparent={false}
                visible={visible}
                onRequestClose={() => setVisible(false)}
            >
                <View style={styles.fullscreenContainer}>
                    <Text style={styles.title}>{ingredient.name}</Text>
                    <Text style={styles.title}>Kan byttes ut med:</Text>
                    <TouchableOpacity
                        onPress={() => setVisible(false)}
                        style={styles.closeButton}
                    >
                        <Text style={styles.closeText}>Close</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: "center", alignItems: "center" },
    button: { backgroundColor: "#007AFF", padding: 15, borderRadius: 8 },
    buttonText: { color: "#fff", fontSize: 16 },
    fullscreenContainer: {
        flex: 1,
        backgroundColor: "#fff",
        padding: 20,
        justifyContent: "center",
        alignItems: "center",
    },
    title: { fontSize: 24, marginBottom: 20 },
    closeButton: { backgroundColor: "#FF3B30", padding: 12, borderRadius: 8 },
    closeText: { color: "#fff", fontSize: 16 },
});
