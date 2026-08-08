import { View, Text, FlatList, StyleSheet, Platform, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState, useCallback } from 'react';
import { useFocusEffect, useRouter } from 'expo-router';
import { BASE_API_URL } from '../config';

export default function ConsultaUsuariosScreen() {
  const router = useRouter();

  const [usuarios, setUsuarios] = useState([]);

  const obtenerUsuarios = async () => {
    try {
      const url = BASE_API_URL;
      console.log("Petición a:", url);

      const respuesta = await fetch(url);
      const datos = await respuesta.json();
      console.log("Respuesta API:", datos);

      const lista = Array.isArray(datos?.usuarios)
        ? datos.usuarios
        : Array.isArray(datos)
        ? datos
        : [];
      setUsuarios(lista);
    } catch (error) {
      console.error("Error al obtener usuarios:", error);
    }
  };


  useFocusEffect(
    useCallback(() => {
      obtenerUsuarios();
    }, [])
  );


  const renderTarjeta = ({ item }) => (
    <View style={styles.card}>

      <Text style={styles.nombre}>
        {item.nombre}
      </Text>

      <View style={styles.linea}></View>

      <Text style={styles.info}>
        Edad: {item.edad} años
      </Text>

      <TouchableOpacity
        style={styles.botonDetalle}
        onPress={() => router.push({ pathname: '/detalles', params: { usuario: JSON.stringify(item) } })}
      >
        <Text style={styles.textoBoton}>Ver detalle</Text>
      </TouchableOpacity>

    </View>
  );


  return (

    <SafeAreaView style={styles.container}>

      <Text style={styles.titulo}>
        Lista de Usuarios
      </Text>


      <FlatList
        data={usuarios}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderTarjeta}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      />

    </SafeAreaView>

  );
}


const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
    padding: 20,
  },


  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#1F2937',
    marginBottom: 20,
  },


  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 18,
    marginBottom: 15,
    elevation: 4,

    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 3,
    },
  },


  nombre: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2563EB',
  },


  linea: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: 10,
  },


  info: {
    fontSize: 16,
    color: '#4B5563',
    marginBottom: 15,
  },

  botonDetalle: {
    backgroundColor: '#2563EB',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },

  textoBoton: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
  },

});