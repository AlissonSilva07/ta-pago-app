import { colors } from '@/styles/colors'
import React, { ReactNode } from 'react'
import { Pressable, StyleSheet, TouchableOpacity, View } from 'react-native'

interface CardAcessoRapidoProps {
    children: ReactNode,
    onPress?: () => void
}

export default function CardAcessoRapido({ children, onPress }: CardAcessoRapidoProps) {
  return (
    <Pressable style={styles.cardContainer} onPress={onPress}>
      {children}
    </Pressable>
  )
}

const styles = StyleSheet.create({
    cardContainer: {
        flex: 1,
        flexDirection: 'column',
        gap: 8,
        paddingVertical: 16,
        paddingHorizontal: 16,
        backgroundColor: colors.primaryLight,
        borderRadius: 16
    }
})