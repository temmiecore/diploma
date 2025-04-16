import { Button, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import auth from "@react-native-firebase/auth";
import { useEffect, useState } from "react";
import { Task } from "@/helpers/types";
import { firebase } from '@react-native-firebase/database';
import { useRouter, useSegments } from "expo-router";

export default function TasksPage() {
    const [tasks, setTasks] = useState<Task[]>([]);

    const segments = useSegments();

    const database = firebase
        .app()
        .database("https://taskapet-9c229-default-rtdb.europe-west1.firebasedatabase.app/");

    const router = useRouter();

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
            }));

            setTasks(fetchedTasks);
        })
    };

    useEffect(() => {
        fetchTasks();
    }, [segments]);

    const handleTaskCompletion = (taskId: string) => {
        const userId = auth().currentUser?.uid;

        database
            .ref(`/users/${userId}/tasks/${taskId}`)
            .update({ isCompleted: true });
    }


    const handleTaskOpenAddWindow = () => {
        router.navigate("../addTask");
    };

    const renderTask = ({ item }: { item: Task }) => (
        <View style={styles.taskCard}>
            <Text style={styles.taskTitle}>{item.title}</Text>
            <Text style={styles.taskDesc}>{item.description}</Text>
            <Text style={styles.taskDeadline}>Deadline: {item.deadline}</Text>
            <Text style={styles.taskTags}>Tags: {item.tags.join(', ')}</Text>
            {!item.isCompleted && (
                <TouchableOpacity
                    style={styles.completeButton}
                    onPress={() => handleTaskCompletion(item.id)}
                >
                    <Text style={styles.completeButtonText}>Complete</Text>
                </TouchableOpacity>
            )}
        </View>
    );


    return (
        <View style={styles.container}>
            <FlatList
                data={tasks}
                renderItem={renderTask}
                keyExtractor={item => item.id}
                ListEmptyComponent={<Text style={{ textAlign: 'center' }}>No tasks for today!</Text>}
            />
            <TouchableOpacity
                style={styles.addButton}
                onPress={handleTaskOpenAddWindow}
            >
                <Text style={styles.addButtonText}>+</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
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
    completeButton: {
        backgroundColor: '#4e8cff',
        padding: 10,
        borderRadius: 8,
        alignItems: 'center',
    },
    completeButtonText: { color: '#fff', fontWeight: '600' },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 14,
        borderTopWidth: 1,
        borderColor: '#ddd',
        backgroundColor: '#fafafa',
    },
    icon: { width: 32, height: 32 },
    addButton: {
        position: "fixed",
        bottom: 20,
        backgroundColor: '#4e8cff',
        paddingHorizontal: 24,
        borderRadius: 100,
        alignSelf: "center"
    },
    addButtonText: {
        fontSize: 64
    }
});