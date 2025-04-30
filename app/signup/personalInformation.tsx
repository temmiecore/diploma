import { useState } from "react";
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Picker } from '@react-native-picker/picker';
import { useRouter } from "expo-router";
import { useUserStore } from "@/helpers/useUserStore";
import { styles } from "@/helpers/styles";

export default function PersonalInformation() {
    const [name, setName] = useState<string>('');
    const [age, setAge] = useState<string>('');
    const [gender, setGender] = useState<string>('');

    const { user, updateUser } = useUserStore();

    const router = useRouter();

    const handleNext = () => {
        updateUser({ name: name, age: age, gender: gender });

        console.log(user);

        router.navigate("/signup/choosePet");
    };

    return (
        <View style={[styles.containerStretched, { paddingHorizontal: 24 }]}>
            <KeyboardAvoidingView style={styles.containerInner} behavior="padding">
                <Text style={[styles.title, { marginBottom: 6 }]}>Personal Information</Text>
                <Text style={[styles.titleSecondary, { marginBottom: 24 }]}>Now, we just need a couple more things!</Text>

                <Text style={styles.label}>Name. Doesn't have to be your legal one, just use whatever you prefer!</Text>
                <TextInput
                    style={[styles.input, { width: "100%" }]}
                    placeholder="Your name"
                    value={name}
                    onChangeText={setName}
                />

                <Text style={styles.label}>Age. Optional</Text>
                <TextInput
                    style={[styles.input, { width: "100%" }]}
                    placeholder="Your age"
                    value={age}
                    onChangeText={setAge}
                    keyboardType="numeric"
                />

                <Text style={styles.label}>Gender. Optional</Text>
                <View style={[styles.pickerContainer, { width: "100%" }]}>
                    <Picker
                        selectedValue={gender}
                        onValueChange={(itemValue) => setGender(itemValue)}
                        style={styles.picker}
                    >
                        <Picker.Item label="Select gender" value="" />
                        <Picker.Item label="Male" value="M" />
                        <Picker.Item label="Female" value="F" />
                        <Picker.Item label="Other" value="Other" />
                    </Picker>
                </View>

                <TouchableOpacity style={[styles.button, { width: "100%" }]} onPress={handleNext}>
                    <Text style={styles.buttonText}>Next</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        </View>
    );
}