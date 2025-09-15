import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import BaseMarker from './BaseMarker';

const ClusterMarker = ({ count, imageUrls = [] }) => {
  return (
    <View style={styles.container}>
      <View style={[styles.marker, styles.marker3]}>
        <BaseMarker imageUrl={imageUrls[2]} />
      </View>
      <View style={[styles.marker, styles.marker2]}>
        <BaseMarker imageUrl={imageUrls[1]} />
      </View>
      <View style={styles.marker}>
        <BaseMarker imageUrl={imageUrls[0]} />
      </View>
      <View style={styles.countBubble}>
        <Text style={styles.countText}>+{count}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  marker: {
    position: 'absolute',
  },
  marker2: {
    transform: [{ translateX: -6 }, { translateY: -6 }],
    zIndex: -1,
  },
  marker3: {
    transform: [{ translateX: -12 }, { translateY: -12 }],
    zIndex: -2,
  },
  countBubble: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'white',
    elevation: 6,
  },
  countText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default ClusterMarker;
