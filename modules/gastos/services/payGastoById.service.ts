import { http } from '@/shared/api/config';
import { AxiosInstance } from 'axios';
import { Expense } from '../interfaces/expense.interface';

class PayGastoById {
	constructor(private readonly api: AxiosInstance) { }

	async execute(id: string): Promise<void> {
		const result = await this.api.patch<void>(
			`/expenses/${id}/pay`
		);
		return result.data;
	}
}

const usePayGastoById = new PayGastoById(http);

export { PayGastoById, usePayGastoById };
