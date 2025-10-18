import React from "react";
import { StyleSheet, ScrollView, View } from "react-native";
import { Header, Button } from "@rneui/base";
import ListItem from "./ListItem";
import Footer from "./Footer";

export default function ListView() {

const [listItems, setListItems] = React.useState([
    { id: 1, itemName: "Kjøttdeig 400g", brand: "Nortura", price: 73.9, count: 1 },
    { id: 2, itemName: "Kjøttdeig 400g, 14%", brand: "Rema 1000", price: 64.9, count: 1 },
    { id: 3, itemName: "Kjøttdeig 400g, 14%", brand: "Rema 1000", price: 64.7, count: 1 },
]);

const handleChangeCount = (id, newCount) => {
    setListItems((prev) =>
    prev
        .map((item) => (item.id === id ? { ...item, count: newCount } : item))
        .filter((item) => item.count > 0)
    );
};

const handleToggleChecked = (id) => {
    setListItems((prev) =>
    prev.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item))
    );
};

return (
    <View style={styles.container}>
        <Header
            backgroundColor="#171718"
            containerStyle={{ height: 80 }}
            rightComponent={
            <Button
                containerStyle={{ width: 130 }}
                buttonStyle={styles.payCTA}
                title="Betal"
                titleStyle={{ color: "#fff", fontFamily: "REMA-bold" }}
            />
            }
        />

        <ScrollView contentContainerStyle={styles.scrollContainer}>
            {listItems.map((item) => (
            <ListItem
                key={item.id}
                itemName={item.itemName}
                brand={item.brand}
                price={item.price}
                count={item.count}
                checked={item.checked || false}
                onChangeCount={(newCount) => handleChangeCount(item.id, newCount)}
                onToggleChecked={() => handleToggleChecked(item.id)}
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
        backgroundColor: "#fff",
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
