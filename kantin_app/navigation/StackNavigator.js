import React from 'react';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import RecipeScreen from '../screens/RecipeScreen';
import SearchResultScreen from '../screens/SearchResultsScreen'; // Import SearchResultsScreen
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Import Material Icons for the back and bookmark button

const Stack = createStackNavigator();

export default function StackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#f8f8f8', // Customize header background
        },
        headerTintColor: '#000', // Customize header text color
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerTitleAlign: 'center', // Center the header title
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS, // Slide in from the right
        gestureEnabled: true, // Enable swipe gestures
      }}
    >
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }} // Hide header for HomeScreen
      />
      <Stack.Screen
        name="Recipe"
        component={RecipeScreen}
        options={{
          headerShown: true, // Show header for RecipeScreen
          headerTitleAlign: 'center', // Center the title
          headerLeft: ({ onPress }) => (
            <TouchableOpacity onPress={onPress} style={styles.headerButton}>
              <Ionicons name="arrow-back" size={20} color="black" />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity style={styles.headerButton}>
              <Ionicons name="bookmark-outline" size={20} color="black" />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="Search"
        component={SearchResultScreen} // Add SearchScreen to navigator
        options={{
          headerShown: true, // Show header for SearchScreen
          title: 'Search', // Customize the header title
          headerTitleAlign: 'center', // Center the title
          headerLeft: ({ onPress }) => (
            <TouchableOpacity onPress={onPress} style={styles.headerButton}>
              <Ionicons name="arrow-back" size={20} color="black" />
            </TouchableOpacity>
          ),
        }}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  headerButton: {
    padding: 10,
  },
});
