import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, Platform, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import { COLORS, FONTS, SPACING, RADIUS } from '../theme/colors';

export default function ConsultaUsuariosScreen({ navigation }) {
  const [usuarios, setUsuarios] = useState([]);

  const obtenerUsuarios = async () => {
    try {
      const url = Platform.OS === 'web'
        ? 'http://localhost:80/v1/usuarios/'
        : 'http://192.168.100.43:80/v1/usuarios/';

      console.log("Petición a:", url);

      const respuesta = await fetch(url);
      const datos = await respuesta.json();

      console.log("Respuesta API:", datos);
      setUsuarios(datos.usuarios);

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
      <Text style={styles.nombre}>{item.nombre}</Text>
      <View style={styles.linea}></View>
      <Text style={styles.info}>Edad: {item.edad} años</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titulo}>Lista de Usuarios (API)</Text>
      <FlatList
        data={usuarios}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderTarjeta}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
      <TouchableOpacity style={styles.btnVolver} onPress={() => navigation.goBack()}>
        <Text style={styles.btnVolverText}>Volver</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS?.bgPrimary || '#1A1A2E',
    padding: SPACING?.md || 20,
  },
  titulo: {
    fontSize: FONTS?.sizes?.xl || 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: COLORS?.textPrimary || '#FFFFFF',
    marginBottom: 20,
  },
  card: {
    backgroundColor: COLORS?.bgSecondary || '#16213E',
    borderRadius: RADIUS?.md || 15,
    padding: 18,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: COLORS?.border || '#333',
  },
  nombre: {
    fontSize: FONTS?.sizes?.lg || 20,
    fontWeight: 'bold',
    color: COLORS?.purpleLight || '#4ADE80',
  },
  linea: {
    height: 1,
    backgroundColor: COLORS?.border || '#333',
    marginVertical: 10,
  },
  info: {
    fontSize: FONTS?.sizes?.md || 16,
    color: COLORS?.textMuted || '#A0AEC0',
  },
  btnVolver: {
    backgroundColor: COLORS?.purpleSoft || '#4338CA',
    padding: 15,
    borderRadius: RADIUS?.md || 10,
    alignItems: 'center',
    marginTop: 10,
  },
  btnVolverText: {
    color: COLORS?.textPrimary || '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  }
});
