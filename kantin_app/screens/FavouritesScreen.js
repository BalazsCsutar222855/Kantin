import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function FavouritesScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>FavouritesScreen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
});
