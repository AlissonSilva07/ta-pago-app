import { SplashScreen, Stack, usePathname, useRouter, useSegments } from 'expo-router';
import { useEffect, useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import {
  SpaceGrotesk_400Regular,
  SpaceGrotesk_500Medium,
  SpaceGrotesk_600SemiBold,
  useFonts
} from '@expo-google-fonts/space-grotesk'
import { ActivityIndicator, StatusBar, TouchableOpacity } from 'react-native';
import { colors } from '@/styles/colors';
import { fonts } from '@/styles/fonts';

import { Image, View } from 'react-native';
import { ChevronLeft } from 'lucide-react-native';
import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import auth from "@react-native-firebase/auth"

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceGrotesk_400Regular,
    SpaceGrotesk_500Medium,
    SpaceGrotesk_600SemiBold
  })

  const [initializing, setInitializing] = useState<boolean>(true)
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null)
  const router = useRouter()
  const segments = useSegments()

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync()
    }
  }, [loaded])

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged)
    return subscriber
  }, [])

  const onAuthStateChanged = (user: FirebaseAuthTypes.User | null) => {
    setUser(user)
    if (initializing) setInitializing(false)
  }

  useEffect(() => {
    if (initializing) return

    const inAuthGroup = segments[0] === '(auth)'

    if (user && !inAuthGroup) {
      router.replace('/(auth)')
    } else if (!user && inAuthGroup) {
      router.replace('/')
    }
  }, [initializing, user])

  if (!loaded) {
    return null
  }

  return (
    <SafeAreaProvider>
      <Stack initialRouteName='index'
        screenOptions={{
          navigationBarColor: colors.primary,
        }}>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="login" options={{
          title: 'Login',
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
          headerShadowVisible: false
        }} />
        <Stack.Screen name="cadastro" options={{
          title: 'Cadastro',
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
          headerShadowVisible: false
        }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      </Stack>
      <StatusBar barStyle='light-content' />
    </SafeAreaProvider>
  );
}
