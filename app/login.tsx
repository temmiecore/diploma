import { useState } from "react";
import { Alert, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import auth from "@react-native-firebase/auth";
import { FirebaseError } from "firebase/app"
import { useTheme } from "@/helpers/themeContext";
import { createStyles } from "@/helpers/styles";

export default function Login() {
    const { theme } = useTheme();
    const styles = createStyles(theme);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSignInWithEmail = async () => {
        try {
            await auth().signInWithEmailAndPassword(email, password);
        }
        catch (e: any) {
            const err = e as FirebaseError;
            Alert.alert("Incorrect email or password");
        }
    }

    const handleSignInWithGoogle = () => {
        
    }

    return (
        <View style={[styles.containerStretched, { paddingHorizontal: 24 }]}>
            <KeyboardAvoidingView behavior="padding" style={styles.containerInner}>
                <Text style={[styles.title, { marginBottom: 32 }]}>Sign In</Text>
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
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />
                <TouchableOpacity style={[styles.button, { width: "100%" }]} onPress={handleSignInWithEmail}>
                    <Text style={styles.buttonText} >Log In</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.inverseButton, { width: "100%" }]} onPress={handleSignInWithGoogle}>
                    <Text style={styles.inverseButtonText}>Sign in with Google</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        </View>
    );
}