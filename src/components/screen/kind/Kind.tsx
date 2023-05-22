import DBWrapper from '@/components/ui/wrapper/Wrapper';
import React, { useEffect, useState } from 'react';
import KindForm from './KindForm';
import styled from 'styled-components';
import { IAttribute } from '@/types/product.interface';
import { ProductService } from '@/services/Server/ServerProduct';
import { Controls } from '@/components/ui/controls/Controls';
import { CloseOutlined, EditOutlined } from '@ant-design/icons';

const Kinds = styled.div`
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

const Kind = () => {
	const [kinds, setKinds] = useState<IAttribute[]>([]);
	const [loading, setLoading] = useState(false);

	const fetchData = async () => {
		setLoading(true);
		const kinds = await ProductService.getAllKinds();
		if (kinds.length > 0) {
			setKinds(kinds);
		}
		setLoading(false);
	};

	const createOne = async (value: string) => {
		const response = await ProductService.createKind(value);
		if (response) {
			fetchData();
		}
	};

	const deleteOne = async (id: string) => {
		const response = await ProductService.deleteKind(id);
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
		<DBWrapper title="види" Form={KindForm} createOne={createOne}>
			<div>
				<Kinds
					style={{ backgroundColor: 'transparent', marginTop: '15px' }}
					key={'product-about'}
				>
					<p>Id</p>
					<p>Value</p>
				</Kinds>
				{kinds.map((kind) => (
					<Kinds key={kind._id}>
						<p>{kind._id}</p>
						<p>{kind.value}</p>
						<Controls>
							<EditOutlined />
							<CloseOutlined onClick={() => deleteOne(kind._id)} />
						</Controls>
					</Kinds>
				))}
			</div>
		</DBWrapper>
	);
};

export default Kind;
