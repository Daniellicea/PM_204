import React from 'react';
import { View, Text, StyleSheet, Platform, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { BASE_API_URL } from '../config';

export default function DetallesUsuarioScreen() {
  const params = useLocalSearchParams();
  let usuario = {};
  if (params && params.usuario) {
    try {
      usuario = typeof params.usuario === 'string' ? JSON.parse(params.usuario) : params.usuario;
    } catch (e) {
      usuario = {};
    }
  }
  const router = useRouter();

  const confirmarEliminar = () => {
    if (Platform.OS === 'web') {
      if (window.confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
        eliminarUsuario();
      }
    } else {
      Alert.alert(
        'Confirmar eliminación',
        '¿Estás seguro de que deseas eliminar este usuario?',
        [
          { text: 'Cancelar', style: 'cancel' },
          { text: 'Eliminar', style: 'destructive', onPress: eliminarUsuario },
        ]
      );
    }
  };

  const eliminarUsuario = async () => {
    try {
      const url = `${BASE_API_URL}${usuario.id}`;

      // Cabecera de autenticación básica (admin:1234 en base64)
      const headers = new Headers();
      headers.set('Authorization', 'Basic YWRtaW46MTIzNA==');

      const respuesta = await fetch(url, {
        method: 'DELETE',
        headers: headers
      });

      if (respuesta.ok) {
        if (Platform.OS !== 'web') {
          Alert.alert('Éxito', 'Usuario eliminado correctamente');
        } else {
          alert('Usuario eliminado correctamente');
        }
        router.back();
      } else {
        const errorData = await respuesta.json();
        console.error("Error del servidor:", errorData);
        if (Platform.OS !== 'web') {
          Alert.alert('Error', 'No se pudo eliminar el usuario');
        } else {
          alert('No se pudo eliminar el usuario');
        }
      }
    } catch (error) {
      console.error("Error al eliminar usuario:", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.titulo}>Detalles del Usuario</Text>

        <View style={styles.infoContainer}>
          <Text style={styles.label}>Nombre:</Text>
          <Text style={styles.valor}>{usuario.nombre}</Text>
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.label}>Edad:</Text>
          <Text style={styles.valor}>{usuario.edad} años</Text>
        </View>

        <View style={styles.botonesContainer}>
          <TouchableOpacity
            style={[styles.boton, styles.botonEditar]}
            onPress={() => router.push({ pathname: '/editar', params: { usuario: JSON.stringify(usuario) } })}
          >
            <Text style={styles.textoBoton}>Editar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.boton, styles.botonEliminar]}
            onPress={confirmarEliminar}
          >
            <Text style={styles.textoBoton}>Eliminar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
    padding: 20,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 25,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 3 },
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 20,
    textAlign: 'center',
  },
  infoContainer: {
    flexDirection: 'row',
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    paddingBottom: 10,
  },
  label: {
    fontWeight: 'bold',
    color: '#4B5563',
    width: 80,
    fontSize: 18,
  },
  valor: {
    color: '#1F2937',
    fontSize: 18,
    flex: 1,
  },
  botonesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
  },
  boton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  botonEditar: {
    backgroundColor: '#10B981',
  },
  botonEliminar: {
    backgroundColor: '#EF4444',
  },
  textoBoton: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
