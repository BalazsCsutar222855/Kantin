import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './navigation/AppNavigatior';
import WelcomeScreen from './screens/WelcomeScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const [hasSeenWelcome, setHasSeenWelcome] = useState(false);

  useEffect(() => {
    const checkIfWelcomeScreenShouldBeShown = async () => {
      try {
        const value = await AsyncStorage.getItem('@has_seen_welcome');
        if (value !== null) {
          setHasSeenWelcome(true);
        }
      } catch (error) {
        console.error('Error checking AsyncStorage:', error);
      }
    };

    checkIfWelcomeScreenShouldBeShown();
  }, []);

  const handleProceed = async () => {
    try {
      await AsyncStorage.setItem('@has_seen_welcome', 'true');
      setHasSeenWelcome(true);
    } catch (error) {
      console.error('Error saving AsyncStorage:', error);
    }
  };

  return (
    <NavigationContainer>
      {hasSeenWelcome ? (
        <AppNavigator />
      ) : (
        <WelcomeScreen onProceed={handleProceed} />
      )}
    </NavigationContainer>
  );
}
