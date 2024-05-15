import React, { Suspense, useState } from "react";
import "../css/login.css";
import { Canvas } from "@react-three/fiber";
import Dragon from "../models/Dragon";
import ShopHair from "../models/ShopHair";
import { Environment, OrbitControls } from "@react-three/drei";
import ButterFlies from "../models/ButterFlies";
import { Button, Modal, message, Steps, theme } from "antd";
import { motion } from "framer-motion";

const steps = [
  {
    title: "First",
    content: (
      <>
        <div>hello</div>
      </>
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
function LoginPage(props) {
  const [status, setStatus] = useState("");
  const [form, setForm] = useState({
    username: "",
    password: "",
  });
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
  return (
    <div className="container">
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
      <div className="square">
        <i style={{ "--clr": "#00ff0a" }}></i>
        <i style={{ "--clr": "#ff0057" }}></i>
        <i style={{ "--clr": "#fffd44" }}></i>
        <div className="login">
          <h2>Login</h2>
          <div className="inputBx">
            <input
              type="text"
              onChange={handleChange}
              name="username"
              placeholder="Username"
            />
          </div>
          <div className="inputBx">
            <input
              type="password"
              onChange={handleChange}
              name="password"
              placeholder="Password"
            />
          </div>
          <div className="inputBx">
            <input type="submit" placeholder="Submit" defaultValue="Sign in" />
          </div>
          <div className="links">
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
                  title="Basic Modal"
                  open={isModalOpen}
                  onOk={handleOk}
                  onCancel={handleCancel}
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
                    Some contents...
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
