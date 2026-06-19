/* Zona 1: importaciones */
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView
} from 'react-native';

import { useState } from 'react';

/* Zona 2: componente */
export default function SafeAreAScreens() {

  const [mostrarMensaje, setMostrarMensaje] = useState(true);

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>

      <View style={styles.container}>
        <Text style={styles.text}>Mis Tareas</Text>
      </View>

      {mostrarMensaje && (
        <View style={styles.mensaje}>
          <Text style={styles.mensajeTexto}>Bienvenido de nuevo</Text>

          <TouchableOpacity onPress={() => setMostrarMensaje(false)}>
            <Text style={styles.mensajeCerrar}>Cerrar</Text>
          </TouchableOpacity>
        </View>
      )}

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.ListaContenido}
        showsVerticalScrollIndicator={false}
      >
        {[
          'Comprar pan',
          'Estudiar react native',
          'Aprender importaciones',
          'Llamar a alguien',
          'Revisar un correo',
          'Leer un libro',
          'Practicar guitarra',
          'Sacar a pasear al perro',
          'Hacer la tarea'
        ].map((tarea, i) => (
          <View key={i} style={styles.tarjeta}>
            <Text style={styles.tareaTexto}>{tarea}</Text>
          </View>
        ))}
      </ScrollView>

    </SafeAreaView>
  );
}

/* Zona 3: estilos */
const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#fff' },

  container: {
    paddingTop: 20,
    backgroundColor: '#000'
  },

  text: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700'
  },

  mensaje: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: 14,
    margin: 10,
    borderRadius: 8,
  },

  mensajeTexto: { fontSize: 14, color: '#333' },

  mensajeCerrar: {
    fontSize: 14,
    fontWeight: '700',
    color: '#000',
    paddingHorizontal: 6
  },

  scroll: { flex: 1 },

  ListaContenido: {
    padding: 16,
    paddingBottom: 40
  },

  tarjeta: {
    backgroundColor: '#e0e0e0',
    borderRadius: 10,
    padding: 16,
    marginBottom: 10
  },

  tareaTexto: {
    fontSize: 15,
    color: '#252525'
  }
});