import React from 'react';
import { View, StyleSheet, Text, Dimensions } from 'react-native';
import Animated, { useAnimatedRef, useAnimatedStyle, useScrollViewOffset } from 'react-native-reanimated';
import { MaterialIcons } from '@expo/vector-icons';

// Components
import Titles from '../components/titles';
import IngredientItem from '../components/ingredientItem';
import StepItem from '../components/stepItem';

const { width } = Dimensions.get('window');

export default function RecipeScreen() {
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

  return (
    <View style={styles.container}>
      <Animated.ScrollView ref={scrollRef} contentContainerStyle={styles.scrollViewContent}>
        <Animated.Image
          source={{ uri: 'https://media.istockphoto.com/id/641845826/nl/foto/engels-ontbijt.jpg?s=2048x2048&w=is&k=20&c=GZK6AkhwLyLHI6za4ksf4lrx995yE4ZxcsANoOo5SuA=' }}
          style={[styles.image, imageAnimatedStyle]}
        />
        <View style={styles.content}>
          <View style={styles.bar}></View>
          <View style={styles.header}>
            <Titles type="bigTitle" title="Recipe 1" />
            <Titles type="description" title="By Balazs" />
            <View style={styles.details}>
              <View style={styles.detailItem}>
                <MaterialIcons name="access-time" size={16} color="#666" />
                <Text style={styles.detailText}>10 mins</Text>
              </View>
              <View style={styles.detailItem}>
                <MaterialIcons name="list" size={16} color="#666" />
                <Text style={styles.detailText}>6 pcs</Text>
              </View>
              <View style={styles.detailItem}>
                <MaterialIcons name="fastfood" size={16} color="#666" />
                <Text style={styles.detailText}>450 kcal</Text>
              </View>
            </View>
          </View>

          <View style={styles.section}>
            <Titles type="sectionTitle" title="Description" />
            <Titles type="description" title="A brief description of the recipe goes here. This could include details about the flavor, ingredients, and what makes it special." />
          </View>

          <View style={styles.section}>
            <Titles type="sectionTitle" title="Ingredients" />
            <IngredientItem
              imageSource={{ uri: 'https://via.placeholder.com/50' }}
              name="Tomatoes"
              volume="2 pcs"
              storeLogo={{ uri: 'https://via.placeholder.com/30' }}
            />
            <IngredientItem
              imageSource={{ uri: 'https://via.placeholder.com/50' }}
              name="Onions"
              volume="1 large"
              storeLogo={{ uri: 'https://via.placeholder.com/30' }}
            />
          </View>

          <View style={styles.section}>
            <Titles type="sectionTitle" title="Steps" />
            <StepItem
              stepNumber="1"
              title="Prepare the Ingredients"
              description="Wash and chop all the vegetables and herbs. Gather all the necessary ingredients and set them aside for easy access during cooking."
              imageSource={{ uri: 'https://example.com/ingredient-prep.jpg' }} // Placeholder image URL
            />
            <StepItem
              stepNumber="2"
              title="Cook the Ingredients"
              description="Heat oil in a pan and sauté the onions until golden brown. Add the chopped vegetables and cook until tender. Stir in spices and herbs to enhance the flavor."
              imageSource={{ uri: 'https://example.com/cooking-process.jpg' }} // Placeholder image URL
            />
            <StepItem
              stepNumber="3"
              title="Serve and Enjoy"
              description="Transfer the cooked ingredients to a serving dish. Garnish with fresh herbs and serve hot. Enjoy your meal with a side of rice or bread."
              imageSource={{ uri: 'https://example.com/serving.jpg' }} // Placeholder image URL
            />
          </View>

        </View>
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
    width: 100,
    height: 5,
    backgroundColor: 'lightgray',
    borderRadius: 20,
    marginTop: 5,
    marginBottom: 30,
    alignSelf: 'center',
  },
  header: {
    paddingBottom: 25,
    marginBottom: 25,
    borderBottomWidth:1,
    borderColor: 'lightgray'
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
});
