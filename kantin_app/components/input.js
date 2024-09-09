import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Simple Input component for general text input
export function SimpleInput({ placeholder, value, onChangeText }) {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={placeholder || 'Enter text...'}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
}

// Password Input component with show/hide functionality
export function PasswordInput({ placeholder, value, onChangeText }) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={placeholder || 'Enter password...'}
        secureTextEntry={!isPasswordVisible} // Toggles between password and text
        value={value}
        onChangeText={onChangeText}
      />
      
      <TouchableOpacity onPress={togglePasswordVisibility}>
        <Ionicons
          name={isPasswordVisible ? 'eye-off-outline' : 'eye-outline'}
          size={20}
          color="gray"
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    margin: 2,
    
    // Shadow for iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    
    // Elevation for Android
    elevation: 1,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: 'black',
    marginLeft: 8,
  },
});
