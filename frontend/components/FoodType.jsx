import React from "react";
import { Switch, Text, View } from "react-native";

export default function FoodType({ name }) {
    const [checked, setChecked] = React.useState(false);

    return (
        <View style={{
            paddingVertical: 10, 
            paddingHorizontal: 20,
            flexDirection: "row", 
            justifyContent: "space-between", 
            alignItems: "center",
            backgroundColor: "#2b2b2b",
            borderBottomWidth: 2,
            borderBottomColor: "#666",
        }}>
            <Text style={{color: "#fff", fontSize: 24}}>{name}</Text>
            <Switch
                style={{
                    transform: [{ scaleX: 1.3 }, { scaleY: 1.3 }],
                }}
                trackColor={{ false: "#747474", true: "#77abd8" }}
                thumbColor={checked ? "#1c6aaeff" : "#fff"}
                value={checked}
                onValueChange={() => setChecked(!checked)}
            />
        </View>
    );
}
