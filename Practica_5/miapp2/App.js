/*  Zona 1: importaciones de componetes y archivos  */

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import {Saludo} from './components/Saludo';
import {Saludo2} from './components/Saludo2';
import {Perfil} from './components/Perfil';

/* Zona 2: main - componentes */
export default function App() {
  return (
    <View style={styles.container}>
      

      <Perfil style={styles.TerjetaVerde} nombre=" Daniel" carrera="Ingeniería" materia="Programacion movil" cuatri="9no" />
      <Perfil style={styles.TarjetaRoja} nombre="Nancy" carrera="Medicina" materia="Anatomía" cuatri="6to" />

      <Perfil style={styles.TarjetaRoja} nombre="Nancy" carrera="Medicina" materia="Anatomía" cuatri="6to" />

      <StatusBar style="auto" />
    </View>
  );
}

/* Zona 3: estilos Y POSICIONAMIENTO*/
const styles = StyleSheet.create({
 container: {
  flex: 1,
  flexDirection: 'row',
  justifyContent: 'space-evenly',
  alignItems: 'center',
},
  TerjetaVerde: {
    backgroundColor: 'green',
  },
  TarjetaRoja: {
    backgroundColor: 'red',
  }
});
