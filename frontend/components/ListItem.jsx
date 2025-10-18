import { useState } from "react";
import {
    Text,
    View,
    StyleSheet,
    Pressable,
    TouchableOpacity,
} from "react-native";
import { Button, CheckBox } from "@rneui/base";
import { FontAwesome } from "@expo/vector-icons";
import ChangeIngredient from "./ChangeIngredient";

const gray = "rgba(187, 187, 187, 1)";
const textGray = "rgba(99, 99, 99, 1)";
const lightGray = "rgba(230, 230, 230, 1)";

export default function ListItem(props) {
    // const [checked, setChecked] = React.useState(false)
    // const toggleChecked = () => setChecked(!checked)

    const [changeVisisble, setChangeVisisble] = useState(false);

    const checked = props.checked;
    const onToggleChecked = () => props.onToggleChecked();

    const ingredient = props.ingredient;

    // const incrementCount = () => setCount(count + 1)
    // const decrementCount = () => setCount(count - 1)

    return (
        <View style={{ backgroundColor: checked ? "#eee" : "#fff" }}>
        <Pressable style={styles.tile} onPress={() => setChangeVisisble(true)}>
                <View style={[styles.checkbox, styles.general]}>
                    <CheckBox
                        onPress={() => toggleChecked()}
                        checked={checked}
                        size={36}
                        checkedIcon="check-square"
                        uncheckedIcon="square"
                        containerStyle={{
                            padding: 0,
                            margin: 0,
                            backgroundColor: "transparent",
                        }}
                    ></CheckBox>
                </View>
                <View
                    style={[
                        styles.itemInfo,
                        styles.general,
                        { opacity: checked ? 0.5 : 1 },
                    ]}
                >
                    <Text style={{ fontWeight: "bold" }}>{props.itemName}</Text>
                    <Text style={{ color: textGray }}>{props.brand}</Text>
                    <Text style={{ color: textGray }}>{props.price}kr</Text>
                </View>
                <View
                    style={[
                        styles.amount,
                        styles.general,
                        { opacity: checked ? 0.5 : 1 },
                    ]}
                >
                    <Pressable
                        onPress={() => props.onChangeCount(props.count - 1)}
                        style={styles.amountButtons}
                    >
                        <Text style={styles.amountText}>-</Text>
                    </Pressable>
                    <Text style={styles.amountText}>{props.count}</Text>
                    <Pressable
                        onPress={() => props.onChangeCount(props.count + 1)}
                        style={styles.amountButtons}
                    >
                        <Text style={styles.amountText}>+</Text>
                    </Pressable>
                </View>
            <ChangeIngredient
                visible={changeVisisble}
                setVisible={setChangeVisisble}
                ingredient={ingredient}
            />
        </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    tile: {
        width: "100%",
        borderBottomWidth: 2,
        borderBottomColor: gray,
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 10,
    },
    general: {
        justifyContent: "center",
    },
    checkbox: {
        width: "15%",
        alignItems: "center",
    },
    itemInfo: {
        width: "60%",
    },
    amount: {
        width: "15%",
        flexDirection: "row",
        gap: 10,
        alignItems: "center",
    },
    amountButtons: {
        backgroundColor: lightGray,
        width: 40,
        justifyContent: "center",
        alignItems: "center",
        height: 40,
        borderRadius: 600,
    },
    amountText: {
        fontSize: 20,
        textAlign: "center",
    },
});
