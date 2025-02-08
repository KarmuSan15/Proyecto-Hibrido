import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, Button, Dimensions } from 'react-native';
import { RadioButton } from 'react-native-paper'; 
import { db } from './firebaseConfig'; 
import { collection, addDoc, getDocs } from 'firebase/firestore';


import slimesRancher1 from './slimesRancher1';  
import slimesRancher2 from './slimesRancher2';  

const screenWidth = Dimensions.get('window').width; 

export default function SlimePokeScreen() {
  const [selectedSlime, setSelectedSlime] = useState(null);
  const [confirmationMessage, setConfirmationMessage] = useState("");
  const [gameSelection, setGameSelection] = useState("Rancher1"); 


  const handleGameSelection = (game) => {
    setGameSelection(game);
    setSelectedSlime(null);
  };

  const handleSelectSlime = (id) => {
    setSelectedSlime(selectedSlime === id ? null : id); 
  };


  const saveSelectedSlimeToFirebase = async () => {
    if (selectedSlime === null) {
      alert("¡Por favor selecciona un slime antes de guardar!");
      return;
    }

    const slimes = gameSelection === "Rancher1" ? slimesRancher1 : slimesRancher2;
    const slime = slimes.find(s => s.id === selectedSlime);

    try {
      const querySnapshot = await getDocs(collection(db, "slimesSeleccionados"));
      const existingSlime = querySnapshot.docs.find(
        doc => doc.data().name === slime.name && doc.data().game === slime.game
      );

      if (existingSlime) {
        setConfirmationMessage("❌ Este slime ya está guardado.");
        setTimeout(() => setConfirmationMessage(""), 3000);
        return;
      }

      const slimeData = {
        name: slime.name,
        image: slime.image,
        food: slime.food,
        game: slime.game,  
        timestamp: new Date(),
      };

      await addDoc(collection(db, "slimesSeleccionados"), slimeData);

      setConfirmationMessage("✅ ¡Slime guardado correctamente!");
      setTimeout(() => setConfirmationMessage(""), 3000);
      setSelectedSlime(null);
    } catch (error) {
      console.error("Error al guardar: ", error);
      alert("Error al guardar el slime");
    }
  };

  const renderSlime = ({ item }) => (
    <View style={styles.slimeContainer}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <RadioButton
        value={item.id}
        status={selectedSlime === item.id ? 'checked' : 'unchecked'}
        onPress={() => handleSelectSlime(item.id)}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Slime Poke</Text>
      <Text style={styles.description}>Selecciona el slime que quieres guardar:</Text>

      
      <View style={styles.segmentedControlContainer}>
        <Button 
          title="Slime Rancher 1" 
          onPress={() => handleGameSelection("Rancher1")} 
          color={gameSelection === "Rancher1" ? "#6200EE" : "#DDD"}
        />
        <Button 
          title="Slime Rancher 2" 
          onPress={() => handleGameSelection("Rancher2")} 
          color={gameSelection === "Rancher2" ? "#6200EE" : "#DDD"}
        />
      </View>

      
      {confirmationMessage && (
        <Text style={styles.confirmationMessage}>{confirmationMessage}</Text>
      )}

      
      <FlatList
        data={gameSelection === "Rancher1" ? slimesRancher1 : slimesRancher2}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderSlime}
        contentContainerStyle={styles.listContainer}
      />

      <View style={styles.buttonContainer}>
        <Button
          title="Guardar Slime Seleccionado"
          onPress={saveSelectedSlimeToFirebase}
          disabled={selectedSlime === null}
          color="#6200EE"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 15,
    paddingTop: 20,
    paddingBottom: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#6200EE',
    marginBottom: 20,
    textAlign: 'center',
  },
  description: {
    fontSize: 18,
    color: '#666',
    marginBottom: 20,
    textAlign: 'center',
  },
  confirmationMessage: {
    fontSize: 16,
    color: '#4CAF50',
    marginBottom: 15,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  segmentedControlContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  slimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 12,
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    width: '100%',
    maxWidth: 400,
    marginHorizontal: 10,
  },
  image: {
    width: screenWidth * 0.18,
    height: screenWidth * 0.18,
    marginRight: 15,
    borderRadius: 10,
  },
  listContainer: {
    flexGrow: 1,
    width: '100%',
  },
  buttonContainer: {
    marginTop: 20,
    width: '100%',
  },
});
