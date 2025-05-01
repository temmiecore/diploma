import { useRouter } from "expo-router";
import { useState } from "react";
import auth from "@react-native-firebase/auth";
import {
    Button,
    StyleSheet,
    Switch,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    ScrollView
} from "react-native";
import DatePicker from "react-native-date-picker";
import { firebase } from "@react-native-firebase/database";
import { uid } from "uid";
import { useTheme } from "@/helpers/themeContext";
import { createStyles } from "@/helpers/styles";

export default function AddTaskPage() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [deadline, setDeadline] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [tags, setTags] = useState("");
    const [difficulty, setDifficulty] = useState<"Easy" | "Medium" | "Hard">(
        "Easy"
    );
    const [isRepeated, setIsRepeated] = useState<boolean>(false);
    const [repeatInterval, setRepeatInterval] = useState<string>("");

    const { theme } = useTheme();
    const styles = createStyles(theme);

    const router = useRouter();

    const database = firebase
        .app()
        .database(
            "https://taskapet-9c229-default-rtdb.europe-west1.firebasedatabase.app/"
        );

    const handleAddTask = async () => {
        const userId = auth().currentUser?.uid;

        const taskId: string = uid();

        try {
            await database.ref(`/users/${userId}/tasks/${taskId}`).set({
                id: taskId,
                title: title,
                description: description,
                deadline: deadline.toISOString(),
                tags: tags.split(","),
                difficulty: difficulty,
                isCompleted: false,
                isRepeated: isRepeated,
                repeatInterval: repeatInterval,
                completionDate: "",
            });

            alert("Task added!");
            router.back();
        } catch (e: any) {
            console.log(e);
        }
    };

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 40 }}>
                <TouchableOpacity onPress={() => router.back()} style={styles.exitButton}>
                    <Text style={{ color: "red", fontSize: 16 }}>Exit</Text>
                </TouchableOpacity>

                <Text style={styles.title}>Add a task</Text>

                <Text style={styles.label}>Title</Text>
                <TextInput style={styles.input} value={title} onChangeText={setTitle} />

                <Text style={styles.label}>Description (optional)</Text>
                <TextInput
                    style={styles.input}
                    value={description}
                    onChangeText={setDescription}
                />

                <Text style={styles.label}>Deadline</Text>
                <TouchableOpacity
                    onPress={() => setShowDatePicker(true)}
                    style={[styles.input, { justifyContent: "center" }]}
                >
                    <Text style={[styles.text, { fontSize: 16, marginBottom: 0 }]}>{deadline.toDateString()}</Text>
                </TouchableOpacity>
                {showDatePicker && (
                    <DatePicker
                        modal
                        open={showDatePicker}
                        date={deadline}
                        onConfirm={(date) => {
                            setShowDatePicker(false);
                            setDeadline(date);
                        }}
                        onCancel={() => {
                            setShowDatePicker(false);
                        }}
                    />
                )}

                <Text style={styles.label}>Tags (Comma separated. No spaces!)</Text>
                <TextInput style={styles.input} value={tags} onChangeText={setTags} />

                <Text style={styles.label}>Difficulty</Text>
                <View style={styles.difficultyContainer}>
                    {["Easy", "Medium", "Hard"].map((level) => (
                        <TouchableOpacity
                            key={level}
                            style={[
                                styles.difficultyButton,
                                difficulty === level && styles.selectedDifficulty,
                            ]}
                            onPress={() => setDifficulty(level as "Easy" | "Medium" | "Hard")}
                        >
                            <Text style={[styles.text, { fontSize: 16, marginBottom: 0 }]}>{level}</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                    <Text style={styles.label}>Is it repeatable?</Text>
                    <Switch value={isRepeated} onValueChange={setIsRepeated} />
                </View>

                <Text style={styles.label}>Repeat Interval</Text>
                <TextInput style={styles.input} value={repeatInterval} onChangeText={setRepeatInterval} keyboardType="numeric" />

                <TouchableOpacity onPress={handleAddTask} style={styles.button}>
                    <Text>Add Task</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
}