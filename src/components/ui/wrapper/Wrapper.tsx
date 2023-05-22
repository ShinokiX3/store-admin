import React from 'react';
import styled from 'styled-components';

export const Wrapper = styled.div`
	padding: 10px 0px;
`;

export const P = styled.div`
	font-size: 16pt;
	padding: 15px 0px;
	border-bottom: 1px solid lightgray;

	&:first-child {
		padding-top: 0px;
		margin-bottom: 15px;
	}
`;

interface DBWrapper {
	title: string;
	Form: React.ElementType<any>;
	createOne: Function;
	children: React.ReactNode;
}

const DBWrapper: React.FC<DBWrapper> = ({
	title,
	Form,
	createOne,
	children,
}) => {
	return (
		<Wrapper>
			<P>Додати {title}:</P>
			<Form createOne={createOne} />
			<P>Всі {title}:</P>
			{children}
		</Wrapper>
	);
};

export default DBWrapper;
