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

const cursos = [
  {
    icon: '💳',
    title: 'Estrategias de Pago',
    lessons: 8,
    completed: 6,
    percent: 75,
    level: 'Intermedio',
    color: COLORS.purpleLight,
    colorSoft: COLORS.purpleSoft,
  },
  {
    icon: '📊',
    title: 'Análisis de Score Crediticio',
    lessons: 10,
    completed: 3,
    percent: 30,
    level: 'Básico',
    color: COLORS.cyan,
    colorSoft: COLORS.cyanSoft,
  },
  {
    icon: '🏦',
    title: 'Productos Financieros',
    lessons: 6,
    completed: 0,
    percent: 0,
    level: 'Básico',
    color: COLORS.orange,
    colorSoft: COLORS.orangeSoft,
  },
  {
    icon: '📈',
    title: 'Introducción a Inversiones',
    lessons: 12,
    completed: 0,
    percent: 0,
    level: 'Avanzado',
    color: COLORS.green,
    colorSoft: COLORS.greenSoft,
  },
  {
    icon: '🛡️',
    title: 'Protección Financiera',
    lessons: 5,
    completed: 0,
    percent: 0,
    level: 'Intermedio',
    color: COLORS.rose,
    colorSoft: COLORS.roseSoft,
  },
];

const logros = [
  { icon: '🏆', title: 'Primer Paso', desc: 'Completaste tu primera lección', unlocked: true },
  { icon: '🔥', title: 'Racha de 7 días', desc: '7 días consecutivos aprendiendo', unlocked: true },
  { icon: '⭐', title: 'Curso Completo', desc: 'Completa un curso al 100%', unlocked: false },
  { icon: '🎓', title: 'Graduado Widata', desc: 'Completa todos los cursos', unlocked: false },
];

export default function AcademyScreen() {
  const totalLessons = cursos.reduce((sum, c) => sum + c.lessons, 0);
  const completedLessons = cursos.reduce((sum, c) => sum + c.completed, 0);
  const overallPercent = Math.round((completedLessons / totalLessons) * 100);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>🎓 Pi_widata Academy</Text>
        <Text style={styles.headerSub}>Aprende a dominar tus finanzas personales</Text>
      </View>

      {/* Overall progress */}
      <View style={styles.overallCard}>
        <View style={styles.overallTop}>
          <View style={styles.overallCircle}>
            <Text style={styles.overallPercent}>{overallPercent}%</Text>
          </View>
          <View style={{ flex: 1, marginLeft: SPACING.md }}>
            <Text style={styles.overallTitle}>Progreso General</Text>
            <Text style={styles.overallSub}>
              {completedLessons} de {totalLessons} lecciones completadas
            </Text>
            <View style={styles.overallBar}>
              <View style={[styles.overallFill, { width: `${overallPercent}%` }]} />
            </View>
          </View>
        </View>
        <View style={styles.overallStats}>
          <View style={styles.overallStat}>
            <Text style={styles.overallStatValue}>{cursos.length}</Text>
            <Text style={styles.overallStatLabel}>Cursos</Text>
          </View>
          <View style={styles.overallStatDivider} />
          <View style={styles.overallStat}>
            <Text style={styles.overallStatValue}>{completedLessons}</Text>
            <Text style={styles.overallStatLabel}>Completadas</Text>
          </View>
          <View style={styles.overallStatDivider} />
          <View style={styles.overallStat}>
            <Text style={styles.overallStatValue}>{totalLessons - completedLessons}</Text>
            <Text style={styles.overallStatLabel}>Pendientes</Text>
          </View>
          <View style={styles.overallStatDivider} />
          <View style={styles.overallStat}>
            <Text style={styles.overallStatValue}>2</Text>
            <Text style={styles.overallStatLabel}>Logros</Text>
          </View>
        </View>
      </View>

      {/* Courses */}
      <Text style={styles.sectionTitle}>📚 Cursos Disponibles</Text>
      {cursos.map((curso, i) => (
        <TouchableOpacity key={i} style={styles.courseCard}>
          <View style={styles.courseHeader}>
            <View style={[styles.courseIcon, { backgroundColor: curso.colorSoft }]}>
              <Text style={{ fontSize: 24 }}>{curso.icon}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.courseTitle}>{curso.title}</Text>
              <View style={styles.courseMeta}>
                <View style={[styles.courseLevelBadge, { backgroundColor: curso.colorSoft }]}>
                  <Text style={[styles.courseLevelText, { color: curso.color }]}>{curso.level}</Text>
                </View>
                <Text style={styles.courseLessons}>{curso.lessons} lecciones</Text>
              </View>
            </View>
            <View style={styles.coursePercent}>
              <Text style={[styles.coursePercentText, { color: curso.percent > 0 ? curso.color : COLORS.textMuted }]}>
                {curso.percent}%
              </Text>
            </View>
          </View>
          <View style={styles.courseBar}>
            <View style={[styles.courseFill, { width: `${curso.percent}%`, backgroundColor: curso.color }]} />
          </View>
          {curso.percent > 0 && curso.percent < 100 && (
            <Text style={styles.courseNote}>
              {curso.completed}/{curso.lessons} lecciones completadas — ¡Sigue así! 💪
            </Text>
          )}
          {curso.percent === 0 && (
            <View style={styles.courseStartRow}>
              <Text style={styles.courseStartText}>Aún no has comenzado</Text>
              <TouchableOpacity style={[styles.btnStart, { backgroundColor: curso.color }]}>
                <Text style={styles.btnStartText}>Comenzar →</Text>
              </TouchableOpacity>
            </View>
          )}
        </TouchableOpacity>
      ))}

      {/* Achievements */}
      <Text style={styles.sectionTitle}>🏆 Logros</Text>
      <View style={styles.achievementsGrid}>
        {logros.map((logro, i) => (
          <View
            key={i}
            style={[
              styles.achievementCard,
              !logro.unlocked && styles.achievementLocked,
            ]}
          >
            <Text style={[styles.achievementIcon, !logro.unlocked && { opacity: 0.3 }]}>
              {logro.icon}
            </Text>
            <Text style={[styles.achievementTitle, !logro.unlocked && { color: COLORS.textMuted }]}>
              {logro.title}
            </Text>
            <Text style={styles.achievementDesc}>{logro.desc}</Text>
            {logro.unlocked ? (
              <View style={styles.achievementUnlocked}>
                <Text style={styles.achievementUnlockedText}>✅ Desbloqueado</Text>
              </View>
            ) : (
              <View style={styles.achievementLockedBadge}>
                <Text style={styles.achievementLockedText}>🔒 Bloqueado</Text>
              </View>
            )}
          </View>
        ))}
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

  // Overall
  overallCard: {
    backgroundColor: COLORS.bgCard,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: SPACING.lg,
  },
  overallTop: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  overallCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 4,
    borderColor: COLORS.purple,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.purpleSoft,
  },
  overallPercent: {
    color: COLORS.purpleLight,
    fontSize: FONTS.sizes.lg,
    fontWeight: 'bold',
  },
  overallTitle: {
    color: COLORS.textPrimary,
    fontSize: FONTS.sizes.md,
    fontWeight: 'bold',
  },
  overallSub: {
    color: COLORS.textMuted,
    fontSize: FONTS.sizes.xs,
    marginTop: 2,
    marginBottom: 8,
  },
  overallBar: {
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.borderLight,
  },
  overallFill: {
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.purple,
  },
  overallStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: COLORS.borderLight,
    paddingTop: SPACING.md,
  },
  overallStat: {
    alignItems: 'center',
    flex: 1,
  },
  overallStatValue: {
    color: COLORS.textPrimary,
    fontSize: FONTS.sizes.lg,
    fontWeight: 'bold',
  },
  overallStatLabel: {
    color: COLORS.textMuted,
    fontSize: FONTS.sizes.xs,
    marginTop: 2,
  },
  overallStatDivider: {
    width: 1,
    height: 30,
    backgroundColor: COLORS.borderLight,
  },

  // Section
  sectionTitle: {
    color: COLORS.textPrimary,
    fontSize: FONTS.sizes.lg,
    fontWeight: 'bold',
    marginBottom: SPACING.md,
  },

  // Course cards
  courseCard: {
    backgroundColor: COLORS.bgCard,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 12,
  },
  courseHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  courseIcon: {
    width: 48,
    height: 48,
    borderRadius: RADIUS.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  courseTitle: {
    color: COLORS.textPrimary,
    fontSize: FONTS.sizes.md,
    fontWeight: 'bold',
  },
  courseMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 4,
  },
  courseLevelBadge: {
    borderRadius: RADIUS.full,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  courseLevelText: {
    fontSize: FONTS.sizes.xs,
    fontWeight: '600',
  },
  courseLessons: {
    color: COLORS.textMuted,
    fontSize: FONTS.sizes.xs,
  },
  coursePercent: {
    marginLeft: 8,
  },
  coursePercentText: {
    fontSize: FONTS.sizes.lg,
    fontWeight: 'bold',
  },
  courseBar: {
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.borderLight,
    marginBottom: 6,
  },
  courseFill: {
    height: 6,
    borderRadius: 3,
  },
  courseNote: {
    color: COLORS.textMuted,
    fontSize: FONTS.sizes.xs,
    textAlign: 'center',
    marginTop: 4,
  },
  courseStartRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  courseStartText: {
    color: COLORS.textMuted,
    fontSize: FONTS.sizes.xs,
  },
  btnStart: {
    borderRadius: RADIUS.full,
    paddingHorizontal: 14,
    paddingVertical: 6,
  },
  btnStartText: {
    color: '#fff',
    fontSize: FONTS.sizes.xs,
    fontWeight: 'bold',
  },

  // Achievements
  achievementsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: SPACING.lg,
  },
  achievementCard: {
    width: (width - 42) / 2,
    backgroundColor: COLORS.bgCard,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center',
  },
  achievementLocked: {
    opacity: 0.6,
  },
  achievementIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  achievementTitle: {
    color: COLORS.textPrimary,
    fontSize: FONTS.sizes.sm,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 4,
  },
  achievementDesc: {
    color: COLORS.textMuted,
    fontSize: FONTS.sizes.xs,
    textAlign: 'center',
    marginBottom: 8,
    lineHeight: 14,
  },
  achievementUnlocked: {
    backgroundColor: COLORS.greenSoft,
    borderRadius: RADIUS.full,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  achievementUnlockedText: {
    color: COLORS.green,
    fontSize: FONTS.sizes.xs,
    fontWeight: '600',
  },
  achievementLockedBadge: {
    backgroundColor: COLORS.borderLight,
    borderRadius: RADIUS.full,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  achievementLockedText: {
    color: COLORS.textMuted,
    fontSize: FONTS.sizes.xs,
    fontWeight: '600',
  },
});
