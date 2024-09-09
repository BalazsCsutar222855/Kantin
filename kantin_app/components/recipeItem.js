import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function RecipeItem({ imageSource, title, by, minutes, servings, onPress, size = 'narrow' }) { // Default value for size

  return (
    <TouchableOpacity style={styles.container(size)} onPress={onPress}>
      <Image source={{uri: imageSource}} style={styles.image(size)} />
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.by}>by {by || 'Unknown'}</Text>
        <View style={styles.details}>
          <View style={styles.detailItem}>
            <Ionicons name="time-outline" size={16} color="#666" />
            <Text style={styles.detailText}>{minutes || 'N/A'} mins</Text>
          </View>
          <View style={styles.detailItem}>
            <Ionicons name="server-outline" size={16} color="#666" />
            <Text style={styles.detailText}>{servings || 'N/A'} servings</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: (size) => ({
    width: size === 'grid' ? '46%' : (size === 'wide' ? 260 : 180),
    borderRadius: 10,
    overflow: 'hidden',
    marginHorizontal: 5,
    marginVertical: 5,
  }),
  image: (size) => ({
    width: '100%',
    height: size === 'grid' ? 180 : (size === 'wide' ? 180 : 240),
    borderRadius: 10,
  }),
  detailsContainer: {
    paddingVertical: 15,
    backgroundColor: '#f7f7f7', // Light background for the details
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  by: {
    fontSize: 14,
    color: '#666',
  },
  details: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 10,
    gap: 10
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 5, // Space between icon and text
  },
});
