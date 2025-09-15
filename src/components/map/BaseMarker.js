import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Image } from 'expo-image';

const BaseMarker = ({ imageUrl }) => {
  return (
    <View style={styles.bubble}>
      {imageUrl ? (
        <Image 
          source={{ uri: imageUrl }} 
          style={styles.image} 
          cachePolicy={'disk'}
        />
      ) : (
        <View style={styles.image} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  bubble: {
    padding: 4,
    backgroundColor: '#fff',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 16,
    backgroundColor: '#fff', // Ensure blank markers are white
  },
});

export default BaseMarker;
