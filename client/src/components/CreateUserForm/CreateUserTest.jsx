import React, { useState } from "react";
import axios from "axios";
import { Formik } from "formik";
import { ToastContainer, toast } from "react-toastify";
import { useHistory } from 'react-router-dom'
import { useTranslation } from "react-i18next";
import { useAuth } from "../../context/authContext";
export default function LogInForm() {
  const history = useHistory();

  const { t } = useTranslation()
  // const handleChange = (e) => {
  //   setData({ ...data, [e.target.name]: e.target.value });
  // };

  const alertSuccess = (msg) => {
    toast.success(msg, {
      position: "bottom-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      theme: "dark"
    })
  }

  const alertMailError = (msg) => {
    toast.warning(msg, {
      position: "bottom-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      theme: "dark"
    })
  }

  const { signup } = useAuth();
  const [error, setError] = useState();

    const handleSubmitt = async (values) => {
      try {
        const userCredentials = await signup(values.email, values.password);
        await axios.post(`${process.env.REACT_APP_DOMAIN}/user/register`, {
          id: userCredentials.user.uid,
          name: values.name,
          email: values.email,
        });
        alertSuccess(t("createUserTest.accountCreated"))
        setTimeout(() => {
        history.push("/login");  
        }, 2500);
        
      } catch (err) {
        if (err.code === "auth/internal-error") setError("Correo Invalido");
        if (err.code === "auth/email-already-in-use")setError("El correo ya se encuentra en uso");
      }
    };

    } catch (err) {
      if (err.code === "auth/internal-error") setError("Correo Invalido");
      if (err.code === "auth/email-already-in-use") setError("El correo ya se encuentra en uso");
    }
  };

  return (
    <div>
      <Formik
        initialValues={{
          name: "",
          email: "",
          password: "",
        }}
        validate={(values) => {
          const errors = {};
          if (!values.email) {
            errors.email = `${t("createUserTest.errors_mail")}`
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
          ) {
            errors.email = `${t("createUserTest.errors_mail_invalid")}`;
          }
          if (!values.password) {
            errors.password = `${t("createUserTest.errors_password")}`
          } else if (
            !/^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/.test(
              values.password
            )
          ) {
            errors.password = `${t("createUserTest.errors_password_invalid")}`;
          }
          if (values.password !== values.password2) {
            errors.password = `${t("createUserTest.errors_password_match")}`;
          }
          return errors;
        }}
        onSubmit={(values, { setErrors }) => {
          return handleSubmitt(values).catch(() => {
            setErrors("email", "This email is not valid");
          });
        }}
      >
        {({ errors, handleSubmit, handleChange, isSubmitting, touched }) => (
          <div className="container-login spaceNavTop">
            <div className="loginCard">
              <h2>{t("createUserTest.createAccount")}</h2>
              <form onSubmit={handleSubmit}>
                <div className="divInputUser">
                  <input
                    type="text"
                    name="name"
                    placeholder={t("createUserTest.name")}
                    onChange={handleChange}
                  />
                </div>
                <div className="divInputUser">
                  <input
                    type="text"
                    required
                    placeholder={t("createUserTest.email")}
                    name="email"
                    onChange={handleChange}
                  />
                  <small style={{ color: "red" }}>
                    {touched.email && errors.email ? (
                      <p>{errors.email}</p>
                    ) : (
                      ""
                    )}
                  </small>
                </div>
                <div className="divInputUser">
                  <input
                    type="password"
                    required
                    placeholder={t("createUserTest.password")}
                    name="password"
                    onChange={handleChange}
                  />
                </div>
                <div className="divInputUser">
                  <input
                    type="password"
                    required
                    placeholder={t("createUserTest.confirmPassword")}
                    name="password2"
                    onChange={handleChange}
                  />
                  <small style={{ color: "red" }}>
                    {touched.password && errors.password ? (
                      <p>{errors.password}</p>
                    ) : (
                      ""
                    )}
                  </small>
                </div>
                <div className="btn-login">
                  <input
                    disabled={isSubmitting}
                    type="submit"
                    value={t("createUserTest.createAccount")}
                    className="input-submit"
                  />
                </div>
              </form>
            </div>
          </div>
        )}
      </Formik>
      <ToastContainer />
    </div>
  );
};

