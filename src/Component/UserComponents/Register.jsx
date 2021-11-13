import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { USER_REGISTER_RESET } from "../../redux/actionConstants/userConstants";
import { register } from "../../redux/actions/userAction";
import LoadingBox from "../utilityComponents/LoadingBox";
import MessageBox from "../utilityComponents/MessageBox";

function Register(props) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const userRegister = useSelector((state) => state.userRegister);
  const userSignin = useSelector((state) => state.userSignin);

  const { loading, error, registerInfo } = userRegister;
  const { userInfo } = userSignin;
  const redirect = props.location.search
    ? props.location.search.split("=")[1]
    : "/";

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(register(username, email, password));
    e.target.reset();

    setTimeout(() => {
      dispatch({ type: USER_REGISTER_RESET });
    }, 5000);
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
          <span className="login-form-title p-b-48">
            <span className="bg-font">Register</span>
          </span>
          {loading && <LoadingBox></LoadingBox>}
          {error &&
            error.map((e, i) => (
              <MessageBox key={i} variant="danger">
                {e.param ? e.param + " " + e.msg : e.msg}
              </MessageBox>
            ))}
          {registerInfo && (
            <MessageBox variant="success">{registerInfo}</MessageBox>
          )}
          <div className="wrap-input">
            <input
              className="input100"
              type="text"
              required
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="wrap-input">
            <input
              className="input100"
              type="email"
              required
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
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
              REGISTER
            </button>
          </div>

          <div className="wrap-msg">
            <span>
              Already have an account?<Link to="/login"> Login</Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
