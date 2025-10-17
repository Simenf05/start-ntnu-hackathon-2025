import React from "react"
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import ListItem from './components/ListItem'
import Footer from "./components/Footer";

export default function App() {

    const [listItems, setListItems] = React.useState([
        { id: 1, itemName: "Kjøttdeig 400g", brand: "Nortura", price: 73.9, count: 1 },
        { id: 2, itemName: "Kjøttdeig 400g, 14%", brand: "Rema 1000", price: 64.9, count: 1 },
        { id: 3, itemName: "Kjøttdeig 400g, 14%", brand: "Rema 1000", price: 64.9, count: 1 }
    ]);

    const handleChangeCount = (id, newCount) => {
        setListItems(prev =>
            prev
                .map(item => item.id === id ? { ...item, count: newCount } : item)
                .filter(item => item.count > 0)
        );
    };

    const handleToggleChecked = (id) => {
        setListItems(prev =>
            prev.map(item => item.id === id ? { ...item, checked: !item.checked } : item)
        );
        };

    return (
        <View style={styles.container}>
            <Text></Text>
            <StatusBar style="auto" />
            {listItems.map(item => (
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
            <Footer sum={240} carbon={240.1} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: 100,
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
