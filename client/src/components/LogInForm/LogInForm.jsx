import React, { useState, useEffect } from "react";
import "./LoginForm.css";
import { Link, Redirect } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import axios from "axios";
import { Formik } from "formik";
import { GoogleLoginButton } from "./GoogleLogin/GoogleLogin";
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
      alert(err);
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

  //RESET PASSWORD FORMIK
  /*
 const handleResetPassword = async (values)=>{
   console.log(values.email)
   if (!values.email) return console.log("Please Enter Your Email")
   try {
    await resetPassword(values.email)
     alert("Check your email inbox to reset your password")
   }
   catch (err){
     alert(err.message)
   }
 }
*/

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
              <button
                onClick={handleGoogleSignin}
                className="btn btn-primary google-plus"
              >
                Login With Google
              </button>
              {/* 
              <GoogleLoginButton />
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
