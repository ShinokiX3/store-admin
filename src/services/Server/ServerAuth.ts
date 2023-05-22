import { serverApi } from '@/api/serverApi';
import axios from 'axios';

const AUTH = '/auth';

interface ILogin {
	email: string;
	password: string;
}

export interface IRegister {
	email: string;
	password: string;
	name: string;
	joindate: Date;
	phone: string;
}

export const AuthService = {
	async login({ email, password }: ILogin) {
		try {
			const { data } = await serverApi.post<any>(`${AUTH}/admin-login`, {
				email: email,
				password: password,
			});

			return data;
		} catch (error) {}
	},

	async register({ name, joindate, password, phone, email }: IRegister) {
		try {
			const { data } = await serverApi.post<any>(`${AUTH}/register`, {
				name: name,
				joindate: joindate,
				password: password,
				phone: phone,
				email: email,
			});

			return data;
		} catch (error) {}
	},

	async check(token?: string) {
		try {
			const { data } = await axios.post(
				`http://localhost:3000${AUTH}/check`,
				{},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);

			console.log({ data });

			return data;
		} catch (error) {}
	},
};
