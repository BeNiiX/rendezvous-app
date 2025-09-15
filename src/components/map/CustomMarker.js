import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import BaseMarker from './BaseMarker';

const CustomMarker = ({ name, imageUrl, rating }) => {
  return (
    <View style={styles.container}>
      <View style={styles.markerContainer}>
        <BaseMarker imageUrl={imageUrl} />
        <View style={styles.ratingContainer}>
          <Text style={styles.ratingText}>{rating}</Text>
          <FontAwesome name="star" size={12} color="#FFC700" />
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
  markerContainer: {
    position: 'relative',
    // The size of this container is implicitly determined by BaseMarker,
    // providing a stable anchor for the absolute children.
  },
  ratingContainer: {
    position: 'absolute',
    top: -10,
    left: -5,
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
    elevation: 6, // Higher elevation to appear above the base marker
  },
  ratingText: {
    fontSize: 12,
    fontWeight: 'bold',
    marginRight: 4,
  },
  indicator: {
    position: 'absolute',
    top: -2,
    right: -2,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#4CAF50',
    borderWidth: 2,
    borderColor: '#fff',
    elevation: 6,
  },
  name: {
    marginTop: 4,
    fontSize: 12,
    fontWeight: 'bold',
    color: '#333',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    padding: 5,
    borderRadius: 5,
    textAlign: 'center',
    maxWidth: 100,
  },
});

export default CustomMarker;
