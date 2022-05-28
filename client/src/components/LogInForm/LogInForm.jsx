import React, { useState } from "react";
import "./LoginForm.css";
import axios from "axios";
// import loginService from "../Services/login";
export default function LogInForm() {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  // const [userLogged, setUserLogged] = useState("");

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleLogin = (e) => {
    e.preventDefault();
    const { email, password } = data;
    try {
      console.log("entre en el try");
      axios({
        method: "POST",
        data: {
          email: data.email,
          password: data.password,
        },
        withCredentials: true,
        url: "http://localhost:3001/user/login",
      }).then((res) => console.log(res));
    } catch (err) {
      alert(err);
    }
  };

  return (
    <div className="loginCard">
      <h2>Sign In</h2>

      {console.log("soy el estado USERLOGGED", data)}

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
    </div>
  );
}
