import { chooseIcon, pets } from "@/helpers/pets";
import { Pet } from "@/helpers/types";
import { useUserStore } from "@/helpers/useUserStore";
import { useRouter } from "expo-router";
import { useState } from "react";
import { FlatList, Image, KeyboardAvoidingView, StyleSheet, Text, TouchableOpacity, View } from "react-native";


export default function choosePet() {
    const [selectedPet, setSelectedPet] = useState<Pet | null>(null);

    const { user, updateUser } = useUserStore();

    const router = useRouter();

    const handleNext = () => {
        if (selectedPet) {
            updateUser({
                pet: selectedPet,
            });
            console.log(user);

            router.navigate("/signup/finishSignUp");
        }
        else
            alert("Select pet first!"); //later - make the button grayed out before user chooses pet
    };

    const renderPet = ({ item }: { item: Pet }) => (
        <TouchableOpacity
            style={[
                styles.petIconWrapper,
                selectedPet?.id === item.id && styles.petIconSelected,
            ]}
            onPress={() => setSelectedPet(item)}
        >
            <Image source={chooseIcon(item.type)} style={styles.petIcon} />
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <KeyboardAvoidingView style={styles.inner} behavior="padding" >
                <Text style={styles.titleTop}>Choose your pet!</Text>

                <FlatList
                    data={pets}
                    renderItem={renderPet}
                    keyExtractor={(item) => item.id}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.petList}
                />

                {selectedPet && (
                    <View style={styles.petDetails}>
                        <Text style={styles.detailText}>Type: {selectedPet.type}</Text>
                        <Text style={styles.detailText}>Health: {selectedPet.health}</Text>
                        <Text style={styles.detailText}>Speed: {selectedPet.speed}</Text>
                        <Text style={styles.detailText}>Armor: {selectedPet.armor}</Text>
                        <Text style={styles.detailText}>Damage: {selectedPet.damage}</Text>
                    </View>
                )}

                <TouchableOpacity
                    style={[
                        styles.button,
                        !selectedPet && { backgroundColor: '#ccc' },
                    ]}
                    onPress={handleNext}
                    disabled={!selectedPet}
                >
                    <Text style={styles.buttonText}>Next</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20,
    },
    inner: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
        backgroundColor: '#fff',
    },
    titleTop: {
        fontSize: 28,
        marginBottom: 32,
        fontWeight: '600',
        color: '#333',
    },
    petList: {
        paddingVertical: 8,
    },
    petIconWrapper: {
        borderWidth: 2,
        borderColor: 'transparent',
        borderRadius: 12,
        padding: 8,
        marginHorizontal: 8,
        backgroundColor: '#f0f0f0',
        height: "100%",
        
    },
    petIconSelected: {
        borderColor: '#4e8cff',
        backgroundColor: '#e0f0ff',
    },
    petIcon: {
        width: 160,
        height: 160,
        resizeMode: 'contain',
    },
    petDetails: {
        marginTop: 24,
        alignItems: 'center',
    },
    detailText: {
        fontSize: 16,
        marginBottom: 4,
    },
    button: {
        width: '100%',
        height: 50,
        backgroundColor: '#4e8cff',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 32,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
    },
});