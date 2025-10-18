import { useState, useEffect } from "react"
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import ListItem from './components/ListItem'

export default function App() {

    const API_URL = 'http://10.10.30.113:5000/'

    const [data, setData] = useState()

    useEffect(() => {
        (async () => {
            const resp = await fetch(`${API_URL}/api/search/name?name=kjøtt`)
            const json = await resp.json()
            setData(json)
        })()
    }, [])

    const [listItems, setListItems] = useState([
        { id: 0, itemName: "Kjøttdeig 400g", brand: "Nortura", price: 73.9, count: 1 },
        { id: 1, itemName: "Kjøttdeig 400g, 14%", brand: "Rema 1000", price: 64.9, count: 1 }
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
            <StatusBar style="auto" />
            
            {data && data.map((ingredient, index) => (
                <ListItem
                    key={index}
                    itemName={ingredient.name}
                    brand={ingredient.brand}
                    price={ingredient.price}
                    count={1}
                    onChangeCount={(newCount) => handleChangeCount(index, newCount)}
                    checked={ingredient.checked || false}
                    onToggleChecked={() => handleToggleChecked(index)}
                    ingredient={ingredient}
                />
            ))}

            {/*listItems.map(item => (
                <ListItem
                    key={item.id}
                    itemName={item.itemName}
                    brand={item.brand}
                    price={item.price}
                    count={item.count}
                    onChangeCount={(newCount) => handleChangeCount(item.id, newCount)}
                    ingredient={data[item.id]}
                />
            ))*/}

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
