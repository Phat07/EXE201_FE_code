import { useParams } from "react-router-dom";
import AccountForm from "./AccountForm";
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  Form,
  Input,
  InputNumber,
  Select,
  DatePicker,
  Button,
  Avatar,
  Space,
  Flex,
  message,
  Popconfirm,
} from "antd";
import dayjs from "dayjs";

function AccountPage() {
  const [form] = Form.useForm();
  const { id } = useParams();
  const [user, setUser] = useState({});
  const EMPLOYEES_URL =
    "https://664db6b2ede9a2b556548a08.mockapi.io/api/salon/SalonEmployees";
  const [isEdit, setIsEdit] = useState(true);

  const confirm = (e) => {
    console.log(e);
    message.success("Click on Yes");
    onFinish(user);
  };
  const cancel = (e) => {
    console.log(e);
    message.error("Click on No");
  };

  useEffect(() => {
    axios.get(EMPLOYEES_URL).then((res) => {
      const userAccount = res.data.find((item) => item.id === id);
      setUser(userAccount);
      if (userAccount) {
        const birthDay = dayjs(userAccount.dayOfBirth); //set the value type to the value type of DatePicker component ant design, Date Library in Ant design config by dayjs library
        // console.log(birthDay, "birthDay");
        form.setFieldsValue({
          fullName: userAccount.fullName,
          email: userAccount.email,
          gender: userAccount.gender,
          phone: userAccount.phone,
          address: userAccount.address,
          dayOfBirth: birthDay,
          avatar: userAccount.avatar,
        });
      }
    });
  }, [id]);

  const onFinish = (item) => {
    const birthDay = dayjs(user.dayOfBirth);
    if (item) {
      const userUpdated = {
        fullName: item.fullName,
        email: item.email,
        gender: item.gender,
        phone: item.phone,
        address: item.address,
        dayOfBirth: birthDay,
        avatar: item.avatar,
      };
      axios
        .put(EMPLOYEES_URL, userUpdated)
        .then((res) => {
          message.success("Your account is updated!");
          console.log(res, "res neeeee");
        })
        .catch((err) => message.error(err));
    }
  };

  console.log(user, "user Ne");
  const handleEdit = () => {};

  return (
    <div>
      <div
        style={{
          marginTop: "175px",
          marginLeft: "250px",
          marginRight: "250px",
        }}
      >
        {/* <AccountForm id={id} user={user} /> */}
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button onClick={handleEdit} type="primary">
            Edit
          </Button>
        </div>
        <Flex justify="center">
          <Card className="bg-slate-100">
            <Space
              align="center"
              className="w-[80rem]"
              size={2}
              direction="vertical"
            >
              <Avatar
                size={300}
                src={
                  user?.avatar ||
                  "https://zos.alipay.com/v0/antdesign/assets/default_avatar.png"
                }
              />
              <Form
                // disabled={isEdit}
                className="w-[50rem]"
                id={id}
                form={form}
                // wrapperCol={{ span: 14, offset: 4 }}
                layout="vertical"
                onFinish={onFinish}
                autoComplete="off"
              >
                <Form.Item label="Username:" name="fullName">
                  <Input />
                </Form.Item>
                <Form.Item label="Email:" name="email">
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
                  <DatePicker />
                </Form.Item>
                <Form.Item label="Phone:" name="phone">
                  <Input />
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
            </Space>
          </Card>
        </Flex>
      </div>
    </div>
  );
}

export default AccountPage;
