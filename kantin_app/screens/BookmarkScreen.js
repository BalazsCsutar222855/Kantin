import React, { useEffect, useState, useCallback } from 'react';
import { View, ScrollView, SafeAreaView, StyleSheet, ActivityIndicator, Text, FlatList, RefreshControl } from 'react-native';

// Components
import Titles from '../components/titles';
import SearchBar from '../components/searchBar';
import RecipeList from '../components/recipeList';
import RecipeItem from '../components/recipeItem';

// Helper
import { getRecentlyVisited } from '../helpers/recentlyVisited';
import { getBookmarkedRecipes } from '../helpers/bookmark';
import { getRecipeInformation } from '../services/recipeManager';

export default function FavouritesScreen() {
  const [recentlyVisited, setRecentlyVisited] = useState([]);
  const [bookmarkedRecipes, setBookmarkedRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Function to fetch all data
  const fetchData = async () => {
    try {
      setLoading(true);
      const recentlyVisited = await getRecentlyVisited();
      setRecentlyVisited(recentlyVisited);

      const bookmarkedRecipes = await getBookmarkedRecipes();
      const recipesWithDetails = await Promise.all(
        bookmarkedRecipes.map(async (recipe) => {
          const recipeInfo = await getRecipeInformation(recipe.id);
          return { ...recipe, ...recipeInfo };
        })
      );
      setBookmarkedRecipes(recipesWithDetails);
      console.log('Bookmarked recipes:', recipesWithDetails);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // Handler for refreshing
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchData();
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text>Loading...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.container}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        <View style={styles.header}>
          <Titles type="bigTitle" title="Bookmarks" />
          <SearchBar onSearch={(query) => setSearchQuery(query)} />
        </View> 
        <View style={styles.section}>
          <Titles type="sectionTitle" title="Recently visited" />
          <RecipeList RECIPES={recentlyVisited} action={(item) => console.log('clicked', item)} />
        </View>
        <View style={styles.section}>
          <Titles type="sectionTitle" title="All" />
          <FlatList
            data={bookmarkedRecipes}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            renderItem={({ item }) => (
              <RecipeItem
                imageSource={item.image}
                title={item.title}
                by={item.sourceName}
                minutes={item.readyInMinutes}
                servings={item.servings}
                onPress={() => handlePress(item.id, item.image)}
                size="grid"
              />
            )}
            columnWrapperStyle={styles.row}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          />
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    justifyContent: 'space-between',
  },
});
