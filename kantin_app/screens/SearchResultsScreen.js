import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, FlatList } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { searchRecipes } from '../services/recipeManager';
import RecipeItem from '../components/recipeItem';

export default function SearchResultScreen() {
  const route = useRoute();
  const navigation = useNavigation(); // Add this to get access to the navigation prop
  const { query } = route.params || {};
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const data = await searchRecipes({ query });
        setResults(data.results); // Assuming 'results' is the correct key
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, [query]);

  const handlePress = (id, image) => {
    navigation.navigate('Recipe', { id, image }); // Navigate to RecipeScreen and pass the id
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Something went wrong: {error.message}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Search Results for: {query}</Text>
      <FlatList
        data={results}
        keyExtractor={(item) => item.id.toString()} // Adjust if necessary
        numColumns={2} // Display items in two columns
        renderItem={({ item }) => (
          <RecipeItem
            imageSource={item.image}
            title={item.title}
            by={item.sourceName}
            minutes={item.readyInMinutes}
            servings={item.servings}
            onPress={() => handlePress(item.id, item.image)} // Pass the item id to handlePress
            size="grid"
          />
        )}
        columnWrapperStyle={styles.row} // Apply styles for the grid layout
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f7f7f7',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  errorText: {
    fontSize: 18,
    color: 'red',
  },
  row: {
    justifyContent: 'space-between',
  },
});
