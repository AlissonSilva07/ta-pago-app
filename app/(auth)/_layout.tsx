import { Tabs, useRouter } from 'expo-router';
import React from 'react';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { UserRound, DollarSign, LayoutDashboard, ChevronLeft } from 'lucide-react-native'
import { colors } from '@/styles/colors';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { MainGradientStyle } from '@/styles/mainGradient';
import { fonts } from '@/styles/fonts';

export default function TabLayout() {
  const router = useRouter()
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.primary,
          elevation: 0,
          shadowOpacity: 0,
          borderTopWidth: 0,
        }
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => <LayoutDashboard size={size} color={color} />,
          tabBarShowLabel: false,
          tabBarActiveTintColor: colors.cyan,
          tabBarInactiveTintColor: colors.textPrimary
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
          title: 'Perfil',
          tabBarIcon: ({ color, size }) => <UserRound size={size} color={color} />,
          tabBarShowLabel: false,
          tabBarActiveTintColor: colors.cyan,
          tabBarInactiveTintColor: colors.textPrimary,
          headerShown: true,
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontFamily: fonts.regular,
            color: colors.textPrimary
          },
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.navigate("/")} style={{ paddingLeft: 16 }}>
              <ChevronLeft size={24} color={colors.textPrimary} />
            </TouchableOpacity>
          ),
          headerShadowVisible: false
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
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
