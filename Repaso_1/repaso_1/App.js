import { useState } from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export default function App() {
  const [nombre, setNombre] = useState('');
  const [carrera, setCarrera] = useState('');
  const [semestre, setSemestre] = useState('');

  const [taller, setTaller] = useState(false);
  const [constancia, setConstancia] = useState(false);
  const [deportes, setDeportes] = useState(false);

  const handleEnviar = () => {
    // Validar campos vacíos
    if (nombre.trim() === '' || carrera.trim() === '' || semestre.trim() === '') {
      Alert.alert('Campos incompletos', 'Debes llenar todos los campos.');
      return;
    }

    // Validar que semestre sea numérico
    if (isNaN(semestre) || semestre.trim() === '') {
      Alert.alert('Error', 'El semestre debe ser un número.');
      return;
    }

    // Mostrar resumen
    Alert.alert(
      'Registro enviado',
      `Nombre: ${nombre}\nCarrera: ${carrera}\nSemestre: ${semestre}\n\nTaller: ${taller ? 'Sí' : 'No'}\nConstancia: ${constancia ? 'Sí' : 'No'}\nDeportes: ${deportes ? 'Sí' : 'No'}`
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>Registro de Evento Universitario</Text>

      <TextInput
        style={styles.input}
        placeholder="Nombre completo"
        value={nombre}
        onChangeText={setNombre}
      />

      <TextInput
        style={styles.input}
        placeholder="Carrera"
        value={carrera}
        onChangeText={setCarrera}
      />

      <TextInput
        style={styles.input}
        placeholder="Semestre"
        value={semestre}
        onChangeText={setSemestre}
        keyboardType="numeric"
      />

      <Text style={styles.subtitulo}>Opciones</Text>

      <View style={styles.fila}>
        <Text style={styles.label}>¿Asistirá al taller?</Text>
        <Switch value={taller} onValueChange={setTaller} />
      </View>

      <View style={styles.fila}>
        <Text style={styles.label}>¿Requiere constancia?</Text>
        <Switch value={constancia} onValueChange={setConstancia} />
      </View>

      <View style={styles.fila}>
        <Text style={styles.label}>¿Participará en deportes?</Text>
        <Switch value={deportes} onValueChange={setDeportes} />
      </View>

      <TouchableOpacity style={styles.boton} onPress={handleEnviar}>
        <Text style={styles.botonTexto}>Enviar Registro</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 24,
    paddingTop: 60,
    backgroundColor: '#fff',
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 24,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 12,
    marginBottom: 14,
    fontSize: 16,
  },
  subtitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 12,
  },
  fila: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  label: {
    fontSize: 15,
    flex: 1,
  },
  boton: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 8,
    marginTop: 20,
    alignItems: 'center',
  },
  botonTexto: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});