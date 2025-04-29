import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, Image, StyleSheet, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import auth from '@react-native-firebase/auth';
import { firebase } from '@react-native-firebase/database';

const { width } = Dimensions.get('window');
const ITEM_SIZE = width / 3 - 20;

type InventoryItem = {
    id: string;
    name: string;
    type: 'food' | 'vanity';
    icon?: string; // optional icon URL or local image path
};

export default function InventoryPage() {
    const [items, setItems] = useState<InventoryItem[]>([]);
    const router = useRouter();

    useEffect(() => {
        const fetchInventory = async () => {
            const userId = auth().currentUser?.uid;
            if (!userId) return;

            const snapshot = await firebase
                .app()
                .database('https://taskapet-9c229-default-rtdb.europe-west1.firebasedatabase.app/')
                .ref(`/users/${userId}/items`)
                .once('value');

            const data = snapshot.val() || {};
            const itemList: InventoryItem[] = Object.entries(data).map(([id, value]: any) => ({
                id,
                ...value,
            }));
            setItems(itemList);
        };

        fetchInventory();
    }, []);

    const renderItem = ({ item }: { item: InventoryItem }) => (
        <View style={styles.item}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.name}>{item.type == "food" ? "Food" : "Vanity" }</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Inventory</Text>

            <FlatList
                data={items}
                keyExtractor={(item) => item.id}
                numColumns={3}
                renderItem={renderItem}
                contentContainerStyle={styles.grid}
            />

            <TouchableOpacity style={styles.exitButton} onPress={() => router.back()}>
                <Text style={styles.exitText}>Exit</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 60,
        paddingHorizontal: 12,
        backgroundColor: '#f4f4f4',
    },
    header: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    grid: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    item: {
        width: ITEM_SIZE,
        height: ITEM_SIZE + 20,
        margin: 10,
        borderRadius: 10,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 2,
    },
    icon: {
        width: ITEM_SIZE * 0.6,
        height: ITEM_SIZE * 0.6,
    },
    name: {
        marginTop: 6,
        fontSize: 14,
        textAlign: 'center',
    },
    exitButton: {
        position: 'absolute',
        bottom: 30,
        alignSelf: 'center',
        backgroundColor: '#333',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 10,
    },
    exitText: {
        color: '#fff',
        fontSize: 16,
    },
});
