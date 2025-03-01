import { Expense } from "./expense.interface";

interface GetGastosInputDto {
    page: number;
    size: number;
    search?: string;
    sortBy?: "title" | "dueDate";
    sortOrder?: "asc" | "desc";
}

interface GetGastosOutputDto {
    expenses: Expense[];
	totalExpenses: number;
	currentPage: number;
	totalPages: number;
}

export { GetGastosInputDto, GetGastosOutputDto }