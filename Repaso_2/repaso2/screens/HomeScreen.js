import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  FlatList,
  Alert,
  ActivityIndicator,
  ImageBackground,
  StyleSheet,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';

// Fondo tipo biblioteca/libros con gradiente simulado usando colores
const BG_IMAGE = {
  uri: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=800&q=80',
};

export default function HomeScreen() {
  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');
  const [genero, setGenero] = useState('');
  const [libros, setLibros] = useState([]);
  const [cargando, setCargando] = useState(false);

  const agregarLibro = () => {
    // Validar campos
    if (titulo.trim() === '' || autor.trim() === '' || genero.trim() === '') {
      Alert.alert(
        'Campos incompletos',
        'Todos los campos son obligatorios. Por favor, completa el título, autor y género.',
        [{ text: 'Entendido', style: 'default' }]
      );
      return;
    }

    // Mostrar ActivityIndicator por 4 segundos
    setCargando(true);

    setTimeout(() => {
      const nuevoLibro = {
        id: Date.now().toString(),
        titulo: titulo.trim(),
        autor: autor.trim(),
        genero: genero.trim(),
      };

      setLibros((prev) => [nuevoLibro, ...prev]);
      setTitulo('');
      setAutor('');
      setGenero('');
      setCargando(false);

      Alert.alert(
        'Libro agregado',
        `"${nuevoLibro.titulo}" fue añadido al catálogo correctamente.`,
        [{ text: 'Aceptar', style: 'default' }]
      );
    }, 4000);
  };

  const renderLibro = ({ item, index }) => (
    <View style={styles.tarjeta}>
      <View style={styles.tarjetaNumero}>
        <Text style={styles.tarjetaNumeroTexto}>#{index + 1}</Text>
      </View>
      <View style={styles.tarjetaContenido}>
        <Text style={styles.tarjetaTitulo}>Titulo: {item.titulo}</Text>
        <Text style={styles.tarjetaAutor}>Autor: {item.autor}</Text>
        <Text style={styles.tarjetaGenero}>Genero: {item.genero}</Text>
      </View>
    </View>
  );

  return (
    <ImageBackground source={BG_IMAGE} style={styles.fondo} resizeMode="cover">
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

      {/* Overlay oscuro para legibilidad */}
      <View style={styles.overlay} />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Encabezado */}
          <View style={styles.header}>
            <Text style={styles.titulo}>Catálogo de Libros</Text>
            <Text style={styles.subtitulo}>Registra tu colección personal</Text>
          </View>

          {/* Tarjeta del formulario */}
          <View style={styles.formularioCard}>
            <Text style={styles.formularioTitulo}>Agregar nuevo libro</Text>

            <TextInput
              style={styles.input}
              placeholder="Título del libro"
              placeholderTextColor="#999"
              value={titulo}
              onChangeText={setTitulo}
              editable={!cargando}
            />

            <TextInput
              style={styles.input}
              placeholder="Autor"
              placeholderTextColor="#999"
              value={autor}
              onChangeText={setAutor}
              editable={!cargando}
            />

            <TextInput
              style={styles.input}
              placeholder="Género"
              placeholderTextColor="#999"
              value={genero}
              onChangeText={setGenero}
              editable={!cargando}
            />

            {/* Botón Agregar */}
            <Pressable
              style={({ pressed }) => [
                styles.boton,
                pressed && styles.botonPresionado,
                cargando && styles.botonDeshabilitado,
              ]}
              onPress={agregarLibro}
              disabled={cargando}
            >
              {cargando ? (
                <View style={styles.botonCargando}>
                  <ActivityIndicator color="#ffffff" size="small" />
                  <Text style={styles.botonTexto}>  Guardando...</Text>
                </View>
              ) : (
                <Text style={styles.botonTexto}>Agregar Libro</Text>
              )}
            </Pressable>
          </View>

          {/* Lista de libros */}
          {libros.length > 0 && (
            <View style={styles.listaContainer}>
              {/* Contador */}
              <View style={styles.contadorContainer}>
                <Text style={styles.contadorTexto}>
                  Total de libros:{' '}
                  <Text style={styles.contadorNumero}>{libros.length}</Text>
                </Text>
              </View>

              <FlatList
                data={libros}
                keyExtractor={(item) => item.id}
                renderItem={renderLibro}
                scrollEnabled={false}
                contentContainerStyle={styles.flatListContent}
              />
            </View>
          )}

          {/* Estado vacío */}
          {libros.length === 0 && !cargando && (
            <View style={styles.estadoVacio}>
              <Text style={styles.estadoVacioTexto}>
                Tu catálogo está vacío.{'\n'}¡Agrega tu primer libro!
              </Text>
            </View>
          )}

          <View style={{ height: 40 }} />
        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  fondo: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(10, 20, 60, 0.72)',
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: StatusBar.currentHeight ? StatusBar.currentHeight + 20 : 60,
    paddingBottom: 20,
  },

  // Header
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  headerIcon: {
    fontSize: 48,
    marginBottom: 8,
  },
  titulo: {
    fontSize: 30,
    fontWeight: '900',
    color: '#ffffff',
    textAlign: 'center',
    letterSpacing: 1,
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 6,
  },
  subtitulo: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.65)',
    marginTop: 4,
    fontStyle: 'italic',
  },

  // Formulario Card
  formularioCard: {
    backgroundColor: 'rgba(255,255,255,0.97)',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 16,
    elevation: 10,
  },
  formularioTitulo: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1a237e',
    marginBottom: 14,
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  input: {
    backgroundColor: '#f5f7ff',
    borderWidth: 1.5,
    borderColor: '#dde3ff',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 13,
    fontSize: 15,
    color: '#222',
    marginBottom: 12,
  },

  // Botón
  boton: {
    backgroundColor: '#1565c0',
    borderRadius: 12,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 4,
    shadowColor: '#1565c0',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 6,
  },
  botonPresionado: {
    backgroundColor: '#0d47a1',
    transform: [{ scale: 0.97 }],
  },
  botonDeshabilitado: {
    backgroundColor: '#5c85c7',
  },
  botonCargando: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  botonTexto: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.5,
  },

  // Lista
  listaContainer: {
    marginBottom: 10,
  },
  contadorContainer: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.25)',
    alignItems: 'center',
  },
  contadorTexto: {
    fontSize: 16,
    color: '#ffffff',
    fontWeight: '600',
  },
  contadorNumero: {
    fontSize: 18,
    fontWeight: '900',
    color: '#64b5f6',
  },
  flatListContent: {
    gap: 12,
  },

  // Tarjeta de libro
  tarjeta: {
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
    borderLeftWidth: 4,
    borderLeftColor: '#1565c0',
  },
  tarjetaNumero: {
    backgroundColor: '#1565c0',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 12,
    marginTop: 2,
  },
  tarjetaNumeroTexto: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
  },
  tarjetaContenido: {
    flex: 1,
    gap: 4,
  },
  tarjetaTitulo: {
    fontSize: 16,
    fontWeight: '800',
    color: '#1a237e',
    marginBottom: 2,
  },
  tarjetaAutor: {
    fontSize: 14,
    color: '#444',
    fontWeight: '500',
  },
  tarjetaGenero: {
    fontSize: 13,
    color: '#777',
    fontStyle: 'italic',
  },

  // Estado vacío
  estadoVacio: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  estadoVacioEmoji: {
    fontSize: 50,
    marginBottom: 12,
  },
  estadoVacioTexto: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
    fontStyle: 'italic',
  },
});
