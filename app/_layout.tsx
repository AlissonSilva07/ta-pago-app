import { SplashScreen, Stack, useRouter } from 'expo-router';
import { useContext, useEffect } from 'react';
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

import { AuthContext, AuthProvider } from '@/contexts/auth-context';
import { UserContextProvider } from '@/contexts/user-context';
import { ChevronLeft } from 'lucide-react-native';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const router = useRouter()
  const { user } = useContext(AuthContext);
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
      <AuthProvider>
        <UserContextProvider>
          <Stack initialRouteName={
            user ? "(auth)/index" : "login"
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
                <TouchableOpacity onPress={() => router.navigate("/")}>
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
                <TouchableOpacity onPress={() => router.navigate("/")}>
                  <ChevronLeft size={24} color={colors.textPrimary} />
                </TouchableOpacity>
              ),
              headerShadowVisible: false
            }} />
            <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          </Stack>
          <StatusBar barStyle='light-content' />
        </UserContextProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
}
