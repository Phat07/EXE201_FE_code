import { useParams } from "react-router-dom";
import AccountForm from "./AccountForm";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  Form,
  Input,
  InputNumber,
  Select,
  DatePicker,
  Button,
} from "antd";
import dayjs from "dayjs";

function AccountPage() {
  const { id } = useParams();
  const [user, setUser] = useState({});
  const EMPLOYEES_URL =
    "https://664db6b2ede9a2b556548a08.mockapi.io/api/salon/SalonEmployees";

  useEffect(() => {
    axios.get(EMPLOYEES_URL).then((res) => {
      const userAccount = res.data.find((item) => item.id === id);
      setUser(userAccount);
      if (userAccount) {
        const birthDay = dayjs(userAccount.dayOfBirth);
        form.setFieldsValue({
          fullName: userAccount.fullName,
          email: userAccount.email,
          gender: userAccount.gender,
          phone: userAccount.phone,
          address: userAccount.address,
          dayOfBirth: birthDay,
        });
      }
    });
  }, [id]);

  console.log(user, "user Ne");
  const [form] = Form.useForm();
  const onFinish = (item) => {
    console.log("finish");
    console.log(item.fullName, "Username");
  };

  return (
    <div>
      <div
        style={{
          marginTop: "175px",
          marginLeft: "250px",
          marginRight: "250px",
        }}
      >
        <AccountForm id={id} user={user} />
      </div>
      <Card>
        <Form
          id={id}
          form={form}
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="Username:"
            name="fullName"
            rules={[{ required: true, message: "Please enter a username!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email:"
            name="email"
            rules={[
              {
                required: true,
                type: "email",
                message: "Please enter a valid email!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Gender:" name="gender">
            <Select>
              <Select.Option value="male">Male</Select.Option>
              <Select.Option value="female">Female</Select.Option>
              <Select.Option value="other">Other</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Day Of Birth:" name="dayOfBirth">
            <DatePicker defaultPickerValue={dateOfBirth} />
          </Form.Item>
          <Form.Item
            label="Phone:"
            name="phone"
            rules={[
              {
                pattern: /^\d+$/,
                message: "Please enter a valid phone number!",
              },
            ]}
          >
            <InputNumber />
          </Form.Item>
          <Form.Item label="Address:" name="address">
            <Input.TextArea rows={4} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}

export default AccountPage;