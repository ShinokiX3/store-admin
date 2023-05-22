import React from 'react';
import styled from 'styled-components';
import Brand from '../brand/Brand';
import Kind from '../kind/Kind';
import Manufacturer from '../manufacturer/Manufacturer';
import Packing from '../packing/Packing';
import Strength from '../strength/Strength';
import Capacity from '../capacity/Capacity';
import Product from '../product/Product';
import Products from '../products/Products';
import Categories from '../categories/Categories';

interface IType {
	type: string;
}

const Wrapper = styled.div`
	padding: 20px;
`;

const ChooseType = (type: string) => {
	switch (type) {
		case 'brand':
			return <Brand />;
			break;
		case 'kind':
			return <Kind />;
			break;
		case 'manufacturer':
			return <Manufacturer />;
			break;
		case 'packing':
			return <Packing />;
			break;
		case 'strength':
			return <Strength />;
			break;
		case 'capacity':
			return <Capacity />;
			break;
		case 'product':
			return <Products />;
			break;
		case 'category':
			return <Categories />;
			break;
		default:
			break;
	}
};

const Type: React.FC<IType> = ({ type }) => {
	return <Wrapper>{ChooseType(type)}</Wrapper>;
};

export default Type;
