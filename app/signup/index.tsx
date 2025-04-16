import { useState } from "react";
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useRouter } from "expo-router";
import auth from "@react-native-firebase/auth";
import { useUserStore } from "@/helpers/useUserStore";
import { User } from "@/helpers/types";
import { firebase } from '@react-native-firebase/database';

export default function SignUp() {
    const { setUser } = useUserStore();

    const [email, setEmail] = useState<string>("");
    const [password1, setPassword1] = useState<string>("");
    const [password2, setPassword2] = useState<string>("");

    const router = useRouter();

    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    const database = firebase
        .app()
        .database("https://taskapet-9c229-default-rtdb.europe-west1.firebasedatabase.app/");

    const handleNext = async () => {
        if (!emailRegex.test(email)) {
            alert("Invalid email address!");
            return;
        }

        if (password1 !== password2) {
            alert("Your passwords are not matching!")
            return;
        }

        if (password1.length < 6) {
            alert("Your password should be at least 6 characters long!")
            return;
        }

        try {
            const snapshot = await database.ref("/users").once("value");
            const usersObj = snapshot.val();

            if (usersObj) {
                const usersArray = Object.values(usersObj);

                // email is already used
                if (usersArray.find((user: any) => user.email === email)) {
                    alert("User with this email already exists!");
                    return;
                }
            }
            
            const newUser: User = {
                email,
                password: password1,
                name: '',
                age: '',
                gender: '',
                tasks: [],
                pet: null,
                coinAmount: 0,
                profileImage: null,
            };

            setUser(newUser);
            console.log(newUser);

            router.navigate("/signup/personalInformation");

        } catch (e: any) {
            console.error("Error checking email: ", e);
        }

    }

    return (
        <View style={styles.container}>
            <KeyboardAvoidingView style={styles.inner} behavior="padding">
                <Text style={styles.titleTop} >First time here?</Text>
                <Text style={styles.title}>You know the drill!</Text>
                <Text style={styles.text}>Email</Text>
                <TextInput
                    style={styles.input}
                    placeholder="example@gmail.com"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
                <Text style={styles.text}>Password</Text>
                <TextInput
                    style={styles.input}
                    placeholder="**************"
                    value={password1}
                    onChangeText={setPassword1}
                    secureTextEntry
                />
                <Text style={styles.text}>And password again!</Text>
                <TextInput
                    style={styles.input}
                    placeholder="**************"
                    value={password2}
                    onChangeText={setPassword2}
                    secureTextEntry
                />
                <TouchableOpacity style={styles.button} onPress={handleNext}>
                    <Text style={styles.buttonText} >Next</Text>
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
        marginBottom: 32,
        fontWeight: '600',
        color: '#333',
    },
    title: {
        fontSize: 24,
        marginBottom: 32,
        fontWeight: '600',
        color: '#333',
    },
    text: {
        marginBottom: 8,
        fontSize: 16,
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