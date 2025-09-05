import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../constants/colors';

const RestaurantCard = ({ restaurant, onClose }) => {
  if (!restaurant) return null;

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.closeButton} onPress={onClose}>
        <Ionicons name="close-circle" size={32} color="rgba(0,0,0,0.5)" />
      </TouchableOpacity>
      <Image source={{ uri: restaurant.main_image_url }} style={styles.image} />
      <ScrollView style={styles.contentContainer}>
        <Text style={styles.name}>{restaurant.name}</Text>
        <Text style={styles.address}>{restaurant.address}</Text>
        <View style={styles.separator} />
        <Text style={styles.description}>{restaurant.description}</Text>
      </ScrollView>
      <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Ajouter à une liste</Text>
          </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 20,
    left: 10,
    right: 10,
    backgroundColor: '#fff',
    borderRadius: 20,
    overflow: 'hidden',
    height: '60%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 10,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
  },
  image: {
    width: '100%',
    height: '45%',
  },
  contentContainer: {
    padding: 15,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  address: {
    fontSize: 16,
    color: '#666',
    marginBottom: 15,
  },
  separator: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 10,
  },
  description: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
  },
  buttonContainer: {
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  button: {
    backgroundColor: colors.primary,
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default RestaurantCard;
