import { Tabs } from 'expo-router';
import { Image, StyleSheet } from 'react-native';

export default function TabLayout() {
    return (
        <Tabs screenOptions={{
            tabBarShowLabel: false,
            tabBarStyle: {
                height: 64,
                paddingBottom: 24,
                paddingTop: 12,
            }
        }}>
            <Tabs.Screen
                name="pet"
                options={{
                    title: "Pet", tabBarIcon: ({ focused }) => (
                        <Image
                            source={require('../../assets/images/pet.png')}
                            style={styles.image}
                        />
                    )
                }}
            />
            <Tabs.Screen
                name="shop"
                options={{
                    title: "Shop", tabBarIcon: ({ focused }) => (
                        <Image
                            source={require('../../assets/images/shop.png')}
                            style={styles.image}
                        />
                    )
                }}
            />
            <Tabs.Screen
                name="home"
                options={{
                    title: "Today's Tasks", tabBarIcon: ({ focused }) => (
                        <Image
                            source={require('../../assets/images/home.png')}
                            style={styles.image}
                        />
                    )
                }}
            />
            <Tabs.Screen
                name="tasks"
                options={{
                    title: "All Tasks", tabBarIcon: ({ focused }) => (
                        <Image
                            source={require('../../assets/images/tasks.png')}
                            style={styles.image}
                        />
                    )
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: "Profile", tabBarIcon: ({ focused }) => (
                        <Image
                            source={require('../../assets/images/profile.png')}
                            style={styles.image}
                        />
                    )
                }}
            />
        </Tabs>
    );
}

const styles = StyleSheet.create({
    image: {
        width: 36,
        height: 36,
    }
})