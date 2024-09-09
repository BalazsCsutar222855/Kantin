import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import RecipeItem from './recipeItem'; // Adjust the path based on your folder structure


export default function RecipeList({RECIPES, action, size}) {
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
          onPress={action}
          size={size}
        />
      )}
      keyExtractor={(item) => item.id}
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
