import React, { useState, useEffect } from "react";
import "./LoginForm.css";
import { Link, Redirect } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import axios from "axios";
import { Formik } from "formik";
import { GoogleLoginButton } from "./GoogleLogin/GoogleLogin";
export default function LogInForm() {
  const [redirect, setRedirect] = useState(false);
  const { login } = useAuth();

  const handleLogin = async (values) => {
    try {
      
      const userCredentials = await login(values.email, values.password);
      console.log("User Credentials:");

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
  return (
    <div className="container-login">
      <Formik
        initialValues={{
          name: "",
          email: "",
          password: "",
        }}
        validate={(values) => {
          const errors = {};
          if (!values.email) {
            errors.email = "Required email";
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
          ) {
            errors.email = "Invalid email";
          }
          if (!values.password) {
            errors.password = "Password required.";
          } else if (
            !/^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/.test(values.password)
          ) {
            errors.password =
              "Your password must be 8 to 16 characters long and must contain both uppercase and lowercase letters, and at least one number.";
          }

          return errors;
        }}
        onSubmit={(values, { setErrors }) => {
          return handleLogin(values).catch(() => {
            setErrors("email", "This email is not valid");
          });
        }}
      >
        {({ errors, handleSubmit, handleChange, isSubmitting, touched }) => (
          <div className="loginCard">
            {redirect ? <Redirect push to="/home" /> : null}
            <h2>Log In</h2>
            <form onSubmit={handleSubmit}>
              <div className="divInputUser">
                <input
                  type="text"
                  required
                  placeholder="Email ..."
                  name="email"
                  onChange={handleChange}
                />
                <small style={{ color: "red" }}>
                  {touched.email && errors.email ? <p>{errors.email}</p> : ""}
                </small>
              </div>
              <div className="divInputUser">
                <input
                  type="password"
                  required
                  placeholder="Password..."
                  name="password"
                  onChange={handleChange}
                />
              </div>
              <small style={{ color: "red" }}>
                {touched.password && errors.password ? (
                  <p>{errors.password}</p>
                ) : (
                  ""
                )}
              </small>

              <div className="btn-login">
                <input
                  disabled={isSubmitting}
                  type="submit"
                  value="Log In"
                  className="input-submit"
                />
              </div>
            </form>
            <div className="createUser-container">
              {/* <button onClick={handleGoogleLogin}> Login With Google</button> */}
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
        )}
      </Formik>
    </div>
  );
}
