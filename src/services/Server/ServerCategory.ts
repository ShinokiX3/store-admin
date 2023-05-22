import { serverApi } from '@/api/serverApi';

const CATEGORIES = '/categories';

export const CategoryService = {
	async getAllCategories() {
		try {
			const { data } = await serverApi.get<any>(`${CATEGORIES}/all`);

			return data;
		} catch (error) {}
	},

	async createCategory(value: string) {
		try {
			const { data } = await serverApi.post<any>(`${CATEGORIES}/create`, {
				title: value,
			});

			return data;
		} catch (error) {}
	},

	async deleteCategory(id: string) {
		try {
			const { data } = await serverApi.delete<any>(`${CATEGORIES}/delete`, {
				data: { id: id },
			});

			return data;
		} catch (error) {}
	},
};
