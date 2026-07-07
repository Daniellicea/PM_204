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

const insights = [
  {
    icon: '📉',
    title: 'Tendencia de Deuda',
    value: '-12%',
    desc: 'Tu deuda ha bajado este mes comparado con el anterior.',
    color: COLORS.green,
  },
  {
    icon: '⚠️',
    title: 'Gasto Hormiga Detectado',
    value: '+$580',
    desc: 'Identificamos 4 gastos recurrentes que podrías optimizar.',
    color: COLORS.orange,
  },
  {
    icon: '🎯',
    title: 'Meta de Ahorro',
    value: '68%',
    desc: 'Estás al 68% de tu meta mensual de ahorro.',
    color: COLORS.cyan,
  },
];

const predictions = [
  { month: 'Ago 2026', deuda: '$22,100', trend: '↓', color: COLORS.green },
  { month: 'Sep 2026', deuda: '$19,800', trend: '↓', color: COLORS.green },
  { month: 'Oct 2026', deuda: '$17,200', trend: '↓', color: COLORS.green },
  { month: 'Nov 2026', deuda: '$14,500', trend: '↓', color: COLORS.green },
  { month: 'Dic 2026', deuda: '$11,300', trend: '↓', color: COLORS.green },
];

export default function IAScreen() {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>🤖 Widata AI</Text>
        <Text style={styles.headerSub}>Análisis predictivo y recomendaciones inteligentes</Text>
      </View>

      {/* AI Status */}
      <View style={styles.aiStatusCard}>
        <View style={styles.aiStatusHeader}>
          <View style={styles.aiPulse}>
            <View style={styles.aiPulseInner} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.aiStatusTitle}>Motor de IA Activo</Text>
            <Text style={styles.aiStatusSub}>Analizando tus patrones financieros...</Text>
          </View>
          <View style={styles.aiBadge}>
            <Text style={styles.aiBadgeText}>✨ v2.0</Text>
          </View>
        </View>
      </View>

      {/* Main recommendation */}
      <View style={styles.recCard}>
        <View style={styles.recHeader}>
          <Text style={styles.recTitle}>🎯 Recomendación Principal</Text>
          <View style={styles.recConfidence}>
            <Text style={styles.recConfidenceText}>85% confianza</Text>
          </View>
        </View>

        <View style={styles.recBody}>
          <Text style={styles.recText}>
            "Detectamos una oportunidad de ahorro de{' '}
            <Text style={{ fontWeight: 'bold', color: COLORS.cyan }}>$1,250 MXN</Text> este mes
            al optimizar tus deudas con el método{' '}
            <Text style={{ fontWeight: 'bold', color: COLORS.purpleLight }}>Avalancha</Text> basado en
            tus tasas actuales."
          </Text>
        </View>

        <View style={styles.recActions}>
          <TouchableOpacity style={styles.btnPrimary}>
            <Text style={styles.btnPrimaryText}>🚀 Ejecutar Plan AI</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnOutline}>
            <Text style={styles.btnOutlineText}>📋 Ver Detalles</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Health Financial */}
      <View style={styles.healthCard}>
        <Text style={styles.sectionTitle}>❤️ Salud Financiera</Text>
        <View style={styles.healthBody}>
          <View style={styles.healthCircle}>
            <View style={styles.healthCircleOuter}>
              <View style={styles.healthCircleFill} />
              <View style={styles.healthCircleInner}>
                <Text style={styles.healthGrade}>A+</Text>
                <Text style={styles.healthGradeLabel}>Excelente</Text>
              </View>
            </View>
          </View>
          <View style={styles.healthMetrics}>
            <View style={styles.healthMetric}>
              <Text style={styles.healthMetricLabel}>Score Crediticio</Text>
              <View style={styles.healthMetricBar}>
                <View style={[styles.healthMetricFill, { width: '85%', backgroundColor: COLORS.green }]} />
              </View>
              <Text style={[styles.healthMetricValue, { color: COLORS.green }]}>750 pts</Text>
            </View>
            <View style={styles.healthMetric}>
              <Text style={styles.healthMetricLabel}>Utilización</Text>
              <View style={styles.healthMetricBar}>
                <View style={[styles.healthMetricFill, { width: '22%', backgroundColor: COLORS.green }]} />
              </View>
              <Text style={[styles.healthMetricValue, { color: COLORS.green }]}>22%</Text>
            </View>
            <View style={styles.healthMetric}>
              <Text style={styles.healthMetricLabel}>Pago Puntual</Text>
              <View style={styles.healthMetricBar}>
                <View style={[styles.healthMetricFill, { width: '95%', backgroundColor: COLORS.cyan }]} />
              </View>
              <Text style={[styles.healthMetricValue, { color: COLORS.cyan }]}>95%</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Insights */}
      <Text style={styles.sectionTitle}>📊 Insights del Algoritmo</Text>
      {insights.map((item, i) => (
        <View key={i} style={[styles.insightCard, { borderLeftColor: item.color }]}>
          <View style={styles.insightRow}>
            <Text style={styles.insightIcon}>{item.icon}</Text>
            <View style={{ flex: 1 }}>
              <Text style={styles.insightTitle}>{item.title}</Text>
              <Text style={styles.insightDesc}>{item.desc}</Text>
            </View>
            <View style={[styles.insightValueBg, { backgroundColor: item.color + '20' }]}>
              <Text style={[styles.insightValue, { color: item.color }]}>{item.value}</Text>
            </View>
          </View>
        </View>
      ))}

      {/* Predictions table */}
      <View style={styles.predCard}>
        <Text style={styles.sectionTitle}>🔮 Proyección de Deuda</Text>
        <Text style={styles.predSubtitle}>
          Si sigues la estrategia sugerida, así se verá tu deuda:
        </Text>
        <View style={styles.predTable}>
          <View style={styles.predHeader}>
            <Text style={[styles.predHeaderText, { flex: 2 }]}>Mes</Text>
            <Text style={[styles.predHeaderText, { flex: 2 }]}>Deuda Est.</Text>
            <Text style={[styles.predHeaderText, { flex: 1 }]}>Trend</Text>
          </View>
          {predictions.map((p, i) => (
            <View key={i} style={styles.predRow}>
              <Text style={[styles.predCell, { flex: 2 }]}>{p.month}</Text>
              <Text style={[styles.predCellBold, { flex: 2 }]}>{p.deuda}</Text>
              <View style={[styles.predTrend, { flex: 1 }]}>
                <Text style={[styles.predTrendText, { color: p.color }]}>{p.trend}</Text>
              </View>
            </View>
          ))}
        </View>
        <View style={styles.predNote}>
          <Text style={styles.predNoteText}>
            📈 Podrías estar libre de deuda para <Text style={{ fontWeight: 'bold', color: COLORS.green }}>Marzo 2027</Text>
          </Text>
        </View>
      </View>
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
  headerSub: {
    color: COLORS.textMuted,
    fontSize: FONTS.sizes.sm,
    marginTop: 4,
  },

  // AI Status
  aiStatusCard: {
    backgroundColor: COLORS.bgCard,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: 'rgba(6, 182, 212, 0.25)',
    marginBottom: SPACING.md,
  },
  aiStatusHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  aiPulse: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.cyanSoft,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  aiPulseInner: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: COLORS.cyan,
  },
  aiStatusTitle: {
    color: COLORS.textPrimary,
    fontSize: FONTS.sizes.md,
    fontWeight: 'bold',
  },
  aiStatusSub: {
    color: COLORS.textMuted,
    fontSize: FONTS.sizes.xs,
    marginTop: 2,
  },
  aiBadge: {
    backgroundColor: COLORS.cyanSoft,
    borderWidth: 1,
    borderColor: 'rgba(6, 182, 212, 0.25)',
    borderRadius: RADIUS.full,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  aiBadgeText: {
    color: COLORS.cyan,
    fontSize: FONTS.sizes.xs,
    fontWeight: 'bold',
  },

  // Recommendation
  recCard: {
    backgroundColor: COLORS.bgCard,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.purple + '40',
    marginBottom: SPACING.md,
  },
  recHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  recTitle: {
    color: COLORS.textPrimary,
    fontSize: FONTS.sizes.md,
    fontWeight: 'bold',
    flex: 1,
  },
  recConfidence: {
    backgroundColor: COLORS.greenSoft,
    borderRadius: RADIUS.full,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  recConfidenceText: {
    color: COLORS.green,
    fontSize: FONTS.sizes.xs,
    fontWeight: 'bold',
  },
  recBody: {
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderRadius: RADIUS.md,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
    marginBottom: SPACING.md,
  },
  recText: {
    color: COLORS.textSecondary,
    fontSize: FONTS.sizes.sm,
    lineHeight: 22,
    fontStyle: 'italic',
  },
  recActions: {
    flexDirection: 'row',
    gap: 10,
  },
  btnPrimary: {
    flex: 1,
    backgroundColor: COLORS.purple,
    borderRadius: RADIUS.full,
    paddingVertical: 12,
    alignItems: 'center',
    elevation: 4,
    shadowColor: COLORS.purple,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  btnPrimaryText: {
    color: '#fff',
    fontSize: FONTS.sizes.sm,
    fontWeight: 'bold',
  },
  btnOutline: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    borderRadius: RADIUS.full,
    paddingVertical: 12,
    alignItems: 'center',
  },
  btnOutlineText: {
    color: COLORS.textPrimary,
    fontSize: FONTS.sizes.sm,
    fontWeight: '500',
  },

  // Section
  sectionTitle: {
    color: COLORS.textPrimary,
    fontSize: FONTS.sizes.lg,
    fontWeight: 'bold',
    marginBottom: SPACING.md,
  },

  // Health
  healthCard: {
    backgroundColor: COLORS.bgCard,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: SPACING.lg,
  },
  healthBody: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
  },
  healthCircle: {
    alignItems: 'center',
  },
  healthCircleOuter: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 6,
    borderColor: COLORS.borderLight,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  healthCircleFill: {
    position: 'absolute',
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 6,
    borderColor: COLORS.green,
    borderTopColor: 'transparent',
    borderRightColor: 'transparent',
    transform: [{ rotate: '45deg' }],
  },
  healthCircleInner: {
    width: 76,
    height: 76,
    borderRadius: 38,
    justifyContent: 'center',
    alignItems: 'center',
  },
  healthGrade: {
    color: COLORS.textPrimary,
    fontSize: 24,
    fontWeight: 'bold',
  },
  healthGradeLabel: {
    color: COLORS.green,
    fontSize: FONTS.sizes.xs,
    fontWeight: '600',
  },
  healthMetrics: {
    flex: 1,
    gap: 10,
  },
  healthMetric: {
    gap: 4,
  },
  healthMetricLabel: {
    color: COLORS.textMuted,
    fontSize: FONTS.sizes.xs,
  },
  healthMetricBar: {
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.borderLight,
  },
  healthMetricFill: {
    height: 6,
    borderRadius: 3,
  },
  healthMetricValue: {
    fontSize: FONTS.sizes.xs,
    fontWeight: 'bold',
  },

  // Insights
  insightCard: {
    backgroundColor: COLORS.bgCard,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderLeftWidth: 4,
    marginBottom: 10,
  },
  insightRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  insightIcon: {
    fontSize: 28,
    marginRight: 12,
  },
  insightTitle: {
    color: COLORS.textPrimary,
    fontSize: FONTS.sizes.sm,
    fontWeight: 'bold',
  },
  insightDesc: {
    color: COLORS.textMuted,
    fontSize: FONTS.sizes.xs,
    marginTop: 2,
    lineHeight: 16,
  },
  insightValueBg: {
    borderRadius: RADIUS.md,
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginLeft: 10,
  },
  insightValue: {
    fontSize: FONTS.sizes.md,
    fontWeight: 'bold',
  },

  // Predictions
  predCard: {
    backgroundColor: COLORS.bgCard,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: SPACING.md,
    marginTop: SPACING.sm,
  },
  predSubtitle: {
    color: COLORS.textMuted,
    fontSize: FONTS.sizes.sm,
    marginBottom: SPACING.md,
  },
  predTable: {},
  predHeader: {
    flexDirection: 'row',
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.borderLight,
  },
  predHeaderText: {
    color: COLORS.textMuted,
    fontSize: FONTS.sizes.xs,
    fontWeight: '600',
  },
  predRow: {
    flexDirection: 'row',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.borderLight,
    alignItems: 'center',
  },
  predCell: {
    color: COLORS.textSecondary,
    fontSize: FONTS.sizes.sm,
  },
  predCellBold: {
    color: COLORS.textPrimary,
    fontSize: FONTS.sizes.sm,
    fontWeight: 'bold',
  },
  predTrend: {
    alignItems: 'center',
  },
  predTrendText: {
    fontSize: FONTS.sizes.lg,
    fontWeight: 'bold',
  },
  predNote: {
    backgroundColor: COLORS.greenSoft,
    borderRadius: RADIUS.md,
    padding: SPACING.md,
    marginTop: SPACING.md,
    alignItems: 'center',
  },
  predNoteText: {
    color: COLORS.textSecondary,
    fontSize: FONTS.sizes.sm,
    textAlign: 'center',
  },
});
