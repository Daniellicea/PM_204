import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Platform,
} from 'react-native';
import { COLORS, FONTS, SPACING, RADIUS } from '../theme/colors';

const { width } = Dimensions.get('window');

const mockCreditos = [
  {
    institucion: 'BBVA',
    deuda: '$8,500.00',
    tasa: '36.5%',
    pagoMin: '$425.00',
    limite: '$25,000',
    icon: '🏦',
  },
  {
    institucion: 'Citibanamex',
    deuda: '$12,200.00',
    tasa: '28.9%',
    pagoMin: '$610.00',
    limite: '$40,000',
    icon: '🏛️',
  },
  {
    institucion: 'Nu México',
    deuda: '$3,800.00',
    tasa: '45.2%',
    pagoMin: '$190.00',
    limite: '$10,000',
    icon: '💜',
  },
];

const estrategias = [
  {
    nombre: 'Método Avalancha',
    icon: '🏔️',
    desc: 'Paga primero la deuda con la tasa más alta. Ahorras más en intereses a largo plazo.',
    orden: ['Nu México (45.2%)', 'BBVA (36.5%)', 'Citibanamex (28.9%)'],
    ahorro: '$2,340',
    color: COLORS.cyan,
    colorSoft: COLORS.cyanSoft,
  },
  {
    nombre: 'Método Bola de Nieve',
    icon: '⛄',
    desc: 'Paga primero la deuda más pequeña. Da motivación rápida al eliminar deudas.',
    orden: ['Nu México ($3,800)', 'BBVA ($8,500)', 'Citibanamex ($12,200)'],
    ahorro: '$1,890',
    color: COLORS.purpleLight,
    colorSoft: COLORS.purpleSoft,
  },
];

export default function CreditosScreen({ route }) {
  const userId = route?.params?.userId || null;
  const [selectedStrategy, setSelectedStrategy] = useState(0);
  const [apiCreditos, setApiCreditos] = useState([]);
  const [apiInstituciones, setApiInstituciones] = useState([]);
  const [totalDeuda, setTotalDeuda] = useState(0);
  const [totalLimite, setTotalLimite] = useState(0);

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      if (!userId) return;
      try {
        const baseUrl = 'http://3.80.132.97:5000';
        
        const [creditosRes, instRes] = await Promise.all([
          fetch(`${baseUrl}/v1/creditos/usuario/${userId}`),
          fetch(`${baseUrl}/v1/instituciones`)
        ]);

        const credData = await creditosRes.json();
        const instData = await instRes.json();

        if (isMounted) {
          if (instData.instituciones) {
            setApiInstituciones(instData.instituciones);
          }
          if (credData.creditos) {
            let deuda = 0;
            let limite = 0;
            const mappedCreditos = credData.creditos.map(c => {
              const inst = instData.instituciones?.find(i => i.id === c.institucion_id);
              deuda += c.deuda_actual;
              limite += c.limite_credito;
              return {
                ...c,
                institucion: inst ? inst.nombre : 'Otra Institución',
                icon: '🏦', // Default icon
                deudaStr: `$${c.deuda_actual.toLocaleString()}`,
                limiteStr: `$${c.limite_credito.toLocaleString()}`,
                pagoMinStr: `$${c.pago_minimo.toLocaleString()}`,
                tasaStr: `${c.tasa_anual}%`
              };
            });
            setApiCreditos(mappedCreditos);
            setTotalDeuda(deuda);
            setTotalLimite(limite);
          }
        }
      } catch (err) {
        console.error("Error fetching creditos:", err);
      }
    };
    fetchData();
    return () => { isMounted = false; };
  }, [userId]);

  const utilizacion = totalLimite > 0 ? Math.round((totalDeuda / totalLimite) * 100) : 0;

  // Compute dynamic strategies
  const avalancha = [...apiCreditos].sort((a, b) => b.tasa_anual - a.tasa_anual);
  const bolaNieve = [...apiCreditos].sort((a, b) => a.deuda_actual - b.deuda_actual);

  const dynamicEstrategias = [
    {
      nombre: 'Método Avalancha',
      icon: '🏔️',
      desc: 'Paga primero la deuda con la tasa más alta. Ahorras más en intereses a largo plazo.',
      orden: avalancha.map(c => `${c.institucion} (${c.tasaStr})`),
      ahorro: 'Cálculo pendiente',
      color: COLORS.cyan,
      colorSoft: COLORS.cyanSoft,
    },
    {
      nombre: 'Método Bola de Nieve',
      icon: '⛄',
      desc: 'Paga primero la deuda más pequeña. Da motivación rápida al eliminar deudas.',
      orden: bolaNieve.map(c => `${c.institucion} (${c.deudaStr})`),
      ahorro: 'Cálculo pendiente',
      color: COLORS.purpleLight,
      colorSoft: COLORS.purpleSoft,
    },
  ];

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>⚡ Mis Créditos</Text>
        <Text style={styles.headerSub}>Gestiona tus deudas y elige una estrategia de pago</Text>
      </View>

      {/* Summary card */}
      <View style={styles.summaryCard}>
        <View style={styles.summaryRow}>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Deuda Total</Text>
            <Text style={styles.summaryValue}>${totalDeuda.toLocaleString()}</Text>
          </View>
          <View style={styles.summaryDivider} />
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Límite Total</Text>
            <Text style={styles.summaryValue}>${totalLimite.toLocaleString()}</Text>
          </View>
          <View style={styles.summaryDivider} />
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Utilización</Text>
            <Text style={[styles.summaryValue, { color: utilizacion < 30 ? COLORS.green : COLORS.rose }]}>
              {utilizacion}%
            </Text>
          </View>
        </View>
        {/* Utilization bar */}
        <View style={styles.utilBar}>
          <View style={[styles.utilFill, { width: `${utilizacion}%`, backgroundColor: utilizacion < 30 ? COLORS.green : COLORS.orange }]} />
        </View>
        <Text style={styles.utilNote}>
          {utilizacion < 30
            ? '✅ Tu utilización está en un rango saludable'
            : '⚠️ Intenta mantener tu utilización por debajo del 30%'}
        </Text>
      </View>

      {/* Credit cards */}
      <Text style={styles.sectionTitle}>🏦 Créditos Activos</Text>
      {apiCreditos.length === 0 ? (
        <Text style={{color: COLORS.textMuted, textAlign: 'center', marginVertical: 20}}>No hay créditos registrados.</Text>
      ) : (
        apiCreditos.map((c, i) => (
          <View key={c.id || i} style={styles.creditCard}>
            <View style={styles.creditHeader}>
              <View style={styles.creditIcon}>
                <Text style={{ fontSize: 24 }}>{c.icon}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.creditInst}>{c.institucion}</Text>
                <Text style={styles.creditTasa}>Tasa: {c.tasaStr}</Text>
              </View>
              <View style={styles.creditDeudaBox}>
                <Text style={styles.creditDeuda}>{c.deudaStr}</Text>
                <Text style={styles.creditDeudaLabel}>Deuda</Text>
              </View>
            </View>
            <View style={styles.creditDetails}>
              <View style={styles.creditDetailItem}>
                <Text style={styles.creditDetailLabel}>Pago Mínimo</Text>
                <Text style={styles.creditDetailValue}>{c.pagoMinStr}</Text>
              </View>
              <View style={styles.creditDetailItem}>
                <Text style={styles.creditDetailLabel}>Límite</Text>
                <Text style={styles.creditDetailValue}>{c.limiteStr}</Text>
              </View>
            </View>
          </View>
        ))
      )}

      {/* Add credit button */}
      <TouchableOpacity style={styles.btnAdd}>
        <Text style={styles.btnAddText}>+ Agregar Nuevo Crédito</Text>
      </TouchableOpacity>

      {/* Strategies */}
      <Text style={styles.sectionTitle}>🎯 Estrategias de Pago</Text>
      <View style={styles.strategyTabs}>
        {dynamicEstrategias.map((e, i) => (
          <TouchableOpacity
            key={i}
            style={[
              styles.strategyTab,
              selectedStrategy === i && { backgroundColor: e.colorSoft, borderColor: e.color }
            ]}
            onPress={() => setSelectedStrategy(i)}
          >
            <Text style={{ fontSize: 20, marginBottom: 4 }}>{e.icon}</Text>
            <Text style={[styles.strategyTabTitle, selectedStrategy === i && { color: e.color }]}>
              {e.nombre.split(' ')[1]}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.strategyContent}>
        <Text style={styles.strategyDesc}>{dynamicEstrategias[selectedStrategy].desc}</Text>
        
        <Text style={styles.strategyOrdenTitle}>Orden de Pago Sugerido:</Text>
        {dynamicEstrategias[selectedStrategy].orden.map((item, idx) => (
          <View key={idx} style={styles.ordenItem}>
            <View style={[styles.ordenNum, { backgroundColor: dynamicEstrategias[selectedStrategy].colorSoft }]}>
              <Text style={[styles.ordenNumText, { color: dynamicEstrategias[selectedStrategy].color }]}>{idx + 1}</Text>
            </View>
            <Text style={styles.ordenText}>{item}</Text>
          </View>
        ))}

        <View style={[styles.strategyAhorro, { backgroundColor: dynamicEstrategias[selectedStrategy].colorSoft }]}>
          <Text style={styles.strategyAhorroLabel}>Ahorro estimado en intereses:</Text>
          <Text style={[styles.strategyAhorroValue, { color: dynamicEstrategias[selectedStrategy].color }]}>
            {dynamicEstrategias[selectedStrategy].ahorro}
          </Text>
        </View>

        <TouchableOpacity
          style={[styles.btnStrategy, { backgroundColor: estrategias[selectedStrategy].color }]}
        >
          <Text style={styles.btnStrategyText}>Aplicar Estrategia {estrategias[selectedStrategy].icon}</Text>
        </TouchableOpacity>
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

  // Summary
  summaryCard: {
    backgroundColor: COLORS.bgCard,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: SPACING.lg,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  summaryItem: {
    alignItems: 'center',
    flex: 1,
  },
  summaryLabel: {
    color: COLORS.textMuted,
    fontSize: FONTS.sizes.xs,
    marginBottom: 4,
  },
  summaryValue: {
    color: COLORS.textPrimary,
    fontSize: FONTS.sizes.lg,
    fontWeight: 'bold',
  },
  summaryDivider: {
    width: 1,
    height: 36,
    backgroundColor: COLORS.borderLight,
  },
  utilBar: {
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.borderLight,
    marginBottom: 8,
  },
  utilFill: {
    height: 8,
    borderRadius: 4,
  },
  utilNote: {
    color: COLORS.textMuted,
    fontSize: FONTS.sizes.xs,
    textAlign: 'center',
  },

  // Section
  sectionTitle: {
    color: COLORS.textPrimary,
    fontSize: FONTS.sizes.lg,
    fontWeight: 'bold',
    marginBottom: SPACING.md,
  },

  // Credit cards
  creditCard: {
    backgroundColor: COLORS.bgCard,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 12,
  },
  creditHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  creditIcon: {
    width: 48,
    height: 48,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.bgSecondary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  creditInst: {
    color: COLORS.textPrimary,
    fontSize: FONTS.sizes.md,
    fontWeight: 'bold',
  },
  creditTasa: {
    color: COLORS.rose,
    fontSize: FONTS.sizes.xs,
    fontWeight: '600',
    marginTop: 2,
  },
  creditDeudaBox: {
    alignItems: 'flex-end',
  },
  creditDeuda: {
    color: COLORS.textPrimary,
    fontSize: FONTS.sizes.lg,
    fontWeight: 'bold',
  },
  creditDeudaLabel: {
    color: COLORS.textMuted,
    fontSize: FONTS.sizes.xs,
  },
  creditDetails: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: COLORS.borderLight,
    paddingTop: SPACING.sm,
    gap: SPACING.lg,
  },
  creditDetailItem: {
    flex: 1,
  },
  creditDetailLabel: {
    color: COLORS.textMuted,
    fontSize: FONTS.sizes.xs,
  },
  creditDetailValue: {
    color: COLORS.textSecondary,
    fontSize: FONTS.sizes.sm,
    fontWeight: '600',
    marginTop: 2,
  },

  // Add button
  btnAdd: {
    backgroundColor: COLORS.bgCard,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.purple,
    borderStyle: 'dashed',
    marginBottom: SPACING.lg,
  },
  btnAddText: {
    color: COLORS.purpleLight,
    fontSize: FONTS.sizes.sm,
    fontWeight: 'bold',
  },

  // Strategy tabs
  strategyTabs: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: SPACING.md,
  },
  strategyTab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
    backgroundColor: COLORS.bgCard,
    gap: 6,
  },
  strategyTabIcon: {
    fontSize: 18,
  },
  strategyTabText: {
    color: COLORS.textSecondary,
    fontSize: FONTS.sizes.sm,
    fontWeight: '600',
  },

  // Strategy card
  strategyCard: {
    backgroundColor: COLORS.bgCard,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    borderWidth: 1,
    marginBottom: SPACING.md,
  },
  strategyDesc: {
    color: COLORS.textSecondary,
    fontSize: FONTS.sizes.sm,
    lineHeight: 20,
    marginBottom: SPACING.md,
  },
  strategyOrderTitle: {
    color: COLORS.textMuted,
    fontSize: FONTS.sizes.xs,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: SPACING.sm,
  },
  strategyOrderItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  strategyOrderNum: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  strategyOrderNumText: {
    fontSize: FONTS.sizes.sm,
    fontWeight: 'bold',
  },
  strategyOrderText: {
    color: COLORS.textPrimary,
    fontSize: FONTS.sizes.sm,
    fontWeight: '500',
  },
  strategyAhorro: {
    borderRadius: RADIUS.md,
    padding: SPACING.md,
    marginTop: SPACING.md,
    marginBottom: SPACING.md,
    alignItems: 'center',
  },
  strategyAhorroLabel: {
    color: COLORS.textMuted,
    fontSize: FONTS.sizes.xs,
    marginBottom: 4,
  },
  strategyAhorroValue: {
    fontSize: FONTS.sizes.xl,
    fontWeight: 'bold',
  },
  btnStrategy: {
    borderRadius: RADIUS.full,
    paddingVertical: 14,
    alignItems: 'center',
  },
  btnStrategyText: {
    color: '#fff',
    fontSize: FONTS.sizes.md,
    fontWeight: 'bold',
  },
});
