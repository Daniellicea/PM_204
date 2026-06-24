/*  Zona 1: importaciones de componentes y archivos  */
import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, ScrollView, Alert, Platform, Button } from 'react-native';


/* Zona 2: main - componentes */
export default function TextInputScreens() {

  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [numero, setNumero] = useState('');
  const [telefono, setTelefono] = useState('');
  const [busqueda, setBusqueda] = useState('');
  const [comentario, setComentario] = useState('');
  const [decimal, setDecimal] = useState('');

  const campos = [
    { label: 'Nombre', value: nombre },
    { label: 'Email', value: email },
    { label: 'Contraseña', value: pass ? 'Ingresada' : 'No ingresada' },
    { label: 'Edad', value: numero }
  ];

  const mostrarAlerta = (titulo, mensaje, botones) => {
    if (Platform.OS === 'web') {
      alert(`${titulo}\n\n${mensaje}`);
      return;
    }
    Alert.alert(titulo, mensaje, botones);
  };

  const confirmarEnvio = () => {
    mostrarAlerta(
      'Confirmar envío',
      '¿Estás seguro de confirmar el envío?',
      [
        {
          text: 'Cancelar',
          style: 'cancel'
        },
        {
          text: 'Confirmar',
          onPress: () => mostrarAlerta('Enviado', 'Formulario enviado correctamente')
        }
      ]
    );
  };

  const validarNombre = () => {
    if (nombre === '') {
      mostrarAlerta('Campo vacío', 'Por favor escribe tu nombre');
    } else {
      mostrarAlerta('Nombre guardado', `Hola ${nombre}, tu nombre fue guardado`);
    }
  };

  const validarEmail = () => {
    if (email === '') {
      mostrarAlerta('Error', 'Por favor ingresa un correo');
    } else if (!email.includes('@')) {
      mostrarAlerta('Email inválido', 'Debe contener @');
    } else {
      mostrarAlerta('Correcto', 'Tu email es válido');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Ejemplos de input</Text>

      <Text style={styles.label}>Nombre</Text>
      <TextInput
        value={nombre}
        onChangeText={setNombre}
        placeholder='Escribe aquí tu nombre'
        autoCapitalize='words'
        style={styles.input}
      />

      <Text style={styles.label}>Email</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder='Escribe aquí tu correo'
        keyboardType='email-address'
        autoCapitalize='none'
        style={styles.input}
      />

      <Text style={styles.label}>Contraseña</Text>
      <TextInput
        value={pass}
        onChangeText={setPass}
        placeholder='********'
        secureTextEntry={true}
        maxLength={8}
        style={styles.input}
      />

      <Text style={styles.label}>Edad</Text>
      <TextInput
        value={numero}
        onChangeText={setNumero}
        placeholder='20'
        keyboardType='numeric'
        style={styles.input}
      />

      <Text style={styles.label}>Teléfono</Text>
      <TextInput
        value={telefono}
        onChangeText={setTelefono}
        placeholder='Aquí va tu teléfono'
        keyboardType='phone-pad'
        style={styles.input}
      />

      <Text style={styles.label}>Búsqueda</Text>
      <TextInput
        value={busqueda}
        onChangeText={setBusqueda}
        placeholder='Buscar...'
        returnKeyType='search'
        style={styles.input}
      />

      <Text style={styles.label}>Precio</Text>
      <TextInput
        value={decimal}
        onChangeText={setDecimal}
        placeholder='15.5'
        keyboardType='decimal-pad'
        style={styles.input}
      />

      <Text style={styles.label}>Comentario</Text>
      <TextInput
        value={comentario}
        onChangeText={setComentario}
        placeholder='Escribe tu comentario'
        multiline={true}
        numberOfLines={4}
        style={[styles.input, styles.multiline]}
      />

      <View style={styles.botonesContainer}>
        <Button title="Guardar nombre" onPress={validarNombre} />
        <Button title="Validar email" onPress={validarEmail} />
        <Button title="Enviar formulario" onPress={confirmarEnvio} />
      </View>

      <View style={styles.resumen}>
        <Text style={styles.resumenTitle}>Datos ingresados</Text>
        {campos.map((campo) => (
          <Text key={campo.label} style={styles.resumenText}>
            {campo.label}: {campo.value || 'Sin datos'}
          </Text>
        ))}
      </View>

      <StatusBar style="auto" />
    </ScrollView>
  );
}

/* Zona 3: estilos */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 30,
  },
  label: {
    fontSize: 13,
    color: '#666',
    marginTop: 12,
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    padding: 12,
  }, //
  multiline: {
    height: 90,
    textAlignVertical: 'top'
  },
  botonesContainer: {
    marginTop: 20,
    gap: 8
  },
  resumen: {
    marginTop: 20
  },
  resumenTitle: {
    fontWeight: 'bold'
  },
  resumenText: {
    fontSize: 14
  }
});