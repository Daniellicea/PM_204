import React, { useState } from 'react';
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

const categorias = [
  { label: 'Todos', icon: '📋', active: true },
  { label: 'Hormiga', icon: '🐜', color: COLORS.rose },
  { label: 'Variable', icon: '🔄', color: COLORS.orange },
  { label: 'Fijo', icon: '📌', color: COLORS.textMuted },
];

const mockGastos = [
  { desc: 'Uber Eats', categoria: 'Hormiga', fecha: '03/07/2026', monto: 185, icon: '🛵' },
  { desc: 'Netflix', categoria: 'Variable', fecha: '01/07/2026', monto: 199, icon: '📺' },
  { desc: 'Café Starbucks', categoria: 'Hormiga', fecha: '30/06/2026', monto: 95, icon: '☕' },
  { desc: 'Renta', categoria: 'Fijo', fecha: '28/06/2026', monto: 6500, icon: '🏠' },
  { desc: 'Spotify', categoria: 'Variable', fecha: '27/06/2026', monto: 115, icon: '🎵' },
  { desc: 'Uber', categoria: 'Hormiga', fecha: '26/06/2026', monto: 145, icon: '🚗' },
  { desc: 'Café Andatti', categoria: 'Hormiga', fecha: '25/06/2026', monto: 35, icon: '☕' },
  { desc: 'Luz CFE', categoria: 'Fijo', fecha: '24/06/2026', monto: 850, icon: '💡' },
  { desc: 'Tacos', categoria: 'Hormiga', fecha: '23/06/2026', monto: 120, icon: '🌮' },
];

const getCatColor = (cat) => {
  switch (cat) {
    case 'Hormiga': return COLORS.rose;
    case 'Variable': return COLORS.orange;
    case 'Fijo': return COLORS.textMuted;
    default: return COLORS.textMuted;
  }
};

export default function GastosScreen() {
  const [selectedCat, setSelectedCat] = useState('Todos');

  const filteredGastos = selectedCat === 'Todos'
    ? mockGastos
    : mockGastos.filter(g => g.categoria === selectedCat);

  const totalMes = mockGastos.reduce((sum, g) => sum + g.monto, 0);
  const totalHormiga = mockGastos
    .filter(g => g.categoria === 'Hormiga')
    .reduce((sum, g) => sum + g.monto, 0);
  const totalVariable = mockGastos
    .filter(g => g.categoria === 'Variable')
    .reduce((sum, g) => sum + g.monto, 0);
  const totalFijo = mockGastos
    .filter(g => g.categoria === 'Fijo')
    .reduce((sum, g) => sum + g.monto, 0);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>💸 Mis Gastos</Text>
        <Text style={styles.headerSub}>Analiza y controla tus gastos del mes</Text>
      </View>

      {/* Monthly Summary */}
      <View style={styles.monthCard}>
        <Text style={styles.monthLabel}>TOTAL DEL MES</Text>
        <Text style={styles.monthTotal}>-${totalMes.toLocaleString()}</Text>
        <View style={styles.monthBreakdown}>
          <View style={styles.monthItem}>
            <View style={[styles.monthDot, { backgroundColor: COLORS.rose }]} />
            <Text style={styles.monthItemLabel}>Hormiga</Text>
            <Text style={[styles.monthItemValue, { color: COLORS.rose }]}>
              ${totalHormiga.toLocaleString()}
            </Text>
          </View>
          <View style={styles.monthItem}>
            <View style={[styles.monthDot, { backgroundColor: COLORS.orange }]} />
            <Text style={styles.monthItemLabel}>Variable</Text>
            <Text style={[styles.monthItemValue, { color: COLORS.orange }]}>
              ${totalVariable.toLocaleString()}
            </Text>
          </View>
          <View style={styles.monthItem}>
            <View style={[styles.monthDot, { backgroundColor: COLORS.textMuted }]} />
            <Text style={styles.monthItemLabel}>Fijo</Text>
            <Text style={[styles.monthItemValue, { color: COLORS.textSecondary }]}>
              ${totalFijo.toLocaleString()}
            </Text>
          </View>
        </View>

        {/* Visual bar breakdown */}
        <View style={styles.barBreakdown}>
          <View style={[styles.barSegment, { flex: totalHormiga, backgroundColor: COLORS.rose, borderTopLeftRadius: 4, borderBottomLeftRadius: 4 }]} />
          <View style={[styles.barSegment, { flex: totalVariable, backgroundColor: COLORS.orange }]} />
          <View style={[styles.barSegment, { flex: totalFijo, backgroundColor: COLORS.textMuted, borderTopRightRadius: 4, borderBottomRightRadius: 4 }]} />
        </View>
      </View>

      {/* Detector de fugas */}
      <View style={styles.fugaCard}>
        <View style={styles.fugaHeader}>
          <Text style={styles.fugaTitle}>🔍 Detector de Fugas</Text>
          <View style={styles.fugaBadge}>
            <Text style={styles.fugaBadgeText}>🐜 {mockGastos.filter(g => g.categoria === 'Hormiga').length} gastos hormiga</Text>
          </View>
        </View>
        <Text style={styles.fugaMsg}>
          Tus gastos hormiga suman <Text style={{ fontWeight: 'bold', color: COLORS.rose }}>${totalHormiga.toLocaleString()}</Text> este mes.
          Eso equivale a <Text style={{ fontWeight: 'bold', color: COLORS.rose }}>${(totalHormiga * 12).toLocaleString()}</Text> al año.
        </Text>
        <View style={styles.fugaTip}>
          <Text style={styles.fugaTipIcon}>💡</Text>
          <Text style={styles.fugaTipText}>
            Reducir estos gastos a la mitad te ahorraría ${Math.round(totalHormiga * 6).toLocaleString()} al año.
          </Text>
        </View>
      </View>

      {/* Category filter */}
      <View style={styles.catRow}>
        {categorias.map((cat, i) => (
          <TouchableOpacity
            key={i}
            style={[
              styles.catChip,
              selectedCat === cat.label && {
                backgroundColor: cat.color ? cat.color + '25' : COLORS.purpleSoft,
                borderColor: cat.color || COLORS.purple,
              },
            ]}
            onPress={() => setSelectedCat(cat.label)}
          >
            <Text style={styles.catChipIcon}>{cat.icon}</Text>
            <Text
              style={[
                styles.catChipText,
                selectedCat === cat.label && {
                  color: cat.color || COLORS.purpleLight,
                },
              ]}
            >
              {cat.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Gastos list */}
      <View style={styles.gastosList}>
        {filteredGastos.map((g, i) => (
          <View key={i} style={styles.gastoItem}>
            <View style={[styles.gastoIcon, { backgroundColor: getCatColor(g.categoria) + '20' }]}>
              <Text style={{ fontSize: 20 }}>{g.icon}</Text>
            </View>
            <View style={{ flex: 1, marginLeft: 12 }}>
              <Text style={styles.gastoDesc}>{g.desc}</Text>
              <View style={styles.gastoMeta}>
                <View style={[styles.gastoBadge, { backgroundColor: getCatColor(g.categoria) + '20' }]}>
                  <Text style={[styles.gastoBadgeText, { color: getCatColor(g.categoria) }]}>
                    {g.categoria}
                  </Text>
                </View>
                <Text style={styles.gastoFecha}>{g.fecha}</Text>
              </View>
            </View>
            <Text style={styles.gastoMonto}>-${g.monto.toLocaleString()}</Text>
          </View>
        ))}
      </View>

      {/* Add expense button */}
      <TouchableOpacity style={styles.btnAddGasto}>
        <Text style={styles.btnAddGastoText}>+ Registrar Nuevo Gasto</Text>
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

  // Month summary
  monthCard: {
    backgroundColor: COLORS.bgCard,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: SPACING.md,
    alignItems: 'center',
  },
  monthLabel: {
    color: COLORS.textMuted,
    fontSize: FONTS.sizes.xs,
    fontWeight: 'bold',
    letterSpacing: 1,
    marginBottom: 4,
  },
  monthTotal: {
    color: COLORS.rose,
    fontSize: FONTS.sizes.hero,
    fontWeight: 'bold',
    marginBottom: SPACING.md,
  },
  monthBreakdown: {
    flexDirection: 'row',
    gap: SPACING.lg,
    marginBottom: SPACING.md,
    width: '100%',
    justifyContent: 'space-around',
  },
  monthItem: {
    alignItems: 'center',
  },
  monthDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginBottom: 4,
  },
  monthItemLabel: {
    color: COLORS.textMuted,
    fontSize: FONTS.sizes.xs,
    marginBottom: 2,
  },
  monthItemValue: {
    fontSize: FONTS.sizes.sm,
    fontWeight: 'bold',
  },
  barBreakdown: {
    flexDirection: 'row',
    height: 8,
    width: '100%',
    borderRadius: 4,
    overflow: 'hidden',
    gap: 2,
  },
  barSegment: {
    height: 8,
  },

  // Fuga detector
  fugaCard: {
    backgroundColor: COLORS.bgCard,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.rose + '30',
    marginBottom: SPACING.md,
  },
  fugaHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  fugaTitle: {
    color: COLORS.textPrimary,
    fontSize: FONTS.sizes.md,
    fontWeight: 'bold',
  },
  fugaBadge: {
    backgroundColor: COLORS.roseSoft,
    borderRadius: RADIUS.full,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  fugaBadgeText: {
    color: COLORS.rose,
    fontSize: FONTS.sizes.xs,
    fontWeight: '600',
  },
  fugaMsg: {
    color: COLORS.textSecondary,
    fontSize: FONTS.sizes.sm,
    lineHeight: 20,
    marginBottom: SPACING.sm,
  },
  fugaTip: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: COLORS.bgSecondary,
    borderRadius: RADIUS.md,
    padding: SPACING.sm,
  },
  fugaTipIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  fugaTipText: {
    color: COLORS.textMuted,
    fontSize: FONTS.sizes.xs,
    flex: 1,
    lineHeight: 16,
  },

  // Categories
  catRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: SPACING.md,
  },
  catChip: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: RADIUS.full,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
    backgroundColor: COLORS.bgCard,
    gap: 4,
  },
  catChipIcon: {
    fontSize: 14,
  },
  catChipText: {
    color: COLORS.textSecondary,
    fontSize: FONTS.sizes.xs,
    fontWeight: '600',
  },

  // Gastos list
  gastosList: {
    backgroundColor: COLORS.bgCard,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: SPACING.md,
    overflow: 'hidden',
  },
  gastoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.borderLight,
  },
  gastoIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gastoDesc: {
    color: COLORS.textPrimary,
    fontSize: FONTS.sizes.sm,
    fontWeight: '600',
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

  // Add button
  btnAddGasto: {
    backgroundColor: COLORS.purple,
    borderRadius: RADIUS.full,
    paddingVertical: 16,
    alignItems: 'center',
    elevation: 4,
    shadowColor: COLORS.purple,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  btnAddGastoText: {
    color: '#fff',
    fontSize: FONTS.sizes.md,
    fontWeight: 'bold',
  },
});
