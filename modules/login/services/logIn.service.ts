import { AxiosInstance } from 'axios';
import {
	LoginInputInterface,
	LoginOutpuInterface,
} from '../interfaces/logIn.interface';
import { baseURL } from '@/shared/api/path';
import { http } from '@/shared/api/config';
class LoginService {
	constructor(private readonly api: AxiosInstance) { }

	async execute(data: LoginInputInterface): Promise<LoginOutpuInterface> {
		const result = await this.api.post<LoginOutpuInterface>(
			baseURL + '/login', data
		);

		return result.data;
	}
}

const useLoginService = new LoginService(http);

export { LoginService, useLoginService };