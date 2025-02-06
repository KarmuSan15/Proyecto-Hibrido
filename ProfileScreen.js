// ProfileScreen.js
import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

export default function ProfileScreen() {
  const [user, setUser] = useState({
    name: "Beatrix LeBeau",
    email: "beatrix@slimerancher.com",
    profilePic: "https://www.solojugadores.com/wp-content/uploads/2022/09/Slime-Rancher-2-precio-novedades-y-actualizaciones.webp", // Imagen de perfil
  });

  const handleEditProfile = () => {
    alert("Función de edición aún no implementada 🚧");
  };

  return (
    <View style={styles.container}>
      {/* Foto de perfil */}
      <Image source={{ uri: user.profilePic }} style={styles.profileImage} />

      {/* Nombre y correo */}
      <Text style={styles.name}>{user.name}</Text>
      <Text style={styles.email}>{user.email}</Text>

      {/* Botón para editar */}
      <TouchableOpacity style={styles.editButton} onPress={handleEditProfile}>
        <Text style={styles.buttonText}>Editar Perfil</Text>
      </TouchableOpacity>
    </View>
  );
}

// 🎨 Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  profileImage: {
    width: 200,
    height: 200,
    borderRadius: 100, // Hace la imagen circular
    marginBottom: 15,
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
  },
  email: {
    fontSize: 16,
    color: "#666",
    marginBottom: 20,
  },
  editButton: {
    backgroundColor: "#6200EE",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
  },
});

