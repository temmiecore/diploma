import { createStyles } from '@/helpers/styles';
import { useTheme } from '@/helpers/themeContext';
import { Stack, Tabs } from 'expo-router';
import { Button, Image, StyleSheet } from 'react-native';

export default function TabLayout() {
    const { theme } = useTheme();
    const styles = createStyles(theme);

    return (
        <Tabs screenOptions={{
            tabBarShowLabel: false,
            tabBarStyle: [styles.footer,{
                height: 64,
                paddingBottom: 24,
                paddingTop: 12,

            }]
        }}>
            <Tabs.Screen
                name="pet"
                options={{
                    title: "Pet", tabBarIcon: ({ focused }) => (
                        <Image
                            source={require('../../../assets/images/pet.png')}
                            style={styles.footerImage}
                        />
                    ),
                    headerShown: false
                }}

            />
            <Tabs.Screen
                name="shop"
                options={{
                    title: "Shop", tabBarIcon: ({ focused }) => (
                        <Image
                            source={require('../../../assets/images/shop.png')}
                            style={styles.footerImage}
                        />
                    ),
                    headerShown: false
                }}
            />
            <Tabs.Screen
                name="home"
                options={{
                    title: "Today's Tasks", tabBarIcon: ({ focused }) => (
                        <Image
                            source={require('../../../assets/images/home.png')}
                            style={styles.footerImage}
                        />
                    ),
                    headerShown: false
                }}
            />
            <Tabs.Screen
                name="tasks"
                options={{
                    title: "All Tasks", tabBarIcon: ({ focused }) => (
                        <Image
                            source={require('../../../assets/images/tasks.png')}
                            style={styles.footerImage}
                        />
                    ),
                    headerShown: false
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: "Profile", tabBarIcon: ({ focused }) => (
                        <Image
                            source={require('../../../assets/images/profile.png')}
                            style={styles.footerImage}
                        />
                    ),
                    headerShown: false
                }}
            />
        </Tabs>
    );
}
