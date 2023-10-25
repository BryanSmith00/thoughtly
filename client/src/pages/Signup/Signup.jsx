import "./signup.css";

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";

const Signup = () => {
  const [cookies] = useCookies([]);

  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
    username: "",
  });

  const { email, password, username } = inputValue;
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
        "http://localhost:4000/signup",
        {
          ...inputValue,
        },
        { withCredentials: true }
      );
      const { success, message } = data;

      if (success) navigate("/");
      else handleError(message);
    } catch (error) {
      console.log(error);
    }
    setInputValue({
      ...inputValue,
      email: "",
      password: "",
      username: "",
    });
  };

  return (
    <section>
      <div className="signup">
        <div className="content">
          <h2>Create Account</h2>
          <form className="form" onSubmit={handleSubmit}>
            <div className="inputBox">
              <input
                type="email"
                name="email"
                required
                value={email}
                onChange={handleOnChange}
              />{" "}
              <i>Email</i>
            </div>
            <div className="inputBox">
              <input
                type="text"
                name="username"
                minLength={1}
                maxLength={32}
                value={username}
                required
                onChange={handleOnChange}
              />{" "}
              <i>Username</i>
            </div>
            <div className="inputBox">
              <input
                type="password"
                name="password"
                minLength={8}
                maxLength={64}
                autoComplete="new-password"
                required
                value={password}
                onChange={handleOnChange}
              />{" "}
              <i>Password</i>
            </div>
            <div className="inputBox">
              <input type="submit" value="Sign up"></input>
            </div>
            <div className="links">
              <div className="already-text">Already have an account? </div>
              <Link className="login-link" to={"/login"}>
                Log in
              </Link>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Signup;
