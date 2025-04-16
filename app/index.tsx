import { useRouter } from "expo-router";
import { useState } from "react";
import { Text, View, StyleSheet, KeyboardAvoidingView, TextInput, TouchableOpacity } from "react-native";

export default function Index() {
    const router = useRouter();

    const signIn = () => {
        router.navigate("/login");
    }

    const signUp = () => {
        router.navigate("/signup");
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome to TaskaPet!</Text>
            <TouchableOpacity style={styles.button} onPress={signIn}>
                <Text style={styles.buttonText} >Sign In</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={signUp}>
                <Text style={styles.buttonText} >Sign Up</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20,
        flex: 1,
        justifyContent: 'center',
        alignItems: "center",
    },
    input: {
        marginVertical: 4,
        height: 50,
        borderWidth: 1,
        borderRadius: 4,
        padding: 10,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 28,
        marginBottom: 16,
        fontWeight: '600',
        color: '#333',
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
})