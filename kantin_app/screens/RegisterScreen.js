import React, { useState } from "react";
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from "react-native";
import Titles from "../components/titles";
import { PasswordInput, SimpleInput } from "../components/input";
import { Button, SocialButton } from "../components/button";
import GoogleIcon from '../assets/google.png';
import AppleIcon from '../assets/apple.png';
import { register } from "../helpers/auth"

export default function RegisterScreen({ onChangeScreen }) {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = async () => {
    if (password === confirmPassword) {
      const result = await register(email, password);
      if (result.success) {
        // Navigate to the main app or another screen
      } else {
        console.error(result.error);
        // Show an error message to the user
      }
    } else {
      console.error('Passwords do not match.');
      // Show an error message to the user
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <Titles title="Join Us!" type="bigTitle" align="center" />
          <Titles
            title="Create an account to get started with your favorite recipes and more."
            type="description"
            align="center"
          />
        </View>

        <View style={styles.section}>
          <Titles title="Email" type="description" />
          <SimpleInput placeholder="Email" value={email} onChangeText={setEmail} />
        </View>

        <View style={styles.section}>
          <Titles title="Username" type="description" />
          <SimpleInput placeholder="Username" value={username} onChangeText={setUsername} />
        </View>


        <View style={styles.section}>
          <Titles title="Password" type="description" />
          <PasswordInput placeholder="Password" value={password} onChangeText={setPassword} />
        </View>

        <View style={styles.section}>
          <Titles title="Confirm Password" type="description" />
          <PasswordInput placeholder="Confirm Password" value={confirmPassword} onChangeText={setConfirmPassword} />
        </View>

        <View style={styles.section}>
          <Button title="Register" onPress={handleRegister} />
        </View>

        {/* Divider with "OR" */}
        <View style={styles.dividerContainer}>
          <View style={styles.divider} />
          <Text style={styles.dividerText}>or</Text>
          <View style={styles.divider} />
        </View>

        <View style={styles.section}>
          <SocialButton
            title="Sign up with Google"
            imageSource={GoogleIcon}
            onPress={() => console.log('Google Sign Up!')}
          />
          <SocialButton
            title="Sign up with Apple"
            imageSource={AppleIcon}
            onPress={() => console.log('Apple Sign Up!')}
          />
        </View>

        <View style={styles.section}>
          <Titles title="Already have an account?" type="description" align="center" />
          <TouchableOpacity onPress={onChangeScreen}>
            <Text style={styles.changeScreen}>Log in!</Text>
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
