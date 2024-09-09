import axios from 'axios';

// Define your API key directly in the file
const SPOONACULAR_API_KEY = '4f5e9ab8859948679ec679f63a38b10f';
const BASE_URL = 'https://api.spoonacular.com/recipes/complexSearch';
const RECIPE_INFORMATION_URL = 'https://api.spoonacular.com/recipes/{id}/information';

export const searchRecipes = async ({
  query = '', // General search query
  titleMatch = '', // Specific title matching
  cuisines = [],
  excludeCuisines = [],
  diets = [],
  intolerances = [],
  includeIngredients = '',
  excludeIngredients = '',
  maxReadyTime,
  minServings,
  maxServings,
  addRecipeInformation=true,
  ignorePantry = true,
  sort = 'popularity', // Default sorting option
  sortDirection = 'asc', // Default sorting direction
  number = 1, // Number of results
}) => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        apiKey: SPOONACULAR_API_KEY,
        query,
        titleMatch,
        cuisine: cuisines.join(','),
        excludeCuisine: excludeCuisines.join(','),
        diet: diets.join('|'),
        intolerances: intolerances.join(','),
        includeIngredients,
        excludeIngredients,
        maxReadyTime,
        minServings,
        addRecipeInformation,
        maxServings,
        ignorePantry,
        sort,
        sortDirection,
        number,
      },
    });


    return response.data;
  } catch (error) {
    console.error('Error fetching recipes:', error);
    throw error;
  }
};

export const getRecipeInformation = async (id, includeNutrition = false) => {
  try {
    const response = await axios.get(RECIPE_INFORMATION_URL.replace('{id}', id), {
      params: {
        apiKey: SPOONACULAR_API_KEY,
        includeNutrition,
      },
    });


    return response.data;
  } catch (error) {
    console.error('Error fetching recipe information:', error);
    throw error;
  }
};
