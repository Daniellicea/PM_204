/*  Zona 1: importaciones de componetes y archivos  */

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';


/* Zona 2: main - componentes */
export default function KeyboardAvoidingViewScreens() {
  return (
    <View style={styles.container}>
        <Text>Aqui la practica de SafeArea view</Text>

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
});
