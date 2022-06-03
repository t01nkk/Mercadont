import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../context/authContext";

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

  const { signup } = useAuth();
  const [error, setError] = useState();

  const handleSubmit = async (e) => {
    setError("");
    e.preventDefault();
    const { name, lastName, email, password } = data;
    try {
      const userCredentials = await signup(email, password);
      console.log("soy el usercredentials", userCredentials);
      await axios.post(`${process.env.REACT_APP_DOMAIN}/user/register`, {
        email: email,
        password: password,
        id: userCredentials.user.uid,
      });
      console.log("pase el post uwu");
      history.push("/login");
    } catch (err) {
      if (err.code === "auth/internal-error") setError("Correo Invalido");
      if (err.code === "auth/email-already-in-use")
        setError("El correo ya se encuentra en use");
    }
  };
  console.log(data);
  return (
    <div className="container-login">
      {error && <p>{error}</p>}
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
