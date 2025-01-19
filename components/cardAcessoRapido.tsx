import { colors } from '@/styles/colors'
import { ArrowUpRight } from 'lucide-react-native'
import React, { ReactNode } from 'react'
import { Pressable, StyleSheet, TouchableOpacity, View } from 'react-native'

interface CardAcessoRapidoProps {
    children: ReactNode,
    onPress?: () => void
}

export default function CardAcessoRapido({ children, onPress }: CardAcessoRapidoProps) {
  return (
    <Pressable style={styles.cardContainer} onPress={onPress}>
      <View style={styles.upIcon}>
        <ArrowUpRight size={16} color={colors.accent} />
      </View>
      {children}
    </Pressable>
  )
}

const styles = StyleSheet.create({
    cardContainer: {
        position: 'relative',
        flex: 1,
        flexDirection: 'column',
        gap: 8,
        paddingVertical: 16,
        paddingHorizontal: 16,
        backgroundColor: colors.accent,
        borderRadius: 16
    },
    upIcon: {
      position: 'absolute',
      top: 8,
      right: 8,
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 4,
      backgroundColor: colors.primary,
      borderRadius: 100
    }
})