import { CategoryService } from '@/services/Server/ServerCategory';
import { ProductService } from '@/services/Server/ServerProduct';
import { ICategory } from '@/types/categories.interface';
import { IAttribute } from '@/types/product.interface';
import { PlusOutlined } from '@ant-design/icons';
import {
	Button,
	Cascader,
	Checkbox,
	DatePicker,
	Form,
	Input,
	InputNumber,
	Radio,
	Select,
	Switch,
	TreeSelect,
	Upload,
} from 'antd';
import { RcFile, UploadFile, UploadProps } from 'antd/es/upload';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const { RangePicker } = DatePicker;
const { TextArea } = Input;

const normFile = (e: any) => {
	if (Array.isArray(e)) {
		return e;
	}
	return e?.fileList;
};

const SelectBlock = styled.div`
	display: flex;
	width: 100%;

	.ant-form-item {
		width: 100%;
	}

	.ant-form-item-control {
		max-width: 80%;
	}
`;

const SelectBlockGrid = styled.div`
	display: grid;
	grid-template-columns: 0.465fr 0.2fr 0.2fr;
	width: 100%;
	align-items: center;

	.ant-form-item {
		width: 100%;
	}

	.ant-form-item-control {
		max-width: 80%;
	}
`;

interface IPackingForm {
	createOne: Function;
}

interface IAttribtesResponse {
	brand: IAttribute[];
	kind: IAttribute[];
	strengths: IAttribute[];
	packing: IAttribute[];
	manufacturer: IAttribute[];
	capacities: IAttribute[];
}

export interface IProductData {
	title: string;
	code: string;
	isNew: boolean;
	description: string;
	inStockQuantity: number;
	cost: number;
	discount: number;
	category: string;
	brand: string;
	kind: string;
	strength: string;
	packing: string;
	manufacturer: string;
	capacity: string;
}

const ProductForm: React.FC<IPackingForm> = ({ createOne }) => {
	const [categories, setCategories] = useState<ICategory[] | []>([]);
	const [attributes, setAttributes] = useState<IAttribtesResponse | {}>({});

	const [productData, setProductData] = useState<IProductData>({
		title: '',
		code: '',
		description: '',
		isNew: false,
		inStockQuantity: 0,
		cost: 0,
		discount: 0,
		category: '',
		brand: '',
		kind: '',
		strength: '',
		packing: '',
		manufacturer: '',
		capacity: '',
	});

	const [fileList, setFileList] = useState<UploadFile[]>([]);

	const getBase64 = (file: RcFile): Promise<string> =>
		new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = () => resolve(reader.result as string);
			reader.onerror = (error) => reject(error);
		});

	const handleChange: UploadProps['onChange'] = (info) => {
		let newFileList = [...info.fileList];
		newFileList = newFileList.slice(-1);
		newFileList = newFileList.map((file) => {
			if (file.response) {
				file.url = file.response.url;
			}
			return file;
		});

		setFileList(newFileList);
	};

	useEffect(() => {
		(async () => {
			const categories = await CategoryService.getAllCategories();
			const attributes = await ProductService.getAllAttributes();

			if (categories.length > 0) {
				setCategories(categories);
			}

			if (attributes) {
				setAttributes(attributes);
			}
		})();
	}, []);

	const props = {
		action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
		onChange: handleChange,
		multiple: true,
	};

	const handleCreate = async () => {
		const response = await ProductService.createProduct(
			productData,
			fileList[0]
		);
		if (response) {
			createOne();
		}
	};

	return (
		<Form
			labelCol={{ span: 4 }}
			wrapperCol={{ span: 14 }}
			layout="vertical"
			style={{ width: '100%' }}
		>
			<SelectBlock>
				<Form.Item label="Назва">
					<Input
						value={productData.title}
						onChange={(e) =>
							setProductData({ ...productData, ...{ title: e.target.value } })
						}
					/>
				</Form.Item>
				<Form.Item label="Категорія">
					<Select
						onChange={(value: string) =>
							setProductData({ ...productData, ...{ category: value } })
						}
					>
						{categories.map((category) => (
							<Select.Option key={category._id} value={category._id}>
								{category.title}
							</Select.Option>
						))}
					</Select>
				</Form.Item>
				<Form.Item label="Товар новий" valuePropName="checked">
					<Switch
						onChange={(checked) =>
							setProductData({ ...productData, ...{ isNew: checked } })
						}
					/>
				</Form.Item>
			</SelectBlock>
			<SelectBlockGrid>
				<Form.Item label="Опис товару">
					<TextArea
						rows={4}
						onChange={(e) =>
							setProductData({
								...productData,
								...{ description: e.target.value },
							})
						}
					/>
				</Form.Item>
				<Form.Item label="В наявності">
					<InputNumber
						min={0}
						onChange={(value) =>
							setProductData({ ...productData, ...{ inStockQuantity: value } })
						}
					/>
				</Form.Item>
				<Form.Item
					label="Фото"
					valuePropName="fileList"
					getValueFromEvent={normFile}
				>
					<Upload listType="picture-card" {...props} fileList={fileList}>
						<div>
							<PlusOutlined />
							<div style={{ marginTop: 8 }}>Фото</div>
						</div>
					</Upload>
				</Form.Item>
			</SelectBlockGrid>
			<SelectBlock>
				<Form.Item label="Код">
					<Input
						onChange={(e) =>
							setProductData({ ...productData, ...{ code: e.target.value } })
						}
					/>
				</Form.Item>
				<Form.Item label="Ціна">
					<Input
						onChange={(e) =>
							setProductData({
								...productData,
								...{ cost: Number(e.target.value) },
							})
						}
					/>
				</Form.Item>
				<Form.Item label="Знижка">
					<Input
						onChange={(e) =>
							setProductData({
								...productData,
								...{ discount: Number(e.target.value) },
							})
						}
					/>
				</Form.Item>
			</SelectBlock>
			<SelectBlock>
				<Form.Item label="Бренд">
					<Select
						onChange={(value: string) =>
							setProductData({ ...productData, ...{ brand: value } })
						}
					>
						{attributes?.brand?.map((attribute: IAttribute) => (
							<Select.Option key={attribute._id} value={attribute._id}>
								{attribute.value}
							</Select.Option>
						))}
					</Select>
				</Form.Item>
				<Form.Item label="Вид">
					<Select
						onChange={(value: string) =>
							setProductData({ ...productData, ...{ kind: value } })
						}
					>
						{attributes?.kind?.map((attribute: IAttribute) => (
							<Select.Option key={attribute._id} value={attribute._id}>
								{attribute.value}
							</Select.Option>
						))}
					</Select>
				</Form.Item>
				<Form.Item label="Виробник">
					<Select
						onChange={(value: string) =>
							setProductData({ ...productData, ...{ manufacturer: value } })
						}
					>
						{attributes?.manufacturer?.map((attribute: IAttribute) => (
							<Select.Option key={attribute._id} value={attribute._id}>
								{attribute.value}
							</Select.Option>
						))}
					</Select>
				</Form.Item>
			</SelectBlock>
			<SelectBlock>
				<Form.Item label="Тара">
					<Select
						onChange={(value: string) =>
							setProductData({ ...productData, ...{ packing: value } })
						}
					>
						{attributes?.packing?.map((attribute: IAttribute) => (
							<Select.Option key={attribute._id} value={attribute._id}>
								{attribute.value}
							</Select.Option>
						))}
					</Select>
				</Form.Item>
				<Form.Item label="Ємність">
					<Select
						onChange={(value: string) =>
							setProductData({ ...productData, ...{ capacity: value } })
						}
					>
						{attributes?.capacities?.map((attribute: IAttribute) => (
							<Select.Option key={attribute._id} value={attribute._id}>
								{attribute.value}
							</Select.Option>
						))}
					</Select>
				</Form.Item>
				<Form.Item label="Міцність">
					<Select
						onChange={(value: string) =>
							setProductData({ ...productData, ...{ strength: value } })
						}
					>
						{attributes?.strengths?.map((attribute: IAttribute) => (
							<Select.Option key={attribute._id} value={attribute._id}>
								{attribute.value}
							</Select.Option>
						))}
					</Select>
				</Form.Item>
			</SelectBlock>
			<Form.Item label="">
				<Button onClick={handleCreate}>Зберегти</Button>
			</Form.Item>
		</Form>
	);
};

export default ProductForm;
