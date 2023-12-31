import DBWrapper from '@/components/ui/wrapper/Wrapper';
import React, { useEffect, useState } from 'react';
import CategoriesForm from './CategoriesForm';
import styled from 'styled-components';
import { IAttribute } from '@/types/product.interface';
import { CloseOutlined, EditOutlined } from '@ant-design/icons';
import { CategoryService } from '@/services/Server/ServerCategory';
import { Controls } from '@/components/ui/controls/Controls';

const Category = styled.div`
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

const Categories = () => {
	const [categories, setCategories] = useState<
		(IAttribute & { title: string })[] | []
	>([]);
	const [loading, setLoading] = useState(false);

	const fetchData = async () => {
		setLoading(true);
		const categories = await CategoryService.getAllCategories();
		if (categories.length > 0) {
			setCategories(categories);
		}
		setLoading(false);
	};

	const createOne = async (value: string) => {
		const response = await CategoryService.createCategory(value);
		if (response) {
			fetchData();
		}
	};

	const deleteOne = async (id: string) => {
		const response = await CategoryService.deleteCategory(id);
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
		<DBWrapper title="категорії" Form={CategoriesForm} createOne={createOne}>
			<div>
				<Category
					style={{ backgroundColor: 'transparent', marginTop: '15px' }}
					key={'product-about'}
				>
					<p>Id</p>
					<p>Value</p>
				</Category>
				{categories.map((category) => (
					<Category key={category._id}>
						<p>{category._id}</p>
						<p>{category.title}</p>
						<Controls>
							<EditOutlined />
							<CloseOutlined onClick={() => deleteOne(category._id)} />
						</Controls>
					</Category>
				))}
			</div>
		</DBWrapper>
	);
};

export default Categories;
