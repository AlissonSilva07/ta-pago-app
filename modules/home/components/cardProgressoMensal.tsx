import { ThemedText } from "@/components/themedText"
import { MainShadowStyle } from "@/styles/mainShadow"
import dayjs from "dayjs"
import isSameOrAfter from "dayjs/plugin/isSameOrAfter"
import isSameOrBefore from "dayjs/plugin/isSameOrBefore"
import { StyleSheet, View } from "react-native"
import { ExpenseMonth } from "../interfaces/expenseMonth.interface"
import { RFValue } from "react-native-responsive-fontsize"
import { colors } from "@/styles/colors"
import { Component, Goal } from "lucide-react-native"
import { MainGradientStyle } from "@/styles/mainGradient"
import { ExpenseProgress } from "../interfaces/expenseProgress.interface"

dayjs.extend(isSameOrBefore)
dayjs.extend(isSameOrAfter)
dayjs.locale("pt-br")

interface CardProgressoMensalProps {
    data: ExpenseProgress
}

function CardProgressoMensal({ data }: CardProgressoMensalProps) {
    if (!data) return null

    const progressPercentage = (current: number, total: number): number => {
        if (total === 0) return 0;
        return ((current / total) * 100);
    }

    return (
        <MainShadowStyle>
            <ThemedText type='titleSmallMedium'>Progresso Mensal</ThemedText>
            <View style={styles.smallCardGasto}>
                <MainGradientStyle radius={16}>
                    <View style={styles.expenseItemIcon}>
                        <Goal color={colors.primary} />
                    </View>
                </MainGradientStyle>
                <View style={styles.smallCardGastoMiddle}>
                    <ThemedText type='default'>{data.current}/{data.total} contas pagas</ThemedText>
                    <View style={styles.bottom}>
                        <View style={styles.progressBarGroup}>
                            <View style={styles.progressBarBg}></View>
                            <View style={[styles.progressBarHandle, { width: `${progressPercentage(data.current, data.total)}%` }]}></View>
                        </View>
                        <ThemedText type="smallSecondary">{progressPercentage(data.current, data.total)}%</ThemedText>
                    </View>
                </View>
            </View>
        </MainShadowStyle>
    )
}

const styles = StyleSheet.create({
    expenseItemIcon: {
        width: RFValue(40),
        height: RFValue(40),
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    smallCardGasto: {
        width: '100%',
        flexDirection: 'row',
        gap: 16,
        paddingTop: 16
    },
    smallCardGastoMiddle: {
        flex: 1,
        flexDirection: 'column',
        gap: 6,
    },
    bottom: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16
    },
    progressBarGroup: {
        flex: 1,
        position: 'relative',
        flexDirection: 'row',
        alignItems: 'center'
    },
    progressBarBg: {
        height: 8,
        width: '100%',
        position: 'absolute',
        left: 0,
        backgroundColor: colors.textSecondary,
        borderRadius: 16
    },
    progressBarHandle: {
        height: 8,
        position: 'absolute',
        left: 0,
        backgroundColor: colors.cyan,
        borderRadius: 16
    },
})

export { CardProgressoMensal }

