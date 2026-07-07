import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { COLORS, FONTS, SPACING, RADIUS } from '../theme/colors';

const { width } = Dimensions.get('window');

export default function CalculadoraScreen() {
  const [activeTab, setActiveTab] = useState('compuesto');

  // Interés compuesto
  const [capital, setCapital] = useState('10000');
  const [tasa, setTasa] = useState('12');
  const [periodos, setPeriodos] = useState('5');
  const [aportacion, setAportacion] = useState('500');

  // Pago mensual
  const [deuda, setDeuda] = useState('24500');
  const [tasaDeuda, setTasaDeuda] = useState('36');
  const [plazo, setPlazo] = useState('12');

  const calcCompuesto = () => {
    const c = parseFloat(capital) || 0;
    const r = (parseFloat(tasa) || 0) / 100 / 12;
    const n = (parseFloat(periodos) || 0) * 12;
    const a = parseFloat(aportacion) || 0;

    // Future value with monthly contributions
    const fvCapital = c * Math.pow(1 + r, n);
    const fvAportaciones = a * ((Math.pow(1 + r, n) - 1) / r);
    const total = fvCapital + fvAportaciones;
    const totalInvertido = c + a * n;
    const intereses = total - totalInvertido;

    return { total, totalInvertido, intereses };
  };

  const calcPagoMensual = () => {
    const d = parseFloat(deuda) || 0;
    const r = (parseFloat(tasaDeuda) || 0) / 100 / 12;
    const n = parseFloat(plazo) || 1;

    if (r === 0) return { pago: d / n, totalPagar: d, interesTotal: 0 };

    const pago = d * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalPagar = pago * n;
    const interesTotal = totalPagar - d;

    return { pago, totalPagar, interesTotal };
  };

  const compResult = calcCompuesto();
  const pagoResult = calcPagoMensual();

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>🧮 Calculadora</Text>
        <Text style={styles.headerSub}>Herramientas de cálculo financiero</Text>
      </View>

      {/* Tabs */}
      <View style={styles.tabRow}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'compuesto' && styles.tabActive]}
          onPress={() => setActiveTab('compuesto')}
        >
          <Text style={[styles.tabText, activeTab === 'compuesto' && styles.tabTextActive]}>
            📈 Interés Compuesto
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'pago' && styles.tabActive]}
          onPress={() => setActiveTab('pago')}
        >
          <Text style={[styles.tabText, activeTab === 'pago' && styles.tabTextActive]}>
            💳 Pago Mensual
          </Text>
        </TouchableOpacity>
      </View>

      {activeTab === 'compuesto' ? (
        <>
          {/* Compound interest form */}
          <View style={styles.formCard}>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>💰 Capital Inicial (MXN)</Text>
              <TextInput
                style={styles.input}
                value={capital}
                onChangeText={setCapital}
                keyboardType="numeric"
                placeholderTextColor={COLORS.textMuted}
                placeholder="Ej: 10000"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>📊 Tasa Anual (%)</Text>
              <TextInput
                style={styles.input}
                value={tasa}
                onChangeText={setTasa}
                keyboardType="numeric"
                placeholderTextColor={COLORS.textMuted}
                placeholder="Ej: 12"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>📅 Años de Inversión</Text>
              <TextInput
                style={styles.input}
                value={periodos}
                onChangeText={setPeriodos}
                keyboardType="numeric"
                placeholderTextColor={COLORS.textMuted}
                placeholder="Ej: 5"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>➕ Aportación Mensual (MXN)</Text>
              <TextInput
                style={styles.input}
                value={aportacion}
                onChangeText={setAportacion}
                keyboardType="numeric"
                placeholderTextColor={COLORS.textMuted}
                placeholder="Ej: 500"
              />
            </View>
          </View>

          {/* Result */}
          <View style={styles.resultCard}>
            <Text style={styles.resultTitle}>📊 Resultado</Text>

            <View style={styles.resultMain}>
              <Text style={styles.resultLabel}>Valor Futuro Total</Text>
              <Text style={styles.resultValue}>
                ${Math.round(compResult.total).toLocaleString()}
              </Text>
            </View>

            <View style={styles.resultRow}>
              <View style={styles.resultItem}>
                <Text style={styles.resultItemLabel}>Capital Invertido</Text>
                <Text style={[styles.resultItemValue, { color: COLORS.cyan }]}>
                  ${Math.round(compResult.totalInvertido).toLocaleString()}
                </Text>
              </View>
              <View style={styles.resultDivider} />
              <View style={styles.resultItem}>
                <Text style={styles.resultItemLabel}>Intereses Ganados</Text>
                <Text style={[styles.resultItemValue, { color: COLORS.green }]}>
                  +${Math.round(compResult.intereses).toLocaleString()}
                </Text>
              </View>
            </View>

            {/* Visual comparison */}
            <View style={styles.compBar}>
              <View
                style={[
                  styles.compBarSegment,
                  {
                    flex: compResult.totalInvertido,
                    backgroundColor: COLORS.cyan,
                    borderTopLeftRadius: 4,
                    borderBottomLeftRadius: 4,
                  },
                ]}
              />
              <View
                style={[
                  styles.compBarSegment,
                  {
                    flex: Math.max(compResult.intereses, 1),
                    backgroundColor: COLORS.green,
                    borderTopRightRadius: 4,
                    borderBottomRightRadius: 4,
                  },
                ]}
              />
            </View>
            <View style={styles.compBarLegend}>
              <View style={styles.compBarLegendItem}>
                <View style={[styles.compBarDot, { backgroundColor: COLORS.cyan }]} />
                <Text style={styles.compBarLegendText}>Capital</Text>
              </View>
              <View style={styles.compBarLegendItem}>
                <View style={[styles.compBarDot, { backgroundColor: COLORS.green }]} />
                <Text style={styles.compBarLegendText}>Intereses</Text>
              </View>
            </View>
          </View>
        </>
      ) : (
        <>
          {/* Monthly payment form */}
          <View style={styles.formCard}>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>💳 Deuda Total (MXN)</Text>
              <TextInput
                style={styles.input}
                value={deuda}
                onChangeText={setDeuda}
                keyboardType="numeric"
                placeholderTextColor={COLORS.textMuted}
                placeholder="Ej: 24500"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>📊 Tasa Anual (%)</Text>
              <TextInput
                style={styles.input}
                value={tasaDeuda}
                onChangeText={setTasaDeuda}
                keyboardType="numeric"
                placeholderTextColor={COLORS.textMuted}
                placeholder="Ej: 36"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>📅 Plazo (meses)</Text>
              <TextInput
                style={styles.input}
                value={plazo}
                onChangeText={setPlazo}
                keyboardType="numeric"
                placeholderTextColor={COLORS.textMuted}
                placeholder="Ej: 12"
              />
            </View>
          </View>

          {/* Result */}
          <View style={styles.resultCard}>
            <Text style={styles.resultTitle}>📊 Resultado</Text>

            <View style={styles.resultMain}>
              <Text style={styles.resultLabel}>Pago Mensual</Text>
              <Text style={styles.resultValue}>
                ${Math.round(pagoResult.pago).toLocaleString()}
              </Text>
            </View>

            <View style={styles.resultRow}>
              <View style={styles.resultItem}>
                <Text style={styles.resultItemLabel}>Total a Pagar</Text>
                <Text style={[styles.resultItemValue, { color: COLORS.orange }]}>
                  ${Math.round(pagoResult.totalPagar).toLocaleString()}
                </Text>
              </View>
              <View style={styles.resultDivider} />
              <View style={styles.resultItem}>
                <Text style={styles.resultItemLabel}>Intereses Totales</Text>
                <Text style={[styles.resultItemValue, { color: COLORS.rose }]}>
                  ${Math.round(pagoResult.interesTotal).toLocaleString()}
                </Text>
              </View>
            </View>

            <View style={styles.paymentTip}>
              <Text style={styles.paymentTipIcon}>💡</Text>
              <Text style={styles.paymentTipText}>
                Si pagas el doble mensualmente, ahorrarías{' '}
                <Text style={{ fontWeight: 'bold', color: COLORS.green }}>
                  ${Math.round(pagoResult.interesTotal * 0.45).toLocaleString()}
                </Text>{' '}
                en intereses.
              </Text>
            </View>
          </View>
        </>
      )}
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

  // Tabs
  tabRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: SPACING.md,
  },
  tab: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: RADIUS.lg,
    backgroundColor: COLORS.bgCard,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.borderLight,
  },
  tabActive: {
    backgroundColor: COLORS.purpleSoft,
    borderColor: COLORS.purple,
  },
  tabText: {
    color: COLORS.textMuted,
    fontSize: FONTS.sizes.sm,
    fontWeight: '600',
  },
  tabTextActive: {
    color: COLORS.purpleLight,
  },

  // Form
  formCard: {
    backgroundColor: COLORS.bgCard,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: SPACING.md,
  },
  inputGroup: {
    marginBottom: SPACING.md,
  },
  inputLabel: {
    color: COLORS.textSecondary,
    fontSize: FONTS.sizes.sm,
    fontWeight: '600',
    marginBottom: 8,
  },
  input: {
    backgroundColor: COLORS.bgSecondary,
    borderRadius: RADIUS.md,
    padding: SPACING.md,
    color: COLORS.textPrimary,
    fontSize: FONTS.sizes.md,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
    fontWeight: 'bold',
  },

  // Results
  resultCard: {
    backgroundColor: COLORS.bgCard,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.purple + '40',
    marginBottom: SPACING.md,
  },
  resultTitle: {
    color: COLORS.textPrimary,
    fontSize: FONTS.sizes.md,
    fontWeight: 'bold',
    marginBottom: SPACING.md,
  },
  resultMain: {
    alignItems: 'center',
    paddingVertical: SPACING.md,
    marginBottom: SPACING.md,
  },
  resultLabel: {
    color: COLORS.textMuted,
    fontSize: FONTS.sizes.sm,
    marginBottom: 4,
  },
  resultValue: {
    color: COLORS.textPrimary,
    fontSize: FONTS.sizes.hero,
    fontWeight: 'bold',
  },
  resultRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  resultItem: {
    flex: 1,
    alignItems: 'center',
  },
  resultItemLabel: {
    color: COLORS.textMuted,
    fontSize: FONTS.sizes.xs,
    marginBottom: 4,
  },
  resultItemValue: {
    fontSize: FONTS.sizes.lg,
    fontWeight: 'bold',
  },
  resultDivider: {
    width: 1,
    height: 36,
    backgroundColor: COLORS.borderLight,
  },

  // Comparison bar
  compBar: {
    flexDirection: 'row',
    height: 12,
    borderRadius: 6,
    overflow: 'hidden',
    gap: 2,
    marginBottom: 8,
  },
  compBarSegment: {
    height: 12,
  },
  compBarLegend: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: SPACING.lg,
  },
  compBarLegendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  compBarDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  compBarLegendText: {
    color: COLORS.textMuted,
    fontSize: FONTS.sizes.xs,
  },

  // Payment tip
  paymentTip: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: COLORS.bgSecondary,
    borderRadius: RADIUS.md,
    padding: SPACING.md,
  },
  paymentTipIcon: {
    fontSize: 18,
    marginRight: 8,
  },
  paymentTipText: {
    color: COLORS.textSecondary,
    fontSize: FONTS.sizes.sm,
    flex: 1,
    lineHeight: 20,
  },
});
