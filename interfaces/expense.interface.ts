export interface Expense {
    id: string | number
    title: string | null
    amount: string | null
    category: string | null
    dueDate: Date | null
    isPaid: boolean | null
    recurring: {
        type: string | null
        nextDueDate: Date | null
    }
    description: string | null
}