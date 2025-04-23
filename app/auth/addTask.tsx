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
} from "react-native";
import DatePicker from "react-native-date-picker";
import { firebase } from "@react-native-firebase/database";
import { uid } from "uid";

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
    const [repeatInterval, setRepeatInterval] = useState<number>(-1);

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
            });

            alert("Task added!");
            router.back();
        } catch (e: any) {
            console.log(e);
        }
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => router.back()} style={styles.exitButton}>
                <Text style={styles.exitText}>Exit</Text>
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
                style={styles.input}
            >
                <Text>{deadline.toDateString()}</Text>
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

            <Text style={styles.label}>Tags (comma separated)</Text>
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
                        <Text>{level}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            <Text style={styles.label}>Is it repeatable?</Text>
            <Switch style={styles.switch} value={isRepeated} onValueChange={setIsRepeated} />

            <Text style={styles.label}>Repeat Interval</Text>
            <TextInput style={styles.input} value={repeatInterval.toString()} onChangeText={(e) => {setRepeatInterval(Number.parseInt(e))}} />

            <Button title="Add Task" onPress={handleAddTask} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20 },
    exitButton: { alignSelf: "flex-end", marginBottom: 10 },
    exitText: { color: "red", fontSize: 16 },
    title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
    label: { marginTop: 10, fontWeight: "600" },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        padding: 10,
        borderRadius: 8,
        marginTop: 5,
    },
    difficultyContainer: { flexDirection: "row", marginVertical: 10 },
    difficultyButton: {
        padding: 10,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        marginRight: 10,
    },
    selectedDifficulty: { backgroundColor: "#ddd" },
    switch: {
        // whatever
    },
});
