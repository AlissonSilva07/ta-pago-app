import { Expense } from '@/modules/gastos/interfaces/expense.interface';
import { http } from '@/shared/api/config';
import { AxiosInstance } from 'axios';

class GetGastosUnpaidSummary {
	constructor(private readonly api: AxiosInstance) { }

	async execute(): Promise<Expense[]> {
		const result = await this.api.get<Expense[]>(
			'/analytics/unpaid-summary',
		);
		return result.data;
	}
}

const useGetGastosUnpaidSummary = new GetGastosUnpaidSummary(http);

export { GetGastosUnpaidSummary, useGetGastosUnpaidSummary };

