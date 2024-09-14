# 🍳 Simple Recipe App with Dutch Supermarket Price Comparison

A React Native app that simplifies your grocery shopping experience by parsing supermarket items and prices from a JSON file and displaying the best deals for each recipe ingredient. Users can also add the items to their in-app basket for easy tracking.

![App Preview](https://github.com/user-attachments/assets/655ec705-d39f-4eb0-83b9-49b4bedc370c)

## 🚀 Features

- 📦 **Parse Supermarket Data**: Automatically parses supermarket items and prices from a provided JSON file.
- 💸 **Find Best Prices**: Displays the best prices for each ingredient in a recipe.
- 🛒 **In-App Basket**: Add items to your in-app basket for easier tracking during shopping.
- 🔖 **Bookmark Recipes**: Users can bookmark their favorite recipes using Firebase.
- 📊 **History Tracking**: View your recently visited recipes with the help of Firebase.
- 🧾 **Recipe Management**: Browse and view recipes with real-time price comparisons for ingredients.
  
## 🛠️ Technologies

- **React Native**: For building the mobile app.
- **JSON Parsing**: For loading supermarket data and prices.
- **State Management**: To handle the in-app basket and user interactions.
- **Firebase**: For managing user authentication, bookmarks, and recently visited recipes.
- **Expo**: To simplify app development and testing.

## 🔧 Setup and Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/recipe-price-comparison-app.git
    ```

2. Navigate to the project directory:
    ```bash
    cd kantin_app
    ```

3. Install dependencies:
    ```bash
    npm install
    ```

4. Configure Firebase:
   - Create a Firebase project [here](https://console.firebase.google.com/).
   - Add Firebase credentials to your project:
     1. Go to your Firebase project settings.
     2. Download the `google-services.json` file and place it in your root project folder.
     3. Add Firebase configuration to your project using environment variables.

5. Start the app (Expo CLI required):
    ```bash
    npx expo start
    ```

## 🖼️ Screenshots

- Recipe Page
   
  ![Recipe Page](https://github.com/user-attachments/assets/18abec07-3fd3-42e8-9136-6827f599a320)

- Bookmarks & History
  
  ![Bookmarks and History](https://github.com/user-attachments/assets/ccffd20e-9848-4b6f-ae82-6d9c7aad82a3)

## 🔑 Firebase Integration

- **User Authentication**: Firebase is used to authenticate users.
- **Bookmark Recipes**: Users can store their bookmarked recipes in Firebase.
- **Recently Viewed Recipes**: Firebase keeps track of the user’s recently viewed recipes.

Make sure to set up your Firebase project and integrate it properly by following the Firebase documentation for [React Native](https://firebase.google.com/docs/react-native).

## 🤝 Contributing

Feel free to submit pull requests or open issues to improve the app.

## 📄 License

This project is licensed under the MIT License.

---

Developed with ❤️ by Balage
