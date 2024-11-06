// TabNavigation.tsx
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Feeds from '../screens/Feed';
import Profile from '../screens/Profile';
import Notic from '../screens/Notic'; 
import Message from '../screens/Message'; 
import ForgetPass from '../screens/ForgetPass';
import { StyleSheet, View } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';


const Tab = createBottomTabNavigator();

const ACTIVE_COLOR = '#FFFFFF'; // Color for the active icon
const INACTIVE_COLOR = '#0B0F4C'; // Color for inactive icons
const BACKGROUND = '#0B0F4C'; // Background color when the icon is focused
const TEXT_COLOR = '#0B0F4C'; // Always navy color for text

// Function to determine the icon based on the route
const getTabBarIcon = (route: { name: string }, focused: boolean, size: number) => {
    let iconName: keyof typeof MaterialIcons.glyphMap;

    switch (route.name) {
        case 'Feeds':
            iconName = 'dynamic-feed'; // Icon for the Feeds screen
            break;
        case 'Profile':
            iconName = 'person'; // Icon for the Profile screen
            break;
        case 'Notic':
            iconName = 'notifications'; // Icon for the Notic (Notifications) screen
            break;
        case 'Message':
            iconName = 'message'; // Icon for the Message screen
            break;
        default:
            iconName = 'circle';
            break;
    }
    
    return (
        <View style={[styles.icon, focused && styles.focusedIcon]}>
            <MaterialIcons name={iconName} size={size} color={focused ? ACTIVE_COLOR : INACTIVE_COLOR} />
        </View>
    );
};

const TabNavigation = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, size }) => getTabBarIcon(route, focused, size),
                tabBarActiveTintColor: ACTIVE_COLOR,
                tabBarInactiveTintColor: INACTIVE_COLOR,
                tabBarStyle: {
                    height: 70,
                    paddingTop: 10,
                    paddingBottom: 7, // Additional padding for better spacing
                    backgroundColor: '#e6e6e6', // Background color for the tab bar
                },
                tabBarLabelStyle: {
                    color: TEXT_COLOR, // Always navy color for text
                    fontSize: 12,
                },
                tabBarItemStyle: {
                    padding: 0, // No additional padding
                },
            })}
        >
            <Tab.Screen name="Feeds" component={Feeds} options={{ headerShown: false }} />
            <Tab.Screen name="Notic" component={Notic} options={{ headerShown: false }} />
            <Tab.Screen name="Message" component={Message} options={{ headerShown: false }} />
            <Tab.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
        </Tab.Navigator>
    );
};

const styles = StyleSheet.create({
    icon: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 60,
        height: 35,
        borderRadius: 20,
    },
    focusedIcon: {
        backgroundColor: BACKGROUND,
    },
});

export default TabNavigation;
