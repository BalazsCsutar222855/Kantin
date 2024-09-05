import React, { useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import CategoryItem from './categoryItem';

const CATEGORY_DATA = [
  { id: '1', text: 'Breakfast', imageSource: { uri: 'https://example.com/image1.png' } },
  { id: '2', text: 'Dessert', imageSource: { uri: 'https://example.com/image2.png' } },
  { id: '3', text: 'Fast Food', imageSource: { uri: 'https://example.com/image3.png' } },
  { id: '4', text: 'Sea Food', imageSource: { uri: 'https://example.com/image1.png' } },
  { id: '5', text: 'Vegetarian', imageSource: { uri: 'https://example.com/image2.png' } },
  // Add more items as needed
];

export default function CategoryList({ onSelect }) {
  const [activeId, setActiveId] = useState(null);

  const handlePress = (id) => {
    setActiveId(id);
    onSelect(id); // Notify parent component
  };

  return (
    <FlatList
      data={CATEGORY_DATA}
      renderItem={({ item }) => (
        <CategoryItem
          imageSource={item.imageSource}
          text={item.text}
          onPress={() => handlePress(item.id)}
          isActive={item.id === activeId}
        />
      )}
      keyExtractor={(item) => item.id}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.list}
    />
  );
}

const styles = StyleSheet.create({
  list: {
  },
});
