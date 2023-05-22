import MetaLayout from '@/components/layout/MetaLayout';
import Home from '@/components/screen/home/Home';
import { AuthService } from '@/services/Server/ServerAuth';
const { parseCookies, setCookie, destroyCookie } = require('nookies');

const HomePage = ({ req }) => {
	return (
		<MetaLayout title="Main Page" description="Main page for eiditing">
			<Home />
		</MetaLayout>
	);
};

export async function getServerSideProps(req) {
	const token = parseCookies(req)['auth-token'];
	const session = await AuthService.check(token);

	if (!session) {
		return {
			redirect: {
				destination: '/auth',
				permanent: false,
			},
		};
	} else {
		return { props: { auth: 'true' } };
	}
}

export default HomePage;
