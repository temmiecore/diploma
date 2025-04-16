import { Button, View } from "react-native";
import auth from "@react-native-firebase/auth";

export default function MainPage() {

    const signOut = async () => {
        await auth().signOut();
    }

    return (
        <View>
            <Button title="Sign out" onPress={signOut}/>
        </View>
    );
}