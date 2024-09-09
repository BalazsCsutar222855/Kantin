import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Image, View } from 'react-native';

// Regular Button Component
const Button = ({ onPress, title, style, textStyle, disabled }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.button,
        style,
        disabled ? styles.buttonDisabled : null,
      ]}
      disabled={disabled}
    >
      <Text style={[styles.text, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

// Social Button Component
const SocialButton = ({ onPress, title, imageSource, style, textStyle, disabled }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.socialButton,
        style,
        disabled ? styles.buttonDisabled : null,
      ]}
      disabled={disabled}
    >
      <View style={styles.contentContainer}>
        {imageSource && <Image source={imageSource} style={styles.icon} />}
        <Text style={[styles.text, styles.socialText, textStyle]}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  // Styles for Regular Button
  button: {
    backgroundColor: '#4CAF50', // Default button color
    borderRadius: 10,         // Rounded corners
    paddingHorizontal: 20,
    paddingVertical: 14,
    margin: 2,

    // Shadow for iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    
    // Elevation for Android
    elevation: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#b0bec5', // Disabled button color
    elevation: 0,               // No shadow for disabled button
  },
  text: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },

  // Styles for Social Button
  socialButton: {
    backgroundColor: 'white',   // White background for social button
    borderRadius: 10,          // Rounded corners
    paddingHorizontal: 20,
    paddingVertical: 14,
    margin: 2,
    flexDirection: 'row',       // Align icon and text horizontally
    alignItems: 'center',

    // Shadow for iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    
    // Elevation for Android
    elevation: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentContainer: {
    flexDirection: 'row',       // Align icon and text horizontally
    alignItems: 'center',
  },
  icon: {
    width: 20,                  // Icon size
    height: 20,
    marginRight: 10,            // Space between icon and text
  },
  socialText: {
    color: 'black',             // Black text for social buttons
  },
});

export { Button, SocialButton };
