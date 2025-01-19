import { createGastoSchema, GastoSchema } from '@/schemas/createGasto.schema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';


function useGastos() {
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
        console.log('aqio');
        
        console.log(data);     
    }

    return {
        form,
        createGasto
    }
}

export { useGastos }