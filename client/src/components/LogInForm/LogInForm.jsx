import React, { useState } from "react";
import "./LoginForm.css";
import axios from "axios";

export default function LogInForm() {
  const [data, setData] = useState({
    password: "",
    email: "",
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = data;
    try {
      await axios.post("http://localhost:3001/user/login", {
        email: email,
        password: password,
      });
    } catch (err) {
      alert(err.response.data.error);
    }
  };
  console.log(data);
  return (
    <div className="loginCard">
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit}>
        <div className="divInputUser">
          <input
            type="email"
            name="email"
            placeholder="Email ..."
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
          <input type="submit" value="Send" />
        </div>
      </form>
    </div>
  );
}
