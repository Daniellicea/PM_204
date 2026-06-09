import { Text, Image, View} from 'react-native';

export const Perfil = () => {
    return (
        <View>  

            <Image source={require('../assets/wave.png')} style={{ width: 200, height: 200 }} />
            <Text>Perfil</Text>
            <Text>Nombre: Licea Gonzalez Eduardon Daniel</Text>
            <Text>Carrera: Ingeniería en Sistemas Computacionales</Text>
            <Text>Materia: Programación Móvil</Text>
            <Text>Cuatrimestre: 9no</Text>
        </View>
        
    )
}