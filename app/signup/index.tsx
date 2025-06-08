import { useState } from "react";
import { Alert, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useRouter } from "expo-router";
import auth from "@react-native-firebase/auth";
import { useUserStore } from "@/helpers/hooks/useUserStore";
import { User } from "@/helpers/types";
import { firebase } from '@react-native-firebase/database';
import { useTheme } from "@/helpers/themeContext";
import { createStyles } from "@/helpers/styles";

export default function SignUp() {
    const { setUser } = useUserStore();

    const [email, setEmail] = useState<string>("");
    const [password1, setPassword1] = useState<string>("");
    const [password2, setPassword2] = useState<string>("");

    const { theme } = useTheme();
    const styles = createStyles(theme);

    const router = useRouter();

    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    const database = firebase
        .app()
        .database("https://taskapet-9c229-default-rtdb.europe-west1.firebasedatabase.app/");

    const handleNext = async () => {
        if (!emailRegex.test(email)) {
            Alert.alert("Invalid email address!");
            return;
        }

        if (password1 !== password2) {
            Alert.alert("Passwords do not match!")
            return;
        }

        if (password1.length < 6) {
            Alert.alert("Password should be at least 6 characters long!")
            return;
        }

        try {
            const snapshot = await database.ref("/users").once("value");
            const usersObj = snapshot.val();

            if (usersObj) {
                const usersArray = Object.values(usersObj);

                // email is already used
                if (usersArray.find((user: any) => user.email === email)) {
                    Alert.alert("Email is already used!");
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
        <View style={[styles.containerStretched, { paddingHorizontal: 24 }]}>
            <KeyboardAvoidingView style={styles.containerInner} behavior="padding">
                <Text style={[styles.title, { marginBottom: 6 }]}>First time here?</Text>
                <Text style={[styles.titleSecondary, { marginBottom: 24 }]}>You know the drill!</Text>
                <Text style={styles.label}>Email</Text>
                <TextInput
                    style={[styles.input, { width: "100%" }]}
                    placeholder="example@gmail.com"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
                <Text style={styles.label}>Password</Text>
                <TextInput
                    style={[styles.input, { width: "100%" }]}
                    placeholder="**************"
                    testID="password1"
                    value={password1}
                    onChangeText={setPassword1}
                    secureTextEntry
                />
                <Text style={styles.label}>And password again!</Text>
                <TextInput
                    style={[styles.input, { width: "100%" }]}
                    placeholder="**************"
                    testID="password2"
                    value={password2}
                    onChangeText={setPassword2}
                    secureTextEntry
                />
                <TouchableOpacity style={[styles.button, { width: "100%" }]} onPress={handleNext}>
                    <Text style={styles.buttonText} >Next</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        </View>
    );
}