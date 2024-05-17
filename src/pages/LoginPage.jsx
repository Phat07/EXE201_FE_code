import React, { Suspense, useEffect, useState } from "react";
import styles from "../css/login.module.css";
import { Canvas } from "@react-three/fiber";
import Dragon from "../models/Dragon";
import ShopHair from "../models/ShopHair";
import { Environment, OrbitControls } from "@react-three/drei";
import ButterFlies from "../models/ButterFlies";
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
  FacebookOutlined,
  GoogleOutlined,
  createFromIconfontCN,
} from "@ant-design/icons";
import { Typography } from "antd";

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

  const handleSetFormDefault = () => {
    setId(0);
    setSelected(false);
  };

  const steps = [
    {
      title: "First",
      content: (
        <Space direction="horizontal">
          <Card
            id="1"
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
              setSelected(!selected), setId(2);
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
      title: "Second",
      content: "Second-content",
    },
    {
      title: "Last",
      content: "Last-content",
    },
  ];

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
        <Canvas style={{ width: "700px", height: "600px", overflow: "hidden" }}>
          <Environment preset="apartment" />
          <directionalLight intensity={0.5} />
          <ambientLight intensity={2} position={[-1, 1, 3]} />
          <OrbitControls />
          <Suspense fallback={null}>
            {/* <Dragon intensity={0.5} scale={5} position={[-1, -2.5, -2]}  /> */}
            {/* <ShopHair intensity={0.5} scale={0.2}/> */}
            <ButterFlies
              intensity={0.5}
              scale={2.5}
              position={[-1, -2.5, -2]}
              action={status}
            />
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
                  <div
                    style={{
                      marginTop: 24,
                    }}
                  >
                    {current < steps.length - 1 && (
                      <Button type="primary" onClick={() => next()}>
                        Next
                      </Button>
                    )}
                    {current === steps.length - 1 && (
                      <Button
                        type="primary"
                        onClick={() => message.success("Processing complete!")}
                      >
                        Done
                      </Button>
                    )}
                    {current > 0 && (
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
