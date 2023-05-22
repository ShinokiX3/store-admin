import DBWrapper from '@/components/ui/wrapper/Wrapper';
import React, { useEffect, useState } from 'react';
import PackingForm from './PackingForm';
import styled from 'styled-components';
import { IAttribute } from '@/types/product.interface';
import { ProductService } from '@/services/Server/ServerProduct';
import { CloseOutlined, EditOutlined } from '@ant-design/icons';
import { Controls } from '@/components/ui/controls/Controls';

const Packings = styled.div`
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

const Packing = () => {
	const [packings, setPackings] = useState<IAttribute[]>([]);
	const [loading, setLoading] = useState(false);

	const fetchData = async () => {
		setLoading(true);
		const packings = await ProductService.getAllPackings();
		if (packings.length > 0) {
			setPackings(packings);
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

	useEffect(() => {
		fetchData();
	}, []);

	if (loading) {
		return <div>loading...</div>;
	}

	return (
		<DBWrapper title="тари" Form={PackingForm} createOne={createOne}>
			<div>
				<Packings
					style={{ backgroundColor: 'transparent', marginTop: '15px' }}
					key={'product-about'}
				>
					<p>Id</p>
					<p>Value</p>
				</Packings>
				{packings.map((packing) => (
					<Packings key={packing._id}>
						<p>{packing._id}</p>
						<p>{packing.value}</p>
						<Controls>
							<EditOutlined />
							<CloseOutlined onClick={() => deleteOne(packing._id)} />
						</Controls>
					</Packings>
				))}
			</div>
		</DBWrapper>
	);
};

export default Packing;
