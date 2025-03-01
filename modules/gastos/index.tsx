import { zodResolver } from '@hookform/resolvers/zod';
import { useFocusEffect, useRouter } from 'expo-router';
import debounce from 'lodash.debounce';
import { useCallback, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Alert } from 'react-native';
import { Expense } from './interfaces/expense.interface';
import { GetGastosInputDto } from './interfaces/getGasto.interface';
import { createGastoSchema, GastoSchema } from './schemas/createGasto.schema';
import { useGetGastoById } from './services/getGastoById.service';
import { useGetGastos } from './services/getGastos.service';
import { usePostGastos } from './services/postGastos.service';

function useGastos() {
    const [loading, setLoading] = useState<boolean>(false)
    const [refreshing, setRefreshing] = useState<boolean>(false);
    const [expenses, setExpenses] = useState<Expense[]>([])
    const [expenseById, setExpenseById] = useState<Expense>({} as Expense)
    const [selectedChip, setSelectedChip] = useState<number>(0);
    const [query, setQuery] = useState<string>('')

    const [isOpenConfirmModal, setIsOpenConfirmModal] = useState<boolean>(false)


    const form = useForm<GastoSchema>({
        resolver: zodResolver(createGastoSchema),
        defaultValues: {
            title: '',
            amount: '',
            category: '',
            description: '',
            isPaid: false
        },
    });

    const [filterParams, setFilterParams] = useState<GetGastosInputDto>({
        page: 1,
        size: 10,
        search: undefined,
        sortBy: undefined,
        sortOrder: undefined
    });

    async function getGastos(filter: GetGastosInputDto) {
        setLoading(true)
        try {
            const response = await useGetGastos.execute(filter)
            setExpenses(response.expenses)
            setLoading(false)
        } catch (error) {
            setLoading(false)
            Alert.alert('Erro!', `Erro ao buscar registros: ${error}`)
        }
    }

    async function getGastoById(idGasto: string) {
        setLoading(true)
        try {
            const response = await useGetGastoById.execute(idGasto)
            setExpenseById(response)
            setLoading(false)
        } catch (error) {
            setLoading(false)
            Alert.alert('Erro!', `Erro ao buscar registros: ${error}`)
        }
    }

    async function createGasto(data: GastoSchema) {
        setLoading(true)

        try {
            await usePostGastos.execute({
                amount: Number(data.amount),
                category: data.category,
                description: data.description!,
                dueDate: data.dueDate,
                isPaid: false,
                title: data.title
            })
            setLoading(false)
            setIsOpenConfirmModal(true)
        } catch (error) {
            setLoading(false)
            Alert.alert('Erro!', `Erro ao registrar gasto: ${error}`)
        }
    }

    const getGastoByName = useMemo(
        () =>
            debounce(async (name: string) => {
                if (!name || query.length === 0) {
                    setExpenses(expenses);
                    return;
                }
                setLoading(true);
                try {

                } catch (error) {
                    Alert.alert('Erro!', `Erro ao buscar registros: ${error}`);
                } finally {
                    setLoading(false);
                }
            }, 2000),
        [expenses, query]
    );


    const onRefresh = async () => {
        setRefreshing(true);
        try {
            setFilterParams({
                page: 1,
                size: 10,
                search: undefined,
                sortBy: undefined,
                sortOrder: undefined
            })
            await getGastos({
                page: 1,
                size: 10,
                search: undefined,
                sortBy: undefined,
                sortOrder: undefined
            });
        } catch (err) {
            console.error('Error during refresh:', err);
        } finally {
            setRefreshing(false);
        }
    };

    useFocusEffect(
        useCallback(() => {
            setFilterParams({
                ...filterParams,
                sortBy:
                    selectedChip === 1 ? 'dueDate' :
                        selectedChip === 2 ? 'dueDate' :
                            selectedChip === 3 ? 'title' :
                                selectedChip === 4 ? 'title' :
                                    undefined,
                sortOrder:
                    selectedChip === 1 ? 'asc' :
                        selectedChip === 2 ? 'desc' :
                            selectedChip === 3 ? 'asc' :
                                selectedChip === 4 ? 'desc' :
                                    undefined,
            })
            getGastos({
                ...filterParams,
                sortBy:
                    selectedChip === 1 ? 'dueDate' :
                        selectedChip === 2 ? 'dueDate' :
                            selectedChip === 3 ? 'title' :
                                selectedChip === 4 ? 'title' :
                                    undefined,
                sortOrder:
                    selectedChip === 1 ? 'asc' :
                        selectedChip === 2 ? 'desc' :
                            selectedChip === 3 ? 'asc' :
                                selectedChip === 4 ? 'desc' :
                                    undefined,
            });
            return () => {
                setLoading(false);
            };
        }, [selectedChip])
    );

    return {
        expenseById: {
            value: expenseById,
            set: setExpenseById
        },
        expenses: {
            value: expenses,
            set: setExpenses
        },
        filterParams: {
            value: filterParams,
            set: setFilterParams
        },
        query: {
            value: query,
            set: setQuery
        },
        selectedChip: {
            value: selectedChip,
            set: setSelectedChip
        },
        isOpenConfirmModal: {
            value: isOpenConfirmModal,
            set: setIsOpenConfirmModal
        },
        refreshing,
        loading,
        form,
        createGasto,
        getGastos,
        getGastoById,
        onRefresh,
        getGastoByName,
    }
}

export { useGastos };

