import LoginForm from '@/components/layout/auth/LoginForm';
import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
	width: 100vw;
	height: 100vh;
	display: flex;
	align-items: center;
	justify-content: center;
`;

const AuthWrapper = styled.div`
	width: 300px;
	height: auto;

	h2 {
		margin-bottom: 10px;
	}
`;

const Auth = () => {
	return (
		<Wrapper>
			<AuthWrapper>
				<h2>Login</h2>
				<LoginForm />
			</AuthWrapper>
		</Wrapper>
	);
};

export default Auth;
