import DBWrapper from '@/components/ui/wrapper/Wrapper';
import React, { useEffect, useState } from 'react';
import BrandForm from './BrandForm';
import styled from 'styled-components';
import { IAttribute } from '@/types/product.interface';
import { ProductService } from '@/services/Server/ServerProduct';
import { CloseOutlined, EditOutlined } from '@ant-design/icons';
import { Controls } from '@/components/ui/controls/Controls';

const Brands = styled.div`
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

const Brand = () => {
	const [brands, setBrands] = useState<IAttribute[]>([]);
	const [loading, setLoading] = useState(false);

	const fetchData = async () => {
		setLoading(true);
		const brands = await ProductService.getAllBrands();
		if (brands.length > 0) {
			setBrands(brands);
		}
		setLoading(false);
	};

	const createOne = async (value: string) => {
		const response = await ProductService.createBrand(value);
		if (response) {
			fetchData();
		}
	};

	const deleteOne = async (id: string) => {
		const response = await ProductService.deleteBrand(id);
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
		<DBWrapper title="бренди" Form={BrandForm} createOne={createOne}>
			<div>
				<Brands
					style={{ backgroundColor: 'transparent', marginTop: '15px' }}
					key={'product-about'}
				>
					<p>Id</p>
					<p>Value</p>
				</Brands>
				{brands.map((brand) => (
					<Brands key={brand._id}>
						<p>{brand._id}</p>
						<p>{brand.value}</p>
						<Controls>
							<EditOutlined />
							<CloseOutlined onClick={() => deleteOne(brand._id)} />
						</Controls>
					</Brands>
				))}
			</div>
		</DBWrapper>
	);
};

export default Brand;
