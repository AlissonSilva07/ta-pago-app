import { zodResolver } from '@hookform/resolvers/zod';
import { useFocusEffect, useRouter } from 'expo-router';
import debounce from 'lodash.debounce';
import { useCallback, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Alert } from 'react-native';
import { Expense } from './interfaces/expense.interface';
import { createGastoSchema, GastoSchema } from './schemas/createGasto.schema';
import { useGetGastos } from './services/getGastos.service';
import { GetGastosInputDto } from './interfaces/getGasto.interface';

function useGastos() {
    const router = useRouter()
    const [loading, setLoading] = useState<boolean>(false)
    const [refreshing, setRefreshing] = useState<boolean>(false);
    const [expenses, setExpenses] = useState<Expense[]>([])
    const [selectedChip, setSelectedChip] = useState<number>(0);
    const [query, setQuery] = useState<string>('')

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
        } catch (error) {
            setLoading(false)
            Alert.alert('Erro!', `Erro ao buscar registros: ${error}`)
        }
    }

    async function createGasto(data: GastoSchema) {
        setLoading(true)

        try {


            Alert.alert('Sucesso!', 'Gasto registrado com sucesso.', [
                {
                    text: 'Ok',
                    onPress: () => router.navigate('/(auth)/pay')
                }
            ])
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
            await getGastos(filterParams);
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
        refreshing,
        loading,
        form,
        createGasto,
        getGastos,
        onRefresh,
        getGastoByName,
    }
}

export { useGastos };
