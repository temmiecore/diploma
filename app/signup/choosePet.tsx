import { chooseIcon, pets } from "@/helpers/pets";
import { createStyles } from "@/helpers/styles";
import { useTheme } from "@/helpers/themeContext";
import { Pet } from "@/helpers/types";
import { useUserStore } from "@/helpers/useUserStore";
import { useRouter } from "expo-router";
import { useState } from "react";
import { FlatList, Image, KeyboardAvoidingView, StyleSheet, Text, TouchableOpacity, View } from "react-native";


export default function ChoosePet() {
    const [selectedPet, setSelectedPet] = useState<Pet | null>(null);

    const { user, updateUser } = useUserStore();

    const { theme } = useTheme();
    const styles = createStyles(theme);

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
        <View style={[styles.containerStretched, { paddingVertical: 32 }]}>
            <KeyboardAvoidingView style={styles.containerInner} behavior="padding" >
                <Text style={[styles.title, { marginBottom: 24 }]}>Choose your pet!</Text>

                <FlatList
                    data={pets}
                    renderItem={renderPet}
                    keyExtractor={(item) => item.id}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ paddingVertical: 8, marginHorizontal: 16 }}
                />

                {selectedPet && (
                    <View style={styles.petDetails}>
                        <Text style={styles.text}>Type: {selectedPet.type}</Text>
                        <Text style={styles.text}>Health: {selectedPet.health}</Text>
                        <Text style={styles.text}>Speed: {selectedPet.speed}</Text>
                        <Text style={styles.text}>Armor: {selectedPet.armor}</Text>
                        <Text style={styles.text}>Damage: {selectedPet.damage}</Text>
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