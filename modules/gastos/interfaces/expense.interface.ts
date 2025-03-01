export interface Expense {
    id: string
    title: string
    amount: string
    category: string
    dueDate: Date
    isPaid: boolean
    description: string | null
}