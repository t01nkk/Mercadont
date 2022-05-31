import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

export default function LogInForm() {
  const [data, setData] = useState({
    name: "",
    lastName: "",
    email: "",
    password: "",
    address: "",
    payment: "",
    profilePic: "",
  });
  const history = useHistory();
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, lastName, email, password } = data;
    try {
      await axios.post("http://localhost:3001/user/register", {
        email: email,
        password: password,
      });
      history.push("/login");
    } catch (err) {
      alert(err);
    }
  };
  console.log(data);
  return (
    <div className="container-login">
      <div className="loginCard">
        <h2>Create Account</h2>
        <form onSubmit={handleSubmit}>
          <div className="divInputUser">
            <input
              type="text"
              name="name"
              placeholder="First Name ..."
              onChange={handleChange}
              value={data.name}
            />
          </div>
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
          <div className="btn-login">
            <input type="submit" value="Create User" className="input-submit" />
          </div>
        </form>
      </div>
    </div>
  );
}
