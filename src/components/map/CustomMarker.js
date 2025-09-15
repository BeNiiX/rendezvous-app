import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const CustomMarker = ({ name, imageUrl, rating }) => {
  return (
    <View style={styles.container}>
      <View style={styles.bubble}>
        <Image
          source={{ uri: imageUrl }}
          style={styles.image}
        />
        <View style={styles.ratingContainer}>
          <Text style={styles.ratingText}>{rating}</Text>
          <FontAwesome name="star" size={16} color="#FFC700" />
        </View>
        <View style={styles.indicator} />
      </View>
      <Text style={styles.name}>{name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  bubble: {
    padding: 4,
    backgroundColor: '#fff',
    borderRadius: 20, // Un peu plus grand que le borderRadius de l'image
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    position: 'relative',
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 16,
  },
  ratingContainer: {
    position: 'absolute',
    top: -10,
    left: -10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: 'bold',
    marginRight: 4,
  },
  indicator: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#4CAF50', // Green color
    borderWidth: 2,
    borderColor: '#fff',
  },
  name: {
    marginTop: 4,
    fontSize: 12,
    fontWeight: 'bold',
    color: '#333',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    padding: 5,
    borderRadius: 5,
    flexWrap: 'wrap',
    maxWidth: 100,
    textAlign: 'center', // Centre le texte
    alignSelf: 'center', // Centre le conteneur
  },
});

export default CustomMarker;
