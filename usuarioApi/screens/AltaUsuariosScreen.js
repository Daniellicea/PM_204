import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Alert,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { BASE_API_URL } from '../config';

export default function AltaUsuariosScreen() {
  const params = useLocalSearchParams();
  let usuarioAEditar = null;
  if (params && params.usuario) {
    try {
      usuarioAEditar = typeof params.usuario === 'string' ? JSON.parse(params.usuario) : params.usuario;
    } catch (e) {
      usuarioAEditar = null;
    }
  }

  const isEditing = !!usuarioAEditar;
  const router = useRouter();

  const [nombre, setNombre] = useState(
    usuarioAEditar ? usuarioAEditar.nombre : ''
  );

  const [edad, setEdad] = useState(
    usuarioAEditar ? usuarioAEditar.edad.toString() : ''
  );

  const [cargando, setCargando] = useState(false);

  const mostrarMensaje = (titulo, mensaje) => {
    if (Platform.OS === 'web') {
      window.alert(`${titulo}\n${mensaje}`);
    } else {
      Alert.alert(titulo, mensaje);
    }
  };

  const guardarUsuario = async () => {
    const nombreLimpio = nombre.trim();
    const edadNumero = parseInt(edad.trim(), 10);

    if (nombreLimpio === '' || edad.trim() === '') {
      mostrarMensaje(
        'Campos vacíos',
        'Completa el nombre y la edad.'
      );
      return;
    }

    if (nombreLimpio.length < 3) {
      mostrarMensaje(
        'Nombre muy corto',
        'El nombre debe tener al menos 3 caracteres.'
      );
      return;
    }

    if (isNaN(edadNumero) || edadNumero < 0 || edadNumero > 120) {
      mostrarMensaje(
        'Edad inválida',
        'Ingresa una edad válida entre 0 y 120 años.'
      );
      return;
    }

    try {
      setCargando(true);

      const baseUrl = BASE_API_URL;

      const url = isEditing
        ? `${baseUrl}${usuarioAEditar.id}`
        : baseUrl;

      const method = isEditing ? 'PUT' : 'POST';

      const headers = {
        'Content-Type': 'application/json',
      };

      if (isEditing) {
        headers['Authorization'] = 'Basic YWRtaW46MTIzNA==';
      }

      const respuesta = await fetch(url, {
        method,
        headers,
        body: JSON.stringify({
          nombre: nombreLimpio,
          edad: edadNumero,
        }),
      });

      if (!respuesta.ok) {
        const errorData = await respuesta.json().catch(() => null);
        let mensajeError = 'No fue posible guardar el usuario.';
        if (errorData?.detail) {
          if (Array.isArray(errorData.detail)) {
            mensajeError = errorData.detail.map(d => d.msg || d.message).join(', ');
          } else if (typeof errorData.detail === 'string') {
            mensajeError = errorData.detail;
          }
        }
        throw new Error(mensajeError);
      }

      const datos = await respuesta.json();
      console.log('Respuesta del servidor:', datos);

      mostrarMensaje(
        'Éxito',
        isEditing
          ? 'Usuario actualizado correctamente'
          : 'Usuario registrado correctamente'
      );

      setNombre('');
      setEdad('');

      router.replace('/(tabs)/consulta');
    } catch (error) {
      console.error('Error al guardar:', error);
      mostrarMensaje('Error', error.message || 'No fue posible guardar el usuario.');
    } finally {
      setCargando(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.titulo}>
          {isEditing ? 'Editar Usuario' : 'Registro de Usuarios'}
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Nombre"
          placeholderTextColor="#6B7280"
          value={nombre}
          onChangeText={setNombre}
        />

        <TextInput
          style={styles.input}
          placeholder="Edad"
          placeholderTextColor="#6B7280"
          keyboardType="numeric"
          value={edad}
          onChangeText={setEdad}
        />

        <Pressable
          style={styles.boton}
          onPress={guardarUsuario}
          disabled={cargando}
        >
          <Text style={styles.textoBoton}>
            {cargando
              ? 'Guardando...'
              : isEditing
                ? 'Actualizar usuario'
                : 'Agregar usuario'}
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },

  card: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    padding: 25,
    borderRadius: 15,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 3,
    },
  },

  titulo: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 25,
    color: '#1F2937',
  },

  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 18,
    backgroundColor: '#F9FAFB',
    fontSize: 16,
    color: '#1F2937',
  },

  boton: {
    backgroundColor: '#29bb0c',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },

  textoBoton: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: 'bold',
  },
});