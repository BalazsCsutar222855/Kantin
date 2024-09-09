import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from '../screens/HomeScreen';
import FavouritesScreen from '../screens/BookmarkScreen';
import BasketScreen from '../screens/BasketScreen';
import StackNavigator from './StackNavigator'; // Import StackNavigator
import ProfileScreen from '../screens/ProfileScreen'; // Import ProfileScreen

const Tab = createBottomTabNavigator();

export default function AppNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false, // Hide the top bar/header
        tabBarStyle: {
          height: 50, // Adjust the height of the tab bar
          paddingBottom: 0, // Adjust padding to center the icons vertically
        },
        tabBarIconStyle: {
          marginBottom: 0, // Remove any bottom margin
        },
        tabBarLabelStyle: {
          display: 'none', // Hide text labels
        },
        tabBarActiveTintColor: '#4CAF50', // Set the active color
        tabBarInactiveTintColor: 'gray', // Set the inactive color
        tabBarIcon: ({ focused, color }) => {
          let iconName;

          if (route.name === 'HomeStack') {
            iconName = focused ? 'home' : 'home-outline'; // Filled for active, outline for inactive
          } else if (route.name === 'Favourites') {
            iconName = focused ? 'bookmark' : 'bookmark-outline';
          } else if (route.name === 'Add') {
            iconName = focused ? 'add-circle-outline' : 'add-circle-outline';
          } else if (route.name === 'Basket') {
            iconName = focused ? 'bag' : 'bag-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person-circle' : 'person-circle-outline';
          }

          return <Ionicons name={iconName} size={20} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name="HomeStack"
        component={StackNavigator}
      />
      <Tab.Screen
        name="Favourites"
        component={FavouritesScreen}
      />
      <Tab.Screen
        name="Add"
        component={FavouritesScreen}
      />
      <Tab.Screen
        name="Basket"
        component={BasketScreen}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen} // Replace with actual component
      />
    </Tab.Navigator>
  );
}
