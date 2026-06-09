import { Text, Image, Button, View} from 'react-native';

export const Saludo2 = () => {
    return (
        <View>  

            <Image source={require('../assets/wave.png')} style={{ width: 200, height: 200 }} />
            <Text>Componente propio 3</Text>
            <Button title='Hola 204' />
        </View>
        
    )
}