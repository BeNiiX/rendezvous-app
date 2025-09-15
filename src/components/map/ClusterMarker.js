import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const ClusterMarker = ({ count, firstRestaurant }) => {
  const imageUrl = firstRestaurant?.properties?.imageUrl || 'https://via.placeholder.com/150';

  return (
    <View style={styles.container}>
      {/* Stacked cards effect */}
      <View style={[styles.card, styles.card2]} />
      <View style={[styles.card, styles.card1]} />
      
      {/* Top card with image */}
      <View style={[styles.card, styles.topCard]}>
        <Image 
          source={{ uri: imageUrl }} 
          style={styles.image} 
        />
        {count > 1 && (
          <View style={styles.countBubble}>
            <Text style={styles.countText}>+{count - 1}</Text>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 70,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  card: {
    width: 50,
    height: 50,
    borderRadius: 12,
    backgroundColor: '#fff',
    position: 'absolute',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  card1: {
    transform: [{ rotate: '-6deg' }],
  },
  card2: {
    transform: [{ rotate: '-12deg' }],
  },
  topCard: {
    zIndex: 1,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  countBubble: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: '#333',
    borderRadius: 12,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderWidth: 1,
    borderColor: '#fff',
  },
  countText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
});

export default ClusterMarker;
