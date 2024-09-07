import React from 'react';
import { View, ScrollView, SafeAreaView, StyleSheet } from 'react-native';

//Components
import Titles from '../components/titles';

export default function FavouritesScreen() {
  return (

    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Titles type="bigTitle" title="My Cart" />
        </View> 
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop: 40,
    backgroundColor: '#f7f7f7', 
  },
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    gap: 10,
    marginBottom: 20,
  },
  section: {
    marginVertical: 6,
  },
});
