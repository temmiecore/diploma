import { Button, Image, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import auth from "@react-native-firebase/auth";
import { firebase } from '@react-native-firebase/database';
import { useEffect, useState } from "react";
import { Pet } from "@/helpers/types";
import { useRouter } from "expo-router";
import { styles } from "@/helpers/styles";

export default function PetPage() {
    const router = useRouter();
    const [pet, setPet] = useState<Pet>();
    const [namePetMenuVisible, setNamePetMenuVisible] = useState<boolean>(false);
    const [petName, setPetName] = useState<string>("");

    const database = firebase
        .app()
        .database("https://taskapet-9c229-default-rtdb.europe-west1.firebasedatabase.app/");

    const fetchPet = async () => {
        // get tasks from database
        const userId = auth().currentUser?.uid;
        const reference = database.ref(`/users/${userId}/pet`);

        reference.on('value', snapshot => {
            const data = snapshot.val();
            if (!data) {
                return;
            }

            setPet(data);
        })
    };

    useEffect(() => {
        fetchPet();
    }, []);

    const chooseIcon = (type: string) => {
        switch (type) {
            case "Pichi": return require("@/assets/images/pichi.png");
            case "Char": return require("@/assets/images/char.png");
            case "Flower": return require("@/assets/images/flower.png");
            case "Water": return require("@/assets/images/water.png");
        }
    }

    const feedPet = async () => {
        // IF USER HAS FOOD AVAILABLE
        const userId = auth().currentUser?.uid;

        await database
            .ref(`/users/${userId}/pet`)
            .update({ lastFedDate: new Date().toISOString() })

        fetchPet();
        determineStatus(pet?.lastFedDate, pet?.lastPlayedDate);
    }

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
                <Text style={styles.petName} >
                    {pet?.name === "" ? "Name your pet!" : pet?.name}
                </Text>
            </TouchableOpacity>

            <Text style={styles.statText}>
                Health: {pet?.health} / {pet?.maxHealth}
            </Text>

            <Text style={styles.statText}>
                Level: {pet?.level} | XP to next level: {100 - pet?.xp}
            </Text>

            <Text style={styles.statText}>
                Armor: {pet?.armor} | Damage: {pet?.damage} | Speed: {pet?.speed}
            </Text>

            <Text style={styles.statusText}>
                {"Status: " + determineStatus(pet?.lastFedDate, pet?.lastPlayedDate)}
            </Text>

            <TouchableOpacity style={styles.feedButton} onPress={() => feedPet()}>
                <Text style={styles.buttonText}>Feed the pet</Text>
            </TouchableOpacity>

            <View style={styles.buttonRow}>
                <TouchableOpacity style={[styles.button, {flex: 1}]} onPress={() => router.navigate("../petPlay")}>
                    <Text style={styles.buttonText}>Play with pet</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.button, {flex: 1}]} onPress={() => router.navigate("../petBattle")}>
                    <Text style={styles.buttonText}>Go on adventure!</Text>
                </TouchableOpacity>
            </View>

            <Modal visible={namePetMenuVisible} transparent animationType="fade">
                <TouchableOpacity style={styles.modalOverlay} onPress={() => setNamePetMenuVisible(false)}>
                    <View style={styles.menu}>
                        <Text style={{ fontSize: 16, marginBottom: 8 }}>Enter your pets name!</Text>
                        <TextInput
                            style={styles.textInput}
                            value={petName}
                            onChangeText={setPetName}
                        />
                        <Button title="Apply" onPress={() => { handlePetNameChange(); setNamePetMenuVisible(false) }} />
                    </View>
                </TouchableOpacity>
            </Modal>
        </View>
    )
}