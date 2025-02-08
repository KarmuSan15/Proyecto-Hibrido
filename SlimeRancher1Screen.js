import React, { useState } from 'react'; 
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
import slimesRancher1 from './slimesRancher1';  

export default function SlimeRancher1Screen() {
  const renderSlime = ({ item }) => (
    <View style={styles.slimeContainer}>
   
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.food}>🍽️ Comida favorita: {item.food}</Text>
        <Text style={styles.diet}>🥗 Dieta: {item.diet}</Text>
        <Text style={styles.slimeType}>🔮 Tipo de slime: {item.slimeType}</Text>
        <Text style={styles.favoriteToy}>🧸 Juguete favorito: {item.favoriteToy}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={slimesRancher1}
        keyExtractor={(item) => item.id}
        renderItem={renderSlime}
      />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#6200EE',
    textAlign: 'center',
    marginBottom: 20,
  },
  slimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    marginBottom: 15,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
    width: '100%',
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 40, 
    marginRight: 20,
  },
  infoContainer: {
    flex: 1,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  food: {
    fontSize: 16,
    color: '#777',
    marginTop: 5,
  },
  diet: {
    fontSize: 16,
    color: '#777',
    marginTop: 5,
  },
  slimeType: {
    fontSize: 16,
    color: '#777',
    marginTop: 5,
  },
  favoriteToy: {
    fontSize: 16,
    color: '#777',
    marginTop: 5,
  },
});
