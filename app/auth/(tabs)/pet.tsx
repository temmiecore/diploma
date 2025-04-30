import { Button, Image, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View, FlatList } from "react-native";
import auth from "@react-native-firebase/auth";
import { firebase } from '@react-native-firebase/database';
import { useCallback, useEffect, useState } from "react";
import { InventoryItem, Pet } from "@/helpers/types";
import { useFocusEffect, useRouter } from "expo-router";
import { styles } from "@/helpers/styles";
import { chooseIcon } from "@/helpers/pets";
import { chooseItemSprite } from "@/helpers/items";

export default function PetPage() {
    const router = useRouter();
    const [pet, setPet] = useState<Pet>();
    const [namePetMenuVisible, setNamePetMenuVisible] = useState<boolean>(false);
    const [petName, setPetName] = useState<string>("");

    const [foodItems, setFoodItems] = useState<any[]>([]);
    const [isFoodModalVisible, setIsFoodModalVisible] = useState(false);

    const database = firebase
        .app()
        .database("https://taskapet-9c229-default-rtdb.europe-west1.firebasedatabase.app/");

    const fetchPet = async () => {
        // get tasks from database
        const userId = auth().currentUser?.uid;
        const reference = database.ref(`/users/${userId}/pet`);

        reference.once('value', snapshot => {
            const data = snapshot.val();
            if (!data) {
                return;
            }

            setPet(data);
        })
    };

    const fetchFoodItems = async () => {
        const userId = auth().currentUser?.uid;
        const snapshot = await database.ref(`/users/${userId}/items`).once("value");
        const data = snapshot.val() || {};
        const foodList = Object.entries(data)
            .filter(([_, item]: any) => item.type === "food" && item.amount > 0)
            .map(([id, item]: any) => ({ id, ...item }));
        setFoodItems(foodList);
    };

    useFocusEffect(
        useCallback(() => {
            fetchPet();
        }, []) // Empty dependency array = run only on screen focus
    );


    const feedPet = async () => {
        await fetchFoodItems();
        setIsFoodModalVisible(true);
    }

    const useFoodItem = async (item: any) => {
        const userId = auth().currentUser?.uid;

        const newHealth = Math.min(pet?.health + item.health, pet?.maxHealth || 100);
        await database.ref(`/users/${userId}/pet`).update({
            health: newHealth,
            lastFedDate: new Date().toISOString()
        });

        const currentAmount = item.amount || 1;
        if (currentAmount > 1) {
            await database.ref(`/users/${userId}/items/${item.id}`).update({
                amount: currentAmount - 1
            });
        } else {
            await database.ref(`/users/${userId}/items/${item.id}`).remove();
        }

        setIsFoodModalVisible(false);
        fetchPet();
    };


    const determineStatus = (lastFedDateString: string, lastPlayedDateString: string) => {
        const oneDayAgo = new Date(new Date().getTime() - 24 * 60 * 60 * 1000);

        const lastFedDate = new Date(lastFedDateString);
        const lastPlayedDate = new Date(lastPlayedDateString);

        console.log("[AUTH/(TABS)/PET] Dates", lastFedDate, lastPlayedDate);

        if (lastFedDate <= oneDayAgo)
            if (lastPlayedDate <= oneDayAgo)
                return "Hungry & Bored";
            else
                return "Hungry";

        if (lastPlayedDate <= oneDayAgo)
            return "Bored";

        return "Happy & Well-rested";
    }

    const handlePetNameChange = async () => {
        const userId = auth().currentUser?.uid;

        await database
            .ref(`/users/${userId}/pet`)
            .update({ name: petName })

        fetchPet();
    }

    return (
        <View style={styles.containerCentered}>
            <View style={styles.imageWrapper}>
                <Image
                    source={chooseIcon(pet?.type)}
                    style={styles.petImage}
                />
            </View>

            <TouchableOpacity onPress={() => setNamePetMenuVisible(true)}>
                <Text style={styles.title} >
                    {pet?.name === "" ? "Name your pet!" : pet?.name}
                </Text>
            </TouchableOpacity>

            <Text style={[styles.text, { marginTop: 12 }]}>
                Health: {pet?.health} / {pet?.maxHealth}
            </Text>

            <Text style={styles.text}>
                Level: {pet?.level} | XP to next level: {100 - pet?.xp}
            </Text>

            <Text style={styles.text}>
                Armor: {pet?.armor} | Damage: {pet?.damage} | Speed: {pet?.speed}
            </Text>

            <Text style={[styles.text, { fontStyle: "italic" }]}>
                {"Status: " + determineStatus(pet?.lastFedDate, pet?.lastPlayedDate)}
            </Text>

            <TouchableOpacity style={[styles.buyButton, { marginVertical: 8 }]} onPress={() => feedPet()}>
                <Text style={styles.buttonText}>Feed the pet</Text>
            </TouchableOpacity>

            <View style={styles.buttonRow}>
                <TouchableOpacity style={[styles.button, { flex: 1 }]} onPress={() => router.navigate("../petPlay")}>
                    <Text style={styles.buttonText}>Play with pet</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.button, { flex: 1 }]} onPress={() => router.navigate("../petBattle")}>
                    <Text style={styles.buttonText}>Go on adventure!</Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity style={[styles.button, { width: "80%" }]} onPress={() => { router.navigate("../inventory") }}>
                <Text style={styles.buttonText}> Inventory </Text>
            </TouchableOpacity>

            <Modal visible={namePetMenuVisible} transparent animationType="fade">
                <TouchableOpacity style={styles.modalOverlay} onPress={() => setNamePetMenuVisible(false)}>
                    <View style={styles.menu}>
                        <Text style={{ fontSize: 16, marginBottom: 8 }}>Enter your pets name!</Text>
                        <TextInput
                            style={styles.input}
                            value={petName}
                            onChangeText={setPetName}
                        />
                        <Button title="Apply" onPress={() => { handlePetNameChange(); setNamePetMenuVisible(false) }} />
                    </View>
                </TouchableOpacity>
            </Modal>

            <Modal visible={isFoodModalVisible} transparent>
                <TouchableOpacity style={styles.modalOverlay} onPress={() => setIsFoodModalVisible(false)}>
                    <View style={[styles.menu, { maxHeight: 400 }]}>
                        <Text style={{ fontSize: 16, marginBottom: 10 }}>Choose a food item:</Text>
                        {foodItems.length === 0 ? (
                            <Text>No food items available!</Text>
                        ) : (
                            <FlatList
                                data={foodItems}
                                keyExtractor={(item) => item.id}
                                renderItem={({ item }) => (
                                    <TouchableOpacity
                                        style={styles.itemRow}
                                        onPress={() => useFoodItem(item)}
                                    >
                                        <Image source={chooseItemSprite(item.id)} style={{ width: 16, height: 16, alignSelf: "center" }}></Image>
                                        <Text>{item.name} (+{item.health} HP)</Text>
                                    </TouchableOpacity>
                                )}
                            />
                        )}
                    </View>
                </TouchableOpacity>
            </Modal>
        </View>
    )
}