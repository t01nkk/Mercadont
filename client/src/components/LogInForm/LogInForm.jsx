import React, { useState } from "react";
import "./LoginForm.scss";
import { Link, Redirect } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { Formik } from "formik";
import { alertError, alertSuccess } from "../../helpers/toast";
import { ToastContainer } from "react-toastify";
export default function LogInForm() {
  let errorMsg = "";
  const { t } = useTranslation();
  const [redirect, setRedirect] = useState(false);
  const { login, loginWithGoogle, resetPassword } = useAuth();

  const handleLogin = async (values) => {
    try {
      const userCredentials = await login(values.email, values.password);

      //////////DESCOMENTAR PARA ACTIVAR VERIFICACION POR EMAIL ///////////////////////////////

      if (userCredentials.user.emailVerified) {
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
        //////////DESCOMENTAR PARA ACTIVAR VERIFICACION POR EMAIL ///////////////////////////////
      } else {
        console.log("Check your mail box for the authentification email")
      }
    } catch (err) {
      // console.log(err);
      if (err.code === "auth/internal-error") errorMsg = "Invalid Email";
      if (err.code === "auth/user-not-found")
        errorMsg = "Email doesn't belong to a user";
      if (err.code === "auth/wrong-password") errorMsg = "Wrong Password";
      alertError(errorMsg);
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
      alertSuccess(t("logInForm.loggedIn"))
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
            errors.email = `${t("logInForm.errors_mail_required")}`;
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
          ) {
            errors.email = `$${t("logInForm.errors_mail_invalid")}`;
          }
          if (!values.password) {
            errors.password = `$${t("logInForm.errors_password")}`;
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
            <p className="login-welcome">{t("logInForm.logIn")}</p>
            <form onSubmit={handleSubmit}>
              <div className="divInputUser">
                <input
                  type="text"
                  required
                  placeholder={t("logInForm.mail")}
                  name="email"
                  onChange={handleChange}
                />
                <small style={{ color: "red" }}>
                  {touched.email && errors.email ? (
                    <p className="error-style">{errors.email}</p>
                  ) : (
                    ""
                  )}
                </small>
              </div>
              <div className="divInputUser">
                <input
                  type="password"
                  required
                  placeholder={t("logInForm.password")}
                  name="password"
                  onChange={handleChange}
                />
              </div>
              <small style={{ color: "red" }}>
                {touched.password && errors.password ? (
                  <p className="error-style">{errors.password}</p>
                ) : null}
              </small>

              <div className="btn-login">
                <input
                  disabled={isSubmitting}
                  type="submit"
                  value={t("logInForm.submit")}
                  className="input-submit-login"
                />
              </div>
              {/*<div>
                <input type="submit" value="Forgot Your Password?"/>
              </div>*/}
            </form>
            <div className="createUser-container">
              <div>
                <button
                  onClick={handleGoogleSignin}
                  className="btn btn-primary google-plus"
                >
                  <img
                    height="25px"
                    src="https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-suite-everything-you-need-know-about-google-newest-0.png"
                    alt="Google Logo"
                  />{" "}
                  {t("logInForm.logInGoogle")}
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
                <p>{t("logInForm.notUser")}</p>
                <div className="btn-createUser">
                  <Link to="/createUser">{t("logInForm.newUser")}</Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </Formik>
    </div>
  );
}
