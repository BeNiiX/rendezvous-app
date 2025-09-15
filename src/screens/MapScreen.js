import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import ClusteredMapView from 'react-native-map-clustering';
import { supabase } from '../api/supabase';
import CustomMarker from '../components/map/CustomMarker';
import ClusterMarker from '../components/map/ClusterMarker';
import RestaurantCard from '../components/common/RestaurantCard';
import FloatingNav from '../components/common/FloatingNav';

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
    
    // We need to get the first restaurant of the cluster to display its image
    // This is a simplified way, for a production app you might need a more robust solution
    // to get the actual restaurant data associated with the cluster's markers.
    // The library doesn't directly expose the children markers of a cluster.
    // We will assume the first restaurant in our list that is part of the cluster.
    // For this to work, we'd need a more complex logic to find the restaurant by coordinates.
    // Let's just use a placeholder logic for now.
    const firstRestaurant = { properties: { imageUrl: restaurants[0]?.main_image_url } };

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
        <ClusterMarker count={points} firstRestaurant={firstRestaurant} />
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
