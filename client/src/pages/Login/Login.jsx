import "./login.css";

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
  });
  const { email, password } = inputValue;
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const handleError = (err) =>
    toast.error(err, {
      position: "bottom-left",
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:4000/login",
        {
          ...inputValue,
        },
        { withCredentials: true }
      );
      console.log(data);
      const { success, message } = data;
      if (success) {
        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else {
        handleError(message);
      }
    } catch (error) {
      console.log(error);
    }
    setInputValue({
      ...inputValue,
      email: "",
      password: "",
    });
  };

  return (
    <section>
      <div className="signin">
        <div className="content">
          <h2>Welcome</h2>

          <form className="form" onSubmit={handleSubmit}>

            <div className="inputBox">
              <input
                type="email"
                name="email"
                value={email}
                onChange={handleOnChange}
              />
              <i>Email</i>
            </div>
            <div className="inputBox">
              <input
                type="password"
                name="password"
                value={password}
                onChange={handleOnChange}
              />
              <i>Password</i>
            </div>
            <div class="links"> <a href="#">Forgot Password</a> <a href="/signup">Signup</a> </div>

            <div className="inputBox">
              <input type="submit" value="Log in"></input>
            </div>
          </form>

        </div>
      </div>

      <ToastContainer />
    </section>
  );
};

export default Login;
