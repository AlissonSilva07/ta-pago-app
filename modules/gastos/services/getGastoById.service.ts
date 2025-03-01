import { http } from '@/shared/api/config';
import { AxiosInstance } from 'axios';
import { Expense } from '../interfaces/expense.interface';

class GetGastoById {
	constructor(private readonly api: AxiosInstance) { }

	async execute(id: string): Promise<Expense> {
		const result = await this.api.get<Expense>(
			`/expenses/${id}`
		);
		return result.data;
	}
}

const useGetGastoById = new GetGastoById(http);

export { GetGastoById, useGetGastoById };
