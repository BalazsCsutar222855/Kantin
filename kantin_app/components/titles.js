import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// Component for different types of titles
const Titles = ({ type, title, description }) => {
  let titleStyle;

  // Determine style based on type
  switch (type) {
    case 'bigTitle':
      titleStyle = styles.bigTitle;
      break;
    case 'sectionTitle':
      titleStyle = styles.sectionTitle;
      break;
    case 'description':
      titleStyle = styles.description;
      break;
    default:
      titleStyle = styles.defaultTitle;
      break;
  }

  return (
    <View style={styles.container}>
      {title && <Text style={titleStyle}>{title}</Text>}
      {description && <Text style={styles.description}>{description}</Text>}
    </View>
  );
};

// Styles for different title types
const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  bigTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 5,
  },
  description: {
    fontSize: 16,
    color: 'gray',
  },
  defaultTitle: {
    fontSize: 20,
    fontWeight: '400',
  },
});

export default Titles;
