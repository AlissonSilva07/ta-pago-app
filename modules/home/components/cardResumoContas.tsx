import { ThemedText } from "@/components/themedText"
import { Expense } from "@/modules/gastos/interfaces/expense.interface"
import { colors } from "@/styles/colors"
import { MainShadowStyle } from "@/styles/mainShadow"
import { DollarSign } from "lucide-react-native"
import { View, StyleSheet, FlatList, Text, TouchableOpacity } from "react-native"
import { RFValue } from "react-native-responsive-fontsize"
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import "dayjs/locale/pt-br";
dayjs.locale("pt-br");

interface CardResumoContasProps {
    data: Expense[]
}

function CardResumoContas({ data }: CardResumoContasProps) {
    if (!data) return

    return (
        <MainShadowStyle>
            <ThemedText type='titleSmallMedium'>Contas não pagas</ThemedText>
            <FlatList
                data={data}
                renderItem={({ item }) => (
                    <View style={styles.smallCardGasto}>
                        <View style={styles.expenseItemIcon}>
                            <DollarSign color={colors.primary} />
                        </View>
                        <View style={styles.smallCardGastoMiddle}>
                            <ThemedText type='default'>{item.title ?? 'Título'}</ThemedText>
                            <View style={styles.horizontalGap}>
                                <ThemedText type='smallSecondary'>{dayjs.utc(item.dueDate).format('DD [de] MMM')} -</ThemedText>
                                <ThemedText type='smallSecondary'>{item.isPaid === true ? "Pago" : "Não Pago"}</ThemedText>
                            </View>
                        </View>
                        <ThemedText type='smallSecondary'>R$ {item.amount ?? 'Valor'}</ThemedText>
                    </View>
                )}
                keyExtractor={({ id }) => id.toString()}
                contentContainerStyle={styles.flatlistContent}
            />
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
        backgroundColor: colors.cyan,
        borderRadius: 16
    },
    smallCardGasto: {
        width: '100%',
        flexDirection: 'row',
        gap: 16,
    },
    smallCardGastoMiddle: {
        flex: 1,
        flexDirection: 'column',
        gap: 6,
    },
    flatlistContent: {
        paddingTop: 16,
        gap: 16
    },
    horizontalGap: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6
    }
})

export { CardResumoContas }