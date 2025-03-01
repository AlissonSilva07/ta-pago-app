import CardExpense from '@/components/cardExpense';
import ChipComponent from '@/components/chip';
import { ThemedText } from '@/components/themedText';
import { chipTypes } from '@/mocks/chipTypes';
import { useGastos } from '@/modules/gastos';
import { colors } from '@/styles/colors';
import { fonts } from '@/styles/fonts';
import { useRouter } from 'expo-router';
import { Plus, Search } from 'lucide-react-native';
import { useRef, useState } from 'react';
import { ActivityIndicator, FlatList, RefreshControl, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function PayScreen() {
    const router = useRouter()
    const [isFocused, setIsFocused] = useState<boolean>(false);
    const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

    const { refreshing, expenses, onRefresh, selectedChip, query, filterParams, getGastos, loading, hasMoreToLoad, handleLoadMore } = useGastos()

    const handleChangeQuery = (text: string) => {
        query.set(text);
        if (debounceTimeout.current) {
            clearTimeout(debounceTimeout.current);
        }

        debounceTimeout.current = setTimeout(() => {
            filterParams.set({
                ...filterParams.value,
                search: text
            })
            getGastos({
                ...filterParams.value,
                search: text
            })
        }, 750);
    };

    const handleChipPress = (chipKey: number) => {
        if (chipKey === selectedChip.value) {
            return;
        }
        selectedChip.set(chipKey);
    };


    const renderFooter = () => {
        if (hasMoreToLoad && !loading) {
            return <ActivityIndicator color={colors.accent} size={'small'} />
        }
        return null
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.titleArea}>
                <ThemedText type='titleSmall' style={styles.title}>Histórico de gastos</ThemedText>
                <TouchableOpacity style={styles.btnTop} onPress={() => router.navigate('/(auth)/pay/create')}>
                    <Plus color={colors.primary} size={20} />
                </TouchableOpacity>
            </View>
            <View style={styles.filterArea}>
                <View style={[styles.inputContainer, isFocused && styles.inputContainerFocused]}>
                    <Search color={colors.textPrimary} />
                    <TextInput
                        onChangeText={handleChangeQuery}
                        value={query.value}
                        placeholder={'Pesquisar por Gasto'}
                        placeholderTextColor={colors.textSecondary}
                        cursorColor={colors.cyan}
                        style={styles.input}
                        multiline={false}
                        numberOfLines={1}
                    />
                </View>
                <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={chipTypes}
                    renderItem={(item) => <ChipComponent title={item.item.title} checked={item.item.key === selectedChip.value} onPress={() => handleChipPress(item.item.key)} />}
                    keyExtractor={item => item.key.toString()}
                    contentContainerStyle={styles.flatlistChips}
                />
            </View>
            <FlatList
                data={loading ? [] : expenses.value}
                renderItem={(item) => (
                    <CardExpense
                        nome={item.item.title}
                        status={item.item.isPaid ? 'Pago' : 'Não Pago'}
                        valor={Number(item.item.amount)}
                        vencimento={item.item.dueDate}
                        onPress={() => router.navigate({
                            pathname: '/(auth)/pay/[gasto]',
                            params: {
                                gasto: item.item.id
                            }
                        })}
                    />
                )}
                showsVerticalScrollIndicator={false}
                keyExtractor={item => item.id.toString()}
                style={styles.content}
                contentContainerStyle={styles.flatlistExpenses}
                ListEmptyComponent={() => (
                    <View style={styles.emptyList}>
                        {query.value.length > 0 ? (
                            <ThemedText type='smallSecondary'>{`Nenhum gasto encontrado com "${query.value}".`}</ThemedText>
                        ) : (
                            <ThemedText type='smallSecondary'>Nenhum gasto encontrado.</ThemedText>
                        )}
                    </View>
                )}
                ListFooterComponent={renderFooter}
                scrollEnabled={true}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
                scrollEventThrottle={50}
                onEndReachedThreshold={0.5}
                onEndReached={() => hasMoreToLoad && handleLoadMore()}
            />
        </SafeAreaView>
    );
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
        paddingBottom: 16
    },
    title: {
        textAlign: 'center'
    },
    titleArea: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    btnTop: {
        padding: 8,
        borderRadius: 100,
        alignItems: 'center',
        backgroundColor: colors.accent
    },
    inputContainer: {
        width: '100%',
        flexDirection: 'row',
        gap: 16,
        alignItems: 'center',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: colors.evenLighterGray,
        backgroundColor: colors.bgGrayAlfa,
        borderStyle: 'solid',
        paddingVertical: 8,
        paddingHorizontal: 16,
        fontFamily: fonts.regular,
        fontSize: RFValue(16),
        color: colors.textPrimary,
        overflow: 'hidden'
    },
    inputContainerFocused: {
        borderColor: colors.accent,
    },
    input: {
        flex: 1,
        fontFamily: fonts.regular,
        fontSize: RFValue(16),
        color: colors.textPrimary,
    },
    filterArea: {
        width: '100%',
        flexDirection: 'column',
        gap: 16,
    },
    flatlistChips: {
        flexDirection: 'row',
        gap: 8,
        alignItems: 'center'
    },
    content: {
        flex: 1,
        width: '100%',
        flexDirection: 'column',
    },
    flatlistExpenses: {
        width: '100%',
        flexDirection: 'column',
        gap: 16,
    },
    emptyList: {
        flex: 1,
        width: '100%',
        flexDirection: 'column',
        gap: 16,
        padding: 16,
        alignItems: 'center',
        justifyContent: 'center'
    },
    footerList: {
        width: '100%',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 8
    }
});
