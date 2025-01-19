import { createGastoSchema, GastoSchema } from '@/schemas/createGasto.schema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { FIREBASE_AUTH, FIREBASE_DB } from '@/firebaseConfig';
import { ref, push, set } from "firebase/database";
import { Alert } from 'react-native';
import { useRouter } from 'expo-router';

function useGastos() {
    const auth = FIREBASE_AUTH
    const database = FIREBASE_DB

    const router = useRouter()
    const [loading, setLoading] = useState<boolean>(false)

    const form = useForm<GastoSchema>({
        resolver: zodResolver(createGastoSchema),
        defaultValues: {
            title: '',
            amount: '',
            category: '',
            description: '',
            dueDate: new Date(),
            isPaid: false,
            recurring: undefined
        },
    });


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

    return {
        form,
        createGasto
    }
}

export { useGastos }