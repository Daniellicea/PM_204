/*  Zona 1: importaciones de componetes y archivos  */

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import {Perfil} from '../components/Perfil';

/* Zona 2: main - componentes */
export default function TarjetaScreens() {
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
  flexDirection: 'column-reverse',
  justifyContent: 'center',
  alignItems: 'center',
},
  TerjetaVerde: {
    backgroundColor: 'green',
  },
  TarjetaRoja: {
    backgroundColor: 'red',
  }
});
