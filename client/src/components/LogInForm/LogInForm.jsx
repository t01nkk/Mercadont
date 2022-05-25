import React from 'react'
import { useForm } from "../../helpers/useForm.js";
import "./LoginForm.css"

export default function LogInForm() {
  const initialForm = {
    password: "",
    email: "",
  };
  const validateForm = (form) => {
    let error = {};

    if (
      !/(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{6,8}$/.test(form.password) &&
      form.password !== ""
    ) {
      error.password =
        "La contraseña debe tener entre 6 y 8 caracteres y no permite caracteres especiales";
    }

    if (
      !/^(\w+[/./-]?){1,}@[a-z]+[/.]\w{2,}$/.test(form.email) &&
      form.email !== ""
    ) {
      error.email = "Verifica el email";
    }


    return error;
  };

  const {
    form,
    error,
    loading,
    errorSend,
    response,
    handleChange,
    handleBlur,
    handleSubmit,
  } = useForm(initialForm, validateForm);

  return (
    <div className='loginCard'>
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit}>   


        <div className="divInputUser">
          <input
            type="email"
            name="email"
            placeholder="Email ..."
            onChange={handleChange}
            required
            value={form.email}
            onBlur={handleBlur}
          />
          {error.email && <p>{error.email}</p>}

        </div>
        <div className="divInputUser">
          <input
            type="password"
            name="password"
            placeholder="Password..."
            onChange={handleChange}
            required
            value={form.password}
            onBlur={handleBlur}
          />
          {error.password && <p>{error.password}</p>}

        </div>
        <div className="btn">
          <input type="submit" value="Send" />
          {errorSend.msg && <p>{errorSend.msg}</p>}
        </div>

      </form>
    </div>

  )
}
