import { http } from '@/shared/api/config';
import { AxiosInstance } from 'axios';
import { GetUserOutputDto } from '../interfaces/user.interface';

class GetUserData {
	constructor(private readonly api: AxiosInstance) { }

	async execute(): Promise<GetUserOutputDto> {
		const result = await this.api.get<GetUserOutputDto>(
			'/user',
		);
		return result.data;
	}
}

const useGetUserData = new GetUserData(http);

export { GetUserData, useGetUserData };