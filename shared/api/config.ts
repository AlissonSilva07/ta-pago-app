import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { baseURL } from './path';

function HttpClientBuilder() {
	const client = axios.create({ baseURL });

	client.interceptors.request.use((config) => {
		const token = SecureStore.getItem('userToken');

		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
			config.headers['Content-Type'] = 'application/json';
		}

		return config;
	});

	return client;
}

const http = HttpClientBuilder();

export { http };
