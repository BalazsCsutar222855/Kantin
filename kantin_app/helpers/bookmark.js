import { database, ref, set, get, remove } from '../services/firebase';

// Add a recipe to bookmarks
export const addRecipeToBookmarks = async (userId, recipe) => {
  try {
    const bookmarksRef = ref(database, `bookmarks/${userId}/${recipe.id}`);
    await set(bookmarksRef, recipe);
    console.log('Recipe added to bookmarks');
  } catch (error) {
    console.error('Error adding recipe to bookmarks:', error);
  }
};

// Get all bookmarked recipes for a user
export const getBookmarkedRecipes = async (userId) => {
  try {
    const bookmarksRef = ref(database, `bookmarks/${userId}`);
    const snapshot = await get(bookmarksRef);
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      console.log('No bookmarks found');
      return {};
    }
  } catch (error) {
    console.error('Error getting bookmarked recipes:', error);
  }
};

// Remove a recipe from bookmarks
export const removeRecipeFromBookmarks = async (userId, recipeId) => {
  try {
    const recipeRef = ref(database, `bookmarks/${userId}/${recipeId}`);
    await remove(recipeRef);
    console.log('Recipe removed from bookmarks');
  } catch (error) {
    console.error('Error removing recipe from bookmarks:', error);
  }
};

// Check if a recipe is bookmarked
export const isRecipeBookmarked = async (userId, recipeId) => {
  try {
    const recipeRef = ref(database, `bookmarks/${userId}/${recipeId}`);
    const snapshot = await get(recipeRef);
    return snapshot.exists();
  } catch (error) {
    console.error('Error checking if recipe is bookmarked:', error);
  }
};
