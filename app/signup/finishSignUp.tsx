import { KeyboardAvoidingView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import auth from "@react-native-firebase/auth";
import { FirebaseError } from "firebase/app";
import { firebase } from '@react-native-firebase/database';
import { useUserStore } from "@/helpers/useUserStore";
import { uid } from 'uid';
import { useTheme } from "@/helpers/themeContext";
import { createStyles } from "@/helpers/styles";

export default function finishSignUp() {
    const { user, updateUser } = useUserStore();

    const { theme } = useTheme();
    const styles = createStyles(theme);

    const database = firebase
        .app()
        .database("https://taskapet-9c229-default-rtdb.europe-west1.firebasedatabase.app/");

    const handleSignUp = async () => {
        try {
            // create user in AUTH
            if (user?.email && user?.password) {
                const userCredentials = await auth().createUserWithEmailAndPassword(user.email, user.password);

                // get UID
                const userId = userCredentials.user.uid;

                const userWithoutPassword = user;
                delete userWithoutPassword.password;

                // create user in DATABASE
                database
                    .ref(`/users/${userId}`)
                    .set(userWithoutPassword);

                // create test tasks
                for (let i = 0; i < 5; i++) {
                    const taskId: string = uid();
                    const date: string = new Date().toISOString();

                    database
                        .ref(`/users/${userId}/tasks/${taskId}`)
                        .set({
                            id: taskId,
                            title: "Task Name",
                            description: "Description goes here!",
                            deadline: date,
                            tags: ["important", "school"],
                            difficulty: "Hard",
                            isCompleted: false,
                            isRepeated: false,
                            repeatInterval: -1,
                        });
                }

                console.log("uid: ", uid);
            }
        }
        catch (e: any) {
            const err = e as FirebaseError;
            alert("Registration failed: " + err.message);
        }
    };

    return (
        <View style={[styles.containerStretched, { paddingHorizontal: 12 }]}>
            <KeyboardAvoidingView style={styles.containerInner} behavior="padding">
                <Text style={[styles.title, { marginBottom: 6 }]}>And you're done!</Text>
                <Text style={[styles.titleSecondary, { marginBottom: 24 }]}>Thank you for using TaskaPet!</Text>

                <TouchableOpacity style={[styles.button, { width: "100%" }]} onPress={handleSignUp}>
                    <Text style={styles.buttonText}>Sign Up</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        </View>
    );
}
