import "./login.css";

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";

const Login = () => {
  const [cookies] = useCookies([]);

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

  useEffect(() => {
    // Protect route against logged in users, kicks back to home
    const verifyCookie = async () => {
      if (!cookies.token || cookies.token === "undefined") {
      }
      const { data } = await axios.post(
        "http://localhost:4000",
        {},
        { withCredentials: true }
      );
      if (data.status) navigate("/");
    };

    verifyCookie();
  });

  const handleError = (err) => {};

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
        }, 200);
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
                required
                value={email}
                onChange={handleOnChange}
              />
              <i>Email</i>
            </div>
            <div className="inputBox">
              <input
                type="password"
                name="password"
                minLength={8}
                maxLength={64}
                autoComplete="current-password"
                required
                value={password}
                onChange={handleOnChange}
              />
              <i>Password</i>
            </div>

            <div className="inputBox">
              <input type="submit" value="Log in"></input>
            </div>
            <div className="links">
              {" "}
              <Link className="forgot-link" to={"#"}>
                Forgot Password
              </Link>{" "}
              <Link className="signup-link" to={"/signup"}>
                Sign up
              </Link>{" "}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
