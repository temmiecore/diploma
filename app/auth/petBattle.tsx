import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Image, Alert, Button, Dimensions } from 'react-native';
import auth from "@react-native-firebase/auth";
import { firebase } from '@react-native-firebase/database';
import { Pet } from '@/helpers/types';
import { useRouter } from 'expo-router';
import Animated, { useAnimatedStyle, useSharedValue, withSpring, withTiming, runOnJS } from 'react-native-reanimated';

export default function PetBattlePage() {
    const [monster, setMonster] = useState<Monster | null>(null);
    const [pet, setPet] = useState<Pet>();
    const [petHealth, setPetHealth] = useState<number>(0);
    const [monsterHealth, setMonsterHealth] = useState<number>(0);
    const bonusDamageRef = useRef(0);
    const [battleEnded, setBattleEnded] = useState<boolean>(false);
    const battleIntervalRef = useRef<NodeJS.Timeout | null>(null);
    const xp = useRef(0);

    const router = useRouter();

    const database = firebase
        .app()
        .database("https://taskapet-9c229-default-rtdb.europe-west1.firebasedatabase.app/");

    const fetchPetAndSetMonster = async () => {
        const userId = auth().currentUser?.uid;

        try {
            const reference = database.ref(`/users/${userId}/pet`);
            const snapshot = await reference.once('value');
            const data = snapshot.val();

            if (data) {
                setPet(data);
                const firstMonster = generateRandomMonster(data.level)
                setMonster(firstMonster);
                setPetHealth(data.health);
                setMonsterHealth(firstMonster.health);
            } else {
                console.warn("No pet data found");
            }
        } catch (error) {
            console.error("Error fetching pet:", error);
        }
    };

    /// START
    useEffect(() => {
        fetchPetAndSetMonster();
    }, []);

    useEffect(() => {
        if (!pet)
            return;
        startBattle();
    }, [pet])

    const spawnNewMonster = () => {
        if (!pet) return;

        const newMonster = generateRandomMonster(pet.level);
        setMonster(newMonster);
        setMonsterHealth(newMonster.health);
    };

    /// TURN
    const handleTurn = () => {
        if (battleEnded) return;
        if (!pet || !monster) return;

        const bonusDamage = bonusDamageRef.current;
        bonusDamageRef.current = 0; // reset immediately

        setMonsterHealth(prevMonsterHealth => {
            if (prevMonsterHealth <= 0) return prevMonsterHealth;

            const totalDamage = Math.max(pet.damage + bonusDamage - monster.armor, 1);
            const newMonsterHealth = Math.max(prevMonsterHealth - totalDamage, 0);

            if (newMonsterHealth <= 0) {
                return newMonsterHealth;
            }

            setPetHealth(prevPetHealth => {
                if (prevPetHealth <= 0) return prevPetHealth;
                const monsterDamage = Math.max(monster.damage - pet.armor, 1);
                return Math.max(prevPetHealth - monsterDamage, 0);
            });

            return newMonsterHealth;
        });
    };

    const startBattle = () => {
        battleIntervalRef.current = setInterval(() => {
            handleTurn();
        }, 1000); // change it to separate intervals for pet and monster next
    };

    const stopBattle = () => {
        if (battleIntervalRef.current) {
            clearInterval(battleIntervalRef.current);
            battleIntervalRef.current = null;
        }
    };

    // BATTLE END
    useEffect(() => {
        if (battleEnded) return;
        if (!pet) return;

        if (monsterHealth <= 0 && monster) {
            setBattleEnded(true);
            stopBattle();
            xp.current += 5;

            Alert.alert('Victory!', 'Monster defeated!', [
                {
                    text: 'Continue', onPress: () => {
                        setBattleEnded(false);
                        setPetHealth(prev => Math.min(prev + 50, pet.health));
                        spawnNewMonster();
                        startBattle();
                    }
                },
                {
                    text: 'Leave',
                    onPress: async () => {
                        try {
                            const userId = auth().currentUser?.uid;

                            await database.ref(`/users/${userId}/pet`)
                                .update({ health: petHealth, xp: pet.xp + xp.current, lastBattleDate: new Date().toISOString() });

                            router.back();
                        } catch (e) {
                            console.error(e);
                        }
                    }
                }

            ]);
        }
        if (petHealth <= 0) {
            setBattleEnded(true);
            stopBattle();

            Alert.alert('You Lost', 'Your pet has been defeated.', [
                {
                    text: 'Exit', onPress: async () => {
                        try {

                            const userId = auth().currentUser?.uid;
                            await database.ref(`/users/${userId}/pet`)
                                .update({ health: petHealth, xp: pet.xp + xp.current, lastBattleDate: new Date().toISOString() })

                            router.back()
                        }
                        catch (e) {
                            console.error(e);
                        }
                    }
                },
            ]);
        }
    }, [monsterHealth, petHealth]);


    const onCircleHit = () => {
        bonusDamageRef.current += 5;
        console.log("[AUTH/PETBATTLE] BonusDamageRef ", bonusDamageRef.current);
    };

    const chooseIcon = (type: string) => {
        switch (type) {
            case "Pichi": return require("@/assets/images/pichi.png");
            case "Char": return require("@/assets/images/char.png");
            case "Flower": return require("@/assets/images/flower.png");
            case "Water": return require("@/assets/images/water.png");
        }
    }

    return (
        <View style={{ flex: 1 }}>
            <Text>Pet HP: {petHealth}</Text>
            <Text>Monster HP: {monsterHealth}</Text>
            <Image source={chooseIcon(pet?.type)} style={{ width: 100, height: 100 }} />
            <Image source={monster?.sprite} style={{ width: 100, height: 100 }} />

            {/* Attack Points Circles */}
            <AttackPointManager onCircleHit={onCircleHit} battleEnded={battleEnded} />
            {/* You could add a button to leave manually */}
            {/* <TouchableOpacity onPress={() => router.back()}> */}
            {/*     <Text>Leave Battle</Text> */}
            {/* </TouchableOpacity> */}
        </View>
    );
}


/// MONSTER
type Monster = {
    health: number;
    damage: number;
    armor: number;
    speed: number;
    sprite: any;
};

function generateRandomMonster(petLevel: number): Monster {
    const baseHealth = 50 + petLevel * 10;
    const baseDamage = 3 + petLevel * 2;
    const baseArmor = petLevel;
    const attackSpeed = Math.random() * 2 + 1; // between 1s and 3s
    const monsterSprites = [
        require("@/assets/images/mr-mime.png"),
        require("@/assets/images/pinsir.png"),
        require("@/assets/images/venomoth.png"),
        require("@/assets/images/weezing.png"),
    ];
    const sprite = monsterSprites[Math.floor(Math.random() * monsterSprites.length)];

    return {
        health: Math.floor(baseHealth + Math.random() * 10),
        damage: Math.floor(baseDamage + Math.random() * 2),
        armor: Math.floor(baseArmor + Math.random() * 2),
        speed: attackSpeed,
        sprite,
    };
}


/// ATTACK POINTS
function AttackPointManager({ onCircleHit, battleEnded }: { onCircleHit: () => void, battleEnded: boolean }) {
    const [circles, setCircles] = useState<{ id: number }[]>([]);

    useEffect(() => {
        if (battleEnded) return;

        const interval = setInterval(() => {
            const id = Date.now();
            setCircles(prev => [...prev, { id }]);
        }, 3000);

        return () => clearInterval(interval);
    }, [battleEnded]);

    const removeCircle = (id: number) => {
        setCircles(prev => prev.filter(c => c.id !== id));
    };

    return (
        <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>
            {circles.map(circle => (
                <AttackPoint key={circle.id} onCircleHit={onCircleHit} onExpired={() => removeCircle(circle.id)} />
            ))}
        </View>
    );
}

const { width, height } = Dimensions.get('window');

function AttackPoint({ onCircleHit, onExpired }: { onCircleHit: () => void; onExpired: () => void }) {
    const [x, setX] = useState(Math.random() * (width - 100));
    const [y, setY] = useState(Math.random() * (height - 100));
    const radius = useSharedValue(1);

    useEffect(() => {
        radius.value = withTiming(0, { duration: 1500 }, (finished) => {
            if (finished) {
                runOnJS(onExpired)();
            }
        });
    }, []);

    const animatedStyle = useAnimatedStyle(() => ({
        scaleX: radius.value,
        scaleY: radius.value,
    }));

    return (
        <Animated.View
            style={[
                {
                    position: 'absolute',
                    top: y,
                    left: x,
                    borderRadius: 50,
                    width: 80,
                    height: 80,
                    borderWidth: 3,
                    borderColor: 'blue',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'rgba(0,0,255,0.2)',
                },
                animatedStyle,
            ]}
        >
            <TouchableOpacity
                style={{
                    width: '100%',
                    height: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
                onPress={() => {
                    onCircleHit();
                    onExpired(); // remove after hit
                }}
            >
            </TouchableOpacity>
        </Animated.View>
    );
}
