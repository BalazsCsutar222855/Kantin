import { doc, setDoc, collection, getDocs, deleteDoc, getDoc } from 'firebase/firestore';

import {firestore, auth} from '../services/firebase';
// Add recipe to bookmarks
export const addRecipeToBookmarks = async (recipeId) => {
  try {
    const userId = auth.currentUser?.uid;
    if (!recipeId || !userId) {
      throw new Error('Missing required parameters');
    }
    const bookmarksRef = doc(firestore, 'bookmarks', userId, 'recipes', recipeId.toString());
    await setDoc(bookmarksRef, { bookmarked: true });
    console.log('Recipe added to bookmarks');
  } catch (error) {
    console.error('Error adding recipe to bookmarks:', error);
  }
};

// Get all bookmarked recipes for a user
export const getBookmarkedRecipes = async () => {
  try {
    const userId = auth.currentUser?.uid;
    if (!userId) {
      throw new Error('User not authenticated');
    }

    const bookmarksRef = collection(firestore, 'bookmarks', userId, 'recipes');
    const snapshot = await getDocs(bookmarksRef);

    if (!snapshot.empty) {
      const recipes = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      return recipes;
    } else {
      console.log('No bookmarks found');
      return [];
    }
  } catch (error) {
    console.error('Error getting bookmarked recipes:', error);
  }
};

// Remove a recipe from bookmarks
export const removeRecipeFromBookmarks = async (recipeId) => {
  try {
    const userId = auth.currentUser?.uid;
    if (!recipeId || !userId) {
      throw new Error('Missing required parameters');
    }
    
    const recipeRef = doc(firestore, 'bookmarks', userId, 'recipes', recipeId.toString());
    await deleteDoc(recipeRef);
    console.log('Recipe removed from bookmarks');
  } catch (error) {
    console.error('Error removing recipe from bookmarks:', error);
  }
};

// Check if a recipe is bookmarked
export const isRecipeBookmarked = async (recipeId) => {
  try {
    const userId = auth.currentUser?.uid;
    if (!recipeId || !userId) {
      throw new Error('Missing required parameters');
    }

    const recipeRef = doc(firestore, 'bookmarks', userId, 'recipes', recipeId.toString());
    const docSnap = await getDoc(recipeRef);
    
    return docSnap.exists();  // Return true if bookmarked, otherwise false
  } catch (error) {
    console.error('Error checking if recipe is bookmarked:', error);
  }
};
