import React, { Suspense, useState } from "react";
import "../css/login.css";
import { Canvas } from "@react-three/fiber";
import Dragon from "../models/Dragon";
import ShopHair from "../models/ShopHair";
import { Environment, OrbitControls } from "@react-three/drei";
import ButterFlies from "../models/ButterFlies";
function LoginPage(props) {
  const [status, setStatus] = useState("");
  const [form, setForm] = useState({
    username: "",
    password: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setStatus('Take 001')
  };
  console.log("form",form);
  return (
    <div className="container">
      <>
        <Canvas style={{ width: "700px", height: "600px", overflow:"hidden" }}>
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
            <input type="submit" defaultValue="Sign in" />
          </div>
          <div className="links">
            <a href="#">Forget Password</a>
            <a href="#">Signup</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
