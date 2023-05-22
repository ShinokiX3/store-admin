import { serverApi } from '@/api/serverApi';
import { IProductData } from '@/components/screen/products/ProductForm';

const PRODUCT = '/products';

export interface IProduct {
	email: string;
	password: string;
	name: string;
	joindate: Date;
	phone: string;
}

export const ProductService = {
	async getAllProducts() {
		try {
			const { data } = await serverApi.get<any>(`${PRODUCT}/all`);

			return data;
		} catch (error) {}
	},

	async getProductById({ id }: { id: string }) {
		try {
			const { data } = await serverApi.post<any>(`${PRODUCT}/id`, {
				id,
			});

			return data;
		} catch (error) {}
	},

	async getProductsByCategory({ id }: { id: string }) {
		try {
			const { data } = await serverApi.post<any>(`${PRODUCT}/category`, {
				id: id,
			});

			return data;
		} catch (error) {}
	},

	async createProduct(productData: IProductData, picture: any) {
		try {
			const formData = new FormData();

			formData.append('title', productData.title);
			formData.append('code', productData.code);
			formData.append('brand', productData.brand);
			formData.append('category', productData.category);
			formData.append('capacity', productData.capacity);
			formData.append('cost', String(productData.cost));
			formData.append('description', productData.description);
			formData.append('discount', String(productData.discount));
			formData.append('manufacturer', productData.manufacturer);
			formData.append('inStockQuantity', String(productData.inStockQuantity));
			formData.append('kind', productData.kind);
			formData.append('packing', productData.packing);
			formData.append('strength', productData.strength);
			formData.append('picture', picture.originFileObj);

			const { data } = await serverApi.post<any>(`${PRODUCT}/create`, formData);

			return data;
		} catch (error) {}
	},

	async deleteProduct(id: string) {
		try {
			const { data } = await serverApi.delete<any>(`${PRODUCT}/delete`, {
				data: { id: id },
			});

			return data;
		} catch (error) {}
	},

	// Brands

	async getAllBrands() {
		try {
			const { data } = await serverApi.get<any>(`${PRODUCT}/brand/all`);

			return data;
		} catch (error) {}
	},

	async createBrand(value: string) {
		try {
			const { data } = await serverApi.post<any>(`${PRODUCT}/brand/create`, {
				value: value,
			});

			return data;
		} catch (error) {}
	},

	async deleteBrand(id: string) {
		try {
			const { data } = await serverApi.delete<any>(`${PRODUCT}/brand/delete`, {
				data: { id: id },
			});

			return data;
		} catch (error) {}
	},

	// Kinds

	async getAllKinds() {
		try {
			const { data } = await serverApi.get<any>(`${PRODUCT}/kind/all`);

			return data;
		} catch (error) {}
	},

	async createKind(value: string) {
		try {
			const { data } = await serverApi.post<any>(`${PRODUCT}/kind/create`, {
				value: value,
			});

			return data;
		} catch (error) {}
	},

	async deleteKind(id: string) {
		try {
			const { data } = await serverApi.delete<any>(`${PRODUCT}/kind/delete`, {
				data: { id: id },
			});

			return data;
		} catch (error) {}
	},

	// Manufacturers

	async getAllManufacturers() {
		try {
			const { data } = await serverApi.get<any>(`${PRODUCT}/manufacturer/all`);

			return data;
		} catch (error) {}
	},

	async createManufacturer(value: string) {
		try {
			const { data } = await serverApi.post<any>(
				`${PRODUCT}/manufacturer/create`,
				{
					value: value,
				}
			);

			return data;
		} catch (error) {}
	},

	async deleteManufacturer(id: string) {
		try {
			const { data } = await serverApi.delete<any>(
				`${PRODUCT}/manufacturer/delete`,
				{
					data: { id: id },
				}
			);

			return data;
		} catch (error) {}
	},

	// Packings

	async getAllPackings() {
		try {
			const { data } = await serverApi.get<any>(`${PRODUCT}/packing/all`);

			return data;
		} catch (error) {}
	},

	async createPacking(value: string) {
		try {
			const { data } = await serverApi.post<any>(`${PRODUCT}/packing/create`, {
				value: value,
			});

			return data;
		} catch (error) {}
	},

	async deletePacking(id: string) {
		try {
			const { data } = await serverApi.delete<any>(
				`${PRODUCT}/packing/delete`,
				{
					data: { id: id },
				}
			);

			return data;
		} catch (error) {}
	},

	// Strengths

	async getAllStrengths() {
		try {
			const { data } = await serverApi.get<any>(`${PRODUCT}/strength/all`);

			return data;
		} catch (error) {}
	},

	async createStrength(value: string) {
		try {
			const { data } = await serverApi.post<any>(`${PRODUCT}/strength/create`, {
				value: value,
			});

			return data;
		} catch (error) {}
	},

	async deleteStrength(id: string) {
		try {
			const { data } = await serverApi.delete<any>(
				`${PRODUCT}/strength/delete`,
				{
					data: { id: id },
				}
			);

			return data;
		} catch (error) {}
	},

	// Capacities

	async getAllCapacities() {
		try {
			const { data } = await serverApi.get<any>(`${PRODUCT}/capacity/all`);

			return data;
		} catch (error) {}
	},

	async createCapacity(value: string) {
		try {
			const { data } = await serverApi.post<any>(`${PRODUCT}/capacity/create`, {
				value: value,
			});

			return data;
		} catch (error) {}
	},

	async deleteCapacity(id: string) {
		try {
			const { data } = await serverApi.delete<any>(
				`${PRODUCT}/capacity/delete`,
				{
					data: { id: id },
				}
			);

			return data;
		} catch (error) {}
	},

	// All attributes

	async getAllAttributes() {
		try {
			const { data } = await serverApi.get<any>(`${PRODUCT}/attributes/all`);

			return data;
		} catch (error) {}
	},
};
