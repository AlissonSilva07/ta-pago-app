import { createGastoSchema, GastoSchema } from '@/schemas/createGasto.schema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback, useMemo, useState } from 'react';
import { FIREBASE_AUTH, FIREBASE_DB } from '@/firebaseConfig';
import { ref, push, set, get } from "firebase/database";
import { Alert } from 'react-native';
import { useFocusEffect, useRouter } from 'expo-router';
import { Expense } from '@/interfaces/expense.interface';
import debounce from 'lodash.debounce';

function useGastos() {
    const auth = FIREBASE_AUTH
    const database = FIREBASE_DB

    const router = useRouter()
    const [loading, setLoading] = useState<boolean>(false)
    const [refreshing, setRefreshing] = useState<boolean>(false);
    const [expenses, setExpenses] = useState<Expense[]>([])
    const [filteredExpenses, setFilteredExpenses] = useState<Expense[]>([]);

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

    async function getGastos() {
        setLoading(true)
        try {
            const user = auth.currentUser;

            const expensesRef = ref(database, `users/${user?.uid}/expenses`);

            const snapshot = await get(expensesRef);
            if (snapshot.exists()) {
                const data = snapshot.val();

                const expensesWithIds = Object.keys(data).map((key) => ({
                    id: key,
                    ...data[key],
                }));

                setExpenses(expensesWithIds)
                setFilteredExpenses(expensesWithIds)
            }
        } catch (error) {
            setLoading(false)
            Alert.alert('Erro!', `Erro ao buscar registros: ${error}`)
        }
    }


    async function createGasto(data: GastoSchema) {
        setLoading(true)

        try {
            const user = auth.currentUser;

            const expenseRef = ref(database, `users/${user?.uid}/expenses`);
            const newExpenseRef = push(expenseRef);

            await set(newExpenseRef, data);

            setLoading(false)

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
                if (!name) {
                    setFilteredExpenses(expenses);
                    return;
                }

                setLoading(true);
                try {
                    const user = auth.currentUser;
                    const expensesRef = ref(database, `users/${user?.uid}/expenses`);

                    const snapshot = await get(expensesRef);
                    if (snapshot.exists()) {
                        const data = snapshot.val();

                        const filtered = Object.keys(data)
                            .map((key) => ({
                                id: key,
                                ...data[key],
                            }))
                            .filter((expense) =>
                                expense.title.toLowerCase().includes(name.toLowerCase())
                            );

                        setFilteredExpenses(filtered);
                    }
                } catch (error) {
                    Alert.alert('Erro!', `Erro ao buscar registros: ${error}`);
                } finally {
                    setLoading(false);
                }
            }, 2000),
        [expenses]
    );


    const onRefresh = async () => {
        setRefreshing(true);
        try {
            await getGastos();
        } catch (err) {
            console.error('Error during refresh:', err);
        } finally {
            setRefreshing(false);
        }
    };

    useFocusEffect(
        useCallback(() => {
            getGastos();
            return () => {
                setLoading(false);
            };
        }, [])
    );

    return {
        expenses,
        filteredExpenses,
        refreshing,
        loading,
        form,
        createGasto,
        getGastos,
        onRefresh,
        getGastoByName
    }
}

export { useGastos }