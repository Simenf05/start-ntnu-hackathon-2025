import React from "react";
import { StyleSheet, ScrollView, View } from "react-native";
import { Header, Button } from "@rneui/base";
import ListItem from "./ListItem";
import Footer from "./Footer";
import CustomHeader from "./CustomHeader";

export default function ListView(props) {

    const handleChangeCount = (id, newCount) => {
        props.setListItems((prev) =>
            prev
                .map((item) => (item.productId === id ? { ...item, count: newCount } : item))
                .filter((item) => item.count > 0)
        );
    };

    const handleToggleChecked = (id) => {
        props.setListItems((prev) =>
            prev.map((item) => (item.productId === id ? { ...item, checked: !item.checked } : item))
        );
    };

    return (
        <View style={styles.container}>
            <CustomHeader
                title="Handleliste"
                buttonTitle="Betal"
                onButtonPress={() => console.log("Button pressed!")}
                showBackButton={true}
                onBackPress={props.onBackPress}
            />


            <ScrollView contentContainerStyle={styles.scrollContainer}>
                {props.data.map((item) => (
                    <ListItem
                        key={item.productId}
                        name={item.name}
                        brand={
                            "" + Math.round(100 * (item.price / item.pricePerUnit)) / 100 + "" + item.unit
                        }
                        price={item.price}
                        count={item.count || 1}
                        checked={item.checked || false}
                        onChangeCount={(newCount) => handleChangeCount(item.productId, newCount)}
                        onToggleChecked={() => handleToggleChecked(item.productId)}
                    />
                ))}
            </ScrollView>

            <Footer sum={240} carbon={240.1} style={styles.footer} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1, // fills the available space in App
        backgroundColor: "#171718",
    },
    scrollContainer: {
        paddingBottom: 20,
    },
    footer: {

    },
    payCTA: {
        backgroundColor: "#183D9F",
        borderRadius: 5,
        paddingVertical: 15,
    },
});
