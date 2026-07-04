import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  StatusBar,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { COLORS, FONTS, SPACING, RADIUS } from '../theme/colors';

export default function RegisterScreen({ navigation }) {
  const [nombre, setNombre] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [edad, setEdad] = useState('');
  const [telefono, setTelefono] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = () => {
    if (
      !nombre.trim() ||
      !apellidos.trim() ||
      !edad.trim() ||
      !telefono.trim() ||
      !email.trim() ||
      !password.trim() ||
      !confirmPassword.trim()
    ) {
      Alert.alert('Campos incompletos', 'Debes llenar todos los campos.');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Las contraseñas no coinciden.');
      return;
    }
    // Solo interfaz: simula registro y navega al Dashboard
    navigation.replace('Dashboard');
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.bgPrimary} />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Background shapes */}
          <View style={styles.bgShape1} />
          <View style={styles.bgShape2} />

          {/* Back button */}
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backBtnText}>← Regresar</Text>
          </TouchableOpacity>

          {/* Card */}
          <View style={styles.card}>
            <Text style={styles.title}>
              📊 Crear Cuenta
            </Text>
            <Text style={styles.subtitle}>
              Únete a Widata y transforma tu futuro financiero.
            </Text>

            {/* Row: Nombre + Apellidos */}
            <View style={styles.row}>
              <View style={[styles.inputGroup, { flex: 1 }]}>
                <Text style={styles.label}>Nombre</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Tu nombre"
                  placeholderTextColor={COLORS.textMuted}
                  value={nombre}
                  onChangeText={setNombre}
                />
              </View>
              <View style={{ width: 12 }} />
              <View style={[styles.inputGroup, { flex: 1 }]}>
                <Text style={styles.label}>Apellidos</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Tus apellidos"
                  placeholderTextColor={COLORS.textMuted}
                  value={apellidos}
                  onChangeText={setApellidos}
                />
              </View>
            </View>

            {/* Row: Edad + Teléfono */}
            <View style={styles.row}>
              <View style={[styles.inputGroup, { flex: 1 }]}>
                <Text style={styles.label}>Edad</Text>
                <TextInput
                  style={styles.input}
                  placeholder="25"
                  placeholderTextColor={COLORS.textMuted}
                  value={edad}
                  onChangeText={setEdad}
                  keyboardType="numeric"
                />
              </View>
              <View style={{ width: 12 }} />
              <View style={[styles.inputGroup, { flex: 2 }]}>
                <Text style={styles.label}>Teléfono</Text>
                <TextInput
                  style={styles.input}
                  placeholder="55 1234 5678"
                  placeholderTextColor={COLORS.textMuted}
                  value={telefono}
                  onChangeText={setTelefono}
                  keyboardType="phone-pad"
                />
              </View>
            </View>

            {/* Email */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Correo electrónico</Text>
              <TextInput
                style={styles.input}
                placeholder="correo@ejemplo.com"
                placeholderTextColor={COLORS.textMuted}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            {/* Row: Password + Confirm */}
            <View style={styles.row}>
              <View style={[styles.inputGroup, { flex: 1 }]}>
                <Text style={styles.label}>Contraseña</Text>
                <TextInput
                  style={styles.input}
                  placeholder="••••••"
                  placeholderTextColor={COLORS.textMuted}
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                />
              </View>
              <View style={{ width: 12 }} />
              <View style={[styles.inputGroup, { flex: 1 }]}>
                <Text style={styles.label}>Confirmar</Text>
                <TextInput
                  style={styles.input}
                  placeholder="••••••"
                  placeholderTextColor={COLORS.textMuted}
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  secureTextEntry
                />
              </View>
            </View>

            {/* Submit */}
            <TouchableOpacity style={styles.btnWidata} onPress={handleRegister}>
              <Text style={styles.btnWidataText}>Crear Cuenta</Text>
            </TouchableOpacity>

            <Text style={styles.disclaimer}>
              Al registrarte, aceptas que tus datos sean procesados por el
              algoritmo de Widata.
            </Text>

            {/* Link */}
            <View style={styles.divider} />
            <Text style={styles.linkQuestion}>
              ¿Ya tienes cuenta?{' '}
              <Text
                style={styles.linkAction}
                onPress={() => navigation.navigate('Login')}
              >
                Inicia sesión
              </Text>
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bgPrimary,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.xxl,
    paddingTop: 50,
  },
  bgShape1: {
    position: 'absolute',
    width: 280,
    height: 280,
    borderRadius: 140,
    backgroundColor: 'rgba(130, 10, 209, 0.1)',
    top: -80,
    left: -60,
  },
  bgShape2: {
    position: 'absolute',
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: 'rgba(6, 182, 212, 0.06)',
    bottom: 20,
    right: -70,
  },
  backBtn: {
    marginBottom: SPACING.lg,
    alignSelf: 'flex-start',
  },
  backBtnText: {
    color: COLORS.textSecondary,
    fontSize: FONTS.sizes.md,
  },

  // Card
  card: {
    backgroundColor: COLORS.bgCard,
    borderRadius: RADIUS.xl,
    padding: SPACING.xl,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  title: {
    color: COLORS.purpleLight,
    fontSize: FONTS.sizes.xl,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: SPACING.xs,
  },
  subtitle: {
    color: COLORS.textMuted,
    fontSize: FONTS.sizes.md,
    textAlign: 'center',
    marginBottom: SPACING.xl,
  },

  // Form
  row: {
    flexDirection: 'row',
  },
  inputGroup: {
    marginBottom: SPACING.md,
  },
  label: {
    color: COLORS.textSecondary,
    fontSize: FONTS.sizes.sm,
    fontWeight: '600',
    marginBottom: SPACING.xs,
  },
  input: {
    backgroundColor: COLORS.bgSecondary,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
    borderRadius: RADIUS.md,
    paddingHorizontal: SPACING.md,
    paddingVertical: 12,
    color: COLORS.textPrimary,
    fontSize: FONTS.sizes.md,
  },
  btnWidata: {
    backgroundColor: COLORS.purple,
    paddingVertical: 16,
    borderRadius: RADIUS.full,
    alignItems: 'center',
    marginTop: SPACING.sm,
    elevation: 6,
    shadowColor: COLORS.purple,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
  },
  btnWidataText: {
    color: '#fff',
    fontSize: FONTS.sizes.lg,
    fontWeight: 'bold',
  },
  disclaimer: {
    color: COLORS.textMuted,
    fontSize: FONTS.sizes.xs,
    textAlign: 'center',
    marginTop: SPACING.md,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.borderLight,
    marginVertical: SPACING.lg,
  },
  linkQuestion: {
    color: COLORS.textSecondary,
    fontSize: FONTS.sizes.md,
    textAlign: 'center',
  },
  linkAction: {
    color: COLORS.purpleLight,
    fontWeight: 'bold',
  },
});
