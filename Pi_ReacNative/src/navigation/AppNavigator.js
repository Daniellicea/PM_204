import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import HomeScreen from '../screens/HomeScreen';
import ResumenScreen from '../screens/ResumenScreen';
import CreditosScreen from '../screens/CreditosScreen';
import GastosScreen from '../screens/GastosScreen';
import IAScreen from '../screens/IAScreen';
import AcademyScreen from '../screens/AcademyScreen';
import CalculadoraScreen from '../screens/CalculadoraScreen';
import PerfilScreen from '../screens/PerfilScreen';

import { COLORS, FONTS, SPACING, RADIUS } from '../theme/colors';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function DashboardHeader({ navigation }) {
  return (
    <View style={styles.navbar}>
      <View style={styles.navBrand}>
        <Text style={styles.navBrandIcon}>📊</Text>
        <Text style={styles.navBrandText}>Pi_widata</Text>
      </View>
      <View style={styles.navRight}>
        <TouchableOpacity
          style={styles.navProfileBtn}
          onPress={() => navigation.navigate('Perfil')}
        >
          <Text style={{ fontSize: 16 }}>👤</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btnLogout}
          onPress={() => navigation.replace('Home')}
        >
          <Text style={styles.btnLogoutText}>Salir</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function TabIcon({ icon, label, focused }) {
  return (
    <View style={styles.tabIconContainer}>
      <Text style={[styles.tabIcon, focused && styles.tabIconActive]}>{icon}</Text>
      <Text style={[styles.tabLabel, focused && styles.tabLabelActive]}>{label}</Text>
    </View>
  );
}

function DashboardTabs() {
  return (
    <View style={{ flex: 1, backgroundColor: COLORS.bgPrimary }}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.bgPrimary} />
      <Tab.Navigator
        screenOptions={({ navigation }) => ({
          header: () => <DashboardHeader navigation={navigation} />,
          tabBarStyle: styles.tabBar,
          tabBarShowLabel: false,
          tabBarHideOnKeyboard: true,
        })}
      >
        <Tab.Screen
          name="Resumen"
          component={ResumenScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <TabIcon icon="📊" label="Resumen" focused={focused} />
            ),
          }}
        />
        <Tab.Screen
          name="Creditos"
          component={CreditosScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <TabIcon icon="⚡" label="Créditos" focused={focused} />
            ),
          }}
        />
        <Tab.Screen
          name="Gastos"
          component={GastosScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <TabIcon icon="💸" label="Gastos" focused={focused} />
            ),
          }}
        />
        <Tab.Screen
          name="IA"
          component={IAScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <TabIcon icon="🤖" label="IA" focused={focused} />
            ),
          }}
        />
        <Tab.Screen
          name="Academy"
          component={AcademyScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <TabIcon icon="🎓" label="Academy" focused={focused} />
            ),
          }}
        />
      </Tab.Navigator>
    </View>
  );
}

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Dashboard" component={DashboardTabs} />
        <Stack.Screen
          name="Calculadora"
          component={CalculadoraScreen}
          options={{
            headerShown: true,
            headerTitle: 'Calculadora',
            headerStyle: { backgroundColor: COLORS.bgSecondary },
            headerTintColor: COLORS.textPrimary,
            headerTitleStyle: { fontWeight: 'bold' },
          }}
        />
        <Stack.Screen
          name="Perfil"
          component={PerfilScreen}
          options={{
            headerShown: true,
            headerTitle: 'Mi Perfil',
            headerStyle: { backgroundColor: COLORS.bgSecondary },
            headerTintColor: COLORS.textPrimary,
            headerTitleStyle: { fontWeight: 'bold' },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
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
  navProfileBtn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: COLORS.purpleSoft,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
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

  // Tab bar
  tabBar: {
    backgroundColor: COLORS.bgSecondary,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    height: 70,
    paddingBottom: 8,
    paddingTop: 8,
    elevation: 0,
  },
  tabIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  tabIcon: {
    fontSize: 20,
    opacity: 0.5,
  },
  tabIconActive: {
    opacity: 1,
  },
  tabLabel: {
    color: COLORS.textMuted,
    fontSize: 10,
    fontWeight: '500',
  },
  tabLabelActive: {
    color: COLORS.purpleLight,
    fontWeight: 'bold',
  },
});
