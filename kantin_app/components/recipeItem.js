import React from 'react';
import { View, Text, ImageBackground, StyleSheet, TouchableOpacity } from 'react-native';

export default function RecipeItem({ imageSource, title, by, minutes, ingredients, onPress }) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <ImageBackground source={imageSource} style={styles.image} blurRadius={3}>
        <View style={styles.overlay}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.by}>by {by}</Text>
          <View style={styles.separator} />
          <View style={styles.details}>
            <Text style={styles.detailItem}>{minutes} mins</Text>
            <Text style={styles.detailItem}>{ingredients} ingredients</Text>
          </View>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 200,
    height: 300,
    marginHorizontal: 10,
    borderRadius: 10,
    overflow: 'hidden',
  },
  image: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 15,
    backgroundColor: 'rgba(0, 0, 0, 0.3)', // Transparent to black gradient
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  by: {
    fontSize: 14,
    color: '#fff',
  },
  separator: {
    height: 2,
    backgroundColor: '#fff',
    marginVertical: 10,
  },
  details: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  detailItem: {
    fontSize: 14,
    color: '#fff',
  },
});
