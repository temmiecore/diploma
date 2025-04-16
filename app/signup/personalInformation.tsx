import { useState } from "react";
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Picker } from '@react-native-picker/picker';
import { useRouter } from "expo-router";
import { useUserStore } from "@/helpers/useUserStore";

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
        <View style={styles.container}>
            <KeyboardAvoidingView style={styles.inner} behavior="padding">
                <Text style={styles.titleTop}>Personal Information</Text>
                <Text style={styles.title}>Now, we just need a couple more things!</Text>

                <Text style={styles.text}>Name. Doesn't have to be your legal one, just use whatever you prefer!</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Your name"
                    value={name}
                    onChangeText={setName}
                />

                <Text style={styles.text}>Age. Optional</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Your age"
                    value={age}
                    onChangeText={setAge}
                    keyboardType="numeric"
                />

                <Text style={styles.text}>Gender. Optional</Text>
                <View style={styles.pickerContainer}>
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

                <TouchableOpacity style={styles.button} onPress={handleNext}>
                    <Text style={styles.buttonText}>Next</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20,
        flex: 1,
    },
    inner: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
        backgroundColor: '#fff',
    },
    titleTop: {
        fontSize: 28,
        marginBottom: 24,
        fontWeight: '600',
        color: '#333',
    },
    title: {
        fontSize: 20,
        marginBottom: 24,
        fontWeight: '500',
        color: '#333',
        textAlign: 'center',
    },
    text: {
        marginBottom: 8,
        fontSize: 16,
        alignSelf: 'flex-start',
    },
    input: {
        width: '100%',
        height: 50,
        backgroundColor: '#f0f0f0',
        borderRadius: 10,
        borderWidth: 1,
        paddingHorizontal: 16,
        marginBottom: 16,
        fontSize: 16,
    },
    pickerContainer: {
        width: '100%',
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#ccc',
        marginBottom: 16,
        overflow: 'hidden',
        backgroundColor: '#f0f0f0',
    },
    picker: {
        height: 50,
        width: '100%',
    },
    button: {
        width: '100%',
        height: 50,
        backgroundColor: '#4e8cff',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 8,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
    },
});