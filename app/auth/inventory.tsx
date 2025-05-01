import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, Image, StyleSheet, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import auth from '@react-native-firebase/auth';
import { firebase } from '@react-native-firebase/database';
import { chooseItemSprite } from '@/helpers/items';
import { InventoryItem } from '@/helpers/types';
import { useTheme } from '@/helpers/themeContext';
import { createStyles } from '@/helpers/styles';

export default function InventoryPage() {
    const [items, setItems] = useState<InventoryItem[]>([]);
    const router = useRouter();

    const { theme } = useTheme();
    const styles = createStyles(theme);

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
            <Image source={chooseItemSprite(item.id)} style={{ width: 64, height: 64 }}></Image>
            <Text style={[styles.text, { fontSize: 16 }]}>{item.name}</Text>
            <Text style={styles.text}>X{item.amount}</Text>
            <Text style={[styles.text, { fontWeight: 600 }]}>{item.type == "food" ? "Food" : "Vanity"}</Text>
        </View>
    );

    return (
        <View style={styles.containerStretched}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Inventory</Text>
                <TouchableOpacity style={styles.exitButton} onPress={() => router.back()}>
                    <Text style={{ color: "red", fontSize: 16 }}>Exit</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={items}
                keyExtractor={(item) => item.id}
                numColumns={3}
                renderItem={renderItem}
                contentContainerStyle={styles.grid}
            />
        </View>
    );
}