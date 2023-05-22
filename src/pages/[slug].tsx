import React from 'react';
import MetaLayout from '@/components/layout/MetaLayout';
import { GetServerSideProps, GetStaticPaths, GetStaticProps } from 'next';
import { ProductService } from '@/services/Server/ServerProduct';
import { IProduct } from '@/types/product.interface';
import Type from '@/components/screen/type/Type';
import { AuthService } from '@/services/Server/ServerAuth';
const { parseCookies, setCookie, destroyCookie } = require('nookies');

export const getServerSideProps: GetServerSideProps = async (context) => {
	const slug = context.params?.slug as string;
	const token = parseCookies(context)['auth-token'];
	const session = await AuthService.check(token);

	if (!session) {
		return {
			redirect: {
				destination: '/auth',
				permanent: false,
			},
		};
	} else {
		return {
			props: { product: [], slug: slug },
		};
	}
};

const TypePage: React.FC<any> = ({ product, slug }) => {
	return (
		<MetaLayout title="Type Page" description="Product page details">
			<Type type={slug} />
		</MetaLayout>
	);
};

export default TypePage;
