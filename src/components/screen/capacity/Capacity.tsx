import DBWrapper from '@/components/ui/wrapper/Wrapper';
import React, { useEffect, useState } from 'react';
import CapacityForm from './CapacityForm';
import styled from 'styled-components';
import { IAttribute } from '@/types/product.interface';
import { ProductService } from '@/services/Server/ServerProduct';
import { Controls } from '@/components/ui/controls/Controls';
import { CloseOutlined, EditOutlined } from '@ant-design/icons';

const Capacities = styled.div`
	width: 100%;
	gap: 20px;
	display: grid;
	align-items: center;
	grid-template-columns: 1fr 1fr 0.4fr;
	margin-bottom: 15px;
	background-color: #f0f1f2;
	padding: 5px;
	border-radius: 0.2rem;

	p {
		/* padding: 10px; */
	}
`;

const Capacity = () => {
	const [capacities, setCapacities] = useState<IAttribute[]>([]);
	const [loading, setLoading] = useState(false);

	const fetchData = async () => {
		setLoading(true);
		const capacities = await ProductService.getAllCapacities();
		if (capacities.length > 0) {
			setCapacities(capacities);
		}
		setLoading(false);
	};

	const createOne = async (value: string) => {
		const response = await ProductService.createCapacity(value);
		if (response) {
			fetchData();
		}
	};

	const deleteOne = async (id: string) => {
		const response = await ProductService.deleteCapacity(id);
		if (response) {
			fetchData();
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	if (loading) {
		return <div>loading...</div>;
	}

	return (
		<DBWrapper title="ємності" Form={CapacityForm} createOne={createOne}>
			<div>
				<Capacities
					style={{ backgroundColor: 'transparent', marginTop: '15px' }}
					key={'product-about'}
				>
					<p>Id</p>
					<p>Value</p>
				</Capacities>
				{capacities.map((capacity) => (
					<Capacities key={capacity._id}>
						<p>{capacity._id}</p>
						<p>{capacity.value}</p>
						<Controls>
							<EditOutlined />
							<CloseOutlined onClick={() => deleteOne(capacity._id)} />
						</Controls>
					</Capacities>
				))}
			</div>
		</DBWrapper>
	);
};

export default Capacity;
