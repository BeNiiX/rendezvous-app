import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import ClusteredMapView from 'react-native-map-clustering';
import { supabase } from '../api/supabase';
import CustomMarker from '../components/map/CustomMarker';
import ClusterMarker from '../components/map/ClusterMarker';
import RestaurantCard from '../components/common/RestaurantCard';
import FloatingNav from '../components/common/FloatingNav';

// Helper function to calculate distance between two coordinates
const getDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Radius of the earth in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a =
    0.5 - Math.cos(dLat) / 2 +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    (1 - Math.cos(dLon)) / 2;
  return R * 2 * Math.asin(Math.sqrt(a));
};


const MapScreen = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const mapRef = useRef(null);

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

  const parseLocation = (locationString) => {
    if (!locationString) return null;
    const coords = locationString.replace(/[()]/g, '').split(',');
    if (coords.length !== 2) return null;
    const longitude = parseFloat(coords[0]);
    const latitude = parseFloat(coords[1]);
    if (isNaN(latitude) || isNaN(longitude)) return null;
    return { latitude, longitude };
  };
  
  const renderCluster = (cluster) => {
    const { id, geometry, properties } = cluster;
    const points = properties.point_count;
    const clusterRestaurants = [];

    // Find the restaurants within this cluster
    // This is a simplified approach. For large datasets, this would be slow.
    // A better approach would be to get child markers from the library if possible,
    // or use a more efficient spatial indexing algorithm.
    if (restaurants.length > 0) {
      const clusterLocation = {
        latitude: geometry.coordinates[1],
        longitude: geometry.coordinates[0],
      };

      const sortedRestaurants = [...restaurants]
        .map(r => {
          const restaurantLocation = parseLocation(r.location);
          if (!restaurantLocation) return { ...r, distance: Infinity };
          const distance = getDistance(
            clusterLocation.latitude,
            clusterLocation.longitude,
            restaurantLocation.latitude,
            restaurantLocation.longitude
          );
          return { ...r, distance };
        })
        .sort((a, b) => a.distance - b.distance);

      for (let i = 0; i < Math.min(points, sortedRestaurants.length); i++) {
        clusterRestaurants.push(sortedRestaurants[i]);
      }
    }
    
    const imageUrls = clusterRestaurants.slice(0, 3).map(r => r.main_image_url);

    return (
      <Marker
        key={`cluster-${id}`}
        coordinate={{
          longitude: geometry.coordinates[0],
          latitude: geometry.coordinates[1],
        }}
         onPress={async () => {
           const camera = await mapRef.current?.getCamera();
           const expansionZoom = Math.min(18, (camera?.zoom || 10) + 2);
           
           mapRef.current?.animateToRegion(
             {
               longitude: geometry.coordinates[0],
               latitude: geometry.coordinates[1],
               latitudeDelta: 0.1,
               longitudeDelta: 0.1,
             },
             300
           );
         }}
      >
        <ClusterMarker count={points} imageUrls={imageUrls} />
      </Marker>
    );
  };


  return (
    <View style={styles.container}>
      <ClusteredMapView
        ref={mapRef}
        style={styles.map}
        mapType="mutedStandard"
        initialRegion={{
          latitude: 48.8566,
          longitude: 2.3522,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        showsPointsOfInterest={false}
        showsBuildings={false}
        showsTraffic={false}
        clusterColor="#fff"
        renderCluster={renderCluster}
        radius={60}
      >
        {restaurants.map(restaurant => {
          const coordinate = parseLocation(restaurant.location);
          if (!coordinate) return null;

          return (
            <Marker
              key={restaurant.id}
              coordinate={coordinate}
              onPress={() => setSelectedRestaurant(restaurant)}
            >
              <CustomMarker 
                name={restaurant.name} 
                imageUrl={restaurant.main_image_url}
                rating={restaurant.rating ? restaurant.rating.toString().replace('.', ',') : 'N/A'}
              />
            </Marker>
          );
        })}
      </ClusteredMapView>

      <RestaurantCard 
        restaurant={selectedRestaurant} 
        onClose={() => setSelectedRestaurant(null)} 
      />

      <FloatingNav currentScreen="Map" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default MapScreen;
