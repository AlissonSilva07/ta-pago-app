import { CustomButton } from "@/components/button";
import { ThemedText } from "@/components/themedText";
import { useGastos } from "@/modules/gastos";
import { colors } from "@/styles/colors";
import dayjs from "dayjs";
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'
import { useLocalSearchParams } from "expo-router";
import { DollarSign } from "lucide-react-native";
import { useEffect } from "react";
import { ActivityIndicator, SafeAreaView, StyleSheet, View } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
dayjs.extend(utc);
dayjs.extend(timezone);

export default function GastoScreen() {
    const { gasto } = useLocalSearchParams();
    const { expenseById, getGastoById, loading } = useGastos()

    useEffect(() => {
        getGastoById(gasto.toString())
    }, [])

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.topArea}>
                <View style={styles.titleArea}>
                    <View style={styles.expenseItemIcon}>
                        <DollarSign color={colors.primary} size={32} />
                    </View>
                    <View style={styles.verticalSpacerSmall}>
                        <ThemedText type='smallSecondary'>#{expenseById.value.category ?? 'Categoria'}</ThemedText>
                        <ThemedText type='titleSmall'>{expenseById.value.title ?? 'Item'}</ThemedText>
                    </View>
                </View>
                <View style={styles.detailBox}>
                    <ThemedText type='smallSecondary'>Valor</ThemedText>
                    <ThemedText type='titleSmall'>R$ {expenseById.value.amount ?? 'Valor'}</ThemedText>
                </View>
                <View style={styles.detailBox}>
                    <ThemedText type='smallSecondary'>Vencimento</ThemedText>
                    <ThemedText type='titleSmall'>{dayjs.utc(expenseById.value.dueDate).format('DD/MM/YYYY') ?? 'Vencimento'}</ThemedText>
                </View>
                <View style={styles.detailBox}>
                    <ThemedText type='smallSecondary'>Status</ThemedText>
                    <ThemedText type='titleSmall' style={{ color: expenseById.value.isPaid === false ? colors.orange : colors.cyan }}>{expenseById.value.isPaid === true ? "Pago" : "Não Pago"}</ThemedText>
                </View>
            </View>

            <View style={styles.buttonArea}>
                <CustomButton
                    title='Tá Pago!'
                    onPress={() => { }}
                    variant={loading || expenseById.value.isPaid ? 'disabled' : 'default'}
                    disabled={loading || expenseById.value.isPaid ? true : false}
                    icon={loading ? <ActivityIndicator size="small" color={colors.textPrimary} /> : null}
                />
                <CustomButton
                    title='Excluir Gasto'
                    onPress={() => {}}
                    variant={loading ? 'disabled' : 'destructive'}
                    disabled={loading}
                    icon={loading ? <ActivityIndicator size="small" color={colors.textPrimary} /> : null}
                />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: colors.primary,
        padding: 16
    },
    title: {
        textAlign: 'center'
    },
    titleArea: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16
    },
    topArea: {
        width: '100%',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 16
    },
    expenseItemIcon: {
        width: RFValue(64),
        height: RFValue(64),
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.cyan,
        borderRadius: 16
    },
    verticalSpacerSmall: {
        flexDirection: 'column',
        gap: 6
    },
    detailBox: {
        width: '100%',
        flexDirection: 'column',
        gap: 16,
        padding: 16,
        backgroundColor: colors.primaryLight,
        borderRadius: 16
    },
    buttonArea: {
        flex: 1,
        width: '100%',
        flexDirection: 'column',
        gap: 16,
        alignItems: 'flex-start',
        justifyContent: 'flex-end'
    }
})

