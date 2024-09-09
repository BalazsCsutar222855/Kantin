import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { logout } from '../helpers/auth';  // Import the logout function

export default function ProfileScreen({ navigation }) {

  const handleLogout = async () => {
    const result = await logout();
    if (result.success) {
      console.log(result.message);
      // Navigate to the login screen or do any other required action
      navigation.replace('LoginScreen');
    } else {
      console.error(result.error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.profileText}>Profile Screen</Text>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileText: {
    fontSize: 24,
    marginBottom: 20,
  },
});
