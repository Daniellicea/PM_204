/* Zona1: Importaciones componentes y archivos */
import { View, Text, StyleSheet, FlatList, SectionList, ScrollView} from 'react-native';

/* Zona2: Main - Componentes*/
export default function FlatListScreen() {

  const frutas = [
    { id: '1', nombre: 'Manzana' },
    { id: '2', nombre: 'Plátano' },
    { id: '3', nombre: 'Naranja' },
    { id: '4', nombre: 'Mango' },
  ];

  const tareas = [
    { titulo: 'Mañana', data: ['Hacer ejercicio', 'Desayunar'] },
    { titulo: 'Tarde', data: ['Estudiar', 'Hacer tarea'] },
  ];

  return (
    <ScrollView style={styles.container}>

      <Text style={styles.titulo}>FlatList</Text>
      <FlatList
        data={frutas}
        keyExtractor={(item) => item.id}
        scrollEnabled={false}
        renderItem={({ item }) => (
          <View style={styles.tarjeta}>
            <Text style={styles.texto}>{item.nombre}</Text>
          </View>
        )}
      />

      <Text style={styles.titulo}>SectionList</Text>
      <SectionList
        sections={tareas}
        keyExtractor={(item, index) => index.toString()}
        scrollEnabled={false}
        renderItem={({ item }) => (
          <View style={styles.tarjeta}>
            <Text style={styles.texto}>{item}</Text>
          </View>
        )}
        renderSectionHeader={({ section }) => (
          <Text style={styles.seccionTitulo}>{section.titulo}</Text>
        )}
      />

    </ScrollView>
  );
}

/* Zona3: Estilos y Posicionamientos*/
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 10 },
  titulo: { fontSize: 18, fontWeight: '700', backgroundColor: '#111', color: '#fff', padding: 6, marginTop: 10 },
  seccionTitulo: { fontSize: 15, fontWeight: '700', backgroundColor: '#e9ecef', padding: 6, marginTop: 6 },
  tarjeta: { backgroundColor: '#f4f4f4', padding: 10, marginBottom: 6, borderRadius: 6 },
  texto: { fontSize: 14, color: '#222' },
});