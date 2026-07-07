import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { COLORS, FONTS, SPACING, RADIUS } from '../theme/colors';

const { width } = Dimensions.get('window');

const stats = [
  { label: 'Días Activo', value: '45', icon: '📅' },
  { label: 'Lecciones', value: '9', icon: '📖' },
  { label: 'Racha', value: '7 días', icon: '🔥' },
  { label: 'Logros', value: '2', icon: '🏆' },
];

const settings = [
  { icon: '🔔', label: 'Notificaciones', desc: 'Alertas de pagos y tips' },
  { icon: '🌙', label: 'Tema Oscuro', desc: 'Activado por defecto' },
  { icon: '🔐', label: 'Seguridad', desc: 'Contraseña y biometría' },
  { icon: '📱', label: 'Dispositivos', desc: '2 dispositivos vinculados' },
  { icon: '📤', label: 'Exportar Datos', desc: 'Descarga tu historial' },
  { icon: '❓', label: 'Ayuda', desc: 'Centro de soporte' },
];

export default function PerfilScreen({ navigation }) {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>👤 Mi Perfil</Text>
      </View>

      {/* Profile card */}
      <View style={styles.profileCard}>
        <View style={styles.avatarContainer}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>U</Text>
          </View>
          <View style={styles.avatarBadge}>
            <Text style={{ fontSize: 12 }}>⭐</Text>
          </View>
        </View>
        <Text style={styles.profileName}>Usuario</Text>
        <Text style={styles.profileEmail}>usuario@email.com</Text>
        <View style={styles.profileLevel}>
          <Text style={styles.profileLevelText}>🎖️ Nivel Intermedio</Text>
        </View>

        <View style={styles.profileStats}>
          {stats.map((s, i) => (
            <View key={i} style={styles.profileStat}>
              <Text style={styles.profileStatIcon}>{s.icon}</Text>
              <Text style={styles.profileStatValue}>{s.value}</Text>
              <Text style={styles.profileStatLabel}>{s.label}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Membership */}
      <View style={styles.memberCard}>
        <View style={styles.memberHeader}>
          <View>
            <Text style={styles.memberTitle}>✨ Plan Actual</Text>
            <Text style={styles.memberPlan}>Widata Free</Text>
          </View>
          <TouchableOpacity style={styles.btnUpgrade}>
            <Text style={styles.btnUpgradeText}>⚡ Upgrade Pro</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.memberFeatures}>
          <Text style={styles.memberFeature}>✅ Acceso a cursos básicos</Text>
          <Text style={styles.memberFeature}>✅ 3 análisis IA por mes</Text>
          <Text style={[styles.memberFeature, { color: COLORS.textMuted }]}>
            🔒 Análisis ilimitados (Pro)
          </Text>
          <Text style={[styles.memberFeature, { color: COLORS.textMuted }]}>
            🔒 Asesoría personalizada (Pro)
          </Text>
        </View>
      </View>

      {/* Settings */}
      <Text style={styles.sectionTitle}>⚙️ Configuración</Text>
      <View style={styles.settingsCard}>
        {settings.map((s, i) => (
          <TouchableOpacity
            key={i}
            style={[styles.settingItem, i < settings.length - 1 && styles.settingBorder]}
          >
            <View style={styles.settingIcon}>
              <Text style={{ fontSize: 20 }}>{s.icon}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.settingLabel}>{s.label}</Text>
              <Text style={styles.settingDesc}>{s.desc}</Text>
            </View>
            <Text style={styles.settingArrow}>›</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Logout */}
      <TouchableOpacity
        style={styles.btnLogout}
        onPress={() => navigation.replace('Home')}
      >
        <Text style={styles.btnLogoutText}>🚪 Cerrar Sesión</Text>
      </TouchableOpacity>

      <Text style={styles.versionText}>Pi_widata v1.0.0</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bgPrimary,
  },
  scrollContent: {
    padding: SPACING.md,
    paddingBottom: 100,
  },

  // Header
  header: {
    marginBottom: SPACING.lg,
    marginTop: SPACING.sm,
  },
  headerTitle: {
    color: COLORS.textPrimary,
    fontSize: FONTS.sizes.xl,
    fontWeight: 'bold',
  },

  // Profile
  profileCard: {
    backgroundColor: COLORS.bgCard,
    borderRadius: RADIUS.lg,
    padding: SPACING.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: SPACING.md,
    alignItems: 'center',
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: SPACING.md,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.purple,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: COLORS.purpleLight,
  },
  avatarText: {
    color: '#fff',
    fontSize: FONTS.sizes.xxl,
    fontWeight: 'bold',
  },
  avatarBadge: {
    position: 'absolute',
    bottom: 0,
    right: -4,
    backgroundColor: COLORS.bgCard,
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.border,
  },
  profileName: {
    color: COLORS.textPrimary,
    fontSize: FONTS.sizes.xl,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  profileEmail: {
    color: COLORS.textMuted,
    fontSize: FONTS.sizes.sm,
    marginBottom: SPACING.sm,
  },
  profileLevel: {
    backgroundColor: COLORS.purpleSoft,
    borderRadius: RADIUS.full,
    paddingHorizontal: 14,
    paddingVertical: 6,
    marginBottom: SPACING.md,
  },
  profileLevelText: {
    color: COLORS.purpleLight,
    fontSize: FONTS.sizes.xs,
    fontWeight: 'bold',
  },
  profileStats: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: COLORS.borderLight,
    paddingTop: SPACING.md,
  },
  profileStat: {
    alignItems: 'center',
  },
  profileStatIcon: {
    fontSize: 18,
    marginBottom: 4,
  },
  profileStatValue: {
    color: COLORS.textPrimary,
    fontSize: FONTS.sizes.lg,
    fontWeight: 'bold',
  },
  profileStatLabel: {
    color: COLORS.textMuted,
    fontSize: FONTS.sizes.xs,
    marginTop: 2,
  },

  // Membership
  memberCard: {
    backgroundColor: COLORS.bgCard,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.purple + '40',
    marginBottom: SPACING.lg,
  },
  memberHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  memberTitle: {
    color: COLORS.textMuted,
    fontSize: FONTS.sizes.xs,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  memberPlan: {
    color: COLORS.textPrimary,
    fontSize: FONTS.sizes.lg,
    fontWeight: 'bold',
    marginTop: 2,
  },
  btnUpgrade: {
    backgroundColor: COLORS.purple,
    borderRadius: RADIUS.full,
    paddingHorizontal: 14,
    paddingVertical: 8,
    elevation: 4,
    shadowColor: COLORS.purple,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  btnUpgradeText: {
    color: '#fff',
    fontSize: FONTS.sizes.xs,
    fontWeight: 'bold',
  },
  memberFeatures: {
    gap: 8,
  },
  memberFeature: {
    color: COLORS.textSecondary,
    fontSize: FONTS.sizes.sm,
  },

  // Section
  sectionTitle: {
    color: COLORS.textPrimary,
    fontSize: FONTS.sizes.lg,
    fontWeight: 'bold',
    marginBottom: SPACING.md,
  },

  // Settings
  settingsCard: {
    backgroundColor: COLORS.bgCard,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: SPACING.lg,
    overflow: 'hidden',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.md,
  },
  settingBorder: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.borderLight,
  },
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.bgSecondary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  settingLabel: {
    color: COLORS.textPrimary,
    fontSize: FONTS.sizes.sm,
    fontWeight: '600',
  },
  settingDesc: {
    color: COLORS.textMuted,
    fontSize: FONTS.sizes.xs,
    marginTop: 2,
  },
  settingArrow: {
    color: COLORS.textMuted,
    fontSize: 24,
    marginLeft: 8,
  },

  // Logout
  btnLogout: {
    backgroundColor: COLORS.roseSoft,
    borderRadius: RADIUS.lg,
    paddingVertical: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.rose + '30',
    marginBottom: SPACING.md,
  },
  btnLogoutText: {
    color: COLORS.rose,
    fontSize: FONTS.sizes.md,
    fontWeight: 'bold',
  },

  versionText: {
    color: COLORS.textMuted,
    fontSize: FONTS.sizes.xs,
    textAlign: 'center',
    marginBottom: SPACING.lg,
  },
});
