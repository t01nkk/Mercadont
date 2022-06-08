import React, { useState } from "react";
import axios from "axios";
import { Formik } from "formik";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import "./CreateUserForm.css";
import { toast, ToastContainer } from "react-toastify";
export default function LogInForm() {
  const history = useHistory();
  // const handleChange = (e) => {
  //   setData({ ...data, [e.target.name]: e.target.value });
  // };

  const { signup } = useAuth();
  const [error, setError] = useState();
  let errMsg = "";
  const errorAlert = () => {
    toast.error(errMsg, {
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };
  const handleSubmitt = async (values) => {
    try {
      const userCredentials = await signup(values.email, values.password);
      await axios.post(`${process.env.REACT_APP_DOMAIN}/user/register`, {
        id: userCredentials.user.uid,
        name: values.name,
        email: values.email,
      });
      history.push("/login");
    } catch (err) {
      if (err.code === "auth/internal-error") {
        errMsg = "Invalid Email. Please Try Again";
      }

      if (err.code === "auth/email-already-in-use") {
        errMsg = "The email is already in use. Please Try Again";
      }
      errorAlert();
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
              "Your password must be 8 to 16 characters long long and must contain both uppercase and lowercase letters, and at least one number.";
          }
          if (values.password !== values.password2) {
            errors.password = "Password must be the same";
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
          <div className="container-login">
            <div className="loginCard">
              <h2>Create Account</h2>
              <form onSubmit={handleSubmit}>
                <div className="divInputUser">
                  <input
                    type="text"
                    name="name"
                    placeholder="First Name ..."
                    onChange={handleChange}
                  />
                </div>
                <div className="divInputUser">
                  <input
                    type="text"
                    required
                    placeholder="Email ..."
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
                    placeholder="Password..."
                    name="password"
                    onChange={handleChange}
                  />
                </div>
                <div className="divInputUser">
                  <input
                    type="password"
                    required
                    placeholder="Confirm Password..."
                    name="password2"
                    onChange={handleChange}
                  />
                  <small style={{ color: "red" }}>
                    {touched.password && errors.password ? (
                      <p className="error-style">{errors.password}</p>
                    ) : (
                      ""
                    )}
                  </small>
                </div>
                <div className="btn-login">
                  <input
                    disabled={isSubmitting}
                    type="submit"
                    value="Create User"
                    className="input-submit-create"
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
}
