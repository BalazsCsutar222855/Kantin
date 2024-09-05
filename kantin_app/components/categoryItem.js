import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

// Size of the circular item
const ITEM_SIZE = 45;

export default function CategoryItem({ imageSource, text, onPress, isActive }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View style={[styles.circle, isActive && styles.activeCircle]}>
        <Image source={imageSource} style={styles.image} resizeMode="contain" />
      </View>
      <Text style={[styles.text, isActive && styles.activeText]}>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    margin: 10,
  },
  circle: {
    width: ITEM_SIZE,
    height: ITEM_SIZE,
    borderRadius: ITEM_SIZE / 2,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  activeCircle: {
    backgroundColor: '#4CAF50', // Green background for the active item
  },
  image: {
    width: ITEM_SIZE * 0.6, // Adjust the size of the image inside the circle
    height: ITEM_SIZE * 0.6,
  },
  text: {
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
    color: 'grey',
  },
  activeText: {
    color: '#4CAF50', // Green text for the active item
  },
});
