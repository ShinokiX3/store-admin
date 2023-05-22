import MetaLayout from '@/components/layout/MetaLayout';
import Auth from '@/components/screen/auth/Auth';
import React from 'react';

const AuthPage = () => {
	return (
		<MetaLayout title="Auth" description="Auth page for admin pannel">
			<Auth />
		</MetaLayout>
	);
};

export default AuthPage;
