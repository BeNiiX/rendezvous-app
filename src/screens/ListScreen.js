import React, { useState, useEffect, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  Image, 
  Dimensions, 
  TouchableOpacity, 
  Alert,
  SafeAreaView 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { supabase } from '../api/supabase';
import { colors } from '../constants/colors';
import FloatingNav from '../components/common/FloatingNav';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const Pagination = ({ index, data }) => {
  return (
    <View style={styles.paginationContainer}>
      {data.map((_, i) => (
        <View 
          key={i} 
          style={[styles.dot, i === index ? styles.dotActive : styles.dotInactive]}
        />
      ))}
    </View>
  );
};

const RestaurantItem = ({ item }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setCurrentImageIndex(viewableItems[0].index);
    }
  }).current;

  const images = item.gallery_image_urls || [item.main_image_url, item.main_image_url, item.main_image_url, item.main_image_url];

  return (
    <View style={styles.restaurantCard}>
      <View style={styles.contentContainer}>
        {/* Header & Tags */}
        <View style={styles.header}>
          <View>
            <Text style={styles.restaurantName}>{item.name}</Text>
            <View style={styles.tagsContainer}>
              <View style={styles.tag}><Text style={styles.tagText}>Restaurant</Text></View>
              <View style={styles.tag}><Text style={styles.tagText}>Bar</Text></View>
            </View>
          </View>
          <TouchableOpacity style={styles.heartButton}>
            <Ionicons name="heart-outline" size={28} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Image Carousel */}
        <View style={styles.carouselContainer}>
          <FlatList
            data={images}
            keyExtractor={(img, index) => `${item.id}_${index}`}
            renderItem={({ item: imageUrl }) => (
              <Image source={{ uri: imageUrl }} style={styles.image} />
            )}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onViewableItemsChanged={onViewableItemsChanged}
            viewabilityConfig={{ itemVisiblePercentThreshold: 50 }}
          />
          {images.length > 1 && <Pagination index={currentImageIndex} data={images} />}
        </View>

        {/* Info Section */}
        <View style={styles.infoSection}>
          <View style={styles.ratingContainer}>
            <Text style={styles.ratingText}>4,9</Text>
            {[1, 2, 3, 4, 5].map((star) => (
              <Ionicons key={star} name="star" size={16} color="#FFD700" />
            ))}
          </View>
          <View style={styles.infoRow}>
            <Ionicons name="location-outline" size={16} color="#ccc" />
            <Text style={styles.address}>{item.address}</Text>
          </View>
          <View style={styles.infoRow}>
            <Ionicons name="time-outline" size={16} color="#ccc" />
            <Text style={styles.hours}>10AM - 2PM & 9PM - 1AM</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const ListScreen = () => {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    const fetchRestaurants = async () => {
      const { data, error } = await supabase.from('restaurants').select('*');
      if (error) {
        Alert.alert("Erreur", "Impossible de charger les restaurants.");
      } else {
        setRestaurants(data);
      }
    };
    fetchRestaurants();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={restaurants}
        renderItem={({ item }) => <RestaurantItem item={item} />}
        keyExtractor={(item) => item.id.toString()}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        snapToAlignment="start"
        decelerationRate={"fast"}
        snapToInterval={screenHeight}
      />
      <FloatingNav currentScreen="List" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
  },
  restaurantCard: {
    width: screenWidth,
    height: screenHeight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    width: '100%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 15,
    paddingHorizontal: 20,
  },
  restaurantName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  heartButton: {
    padding: 8,
  },
  carouselContainer: {
    width: '100%',
    aspectRatio: 1/1,
    borderRadius: 15,
    overflow: 'hidden',
    marginBottom: 15,
  },
  image: {
    width: screenWidth, // paddingHorizontal * 2
    height: '100%',
  },
  infoSection: {
    // Container for details below the image
    paddingHorizontal: 20,
  },
  tagsContainer: {
    flexDirection: 'row',
  },
  tag: {
    backgroundColor: '#333',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    marginRight: 10,
  },
  tagText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    gap: 5,
  },
  ratingText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 8,
  },
  address: {
    color: '#ccc',
    fontSize: 16,
  },
  hours: {
    color: '#ccc',
    fontSize: 14,
  },
  paginationContainer: {
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  dot: {
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  dotActive: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    width: 20,
  },
  dotInactive: {
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    width: 8,
  },
});

export default ListScreen;
