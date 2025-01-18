import { SplashScreen, Stack, useRouter } from 'expo-router';
import { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { colors } from '@/styles/colors';
import { fonts } from '@/styles/fonts';
import {
  SpaceGrotesk_400Regular,
  SpaceGrotesk_500Medium,
  SpaceGrotesk_600SemiBold,
  useFonts
} from '@expo-google-fonts/space-grotesk';
import { StatusBar, TouchableOpacity } from 'react-native';

import { ChevronLeft } from 'lucide-react-native';
import { onAuthStateChanged } from 'firebase/auth';
import { FIREBASE_AUTH } from '@/firebaseConfig';
import { AuthContextProvider, useAuthContext } from '@/contexts/auth-context';
import { UserContextProvider, useUserContext } from '@/contexts/user-context';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const router = useRouter()
  const [loaded] = useFonts({
    SpaceGrotesk_400Regular,
    SpaceGrotesk_500Medium,
    SpaceGrotesk_600SemiBold
  })

  const { authState } = useAuthContext()

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync()
    }
  }, [loaded])

  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      if (user) {
        authState?.setValue({
          token: user.getIdToken.toString(),
          authenticated: true
        })
      }
    })
  }, [])

  if (!loaded) {
    return null
  }

  return (
    <SafeAreaProvider>
      <AuthContextProvider>
        <UserContextProvider>
          <Stack initialRouteName={
            authState?.value.token ? "(auth)/index" : "login"
          }
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
        </UserContextProvider>
      </AuthContextProvider>
    </SafeAreaProvider>
  );
}
