import { useFocusEffect, useRouter } from "expo-router";
import { FlatList, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from "react-native";
import auth from "@react-native-firebase/auth";
import { firebase } from '@react-native-firebase/database';
import { useCallback, useEffect, useState } from "react";
import { Task } from "@/helpers/types";
import { useTheme } from "@/helpers/themeContext";
import { createStyles } from "@/helpers/styles";

export default function HistoryPage() {
    const router = useRouter();
    const [tasks, setTasks] = useState<Task[]>([]);

    const { theme } = useTheme();
    const styles = createStyles(theme);

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
                repeatInterval: task.repeatInterval || -1,
                completionDate: task.completionDate,
            }));

            const sortedTasks = fetchedTasks
                .filter(task => task.isCompleted)
                .sort((a, b) => (new Date(b.completionDate).getTime() - new Date(a.completionDate).getTime()));

            setTasks(sortedTasks);
        })
    };

    useFocusEffect(
        useCallback(() => {
            fetchTasks();
        }, [])
    );

    const handleTaskRemoval = async (task: Task) => {
        const userId = auth().currentUser?.uid;
        const reference = await database.ref(`/users/${userId}/tasks/${task.id}`);

        reference.remove();

        ToastAndroid.show(`Task removed from history.`, ToastAndroid.SHORT); // won't work on ios
    };

    const renderTask = ({ item }: { item: Task }) => {
        if (!item.isCompleted) return null;

        return (
            <View style={styles.taskCard}>
                <Text style={styles.taskTitle}>{item.title} - {item.difficulty}</Text>
                {item.description !== "" && (<Text style={styles.taskDesc}>{item.description}</Text>)}
                <Text style={styles.taskDeadline}>Deadline: {item.deadline}</Text>
                <Text style={styles.taskDeadline}>Completion date: {item.completionDate}</Text>
                <Text style={styles.taskTags}>Tags: {item.tags.join(', ')}</Text>
                <TouchableOpacity onPress={() => handleTaskRemoval(item)} style={styles.exitButton}>
                    <Text style={{ color: "red", fontSize: 16 }}>Remove</Text>
                </TouchableOpacity>
            </View>
        );
    };

    return (
        <View style={[styles.containerStretched]}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>History</Text>
                <TouchableOpacity onPress={() => router.back()} style={styles.exitButton}>
                    <Text style={{ color: "red", fontSize: 16 }}>Exit</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={tasks}
                renderItem={renderTask}
                keyExtractor={item => item.id}
                ListEmptyComponent={<Text style={[styles.text, { alignSelf: "center", marginTop: 12 }]}>No tasks completed...</Text>}
            />
        </View>
    );
}