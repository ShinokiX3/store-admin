import { Button, Form, Input, Select } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import React, { useState } from 'react';

interface ICapacityForm {
	createOne: Function;
}

const CapacityForm: React.FC<ICapacityForm> = ({ createOne }) => {
	const [value, setValue] = useState<string>('');

	return (
		<Form
			labelCol={{ span: 4 }}
			wrapperCol={{ span: 14 }}
			layout="vertical"
			style={{ width: '100%' }}
		>
			<Form.Item label="Ємкість">
				<Input value={value} onChange={(e) => setValue(e.target.value)} />
			</Form.Item>
			<Form.Item label="">
				<Button onClick={() => createOne(value)}>Зберегти</Button>
			</Form.Item>
		</Form>
	);
};

export default CapacityForm;
