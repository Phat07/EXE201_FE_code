import React, { useState } from 'react';
import { Form, Input, Button, Space, Select, DatePicker, Upload, message } from 'antd';
import { MinusCircleOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons';

const { Option } = Select;

const AddEmployeeForm = ({ onAddEmployees }) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);

  const onFinish = (values) => {
    const employees = values.employees.map((employee, index) => ({
      ...employee,
      images: fileList[index]?.map(file => file.originFileObj) || [],
    }));
    onAddEmployees(employees);
    form.resetFields();
    setFileList([]);
  };

  const handleUploadChange = (index, { fileList: newFileList }) => {
    const updatedFileList = [...fileList];
    updatedFileList[index] = newFileList;
    setFileList(updatedFileList);
  };

  const handleRemove = (index, file) => {
    const updatedFileList = [...fileList];
    updatedFileList[index] = updatedFileList[index].filter(item => item.uid !== file.uid);
    setFileList(updatedFileList);
  };

  return (
    <Form form={form} onFinish={onFinish} layout="vertical">
      <Form.List name="employees">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, fieldKey, ...restField }, index) => (
              <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                <Form.Item
                  {...restField}
                  name={[name, 'fullName']}
                  fieldKey={[fieldKey, 'fullName']}
                  rules={[{ required: true, message: 'Please enter full name' }]}
                >
                  <Input placeholder="Full Name" />
                </Form.Item>
                <Form.Item
                  {...restField}
                  name={[name, 'dateOfBirth']}
                  fieldKey={[fieldKey, 'dateOfBirth']}
                  rules={[{ required: true, message: 'Please enter date of birth' }]}
                >
                  <DatePicker placeholder="Date of Birth" />
                </Form.Item>
                <Form.Item
                  {...restField}
                  name={[name, 'gender']}
                  fieldKey={[fieldKey, 'gender']}
                  rules={[{ required: true, message: 'Please select gender' }]}
                >
                  <Select placeholder="Gender">
                    <Option value="male">Male</Option>
                    <Option value="female">Female</Option>
                    <Option value="other">Other</Option>
                  </Select>
                </Form.Item>
                <Form.Item
                  {...restField}
                  name={[name, 'email']}
                  fieldKey={[fieldKey, 'email']}
                  rules={[
                    { required: true, message: 'Please enter email' },
                    { type: 'email', message: 'Please enter a valid email' }
                  ]}
                >
                  <Input placeholder="Email" />
                </Form.Item>
                <Form.Item
                  {...restField}
                  name={[name, 'phone']}
                  fieldKey={[fieldKey, 'phone']}
                  rules={[
                    { required: true, message: 'Please enter phone number' },
                    { pattern: /^0[3,4,5,6,7,8,9][0-9]{8}$/, message: 'Please enter a valid phone number (10 digits) and 0 first' }
                  ]}
                >
                  <Input placeholder="Phone" />
                </Form.Item>
                <Form.Item
                  {...restField}
                  name={[name, 'address']}
                  fieldKey={[fieldKey, 'address']}
                  rules={[{ required: true, message: 'Please enter address' }]}
                >
                  <Input placeholder="Address" />
                </Form.Item>
                <Form.Item name={[name, 'images']} fieldKey={[fieldKey, 'images']} label="Upload Images">
                  <Upload
                    multiple
                    listType="picture"
                    beforeUpload={() => false}
                    onChange={(info) => handleUploadChange(index, info)}
                    onRemove={(file) => handleRemove(index, file)}
                    fileList={fileList[index] || []}
                  >
                    <Button icon={<UploadOutlined />}>Upload</Button>
                  </Upload>
                  {fileList[index] && fileList[index].map(file => (
                    <img
                      key={file.uid}
                      src={URL.createObjectURL(file.originFileObj)}
                      alt="avatar"
                      style={{ width: '50px', height: '50px', marginTop: '10px', marginRight: '10px' }}
                    />
                  ))}
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
