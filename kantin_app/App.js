import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './navigation/AppNavigatior';
import LoginScreen from './screens/AuthScreen';
import { onAuthStateChangedListener } from './helpers/auth'; 

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true); // Add a loading state for initial auth check

  useEffect(() => {
    // Subscribe to auth changes
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
      }
      setLoading(false); // Set loading to false after checking
    });

    // Cleanup the subscription when the component unmounts
    return unsubscribe;
  }, []);

  if (loading) {
    // You can return a loading spinner or splash screen while checking the auth state
    return null;
  }

  return (
    <NavigationContainer>
      {loggedIn ? <AppNavigator /> : <LoginScreen />}
    </NavigationContainer>
  );
}
