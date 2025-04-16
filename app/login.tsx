import { useState } from "react";
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import auth from "@react-native-firebase/auth";
import { FirebaseError } from "firebase/app"

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSignInWithEmail = async () => {
        try {
            await auth().signInWithEmailAndPassword(email, password);
        }
        catch (e: any) {
            const err = e as FirebaseError;
            alert("Registration failed: " + err.message);
        }
    }

    const handleSignInWithGoogle = () => {
        // do that later
    }

    return (
        <View style={styles.container}>
            <KeyboardAvoidingView behavior="padding" style={styles.inner}>
                <Text style={styles.title}>Log In</Text>
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
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />
                <TouchableOpacity style={styles.button} onPress={handleSignInWithEmail}>
                    <Text style={styles.buttonText} >Log In</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.googleButton} onPress={handleSignInWithGoogle}>
                    <Text style={styles.googleButtonText}>Sign in with Google</Text>
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
    title: {
        fontSize: 28,
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
    googleButton: {
        width: '100%',
        height: 50,
        borderColor: '#4e8cff',
        borderWidth: 1.5,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 12,
    },
    googleButtonText: {
        color: '#4e8cff',
        fontSize: 16,
        fontWeight: '500',
    },
})