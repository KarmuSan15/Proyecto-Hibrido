import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image, Dimensions, RefreshControl, TouchableOpacity } from 'react-native';
import { db } from './firebaseConfig'; 
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { useFocusEffect } from '@react-navigation/native';

const screenWidth = Dimensions.get('window').width; 

export default function HomeScreen() {
  const [message, setMessage] = useState("Conectando a SlimePoke...");
  const [savedSlimes, setSavedSlimes] = useState([]); 
  const [refreshing, setRefreshing] = useState(false);

  // Función para obtener los datos desde Firebase
  const fetchData = async () => {
    setRefreshing(true);
    try {
      const querySnapshot = await getDocs(collection(db, "slimesSeleccionados"));
      const slimesList = [];

      querySnapshot.forEach((doc) => {
        const slime = { id: doc.id, ...doc.data() }; // Guardamos el ID del documento
        if (slime.name && slime.image && slime.food && slime.game) {
          slimesList.push(slime);
        }
      });

      if (slimesList.length > 0) {
        setSavedSlimes(slimesList);
        setMessage("¡Slimes recuperados correctamente! 🎉");
      } else {
        setMessage("No hay slimes guardados.");
      }
    } catch (error) {
      setMessage("Error al conectar SlimePoke: " + error.message);
    } finally {
      setRefreshing(false);
    }
  };

  // Función para eliminar un slime de Firebase
  const deleteSlime = async (id) => {
    try {
      await deleteDoc(doc(db, "slimesSeleccionados", id));
      setSavedSlimes(prevSlimes => prevSlimes.filter(slime => slime.id !== id)); // Actualizar la lista local
      setMessage("Slime eliminado correctamente. 🗑️");
    } catch (error) {
      setMessage("Error al eliminar el slime: " + error.message);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchData();
    }, [])
  );

  const renderSlime = ({ item }) => (
    <View style={styles.slimeItem}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.food}>🍽️ Comida favorita: {item.food}</Text>
        <Text style={styles.game}>🎮 Juego: {item.game}</Text>
      </View>
      <TouchableOpacity onPress={() => deleteSlime(item.id)} style={styles.deleteButton}>
        <Text style={styles.deleteIcon}>🗑️</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.message}>{message}</Text>

      {savedSlimes.length > 0 ? (
        <FlatList
          data={savedSlimes}
          keyExtractor={(item) => item.id}
          renderItem={renderSlime}
          contentContainerStyle={styles.listContainer}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={fetchData} />}
        />
      ) : (
        <Text style={styles.noSlimeText}>¡Sigue intentandolo 💡!</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: 15,
  },
  message: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#6200EE',
    marginBottom: 20,
    textAlign: 'center',
  },
  listContainer: {
    flexGrow: 1,
    alignItems: 'center',
    width: '100%',
  },
  slimeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    padding: 10,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    width: screenWidth * 0.9,
    maxWidth: 400,
  },
  image: {
    width: screenWidth * 0.2,
    height: screenWidth * 0.2,
    marginRight: 20,
    borderRadius: 10,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  food: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  game: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  noSlimeText: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
  },
  deleteButton: {
    padding: 5,
  },
  deleteIcon: {
    fontSize: 22,
    color: 'red',
  },
});
