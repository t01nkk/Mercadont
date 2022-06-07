import React, { useState, useEffect } from "react";
import "./LoginForm.css";
import { Link, Redirect } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import axios from "axios";
import { Formik } from "formik";
export default function LogInForm() {
  const [redirect, setRedirect] = useState(false);
  const { login, loginWithGoogle, resetPassword } = useAuth();

  const handleLogin = async (values) => {
    try {
      const userCredentials = await login(values.email, values.password);
      await axios.post(`${process.env.REACT_APP_DOMAIN}/user/login`, {
        id: userCredentials.user.uid,
        name: userCredentials.user.displayName,
        email: userCredentials.user.email,
        image: userCredentials.user.photoURL,
        isVerified: userCredentials.user.emailVerified,
      });

      if (userCredentials.user.uid) {
        localStorage.setItem(
          "myUser",
          JSON.stringify(userCredentials.user.uid)
        );
        setRedirect(true);
      }
    } catch (err) {
      let error
      console.log(err)
      if (err.code === "auth/internal-error") error = ("Invalid Email");
      if (err.code === "auth/user-not-found") error = ("Email doesn't belong to a user");
      if (err.code === "auth/wrong-password") error = ("Wrong Password");


      alert(error);
    }
  };
  const handleGoogleSignin = async () => {
    try {
      const userCredentials = await loginWithGoogle();
      await axios.post(`${process.env.REACT_APP_DOMAIN}/user/login`, {
        id: userCredentials.user.uid,
        name: userCredentials.user.displayName,
        email: userCredentials.user.email,
        image: userCredentials.user.photoURL,
        isVerified: userCredentials.user.emailVerified,
      });
      if (userCredentials.user.uid)
        localStorage.setItem(
          "myUser",
          JSON.stringify(userCredentials.user.uid)
        );

      setRedirect(true);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container-login">
      <Formik
        initialValues={{
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
                  {touched.email && errors.email ? <p className="error-style">{errors.email}</p> : ""}
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
                  <p className="error-style">{errors.password}</p>
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
              {/*<div>
                <input type="submit" value="Forgot Your Password?"/>
              </div>*/}
            </form>
            <div className="createUser-container">
              <div>
                <button onClick={handleGoogleSignin} className="btn btn-primary google-plus">
                  <img height="25px" src="https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-suite-everything-you-need-know-about-google-newest-0.png" alt="Google Logo" />  Login With Google
                </button>
              </div>
              {/* 
              <GoogleLoginButton />
          <GoogleLogin
            clientId={process.env.GOOGLE_CLIENT_ID}
            buttonText="Log in with Google"
            onSuccess={handleLoginGoogle}
            onFailure={handleLoginGoogle}
            cookiePolicy={"single_host_origin"}
          /> */}
              <div className="create-container">
                <p>Not a user yet?</p>
                <div className="btn-createUser">
                  <Link to="/createUser">Create User</Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </Formik>
    </div>
  );
}
