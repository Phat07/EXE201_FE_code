import React from 'react';
import { Form, Input, Button } from 'antd';

const SalonForm = ({ onAddSalon }) => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    onAddSalon(values);
    form.resetFields();
  };

  return (
    <Form form={form} onFinish={onFinish} layout="vertical">
      <Form.Item name="name" label="Salon Name" rules={[{ required: true }]}>
        <Input placeholder="Enter salon name" />
      </Form.Item>
      <Form.Item name="location" label="Location" rules={[{ required: true }]}>
        <Input placeholder="Enter location" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Create Salon
        </Button>
      </Form.Item>
    </Form>
  );
};

export default SalonForm;
