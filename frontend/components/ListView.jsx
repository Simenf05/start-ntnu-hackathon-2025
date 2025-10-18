import React from "react";
import { StyleSheet, ScrollView, View } from "react-native";
import { Header, Button } from "@rneui/base";
import ListItem from "./ListItem";
import Footer from "./Footer";
import CustomHeader from "./CustomHeader";
import SearchPopup from "./SearchPopup";

export default function ListView(props) {

    const [searchVisible, setSearchVisible] = React.useState(false); 

    const test = true

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

    // Calculate total price and carbon footprint based on count - only for checked items
    const totalPrice = props.data.reduce((sum, item) => {
        if (item.checked) {
            return sum + (item.price * item.count);
        }
        return sum;
    }, 0);

    const totalCarbonGrams = props.data.reduce((sum, item) => {
        if (item.checked) {
            return sum + ((item.carbonFootprintGram || 0) * item.count);
        }
        return sum;
    }, 0);

    // Convert grams to kg for display
    const totalCarbonKg = totalCarbonGrams / 1000;

    return (
        <View style={styles.container}>
            <CustomHeader
                title="Handleliste"
                buttonTitle="Betal"
                onButtonPress={() => console.log("Button pressed!")}
                showBackButton={true}
                onBackPress={props.onBackPress}
            />

            {test && <SearchPopup 
                visible={searchVisible}
                onClose={() => setSearchVisible(false)}
                onSearch={(text) => console.log("Searching for:", text)}
            />}

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

            <Footer sum={totalPrice.toFixed(2)} carbon={totalCarbonKg.toFixed(2)} style={styles.footer} onSearch={() => setSearchVisible(!searchVisible)} />
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
