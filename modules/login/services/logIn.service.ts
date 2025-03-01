import { http } from '@/shared/api/config';
import { AxiosInstance } from 'axios';
import {
	LoginInputInterface,
	LoginOutpuInterface,
} from '../interfaces/logIn.interface';
class LoginService {
	constructor(private readonly api: AxiosInstance) { }

	async execute(data: LoginInputInterface): Promise<LoginOutpuInterface> {
		const result = await this.api.post<LoginOutpuInterface>(
			'/login', data
		);

		return result.data;
	}
}

const useLoginService = new LoginService(http);

export { LoginService, useLoginService };
