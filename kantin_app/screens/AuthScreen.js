import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import LoginScreen from "./LoginScreen";
import RegisterScreen from "./RegisterScreen";

export default function AuthScreen() {
  const [isRegistering, setIsRegistering] = useState(false);

  const handleChangeScreen = () => {
    setIsRegistering(!isRegistering);
  };

  return (
    <View style={styles.container}>
      {isRegistering ? (
        <RegisterScreen onChangeScreen={handleChangeScreen} />
      ) : (
        <LoginScreen onChangeScreen={handleChangeScreen} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
