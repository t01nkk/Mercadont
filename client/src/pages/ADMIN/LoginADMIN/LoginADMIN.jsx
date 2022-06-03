import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, Redirect } from "react-router-dom";

export default function LoginADMIN() {
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
        url: `${process.env.REACT_APP_DOMAIN}/user/login`,
      });

      if (user.data.passport.user) {
        const idAdmin = user.data.passport.user;
        const admin = await axios.post(
          `${process.env.REACT_APP_DOMAIN}/admin/getAdmin`,
          {
            id: idAdmin,
          }
        );

        if (admin.data.isAdmin === true) {
          localStorage.setItem("myAdmin", JSON.stringify(admin));
          setRedirect(true);
        } else {
          alert("WRONG CREDENTIALS");
        }
      }
    } catch (err) {
      alert(err);
    }
  };
  useEffect(() => {
    localStorage.clear();
  }, []);
  return (
    <div className="container-login">
      <div className="loginCard">
        {redirect ? (
          <Redirect
            push
            to="/CC7E389029C4B7768A0C89DC75F304059EF9ECBA68FF02FD4BFB7FE740721F4F/admin/home"
          />
        ) : null}
        <h2>ADMIN LOG In</h2>

        <form
          onSubmit={handleLogin}
          method="POST"
          action={`${process.env.REACT_APP_DOMAIN}/user/login`}
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
          <div className="btn-login">
            <input type="submit" value="Submit" className="input-submit" />
          </div>
        </form>
      </div>
    </div>
  );
}
