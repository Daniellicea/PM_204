import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
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

export default function ResumenScreen({ navigation }) {
  const [tipIdx, setTipIdx] = useState(0);
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
    <ScrollView
      style={styles.container}
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
        <TouchableOpacity
          style={styles.btnCalc}
          onPress={() => navigation.navigate('Calculadora')}
        >
          <Text style={styles.btnCalcText}>🧮 Calc</Text>
        </TouchableOpacity>
      </View>

      {/* Stats Cards */}
      <View style={styles.statsRow}>
        <View style={styles.statBox}>
          <Text style={styles.statIcon}>💳</Text>
          <Text style={styles.statNumber}>${deudaCount.toLocaleString()}</Text>
          <Text style={styles.statLabel}>Deuda Total</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statIcon}>💸</Text>
          <Text style={styles.statNumber}>${gastosCount.toLocaleString()}</Text>
          <Text style={styles.statLabel}>Gastos del Mes</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statIcon}>🏦</Text>
          <Text style={styles.statNumber}>3</Text>
          <Text style={styles.statLabel}>Créditos Activos</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statIcon}>📈</Text>
          <Text style={[styles.statNumber, { color: COLORS.green }]}>22%</Text>
          <Text style={styles.statLabel}>Utilización</Text>
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
          <TouchableOpacity style={styles.tipRefresh} onPress={nextTip}>
            <Text style={{ color: COLORS.textMuted }}>🔄</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Salud Financiera Mini */}
      <View style={styles.healthCard}>
        <View style={styles.healthRow}>
          <View style={styles.healthCircleSmall}>
            <Text style={styles.healthGrade}>A+</Text>
          </View>
          <View style={{ flex: 1, marginLeft: SPACING.md }}>
            <Text style={styles.healthTitle}>❤️ Salud Financiera</Text>
            <Text style={styles.healthMsg}>
              ¡Excelente! Tu utilización es óptima.
            </Text>
          </View>
          <TouchableOpacity
            style={styles.btnSeeMore}
            onPress={() => navigation.navigate('IA')}
          >
            <Text style={styles.btnSeeMoreText}>Ver más →</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Quick Actions */}
      <View style={styles.wCard}>
        <Text style={styles.cardTitle}>⚡ Acciones Directas</Text>
        <View style={styles.actionsGrid}>
          <TouchableOpacity
            style={styles.actionCard}
            onPress={() => navigation.navigate('Creditos')}
          >
            <View style={[styles.actionIconBg, { backgroundColor: COLORS.purpleSoft }]}>
              <Text style={styles.actionIconText}>➕</Text>
            </View>
            <Text style={styles.actionText}>Registrar crédito</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionCard}
            onPress={() => navigation.navigate('Gastos')}
          >
            <View style={[styles.actionIconBg, { backgroundColor: COLORS.roseSoft }]}>
              <Text style={styles.actionIconText}>🧾</Text>
            </View>
            <Text style={styles.actionText}>Registrar gasto</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionCard}
            onPress={() => navigation.navigate('IA')}
          >
            <View style={[styles.actionIconBg, { backgroundColor: COLORS.cyanSoft }]}>
              <Text style={styles.actionIconText}>🤖</Text>
            </View>
            <Text style={styles.actionText}>Preguntar IA</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionCard}
            onPress={() => navigation.navigate('Academy')}
          >
            <View style={[styles.actionIconBg, { backgroundColor: COLORS.greenSoft }]}>
              <Text style={styles.actionIconText}>🎓</Text>
            </View>
            <Text style={styles.actionText}>Aprender</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Mini preview créditos */}
      <TouchableOpacity
        style={styles.previewCard}
        onPress={() => navigation.navigate('Creditos')}
      >
        <View style={styles.previewHeader}>
          <Text style={styles.cardTitle}>🎯 Créditos Activos</Text>
          <Text style={styles.previewLink}>Ver todos →</Text>
        </View>
        <View style={styles.previewRow}>
          <View style={styles.previewItem}>
            <Text style={styles.previewInst}>BBVA</Text>
            <Text style={styles.previewDeuda}>$8,500</Text>
          </View>
          <View style={styles.previewDivider} />
          <View style={styles.previewItem}>
            <Text style={styles.previewInst}>Citibanamex</Text>
            <Text style={styles.previewDeuda}>$12,200</Text>
          </View>
          <View style={styles.previewDivider} />
          <View style={styles.previewItem}>
            <Text style={styles.previewInst}>Nu</Text>
            <Text style={styles.previewDeuda}>$3,800</Text>
          </View>
        </View>
      </TouchableOpacity>
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
    marginTop: 2,
  },
  btnCalc: {
    backgroundColor: COLORS.purple,
    borderRadius: RADIUS.full,
    paddingHorizontal: 14,
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
  statIcon: {
    fontSize: 22,
    marginBottom: 6,
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
    textAlign: 'center',
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

  // Health mini card
  healthCard: {
    backgroundColor: COLORS.bgCard,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.25)',
  },
  healthRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  healthCircleSmall: {
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 3,
    borderColor: COLORS.green,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.greenSoft,
  },
  healthGrade: {
    color: COLORS.green,
    fontSize: 18,
    fontWeight: 'bold',
  },
  healthTitle: {
    color: COLORS.textPrimary,
    fontSize: FONTS.sizes.md,
    fontWeight: 'bold',
  },
  healthMsg: {
    color: COLORS.textMuted,
    fontSize: FONTS.sizes.xs,
    marginTop: 2,
  },
  btnSeeMore: {
    borderWidth: 1,
    borderColor: COLORS.borderLight,
    borderRadius: RADIUS.full,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  btnSeeMoreText: {
    color: COLORS.purpleLight,
    fontSize: FONTS.sizes.xs,
    fontWeight: '600',
  },

  // Cards
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

  // Actions grid
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  actionCard: {
    width: (width - 60) / 2 - 5,
    backgroundColor: COLORS.bgSecondary,
    borderRadius: RADIUS.md,
    padding: SPACING.md,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.borderLight,
  },
  actionIconBg: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  actionIconText: {
    fontSize: 20,
  },
  actionText: {
    color: COLORS.textPrimary,
    fontSize: FONTS.sizes.xs,
    fontWeight: '600',
    textAlign: 'center',
  },

  // Preview card
  previewCard: {
    backgroundColor: COLORS.bgCard,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: SPACING.md,
  },
  previewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  previewLink: {
    color: COLORS.purpleLight,
    fontSize: FONTS.sizes.xs,
    fontWeight: '600',
  },
  previewRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  previewItem: {
    alignItems: 'center',
    flex: 1,
  },
  previewInst: {
    color: COLORS.textMuted,
    fontSize: FONTS.sizes.xs,
    fontWeight: '500',
  },
  previewDeuda: {
    color: COLORS.textPrimary,
    fontSize: FONTS.sizes.lg,
    fontWeight: 'bold',
    marginTop: 4,
  },
  previewDivider: {
    width: 1,
    height: 40,
    backgroundColor: COLORS.borderLight,
  },
});
