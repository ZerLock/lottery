import axios from 'axios';

export interface ServerReturn {
	statusCode: string;
	message: string;
	data: any;
}

const api = axios.create({
	baseURL: process.env.SERVER_URL ?? 'http://localhost:8080',
});

export default api;
