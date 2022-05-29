import React, { useState, useEffect } from "react";
import "./LoginForm.css";
import axios from "axios";
import { Link, Redirect } from "react-router-dom";
// import loginService from "../Services/login";

export default function LogInForm() {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const [redirect, setRedirect] = useState(false);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      console.log("entre en el try");
      const user = await axios({
        method: "POST",
        data: {
          email: data.email,
          password: data.password,
        },
        withCredentials: true,
        url: "http://localhost:3001/user/login",
      });
      if (user.data.passport.user) {
        localStorage.setItem("myUser", JSON.stringify(user.data.passport.user));
        setRedirect(true);
      }
    } catch (err) {
      alert(err);
    }
  };

  return (
    <div className="loginCard">
      {redirect ? <Redirect push to="/home" /> : null}
      <h2>Sign In</h2>

      <form
        onSubmit={handleLogin}
        method="POST"
        action="http://localhost:3001/user/login"
      >
        <div className="divInputUser">
          <input
            type="email"
            name="email"
            placeholder="email ..."
            onChange={handleChange}
            required
            value={data.email}
          />
        </div>
        <div className="divInputUser">
          <input
            type="password"
            name="password"
            placeholder="Password..."
            onChange={handleChange}
            required
            value={data.password}
          />
        </div>
        <div className="btn">
          <input type="submit" value="Submit" />
        </div>
      </form>
      <div>
        Not a user yet?
        <div className="btn">
          <Link to="/createUser">Create User</Link>
        </div>
      </div>
    </div>
  );
}
