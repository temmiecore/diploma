import { Button, Image, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import auth from "@react-native-firebase/auth";
import { firebase } from '@react-native-firebase/database';
import { useEffect, useState } from "react";
import { Pet } from "@/helpers/types";
import { useRouter } from "expo-router";

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
        <View style={styles.container}>
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
                Health: {pet?.health}
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
                <TouchableOpacity style={styles.button} onPress={() => router.navigate("../petPlay")}>
                    <Text style={styles.buttonText}>Play with pet</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={() => router.navigate("../petBattle")}>
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        backgroundColor: '#fff',
    },
    imageWrapper: {
        width: 150,
        height: 150,
        borderRadius: 75,
        overflow: 'hidden',
        marginBottom: 20,
        borderWidth: 3,
        borderColor: '#ccc',
    },
    petImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    petName: {
        fontSize: 24,
        marginVertical: 4,
    },
    statText: {
        fontSize: 18,
        marginVertical: 4,
    },
    statusText: {
        fontSize: 18,
        fontStyle: 'italic',
        marginTop: 10,
        marginBottom: 30,
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: 10,
        alignSelf: "flex-end",
    },
    feedButton: {
        backgroundColor: '#4CAF50',
        padding: 12,
        borderRadius: 8,
        marginHorizontal: 5,
        marginBottom: 8,
        alignItems: 'center',
    },
    button: {
        flex: 1,
        backgroundColor: '#4CAF50',
        padding: 12,
        borderRadius: 8,
        marginHorizontal: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.3)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    menu: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 20,
        minWidth: 220,
        gap: 8
    },
    textInput: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 8,
        borderRadius: 6,
        marginBottom: 12,
    }
});