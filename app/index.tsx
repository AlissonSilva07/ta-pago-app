import { Dimensions, Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { colors } from '@/styles/colors'
import { CustomButton } from '@/components/button'
import { ThemedText } from '@/components/themedText'

const dimensions = Dimensions.get('screen')

export default function Welcome() {
  return (
    <SafeAreaView style={styles.container}>
      <Image source={require('@/assets/images/welcome-image.png')} style={styles.topImg} />
      <View style={styles.bottomView}>
        <Image source={require('@/assets/images/app-icon-reduced.png')} style={styles.iconImg} />
        <ThemedText type='title'>Reúna suas contas em um lugar só.</ThemedText>
        <ThemedText type='defaultSecondary'>Depois, é só compartilhar com a galera.</ThemedText>
        <View style={styles.buttonView}>
          <CustomButton title='Login' onPress={() => {}} variant='default' />
          <CustomButton title='Cadastro' onPress={() => {}} variant='secondary' />
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
  topImg: {
    height: '100%',
    maxHeight: 595,
    width: dimensions.width,
    resizeMode: 'contain'
  }
})