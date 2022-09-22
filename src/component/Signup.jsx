import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
   const navigate=useNavigate()
  const handleSubmit = (e) => {
    e.preventDefault();

    let responseStatus = 0;
    // check if passwords match before submit
    if (password !== password2) {
      alert("password does not match");
    } else {
      fetch("https://cryptic-mesa-04392.herokuapp.com/api/v1/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
        name,
        email,
        password
        }),
      })
        .then((resp) => {
          console.log(resp.status === 201 ? "logged in" : "NOT logged in");
          console.log(resp)
          if (resp.status === 201) responseStatus = 201;
          return resp.json();
        })
        .then((data) => {
          if (responseStatus === 201) {
            console.log("data", data);
            navigate("/")
          }
        })
        .catch((err) => console.log("err", err));
    }
  };

  return (
    <div>
      <Navbar
        name={"Sign Up"}
        sign={"Sign In"}
        path1={"/signup"}
        path2={"/"}
      />
      <div>
        <div id="sign-up" className="login-wrapper">
          <form onSubmit={handleSubmit} id="list">
            <h1>Create an Account</h1>
            Name
            <li>
              <input
                type="text"
                placeholder="Ex: John"
                id="firstname"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="inputSignUp"
              />
            </li>
            Email Address
            <li>
              <input
                type="email"
                placeholder="Ex: johndoe@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="inputSignUp"
              />
            </li>
            Password
            <li>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="inputSignUp"
              />
            </li>
            Re-enter password
            <li>
              <input
                type="password"
                value={password2}
                onChange={(e) => setPassword2(e.target.value)}
                required
                className="inputSignUp"
              />
            </li>
            <input type="submit" value="Create Account" />
            <button onClick={() => navigate("/")}>Back</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
