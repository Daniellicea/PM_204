import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Dimensions,
} from 'react-native';
import { COLORS, FONTS, SPACING, RADIUS } from '../theme/colors';

const { width } = Dimensions.get('window');

const features = [
  {
    icon: '🎬',
    number: '1',
    title: 'Videoteca Educativa',
    desc: 'Accede a lecciones en alta definición con explicaciones claras sobre interés compuesto, CAT y estrategias de ahorro.',
  },
  {
    icon: '📊',
    number: '2',
    title: 'Progreso en Vivo',
    desc: 'Visualiza tu avance mediante barras de porcentaje, niveles y certificaciones digitales que avalan tu conocimiento.',
  },
  {
    icon: '⚙️',
    number: '3',
    title: 'Administración',
    desc: 'Panel especializado para gestionar estudiantes, cursos y lecciones con controles de edición intuitivos.',
  },
  {
    icon: '📄',
    number: '4',
    title: 'Recursos Extras',
    desc: 'Descarga plantillas en Excel, guías PDF y calculadoras interactivas para aplicar lo aprendido de inmediato.',
  },
];

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.bgPrimary} />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Animated Background Shapes */}
        <View style={styles.bgShape1} />
        <View style={styles.bgShape2} />

        {/* Navbar */}
        <View style={styles.navbar}>
          <View style={styles.navBrand}>
            <Text style={styles.navBrandIcon}>⚡</Text>
            <Text style={styles.navBrandText}>Pi_widata</Text>
          </View>
          <View style={styles.navButtons}>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.navLink}>Ingresar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.btnWidata}
              onPress={() => navigation.navigate('Register')}
            >
              <Text style={styles.btnWidataText}>Unirse</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Hero Section */}
        <View style={styles.heroSection}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>
              NUEVO: Academia Financiera Interactiva 🎓
            </Text>
          </View>

          <Text style={styles.heroTitle}>
            El futuro de tu dinero{'\n'}se aprende en{' '}
            <Text style={styles.heroTitleGradient}>Pi_widata.</Text>
          </Text>

          <Text style={styles.heroSubtitle}>
            No solo analices, domina. Nuestra plataforma educativa te guía paso
            a paso para gestionar tus contenidos, aprender sobre inversiones y
            transformar tu realidad financiera.
          </Text>

          <View style={styles.heroBtns}>
            <TouchableOpacity
              style={styles.btnWidataLg}
              onPress={() => navigation.navigate('Register')}
            >
              <Text style={styles.btnWidataTextLg}>Empezar mi Aprendizaje</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.btnOutline}
              onPress={() => navigation.navigate('Login')}
            >
              <Text style={styles.btnOutlineText}>Explorar Cursos</Text>
            </TouchableOpacity>
          </View>

          {/* Dashboard Preview Card */}
          <View style={styles.previewCard}>
            <View style={styles.previewInner}>
              <View style={styles.previewRow}>
                <View style={[styles.previewStat, { backgroundColor: COLORS.purpleSoft }]}>
                  <Text style={styles.previewStatNumber}>$24,500</Text>
                  <Text style={styles.previewStatLabel}>Deuda Total</Text>
                </View>
                <View style={[styles.previewStat, { backgroundColor: COLORS.cyanSoft }]}>
                  <Text style={[styles.previewStatNumber, { color: COLORS.cyan }]}>85%</Text>
                  <Text style={styles.previewStatLabel}>Score</Text>
                </View>
              </View>
              <View style={styles.previewRow}>
                <View style={[styles.previewStat, { backgroundColor: COLORS.roseSoft }]}>
                  <Text style={[styles.previewStatNumber, { color: COLORS.rose }]}>$3,200</Text>
                  <Text style={styles.previewStatLabel}>Gastos</Text>
                </View>
                <View style={[styles.previewStat, { backgroundColor: COLORS.greenSoft }]}>
                  <Text style={[styles.previewStatNumber, { color: COLORS.green }]}>A+</Text>
                  <Text style={styles.previewStatLabel}>Salud</Text>
                </View>
              </View>
            </View>
            <View style={styles.previewOverlay}>
              <Text style={styles.previewOverlayText}>
                📊 Vista previa del Dashboard Pi_widata
              </Text>
            </View>
          </View>
        </View>

        {/* Features Section */}
        <View style={styles.featuresSection}>
          <Text style={styles.sectionTitle}>Beneficios del Aprendizaje</Text>
          <Text style={styles.sectionSubtitle}>
            Herramientas financieras avanzadas, explicadas para estudiantes y
            emprendedores.
          </Text>

          <View style={styles.featuresGrid}>
            {features.map((feature, index) => (
              <View key={index} style={styles.featureCard}>
                <Text style={styles.featureNumber}>{feature.number}</Text>
                <View style={styles.featureIcon}>
                  <Text style={{ fontSize: 28 }}>{feature.icon}</Text>
                </View>
                <Text style={styles.featureTitle}>{feature.title}</Text>
                <Text style={styles.featureDesc}>{feature.desc}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* CTA Section */}
        <View style={styles.ctaSection}>
          <View style={styles.ctaCard}>
            <Text style={styles.ctaTitle}>
              Conviértete en un Maestro Financiero
            </Text>
            <Text style={styles.ctaSubtitle}>
              Únete a la nueva era de Pi_widata y toma el control total de tu
              gestión educativa. Sin anuncios, 100% profesional.
            </Text>
            <TouchableOpacity
              style={styles.btnWidataLg}
              onPress={() => navigation.navigate('Register')}
            >
              <Text style={styles.btnWidataTextLg}>
                Crear Mi Cuenta Gratis →
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerBrand}>📊 Pi_widata</Text>
          <Text style={styles.footerDesc}>
            Widata es una plataforma fintech de educación financiera digital.
            Creemos que la información es poder, y nuestra misión es empoderar a
            miles de personas para tomar el control de su dinero usando
            algoritmos.
          </Text>
          <TouchableOpacity
            style={styles.btnOutline}
            onPress={() => navigation.navigate('Register')}
          >
            <Text style={styles.btnOutlineText}>Comenzar mi diagnóstico</Text>
          </TouchableOpacity>
          <View style={styles.footerDivider} />
          <Text style={styles.footerCopy}>
            © 2026 Pi_widata. Todos los derechos reservados.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bgPrimary,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  bgShape1: {
    position: 'absolute',
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: 'rgba(130, 10, 209, 0.08)',
    top: -100,
    right: -80,
  },
  bgShape2: {
    position: 'absolute',
    width: 250,
    height: 250,
    borderRadius: 125,
    backgroundColor: 'rgba(6, 182, 212, 0.06)',
    top: 200,
    left: -100,
  },

  // Navbar
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    paddingTop: 50,
    paddingBottom: SPACING.md,
  },
  navBrand: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  navBrandIcon: {
    fontSize: 24,
    marginRight: 8,
  },
  navBrandText: {
    color: COLORS.textPrimary,
    fontSize: FONTS.sizes.lg,
    fontWeight: 'bold',
  },
  navButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  navLink: {
    color: COLORS.textSecondary,
    fontSize: FONTS.sizes.md,
  },
  btnWidata: {
    backgroundColor: COLORS.purple,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: RADIUS.full,
  },
  btnWidataText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: FONTS.sizes.sm,
  },

  // Hero
  heroSection: {
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.xl,
  },
  badge: {
    backgroundColor: 'rgba(6, 182, 212, 0.1)',
    borderColor: 'rgba(6, 182, 212, 0.25)',
    borderWidth: 1,
    borderRadius: RADIUS.full,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginBottom: SPACING.lg,
  },
  badgeText: {
    color: COLORS.cyan,
    fontSize: FONTS.sizes.xs,
    fontWeight: '600',
  },
  heroTitle: {
    color: COLORS.textPrimary,
    fontSize: FONTS.sizes.hero,
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: 44,
    marginBottom: SPACING.lg,
  },
  heroTitleGradient: {
    color: COLORS.purpleLight,
  },
  heroSubtitle: {
    color: COLORS.textMuted,
    fontSize: FONTS.sizes.md,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: SPACING.xl,
    paddingHorizontal: SPACING.md,
  },
  heroBtns: {
    flexDirection: 'column',
    gap: 12,
    width: '100%',
    alignItems: 'center',
  },
  btnWidataLg: {
    backgroundColor: COLORS.purple,
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: RADIUS.full,
    elevation: 8,
    shadowColor: COLORS.purple,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
  },
  btnWidataTextLg: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: FONTS.sizes.lg,
  },
  btnOutline: {
    borderColor: 'rgba(255,255,255,0.3)',
    borderWidth: 1,
    paddingHorizontal: 28,
    paddingVertical: 14,
    borderRadius: RADIUS.full,
  },
  btnOutlineText: {
    color: COLORS.textPrimary,
    fontWeight: '600',
    fontSize: FONTS.sizes.md,
  },

  // Preview Card
  previewCard: {
    marginTop: SPACING.xl,
    width: '100%',
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    borderColor: 'rgba(130, 10, 209, 0.2)',
    backgroundColor: 'rgba(130, 10, 209, 0.08)',
    padding: SPACING.sm,
    overflow: 'hidden',
  },
  previewInner: {
    gap: 10,
    padding: SPACING.sm,
  },
  previewRow: {
    flexDirection: 'row',
    gap: 10,
  },
  previewStat: {
    flex: 1,
    borderRadius: RADIUS.md,
    padding: SPACING.md,
    alignItems: 'center',
  },
  previewStatNumber: {
    color: COLORS.purpleLight,
    fontSize: FONTS.sizes.xl,
    fontWeight: 'bold',
  },
  previewStatLabel: {
    color: COLORS.textMuted,
    fontSize: FONTS.sizes.xs,
    marginTop: 4,
  },
  previewOverlay: {
    paddingVertical: 10,
    alignItems: 'center',
  },
  previewOverlayText: {
    color: COLORS.textMuted,
    fontSize: FONTS.sizes.xs,
    fontWeight: 'bold',
  },

  // Features
  featuresSection: {
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.xxl,
    alignItems: 'center',
  },
  sectionTitle: {
    color: COLORS.textPrimary,
    fontSize: FONTS.sizes.xxl,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: SPACING.sm,
  },
  sectionSubtitle: {
    color: COLORS.textMuted,
    fontSize: FONTS.sizes.md,
    textAlign: 'center',
    marginBottom: SPACING.xl,
  },
  featuresGrid: {
    width: '100%',
    gap: 16,
  },
  featureCard: {
    backgroundColor: COLORS.bgCard,
    borderRadius: RADIUS.lg,
    padding: SPACING.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    overflow: 'hidden',
  },
  featureNumber: {
    position: 'absolute',
    top: -5,
    right: 10,
    fontSize: 60,
    fontWeight: 'bold',
    color: 'rgba(130, 10, 209, 0.08)',
  },
  featureIcon: {
    width: 56,
    height: 56,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.purpleSoft,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  featureTitle: {
    color: COLORS.textPrimary,
    fontSize: FONTS.sizes.lg,
    fontWeight: 'bold',
    marginBottom: SPACING.sm,
  },
  featureDesc: {
    color: COLORS.textMuted,
    fontSize: FONTS.sizes.sm,
    lineHeight: 20,
  },

  // CTA
  ctaSection: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.xxl,
  },
  ctaCard: {
    backgroundColor: COLORS.bgCard,
    borderRadius: RADIUS.lg,
    padding: SPACING.xl,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center',
  },
  ctaTitle: {
    color: COLORS.textPrimary,
    fontSize: FONTS.sizes.xxl,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: SPACING.md,
  },
  ctaSubtitle: {
    color: COLORS.textMuted,
    fontSize: FONTS.sizes.md,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: SPACING.xl,
  },

  // Footer
  footer: {
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.xl,
    borderTopWidth: 1,
    borderTopColor: COLORS.borderLight,
    backgroundColor: COLORS.bgSecondary,
    alignItems: 'center',
    paddingBottom: 30,
  },
  footerBrand: {
    color: COLORS.textPrimary,
    fontSize: FONTS.sizes.xl,
    fontWeight: 'bold',
    marginBottom: SPACING.md,
  },
  footerDesc: {
    color: COLORS.textMuted,
    fontSize: FONTS.sizes.sm,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: SPACING.lg,
    paddingHorizontal: SPACING.md,
  },
  footerDivider: {
    width: '80%',
    height: 1,
    backgroundColor: COLORS.borderLight,
    marginVertical: SPACING.lg,
  },
  footerCopy: {
    color: COLORS.textMuted,
    fontSize: FONTS.sizes.xs,
  },
});
