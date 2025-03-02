import { useFocusEffect, useRouter } from "expo-router";
import { useCallback, useState } from "react";
import { Alert } from "react-native";
import { Expense } from "../gastos/interfaces/expense.interface";
import { useGetGastosUnpaidSummary } from "./services/getGastosUnpaidSummary.service";
import { useGetTotalExpensesPerMonth } from "./services/getTotalExpensesPerMonth.service";
import { ExpenseMonth } from "./interfaces/expenseMonth.interface";
import { useGetExpensesProgress } from "./services/getExpensesProgress.service";
import { ExpenseProgress } from "./interfaces/expenseProgress.interface";

function useHome() {
    const [loading, setLoading] = useState<boolean>(false)
    const [expensesSummaryList, setExpensesSummaryList] = useState<Expense[]>([])
    const [expensesPerMonthList, setExpensesPerMonthList] = useState<ExpenseMonth[]>([])
    const [expensesProgress, setExpensesProgress] = useState<ExpenseProgress>({} as ExpenseProgress)
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

    async function getTotalExpensesPerMonth() {
        setLoading(true)
        try {
            const response = await useGetTotalExpensesPerMonth.execute()            
            setExpensesPerMonthList(response)
            setLoading(false)            
        } catch (error) {
            setLoading(false)
            Alert.alert('Erro!', `Erro ao buscar registros: ${error}`)
        }
    }

    async function getExpensesProgress() {
        setLoading(true)
        try {
            const response = await useGetExpensesProgress.execute()            
            setExpensesProgress(response)
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

    useFocusEffect(
        useCallback(() => {
            getTotalExpensesPerMonth()
            return () => {
                setLoading(false);
            };
        }, [])
    );

    useFocusEffect(
        useCallback(() => {
            getExpensesProgress()
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
        expensesPerMonthList: {
            value: expensesPerMonthList,
            set: setExpensesPerMonthList
        },
        expensesProgress: {
            value: expensesProgress,
            set: setExpensesProgress
        },
        loading
    }
}

export { useHome };

