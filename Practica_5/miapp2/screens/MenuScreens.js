/*  Zona 1: importaciones de componetes y archivos  */

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image,Button } from 'react-native';
import React, {useState} from 'react';
import TarjetaScreens from './TarjetaScreens';
import SafeAreAScreens from './SafeAreASreens';
import ActivityIndicatorScreens from './ActivityIndicatorScreens';
import FlatListScreens from './FlatListScreens';
import ImageBackgroungScreens from './ImageBackgroungScreens';
import KeyboardAvoidingViewScreens from './KeyboardAvoidingViewScreens';
import ModalScreens from './ModalScreens';
import PressableScreens from './PressableScreens';
import TextInputScreens from './TextInputScreens';

/* Zona 2: main - componentes */
export default function MenuScreens() {
    const [screen, setScreen] = useState('menu');

    switch(screen){
        case 'tarjetas':
            return <TarjetaScreens/>;
        case 'safearea':
            return <SafeAreAScreens/>;
        case 'pressable':
            return <PressableScreens/>;
        case 'textinput':
            return <TextInputScreens/>;
        case 'flatlist':
            return <FlatListScreens/>
        case 'image':
            return <ImageBackgroungScreens/>
        case 'activity':
            return <ActivityIndicatorScreens/>
        case 'keyboard':
            return <KeyboardAvoidingViewScreens/>
        case 'modal':
            return <ModalScreens/>
        case 'menu':  
            default:
                 return (
                    <View style={styles.container}>
                        <View style={styles.boton}>
                            <Button title='Practica Tarjetas' onPress={() => setScreen('tarjetas')}/>
                        </View>
                        
                        <View style={styles.boton}>
                             <Button title='Practica SafeArea' onPress={() => setScreen('safearea')}/>
                        </View>

                        <View style={styles.boton}>
                            <Button title='Practica Pressable' onPress={() => setScreen('pressable')}/>
                        </View>

                        <View style={styles.boton}>
                            <Button title='Practica TextInput' onPress={() => setScreen('textinput')}/>
                        </View>

                        <View style={styles.boton}>
                            <Button title='Practica FlatList' onPress={() => setScreen('flatlist')}/>
                        </View>

                        <View style={styles.boton}>
                            <Button title='Practica ImageBackgroung' onPress={() => setScreen('image')}/>
                        </View>

                        <View style={styles.boton}>
                            <Button title='Practica ActivityIndicator' onPress={() => setScreen('activity')}/>
                        </View>

                        <View style={styles.boton}>
                            <Button title='Practica KeyboardAvoidingView' onPress={() => setScreen('keyboard')}/>
                        </View>

                        <View style={styles.boton}>
                            <Button title='Practica Modal ' onPress={() => setScreen('modal')}/>
                        </View>
                    <StatusBar style="auto" />
                    </View>
                );
    } 
}

/* Zona 3: estilos Y POSICIONAMIENTO*/
const styles = StyleSheet.create({
 container: {
  flex: 1,
  flexDirection: 'column-reverse',
  justifyContent: 'center',
  alignItems: 'center',
},
boton:{
    padding:10,
    margin: 15
}
});
