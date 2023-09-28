import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { ProductService } from '@/services/Server/ServerProduct';
import { Chart } from 'react-google-charts';
import { Line } from '@/components/ui/common/Line';
import { CategoryService } from '@/services/Server/ServerCategory';

const Wrapper = styled.div`
	padding: 20px;
`;

const ChartsWrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
`;

export const options = {
	title: 'Процентне співвідношення товарів по категоріям',
};

export const optionsLine = {
	title: 'Графік продаж',
	curveType: 'function',
	legend: { position: 'bottom' },
};

export const data = [
	['Element', 'Density'],
	['Copper', 8.94],
	['Silver', 10.49],
	['Gold', 19.3],
	['Platinum', 21.45],
];

const orderStatus = [
	{ value: 'В обробці', color: '#ff6060' },
	{ value: 'Відмінено', color: '#000000' },
	{ value: 'Укомплектовується', color: '#fca8a8' },
	{ value: 'Передано до перевізника', color: '#7ac8ff' },
	{ value: 'Очікує у точці видачі', color: '#7b00ff' },
	{ value: 'Виконано', color: '#ff0077' },
];

const P = styled.p`
	font-size: 20pt;
	margin-bottom: 20px;
`;

const PInfo = styled.p`
	font-size: 15pt;
	margin-bottom: 30px;
`;

const InfoWrapper = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr 1fr 1fr;
	justify-items: stretch;
`;

const Home = () => {
	const [productsChart, setProductsChart] = useState<any>([]);
	const [usersChart, setUsersChart] = useState<any>([]);
	const [statusChart, setStatusChart] = useState<any>([]);
	const [regularInfo, setRegularInfo] = useState<any>({
		products: 0,
		categories: 0,
		orders: 0,
		users: 0,
		brands: 0,
		manufacturers: 0,
	});

	useEffect(() => {
		(async () => {
			const productsChart = await ProductService.getProductServiceChartInfo();
			const usersChart = await ProductService.getUserServiceChartInfo();

			const orders = await ProductService.getAllOrders();
			const products = await ProductService.getAllProducts();
			const manufacturers = await ProductService.getAllManufacturers();
			const brands = await ProductService.getAllBrands();
			const categories = await CategoryService.getAllCategories();
			const users = await ProductService.getAllUsers();

			const types = [
				['В обробці', 0],
				['Відмінено', 0],
				['Укомплектовується', 0],
				['Передано до перевізника', 0],
				['Очікує у точці видачі', 0],
				['Виконано', 0],
			];
			const result = types.map((item) => [
				item[0],
				orders.filter((order) => order.status === item[0]).length,
			]);

			productsChart.unshift(['Category', 'Product quantity']);
			usersChart.unshift(['Day', 'Sales']);
			result.unshift(['Type', 'Quantity']);

			setProductsChart(productsChart);
			setUsersChart(usersChart);
			setStatusChart(result);

			setRegularInfo({
				products: products.length,
				categories: categories.length,
				orders: orders.length,
				users: users.length,
				brands: brands.length,
				manufacturers: manufacturers.length,
			});
		})();
	}, []);

	return (
		<Wrapper>
			<P>Статистика</P>
			<Line style={{ marginBottom: '25px' }} />
			<ChartsWrapper>
				<Chart
					chartType="PieChart"
					data={productsChart}
					options={options}
					width="400px"
					height="fit-content"
				/>
				<Chart
					chartType="LineChart"
					width="400px"
					height="fit-content"
					data={usersChart}
					options={optionsLine}
				/>
				<Chart
					chartType="ColumnChart"
					width="400px"
					height="fit-content"
					options={{ title: 'Співвідношення статусів замовлень' }}
					data={statusChart}
				/>
			</ChartsWrapper>
			<Line style={{ marginTop: '25px', marginBottom: '25px' }} />
			<InfoWrapper>
				<div>
					<PInfo>Всього товарів:</PInfo>
					<PInfo>Всього замовлень:</PInfo>
					<PInfo>Всього категорій:</PInfo>
				</div>
				<div>
					<PInfo>{regularInfo.products}</PInfo>
					<PInfo>{regularInfo.orders}</PInfo>
					<PInfo>{regularInfo.categories}</PInfo>
				</div>
				<div>
					<PInfo>Всього кристувачів:</PInfo>
					<PInfo>Всього брендів:</PInfo>
					<PInfo>Всього виробників:</PInfo>
				</div>
				<div>
					<PInfo>{regularInfo.users}</PInfo>
					<PInfo>{regularInfo.brands}</PInfo>
					<PInfo>{regularInfo.manufacturers}</PInfo>
				</div>
			</InfoWrapper>
			<Line style={{ marginTop: '25px', marginBottom: '25px' }} />
		</Wrapper>
	);
};

export default Home;
