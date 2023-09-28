import styled from 'styled-components';
import Search from '@/components/ui/search/Search';
import Nav from './Nav';
import Logo from './Logo';
import Link from 'next/link';
import { LogoutOutlined } from '@ant-design/icons';

const StyledHeader = styled.header`
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 9px 15px;

	svg {
		cursor: pointer;

		width: var(--ico-w);
		height: var(--ico-h);
	}
`;

const Wrapper = styled.div`
	overflow: auto;
	top: 0;
	position: sticky;
	height: calc(100vh - 30px);
	background-color: #f0f1f2;
	padding: 15px;
	min-width: 250px;
	/* @media (max-width: 700px) {
		div:last-child {
			display: block;
		}
		.ant-select {
			display: none;
		}
	} */
`;

const Title = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	font-size: 25pt;
	padding-bottom: 15px;
	margin-bottom: 10px;
	border-bottom: 1px solid lightgray;

	svg {
		cursor: pointer;
	}
`;

const Content = styled.div`
	font-size: 17pt;
	display: flex;
	flex-direction: column;
	gap: 10px;

	a {
		text-decoration: none;
		color: black;
	}
`;

const Item = styled.div`
	padding: 10px 10px;
	transition: background-color 0.4s ease;
	cursor: pointer;

	&:hover {
		background-color: lightgray;
	}
`;

const Header = () => {
	console.log(window.innerWidth);

	return (
		<Wrapper>
			<Title>
				<Link style={{ textDecoration: 'none', color: 'black' }} href={'/'}>
					Dashboard
				</Link>
				<LogoutOutlined />
			</Title>
			<Content>
				<Link href={'/product'}>
					<Item>Товари</Item>
				</Link>
				<Link href={'/order'}>
					<Item>Замовлення</Item>
				</Link>
				<Link href={'/category'}>
					<Item>Категорії</Item>
				</Link>
				<Link href={'/kind'}>
					<Item>Види</Item>
				</Link>
				<Link href={'/packing'}>
					<Item>Тари</Item>
				</Link>
				<Link href={'/brand'}>
					<Item>Бренди</Item>
				</Link>
				<Link href={'/capacity'}>
					<Item>Ємності</Item>
				</Link>
				<Link href={'/strength'}>
					<Item>Міцності</Item>
				</Link>
				<Link href={'/manufacturer'}>
					<Item>Виробники</Item>
				</Link>
				<Link href={'/user'}>
					<Item>Користувачі</Item>
				</Link>
			</Content>
		</Wrapper>
	);
};

export default Header;
