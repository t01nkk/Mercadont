import React, { useState, useEffect } from "react";
import "./LoginForm.css";
// import axios from "axios";
// import { Link, Redirect, useHistory } from "react-router-dom";
import { Link, Redirect } from "react-router-dom";
// import { getFavorites } from "../../redux/actions/actions";
// import { useStore } from "../../context/store.js";
// import { GoogleLoginButton } from "./GoogleLogin/GoogleLogin";
import { useAuth } from "../../context/authContext";

export default function LogInForm() {
  // const [state, dispatch] = useStore();
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [redirect, setRedirect] = useState(false);

  // const history = useHistory();
  const { login } = useAuth();

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredentials = await login(data.email, data.password);
      console.log("User Credentials:");
      /*const user = await axios({
        method: "POST",
        data: {
          email: data.email,
          password: data.password,
        },
        withCredentials: true,
        url: `${process.env.REACT_APP_DOMAIN}/user/login`,
      });*/

      if (userCredentials.user.uid) {
        localStorage.setItem(
          "myUser",
          JSON.stringify(userCredentials.user.uid)
        );
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

  const handleGoogleLogin = async (e) => {};

  return (
    <div className="container-login">
      <div className="loginCard">
        {redirect ? <Redirect push to="/" /> : null}
        <h2>Sign In</h2>

        <form onSubmit={handleLogin}>
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
          <button onClick={handleGoogleLogin}> Login With Google</button>
          {/* <GoogleLoginButton />
          <GoogleLogin
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