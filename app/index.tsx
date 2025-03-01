import { Dimensions, Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { colors } from '@/styles/colors'
import { CustomButton } from '@/components/button'
import { ThemedText } from '@/components/themedText'
import { useRouter } from 'expo-router'
import { validateToken } from '@/shared/hooks/validateToken'
import { useUserContext } from '@/shared/contexts/user-context'

const dimensions = Dimensions.get('screen')

export default function Welcome() {
  const router = useRouter()
  const { getUserState } = useUserContext()

  useEffect(() => {
    const check = async () => {
      const isLoggedIn = await validateToken();
      if (isLoggedIn) {
        getUserState()
        router.navigate('/(auth)');
      }
    };

    check();
  }, []);
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topImgView}>
        <Image source={require('@/assets/images/happy-young-asian-lady-chatting-by-phone-looking-copyspace.jpg')} style={styles.topImg} />
      </View>
      <View style={styles.bottomView}>
        <Image source={require('@/assets/images/app-icon-reduced.png')} style={styles.iconImg} />
        <ThemedText type='title'>Reúna suas contas em um lugar só.</ThemedText>
        <ThemedText type='defaultSecondary'>Depois, é só ficar de boa.</ThemedText>
        <View style={styles.buttonView}>
          <CustomButton title='Login' onPress={() => router.navigate('/login')} variant='default' />
          <CustomButton title='Cadastro' onPress={() => router.navigate('/cadastro')} variant='secondary' />
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: colors.primary
  },
  bottomView: {
    width: '100%',
    maxHeight: 280,
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 16,
    paddingVertical: 16,
    paddingHorizontal: 16
  },
  iconImg: {
    width: 135,
    height: 27,
    resizeMode: 'contain',
  },
  buttonView: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  topImgView: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    paddingTop: 16
  },
  topImg: {
    height: '100%',
    width: dimensions.width - 32,
    resizeMode: 'cover',
    borderRadius: 16
  }
})