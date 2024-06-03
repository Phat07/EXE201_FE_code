import React, { Suspense, useEffect, useRef, useState } from "react";
import styles from "../css/login.module.css";
import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import {
  Button,
  Modal,
  message,
  Steps,
  theme,
  Space,
  Divider,
  Card,
} from "antd";
import { motion } from "framer-motion";
import {
  BankOutlined,
  FacebookOutlined,
  GoogleOutlined,
  HomeOutlined,
  LockOutlined,
  MailOutlined,
  PhoneOutlined,
  UserOutlined,
  createFromIconfontCN,
} from "@ant-design/icons";
import { Typography } from "antd";

import {
  FooterToolbar,
  PageContainer,
  ProCard,
  ProForm,
  ProFormCheckbox,
  ProFormDatePicker,
  ProFormDateRangePicker,
  ProFormDigit,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
  ProLayout,
  StepsForm,
} from "@ant-design/pro-components";
import { IoImageOutline, IoMaleOutline } from "react-icons/io5";
import { TiUserOutline } from "react-icons/ti";
import Cut from "../models/Cut";
import Barber from "../models/Barber";
// import { ProFormInstance } from "@ant-design/pro-components";

const { Meta } = Card;
//icon
const IconFont = createFromIconfontCN({
  scriptUrl: "//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js",
});
function LoginPage(props) {
  const [status, setStatus] = useState("");
  const [selected, setSelected] = useState(false);
  const [id, setId] = useState(0);
  const [form, setForm] = useState({
    username: "",
    password: "",
  });
  const [signUp, setSignUp] = useState({
    type: "",
  });

  const phonePattern = /^0[3,4,5,6,7,8,9][0-9]{8}$/; // input 10 phone digits
  const pwdPattern = /^[A-Z][\w, \W]{7,30}/; //password minimium 8 characters
  const emailPattern = /^[a-zA-Z0-9]+[@][a-z]+[.][a-z]{2,}$/; //email match @exapmle.com

  const handleSetFormDefault = () => {
    setId(0);
    setSelected(false);
  };

  const finishForm = (values) => {
    if (values) {
      message.success("Your information is true");
      setCurrent(current + 1);
    }
  };

  const steps = [
    {
      title: "Select your role",
      content: (
        <Space direction="horizontal">
          <Card
            onClick={() => {
              setSelected(!selected), setId(1);
            }}
            hoverable
            style={{
              width: 230,
              opacity: selected === true && id == 1 ? 0.5 : 1,
            }}
            cover={
              <img
                alt="example"
                src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
              />
            }
          >
            <Meta title="Europe Street beat" description="www.instagram.com" />
          </Card>

          <Card
            onClick={() => {
              setSelected(!selected), setId(2), console.log("salon");
            }}
            hoverable
            style={{
              width: 230,
              opacity: selected === true && id == 2 ? 0.5 : 1,
            }}
            cover={
              <img
                alt="example"
                src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
              />
            }
          >
            <Meta title="Europe Street beat" description="www.instagram.com" />
          </Card>
        </Space>
      ),
    },
    {
      title: "Create Account",
      content: (
        <PageContainer>
          <ProCard>
            <ProForm
              onFinish={(values) => {
                finishForm(values);
              }}
              submitter={true}
            >
              <ProForm.Group title="Information">
                <ProFormText
                  width="md"
                  name="email"
                  label="Email"
                  placeholder="example@gmail.com"
                  fieldProps={{
                    size: "large",
                    prefix: <MailOutlined className={"prefixIcon"} />,
                  }}
                  rules={[
                    { required: true, message: "Email must be filled!" },
                    {
                      pattern: emailPattern,
                      message: "Your email must required @!",
                    },
                  ]}
                />
                <ProFormText
                  width="md"
                  name="phone"
                  label="Phone"
                  placeholder="Phone number"
                  tooltip="Phone number must include 10 digits"
                  fieldProps={{
                    size: "large",
                    prefix: <PhoneOutlined className={"prefixIcon"} />,
                  }}
                  rules={[
                    { required: true, message: "Phone number must be filled!" },
                    {
                      pattern: phonePattern,
                      message: "Phone number must include 10 digits",
                    },
                  ]}
                />
                <ProFormText
                  width="md"
                  name="username"
                  label="Username"
                  placeholder="Nguyen Van A"
                  fieldProps={{
                    size: "large",
                    prefix: <UserOutlined className={"prefixIcon"} />,
                  }}
                  rules={[
                    { required: true, message: "Username must be filled!" },
                  ]}
                />
                <ProFormText.Password
                  width="md"
                  name="password"
                  label="Password"
                  placeholder="..."
                  fieldProps={{
                    size: "large",
                    prefix: <LockOutlined className={"prefixIcon"} />,
                  }}
                  rules={[
                    { required: true, message: "Password must be filled!" },
                    {
                      pattern: pwdPattern,
                      message:
                        "Password length must from 7 to 30 characters and CAPITALIZE first character",
                    },
                  ]}
                />
                <ProFormText
                  width="md"
                  name="fullname"
                  label="FullName"
                  placeholder="Your full name..."
                  fieldProps={{
                    size: "large",
                    prefix: <UserOutlined className={"prefixIcon"} />,
                  }}
                  rules={[
                    { required: true, message: "Fullname must be filled!" },
                  ]}
                />
                <ProFormSelect
                  width="md"
                  fieldProps={{
                    size: "large",
                    prefix: <IoMaleOutline className={"prefixIcon"} />,
                  }}
                  options={[
                    { value: "male", label: "Male ♂️" },
                    { value: "female", label: "Female ♀️" },
                    { value: "other", label: "Other ♂️♀️" },
                  ]}
                  name="gender"
                  label="Choose your gender:"
                  placeholder="Your gender..."
                  rules={[
                    { required: true, message: "Your gender is required!" },
                  ]}
                />
                <ProFormDatePicker
                  width="md"
                  name="dob"
                  label="Birthday"
                  placeholder="Year of Birth"
                  fieldProps={{
                    size: "large",
                    prefix: <MailOutlined className={"prefixIcon"} />,
                  }}
                  rules={[{ required: false }]}
                />
                <ProFormText
                  width="md"
                  name="roleName"
                  label="Role Name"
                  placeholder="Customer | Barber Shop"
                  fieldProps={{
                    size: "large",
                    prefix: <UserOutlined className={"prefixIcon"} />,
                  }}
                  rules={[
                    { required: false, message: "Role name must be filled!" },
                  ]}
                  disabled={true}
                />
                <ProFormText
                  width="md"
                  name="address"
                  label="Address"
                  placeholder="27 Hang Tre"
                  fieldProps={{
                    size: "large",
                    prefix: <HomeOutlined className={"prefixIcon"} />,
                  }}
                  rules={[{ required: false }]}
                  disabled={true}
                />
                <ProFormText
                  width="md"
                  name="humanId"
                  label="Human ID"
                  placeholder="1"
                  fieldProps={{
                    size: "large",
                    prefix: <UserOutlined className={"prefixIcon"} />,
                  }}
                  rules={[
                    { required: false, message: "humanId must be filled!" },
                  ]}
                  disabled={true}
                />
                <ProFormText
                  width="md"
                  name="img"
                  label="Image"
                  placeholder="Image"
                  fieldProps={{
                    size: "large",
                    prefix: <IoImageOutline className={"prefixIcon"} />,
                  }}
                  rules={[{ required: false }]}
                />
                <ProFormText
                  width="md"
                  name="bankAccount"
                  label="Bank Account"
                  placeholder="Eric Le"
                  fieldProps={{
                    size: "large",
                    prefix: <BankOutlined className={"prefixIcon"} />,
                  }}
                  rules={[{ required: false }]}
                />
                <ProFormText
                  width="md"
                  name="bankName"
                  label="Bank Name"
                  placeholder="Sacombank"
                  fieldProps={{
                    size: "large",
                    prefix: <BankOutlined className={"prefixIcon"} />,
                  }}
                  rules={[{ required: false }]}
                />
                {/* <ProFormDateRangePicker
              width="md"
              name={["contract", "createTime"]}
              label="合同生效时间"
            /> */}
              </ProForm.Group>
            </ProForm>
          </ProCard>
        </PageContainer>
      ),
    },
    {
      title: "Finally",
      content: (
        <Typography>
          <Typography.Title>Term Liences</Typography.Title>
          <Typography.Text>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Debitis
            recusandae illo praesentium quod! Corrupti facilis architecto eos
            excepturi ipsam. Perspiciatis quaerat optio iure beatae at obcaecati
            excepturi harum nesciunt adipisci?
          </Typography.Text>
        </Typography>
      ),
    },
  ];
  console.log(ProForm.values, "hello");
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setStatus("Take 001");
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);
  const next = () => {
    setCurrent(current + 1);
  };
  const prev = () => {
    setCurrent(current - 1);
  };
  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
  }));
  const contentStyle = {
    lineHeight: "260px",
    textAlign: "center",
    color: token.colorTextTertiary,
    backgroundColor: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: `1px dashed ${token.colorBorder}`,
    marginTop: 16,
  };

  console.log("form", form);

  console.log(selected, "selected");
  console.log(id, "Id");

  useEffect(() => {
    if (id == 0) {
      setId(0);
    } else if (id != 1) {
      setId(2);
      setSelected(true);
    } else if (id != 2) {
      setId(1);
      setSelected(true);
    }
  }, [id, selected]);

  return (
    <div className={styles.container}>
      <>
        <Canvas style={{ width: "1000px", height: "600px", overflow: "hidden" }}>
          <Environment preset="warehouse" />
          <directionalLight intensity={0.5} />
          <ambientLight intensity={2} position={[-1, 1, 3]} />
          <OrbitControls />
          <Suspense fallback={null}>
            {/* <Dragon intensity={0.5} scale={5} position={[-1, -2.5, -2]}  /> */}
            {/* <ShopHair intensity={0.5} scale={0.2}/> */}
            {/* <ButterFlies
              intensity={0.5}
              scale={2.5}
              position={[-1, -2.5, -2]}
              action={status}
            /> */}
            <Cut intensity={0.5}
              scale={1}
              position={[1.5, 1.5, -2]}
              action={status}/>
            {/* <Barber intensity={0.5}
              scale={0.03}
              position={[-7.5, 2.5, -3]}
              action={status}/> */}
          </Suspense>
        </Canvas>
      </>
      <div className={styles.square}>
        <i style={{ "--clr": "#00ff0a" }}></i>
        <i style={{ "--clr": "#ff0057" }}></i>
        <i style={{ "--clr": "#fffd44" }}></i>
        <div className={styles.login}>
          <h2>Login</h2>
          <div className={styles.inputBx}>
            <input
              type="text"
              onChange={handleChange}
              name="username"
              placeholder="Username"
            />
          </div>
          <div className={styles.inputBx}>
            <input
              type="password"
              onChange={handleChange}
              name="password"
              placeholder="Password"
            />
          </div>
          <div className={styles.inputBx}>
            <input type="submit" placeholder="Submit" defaultValue="Sign in" />
          </div>
          <div className={styles.links}>
            <a href="#">Forget Password</a>
            <a href="#">
              <>
                <Button
                  style={{ color: "white", fontSize: 17, padding: "0 20px" }}
                  type="none"
                  onClick={showModal}
                >
                  Signup
                </Button>
                <Modal
                  title="Sign Up"
                  open={isModalOpen}
                  onOk={handleOk}
                  onCancel={() => {
                    handleCancel(), handleSetFormDefault();
                  }}
                >
                  <motion.p
                    variants={{
                      hidden: { y: "-100vh", opacity: 0 },
                      visible: {
                        y: "-1px",
                        opacity: 1,
                        transition: {
                          delay: 0.5,
                          type: "spring",
                          stiffness: 500,
                        },
                      },
                    }}
                    initial="hidden"
                    animate="visible"
                  >
                    Join with us...❤️
                  </motion.p>
                  <Steps current={current} items={items} />
                  <div style={contentStyle}>{steps[current].content}</div>
                  {/* <ProLayout title={false}>{steps[current].content}</ProLayout> */}
                  <div
                    style={{
                      marginTop: 24,
                    }}
                  >
                    {current < steps.length - 1 && current < 1 && (
                      <Button type="primary" onClick={() => next()}>
                        Next
                      </Button>
                    )}
                    {current > 0 && current < 2 && (
                      <Button
                        style={{
                          margin: "0 8px",
                        }}
                        onClick={() => prev()}
                      >
                        Previous
                      </Button>
                    )}
                  </div>

                  <motion.div
                    variants={{
                      hidden: { y: "-100vh", opacity: 0 },
                      visible: {
                        y: "-1px",
                        opacity: 1,
                        transition: {
                          delay: 0.5,
                          type: "spring",
                          stiffness: 500,
                        },
                      },
                    }}
                    initial="hidden"
                    animate="visible"
                  >
                    <Divider>
                      <Typography.Title level={5}>Login as...</Typography.Title>
                    </Divider>
                    <Space size={3} className="flex justify-center">
                      <Button
                        className="bg-[#f5f5f5ee] hover:bg-blue-500 text-black"
                        type="primary"
                        shape="circle"
                      >
                        <GoogleOutlined />
                      </Button>
                      <Button
                        className="bg-[#f5f5f5ee] hover:bg-blue-500 text-black"
                        type="primary"
                        shape="circle"
                      >
                        <IconFont type="icon-facebook" />
                      </Button>
                    </Space>
                  </motion.div>
                </Modal>
              </>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
