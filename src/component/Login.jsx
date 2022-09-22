import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import "./Style/Style.css";
import { Link, Redirect, useNavigate } from "react-router-dom";
import { UserContext } from '../App.js';
import Navbar from "./Navbar";

const Login = () => {
   let navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  

  const context = useContext(UserContext);
  // console.log('user', context.token);

  const handleSubmit = (e) => {
    e.preventDefault();

    let responseStatus = 0;

    fetch("https://cryptic-mesa-04392.herokuapp.com/api/v1/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((resp) => {
        console.log(resp.status === 200 ? "logged in" : "NOT logged in");
        if (resp.status === 200) responseStatus = 200;
        return resp.json();
      })
      .then((data) => {
        if (responseStatus === 200) {
          console.log("data", data);
           context.saveUser(data.user);
           navigate("/dashboard");
        }
      })
      .catch((err) => console.log("err", err));
  };

  return (
    <div>
      <Navbar name={"Sign Up"} sign={"Sign In"} path1={"/signup"} path2={"/"} />
      <div className="outer-wrapper">
        <div className="recent-posts">
          {/* <h2>Recent Interviews</h2> */}
          <p>
            Get interview insights while you manage <br />
            every step in your job search, from application to offer.{" "}
          </p>
        </div>
        <div className="login-wrapper">
          <h1>Log in:</h1>
          <form onSubmit={handleSubmit} method="POST">
            <label>
              <p>Email</p>
              <input
                value={email}
                type="email"
                // placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>
            <label>
              <p>Password</p>
              <input
                password={password}
                type="password"
                // placeholder="password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>
            <div className="loginButtonWrapper">
              <button className="loginButton" type="submit">
                Log in
              </button>
            </div>
            <p>or</p>
            <div>
              <Link to="/signup">
                <button className="signupButton" src="/Signup">
                  Sign up
                </button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
