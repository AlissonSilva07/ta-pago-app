import { Input } from "@/components/input"
import ModalLayout from "@/components/modal"
import { ThemedText } from "@/components/themedText"
import { categoryTypes } from "@/mocks/selectCategories"
import { colors } from "@/styles/colors"
import { ChevronsUpDown } from "lucide-react-native"
import { useState } from "react"
import { FlatList, Modal, Pressable, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import DateTimePicker from '@react-native-community/datetimepicker';
import dayjs from "dayjs"


export default function CreateScreen() {
    const [expenseName, setExpenseName] = useState<string>('')
    const [expenseAmount, setExpenseAmount] = useState<string>('')
    const [expenseCategory, setExpenseCategory] = useState<string>('')
    const [isOpenExpenseCategoryModal, setIsOpenExpenseCategoryModal] = useState<boolean>(false)
    const [expenseDescription, setExpenseDescription] = useState<string>('')
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
    const [modalDateVisible, setModalDateVisible] = useState(false);


    const onChangeEmail = (newExpenseName: string) => {
        setExpenseName(newExpenseName)
    }

    const onChangeAmount = (newExpenseAmount: string) => {
        setExpenseAmount(newExpenseAmount)
    }

    const handleOpenModalExpenseCategory = () => {
        setIsOpenExpenseCategoryModal(true)
    }

    const onChangeDescription = (newExpenseDescription: string) => {
        setExpenseDescription(newExpenseDescription)
    }

    const handleDateChange = (event: any, date?: Date) => {
        if (date) {
            setSelectedDate(date);
        }
        setModalDateVisible(false);
    };

    const handleOpenModalExpenseDate = () => {
        setModalDateVisible(true)
    }

    return (
        <SafeAreaView style={styles.container}>
            <ThemedText type='titleSmall'>Novo Gasto</ThemedText>
            <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollArea}>
                <View style={styles.inputField}>
                    <ThemedText type="default">Nome:</ThemedText>
                    <Input placeholder='Nome do gasto' value={expenseName} onChangeText={onChangeEmail} />
                </View>
                <View style={styles.inputField}>
                    <ThemedText type="default">Valor:</ThemedText>
                    <Input placeholder='Valor do gasto' inputMode="decimal" keyboardType="decimal-pad" value={expenseAmount} onChangeText={onChangeAmount} />
                </View>
                <View style={styles.inputField}>
                    <ThemedText type="default">Categoria:</ThemedText>
                    <Pressable style={styles.selectArea} onPress={handleOpenModalExpenseCategory}>
                        <Input placeholder='Selecione uma categoria' editable={false} value={expenseCategory} onChangeText={onChangeEmail} />
                        <ChevronsUpDown color={colors.textSecondary} style={styles.selectIcon} />
                    </Pressable>
                </View>
                <View style={styles.inputField}>
                    <ThemedText type="default">Descrição:</ThemedText>
                    <Input placeholder='Descrição' value={expenseDescription} multiline={true} numberOfLines={3} onChangeText={onChangeDescription} />
                </View>
                <View style={styles.inputField}>
                    <ThemedText type="default">Data de Vencimento:</ThemedText>
                    <Pressable style={styles.selectArea} onPress={handleOpenModalExpenseDate}>
                        <Input placeholder='Selecione uma data' editable={false} value={dayjs(selectedDate).format('DD/MM/YYYY') ?? 'Selecionar um data'} onChangeText={onChangeEmail} />
                        <ChevronsUpDown color={colors.textSecondary} style={styles.selectIcon} />
                    </Pressable>
                </View>
            </ScrollView>
            <ModalLayout
                title="Categoria"
                isVisible={isOpenExpenseCategoryModal}
                onClose={() => setIsOpenExpenseCategoryModal(false)}
            >
                <View style={styles.modalBody}>
                    <ThemedText>Selecione uma categoria:</ThemedText>
                    <FlatList
                        numColumns={2}
                        showsVerticalScrollIndicator={false}
                        data={categoryTypes}
                        renderItem={(item) => (
                            <TouchableOpacity onPress={() => setExpenseCategory(item.item.title)} style={styles.pressableCategory}>
                                <ThemedText>{item.item.title}</ThemedText>
                            </TouchableOpacity>
                        )}
                        keyExtractor={item => item.key.toString()}
                        contentContainerStyle={styles.flatlistExpenseCategory}
                    />
                </View>
            </ModalLayout>
        </SafeAreaView >
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
    scroll: {
        flex: 1,
        width: '100%'
    },
    scrollArea: {
        flexDirection: 'column',
        gap: 16,
        alignItems: 'center',
    },
    inputField: {
        width: '100%',
        flexDirection: 'column',
        gap: 8,
    },
    selectArea: {
        width: '100%',
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: "space-between"
    },
    selectIcon: {
        position: "absolute",
        right: 16
    },
    modalBody: {
        width: '100%',
        flexDirection: 'column',
        gap: 16
    },
    flatlistExpenseCategory: {
        width: '100%',
        gap: 16
    },
    pressableCategory: {
        padding: 16,
        backgroundColor: colors.primaryLight,
        borderRadius: 16,
        marginRight: 16
    }
})