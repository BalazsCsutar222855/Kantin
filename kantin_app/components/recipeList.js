import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import RecipeItem from './recipeItem'; // Adjust the path based on your folder structure

export default function RecipeList({ RECIPES, action, size }) {
  return (
    <FlatList
      data={RECIPES}
      renderItem={({ item }) => (
        <RecipeItem
          imageSource={item.imageSource}
          title={item.title}
          by={item.by}
          minutes={item.minutes}
          servings={item.servings}
          onPress={() => action(item)}
          size={size}
        />
      )}
      keyExtractor={(item) => item.id.toString()} // Ensure key is a string
      horizontal
      decelerationRate="fast"
      contentContainerStyle={styles.list}
      showsHorizontalScrollIndicator={false}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    paddingVertical: 10,
  },
});
