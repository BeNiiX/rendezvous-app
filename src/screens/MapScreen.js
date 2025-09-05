import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { supabase } from '../api/supabase';
import CustomMarker from '../components/map/CustomMarker';
import RestaurantCard from '../components/common/RestaurantCard';

const MapScreen = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);

  useEffect(() => {
    const fetchRestaurants = async () => {
      const { data, error } = await supabase
        .from('restaurants')
        .select('*');

      if (error) {
        Alert.alert("Erreur", "Impossible de charger les restaurants.");
        console.error(error);
      } else {
        setRestaurants(data);
      }
    };

    fetchRestaurants();
  }, []);

  // Fonction pour parser la localisation du format (lon,lat)
  const parseLocation = (locationString) => {
    if (!locationString || typeof locationString !== 'string') {
      return null;
    }
    // Retire les parenthèses et sépare la longitude et la latitude
    const coords = locationString.replace(/[()]/g, '').split(',');
    if (coords.length !== 2) {
      return null;
    }
    const longitude = parseFloat(coords[0]);
    const latitude = parseFloat(coords[1]);

    if (isNaN(latitude) || isNaN(longitude)) {
      return null;
    }
    return { latitude, longitude };
  };

  return (
    <View style={styles.container}>
      <MapView
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
              />
            </Marker>
          );
        })}
      </MapView>
      <RestaurantCard 
        restaurant={selectedRestaurant} 
        onClose={() => setSelectedRestaurant(null)} 
      />
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
