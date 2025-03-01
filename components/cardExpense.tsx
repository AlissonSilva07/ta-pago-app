import { colors } from "@/styles/colors"
import { MainShadowStyle } from "@/styles/mainShadow"
import { DollarSign } from "lucide-react-native"
import { View, TouchableOpacity, Text, StyleSheet } from "react-native"
import { ThemedText } from "./themedText"
import { RFValue } from "react-native-responsive-fontsize"
import { fonts } from "@/styles/fonts"
import dayjs from "dayjs"

interface CardExpenseProps {
    nome: string | null
    valor: number | null
    vencimento: Date | null
    status: "Pago" | "Não Pago"
    onPress?: () => void
}

export default function CardExpense({ nome, status, valor, vencimento, onPress }: CardExpenseProps) {
    return (
        <MainShadowStyle>
            <View style={styles.expenseItem}>
                <View style={styles.expenseItemIcon}>
                    <DollarSign color={colors.primary} />
                </View>
                <View style={styles.expenseInfo}>
                    <ThemedText type='small'>{nome ?? ''}</ThemedText>
                    <ThemedText type='titleMedium'>R$ {valor}</ThemedText>
                    <ThemedText type='smallSecondary'>Vencimento: {dayjs(vencimento).format('DD/MM/YYYY') ?? ''}</ThemedText>
                    <ThemedText type='small'>Status: <ThemedText children={status} type="small" style={{ color: status === 'Não Pago' ? colors.orange : colors.cyan }} /></ThemedText>
                </View>
                <TouchableOpacity onPress={onPress}>
                    <Text style={styles.expenseButton}>Abrir</Text>
                </TouchableOpacity>
            </View>
        </MainShadowStyle>
    )
}

const styles = StyleSheet.create({
    expenseItem: {
        width: '100%',
        flexDirection: 'row',
        gap: 16,
        alignItems: 'center'
    },
    expenseItemIcon: {
        width: RFValue(52),
        height: RFValue(52),
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.cyan,
        borderRadius: 16
    },
    expenseInfo: {
        flex: 1,
        flexDirection: 'column',
        gap: 6,
    },
    expenseButton: {
        fontSize: RFValue(16),
        fontFamily: fonts.semibold,
        lineHeight: 24,
        color: colors.accent
    }
})