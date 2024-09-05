import React, { useState, useMemo } from 'react';
import { View, Text, ScrollView, StyleSheet, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Components
import Titles from '../components/titles';
import CategoryList from '../components/categoryList';
import SearchBar from '../components/searchBar';
import RecipeList from '../components/recipeList';

export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigation = useNavigation();

  const handleSelect = (id) => {
    console.log('Selected category ID:', id);
    // Handle selected category (e.g., navigate or update state)
  };

  const handlePress = (id) => {
    navigation.navigate('Recipe', { recipeId: id });
  };

  const RECIPES = [
    {
      id: '1',
      imageSource: { uri: 'https://media.istockphoto.com/id/641845826/nl/foto/engels-ontbijt.jpg?s=2048x2048&w=is&k=20&c=GZK6AkhwLyLHI6za4ksf4lrx995yE4ZxcsANoOo5SuA=' },
      title: 'Recipe 1',
      by: 'Chef A',
      minutes: 30,
      ingredients: 5,
    },
    {
      id: '2',
      imageSource: { uri: 'https://media.istockphoto.com/id/874775878/nl/foto/engels-ontbijt-gebakken-eieren-worstjes-bacon.jpg?s=2048x2048&w=is&k=20&c=5FIrEMknUEtVqvAaBF5sastRLSTQ-Qk2iJJo2fONGe4=' },
      title: 'Recipe 2',
      by: 'Chef B',
      minutes: 45,
      ingredients: 8,
    },
    {
      id: '3',
      imageSource: { uri: 'https://media.istockphoto.com/id/641845826/nl/foto/engels-ontbijt.jpg?s=2048x2048&w=is&k=20&c=GZK6AkhwLyLHI6za4ksf4lrx995yE4ZxcsANoOo5SuA=' },
      title: 'Recipe 1',
      by: 'Chef A',
      minutes: 30,
      ingredients: 5,
    },
    {
      id: '4',
      imageSource: { uri: 'https://media.istockphoto.com/id/874775878/nl/foto/engels-ontbijt-gebakken-eieren-worstjes-bacon.jpg?s=2048x2048&w=is&k=20&c=5FIrEMknUEtVqvAaBF5sastRLSTQ-Qk2iJJo2fONGe4=' },
      title: 'Recipe 2',
      by: 'Chef B',
      minutes: 45,
      ingredients: 8,
    },
  ];

  // Filter recipes based on the search query
  const filteredRecipes = useMemo(() => {
    if (searchQuery.length > 2) {
      return RECIPES.filter(recipe =>
        recipe.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return RECIPES;
  }, [searchQuery, RECIPES]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>

          <View>
            <Titles type="bigTitle" title="What are we eating today?" />
            <SearchBar onSearch={(query) => setSearchQuery(query)} />
            {searchQuery.length <= 2 && (
            <CategoryList onSelect={handleSelect} />
            )}
          </View>

        {searchQuery.length <= 2 && (
          <>
            <View style={styles.section}>
              <Titles type="sectionTitle" title="Trending" />
              <RecipeList RECIPES={filteredRecipes} action={handlePress} />
            </View>

            <View style={styles.section}>
              <Titles type="sectionTitle" title="Breakfast" />
              <RecipeList RECIPES={filteredRecipes} action={handlePress} />
            </View>

            <View style={styles.section}>
              <Titles type="sectionTitle" title="Seasonal ingredients" />
              <RecipeList RECIPES={filteredRecipes} action={handlePress} />
            </View>
          </>
        )}

        {searchQuery.length > 2 && (
          <View style={styles.section}>
            <RecipeList RECIPES={filteredRecipes} action={handlePress} layout="vertical"/>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop: 30,
    backgroundColor: 'white', // Optional: ensure the background color matches your app's theme
  },
  container: {
    flex: 1,
    padding: 16,
  },
  section: {
    marginVertical: 10,
  },
});
