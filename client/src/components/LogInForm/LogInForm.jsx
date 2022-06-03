import React, { useState, useEffect } from "react";
import "./LoginForm.css";
import axios from "axios";
import { Link, Redirect } from "react-router-dom";
import { GoogleLoginButton } from "./GoogleLogin/GoogleLogin";

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
        url: `${process.env.REACT_APP_DOMAIN}/user/login`,
      });
      console.log(user);
      // const user = await axios.post(`${process.env.REACT_APP_DOMAIN}/user/login`, data, { withCredentials: true });
      // console.log("user: ", user);
      // if (user.data.passport.user) {
      //   localStorage.setItem("myUser", JSON.stringify(user.data.passport.user));
      //   setRedirect(true);
      // }


      // const user = await fetch(`${process.env.REACT_APP_DOMAIN}/user/login`, {
      //   method: 'POST',
      //   credentials: 'same-origin',
      //   body: {
      //     data: {
      //       email: data.email,
      //       password: data.password,
      //     }
      //   }
      // })
      console.log(user)
      if (user.data.passport.user) {
        localStorage.setItem("myUser", JSON.stringify(user.data.passport.user));
        setRedirect(true);
      }
    } catch (err) {
      alert(err);
    }
  };
  const checkGoogleLogin = () => {
    const params = new URLSearchParams(window.location.search); // id=123
    let id = params.get("id");
    if (id) {
      localStorage.setItem("myUser", JSON.stringify(id));
      console.log(id);
      setRedirect(true);
    }
  };

  useEffect(() => {
    // 123
    checkGoogleLogin();
  }, []);

  return (
    <div className="container-login">
      <div className="loginCard">
        {redirect ? <Redirect push to="/home" /> : null}
        <h2>Sign In</h2>

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
        <div className="createUser-container">
          <GoogleLoginButton />
          {/* <GoogleLogin
            clientId={process.env.GOOGLE_CLIENT_ID}
            buttonText="Log in with Google"
            onSuccess={handleLoginGoogle}
            onFailure={handleLoginGoogle}
            cookiePolicy={"single_host_origin"}
          /> */}
          <p>Not a user yet?</p>
          <div className="btn-createUser">
            <Link to="/createUser">Create User</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
