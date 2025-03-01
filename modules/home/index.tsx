import { useFocusEffect, useRouter } from "expo-router";
import { useCallback, useState } from "react";
import { Alert } from "react-native";
import { Expense } from "../gastos/interfaces/expense.interface";
import { useGetGastosUnpaidSummary } from "./services/getGastosUnpaidSummary.service";

function useHome() {
    const router = useRouter()
    const [loading, setLoading] = useState<boolean>(false)
    const [expensesSummaryList, setExpensesSummaryList] = useState<Expense[]>([])
    const [isOpenConfirmModal, setIsOpenConfirmModal] = useState<boolean>(false)

    async function getGastosUnpaidSummary() {
        setLoading(true)
        try {
            const response = await useGetGastosUnpaidSummary.execute()
            setExpensesSummaryList(response)
            setLoading(false)            
        } catch (error) {
            setLoading(false)
            Alert.alert('Erro!', `Erro ao buscar registros: ${error}`)
        }
    }

    useFocusEffect(
        useCallback(() => {
            getGastosUnpaidSummary()
            return () => {
                setLoading(false);
            };
        }, [])
    );

    return {
        isOpenConfirmModal: {
            value: isOpenConfirmModal,
            set: setIsOpenConfirmModal
        },
        expensesSummaryList: {
            value: expensesSummaryList,
            set: setExpensesSummaryList
        },
        loading,
        getGastosUnpaidSummary
    }
}

export { useHome };

