import React, { useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import CategoryItem from './categoryItem';

export default function CategoryList({CATEGORY_DATA, onSelect }) {
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
    marginTop: 5
  },
});
