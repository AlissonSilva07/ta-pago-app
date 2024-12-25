import { SplashScreen, Stack, usePathname, useRouter } from 'expo-router';
import { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import {
  SpaceGrotesk_400Regular,
  SpaceGrotesk_500Medium,
  SpaceGrotesk_600SemiBold,
  useFonts
} from '@expo-google-fonts/space-grotesk'
import { StatusBar, TouchableOpacity } from 'react-native';
import { colors } from '@/styles/colors';
import { fonts } from '@/styles/fonts';

import { Image, View } from 'react-native';
import { ChevronLeft } from 'lucide-react-native';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const router = useRouter()
  const [loaded] = useFonts({
    SpaceGrotesk_400Regular,
    SpaceGrotesk_500Medium,
    SpaceGrotesk_600SemiBold
  })

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync()
    }
  }, [loaded])

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
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
      <StatusBar barStyle='light-content' />
    </SafeAreaProvider>
  );
}
