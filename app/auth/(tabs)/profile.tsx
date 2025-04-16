import { Button } from "react-native";
import auth from "@react-native-firebase/auth";

export default function ProfilePage() {
    const signOut = () => {
        auth().signOut();
    }

    return (
        <Button onPress={signOut} title="sign out" />
    );
}