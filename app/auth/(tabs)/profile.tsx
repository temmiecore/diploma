import { Button, Image, ScrollView, StyleSheet, Switch, Text, TextInput, TouchableOpacity, View } from "react-native";
import auth from "@react-native-firebase/auth";
import { useEffect, useState } from "react";
import { firebase } from '@react-native-firebase/database';
import { Picker } from "@react-native-picker/picker";
import { User } from "@/helpers/types";
import { styles } from "@/helpers/styles";

export default function ProfilePage() {
    const [user, setUser] = useState<User>();

    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [gender, setGender] = useState("");
    const [email, setEmail] = useState("");
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword1, setNewPassword1] = useState("");
    const [newPassword2, setNewPassword2] = useState("");
    const [darkMode, setDarkMode] = useState(false);
    const [profileImage, setProfileImage] = useState("");

    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    const database = firebase
        .app()
        .database("https://taskapet-9c229-default-rtdb.europe-west1.firebasedatabase.app/");


    const signOut = () => {
        auth().signOut();
    }

    const fetchUser = () => {
        const userId = auth().currentUser?.uid;
        const reference = database.ref(`/users/${userId}`);

        reference.on('value', snapshot => {
            const data = snapshot.val();
            if (!data)
                return;

            setUser(data);

            setName(data.name);
            setAge(data.age);
            setGender(data.gender);
            setEmail(data.email);

        });
    };

    useEffect(() => {
        fetchUser();
    }, []);

    const handleImageChange = () => {
        // Open image picker here
    };

    const handleSaveChanges = async () => {
        let editedUser = {
            ...user,
            name: name,
            age: age,
            gender: gender,
        }
        console.log(editedUser);

        const userId = auth().currentUser?.uid;
        const reference = database.ref(`/users/${userId}`);

        // email change
        if (email !== "" && email !== user?.email) {
            if (!emailRegex.test(email)) {
                alert("Invalid email address!");
                return;
            }

            const snapshot = await database.ref("/users").once("value");
            const usersObj = snapshot.val();

            if (usersObj) {
                const usersArray = Object.values(usersObj);

                // email is already used
                if (usersArray.find((user: any) => user.email === email)) {
                    alert("User with this email already exists!");
                    return;
                }
            }

            try {
                await auth().signInWithEmailAndPassword(email, currentPassword);
                await auth().currentUser?.updateEmail(email);
                editedUser = { ...editedUser, email: email };
            } catch (error: any) {
                console.error("Error updating email:", error);
                alert("Failed to update email. Please try again.");
                return;
            }
        }

        reference.set(editedUser);
    };

    return (
        <View style={styles.containerStretched}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <TouchableOpacity onPress={handleImageChange}>
                    <Image source={require("@/assets/images/placeholder_pfp.png")} style={styles.profileImage} />
                </TouchableOpacity>

                <Text style={styles.text}>Name</Text>
                <TextInput
                    style={[styles.input, { width: "100%" }]}
                    value={name}
                    onChangeText={setName}
                    placeholder="Your name"
                />

                <Text style={styles.text}>Age</Text>
                <TextInput
                    style={[styles.input, { width: "100%" }]}
                    value={age}
                    onChangeText={setAge}
                    placeholder="Your name"
                />

                <Text style={styles.text}>Gender</Text>
                <View style={[styles.pickerContainer, { width: "100%" }]}>
                    <Picker
                        selectedValue={gender}
                        onValueChange={(itemValue) => setGender(itemValue)}
                        style={styles.picker}
                    >
                        <Picker.Item label="Select gender" value="" />
                        <Picker.Item label="Male" value="M" />
                        <Picker.Item label="Female" value="F" />
                        <Picker.Item label="Other" value="Other" />
                    </Picker>
                </View>

                <Text style={styles.text}>Email</Text>
                <TextInput
                    style={[styles.input, { width: "100%" }]}
                    value={email}
                    onChangeText={setEmail}
                    placeholder="Your email"
                    keyboardType="email-address"
                />

                <Text style={styles.text}>Current Password</Text>
                <TextInput
                    style={[styles.input, { width: "100%" }]}
                    value={currentPassword}
                    onChangeText={setCurrentPassword}
                    placeholder="**********"
                    secureTextEntry
                />

                <Text style={styles.text}>New Password</Text>
                <TextInput
                    style={[styles.input, { width: "100%" }]}
                    value={newPassword1}
                    onChangeText={setNewPassword1}
                    placeholder="**********"
                    secureTextEntry
                />

                <Text style={styles.text}>New Password, Again</Text>
                <TextInput
                    style={[styles.input, { width: "100%" }]}
                    value={newPassword2}
                    onChangeText={setNewPassword2}
                    placeholder="**********"
                    secureTextEntry
                />

                <View style={{ flexDirection: "row" }}>
                    <Text style={styles.text}>Dark Mode</Text>
                    <Switch
                        value={darkMode}
                        onValueChange={setDarkMode}
                    />
                </View>

                <TouchableOpacity style={[styles.signOutButton, { width: "100%" }]} onPress={signOut}>
                    <Text style={styles.buttonText}>Sign Out</Text>
                </TouchableOpacity>
            </ScrollView>

            <TouchableOpacity style={styles.saveButton} onPress={handleSaveChanges}>
                <Text style={styles.buttonText}>Save Changes</Text>
            </TouchableOpacity>
        </View>
    );
}