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

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Campos incompletos', 'Debes llenar todos los campos.');
      return;
    }
    // Solo interfaz: simula ingreso y navega al Dashboard
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
            {/* Icon */}
            <View style={styles.iconBox}>
              <Text style={styles.iconText}>🔐</Text>
            </View>

            <Text style={styles.title}>Bienvenido de vuelta</Text>
            <Text style={styles.subtitle}>
              Ingresa a tu cuenta para continuar.
            </Text>

            {/* Form */}
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

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Contraseña</Text>
              <TextInput
                style={styles.input}
                placeholder="••••••••"
                placeholderTextColor={COLORS.textMuted}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
            </View>

            <TouchableOpacity style={styles.btnWidata} onPress={handleLogin}>
              <Text style={styles.btnWidataText}>Ingresar</Text>
            </TouchableOpacity>

            {/* Divider */}
            <View style={styles.divider} />

            {/* Links */}
            <View style={styles.linksContainer}>
              <Text style={styles.linkQuestion}>
                ¿Eres nuevo aquí?{' '}
                <Text
                  style={styles.linkAction}
                  onPress={() => navigation.navigate('Register')}
                >
                  Crea una cuenta
                </Text>
              </Text>
              <TouchableOpacity style={{ marginTop: 10 }}>
                <Text style={styles.forgotText}>
                  ¿Olvidaste tu contraseña?
                </Text>
              </TouchableOpacity>
            </View>
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
    justifyContent: 'center',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.xxl,
  },
  bgShape1: {
    position: 'absolute',
    width: 250,
    height: 250,
    borderRadius: 125,
    backgroundColor: 'rgba(130, 10, 209, 0.1)',
    top: -50,
    right: -60,
  },
  bgShape2: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'rgba(6, 182, 212, 0.06)',
    bottom: 50,
    left: -80,
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
  iconBox: {
    width: 70,
    height: 70,
    borderRadius: RADIUS.lg,
    backgroundColor: COLORS.purpleSoft,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: SPACING.md,
  },
  iconText: {
    fontSize: 30,
  },
  title: {
    color: COLORS.textPrimary,
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
    paddingVertical: 14,
    color: COLORS.textPrimary,
    fontSize: FONTS.sizes.md,
  },
  btnWidata: {
    backgroundColor: COLORS.purple,
    paddingVertical: 16,
    borderRadius: RADIUS.full,
    alignItems: 'center',
    marginTop: SPACING.md,
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

  // Links
  divider: {
    height: 1,
    backgroundColor: COLORS.borderLight,
    marginVertical: SPACING.lg,
  },
  linksContainer: {
    alignItems: 'center',
  },
  linkQuestion: {
    color: COLORS.textSecondary,
    fontSize: FONTS.sizes.md,
  },
  linkAction: {
    color: COLORS.purpleLight,
    fontWeight: 'bold',
  },
  forgotText: {
    color: COLORS.textMuted,
    fontSize: FONTS.sizes.sm,
  },
});
