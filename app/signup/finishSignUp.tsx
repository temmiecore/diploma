import { KeyboardAvoidingView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import auth from "@react-native-firebase/auth";
import { FirebaseError } from "firebase/app";
import { firebase } from '@react-native-firebase/database';
import { useUserStore } from "@/helpers/useUserStore";
import { uid } from 'uid';

export default function finishSignUp() {
    const { user, updateUser } = useUserStore();

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

                // create test tasks (ugh)
                for (let i = 0; i < 3; i++) {
                    const taskId: string = uid();
                    const date: string = new Date().toISOString();

                    database
                        .ref(`/users/${userId}/tasks/${taskId}`)
                        .set({ id: taskId, title: "Task Name", description: "Description goes here!", deadline: date, tags: ["important", "school"], difficulty: "Hard", isCompleted: false });
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
        <View style={styles.container}>
            <KeyboardAvoidingView style={styles.inner} behavior="padding">
                <Text style={styles.titleTop}>And you're done!</Text>
                <Text style={styles.title}>Thank you for using TaskaPet!</Text>

                <TouchableOpacity style={styles.button} onPress={handleSignUp}>
                    <Text style={styles.buttonText}>Sign Up</Text>
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

