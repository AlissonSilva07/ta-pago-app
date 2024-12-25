import { SplashScreen, Stack, usePathname } from 'expo-router';
import { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import {
  SpaceGrotesk_400Regular,
  SpaceGrotesk_500Medium,
  SpaceGrotesk_600SemiBold,
  useFonts
} from '@expo-google-fonts/space-grotesk'
import { StatusBar } from 'react-native';
import { colors } from '@/styles/colors';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const pathName = usePathname()
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
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
      <StatusBar barStyle='light-content' />
    </SafeAreaProvider>
  );
}
