/* Perfil usando Desestructuración de Props */
import { Text, View, Button,StyleSheet } from 'react-native';
import React,{useState} from 'react';

export const Perfil = ({ nombre, carrera, materia, cuatri, style}) => {
    const [mostrar, setMostrar] = useState(false);

    return (
            <View style={[styles.Tarjeta,style]}>
                <Text style={styles.Nombre}>{nombre}</Text>

                {mostrar &&  
                <>
                <Text style={styles.Carrera}>{carrera}</Text>
                <Text style={styles.otroTexto}>{materia}</Text>
                <Text style={styles.otroTexto} >{cuatri}</Text>
                </>
                }
                <Button title="Ver Perfil" onPress={() =>setMostrar(!mostrar)}/>
            </View>
    )
}

const styles = StyleSheet.create({
    Nombre: {
        fontSize: 20,
        fontWeight: '600',
        textTransform: 'uppercase',
    },


    Tarjeta: {
        borderWidth: 2,
        padding: 15,
        margin: 10,

    },
    Carrera: {
        fontSize: 18,
        color: 'blue',
        fontFamily: 'Roboto',
    },
    otroTexto: {
        fontSize: 12,
        fontFamily: 'Courier',
        fontStyle: 'italic',
    }
});


/* Perfil usando Destructuración de Props */
/* import { Text, View } from 'react-native';

export const Perfil = (props) => {
    return (
            <View>

                <Text>{props.nombre}</Text>
                <Text>{props.carrera}</Text>
                <Text>{props.materia}</Text>
                <Text>{props.cuatri}</Text>

            </View>

    )
}
   */