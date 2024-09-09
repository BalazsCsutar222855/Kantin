import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

// Component for different types of titles
const Titles = ({ type, title, description, onSeeAllPress, align = 'left' }) => {
  let titleStyle;
  let button;

  // Determine style based on type
  switch (type) {
    case 'bigTitle':
      titleStyle = styles.bigTitle;
      break;
    case 'sectionTitle':
      titleStyle = styles.sectionTitle;
      if (onSeeAllPress) {
        button = (
          <TouchableOpacity style={styles.button} onPress={onSeeAllPress}>
            <Text style={styles.buttonText}>See All</Text>
          </TouchableOpacity>
        );
      }
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
      {title && (
        <View style={[styles.titleContainer, { justifyContent: getAlign(align) }]}>
          <Text style={[titleStyle, { textAlign: align }]}>{title}</Text>
          {button && (
            <View style={styles.buttonContainer}>
              {button}
            </View>
          )}
        </View>
      )}
      {description && <Text style={[styles.description, { textAlign: align }]}>{description}</Text>}
    </View>
  );
};

// Helper function to get alignment for title container
const getAlign = (align) => {
  switch (align) {
    case 'center':
      return 'center';
    case 'right':
      return 'flex-end';
    default:
      return 'flex-start'; // Default alignment is left
  }
};

// Styles for different title types
const styles = StyleSheet.create({
  container: {
    margin: 0,
    flexShrink: 1, // Allow the text to shrink if necessary
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bigTitle: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 20,
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
  button: {
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  buttonText: {
    fontSize: 14,
    color: '#4CAF50', // Green color for the "See All" text
    fontWeight: '500',
  },
  buttonContainer: {
    marginLeft: 'auto', // Push button to the right when aligned left or center
  },
});

export default Titles;
