import React, { useState } from "react";
import axios from "axios";

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

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, lastName, email, password } = data;
    try {
      await axios.post("http://localhost:3001/user/register", {
        name: name,
        lastname: lastName,
        email: email,
        password: password,
      });
      alert("se envio la peticion");
    } catch (err) {
      alert(err);
    }
  };
  console.log(data);
  return (
    <div className="loginCard">
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit}>
        <div className="divInputUser">
          <input
            type="text"
            name="name"
            placeholder="First Name ..."
            onChange={handleChange}
            required
            value={data.name}
          />
        </div>
        <div className="divInputUser">
          <input
            type="text"
            name="lastName"
            placeholder="Last Name ..."
            onChange={handleChange}
            required
            value={data.lastName}
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
        <div>
          <input
            type="file"
            name="profileImg"
            placeholder="Address..."
            onChange={handleChange}
            value={data.profilePic}
          />
        </div>
        <div className="divInputUser">
          <input
            type="text"
            name="address"
            placeholder="Address..."
            onChange={handleChange}
            value={data.address}
          />
        </div>
        <div className="divInputUser">
          <input
            type="text"
            name="payment"
            placeholder="Payment..."
            onChange={handleChange}
            value={data.payment}
          />
        </div>
        <div className="btn">
          <input type="submit" value="Send" />
        </div>
      </form>
    </div>
  );
}
