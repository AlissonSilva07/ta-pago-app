import { ThemedText } from "@/components/themedText"
import { ExpenseMonth } from "../interfaces/expenseMonth.interface"
import { colors } from "@/styles/colors"
import { MainShadowStyle } from "@/styles/mainShadow"
import { ChevronDown, ChevronUp } from "lucide-react-native"
import { View, StyleSheet, TouchableOpacity, ImageBackground } from "react-native"
import dayjs from "dayjs"
import { useEffect, useState } from "react"
import isSameOrBefore from "dayjs/plugin/isSameOrBefore"
import isSameOrAfter from "dayjs/plugin/isSameOrAfter"

dayjs.extend(isSameOrBefore)
dayjs.extend(isSameOrAfter)
dayjs.locale("pt-br")

interface CardTotalGastosProps {
    data: ExpenseMonth[]
}

function CardTotalGastos({ data }: CardTotalGastosProps) {
    if (!data || data.length === 0) return null

    const [currentMonth, setCurrentMonth] = useState(dayjs())

    useEffect(() => {
        setCurrentMonth(dayjs(data[data.length - 1].month.toString(), "YYYY-MM"))
    }, [data])  

    const minMonth = dayjs(Math.min(...data.map(d => dayjs(d.month.toString(), "YYYY-MM").valueOf())))
    const maxMonth = dayjs(Math.max(...data.map(d => dayjs(d.month.toString(), "YYYY-MM").valueOf())))

    const increaseMonth = () => {
        const nextMonth = currentMonth.add(1, "month")
        if (nextMonth.isAfter(maxMonth)) return
        setCurrentMonth(nextMonth)
    }

    const decreaseMonth = () => {
        const prevMonth = currentMonth.subtract(1, "month")
        if (prevMonth.isBefore(minMonth)) return
        setCurrentMonth(prevMonth)
    }

    const currentAmount = data.find(d => d.month.toString() === currentMonth.format("YYYY-MM"))

    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <ImageBackground
                    source={require("@/assets/ads/ad.png")}
                    resizeMode="cover"
                    style={styles.imageBackground}
                />
                <View style={styles.spacerVertical}>
                    <ThemedText type="displayDark">
                        R$ {currentAmount?.total ?? "0,00"}
                    </ThemedText>
                    <ThemedText type="smallSecondaryDark">
                        Total de gastos em {currentMonth.format("MMMM")}
                    </ThemedText>
                </View>
            </View>
            <View style={styles.selector}>
                <MainShadowStyle>
                    <View style={styles.selectorContent}>
                        <TouchableOpacity onPress={decreaseMonth} disabled={currentMonth.isSame(minMonth, "month")}>
                            <ChevronUp color={currentMonth.isSame(minMonth, "month") ? colors.textSecondary : colors.textPrimary} />
                        </TouchableOpacity>
                        <ThemedText type="titleSmallMedium">
                            {currentMonth.format("MMM")}
                        </ThemedText>
                        <TouchableOpacity onPress={increaseMonth} disabled={currentMonth.isSame(maxMonth, "month")}>
                            <ChevronDown color={currentMonth.isSame(maxMonth, "month") ? colors.textSecondary : colors.textPrimary} />
                        </TouchableOpacity>
                    </View>
                </MainShadowStyle>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        gap: 16
    },
    card: {
        position: "relative",
        flex: 1,
        flexGrow: 1,
        flexDirection: "column",
        justifyContent: "center",
        borderRadius: 16,
        overflow: "hidden"
    },
    imageBackground: {
        position: "absolute",
        width: "100%",
        height: "100%"
    },
    selector: {
        width: '20%'
    },
    selectorContent: {
        flexDirection: "column",
        alignItems: "center",
        gap: 16
    },
    spacerVertical: {
        paddingHorizontal: 16,
        paddingVertical: 38,
        gap: 6
    }
})

export { CardTotalGastos }
