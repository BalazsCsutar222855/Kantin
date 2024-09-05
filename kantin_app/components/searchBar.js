import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function SearchBar({ onSearch }) {
  const [searchText, setSearchText] = useState('');

  const handleChange = (text) => {
    setSearchText(text); // Update local state
    onSearch(text);      // Notify parent component
  };

  const clearInput = () => {
    setSearchText('');    // Clear input
    onSearch('');         // Notify parent that search is cleared
  };

  return (
    <View style={styles.container}>
      <MaterialIcons name="search" size={24} color="gray" />
      
      <TextInput
        style={styles.input}
        placeholder="Search..."
        value={searchText}
        onChangeText={handleChange}
      />

      {searchText.length > 0 && (
        <TouchableOpacity onPress={clearInput}>
          <MaterialIcons name="close" size={24} color="gray" style={styles.clearIcon} />
        </TouchableOpacity>
      )}
      
      <View style={styles.verticalLine} />

      <MaterialIcons name="filter-list" size={24} color="gray" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 100,
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
  verticalLine: {
    height: 24,
    width: 1,
    backgroundColor: 'gray',
    marginHorizontal: 10,
  },
  clearIcon: {
    paddingHorizontal: 8,
  },
});
