import { Stack, Tabs } from 'expo-router';
import { Image, StyleSheet } from 'react-native';

export default function AuthLayout() {
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="addTask" options={{ headerShown: false }} />
        </Stack>
    );
}

const styles = StyleSheet.create({
    image: {
        width: 36,
        height: 36,
    }
})