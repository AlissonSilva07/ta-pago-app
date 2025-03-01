import { colors } from '@/styles/colors';
import { fonts } from '@/styles/fonts';
import { Stack, useRouter } from 'expo-router';
import { ChevronLeft } from 'lucide-react-native';
import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

export default function PayLayout() {
    const router = useRouter()
    return (
        <Stack initialRouteName="index"
            screenOptions={{
                navigationBarColor: colors.primary,
            }}>
            <Stack.Screen name="index" options={{
                title: 'Gastos',
                headerTitleAlign: 'center',
                headerTitleStyle: {
                    fontFamily: fonts.regular,
                    color: colors.textPrimary
                },
                headerStyle: {
                    backgroundColor: colors.primary
                },
                headerLeft: () => (
                    <TouchableOpacity onPress={() => router.back()}>
                        <ChevronLeft size={24} color={colors.textPrimary} />
                    </TouchableOpacity>
                ),
                headerShadowVisible: false,
            }} />
            <Stack.Screen name="create" options={{
                title: 'Gastos',
                headerTitleAlign: 'center',
                headerTitleStyle: {
                    fontFamily: fonts.regular,
                    color: colors.textPrimary
                },
                headerStyle: {
                    backgroundColor: colors.primary
                },
                headerLeft: () => (
                    <TouchableOpacity onPress={() => router.back()}>
                        <ChevronLeft size={24} color={colors.textPrimary} />
                    </TouchableOpacity>
                ),
                headerShadowVisible: false,
            }} />
            <Stack.Screen name="[gasto]" options={{
                title: 'Detalhamento do Gasto',
                headerTitleAlign: 'center',
                headerTitleStyle: {
                    fontFamily: fonts.regular,
                    color: colors.textPrimary
                },
                headerStyle: {
                    backgroundColor: colors.primary
                },
                headerLeft: () => (
                    <TouchableOpacity onPress={() => router.back()}>
                        <ChevronLeft size={24} color={colors.textPrimary} />
                    </TouchableOpacity>
                ),
                headerShadowVisible: false,
            }} />
        </Stack>
    );
}
