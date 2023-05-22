import { Input, Space } from 'antd';
import React, { useState } from 'react';

const Personal = ({ setData }) => {
	const handleInput = (e, type: string) => {
		if (e.target) {
		}
		setData((prev) => ({ ...prev, type: e.target.value }));
	};

	return (
		<div style={{ display: 'flex', gap: '10px', flexDirection: 'column' }}>
			<p style={{ fontSize: '16pt' }}>Ваша персональна інформація:</p>
			<div style={{ display: 'flex', gap: '10px' }}>
				<Input placeholder="Ім'я..." allowClear onChange={handleInput} />
				<Input placeholder="Прізвище..." allowClear onChange={handleInput} />
			</div>
			<Input
				placeholder="Номер телефона..."
				allowClear
				onChange={handleInput}
			/>
		</div>
	);
};

export default Personal;
