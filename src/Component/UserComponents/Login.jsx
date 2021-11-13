import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { signin } from "../../redux/actions/userAction";
import { useDispatch, useSelector } from "react-redux";

import LoadingBox from "../utilityComponents/LoadingBox";
import MessageBox from "../utilityComponents/MessageBox";

import "./login.scss";

function Login(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const redirect = props.location.search
    ? props.location.search.split("=")[1]
    : "/";

  const dispatch = useDispatch();
  const userSignin = useSelector((state) => state.userSignin);

  const { loading, error, userInfo } = userSignin;

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(signin(username, password));
  };

  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect);
    }
  }, [props.history, redirect, userInfo]);

  return (
    <div className="container-login">
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <span className="login-form-title">Welcome</span>
          <span className="login-form-title ">
            <span className="bg-font">Login</span>
          </span>

          {loading && <LoadingBox></LoadingBox>}
          {error && <MessageBox variant="danger">{error}</MessageBox>}
          <div className="wrap-input">
            <input
              className="input100"
              type="text"
              required
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
            />
            <span class="focus-input100" data-placeholder="Username"></span>
          </div>

          <div className="wrap-input">
            <input
              className="input100"
              type="password"
              required
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="wrap-form-btn">
            <button className="form-btn" type="submit">
              LOGIN
            </button>
          </div>

          <div className="wrap-msg">
            <span>
              Don't have an account?<Link to="/register"> Sign Up</Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
