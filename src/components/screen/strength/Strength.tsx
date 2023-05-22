import DBWrapper from '@/components/ui/wrapper/Wrapper';
import React, { useEffect, useState } from 'react';
import StrengthForm from './StrengthForm';
import styled from 'styled-components';
import { IAttribute } from '@/types/product.interface';
import { ProductService } from '@/services/Server/ServerProduct';
import { CloseOutlined, EditOutlined } from '@ant-design/icons';
import { Controls } from '@/components/ui/controls/Controls';

const Strengths = styled.div`
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

const Strength = () => {
	const [strengths, setStrengths] = useState<IAttribute[]>([]);
	const [loading, setLoading] = useState(false);

	const fetchData = async () => {
		setLoading(true);
		const strengths = await ProductService.getAllStrengths();
		if (strengths.length > 0) {
			setStrengths(strengths);
		}
		setLoading(false);
	};

	const createOne = async (value: string) => {
		const response = await ProductService.createStrength(value);
		if (response) {
			fetchData();
		}
	};

	const deleteOne = async (id: string) => {
		const response = await ProductService.deleteStrength(id);
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
		<DBWrapper title="міцності" Form={StrengthForm} createOne={createOne}>
			<div>
				<Strengths
					style={{ backgroundColor: 'transparent', marginTop: '15px' }}
					key={'product-about'}
				>
					<p>Id</p>
					<p>Value</p>
				</Strengths>
				{strengths.map((strength) => (
					<Strengths key={strength._id}>
						<p>{strength._id}</p>
						<p>{strength.value}</p>
						<Controls>
							<EditOutlined />
							<CloseOutlined onClick={() => deleteOne(strength._id)} />
						</Controls>
					</Strengths>
				))}
			</div>
		</DBWrapper>
	);
};

export default Strength;
