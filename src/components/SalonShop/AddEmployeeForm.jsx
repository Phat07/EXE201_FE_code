import React from 'react';
import { Form, Input, Button, Space } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

const AddEmployeeForm = ({ onAddEmployees }) => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    onAddEmployees(values.employees);
    form.resetFields();
  };

  return (
    <Form form={form} onFinish={onFinish} layout="vertical">
      <Form.List name="employees">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, fieldKey, ...restField }) => (
              <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                <Form.Item
                  {...restField}
                  name={[name, 'name']}
                  fieldKey={[fieldKey, 'name']}
                  rules={[{ required: true, message: 'Please enter employee name' }]}
                >
                  <Input placeholder="Employee Name" />
                </Form.Item>
                <Form.Item
                  {...restField}
                  name={[name, 'position']}
                  fieldKey={[fieldKey, 'position']}
                  rules={[{ required: true, message: 'Please enter position' }]}
                >
                  <Input placeholder="Position" />
                </Form.Item>
                <MinusCircleOutlined onClick={() => remove(name)} />
              </Space>
            ))}
            <Form.Item>
              <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                Add Employee
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Save Employees
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddEmployeeForm;
