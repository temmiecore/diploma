import { createStyles } from "@/helpers/styles";
import { useTheme } from "@/helpers/themeContext";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Text, View, StyleSheet, KeyboardAvoidingView, TextInput, TouchableOpacity } from "react-native";

export default function Index() {
    const { theme } = useTheme();
    const styles = createStyles(theme);

    const router = useRouter();

    const signIn = () => {
        router.navigate("/login");
    }

    const signUp = () => {
        router.navigate("/signup");
    }

    return (
        <View style={[styles.containerCentered, { paddingHorizontal: 24 }]}>
            <Text style={[styles.title, { marginBottom: 32 }]}>Welcome to TaskaPet!</Text>
            <TouchableOpacity style={[styles.button, { width: "100%" }]} onPress={signIn}>
                <Text style={styles.buttonText} >Sign In</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, { width: "100%" }]} onPress={signUp}>
                <Text style={styles.buttonText} >Sign Up</Text>
            </TouchableOpacity>
        </View>
    );
}