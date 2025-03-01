export interface Expense {
    id: string
    title: string
    amount: string | null
    category: string | null
    dueDate: Date
    isPaid: boolean | null
    description: string | null
}