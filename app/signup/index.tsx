import { useState } from "react";
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useRouter } from "expo-router";
import { useUserStore } from "@/helpers/useUserStore";
import { User } from "@/helpers/types";
import auth from "@react-native-firebase/auth";

export default function SignUp() {
    const { setUser } = useUserStore();

    const [email, setEmail] = useState<string>("");
    const [password1, setPassword1] = useState<string>("");
    const [password2, setPassword2] = useState<string>("");

    const router = useRouter();

    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    const handleNext = async () => {
        if (email.match(emailRegex)) {
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
            const signInMethods = await auth().fetchSignInMethodsForEmail(email);
            // user exists 
            if (signInMethods.length > 0) {
                alert("User with this email already exists!");
                return;
            }
        }
        catch (e: any) {
            console.log("Error checking email: ", e);
        }

        const newUser: User = {
            email,
            password: password1,
            name: '',
            age: '',
            gender: '',
            pet: null,
            coinAmount: 0,
            profileImage: null,
        };

        setUser(newUser);
        console.log(newUser);

        router.navigate("/signup/personalInformation");
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