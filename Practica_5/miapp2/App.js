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

      <Image source={require('./assets/wave.png')} style={{ width: 200, height: 200 }} />
      <Text>HOLA MUNDO RN!!!!!!!!!!!!!!!</Text>



      <Text>-----------------------------</Text>
      <Saludo/>
      <Saludo></Saludo>

      
      <Text>-----------------------------</Text>

      <Saludo2/>

      <Text>-----------------------------</Text>

      <Perfil/>

      <StatusBar style="auto" />
    </View>
  );
}

/* Zona 3: estilos Y POSICIONAMIENTO*/
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
