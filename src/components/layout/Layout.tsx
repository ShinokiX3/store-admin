import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Header from './header/Header';

import DrawCategory from '../ui/drawer/DrawCategory';
import { CategoryService } from '@/services/Server/ServerCategory';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { AuthService } from '@/services/Server/ServerAuth';
import { redirect } from 'next/navigation';

interface ILayout {
	children?: React.ReactNode;
}

// TODO: change categories variable to object like {data, changeData, loading, error} or set 'em to redux storage

const Layout: React.FC<ILayout> = ({ children }) => {
	const [categories, setCategories] = useState<any>(null);
	const [loading, setLoading] = useState(false);
	const [isLogin, setIsLogin] = useState(false);

	const router = useRouter();

	const user = useTypedSelector((state) => state.user);

	const checkForAuth = async () => {
		setLoading(true);
		const response = await AuthService.check(user.token);
		if (response) {
			setIsLogin(true);
		} else {
			setIsLogin(false);
		}
		setLoading(false);
	};

	const fetchCategories = async () => {
		setLoading(true);
		const response = await CategoryService.getAllCategories();
		if (response) {
			setCategories(response);
		} else setCategories([]);
		setLoading(false);
	};

	useEffect(() => {
		checkForAuth();
		fetchCategories();
	}, []);

	if (loading) return <div>Loading...</div>;

	// TODO: create recurcive function for fetching data

	return (
		<main style={{ width: '100%', display: 'flex' }}>
			{isLogin ? <Header /> : <></>}
			<div>
				<DrawCategory categories={categories} />
				<section style={{ display: 'flex' }}>{children}</section>
			</div>
		</main>
	);
};

// export async function getServerSideProps({ req }) {
// 	const session = await AuthService.check();

// 	if (!session) {
// 		return {
// 			redirect: {
// 				destination: '/auth',
// 				permanent: false,
// 			},
// 		};
// 	}
// }

export default Layout;
