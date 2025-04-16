import { Stack, useRouter, useSegments } from "expo-router";
import { useEffect, useState } from "react";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { ActivityIndicator, View } from "react-native";

export default function RootLayout() {
    // Set an initializing state whilst Firebase connects
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState<FirebaseAuthTypes.User | null>();
    const [userFinishedSignUpProcess, setUserFinishedSignUpProcess] = useState(false);

    const router = useRouter();
    const segments = useSegments();

    // Handle user state changes
    function onAuthStateChanged(user: FirebaseAuthTypes.User | null) {
        console.log("onAuthStateChanged: ", user);
        setUser(user);
        if (initializing) setInitializing(false);
    }

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    }, []);

    useEffect(() => {
        if (initializing) return;

        const inAuthGroup = segments[0] === "(auth)";

        if (user && !inAuthGroup)
            router.replace('/(auth)/home');
        else
            router.replace('/');

    }, [user, initializing]);

    if (initializing)
        return (
            <View
                style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    flex: 1,
                }}>
                <ActivityIndicator size="large" />
            </View>
        );

    return (
        <Stack>
            <Stack.Screen name="index" />
            <Stack.Screen name="(auth)" />
        </Stack>
    );
}
