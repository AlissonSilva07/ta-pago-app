import { Input } from "@/components/input"
import ModalLayout from "@/components/modal"
import { ThemedText } from "@/components/themedText"
import { categoryTypes } from "@/mocks/selectCategories"
import { colors } from "@/styles/colors"
import { ChevronsUpDown } from "lucide-react-native"
import { useState } from "react"
import { FlatList, Keyboard, Modal, Pressable, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import dayjs from "dayjs"
import RNDateTimePicker from "@react-native-community/datetimepicker"
import { CustomButton } from "@/components/button"
import { useGastos } from "@/hooks/useGastos"
import { Controller } from "react-hook-form"
import Checkbox from 'expo-checkbox';


export default function CreateScreen() {
    const { form, createGasto } = useGastos()

    const [expenseCategory, setExpenseCategory] = useState<string>('')
    const [isOpenExpenseCategoryModal, setIsOpenExpenseCategoryModal] = useState<boolean>(false)
    const [checkedRecurrency, setCheckedRecurrency] = useState<boolean>(false)
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    const [modalDateVisible, setModalDateVisible] = useState(false);


    const handleExpenseCategory = (title: string) => {
        setExpenseCategory(title)
        form.setValue("category", title)
    }

    const handleOpenModalExpenseCategory = () => {
        Keyboard.dismiss()
        setIsOpenExpenseCategoryModal(true)
    }

    const handleDateChange = (event: any, date?: Date) => {
        if (date) {
            setSelectedDate(date);
            form.setValue("dueDate", date)
        }
        setModalDateVisible(false);
    };

    const handleOpenModalExpenseDate = () => {
        Keyboard.dismiss()
        setModalDateVisible(true)
    }

    const handleCheckRecurrency = () => {
        const newCheckedState = !checkedRecurrency;
        setCheckedRecurrency(newCheckedState);

        if (newCheckedState) {
            form.setValue("recurring.type", "monthly");
            form.setValue("recurring.nextDueDate", dayjs(selectedDate).add(1, 'month').toDate());
        } else {
            form.setValue("recurring", undefined);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <ThemedText type='titleSmall'>Novo Gasto</ThemedText>
            <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollArea}>
                <View style={styles.inputArea}>
                    <View style={styles.inputField}>
                        <View style={styles.inputFieldTop}>
                            <ThemedText type="smallMedium">Nome:</ThemedText>
                            <ThemedText type="smallSecondary">{form.formState.errors.title?.message!}</ThemedText>
                        </View>
                        <Controller
                            name="title"
                            control={form.control}
                            render={({ field: { value, onChange } }) => (
                                <Input placeholder='Nome do gasto' value={value} onChangeText={onChange} />
                            )}
                        />
                    </View>
                    <View style={styles.inputField}>
                        <View style={styles.inputFieldTop}>
                            <ThemedText type="smallMedium">Valor:</ThemedText>
                            <ThemedText type="smallSecondary">{form.formState.errors.amount?.message!}</ThemedText>
                        </View>
                        <Controller
                            name="amount"
                            control={form.control}
                            render={({ field: { value, onChange } }) => (
                                <Input placeholder='Valor do gasto' inputMode="numeric" keyboardType="decimal-pad" value={value} onChangeText={onChange} />
                            )}
                        />
                    </View>
                    <View style={styles.inputField}>
                        <View style={styles.inputFieldTop}>
                            <ThemedText type="smallMedium">Categoria:</ThemedText>
                            <ThemedText type="smallSecondary">{form.formState.errors.category?.message!}</ThemedText>
                        </View>
                        <Pressable style={styles.selectArea} onPress={handleOpenModalExpenseCategory}>
                            <Input placeholder='Selecione uma categoria' editable={false} value={expenseCategory} onChangeText={() => { }} />
                            <ChevronsUpDown color={colors.textSecondary} style={styles.selectIcon} />
                        </Pressable>
                    </View>
                    <View style={styles.inputField}>
                        <View style={styles.inputFieldTop}>
                            <ThemedText type="smallMedium">Descrição:</ThemedText>
                            <ThemedText type="smallSecondary">{form.formState.errors.description?.message!}</ThemedText>
                        </View>
                        <Controller
                            name="description"
                            control={form.control}
                            render={({ field: { value, onChange } }) => (
                                <Input placeholder='Descrição' value={value} multiline={true} numberOfLines={3} onChangeText={onChange} />
                            )}
                        />
                    </View>
                    <View style={styles.inputField}>
                        <View style={styles.inputFieldTop}>
                            <ThemedText type="smallMedium">Data de Vencimento:</ThemedText>
                            <ThemedText type="smallSecondary">{form.formState.errors.dueDate?.message!}</ThemedText>
                        </View>
                        <Pressable style={styles.selectArea} onPress={handleOpenModalExpenseDate}>
                            <Input placeholder='Selecione uma data' editable={false} value={dayjs(selectedDate).format('DD/MM/YYYY') ?? 'Selecionar um data'} onChangeText={() => { }} />
                            <ChevronsUpDown color={colors.textSecondary} style={styles.selectIcon} />
                        </Pressable>
                    </View>
                    <View style={styles.inputFieldRecurrency}>
                        <Checkbox
                            value={checkedRecurrency}
                            onValueChange={handleCheckRecurrency}
                            color={checkedRecurrency ? colors.orange : undefined}
                        />
                        <ThemedText type="default">Data recorrente?</ThemedText>
                    </View>
                </View>
                <View style={styles.buttonArea}>
                    <CustomButton
                        title='Registrar'
                        onPress={form.handleSubmit(createGasto)}
                        variant={'default'}
                        disabled={false}
                    />
                    <CustomButton
                        title='Limpar'
                        onPress={() => { }}
                        variant={'secondary'}
                        disabled={false}
                    />
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
                            <TouchableOpacity onPress={() => handleExpenseCategory(item.item.title)} style={styles.pressableCategory}>
                                <ThemedText>{item.item.title}</ThemedText>
                            </TouchableOpacity>
                        )}
                        keyExtractor={item => item.key.toString()}
                        contentContainerStyle={styles.flatlistExpenseCategory}
                    />
                </View>
            </ModalLayout>
            <Modal
                transparent={true}
                visible={modalDateVisible}
                onRequestClose={() => setModalDateVisible(false)}
            >
                <RNDateTimePicker
                    display="default"
                    onChange={handleDateChange}
                    value={selectedDate}
                    minimumDate={new Date()}
                    locale="pt-BR"
                    is24Hour={true}
                    positiveButton={{ label: 'Definir', textColor: colors.primary }}
                    negativeButton={{ label: 'Cancelar', textColor: colors.primary }}
                />
            </Modal>
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
        flex: 1,
        flexDirection: 'column',
        gap: 16,
        alignItems: 'center',
    },
    inputField: {
        width: '100%',
        flexDirection: 'column',
        gap: 8,
    },
    inputFieldTop: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
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
    },
    buttonArea: {
        flex: 1,
        width: '100%',
        flexDirection: 'column',
        gap: 16,
        alignItems: 'flex-start',
        justifyContent: "flex-end"
    },
    inputArea: {
        width: '100%',
        flexDirection: 'column',
        gap: 16,
        alignItems: 'flex-start',
    },
    inputFieldRecurrency: {
        width: '100%',
        flexDirection: 'row',
        gap: 16,
        alignItems: "center"
    }
})