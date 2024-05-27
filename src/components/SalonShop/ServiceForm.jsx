import React, { useState } from "react";
import { Form, Input, Button, Space, Upload } from "antd";
import {
  MinusCircleOutlined,
  PlusOutlined,
  UploadOutlined,
} from "@ant-design/icons";

const AddServiceForm = ({ onAddServices }) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);

  const onFinish = (values) => {
    const services = values.services.map((service) => ({
      ...service,
      image: fileList.find((file) => file.name === service.name)?.url,
    }));
    onAddServices(services);
    form.resetFields();
    setFileList([]);
  };

  const handleUploadChange = ({ fileList }) => {
    // Generate URL for preview (this is for demonstration purposes only)
    const updatedFileList = fileList.map((file) => ({
      ...file,
      url: URL.createObjectURL(file.originFileObj),
    }));
    setFileList(updatedFileList);
  };

  return (
    <Form form={form} onFinish={onFinish} layout="vertical">
      <Form.List name="services">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, fieldKey, ...restField }) => (
              <Space
                key={key}
                style={{ display: "flex", marginBottom: 8 }}
                align="baseline"
              >
                <Form.Item
                  {...restField}
                  name={[name, "name"]}
                  fieldKey={[fieldKey, "name"]}
                  rules={[
                    { required: true, message: "Please enter service name" },
                  ]}
                >
                  <Input placeholder="Service Name" />
                </Form.Item>
                <Form.Item
                  {...restField}
                  name={[name, "description"]}
                  fieldKey={[fieldKey, "description"]}
                  rules={[
                    { required: true, message: "Please enter description" },
                  ]}
                >
                  <Input placeholder="Description" />
                </Form.Item>
                <Form.Item
                  {...restField}
                  name={[name, "price"]}
                  fieldKey={[fieldKey, "price"]}
                  rules={[{ required: true, message: "Please enter price" }]}
                >
                  <Input placeholder="Price" />
                </Form.Item>
                <Form.Item
                  {...restField}
                  name={[name, "image"]}
                  fieldKey={[fieldKey, "image"]}
                >
                  <Upload
                    multiple
                    listType="picture"
                    onChange={handleUploadChange}
                    beforeUpload={() => false}
                  >
                    <Button icon={<UploadOutlined />}>Upload Image</Button>
                  </Upload>
                </Form.Item>
                <MinusCircleOutlined onClick={() => remove(name)} />
              </Space>
            ))}
            <Form.Item>
              <Button
                type="dashed"
                onClick={() => add()}
                block
                icon={<PlusOutlined />}
              >
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
