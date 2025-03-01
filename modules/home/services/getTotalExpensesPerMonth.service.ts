import { Expense } from '@/modules/gastos/interfaces/expense.interface';
import { http } from '@/shared/api/config';
import { AxiosInstance } from 'axios';
import { ExpenseMonth } from '../interfaces/expenseMonth.interface';

class GetTotalExpensesPerMonth {
	constructor(private readonly api: AxiosInstance) { }

	async execute(): Promise<ExpenseMonth[]> {
		const result = await this.api.get<ExpenseMonth[]>(
			'/analytics/total-expenses',
		);
		return result.data;
	}
}

const useGetTotalExpensesPerMonth = new GetTotalExpensesPerMonth(http);

export { GetTotalExpensesPerMonth, useGetTotalExpensesPerMonth };

