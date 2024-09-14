import React, { useRef, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getAuth } from 'firebase/auth';

//Components
import Titles from '../components/titles';
import CategoryList from '../components/categoryList';
import SearchBar from '../components/searchBar';
import RecipeList from '../components/recipeList';
import ProfilePicture from '../components/profilePicture';
import FilterSheet from '../components/filterSheet'; // Optional, remove if not needed
import {Button} from '../components/button';

export default function HomeScreen() {
  const user = getAuth().currentUser;
  const [searchQuery, setSearchQuery] = useState('');
  const navigation = useNavigation();
  const bottomSheetRef = useRef(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const openSheet = () => {
    setIsSheetOpen(true);
  };

  const closeSheet = () => {
    setIsSheetOpen(false);
  };

  const handleSelect = (id) => {
    console.log('Selected category ID:', id);
  };

  const handlePress = (id, image) => {
    navigation.navigate('Recipe', { id, image }); // Navigate to RecipeScreen and pass the id
  };

  const handleSearchPress = () => {
    // Navigate to SearchScreen and pass the searchQuery
    navigation.navigate('Search', { query: searchQuery });
  };

  const RECIPES = [
    {
      id: '1',
      imageSource: 'https://media.istockphoto.com/id/641845826/nl/foto/engels-ontbijt.jpg?s=2048x2048&w=is&k=20&c=GZK6AkhwLyLHI6za4ksf4lrx995yE4ZxcsANoOo5SuA=',
      title: 'Recipe 1',
      by: 'Chef A',
      minutes: 30,
      ingredients: 5,
    },
    {
      id: '2',
      imageSource: 'https://media.istockphoto.com/id/874775878/nl/foto/engels-ontbijt-gebakken-eieren-worstjes-bacon.jpg?s=2048x2048&w=is&k=20&c=5FIrEMknUEtVqvAaBF5sastRLSTQ-Qk2iJJo2fONGe4=',
      title: 'Recipe 2',
      by: 'Chef B',
      minutes: 45,
      ingredients: 8,
    },
    {
      id: '3',
      imageSource: 'https://media.istockphoto.com/id/874775878/nl/foto/engels-ontbijt-gebakken-eieren-worstjes-bacon.jpg?s=2048x2048&w=is&k=20&c=5FIrEMknUEtVqvAaBF5sastRLSTQ-Qk2iJJo2fONGe4=',
      title: 'Recipe 1',
      by: 'Chef A',
      minutes: 30,
      ingredients: 5,
    },
    {
      id: '4',
      imageSource: 'https://media.istockphoto.com/id/874775878/nl/foto/engels-ontbijt-gebakken-eieren-worstjes-bacon.jpg?s=2048x2048&w=is&k=20&c=5FIrEMknUEtVqvAaBF5sastRLSTQ-Qk2iJJo2fONGe4=',
      title: 'Recipe 2',
      by: 'Chef B',
      minutes: 45,
      ingredients: 8,
    },
    // Add more recipes as needed
  ];

  const CATEGORY_DATA = [
    { id: '1', text: 'Breakfast'},
    { id: '2', text: 'Dessert'},
    { id: '3', text: 'Fast Food'},
    { id: '4', text: 'Sea Food'},
    { id: '5', text: 'Vegetarian'},
    // Add more items as needed
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <View style={styles.textContainer}>
            <Titles type="description" title={`Hello, ${user.email|| 'Chef'}!`} />
            <Titles type="bigTitle" title="What would you like to eat today?" />
          </View>
          <ProfilePicture 
            uri="https://media.licdn.com/dms/image/v2/D5603AQFpL5tn2bGP4w/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1725571032702?e=1731542400&v=beta&t=cDXqhtH_gWUBGICvqSlyzz6D35eFo9yuipowTCzxbtk" 
            size={50} 
          />
        </View>

        <View style={styles.searchArea}>
          <SearchBar
            onSearch={(query) => setSearchQuery(query)}
            onOpenFilter={openSheet}
          />
          <CategoryList onSelect={handleSelect} CATEGORY_DATA={CATEGORY_DATA} />
          <Button
            title="Search"
            onPress={handleSearchPress} // Use handleSearchPress to navigate
            disabled={searchQuery.length < 3}
          />
        </View>

        <View style={styles.section}>
          <Titles type="sectionTitle" title="Recommended for you" />
          <RecipeList RECIPES={RECIPES} action={(recipe) => handlePress(recipe.id, recipe.imageSource)} />
        </View>

        <View style={styles.section}>
          <Titles type="sectionTitle" title="Weekly trending" onSeeAllPress />
          <RecipeList RECIPES={RECIPES} action={(recipe) => handlePress(recipe.id, recipe.imageSource)} size="wide" />
        </View>

        <View style={styles.section}>
          <Titles type="sectionTitle" title="Seasonal ingredients" onSeeAllPress />
          <RecipeList RECIPES={RECIPES} action={(recipe) => handlePress(recipe.id, recipe.imageSource)} size="wide" />
        </View>
      </ScrollView>
      <FilterSheet
        ref={bottomSheetRef}
        isSheetOpen={isSheetOpen}
        onClose={closeSheet}
      />
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
  },
  searchArea: {
    marginVertical: 30,
  },
  textContainer: {
    flex: 1,
    maxWidth: '80%',
  },
  section: {
    marginVertical: 6,
  },
});
