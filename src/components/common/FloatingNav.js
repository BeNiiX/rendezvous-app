import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const FloatingNav = ({ currentScreen }) => {
  const navigation = useNavigation();

  const isMapScreen = currentScreen === 'Map';

  const onCenterButtonPress = () => {
    if (isMapScreen) {
      navigation.navigate('List');
    } else {
      navigation.navigate('Map');
    }
  };

  const onProfileButtonPress = () => {
    navigation.navigate('Profile');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Central Button (Map/List) */}
        <TouchableOpacity style={styles.centerButton} onPress={onCenterButtonPress}>
          <Ionicons 
            name={isMapScreen ? "list" : "map-outline"} 
            size={20} 
            color="#333" 
          />
          <Text style={styles.centerButtonText}>
            {isMapScreen ? 'List' : 'Map'}
          </Text>
        </TouchableOpacity>

        {/* Profile Button */}
        <TouchableOpacity style={styles.profileButton} onPress={onProfileButtonPress}>
          <Ionicons name="person-outline" size={24} color="#333" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 30,
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingHorizontal: 20,
  },
  centerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    height: 50,
    paddingHorizontal: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    gap: 8,
    position: 'absolute',
  },
  centerButtonText: {
    color: '#333',
    fontSize: 16,
    fontWeight: '600',
  },
  profileButton: {
    width: 50,
    height: 50,
    borderRadius: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    position: 'absolute',
    right: 40, 
  },
});

export default FloatingNav;
