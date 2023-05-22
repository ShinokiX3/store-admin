import DBWrapper from '@/components/ui/wrapper/Wrapper';
import React, { useEffect, useState } from 'react';
import ManufacturerForm from './ManufacturerForm';
import styled from 'styled-components';
import { IAttribute } from '@/types/product.interface';
import { ProductService } from '@/services/Server/ServerProduct';
import { Controls } from '@/components/ui/controls/Controls';
import { CloseOutlined, EditOutlined } from '@ant-design/icons';

const Manufacturers = styled.div`
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

const Manufacturer = () => {
	const [manufacturers, setManufacturers] = useState<IAttribute[]>([]);
	const [loading, setLoading] = useState(false);

	const fetchData = async () => {
		setLoading(true);
		const manufacturers = await ProductService.getAllManufacturers();
		if (manufacturers.length > 0) {
			setManufacturers(manufacturers);
		}
		setLoading(false);
	};

	const createOne = async (value: string) => {
		const response = await ProductService.createManufacturer(value);
		if (response) {
			fetchData();
		}
	};

	const deleteOne = async (id: string) => {
		const response = await ProductService.deleteManufacturer(id);
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
		<DBWrapper title="виробники" Form={ManufacturerForm} createOne={createOne}>
			<div>
				<Manufacturers
					style={{ backgroundColor: 'transparent', marginTop: '15px' }}
					key={'product-about'}
				>
					<p>Id</p>
					<p>Value</p>
				</Manufacturers>
				{manufacturers.map((manufacturer) => (
					<Manufacturers key={manufacturer._id}>
						<p>{manufacturer._id}</p>
						<p>{manufacturer.value}</p>
						<Controls>
							<EditOutlined />
							<CloseOutlined onClick={() => deleteOne(manufacturer._id)} />
						</Controls>
					</Manufacturers>
				))}
			</div>
		</DBWrapper>
	);
};

export default Manufacturer;
