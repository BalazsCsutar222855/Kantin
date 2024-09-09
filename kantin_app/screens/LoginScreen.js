import React, { useState } from "react";
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Alert } from "react-native";
import Titles from "../components/titles";
import { PasswordInput, SimpleInput } from "../components/input";
import { Button, SocialButton } from "../components/button";
import GoogleIcon from '../assets/google.png';
import AppleIcon from '../assets/apple.png';
import { login, resetPassword, handleGoogleLogin } from "../helpers/auth";

export default function LoginScreen({ onChangeScreen }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    const result = await login(email, password);
    if (result.success) {
      // Navigate to the main app or another screen
      console.log('Login successful:', result.user);
      // Example: navigation.navigate('HomeScreen');
    } else {
      console.error('Login failed:', result.error);
      // Show an error message to the user
      Alert.alert('Login Failed', result.error);
    }
  };
  
  const handleForgotPassword = async () => {
    const result = await resetPassword(email);
    if (result.success) {
      console.log(result.message);
      // Show a confirmation message to the user
      Alert.alert('Password Reset', result.message);
    } else {
      console.error('Password reset failed:', result.error);
      // Show an error message to the user
      Alert.alert('Password Reset Failed', result.error);
    }
  };
  
  const handleGoogleSignIn = async () => {
    const result = await handleGoogleLogin();
    if (result.success) {
      // Handle successful Google login
      console.log('Google Sign-In successful:', result.user);
      // Example: navigation.navigate('HomeScreen');
    } else {
      // Show an error message to the user
      Alert.alert('Google Sign-In Failed', result.error);
    }
  };

  // Add a similar function for Apple login if needed
  const handleAppleSignIn = () => {
    // Implement Apple login here
    console.log('Apple Sign-In is not implemented yet.');
    Alert.alert('Apple Sign-In', 'Apple Sign-In functionality is not implemented yet.');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <Titles title="Welcome Back!" type="bigTitle" align="center" />
          <Titles
            title="Log in to continue exploring your favorite recipes and more."
            type="description"
            align="center"
          />
        </View>

        <View style={styles.section}>
          <Titles title="Email" type="description" />
          <SimpleInput placeholder="Email" value={email} onChangeText={setEmail} />
        </View>

        <View style={styles.section}>
          <Titles title="Password" type="description" />
          <PasswordInput placeholder="Password" value={password} onChangeText={setPassword} />

          {/* Forgot Password */}
          <TouchableOpacity onPress={handleForgotPassword}>
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Button title="Login" onPress={handleLogin} />
        </View>

        {/* Divider with "OR" */}
        <View style={styles.dividerContainer}>
          <View style={styles.divider} />
          <Text style={styles.dividerText}>or</Text>
          <View style={styles.divider} />
        </View>

        <View style={styles.section}>
          <SocialButton
            title="Sign in with Google"
            imageSource={GoogleIcon}
            onPress={handleGoogleSignIn}
          />
          <SocialButton
            title="Sign in with Apple"
            imageSource={AppleIcon}
            onPress={handleAppleSignIn} // Implement this function as needed
          />
        </View>

        <View style={styles.section}>
          <Titles title="Don't have an account yet?" type="description" align="center" />
          <TouchableOpacity onPress={onChangeScreen}>
            <Text style={styles.changeScreen}>Sign up!</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f7f7f7",
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  header: {
    marginVertical: 30,
    maxWidth: "80%",
    alignSelf: "center",
  },
  section: {
    marginVertical: 12,
    gap: 5,
  },
  forgotPasswordText: {
    marginTop: 10,
    color: "#4CAF50",
    fontWeight: "500",
    alignSelf: "flex-end",
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: "#ccc",
  },
  dividerText: {
    marginHorizontal: 10,
    fontSize: 16,
    color: "#888",
  },
  changeScreen: {
    color: "#4CAF50",
    fontWeight: "500",
    alignSelf: "center",
  },
});
