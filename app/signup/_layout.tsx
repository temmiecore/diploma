import { Stack } from 'expo-router';

export default function StackLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="personalInformation" options={{ headerShown: false }} />
      <Stack.Screen name="choosePet" options={{ headerShown: false }} />
      <Stack.Screen name="finishSignUp" options={{ headerShown: false }} />
    </Stack>
  );
}
