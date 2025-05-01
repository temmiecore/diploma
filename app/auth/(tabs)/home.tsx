import { Button, FlatList, Image, Modal, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from "react-native";
import auth from "@react-native-firebase/auth";
import { useEffect, useState } from "react";
import { Task } from "@/helpers/types";
import { firebase } from '@react-native-firebase/database';
import { useRouter, useSegments } from "expo-router";
import { useTheme } from "@/helpers/themeContext";
import { createStyles } from "@/helpers/styles";

export default function MainPage() {
    const [originalTaskList, setOriginalTaskList] = useState<Task[]>([]);
    const [tasks, setTasks] = useState<Task[]>([]);
    const [sortMenuVisible, setSortMenuVisible] = useState(false);
    const [filterMenuVisible, setFilterMenuVisible] = useState(false);
    const [tagFilterMenuVisible, setTagFilterMenuVisible] = useState(false);
    const [tagFilter, setTagFilter] = useState('');

    const { theme } = useTheme();
    const styles = createStyles(theme);

    const segments = useSegments();

    const database = firebase
        .app()
        .database("https://taskapet-9c229-default-rtdb.europe-west1.firebasedatabase.app/");

    const router = useRouter();

    const isToday = (date: Date) => {
        const now = new Date();
        return date.getDate() === now.getDate() &&
            date.getMonth() === now.getMonth() &&
            date.getFullYear() === now.getFullYear()
    }

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
            }))
                .filter((task: Task) => {
                    const deadline = new Date(task.deadline);
                    return isToday(deadline);
                });

            setTasks(fetchedTasks);
            setOriginalTaskList(fetchedTasks);
        })
    };

    useEffect(() => {
        fetchTasks();
    }, [segments]);

    const handleTaskCompletion = async (taskId: string) => {
        const userId = auth().currentUser?.uid;
        const taskRef = database.ref(`/users/${userId}/tasks/${taskId}`);
        const snapshot = await taskRef.once("value");
        const taskData = snapshot.val();

        const isTaskRepeatable = taskData.isRepeated;
        const difficulty = taskData.difficulty || 'easy';

        let coinReward = 0;
        switch (difficulty.toLowerCase()) {
            case 'easy':
                coinReward = 2;
                break;
            case 'medium':
                coinReward = 4;
                break;
            case 'hard':
                coinReward = 6;
                break;
            default:
                coinReward = 2;
        }

        if (isTaskRepeatable) {
            const previousDeadline = new Date(taskData.deadline);
            const taskRepeatInterval = parseInt(taskData.repeatInterval || '1');
            const newDeadline = new Date(previousDeadline);
            newDeadline.setDate(newDeadline.getDate() + taskRepeatInterval);

            await taskRef.update({ deadline: newDeadline.toISOString() });
        } else {
            await taskRef.update({ isCompleted: true, completionDate: new Date().toISOString() });
        }

        // Coins
        const coinsSnapshot = await database.ref(`/users/${userId}/coinAmount`).once("value");
        const currentCoins = coinsSnapshot.val() || 0;

        await database.ref(`/users/${userId}/coinAmount`).set(currentCoins + coinReward);

        fetchTasks();

        ToastAndroid.show(`Task complete!`, ToastAndroid.SHORT); // won't work on ios
    };

    const handleTaskOpenAddWindow = () => {
        router.navigate("../addTask");
    };

    const renderTask = ({ item }: { item: Task }) => {
        if (item.isCompleted) return null;

        return (
            <View style={styles.taskCard}>
                <Text style={styles.taskTitle}>{item.title} - {item.difficulty}</Text>
                {item.description !== "" && (<Text style={styles.taskDesc}>{item.description}</Text>)}
                <Text style={styles.taskDeadline}>Deadline: {item.deadline}</Text>
                <Text style={styles.taskTags}>Tags: {item.tags.join(', ')}</Text>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => handleTaskCompletion(item.id)}
                >
                    <Text style={styles.buttonText}>Complete</Text>
                </TouchableOpacity>
            </View>
        );
    };


    const difficultyOrder: Record<string, number> = {
        'Easy': 1,
        'Medium': 2,
        'Hard': 3,
    };

    const handleTaskSort = (option: number) => {
        switch (option) {
            // By deadline
            case 0: {
                const sortedTasks = [...tasks];
                sortedTasks.sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime());
                setTasks(sortedTasks);
                break;
            }
            // By difficulty
            case 1: {
                const sortedTasks = [...tasks];
                sortedTasks.sort((a, b) => difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty]);
                setTasks(sortedTasks);
                break;
            }
            default: break;
        }
    };

    const handleTaskFilter = () => {
        const filteredTasks = [...tasks].filter((task) => task.tags.includes(tagFilter));
        setTasks(filteredTasks);
    };

    return (
        <View style={styles.containerStretched}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Today's tasks</Text>
                <View style={styles.headerButtons}>
                    <TouchableOpacity onPress={() => setSortMenuVisible(true)}>
                        <Image source={require('@/assets/images/sort.png')} style={styles.icon} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setFilterMenuVisible(true)}>
                        <Image source={require('@/assets/images/filter.png')} style={styles.icon} />
                    </TouchableOpacity>
                </View>
            </View>

            <FlatList
                data={tasks}
                renderItem={renderTask}
                keyExtractor={item => item.id}
                ListEmptyComponent={<Text style={[styles.text, { alignSelf: "center", marginTop: 12 }]}>No tasks for today!</Text>}
            />
            <TouchableOpacity
                style={styles.addButton}
                onPress={handleTaskOpenAddWindow}
            >
                <Text style={styles.addButtonText}>+</Text>
            </TouchableOpacity>

            <Modal visible={sortMenuVisible} transparent animationType="fade">
                <TouchableOpacity style={styles.modalOverlay} onPress={() => setSortMenuVisible(false)}>
                    <View style={styles.menu}>
                        <Button title="No sort" onPress={() => { setTasks(originalTaskList); setSortMenuVisible(false); }} />
                        <Button title="By deadline" onPress={() => { handleTaskSort(0); setSortMenuVisible(false); }} />
                        <Button title="By difficulty" onPress={() => { handleTaskSort(1); setSortMenuVisible(false); }} />
                    </View>
                </TouchableOpacity>
            </Modal>

            <Modal visible={filterMenuVisible} transparent animationType="fade">
                <TouchableOpacity style={styles.modalOverlay} onPress={() => setFilterMenuVisible(false)}>
                    <View style={styles.menu}>
                        <Button title="Clear filter" onPress={() => { setTagFilter(''); setTasks(originalTaskList); setFilterMenuVisible(false); }} />
                        <Button title="By tags..." onPress={() => { setFilterMenuVisible(false); setTagFilterMenuVisible(true); }} />
                    </View>
                </TouchableOpacity>
            </Modal>

            <Modal visible={tagFilterMenuVisible} transparent animationType="fade">
                <TouchableOpacity style={styles.modalOverlay} onPress={() => setTagFilterMenuVisible(false)}>
                    <View style={styles.menu}>
                        <Text style={{ fontSize: 16, marginBottom: 8 }}>Enter tag to filter:</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="e.g. work"
                            value={tagFilter}
                            onChangeText={setTagFilter}
                        />
                        <Button title="Apply" onPress={() => { handleTaskFilter(); setTagFilterMenuVisible(false) }} />
                    </View>
                </TouchableOpacity>
            </Modal>
        </View>
    );
}