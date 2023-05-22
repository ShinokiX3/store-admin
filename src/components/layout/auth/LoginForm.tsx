import { AuthService } from '@/services/Server/ServerAuth';
import { Button, Form, Input, Result, message } from 'antd';
import React, { ReactNode, useCallback, useState } from 'react';
import styled from 'styled-components';
import { Controls } from './Controls';
import Spinner from '@/components/ui/common/Spinner';
import { MessageInstance } from 'antd/es/message/interface';
import { SmileOutlined } from '@ant-design/icons';
import { useActions } from '@/hooks/useActions';
import { useRouter } from 'next/router';
import nookies from 'nookies';

interface ILoginForm {
	children?: ReactNode;
}

const LoginForm: React.FC<ILoginForm> = ({ children }) => {
	const [loading, setLoading] = useState<boolean>(false);
	const [status, setStatus] = useState<string>('');

	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');

	const router = useRouter();

	const { login } = useActions();

	const signin = useCallback(() => {
		return async () => {
			if (email && password) {
				setLoading(true);

				const resp = await AuthService.login({ email, password });

				if (resp?.token) {
					setStatus('success');
					localStorage.setItem('token', resp.token);
					nookies.set(null, 'auth-token', resp.token, {
						maxAge: 30 * 24 * 60 * 60,
						path: '/',
					});
					login({ token: resp.token, user: resp.user[0] });
				} else setStatus('error');

				setLoading(false);
			}
		};
	}, [email, password, login]);

	if (loading) return <Spinner />;

	if (status === 'success') {
		setTimeout(() => {
			setStatus('');
			router.push('/');
		}, 3000);

		return (
			<Result icon={<SmileOutlined />} title="Great, we successfuly logged!" />
		);
	}

	if (status === 'error') {
		setTimeout(() => {
			setStatus('');
		}, 3000);

		return (
			<Result
				status="error"
				title="Submission Failed"
				subTitle="Something goes wrong."
			/>
		);
	}

	return (
		<Form style={{ display: 'grid', gap: '10px' }}>
			<Input
				placeholder="email"
				type="email"
				value={email}
				onChange={(e) => setEmail(e.target.value)}
			/>

			<Input
				placeholder="password"
				type="password"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
			/>

			<Controls>
				{children}
				<Button onClick={signin()}>Login</Button>
			</Controls>
		</Form>
	);
};

export default LoginForm;
