import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons'; // Import MaterialIcons
import HomeScreen from '../screens/HomeScreen';
import FavouritesScreen from '../screens/FavouritesScreen';
import BasketScreen from '../screens/BasketScreen';
import StackNavigator from './StackNavigator'; // Import StackNavigator

const Tab = createBottomTabNavigator();

export default function AppNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false, // Hide the top bar/header
      }}
    >
      <Tab.Screen
        name="HomeStack"
        component={StackNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Favourites"
        component={FavouritesScreen} // Replace with actual component
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="favorite" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Basket"
        component={BasketScreen} // Replace with actual component
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="shopping-basket" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={BasketScreen} // Replace with actual component
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="profile" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
