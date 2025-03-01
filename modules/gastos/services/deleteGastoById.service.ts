import { http } from '@/shared/api/config';
import { AxiosInstance } from 'axios';
import { Expense } from '../interfaces/expense.interface';

class DeleteGastoById {
	constructor(private readonly api: AxiosInstance) { }

	async execute(id: string): Promise<Expense> {
		const result = await this.api.delete<Expense>(
			`/expenses/${id}`
		);
		return result.data;
	}
}

const useDeleteGastoById = new DeleteGastoById(http);

export { DeleteGastoById, useDeleteGastoById };
