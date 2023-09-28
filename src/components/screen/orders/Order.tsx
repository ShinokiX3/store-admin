import DBWrapper from '@/components/ui/wrapper/Wrapper';
import React, { useEffect, useState } from 'react';
import OrderForm from './OrderForm';
import styled from 'styled-components';
import { IAttribute } from '@/types/product.interface';
import { ProductService } from '@/services/Server/ServerProduct';
import { CloseOutlined, EditOutlined } from '@ant-design/icons';
import { Controls } from '@/components/ui/controls/Controls';
import { Form, Input, Select } from 'antd';
import { Line } from '@/components/ui/common/Line';

const Orders = styled.div`
	width: 100%;
	gap: 20px;
	display: grid;
	align-items: center;
	grid-template-columns: 0.4fr 0.6fr 1fr 1fr 1fr 0.4fr 1fr 0.9fr 1.7fr 0.2fr;
	margin-bottom: 15px;
	background-color: #f0f1f2;
	padding: 5px;
	border-radius: 0.2rem;

	p {
		/* padding: 10px; */
	}
`;

const orderStatus = [
	{ value: 'В обробці', label: 'В обробкці' },
	{ value: 'Відмінено', label: 'Відмінено' },
	{ value: 'Укомплектовується', label: 'Укомплектовується' },
	{ value: 'Передано до перевізника', label: 'Передано до перевізника' },
	{ value: 'Очікує у точці видачі', label: 'Очікує у точці видачі' },
	{ value: 'Виконано', label: 'Виконано' },
];

const SearchP = styled.p`
	font-size: 13pt;
	margin-right: 10px;
	white-space: nowrap;
`;

const Order = () => {
	const [orders, setOrders] = useState<IAttribute[]>([]);
	const [ordersView, setOrdersView] = useState<IAttribute[]>([]);
	const [loading, setLoading] = useState(false);
	const [searchValue, setSearchValue] = useState('');
	const [searchCodeValue, setSearchCodeValue] = useState('');

	const fetchData = async () => {
		setLoading(true);
		const orders = await ProductService.getAllOrders();
		setOrders(orders.sort((a, b) => (a.date > b.date ? -1 : 1)));
		if (orders.length > 0) {
			setOrdersView(orders.sort((a, b) => (a.date > b.date ? -1 : 1)));
		}
		setLoading(false);
	};

	const createOne = async (value: string) => {
		const response = await ProductService.createPacking(value);
		if (response) {
			fetchData();
		}
	};

	const deleteOne = async (id: string) => {
		const response = await ProductService.deletePacking(id);
		if (response) {
			fetchData();
		}
	};

	const handleOrderStatus = async (id: string, status: string) => {
		const response = await ProductService.changeOrderStatus(id, status);
	};

	useEffect(() => {
		fetchData();
	}, []);

	useEffect(() => {
		const searchedOrders = orders.filter((ord) => {
			const regexp = new RegExp(`${searchValue}`, 'gi');
			return `${ord.name} ${ord.lastname}`.match(regexp);
		});
		if (searchedOrders.length === 0) setOrdersView(orders);
		else setOrdersView(searchedOrders);
	}, [searchValue]);

	useEffect(() => {
		const searchedOrders = orders.filter((ord) => {
			const regexp = new RegExp(`${searchCodeValue}`, 'gi');
			return `${ord._id}`.match(regexp);
		});
		if (searchedOrders.length === 0) setOrdersView(orders);
		else setOrdersView(searchedOrders);
	}, [searchCodeValue]);

	if (loading) {
		return <div>loading...</div>;
	}

	return (
		<DBWrapper title="замовлення" Form={OrderForm} createOne={createOne}>
			<div>
				<Orders
					key={'product-search'}
					isWrapp={true}
					style={{ backgroundColor: 'transparent', marginTop: '15px' }}
				>
					<SearchP>Знайти за кодом: </SearchP>
					<Input
						style={{ width: '220px' }}
						value={searchCodeValue}
						onChange={(e) => setSearchCodeValue(e.target.value)}
					/>
					<SearchP>Знайти за замовником: </SearchP>
					<Input
						style={{ width: '220px' }}
						value={searchValue}
						onChange={(e) => setSearchValue(e.target.value)}
					/>
				</Orders>
				<Line />
				<Orders
					style={{ backgroundColor: 'transparent', marginTop: '15px' }}
					key={'order-about'}
				>
					<p>Id</p>
					<p>Name</p>
					<p>Phone</p>
					<p>City</p>
					<p>Delivery department</p>
					<p>Total</p>
					<p>Date</p>
					<p>Products</p>
					<p>Status</p>
				</Orders>
				{ordersView.map((order) => (
					<Orders key={order._id}>
						<p>{order._id.substring(0, 7)}</p>
						<p>{`${order.name} ${order.lastname}`}</p>
						<p>{order.tel}</p>
						<p>{order.city.title}</p>
						<p>{order.deliveryDepartment.title}</p>
						<p>{order.total}</p>
						<p>{order.date}</p>
						<p>
							{order.products
								.map(
									(product) =>
										`${product.id.substring(0, 8)} x ${product.quantity}`
								)
								.join(', ')}
						</p>
						<Form.Item style={{ marginBottom: '0px' }}>
							<Select
								onChange={(value: string) =>
									handleOrderStatus(order._id, value)
								}
								defaultValue={order.status}
							>
								{orderStatus.map((option) => (
									<Select.Option key={option.value}>
										{option.value}
									</Select.Option>
								))}
							</Select>
						</Form.Item>
						<Controls>
							<EditOutlined />
							<CloseOutlined onClick={() => deleteOne(order._id)} />
						</Controls>
					</Orders>
				))}
			</div>
		</DBWrapper>
	);
};

export default Order;
