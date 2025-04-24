import { useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Button, Dimensions, StyleSheet, Text, View } from "react-native";
import { Gesture, GestureDetector, GestureHandlerRootView, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';
import auth from "@react-native-firebase/auth";
import { firebase } from '@react-native-firebase/database';
import { Pet } from "@/helpers/types";

const { width, height } = Dimensions.get('window');

export default function PetPlayPage() {
    const [excitement, setExcitement] = useState(0);
    const [canFinish, setCanFinish] = useState(false);
    const [petType, setPetType] = useState<string>("");

    const posX = useSharedValue<number>(0);
    const posY = useSharedValue<number>(0);
    const rotation = useSharedValue<number>(0);

    const database = firebase
        .app()
        .database("https://taskapet-9c229-default-rtdb.europe-west1.firebasedatabase.app/");

    const lastTap = useRef(Date.now());

    const router = useRouter();

    const fetchPet = async () => {
        // get tasks from database
        const userId = auth().currentUser?.uid;
        const reference = database.ref(`/users/${userId}/pet`);

        reference.on('value', snapshot => {
            const data = snapshot.val();
            if (!data) {
                return;
            }

            setPetType(data.type);
        })
    };

    const tap = Gesture.Tap()
        .onBegin((e) => {
            posX.value = withSpring(e.x - 240);
            posY.value = withSpring(e.y - 240);
            //console.log(`[/AUTH/PETPLAY] Tap ${e.x} | ${e.y}`);
        });


    const bumpExcitement = () => {
        setExcitement((prev) => {
            const next = Math.min(prev + 10, 100);
            if (next === 100) setCanFinish(true);
            return next;
        });
    };

    const petSpin = () => {
        const now = Date.now();
        if (now - lastTap.current < 600)
            return;
        lastTap.current = now;

        rotation.value = withTiming(rotation.value + 360, { duration: 600 });
        bumpExcitement();
    };

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [
            { translateX: posX.value },
            { translateY: posY.value },
            { rotate: `${rotation.value}deg` },
        ],
    }));

    const chooseIcon = (type: string) => {
        switch (type) {
            case "Pichi": return require("@/assets/images/pichi.png");
            case "Char": return require("@/assets/images/char.png");
            case "Flower": return require("@/assets/images/flower.png");
            case "Water": return require("@/assets/images/water.png");
        }
    };

    // doesn't work properly
    useEffect(() => {
        const wanderInterval = setInterval(() => {
            posX.value = withSpring(Math.random() * (width - 240) - 80);
            posY.value = withSpring(Math.random() * (height - 240) - 80);
        }, 3000);

        return () => clearInterval(wanderInterval);
    }, []);

    useEffect(() => { fetchPet() }, []);

    const handleDonePlaying = async () => {
        const userId = auth().currentUser?.uid;

        await database
            .ref(`/users/${userId}/pet`)
            .update({ lastPlayedDate: new Date().toISOString() })

        router.back();
    };
    
    return (
        <GestureHandlerRootView>
            <GestureDetector gesture={tap}>
                <View style={styles.container}>
                    <Text style={styles.header}>Play with your pet!</Text>

                    <View style={styles.progressBarContainer}>
                        <View style={[styles.progressBarFill, { width: `${excitement}%` }]} />
                    </View>

                    <Text style={styles.exText}>Excitement: {excitement}%</Text>

                    <TouchableWithoutFeedback onPress={petSpin}>
                        <Animated.Image
                            source={chooseIcon(petType)}
                            style={[styles.pet, animatedStyle]}
                        />
                    </TouchableWithoutFeedback>

                    {canFinish && (
                        <View style={styles.doneContainer}>
                            <Text style={styles.doneText}>Your pet is thrilled!</Text>
                            <Button title="Done playing" onPress={handleDonePlaying} />
                        </View>
                    )}
                </View>
            </GestureDetector>
        </GestureHandlerRootView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F0F8FF",
        alignItems: "center",
        justifyContent: "flex-start",
    },
    header: {
        fontSize: 24,
        marginTop: 40,
        fontWeight: "bold",
    },
    progressBarContainer: {
        width: "80%",
        height: 12,
        backgroundColor: "black",
        borderRadius: 10,
        overflow: "hidden",
        marginTop: 20,
    },
    exText: {
        marginTop: 8,
        marginBottom: 20,
        fontSize: 16,
    },
    pet: {
        width: 120,
        height: 120,
        position: "absolute",
    },
    doneContainer: {
        position: "absolute",
        bottom: 40,
        alignItems: "center",
    },
    doneText: {
        fontSize: 18,
        marginBottom: 10,
    },
    progressBarFill: {
        height: 12,
        backgroundColor: "#4CAF50",
        borderRadius: 10,
    },
});