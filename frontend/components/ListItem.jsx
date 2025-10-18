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

const gray = "#666";
const textGray = "#bdbdbd";
const darkGray = "#808080";

export default function ListItem(props) {
    // console.log(props)

    const [changeVisisble, setChangeVisisble] = useState(false);

    const checked = props.checked;
    const onToggleChecked  = () => props.onToggleChecked();

    const ingredient = props.ingredient;

    return (
        <View style={{ backgroundColor: checked ? "#444" : "#2b2b2b" }}>
        <Pressable style={styles.tile} onPress={() => setChangeVisisble(true)}>
                <View style={[styles.checkbox, styles.general]}>
                    <CheckBox
                        
                        onPress={props.onToggleChecked}
                        checked={props.checked}
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
                    <Text style={{ fontWeight: "bold" , fontFamily: "REMA-regular", color: "#fff"}}>{props.name}</Text>
                    <Text style={{ color: textGray , fontFamily: "REMA-regular"}}>{props.brand}</Text>
                    <Text style={{ color: textGray , fontFamily: "REMA-regular"}}>{props.price}kr</Text>
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
        width: "62%",
    },
    amount: {
        width: "15%",
        flexDirection: "row",
        gap: 10,
        alignItems: "center",
    },
    amountButtons: {
        backgroundColor: darkGray,
        width: 32,
        justifyContent: "center",
        alignItems: "center",
        height: 32,
        borderRadius: 600,
    },
    amountText: {
        fontSize: 20,
        textAlign: "center",
        fontFamily: "REMA-regular",
        color: "#fff"
    },
});
