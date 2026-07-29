import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AltaUsuariosScreen from './screens/AltaUsuariosScreen';
import ConsultaUsuariosScreen from './screens/ConsultaUsuariosScreen';
import DetallesUsuarioScreen from './screens/DetallesUsuarioScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return(
    <NavigationContainer>
      <Stack.Navigator initialRouteName="ListaUsuarios">
        <Stack.Screen 
          name="ListaUsuarios" 
          component={ConsultaUsuariosScreen} 
          options={{ title: 'Lista de Usuarios' }} 
        />
        <Stack.Screen 
          name="DetallesUsuario" 
          component={DetallesUsuarioScreen} 
          options={{ title: 'Detalles del Usuario' }} 
        />
        <Stack.Screen 
          name="FormularioUsuario" 
          component={AltaUsuariosScreen} 
          options={({ route }) => ({ title: route.params?.usuario ? 'Editar Usuario' : 'Nuevo Usuario' })} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
