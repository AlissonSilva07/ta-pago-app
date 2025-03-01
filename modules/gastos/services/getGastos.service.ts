import { http } from '@/shared/api/config';
import { AxiosInstance } from 'axios';
import { GetGastosInputDto, GetGastosOutputDto } from '../interfaces/getGasto.interface';

class GetGastos {
	constructor(private readonly api: AxiosInstance) { }

	async execute(params: GetGastosInputDto): Promise<GetGastosOutputDto> {
		const result = await this.api.get<GetGastosOutputDto>(
			'/expenses',
			{
				params
			}
		);
		return result.data;
	}
}

const useGetGastos = new GetGastos(http);

export { GetGastos, useGetGastos };
