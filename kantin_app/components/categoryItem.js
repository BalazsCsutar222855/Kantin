import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

export default function CategoryItem({ imageSource, text, onPress, isActive }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View style={[styles.item, isActive && styles.activeItem]}>
        <Text style={[styles.text, isActive && styles.activeText]}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    margin: 5,
    marginBottom: 15,
  },
  item: {
    padding: 10,
    borderRadius: 50,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',

        // Shadow for iOS
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        
        // Elevation for Android
        elevation: 1,
  },
  activeItem: {
    backgroundColor: '#4CAF50', // Green background for the active item
  },
  image: {
    width: 60 * 0.6, // Adjust the size of the image inside the circle
    height: 60 * 0.6,
  },
  text: {
    fontSize: 14,
    fontWeight: '400',
    textAlign: 'center',
    color: 'grey',
  },
  activeText: {
    color: 'white', // Green text for the active item
    fontWeight: '500',
  },
});
