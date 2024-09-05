// In RecipeScreen.js
import React, { useCallback } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useFocusEffect, useRoute } from '@react-navigation/native';

export default function RecipeScreen() {
  const route = useRoute();
  const { recipeId } = route.params; // Get the recipeId from params

  // Using useCallback to memoize the effect callback
  const logRecipeId = useCallback(() => {
    console.log('Recipe ID:', recipeId);
  }, [recipeId]);

  // Applying useFocusEffect to run logRecipeId when the screen is focused
  useFocusEffect(logRecipeId);

  return (
    <View style={styles.container}>
      {/* Fetch and display the recipe details using recipeId */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
