import React from 'react';
import { Form, Input, Button, Space } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

const AddServiceForm = ({ onAddServices }) => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    onAddServices(values.services);
    form.resetFields();
  };

  return (
    <Form form={form} onFinish={onFinish} layout="vertical">
      <Form.List name="services">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, fieldKey, ...restField }) => (
              <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                <Form.Item
                  {...restField}
                  name={[name, 'name']}
                  fieldKey={[fieldKey, 'name']}
                  rules={[{ required: true, message: 'Please enter service name' }]}
                >
                  <Input placeholder="Service Name" />
                </Form.Item>
                <Form.Item
                  {...restField}
                  name={[name, 'price']}
                  fieldKey={[fieldKey, 'price']}
                  rules={[{ required: true, message: 'Please enter price' }]}
                >
                  <Input placeholder="Price" />
                </Form.Item>
                <MinusCircleOutlined onClick={() => remove(name)} />
              </Space>
            ))}
            <Form.Item>
              <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                Add Service
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Save Services
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddServiceForm;
