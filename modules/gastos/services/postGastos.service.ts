import { http } from '@/shared/api/config';
import { AxiosInstance } from 'axios';
import { PostGastosInputDto } from '../interfaces/postGastos.interface';

class PostGastos {
	constructor(private readonly api: AxiosInstance) { }

	async execute(data: PostGastosInputDto): Promise<void> {
		const result = await this.api.post<void>(
			'/expenses', data
		);
		return result.data;
	}
}

const usePostGastos = new PostGastos(http);

export { PostGastos, usePostGastos };
