import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Image,
  SafeAreaView 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../constants/colors';

const ProfileScreen = () => {
  const navigation = useNavigation();
  const [user] = useState({
    name: 'Benjamin K.',
    profileImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    totalLists: 3,
    totalRestaurants: 12,
    totalVisited: 8
  });

  const [lists] = useState([
    {
      id: 1,
      name: 'Mes Favoris',
      description: 'Les restaurants que j\'adore',
      restaurantCount: 5,
      coverImage: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=300&h=200&fit=crop',
      isPrivate: false
    },
    {
      id: 2,
      name: 'À essayer',
      description: 'Ma liste de restaurants à découvrir',
      restaurantCount: 4,
      coverImage: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=300&h=200&fit=crop',
      isPrivate: false
    },
    {
      id: 3,
      name: 'Date night',
      description: 'Pour les sorties romantiques',
      restaurantCount: 3,
      coverImage: 'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=300&h=200&fit=crop',
      isPrivate: true
    }
  ]);

  const renderListItem = (list) => (
    <TouchableOpacity key={list.id} style={styles.listItem}>
      <Image source={{ uri: list.coverImage }} style={styles.listImage} />
      <View style={styles.listContent}>
        <View style={styles.listHeader}>
          <Text style={styles.listName}>{list.name}</Text>
          {list.isPrivate && (
            <Ionicons name="lock-closed" size={16} color="#666" />
          )}
        </View>
        <Text style={styles.listDescription}>{list.description}</Text>
        <Text style={styles.listCount}>{list.restaurantCount} restaurant{list.restaurantCount > 1 ? 's' : ''}</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color="#ccc" />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={styles.closeButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="close-circle" size={32} color="#ccc" />
      </TouchableOpacity>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header avec profil */}
        <View style={styles.profileHeader}>
          <Image source={{ uri: user.profileImage }} style={styles.profileImage} />
          <Text style={styles.userName}>{user.name}</Text>
          
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{user.totalLists}</Text>
              <Text style={styles.statLabel}>Listes</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{user.totalRestaurants}</Text>
              <Text style={styles.statLabel}>Restaurants</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{user.totalVisited}</Text>
              <Text style={styles.statLabel}>Visités</Text>
            </View>
          </View>
        </View>

        {/* Boutons d'action */}
        <View style={styles.actionsContainer}>
          <TouchableOpacity style={styles.primaryButton}>
            <Ionicons name="add" size={20} color="#fff" />
            <Text style={styles.primaryButtonText}>Nouvelle liste</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.secondaryButton}>
            <Ionicons name="settings-outline" size={20} color="#333" />
            <Text style={styles.secondaryButtonText}>Paramètres</Text>
          </TouchableOpacity>
        </View>

        {/* Section des listes */}
        <View style={styles.listsSection}>
          <Text style={styles.sectionTitle}>Mes listes</Text>
          
          {lists.map(renderListItem)}
        </View>

        {/* Section activité récente */}
        <View style={styles.activitySection}>
          <Text style={styles.sectionTitle}>Activité récente</Text>
          
          <View style={styles.activityItem}>
            <Ionicons name="heart" size={20} color={colors.primary} />
            <Text style={styles.activityText}>Vous avez ajouté "Frazarin" à "Mes Favoris"</Text>
            <Text style={styles.activityTime}>Il y a 2h</Text>
          </View>
          
          <View style={styles.activityItem}>
            <Ionicons name="restaurant" size={20} color="#4CAF50" />
            <Text style={styles.activityText}>Vous avez visité "Bouillon Chartier"</Text>
            <Text style={styles.activityTime}>Hier</Text>
          </View>
          
          <View style={styles.activityItem}>
            <Ionicons name="add-circle" size={20} color="#2196F3" />
            <Text style={styles.activityText}>Vous avez créé la liste "Date night"</Text>
            <Text style={styles.activityTime}>Il y a 3 jours</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  closeButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    zIndex: 10,
  },
  scrollView: {
    flex: 1,
  },
  profileHeader: {
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingVertical: 30,
    marginBottom: 15,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 15,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.primary,
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  actionsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 25,
    gap: 10,
  },
  primaryButton: {
    flex: 1,
    backgroundColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    borderRadius: 10,
    gap: 8,
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  secondaryButton: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    gap: 8,
  },
  secondaryButtonText: {
    color: '#333',
    fontSize: 16,
    fontWeight: '600',
  },
  listsSection: {
    backgroundColor: '#fff',
    marginBottom: 15,
    paddingTop: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  listImage: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginRight: 15,
  },
  listContent: {
    flex: 1,
  },
  listHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
    gap: 8,
  },
  listName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  listDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  listCount: {
    fontSize: 12,
    color: '#999',
  },
  activitySection: {
    backgroundColor: '#fff',
    paddingTop: 20,
    paddingBottom: 30,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    paddingVertical: 12,
    gap: 12,
  },
  activityText: {
    flex: 1,
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },
  activityTime: {
    fontSize: 12,
    color: '#999',
  },
});

export default ProfileScreen;
