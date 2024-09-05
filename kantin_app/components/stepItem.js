import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import Titles from './titles';

const StepItem = ({ stepNumber, description, title }) => {
  return (
    <View style={styles.container}>
      <View style={styles.stepNumberContainer}>
        <Text style={styles.stepNumber}>{stepNumber}</Text>
        <Titles type="bigTitle" title={title}/>
      </View>
      <View style={styles.details}>
        <Titles type="description" title={description}/>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    padding: 10,
  },
  stepNumberContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '70%'
  },
  stepNumber: {
    fontSize: 50,
    fontWeight: 'bold',
    color: 'black',
    marginRight: 20
  },
  details: {
    flex: 1,
    marginLeft: 45,
    marginTop: 10
  },
});

export default StepItem;
