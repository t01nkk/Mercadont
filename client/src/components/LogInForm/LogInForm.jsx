import React, { useState, useEffect } from "react";
import "./LoginForm.css";
import axios from "axios";
import { Link, Redirect, useHistory } from "react-router-dom";
import { getFavorites } from "../../redux/actions/actions";
import { useStore } from "../../context/store.js";
import { GoogleLoginButton } from "./GoogleLogin/GoogleLogin";

export default function LogInForm() {
  const [state, dispatch] = useStore();
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [redirect, setRedirect] = useState(false);
  const history = useHistory()
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
      console.log(user.data);
      if (user.data.passport.user) {
        localStorage.setItem("myUser", JSON.stringify(user.data.passport.user));
        getFavorites(dispatch,user.data.passport.user)
        history.push("/")
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
        {/* {redirect ? <Redirect push to="/" /> : null} */}
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
          <GoogleLoginButton setRedirect={setRedirect} />
          {/* <GoogleLogin
            clientId="167880420540-7d29u3ge9nn3r9lvsvji6s202i5iku5c.apps.googleusercontent.com"
            buttonText="Login"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
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