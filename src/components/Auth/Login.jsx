import { useState } from "react";
import "./Login.scss";
import { useNavigate } from "react-router-dom";
import { postLogin } from "../../services/apiServices";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = async () => {
    //Validate data

    //submit api

    let data = await postLogin(email, password);
    console.log("check res:", data);
    if (data && +data.EC === 0) {
      toast.success(data.EM);
      navigate("/");
    }
    if (data && +data.EC !== 0) {
      toast.error(data.EM);
    }
  };

  return (
    <div className="login-container">
      <div className="header">
        <span className="mx-3">Don't have an account yet?</span>
        <button>Sign up</button>
      </div>
      <div className="title col-4 mx-auto">Long Tran</div>
      <div className="welcome col-4 mx-auto">Hello ,who's this?</div>
      <div className="content-form col-4 mx-auto">
        <div className="form-group">
          <label htmlFor="Email">Email</label>
          <input
            type={"email"}
            className="form-control"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type={"password"}
            className="form-control"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>

        <span className="text-center">Forgot password ?</span>
        <div></div>
        <button className="btn-submit" onClick={() => handleLogin()}>
          Login to Long Tran Web
        </button>
        <div className="text-center">
          <span className="back"> &#60;&#60; Go to Homepage</span>
        </div>
      </div>
      <div className="header"></div>
      <div className="header"></div>
    </div>
  );
};

export default Login;
