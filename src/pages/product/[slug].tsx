import React from 'react';
import MetaLayout from '@/components/layout/MetaLayout';
import Product from '@/components/screen/product/Product';
// import { AmazonProduct } from '@/services/Amazon/AmazonProduct';
import { IAmazonProductById } from '@/types/products.interface';
import { GetServerSideProps } from 'next';
import { ProductService } from '@/services/Server/ServerProduct';
import { IProduct } from '@/types/product.interface';

export const getServerSideProps: GetServerSideProps = async (context) => {
	const slug = context.params?.slug as string;

	const response = await ProductService.getProductById({ id: slug });

	if (!response) {
		return {
			notFound: true,
		};
	}

	return {
		props: { product: response[0], slug: slug },
	};
};

interface IProductPage {
	product: IProduct;
}

const ProductPage: React.FC<IProductPage> = ({ product }) => {
	return (
		<MetaLayout title="Product Page" description="Product page details">
			<Product data={product} />
		</MetaLayout>
	);
};

export default ProductPage;
