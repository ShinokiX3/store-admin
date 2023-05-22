import { Parallax, ParallaxLayer } from '@react-spring/parallax';
import styles from './parallax.module.scss';

import Promo from './Promo';
import styled from 'styled-components';
import Products from '../products/Products';
import Brand from '../brand/Brand';
import Kind from '../kind/Kind';
import Manufacturer from '../manufacturer/Manufacturer';
import Packing from '../packing/Packing';
import Strength from '../strength/Strength';
import Capacity from '../capacity/Capacity';

const Wrapper = styled.div`
	padding: 20px;
`;

const Home = () => {
	const alignCenter = { display: 'flex', alignItems: 'center' };

	return (
		<Wrapper>
			{/* <Products /> */}
			{/* <Brand /> */}
			{/* <Kind /> */}
			{/* <Manufacturer /> */}
			{/* <Packing /> */}
			{/* <Strength /> */}
			{/* <Capacity /> */}
		</Wrapper>
	);
};

export default Home;
