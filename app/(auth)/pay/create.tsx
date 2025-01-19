import { ThemedText } from "@/components/themedText"
import { colors } from "@/styles/colors"
import { View, StyleSheet } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

export default function CreateScreen() {
    return (
        <SafeAreaView style={styles.container}>
            <ThemedText type='titleSmall'>Novo Gasto</ThemedText>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        flexDirection: 'column',
        gap: 16,
        alignItems: 'center',
        backgroundColor: colors.primary,
        paddingHorizontal: 16,
        paddingVertical: 16
    },
})