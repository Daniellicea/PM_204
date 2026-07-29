import React, { useState, useEffect } from 'react';
import {View,SafeAreaView,Text,TextInput,Pressable,StyleSheet,Alert,Platform,} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

export default function AltaUsuariosScreen() {
  const params = useLocalSearchParams();
  const usuarioAEditar = params.usuario ? JSON.parse(params.usuario) : null;
  const isEditing = !!usuarioAEditar;
  const router = useRouter();

  const [nombre, setNombre] = useState(usuarioAEditar ? usuarioAEditar.nombre : '');
  const [edad, setEdad] = useState(usuarioAEditar ? usuarioAEditar.edad.toString() : '');
  const [cargando, setCargando] = useState(false);

  const mostrarMensaje = (title, mensaje) => {
    if (Platform.OS === 'web') {
      window.alert(`${title}\n${mensaje}`);
    } else {
      Alert.alert(title, mensaje);
    }
  };

  const guardarUsuario = async () => {
    if (nombre.trim() === '' || edad.trim() === '') {
      mostrarMensaje("Vacíos", "Completa edad y nombre en el formulario");
      return;
    }

    try {
      setCargando(true);

      const baseUrl = Platform.OS === 'web'
        ? 'http://localhost:5000/v1/usuarios'
        : 'http://192.168.100.39:5000/v1/usuarios';

      const url = isEditing ? `${baseUrl}/${usuarioAEditar.id}` : baseUrl;
      const method = isEditing ? "PUT" : "POST";

      const headers = new Headers();
      headers.set("Content-Type", "application/json");

      if (isEditing) {
        headers.set('Authorization', 'Basic YWRtaW46MTIzNA==');
      }

      const respuesta = await fetch(url, {
        method: method,
        headers: headers,
        body: JSON.stringify({
          nombre: nombre,
          edad: Number(edad),
        }),
      });

      if (!respuesta.ok) {
        throw new Error("Error al guardar");
      }

      const datos = await respuesta.json();

      console.log(datos);
      mostrarMensaje("Éxito", isEditing ? "Usuario actualizado" : "Usuario registrado");

      if (isEditing) {
        router.replace('/consulta');
      } else {
        setNombre('');
        setEdad('');
        router.replace('/consulta');
      }

    } catch (error) {
      mostrarMensaje("Error", "No fue posible guardar");
      console.log("Error API", error);
    } finally {
      setCargando(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.titulo}>
          {isEditing ? "Editar Usuario" : "Registro de Usuarios"}
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Nombre del usuario"
          value={nombre}
          onChangeText={setNombre}
        />

        <TextInput
          style={styles.input}
          placeholder="Edad del usuario"
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
            {cargando ? "Guardando..." : (isEditing ? "Actualizar usuario" : "Agregar usuario")}
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