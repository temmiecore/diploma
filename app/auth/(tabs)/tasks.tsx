import { Button, FlatList, Image, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import auth from "@react-native-firebase/auth";
import { useEffect, useState } from "react";
import { Task } from "@/helpers/types";
import { firebase } from '@react-native-firebase/database';
import { useRouter, useSegments } from "expo-router";
import { styles } from "@/helpers/styles";

export default function TasksPage() {
    const [originalTaskList, setOriginalTaskList] = useState<Task[]>([]);
    const [tasks, setTasks] = useState<Task[]>([]);
    const [sortMenuVisible, setSortMenuVisible] = useState(false);
    const [filterMenuVisible, setFilterMenuVisible] = useState(false);
    const [tagFilterMenuVisible, setTagFilterMenuVisible] = useState(false);
    const [tagFilter, setTagFilter] = useState('');
    const [listId, setListId] = useState<number>(0);

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
                isRepeated: task.isRepeated || false,
                repeatInterval: task.repeatInterval || -1
            }));

            setTasks(fetchedTasks);
            setOriginalTaskList(fetchedTasks);
        })
    };

    useEffect(() => {
        fetchTasks();
    }, [segments]);

    const handleTaskCompletion = async (taskId: string) => {
        const userId = auth().currentUser?.uid;

        const snapshot = await database
            .ref(`/users/${userId}/tasks/${taskId}`)
            .once("value");

        const isTaskRepeatable = await snapshot.val().isRepeated;
        console.log(isTaskRepeatable);

        if (isTaskRepeatable) {
            const previousDeadline = await snapshot.val().deadline;
            const taskRepeatInterval = await Number.parseInt(snapshot.val().repeatInterval);
            // console.log(taskRepeatInterval);
            const newDeadline = new Date(previousDeadline);
            newDeadline.setDate(newDeadline.getDate() + taskRepeatInterval);

            await database
                .ref(`/users/${userId}/tasks/${taskId}`)
                .update({ deadline: newDeadline.toISOString() })

            fetchTasks();
        }
        else {
            await database
                .ref(`/users/${userId}/tasks/${taskId}`)
                .update({ isCompleted: true })

            fetchTasks();
        }
    }

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
                    style={styles.completeButton}
                    onPress={() => handleTaskCompletion(item.id)}
                >
                    <Text style={styles.completeButtonText}>Complete</Text>
                </TouchableOpacity>
            </View>
        );
    };


    useEffect(() => {
        switch (listId) {
            case 0:
                ////// ADD
                break;
            case 1:
                setTasks(tasks.filter(task => {
                    const date = new Date()
                    const endOfWeek = new Date();
                    const deadline = new Date(task.deadline);

                    endOfWeek.setDate(date.getDate() + (7 - date.getDay()));
                    endOfWeek.setHours(23, 59, 59, 999);

                    return deadline <= endOfWeek;
                }));
                break;
            case 2:
                setTasks(originalTaskList);
                break;
            default:
                setTasks(originalTaskList);
                break;
        }
    }, [listId]);


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
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Tasks</Text>
                <View style={styles.headerButtons}>
                    <TouchableOpacity onPress={() => setSortMenuVisible(true)}>
                        <Image source={require('@/assets/images/sort.png')} style={styles.icon} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setFilterMenuVisible(true)}>
                        <Image source={require('@/assets/images/filter.png')} style={styles.icon} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => router.navigate("../history")}>
                        <Image source={require('@/assets/images/history.png')} style={styles.icon} />
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.categories}>
                <TouchableOpacity style={styles.categoryButton} onPress={() => setListId(0)}>
                    <Text style={styles.categoryButtonText}>Expired</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.categoryButton} onPress={() => setListId(1)}>
                    <Text style={styles.categoryButtonText}>This Week</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.categoryButton} onPress={() => setListId(2)}>
                    <Text style={styles.categoryButtonText}>All Tasks</Text>
                </TouchableOpacity>
            </View>

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
                            style={styles.textInput}
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