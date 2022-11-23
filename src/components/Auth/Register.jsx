import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postRegister } from "../../services/apiServices";
import { toast } from "react-toastify";
import "./Register.scss";
// AiFillEyeInvisible AiFillEye
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
const Register = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [isShowPassword, setIsShowPassword] = useState(false);
  const handleBack = () => {
    navigate("/");
  };
  const handleClickLoginBtn = () => {
    navigate("/login");
  };
  const handleRegister = async () => {
    //submit api register
    let data = await postRegister(email, password, username);
    if (data && +data.EC === 0) {
      console.log(">>> check data register", data);
      toast.success(data.EM);
      navigate("/login");
    }
    if (data && +data.EC !== 0) {
      toast.error(data.EM);
    }
  };
  return (
    <div className="register-container">
      <div className="header">
        <button onClick={() => handleClickLoginBtn()}>
          Back to login site
        </button>
      </div>
      <div className="title">Register</div>
      <div className="content-form col-4 mx-auto">
        <div className="form-group">
          <label htmlFor="">Email</label>
          <input
            type={"email"}
            className="form-control"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>

        <div className="form-group form-group-password">
          <label htmlFor="">Password</label>
          <input
            type={isShowPassword ? "text" : "password"}
            className="form-control"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <span
            className="show-password"
            onClick={() => {
              setIsShowPassword(!isShowPassword);
            }}
          >
            {isShowPassword ? <AiFillEye /> : <AiFillEyeInvisible />}
          </span>
        </div>

        <div className="form-group">
          <label htmlFor="">Username</label>
          <input
            type={"text"}
            className="form-control"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>

        <button onClick={() => handleRegister()}>Register</button>
        <div className="text-center">
          <span className="back" onClick={() => handleBack()}>
            {" "}
            &#60;&#60; Go to Homepage
          </span>
        </div>
      </div>
    </div>
  );
};

export default Register;
