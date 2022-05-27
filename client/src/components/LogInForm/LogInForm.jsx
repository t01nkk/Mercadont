import React, { useState } from "react";
import "./LoginForm.css";
import axios from "axios";

export default function LogInForm() {
  const [data, setData] = useState({
    // password: "",
    email: "",
  });
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState(null)


  // const handleChange = (e) => {
  //   setData({ ...data, [e.target.name]: e.target.value });
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const usere=  await axios.post("http://localhost:3001/user/login", {
        email,
        password
      });
      console.log(usere, "SOY USERE")
      setUser(usere)
      // console.log(user)
    } catch (err) {
      console.log(err)
      alert(err.response.data.error,);
    }
  };
  return (
    <div className="loginCard">
      <h2 onClick={()=>console.log(user)}>Sign In</h2>
      <form onSubmit={handleSubmit}>
        <div className="divInputUser">
          <input
            type="email"
            name="email"
            placeholder="Email ..."
            onChange={(e)=>setEmail(e.target.value)}
            required
            value={email}
          />
        </div>
        <div className="divInputUser">
          <input
            type="password"
            name="password"
            placeholder="Password..."
            onChange={(e)=>setPassword(e.target.value)}
            required
            value={password}
          />
        </div>
        <div className="btn">
          <input type="submit" value="Send" />
        </div>
      </form>
    </div>
  );
}
