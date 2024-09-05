import React, { useState, useMemo } from 'react';
import { View, Text, ScrollView, StyleSheet, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Components
import Titles from '../components/titles';
import CategoryList from '../components/categoryList';
import SearchBar from '../components/searchBar';
import RecipeList from '../components/recipeList';
import ProfilePicture from '../components/profilePicture';

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

  const CATEGORY_DATA = [
    { id: '1', text: 'Breakfast', imageSource: { uri: 'https://example.com/image1.png' } },
    { id: '2', text: 'Dessert', imageSource: { uri: 'https://example.com/image2.png' } },
    { id: '3', text: 'Fast Food', imageSource: { uri: 'https://example.com/image3.png' } },
    { id: '4', text: 'Sea Food', imageSource: { uri: 'https://example.com/image1.png' } },
    { id: '5', text: 'Vegetarian', imageSource: { uri: 'https://example.com/image2.png' } },
    // Add more items as needed
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
        <View style={styles.header}>
            <View style={styles.textContainer}>
              <Titles type="description" title="Hello, Balazs" />
              <Titles type="bigTitle" title="What would you like to eat today?" />
            </View>
            <ProfilePicture 
              uri="https://media.licdn.com/dms/image/v2/D5603AQFvi4-J09lBuQ/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1725547310482?e=1730937600&v=beta&t=W1BlE1eCYsXFv8YLrRbato9Immovx4-9gHLyfHOxLkk" 
              size={50} 
            />
          </View>

          <View>
            <SearchBar onSearch={(query) => setSearchQuery(query)} />
              {searchQuery.length <= 2 && (
              <CategoryList onSelect={handleSelect} CATEGORY_DATA={CATEGORY_DATA} />
            )}
          </View>

        {searchQuery.length <= 2 && (
          <>
            <View style={styles.section}>
              <Titles type="sectionTitle" title="Reccomended for you" />
              <RecipeList RECIPES={filteredRecipes} action={handlePress} />
            </View>

            <View style={styles.section}>
              <Titles type="sectionTitle" title="Weekly trending"  onSeeAllPress/>
              <RecipeList RECIPES={filteredRecipes} action={handlePress} size="wide"/>
            </View>

            <View style={styles.section}>
              <Titles type="sectionTitle" title="Seasonal ingredients" onSeeAllPress />
              <RecipeList RECIPES={filteredRecipes} action={handlePress} size="wide"/>
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
    paddingTop: 40,
    backgroundColor: '#f7f7f7', 
  },
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  textContainer: {
    flex: 1,
    maxWidth: '80%',
  },
  section: {
    marginVertical: 6,
  },
  noResults: {
    alignItems: 'center',
    marginTop: 20,
  },
});