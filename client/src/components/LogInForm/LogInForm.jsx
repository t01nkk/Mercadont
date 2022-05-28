import React, { useState } from "react";
import "./LoginForm.css";
import axios from "axios";
// import loginService from "../Services/login";
export default function LogInForm() {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [userLogged, setUserLogged] = useState(null);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = data;
    try {
      console.log("entre en el try");
      const user = await axios.post("http://localhost:3001/user/login", data);

      setUserLogged(user);
    } catch (err) {
      alert(err);
    }
  };
  console.log(data);
  return (
    <div className="loginCard">
      <h2>Sign In</h2>

      {console.log(data, "soy data")}
      {console.log(userLogged, " Soy user")}

      <form onSubmit={handleLogin}>
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
          <input type="submit" value="submit" />
        </div>
      </form>
    </div>
  );
}
