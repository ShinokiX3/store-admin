import React, { useState } from 'react';
import Link from 'next/link';
import { ICategory } from '@/types/categories.interface';
import { Drawer } from 'antd';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { useActions } from '@/hooks/useActions';
import styled from 'styled-components';
import { RightOutlined } from '@ant-design/icons';

// TODO: bring into global scss variables

const DrawLinkWrapper = styled.div`
	cursor: pointer;
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 100%;
	border-radius: 0.2rem;
	padding: 7px;
	transition: background-color 0.2s ease;

	a {
		color: black;
	}

	&:hover {
		background-color: #f0f0f0;
	}
`;

const DrawLink = styled.div`
	width: 100%;
	font-size: var(--fs-regular);
`;

interface IDrawContent {
	categories: ICategory[];
	handleCategory: Function;
	setShouldChildOpen: Function;
}

const DrawContent: React.FC<IDrawContent> = ({
	categories,
	handleCategory,
	setShouldChildOpen,
}) => {
	return (
		<div>
			{categories?.map((category) => (
				<DrawLinkWrapper key={category._id}>
					<Link href={`/category/${category._id}`} style={{ width: '100%' }}>
						<DrawLink>{category.title}</DrawLink>
					</Link>
				</DrawLinkWrapper>
			))}
		</div>
	);
};

interface IDrawCategory {
	categories: ICategory[];
}

const DrawCategory: React.FC<IDrawCategory> = ({ categories }) => {
	const [details, setDetails] = useState<[ICategory[]] | []>([]);
	const [shouldChildOpen, setShouldChildOpen] = useState(false);

	const user = useTypedSelector((state) => state.user);
	const { toggleUpperDrawer } = useActions();

	const handleCategory = async (category: ICategory) => {};

	return (
		<>
			<Drawer
				headerStyle={{ fontSize: '18t' }}
				title="Меню"
				placement="left"
				closable={false}
				onClose={() => toggleUpperDrawer(!user.upperDrawer)}
				open={user.upperDrawer}
				key="left"
			>
				<DrawContent
					categories={categories}
					handleCategory={handleCategory}
					setShouldChildOpen={setShouldChildOpen}
				/>
			</Drawer>
			{/* <Drawer
				title="Categories"
				placement="left"
				width={380}
				maskStyle={{ background: 'transparent' }}
				closable={false}
				onClose={() => setShouldChildOpen(!shouldChildOpen)}
				open={shouldChildOpen}
			>
				<DrawContent
					categories={details}
					handleCategory={handleCategory}
					setShouldChildOpen={setShouldChildOpen}
				/>
			</Drawer> */}
		</>
	);
};

export default DrawCategory;
