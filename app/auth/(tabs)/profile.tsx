import { Button, Image, ScrollView, StyleSheet, Switch, Text, TextInput, TouchableOpacity, View } from "react-native";
import auth from "@react-native-firebase/auth";
import { useEffect, useState } from "react";
import { firebase } from '@react-native-firebase/database';
import { Picker } from "@react-native-picker/picker";

export default function ProfilePage() {
    const [user, setUser] = useState<object>();

    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [gender, setGender] = useState("");
    const [email, setEmail] = useState("");
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword1, setNewPassword1] = useState("");
    const [newPassword2, setNewPassword2] = useState("");
    const [darkMode, setDarkMode] = useState(false);
    const [profileImage, setProfileImage] = useState("");

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

    const handleSaveChanges = () => {
        const editedUser = {
            ...user,
            name: name,
            age: age,
            gender: gender,
            email: email
        }
        console.log(editedUser);

        const userId = auth().currentUser?.uid;
        const reference = database.ref(`/users/${userId}`);

        reference.set(editedUser);
    };

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <TouchableOpacity onPress={handleImageChange}>
                    <Image source={require("@/assets/images/placeholder_pfp.png")} style={styles.profileImage} />
                </TouchableOpacity>

                <Text style={styles.label}>Name</Text>
                <TextInput
                    style={styles.input}
                    value={name}
                    onChangeText={setName}
                    placeholder="Your name"
                />


                <Text style={styles.label}>Age</Text>
                <TextInput
                    style={styles.input}
                    value={age}
                    onChangeText={setAge}
                    placeholder="Your name"
                />


                <Text style={styles.label}>Gender</Text>
                <View style={styles.pickerContainer}>
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

                <Text style={styles.label}>Email</Text>
                <TextInput
                    style={styles.input}
                    value={email}
                    onChangeText={setEmail}
                    placeholder="Your email"
                    keyboardType="email-address"
                />

                <Text style={styles.label}>Current Password</Text>
                <TextInput
                    style={styles.input}
                    value={currentPassword}
                    onChangeText={setCurrentPassword}
                    placeholder="**********"
                    secureTextEntry
                />

                <Text style={styles.label}>New Password</Text>
                <TextInput
                    style={styles.input}
                    value={newPassword1}
                    onChangeText={setNewPassword1}
                    placeholder="**********"
                    secureTextEntry
                />

                <Text style={styles.label}>New Password, Again</Text>
                <TextInput
                    style={styles.input}
                    value={newPassword2}
                    onChangeText={setNewPassword2}
                    placeholder="**********"
                    secureTextEntry
                />

                <View style={styles.switchContainer}>
                    <Text style={styles.label}>Dark Mode</Text>
                    <Switch
                        value={darkMode}
                        onValueChange={setDarkMode}
                    />
                </View>

                <View style={styles.signOutButton}>
                    <Button onPress={signOut} title="Sign Out" color="#ff5252" />
                </View>
            </ScrollView>

            <TouchableOpacity style={styles.saveButton} onPress={handleSaveChanges}>
                <Text style={styles.saveButtonText}>Save Changes</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    scrollContent: {
        padding: 24,
        paddingBottom: 100, // leave space for save button
        alignItems: 'center'
    },
    profileImage: {
        width: 150,
        height: 150,
        borderRadius: 75,
        marginBottom: 24
    },
    label: {
        fontSize: 16,
        fontWeight: '500',
        alignSelf: 'flex-start',
        marginTop: 12,
        marginBottom: 4
    },
    input: {
        width: '100%',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        marginBottom: 8
    },
    switchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: 16,
        marginBottom: 16
    },
    signOutButton: {
        marginTop: 24,
        width: '100%'
    },
    saveButton: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
        backgroundColor: '#4e8cff',
        padding: 16,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center'
    },
    saveButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600'
    },
    pickerContainer: {
        width: '100%',
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#ccc',
        marginBottom: 16,
        overflow: 'hidden',
        backgroundColor: '#f0f0f0',
    },
    picker: {
        height: 50,
        width: '100%',
    },
});