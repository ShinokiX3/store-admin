import { useActions } from '@/hooks/useActions';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { IProduct, Variants } from '@/types/product.interface';
import { HeartOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Button, Rate, Space } from 'antd';
import Image from 'next/image';
import React from 'react';
import styled from 'styled-components';

interface IDescripton {
	data: IProduct;
}

const Attributes = styled.div`
	display: grid;
	grid-template-columns: 0.3fr 1fr;

	div {
		display: flex;
		flex-direction: column;
		gap: 15px;
		padding: 5px;
		padding-left: 10px;
		padding-right: 10px;
	}
`;

const Question = styled.div`
	white-space: nowrap;
	background-color: #f9f9f9;
`;

const Answer = styled.div`
	background-color: #fdfdfd;
	color: gray;
`;

const DescriptionP = styled.p`
	padding: 15px;
	border-radius: 0.2rem;
	line-height: 20px;
	background-color: #f9f9f9;
`;

const TitleP = styled.p`
	margin-bottom: 5px;
	font-size: 22pt;
	font-weight: bold;
`;

// TODO: typed this function

const Description: React.FC<IDescripton> = ({ data }) => {
	console.log(data);

	const { items } = useTypedSelector((state) => state.cart);
	const { addToCart } = useActions();

	// TODO: Create custom hook for this

	const handleToCart = () => {
		// TODO: Desctructuring object
		// TODO: Where can i get price?
		const { _id, title, picture, cost, discount } = data;
		console.log(data);

		addToCart({
			asin: _id,
			title: title,
			image: { link: `http://localhost:3000/${picture}` },
			price: cost,
			rrp: discount ? discount * cost : cost,
			quantity: 1,
			rating: '',
		});
	};

	return (
		<div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
			<TitleP>{data.title}</TitleP>
			<DescriptionP>{data.description}</DescriptionP>
			<Space style={{ height: '50px' }}>
				{data?.discount ? (
					// <del>{data.buybox_winner.rrp.raw}</del>
					<del>{data.cost * data.discount}₴</del>
				) : null}
				<p style={{ fontSize: '20pt', fontWeight: 'bold' }}>
					{data.cost || 'Sold'}₴
				</p>
				<Button
					type="primary"
					danger
					shape="round"
					size="large"
					style={{ width: '140px' }}
				>
					<ShoppingCartOutlined />
					Придбати
				</Button>
				<Button
					type="default"
					shape="round"
					size="large"
					onClick={handleToCart}
				>
					У кошик
				</Button>
				<Rate
					character={<HeartOutlined style={{ fontSize: '30px' }} />}
					count={1}
					style={{ color: 'red', fill: 'red' }}
				/>
			</Space>
			<span
				style={{ margin: '15px 0px', borderBottom: '1px solid lightgray' }}
			></span>
			<Attributes>
				<Question>
					<div>Ємність</div>
					<div>Бренд</div>
					<div>Вид</div>
					<div>Виробник</div>
					<div>{`Міцність (Abv)`}</div>
					<div>Саббренд</div>
					<div>Тара</div>
				</Question>
				<Answer>
					<div>Ємність</div>
					<div>Бренд</div>
					<div>Вид</div>
					<div>Виробник</div>
					<div>{`Міцність (Abv)`}</div>
					<div>Саббренд</div>
					<div>Тара</div>
				</Answer>
			</Attributes>
		</div>
	);
};

export default Description;
