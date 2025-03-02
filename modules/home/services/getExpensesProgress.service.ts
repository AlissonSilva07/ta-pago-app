import { Expense } from '@/modules/gastos/interfaces/expense.interface';
import { http } from '@/shared/api/config';
import { AxiosInstance } from 'axios';
import { ExpenseMonth } from '../interfaces/expenseMonth.interface';
import { ExpenseProgress } from '../interfaces/expenseProgress.interface';

class GetExpensesProgress {
	constructor(private readonly api: AxiosInstance) { }

	async execute(): Promise<ExpenseProgress> {
		const result = await this.api.get<ExpenseProgress>(
			'/analytics/expense-progress',
		);
		return result.data;
	}
}

const useGetExpensesProgress = new GetExpensesProgress(http);

export { GetExpensesProgress, useGetExpensesProgress };

