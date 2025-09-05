import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const CustomMarker = ({ name, imageUrl }) => {
  return (
    <View style={styles.container}>
      <View style={styles.bubble}>
        <Image
          source={{ uri: imageUrl }}
          style={styles.image}
        />
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
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  indicator: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderWidth: 2,
    borderColor: '#fff',
  },
  name: {
    marginTop: 4,
    fontSize: 12,
    fontWeight: 'bold',
    color: '#333',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    paddingHorizontal: 5,
    borderRadius: 5,
  },
});

export default CustomMarker;
