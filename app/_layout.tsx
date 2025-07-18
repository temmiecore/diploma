import { Stack, useRouter, useSegments } from "expo-router";
import { useEffect, useState } from "react";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { ActivityIndicator, BackHandler, View } from "react-native";
import { ThemeProvider } from "@/helpers/themeContext";
import { usePushNotifications } from "@/helpers/hooks/usePushNotifications";

export default function RootLayout() {
    // Notifications
    const {expoPushToken, notification} = usePushNotifications();

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

        const inAuthGroup = segments[0] === "auth";

        if (user) {
            if (!inAuthGroup) {
                router.replace("/auth/(tabs)/home");
            }
        } else {
            if (inAuthGroup) {
                router.replace("/");
            }
        }

    }, [user, initializing, segments]);


    useEffect(() => {
        const backAction = () => {
            const inAuthGroup = segments[0] === "auth";

            if (inAuthGroup)
                return true;
            else
                return false;

        };

        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );
        console.log(segments);

        return () => backHandler.remove();
    }, [segments]);


    if (initializing)
        return (
            <View
                style={{
                    alignItems: "center",
                    justifyContent: "center",
                    flex: 1,
                }}>
                <ActivityIndicator size="large" />
            </View>
        );

    return (
        <ThemeProvider>
            <Stack>
                <Stack.Screen name="index" options={{ headerShown: false }} />
                <Stack.Screen name="login" options={{ headerShown: false }} />
                <Stack.Screen name="signup" options={{ headerShown: false }} />
                <Stack.Screen name="auth" options={{ headerShown: false }} />
            </Stack>
        </ThemeProvider>
    );
}
