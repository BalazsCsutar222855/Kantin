import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const ProfilePicture = ({ uri, size }) => {
  return (
    <View style={[styles.container, { width: size, height: size, borderRadius: size / 2 }]}>
      <Image 
        source={{ uri }} 
        style={[styles.image, { width: size, height: size, borderRadius: size / 2 }]} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
});

export default ProfilePicture;
