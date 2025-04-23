import { useRouter } from "expo-router";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import auth from "@react-native-firebase/auth";
import { firebase } from '@react-native-firebase/database';
import { useEffect, useState } from "react";
import { Task } from "@/helpers/types";

export default function HistoryPage() {
    const router = useRouter();
    const [tasks, setTasks] = useState<Task[]>([]);

    const database = firebase
        .app()
        .database("https://taskapet-9c229-default-rtdb.europe-west1.firebasedatabase.app/");

    const fetchTasks = async () => {
        // get tasks from database
        const userId = auth().currentUser?.uid;
        const reference = database.ref(`/users/${userId}/tasks`);

        reference.on('value', snapshot => {
            const data = snapshot.val();
            if (!data) {
                setTasks([]);
                return;
            }

            const fetchedTasks: Task[] = Object.entries(data).map(([id, task]: [string, any]) => ({
                id,
                title: task.title,
                description: task.description,
                deadline: task.deadline,
                tags: task.tags || [],
                difficulty: task.difficulty,
                isCompleted: task.isCompleted || false,
                isRepeated: task.isRepeated || false,
                repeatInterval: task.repeatInterval || -1
            }));

            setTasks(fetchedTasks);
        })
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const renderTask = ({ item }: { item: Task }) => {
        if (!item.isCompleted) return null;

        return (
            <View style={styles.taskCard}>
                <Text style={styles.taskTitle}>{item.title} - {item.difficulty}</Text>
                {item.description !== "" && (<Text style={styles.taskDesc}>{item.description}</Text>)}
                <Text style={styles.taskDeadline}>Deadline: {item.deadline}</Text>
                <Text style={styles.taskTags}>Tags: {item.tags.join(', ')}</Text>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => router.back()} style={styles.exitButton}>
                <Text style={styles.exitText}>Exit</Text>
            </TouchableOpacity>

            <FlatList
                data={tasks}
                renderItem={renderTask}
                keyExtractor={item => item.id}
                ListEmptyComponent={<Text style={{ textAlign: 'center' }}>No tasks completed...</Text>}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20 },
    exitButton: { alignSelf: "flex-end", marginBottom: 10 },
    exitText: { color: "red", fontSize: 16 },
    taskCard: {
        margin: 12,
        padding: 16,
        backgroundColor: '#f9f9f9',
        borderRadius: 10,
        elevation: 2,
    },
    taskTitle: { fontSize: 20, fontWeight: '600', marginBottom: 4 },
    taskDesc: { fontSize: 16, color: '#555', marginBottom: 4 },
    taskDeadline: { fontSize: 14, color: '#777', marginBottom: 4 },
    taskTags: { fontSize: 14, color: '#999', marginBottom: 8 },
});