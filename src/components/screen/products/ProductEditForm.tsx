import { CategoryService } from '@/services/Server/ServerCategory';
import { IProduct, ProductService } from '@/services/Server/ServerProduct';
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
	product?: IProductData;
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

const BttnControls = styled.div`
	display: flex;
	width: 100%;
	gap: 12px;
`;

const ProductEditForm: React.FC<IPackingForm> = ({ createOne, product }) => {
	const [categories, setCategories] = useState<ICategory[] | []>([]);
	const [attributes, setAttributes] = useState<IAttribtesResponse | {}>({});

	const [productData, setProductData] = useState<IProductData>({
		title: product.title,
		code: product.code,
		description: product.description,
		isNew: product.isNew,
		inStockQuantity: product.inStockQuantity,
		cost: product.cost,
		discount: product.discount,
		category: product.category,
		brand: product.brand,
		kind: product.kind,
		strength: product.strength,
		packing: product.packing,
		manufacturer: product.manufacturer,
		capacity: product.capacity,
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
						value={productData.category}
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
						checked={productData.isNew}
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
						value={productData.description}
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
						value={productData.inStockQuantity}
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
						value={productData.code}
						onChange={(e) =>
							setProductData({ ...productData, ...{ code: e.target.value } })
						}
					/>
				</Form.Item>
				<Form.Item label="Ціна">
					<Input
						value={productData.cost}
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
						value={productData.discount}
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
						value={productData.brand}
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
						value={productData.kind}
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
						value={productData.manufacturer}
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
						value={productData.packing}
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
						value={productData.capacity}
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
						value={productData.strength}
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
			<BttnControls>
				<Form.Item label="">
					<Button type="link" onClick={() => {}}>
						Відмінити
					</Button>
				</Form.Item>
				<Form.Item label="">
					<Button onClick={() => {}}>Зберегти</Button>
				</Form.Item>
			</BttnControls>
		</Form>
	);
};

export default ProductEditForm;
