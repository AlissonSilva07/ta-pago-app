import { ThemedText } from "@/components/themedText"
import { Expense } from "@/modules/gastos/interfaces/expense.interface"
import { colors } from "@/styles/colors"
import { MainShadowStyle } from "@/styles/mainShadow"
import { ChevronDown, ChevronUp, DollarSign } from "lucide-react-native"
import { View, StyleSheet, FlatList, Text, TouchableOpacity, ImageBackground } from "react-native"
import { RFValue } from "react-native-responsive-fontsize"
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import "dayjs/locale/pt-br";
dayjs.locale("pt-br");

interface CardTotalGastosProps {
    data: Expense
}

function CardTotalGastos({ data }: CardTotalGastosProps) {
    if (!data) return

    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <ImageBackground source={require('@/assets/ads/ad.png')} resizeMode="cover"
                    style={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                    }} />
                <View style={styles.spacerVertical}>
                    <ThemedText type="titleMediumDark">R$ {data.amount}</ThemedText>
                    <ThemedText type="smallSecondaryDark">Total de gastos em Fevereiro</ThemedText>
                </View>
            </View>
            <View style={styles.selector}>
                <MainShadowStyle>
                    <View style={{
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: 16
                    }}>
                        <TouchableOpacity>
                            <ChevronUp color={colors.textPrimary} />
                        </TouchableOpacity>
                        <ThemedText type='titleSmallMedium'>{dayjs.utc(data.dueDate).format('MMM')}</ThemedText>
                        <TouchableOpacity>
                            <ChevronDown color={colors.textPrimary} />
                        </TouchableOpacity>
                    </View>
                </MainShadowStyle>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16
    },
    card: {
        position: 'relative',
        flex: 1,
        flexGrow: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        borderRadius: 16,
        overflow: 'hidden',
    },
    selector: {
    },
    spacerVertical: {
        paddingHorizontal: 16,
        paddingVertical: 38,
        gap: 6
    }
})

export { CardTotalGastos }