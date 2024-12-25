import { Tabs } from 'expo-router';
import React from 'react';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { UserRound, DollarSign, LayoutDashboard } from 'lucide-react-native'
import { colors } from '@/styles/colors';
import { View, StyleSheet } from 'react-native';
import { MainGradientStyle } from '@/styles/mainGradient';

export default function TabLayout() {

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.primary,
          elevation: 0,
          shadowOpacity: 0,
          borderTopWidth: 0,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => <LayoutDashboard size={size} color={color} />,
          tabBarShowLabel: false,
          tabBarActiveTintColor: colors.cyan,
          tabBarInactiveTintColor: colors.textPrimary,
        }}
      />
      <Tabs.Screen
        name="pay"
        options={{
          title: 'Pay',
          tabBarIcon: ({ size }) => (
            <MainGradientStyle>
              <View style={styles.iconBg}>
                <DollarSign size={size} color={colors.primaryLight} />
              </View>
            </MainGradientStyle>
          ),
          tabBarShowLabel: false,
          tabBarActiveTintColor: colors.primaryLight,
          tabBarInactiveTintColor: colors.textPrimary,
        }}
      />
      <Tabs.Screen
        name="menu"
        options={{
          title: 'Menu',
          tabBarIcon: ({ color, size }) => <UserRound size={size} color={color} />,
          tabBarShowLabel: false,
          tabBarActiveTintColor: colors.cyan,
          tabBarInactiveTintColor: colors.textPrimary,
        }}
      />
    </Tabs>
  );
}

export const styles = StyleSheet.create({
  iconBg: {
    height: 52,
    width: 52,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 100
  }
})
