import { ShopItem } from "@/helpers/types";
import { useEffect, useState } from "react";
import auth from "@react-native-firebase/auth";
import { firebase } from '@react-native-firebase/database';
import { Alert, FlatList, Modal, Text, TouchableOpacity, View } from "react-native";
import { styles } from "@/helpers/styles";
import { useFocusEffect, useRouter } from "expo-router";

const foodItems = [
    { id: "apple", name: "Juicy Apple", type: "food", price: 10, health: 10 },
    { id: "carrot", name: "Crisp Carrot", type: "food", price: 15, health: 25 },
    { id: "pie", name: "Mysterious Pie", type: "food", price: 20, health: 50 },
];

const vanityItems = [
    { id: 'hat_red', name: 'Red Hat', type: 'vanity', price: 50 },
    { id: 'glasses_sun', name: 'Sunglasses', type: 'vanity', price: 75 },
];

export default function ShopPage() {
    const [coins, setCoins] = useState<number>(0);
    const [selectedItem, setSelectedItem] = useState<ShopItem | null>(null);
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

    const database = firebase
        .app()
        .database("https://taskapet-9c229-default-rtdb.europe-west1.firebasedatabase.app/");

    const router = useRouter();

    const fetchCoins = async () => {
        const userId = auth().currentUser?.uid;
        const reference = await database.ref(`/users/${userId}`);

        reference.once('value', snapshot => {
            const data = snapshot.val();
            if (!data) {
                return;
            }

            setCoins(data.coinAmount);
        })
    };

    useFocusEffect(() => {
        fetchCoins();
    });

    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={styles.itemCard}
            onPress={() => {
                setSelectedItem(item);
                setIsModalVisible(true);
            }}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemPrice}>{item.price}🪙</Text>
            { item.type == "food" && <Text style={styles.itemPrice}>Regenerates {item.health} HP.</Text> }
        </TouchableOpacity>
    );

    const handleBuy = async (item) => {
        if (coins < item.price) {
            Alert.alert("Not enough coins");
            return;
        }

        const userId = auth().currentUser?.uid;
        const itemRef = await database.ref(`/users/${userId}/items/${item.id}`);

        const currentItem = (await itemRef.once("value")).val();

        const newAmount = currentItem?.amount ? currentItem.amount + 1 : 1;

        await database.ref(`/users/${userId}`).update({ coinAmount: coins - item.price });

        if (item.type === "food")
            await database.ref(`/users/${userId}/items/${item.id}`).update({ id: item.id, name: item.name, type: item.type, amount: newAmount, health: item.health });
        else
            await database.ref(`/users/${userId}/items/${item.id}`).update({ id: item.id, name: item.name, type: item.type, amount: newAmount });

        setCoins(prev => prev - item.price);
        setIsModalVisible(false);
        Alert.alert("Purchased", `${item.name} added to your inventory.`);
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Shop</Text>
                <Text style={styles.headerTitle}>{coins}🪙</Text>
            </View>
            <Text style={styles.sectionTitle}>Food</Text>
            <FlatList
                data={foodItems}
                horizontal
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                style={styles.list}
            />

            <Text style={styles.sectionTitle}>Vanity</Text>
            <FlatList
                data={vanityItems}
                horizontal
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                style={styles.list}
            />

            <Modal visible={isModalVisible} transparent animationType="slide">
                <View style={styles.modalBackground}>
                    <View style={styles.modalCard}>
                        <Text style={styles.modalTitle}>{selectedItem?.name}</Text>
                        <Text style={{ marginBottom: 10 }}>Price: {selectedItem?.price}🪙</Text>
                        {selectedItem?.type === 'food' && (
                            <Text>Health Gain: {selectedItem.health}</Text>
                        )}
                        <View style={styles.modalButtons}>
                            <TouchableOpacity style={styles.buyButton} onPress={() => handleBuy(selectedItem)}>
                                <Text style={styles.buttonText}>Buy</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.cancelButton} onPress={() => setIsModalVisible(false)}>
                                <Text style={styles.buttonText}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View >
    );
}