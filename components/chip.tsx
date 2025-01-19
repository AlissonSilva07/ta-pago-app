import { View, StyleSheet, Text, TouchableOpacity } from "react-native"
import { colors } from "@/styles/colors"
import { RFValue } from "react-native-responsive-fontsize"
import { fonts } from "@/styles/fonts"
import { useState } from "react"

interface ChipComponentProps {
    title: string
    checked: boolean
    onPress?: () => void
}

export default function ChipComponent({ title, checked, onPress }: ChipComponentProps) {
    return (
        <TouchableOpacity style={checked === true ? styles.chipChecked : styles.chipUnchecked} onPress={onPress}>
            <Text style={checked === true ? styles.textStyleChecked : styles.textStyleUnchecked}>{title}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    chipChecked: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 8,
        paddingVertical: 4,
        backgroundColor: colors.cyan,
        borderRadius: 4,
    },
    chipUnchecked: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 8,
        paddingVertical: 4,
        backgroundColor: colors.primaryLight,
        borderRadius: 4,
        color: colors.primary
    },
    textStyleChecked: {
        lineHeight: 18,
        fontSize: RFValue(12),
        fontFamily: fonts.semibold,
        color: colors.primary
    },
    textStyleUnchecked: {
        lineHeight: 18,
        fontSize: RFValue(12),
        fontFamily: fonts.semibold,
        color: colors.textSecondary
    }
})