import { ProductService } from '@/services/Server/ServerProduct';
import { Button, Form, Input, Select } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import React, { useState } from 'react';

interface IBrandForm {
	createOne: Function;
}

const BrandForm: React.FC<IBrandForm> = ({ createOne }) => {
	const [value, setValue] = useState<string>('');

	return (
		<Form
			labelCol={{ span: 4 }}
			wrapperCol={{ span: 14 }}
			layout="vertical"
			style={{ width: '100%' }}
		>
			<Form.Item label="Назва бренду">
				<Input value={value} onChange={(e) => setValue(e.target.value)} />
			</Form.Item>
			<Form.Item label="">
				<Button onClick={() => createOne(value)}>Зберегти</Button>
			</Form.Item>
		</Form>
	);
};

export default BrandForm;
