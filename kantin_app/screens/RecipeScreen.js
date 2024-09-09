import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, Dimensions, ActivityIndicator } from 'react-native';
import Animated, { useAnimatedRef, useAnimatedStyle, useScrollViewOffset } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { getRecipeInformation } from '../services/recipeManager';
import RenderHtml from 'react-native-render-html';

// Components
import Titles from '../components/titles';
import IngredientItem from '../components/ingredientItem';
import StepItem from '../components/stepItem';

//Helper
import {addRecipeToRecentlyVisited} from '../helpers/recentlyVisited';

const { width } = Dimensions.get('window');

export default function RecipeScreen({route}) {
  const { id, image } = route.params;
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const data = await getRecipeInformation(id, true); // Pass the ID and include nutrition data
        setRecipe(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  useEffect(() => {
    addRecipeToRecentlyVisited({id, image, recipe});
  }, [id, image, recipe]);


  const scrollRef = useAnimatedRef();
  const scrollOffset = useScrollViewOffset(scrollRef);

  const imageAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: scrollOffset.value * 0.5, // Adjust the multiplier to control parallax effect
        },
      ],
    };
  }, [scrollOffset]);

  // Function to clean up description
  const cleanDescription = (description) => {
    // Remove sentences containing prices
    const noPriceSentences = description.split('.').filter(sentence => !/\$\d+(\.\d{2})?/.test(sentence)).join('.');
    return noPriceSentences;
  };


  return (
    <View style={styles.container}>
      <Animated.ScrollView ref={scrollRef} contentContainerStyle={styles.scrollViewContent}>
        {
          loading ? (
            <View style={styles.container}>
              <ActivityIndicator size="large" color="#0000ff" />
            </View>
          ) : error ? (
            <View style={styles.container}>
              <Text style={styles.errorText}>Something went wrong!</Text>
            </View>
          ) : (
            <View style={styles.container}>
              <Animated.Image
                source={{ uri: image ? image : 'https://via.placeholder.com/300' }}
                style={[styles.image, imageAnimatedStyle]}
              />
              <View style={styles.content}>
                <View style={styles.bar}></View>
                <View style={styles.header}>
                  <Titles type="bigTitle" title={recipe.title} />
                  <Titles type="description" title={`By ${recipe.sourceName || 'Unknown'}`} />
                  <View style={styles.details}>
                    <View style={styles.detailItem}>
                      <Ionicons name="time-outline" size={16} color="#666" />
                      <Text style={styles.detailText}>{recipe.readyInMinutes} mins</Text>
                    </View>
                    <View style={styles.detailItem}>
                      <Ionicons name="server-outline" size={16} color="#666" />
                      <Text style={styles.detailText}>{recipe.servings} servings</Text>
                    </View>
                    <View style={styles.detailItem}>
                      <Ionicons name="scale-outline" size={16} color="#666" />
                      <Text style={styles.detailText}>{recipe.nutrition?.nutrients?.find(n => n.name === 'Calories')?.amount || 'N/A'} kcal</Text>
                    </View>
                  </View>
                </View>

                <View style={styles.section}>
                  <Titles type="sectionTitle" title="Description" />
                  <RenderHtml
                    contentWidth={width}
                    source={{ html: cleanDescription(recipe.summary) || 'No description available' }}
                  />
                </View>

                <View style={styles.section}>
                  <Titles type="sectionTitle" title="Ingredients" />
                  {recipe.extendedIngredients?.map((ingredient) => (
                    <IngredientItem
                      key={ingredient.id}
                      imageSource={{ uri: ingredient.image ? `https://spoonacular.com/cdn/ingredients_100x100/${ingredient.image}` : 'https://via.placeholder.com/50' }}
                      name={ingredient.name}
                      volume={ingredient.amount + ' ' + ingredient.unit}
                      storeLogo={{ uri: 'https://via.placeholder.com/30' }}
                    />
                  ))}
                </View>

                <View style={styles.section}>
                  <Titles type="sectionTitle" title="Steps" />
                  {recipe.analyzedInstructions[0]?.steps.map((step) => (
                    <StepItem
                      key={step.number}
                      stepNumber={step.number.toString()}
                      title={step.step}
                      imageSource={{ uri: 'https://via.placeholder.com/100' }} // Placeholder image URL
                    />
                  ))}
                </View>

                <View style={styles.section}>
                  <Titles type="sectionTitle" title="Nutrition" />
                  {recipe.nutrition?.nutrients?.map((nutrient) => (
                    <View key={nutrient.name} style={styles.nutritionItem}>
                      <Text style={styles.nutritionText}>
                        {nutrient.name}: {nutrient.amount} {nutrient.unit}
                      </Text>
                    </View>
                  ))}
                </View>

              </View>
            </View>
          )
        }
      </Animated.ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7', 
  },
  scrollViewContent: {
    paddingBottom: 0, // Remove or adjust as needed
  },
  image: {
    width,
    height: 300,
  },
  content: {
    backgroundColor: '#f7f7f7', 
    padding: 15,
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
    top: -20,
  },
  bar: {
    width: 40,
    height: 5,
    backgroundColor: 'lightgray',
    borderRadius: 20,
    marginTop: 0,
    marginBottom: 30,
    alignSelf: 'center',
  },
  header: {
    paddingBottom: 25,
    marginBottom: 25,
    borderBottomWidth: 1,
    borderColor: 'lightgray',
  },
  section: {
    marginVertical: 20,
  },
  details: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 10,
    gap: 20,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 5, // Space between icon and text
  },
  nutritionItem: {
    marginVertical: 5,
  },
  nutritionText: {
    fontSize: 14,
    color: '#444',
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
});
