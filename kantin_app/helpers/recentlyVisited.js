import AsyncStorage from '@react-native-async-storage/async-storage';

// Key for storing recently visited recipes
const RECENTLY_VISITED_KEY = 'recently_visited';

// Add a recipe to the recently visited list
export const addRecipeToRecentlyVisited = async (recipe) => {
    const simplifiedRecipe = {
        id: recipe.id,
        imageSource: recipe.image,
        title: recipe.recipe.title,
        by: recipe.recipe.sourceName || 'Unknown Chef',
        minutes: recipe.recipe.readyInMinutes || 0,
        servings: recipe.recipe.servings ? recipe.recipe.servings : 0,
      };

      try {
        // Retrieve the existing list from AsyncStorage
        let recentlyVisited = await AsyncStorage.getItem(RECENTLY_VISITED_KEY);
        recentlyVisited = recentlyVisited ? JSON.parse(recentlyVisited) : [];

        // Remove the recipe if it already exists in the list
        recentlyVisited = recentlyVisited.filter(r => r.id !== simplifiedRecipe.id);

        // Add the recipe to the beginning of the list
        recentlyVisited.unshift(simplifiedRecipe);

        // Ensure the list does not exceed a maximum size (e.g., 10 items)
        if (recentlyVisited.length > 15) {
        recentlyVisited.pop();
        }

        // Save the updated list back to AsyncStorage
        await AsyncStorage.setItem(RECENTLY_VISITED_KEY, JSON.stringify(recentlyVisited));
        } catch (error) {
        console.error('Failed to save recently visited recipes:', error);
        }
};

// Get the list of recently visited recipes
export const getRecentlyVisited = async () => {
  try {
    const recentlyVisited = await AsyncStorage.getItem(RECENTLY_VISITED_KEY);
    return recentlyVisited ? JSON.parse(recentlyVisited) : [];
  } catch (error) {
    console.error('Failed to get recently visited recipes:', error);
    return [];
  }
};

export const getRecentlyVisitedById = async (id) => {
  try {
    const recentlyVisited = await AsyncStorage.getItem(RECENTLY_VISITED_KEY); // Use the same key
    const recipes = recentlyVisited ? JSON.parse(recentlyVisited) : [];
    return recipes.find(recipe => recipe.id === id);
  } catch (error) {
    console.error('Error retrieving recipe from recently visited:', error);
  }
}