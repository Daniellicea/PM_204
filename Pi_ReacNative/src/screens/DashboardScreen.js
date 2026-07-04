import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Animated,
  Dimensions,
} from 'react-native';
import { COLORS, FONTS, SPACING, RADIUS } from '../theme/colors';

const { width } = Dimensions.get('window');

const tips = [
  'Paga más que el mínimo en tus tarjetas. El pago mínimo solo cubre intereses, no reduces tu deuda real.',
  'Usa la regla 50/30/20: 50% necesidades, 30% deseos, 20% ahorro y pago de deudas.',
  'Un café de $60 diario son $21,900 al año. Pequeñas fugas suman grandes cantidades.',
  'Antes de una compra grande, espera 48 horas. Si aún la quieres después, adelante.',
  'Automatiza tus ahorros. Lo que no ves, no lo gastas.',
  'El método Avalancha ahorra más en intereses; el método Bola de Nieve da motivación rápida.',
  'Mantén tu utilización de crédito por debajo del 30% para un buen score crediticio.',
  'Un fondo de emergencias de 3-6 meses de gastos te protege de imprevistos.',
  'Revisa tus suscripciones mensuales. Podrías estar pagando servicios que no usas.',
  'Invertir desde joven, aunque sea poco, aprovecha el interés compuesto a tu favor.',
];

const sidebarItems = [
  { section: 'Panel Principal', items: [
    { icon: '📊', label: 'Resumen', active: true },
    { icon: '⚡', label: 'Estrategias de Pago' },
    { icon: '🔍', label: 'Detector de Fugas' },
    { icon: '⚖️', label: 'Análisis Crediticio' },
    { icon: '📈', label: 'Analíticas' },
    { icon: '🕐', label: 'Historial' },
  ]},
  { section: 'Herramientas', items: [
    { icon: '🎯', label: 'Metas Financieras' },
    { icon: '👛', label: 'Presupuesto' },
    { icon: '🧮', label: 'Calculadora' },
    { icon: '🏆', label: 'Logros' },
    { icon: '👤', label: 'Mi Perfil' },
  ]},
  { section: 'Aprender', items: [
    { icon: '🎓', label: 'Pi_widata Academy' },
  ]},
];

const mockCreditos = [
  { institucion: 'BBVA', deuda: '$8,500.00', tasa: '36.5%' },
  { institucion: 'Citibanamex', deuda: '$12,200.00', tasa: '28.9%' },
  { institucion: 'Nu México', deuda: '$3,800.00', tasa: '45.2%' },
];

const mockGastos = [
  { desc: 'Uber Eats', categoria: 'Hormiga', fecha: '03/07/2026', monto: '-$185.00', catColor: COLORS.rose },
  { desc: 'Netflix', categoria: 'Variable', fecha: '01/07/2026', monto: '-$199.00', catColor: COLORS.orange },
  { desc: 'Café Starbucks', categoria: 'Hormiga', fecha: '30/06/2026', monto: '-$95.00', catColor: COLORS.rose },
  { desc: 'Renta', categoria: 'Fijo', fecha: '28/06/2026', monto: '-$6,500.00', catColor: COLORS.textMuted },
];

export default function DashboardScreen({ navigation }) {
  const [tipIdx, setTipIdx] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  // Counter animation values
  const [deudaCount, setDeudaCount] = useState(0);
  const [gastosCount, setGastosCount] = useState(0);

  useEffect(() => {
    // Animate counters
    const targetDeuda = 24500;
    const targetGastos = 6979;
    let frame = 0;
    const totalFrames = 60;
    const timer = setInterval(() => {
      frame++;
      setDeudaCount(Math.round((frame / totalFrames) * targetDeuda));
      setGastosCount(Math.round((frame / totalFrames) * targetGastos));
      if (frame >= totalFrames) clearInterval(timer);
    }, 25);

    // Tip rotation
    const tipTimer = setInterval(() => {
      nextTip();
    }, 12000);

    return () => {
      clearInterval(timer);
      clearInterval(tipTimer);
    };
  }, []);

  const nextTip = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      setTipIdx(prev => (prev + 1) % tips.length);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    });
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.bgPrimary} />

      {/* Sidebar Overlay */}
      {sidebarOpen && (
        <TouchableOpacity
          style={styles.overlay}
          activeOpacity={1}
          onPress={() => setSidebarOpen(false)}
        >
          <View style={styles.sidebar}>
            <ScrollView showsVerticalScrollIndicator={false}>
              {sidebarItems.map((section, sIdx) => (
                <View key={sIdx} style={styles.sidebarSection}>
                  <Text style={styles.sidebarSectionTitle}>{section.section}</Text>
                  {section.items.map((item, iIdx) => (
                    <TouchableOpacity
                      key={iIdx}
                      style={[
                        styles.sidebarItem,
                        item.active && styles.sidebarItemActive,
                      ]}
                      onPress={() => setSidebarOpen(false)}
                    >
                      <Text style={styles.sidebarIcon}>{item.icon}</Text>
                      <Text
                        style={[
                          styles.sidebarLabel,
                          item.active && styles.sidebarLabelActive,
                        ]}
                      >
                        {item.label}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              ))}
            </ScrollView>
          </View>
        </TouchableOpacity>
      )}

      {/* Top Navbar */}
      <View style={styles.navbar}>
        <TouchableOpacity onPress={() => setSidebarOpen(true)}>
          <Text style={styles.menuIcon}>☰</Text>
        </TouchableOpacity>
        <View style={styles.navBrand}>
          <Text style={styles.navBrandIcon}>📊</Text>
          <Text style={styles.navBrandText}>Pi_widata</Text>
        </View>
        <View style={styles.navRight}>
          <Text style={styles.navUser}>👤 Usuario</Text>
          <TouchableOpacity
            style={styles.btnLogout}
            onPress={() => navigation.replace('Home')}
          >
            <Text style={styles.btnLogoutText}>Salir</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Welcome */}
        <View style={styles.welcomeRow}>
          <View style={{ flex: 1 }}>
            <Text style={styles.welcomeTitle}>¡Hola, Usuario! 👋</Text>
            <Text style={styles.welcomeSubtitle}>
              Aquí está tu resumen financiero.
            </Text>
          </View>
          <TouchableOpacity style={styles.btnCalc}>
            <Text style={styles.btnCalcText}>🧮 Calculadora</Text>
          </TouchableOpacity>
        </View>

        {/* Stats Cards */}
        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>${deudaCount.toLocaleString()}</Text>
            <Text style={styles.statLabel}>Deuda Total</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>${gastosCount.toLocaleString()}</Text>
            <Text style={styles.statLabel}>Gastos Registrados</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>3</Text>
            <Text style={styles.statLabel}>Créditos Activos</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={[styles.statNumber, { color: COLORS.green }]}>22%</Text>
            <Text style={styles.statLabel}>Utilización Crédito</Text>
          </View>
        </View>

        {/* Tip del día */}
        <View style={styles.tipCard}>
          <View style={styles.tipRow}>
            <Text style={styles.tipEmoji}>💡</Text>
            <View style={{ flex: 1 }}>
              <Text style={styles.tipLabel}>TIP DEL DÍA</Text>
              <Animated.Text style={[styles.tipText, { opacity: fadeAnim }]}>
                {tips[tipIdx]}
              </Animated.Text>
            </View>
            <TouchableOpacity
              style={styles.tipRefresh}
              onPress={nextTip}
            >
              <Text style={{ color: COLORS.textMuted }}>🔄</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Health + AI Analysis row */}
        <View style={styles.rowCards}>
          {/* Salud Financiera */}
          <View style={[styles.wCard, { flex: 1 }]}>
            <Text style={styles.cardTitle}>❤️ Salud Financiera</Text>
            <View style={styles.healthCircle}>
              <View style={styles.healthCircleOuter}>
                <View style={styles.healthCircleFill} />
                <View style={styles.healthCircleInner}>
                  <Text style={styles.healthGrade}>A+</Text>
                </View>
              </View>
            </View>
            <Text style={styles.healthMsg}>
              ¡Excelente! Tu utilización es óptima.
            </Text>
          </View>
        </View>

        {/* AI Analysis Card */}
        <View style={styles.aiCard}>
          <View style={styles.aiHeader}>
            <Text style={styles.aiTitle}>🤖 Análisis Predictivo Widata AI</Text>
            <View style={styles.aiBadge}>
              <Text style={styles.aiBadgeText}>✨ IA Activa</Text>
            </View>
          </View>

          <View style={styles.aiBody}>
            <View style={styles.aiRecommendation}>
              <Text style={styles.aiRecTitle}>Recomendación del Algoritmo:</Text>
              <Text style={styles.aiRecText}>
                "Detectamos una oportunidad de ahorro de{' '}
                <Text style={{ fontWeight: 'bold' }}>$1,250 MXN</Text> este mes
                al optimizar tus deudas con el método{' '}
                <Text style={{ fontWeight: 'bold' }}>Avalancha</Text> basado en
                tus tasas actuales."
              </Text>
            </View>
            <View style={styles.aiStats}>
              <Text style={[styles.statNumber, { color: COLORS.cyan, fontSize: 36 }]}>
                85%
              </Text>
              <Text style={styles.statLabel}>Probabilidad de Éxito</Text>
            </View>
          </View>

          <View style={styles.aiBtns}>
            <TouchableOpacity style={styles.btnWidataSmall}>
              <Text style={styles.btnWidataSmallText}>Ejecutar Plan AI</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnOutlineSmall}>
              <Text style={styles.btnOutlineSmallText}>Consultar Detalles</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.wCard}>
          <Text style={styles.cardTitle}>⚡ Acciones Directas</Text>
          <TouchableOpacity style={styles.actionItem}>
            <Text style={styles.actionIcon}>➕</Text>
            <Text style={styles.actionText}>Registrar crédito</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionItem}>
            <Text style={[styles.actionIcon, { color: COLORS.rose }]}>🧾</Text>
            <Text style={styles.actionText}>Registrar gasto</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionItem}>
            <Text style={[styles.actionIcon, { color: COLORS.cyan }]}>🤖</Text>
            <Text style={styles.actionText}>Preguntar a la IA</Text>
          </TouchableOpacity>
        </View>

        {/* Próximos a liquidar */}
        <View style={styles.wCard}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>🎯 Próximos a liquidar</Text>
            <TouchableOpacity style={styles.btnAddSmall}>
              <Text style={styles.btnAddSmallText}>+ Agregar</Text>
            </TouchableOpacity>
          </View>
          {/* Table header */}
          <View style={styles.tableHeader}>
            <Text style={[styles.tableHeaderText, { flex: 2 }]}>Institución</Text>
            <Text style={[styles.tableHeaderText, { flex: 2 }]}>Deuda</Text>
            <Text style={[styles.tableHeaderText, { flex: 1 }]}>Tasa</Text>
          </View>
          {mockCreditos.map((c, i) => (
            <View key={i} style={styles.tableRow}>
              <Text style={[styles.tableCell, { flex: 2 }]}>{c.institucion}</Text>
              <Text style={[styles.tableCellBold, { flex: 2 }]}>{c.deuda}</Text>
              <Text style={[styles.tableCellRate, { flex: 1 }]}>{c.tasa}</Text>
            </View>
          ))}
        </View>

        {/* Progreso de Aprendizaje */}
        <View style={styles.wCard}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>🎓 Progreso de Aprendizaje</Text>
            <TouchableOpacity style={styles.btnOutlineSmall}>
              <Text style={styles.btnOutlineSmallText}>Ver Todos</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.progressItem}>
            <View style={styles.progressHeader}>
              <Text style={styles.progressLabel}>Estrategias de Pago</Text>
              <Text style={styles.progressPercent}>75%</Text>
            </View>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: '75%' }]} />
            </View>
          </View>

          <View style={styles.progressItem}>
            <View style={styles.progressHeader}>
              <Text style={styles.progressLabel}>Análisis de Score</Text>
              <Text style={styles.progressPercent}>30%</Text>
            </View>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: '30%' }]} />
            </View>
          </View>

          <Text style={styles.progressNote}>
            Tienes <Text style={{ fontWeight: 'bold' }}>2</Text> cursos
            pendientes de finalizar.
          </Text>
        </View>

        {/* Gastos Recientes */}
        <View style={styles.wCard}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>💸 Gastos Recientes</Text>
            <TouchableOpacity style={styles.btnOutlineSmall}>
              <Text style={styles.btnOutlineSmallText}>+ Agregar</Text>
            </TouchableOpacity>
          </View>
          {mockGastos.map((g, i) => (
            <View key={i} style={styles.gastoRow}>
              <View style={{ flex: 1 }}>
                <Text style={styles.gastoDesc}>{g.desc}</Text>
                <View style={styles.gastoMeta}>
                  <View style={[styles.gastoBadge, { backgroundColor: g.catColor + '30' }]}>
                    <Text style={[styles.gastoBadgeText, { color: g.catColor }]}>
                      {g.categoria}
                    </Text>
                  </View>
                  <Text style={styles.gastoFecha}>{g.fecha}</Text>
                </View>
              </View>
              <Text style={styles.gastoMonto}>{g.monto}</Text>
            </View>
          ))}
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
    padding: SPACING.md,
    paddingBottom: 40,
  },

  // Overlay & Sidebar
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.6)',
    zIndex: 100,
    flexDirection: 'row',
  },
  sidebar: {
    width: 260,
    backgroundColor: COLORS.bgSecondary,
    paddingTop: 50,
    paddingHorizontal: SPACING.md,
    borderRightWidth: 1,
    borderRightColor: COLORS.border,
    height: '100%',
  },
  sidebarSection: {
    marginBottom: SPACING.lg,
  },
  sidebarSectionTitle: {
    color: COLORS.textMuted,
    fontSize: FONTS.sizes.xs,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: SPACING.sm,
    paddingLeft: SPACING.sm,
  },
  sidebarItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: SPACING.sm,
    borderRadius: RADIUS.sm,
    marginBottom: 2,
  },
  sidebarItemActive: {
    backgroundColor: COLORS.purpleSoft,
  },
  sidebarIcon: {
    fontSize: 18,
    marginRight: 10,
    width: 24,
    textAlign: 'center',
  },
  sidebarLabel: {
    color: COLORS.textSecondary,
    fontSize: FONTS.sizes.sm,
  },
  sidebarLabelActive: {
    color: COLORS.purpleLight,
    fontWeight: 'bold',
  },

  // Navbar
  navbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.md,
    paddingTop: 48,
    paddingBottom: SPACING.md,
    backgroundColor: COLORS.bgSecondary,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  menuIcon: {
    color: COLORS.textPrimary,
    fontSize: 22,
  },
  navBrand: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  navBrandIcon: {
    fontSize: 20,
    marginRight: 6,
  },
  navBrandText: {
    color: COLORS.textPrimary,
    fontSize: FONTS.sizes.lg,
    fontWeight: 'bold',
  },
  navRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  navUser: {
    color: COLORS.textSecondary,
    fontSize: FONTS.sizes.sm,
  },
  btnLogout: {
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    borderRadius: RADIUS.full,
    paddingHorizontal: 14,
    paddingVertical: 6,
  },
  btnLogoutText: {
    color: COLORS.textPrimary,
    fontSize: FONTS.sizes.xs,
  },

  // Welcome
  welcomeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: SPACING.md,
    marginTop: SPACING.sm,
  },
  welcomeTitle: {
    color: COLORS.textPrimary,
    fontSize: FONTS.sizes.xl,
    fontWeight: 'bold',
  },
  welcomeSubtitle: {
    color: COLORS.textMuted,
    fontSize: FONTS.sizes.sm,
  },
  btnCalc: {
    backgroundColor: COLORS.purple,
    borderRadius: RADIUS.full,
    paddingHorizontal: 16,
    paddingVertical: 10,
    elevation: 4,
    shadowColor: COLORS.purple,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  btnCalcText: {
    color: '#fff',
    fontSize: FONTS.sizes.sm,
    fontWeight: 'bold',
  },

  // Stats
  statsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: SPACING.md,
  },
  statBox: {
    flex: 1,
    minWidth: (width - 60) / 2 - 5,
    backgroundColor: COLORS.bgCard,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  statNumber: {
    color: COLORS.textPrimary,
    fontSize: FONTS.sizes.xl,
    fontWeight: 'bold',
  },
  statLabel: {
    color: COLORS.textMuted,
    fontSize: FONTS.sizes.xs,
    marginTop: 4,
    fontWeight: '500',
  },

  // Tip
  tipCard: {
    backgroundColor: COLORS.bgCard,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.purple,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  tipRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  tipEmoji: {
    fontSize: 28,
    marginRight: SPACING.md,
  },
  tipLabel: {
    color: COLORS.textMuted,
    fontSize: FONTS.sizes.xs,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 4,
  },
  tipText: {
    color: COLORS.textPrimary,
    fontSize: FONTS.sizes.sm,
    lineHeight: 20,
    fontWeight: '500',
  },
  tipRefresh: {
    borderWidth: 1,
    borderColor: COLORS.borderLight,
    borderRadius: RADIUS.full,
    padding: 8,
    marginLeft: 8,
  },

  // Cards
  rowCards: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: SPACING.md,
  },
  wCard: {
    backgroundColor: COLORS.bgCard,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: SPACING.md,
  },
  cardTitle: {
    color: COLORS.textPrimary,
    fontSize: FONTS.sizes.md,
    fontWeight: 'bold',
    marginBottom: SPACING.md,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },

  // Health
  healthCircle: {
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  healthCircleOuter: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 8,
    borderColor: COLORS.borderLight,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  healthCircleFill: {
    position: 'absolute',
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 8,
    borderColor: COLORS.green,
    borderTopColor: 'transparent',
    borderRightColor: 'transparent',
    transform: [{ rotate: '45deg' }],
  },
  healthCircleInner: {
    width: 90,
    height: 90,
    borderRadius: 45,
    justifyContent: 'center',
    alignItems: 'center',
  },
  healthGrade: {
    color: COLORS.textPrimary,
    fontSize: 28,
    fontWeight: 'bold',
  },
  healthMsg: {
    color: COLORS.textMuted,
    fontSize: FONTS.sizes.xs,
    textAlign: 'center',
  },

  // AI Card
  aiCard: {
    backgroundColor: COLORS.bgCard,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: 'rgba(6, 182, 212, 0.25)',
    marginBottom: SPACING.md,
    overflow: 'hidden',
  },
  aiHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  aiTitle: {
    color: COLORS.textPrimary,
    fontSize: FONTS.sizes.md,
    fontWeight: 'bold',
    flex: 1,
  },
  aiBadge: {
    backgroundColor: COLORS.cyanSoft,
    borderWidth: 1,
    borderColor: 'rgba(6, 182, 212, 0.25)',
    borderRadius: RADIUS.full,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  aiBadgeText: {
    color: COLORS.cyan,
    fontSize: FONTS.sizes.xs,
    fontWeight: 'bold',
  },
  aiBody: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: SPACING.md,
  },
  aiRecommendation: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
  },
  aiRecTitle: {
    color: COLORS.textPrimary,
    fontSize: FONTS.sizes.xs,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  aiRecText: {
    color: COLORS.textMuted,
    fontSize: FONTS.sizes.xs,
    lineHeight: 18,
  },
  aiStats: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: SPACING.md,
  },
  aiBtns: {
    flexDirection: 'row',
    gap: 10,
  },
  btnWidataSmall: {
    backgroundColor: COLORS.purple,
    borderRadius: RADIUS.full,
    paddingHorizontal: 18,
    paddingVertical: 10,
  },
  btnWidataSmallText: {
    color: '#fff',
    fontSize: FONTS.sizes.sm,
    fontWeight: 'bold',
  },
  btnOutlineSmall: {
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    borderRadius: RADIUS.full,
    paddingHorizontal: 18,
    paddingVertical: 10,
  },
  btnOutlineSmallText: {
    color: COLORS.textPrimary,
    fontSize: FONTS.sizes.sm,
  },

  // Actions
  actionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.borderLight,
  },
  actionIcon: {
    fontSize: 18,
    marginRight: 12,
    color: COLORS.purpleLight,
  },
  actionText: {
    color: COLORS.textPrimary,
    fontSize: FONTS.sizes.sm,
  },

  // Table
  tableHeader: {
    flexDirection: 'row',
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.borderLight,
    marginBottom: 4,
  },
  tableHeaderText: {
    color: COLORS.textMuted,
    fontSize: FONTS.sizes.xs,
    fontWeight: '600',
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.borderLight,
    alignItems: 'center',
  },
  tableCell: {
    color: COLORS.textPrimary,
    fontSize: FONTS.sizes.sm,
    fontWeight: '500',
  },
  tableCellBold: {
    color: COLORS.textPrimary,
    fontSize: FONTS.sizes.sm,
    fontWeight: 'bold',
  },
  tableCellRate: {
    color: COLORS.rose,
    fontSize: FONTS.sizes.sm,
    fontWeight: 'bold',
  },

  // Progress
  progressItem: {
    backgroundColor: COLORS.purpleSoft,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
    marginBottom: 10,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  progressLabel: {
    color: COLORS.textPrimary,
    fontSize: FONTS.sizes.sm,
    fontWeight: 'bold',
  },
  progressPercent: {
    color: COLORS.purpleLight,
    fontSize: FONTS.sizes.sm,
  },
  progressBar: {
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.borderLight,
  },
  progressFill: {
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.purple,
  },
  progressNote: {
    color: COLORS.textMuted,
    fontSize: FONTS.sizes.sm,
    textAlign: 'center',
    marginTop: SPACING.sm,
  },

  // Gastos
  gastoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.borderLight,
  },
  gastoDesc: {
    color: COLORS.textPrimary,
    fontSize: FONTS.sizes.sm,
    fontWeight: '500',
  },
  gastoMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 4,
  },
  gastoBadge: {
    borderRadius: RADIUS.full,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  gastoBadgeText: {
    fontSize: FONTS.sizes.xs,
    fontWeight: '600',
  },
  gastoFecha: {
    color: COLORS.textMuted,
    fontSize: FONTS.sizes.xs,
  },
  gastoMonto: {
    color: COLORS.rose,
    fontSize: FONTS.sizes.md,
    fontWeight: 'bold',
  },

  // Buttons
  btnAddSmall: {
    backgroundColor: COLORS.purple,
    borderRadius: RADIUS.full,
    paddingHorizontal: 14,
    paddingVertical: 6,
  },
  btnAddSmallText: {
    color: '#fff',
    fontSize: FONTS.sizes.xs,
    fontWeight: 'bold',
  },
});
