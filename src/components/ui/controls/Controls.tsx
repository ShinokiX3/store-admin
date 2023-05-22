import styled from 'styled-components';

export const Controls = styled.div`
	display: flex;
	gap: 5px;
	align-items: center;
	justify-content: center;

	svg {
		cursor: pointer;
		font-size: 14pt;
		transition: color 0.3s ease;

		&:hover {
			color: red;
		}
	}
`;
