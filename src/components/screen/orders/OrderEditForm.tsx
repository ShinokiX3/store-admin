import { Button, Form, Input, Select } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import React, { useState } from 'react';
import styled from 'styled-components';

interface IOrderForm {
	createOne: Function;
}

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

const OrderForm: React.FC<IOrderForm> = ({ createOne }) => {
	const [value, setValue] = useState<string>('');
	const [productData, setProductData] = useState({
		name: '',
		lastname: '',
		tel: '',
		city: '',
		department: '',
		total: '',
		products: '',
	});

	return (
		<Form
			labelCol={{ span: 4 }}
			wrapperCol={{ span: 14 }}
			layout="vertical"
			style={{ width: '100%' }}
		>
			<SelectBlock>
				<Form.Item label="ім'я">
					<Input
						value={productData.name}
						onChange={(e) =>
							setProductData({ ...productData, ...{ name: e.target.value } })
						}
					/>
				</Form.Item>
				<Form.Item label="Прізвище">
					<Input
						value={productData.lastname}
						onChange={(e) =>
							setProductData({
								...productData,
								...{ lastname: e.target.value },
							})
						}
					/>
				</Form.Item>
				<Form.Item label="Номер телефону">
					<Input
						value={productData.tel}
						onChange={(e) =>
							setProductData({ ...productData, ...{ tel: e.target.value } })
						}
					/>
				</Form.Item>
			</SelectBlock>
			<SelectBlock>
				<Form.Item label="Місто">
					<Input
						value={productData.city}
						onChange={(e) =>
							setProductData({ ...productData, ...{ city: e.target.value } })
						}
					/>
				</Form.Item>
				<Form.Item label="Відділ доставки">
					<Input
						value={productData.department}
						onChange={(e) =>
							setProductData({
								...productData,
								...{ department: e.target.value },
							})
						}
					/>
				</Form.Item>
				<Form.Item label="Товари (код х кількість)">
					<Input
						value={productData.products}
						onChange={(e) =>
							setProductData({
								...productData,
								...{ products: e.target.value },
							})
						}
					/>
				</Form.Item>
			</SelectBlock>
			<Form.Item label="">
				<Button onClick={() => {}}>Зберегти</Button>
			</Form.Item>
		</Form>
	);
};

export default OrderForm;
