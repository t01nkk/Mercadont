import React from "react";
import { useForm } from "../../helpers/useForm.js";

export default function CreateUserForm() {
  const initialForm = {
    name: "",
    surname: "",
    password: "",
    passwordVal: "",
    email: "",
    address: "",
    description: "",
  };

  const validateForm = (form) => {
    let error = {};

    if (!/^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/.test(form.name) && form.name !== "") {
      error.name = "El nombre solo puede contener caracteres alfabeticos";
    }

    if (
      !/^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/.test(form.surname) &&
      form.surname !== ""
    ) {
      error.surname = "El apellido solo puede contener caracteres alfabeticos";
    }

    if (
      !/(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{6,8}$/.test(form.password) &&
      form.password !== ""
    ) {
      error.password =
        "La contraseña debe tener entre 6 y 8 caracteres y no permite caracteres especiales";
    }

    if (form.passwordVal !== form.password && form.passwordVal !== "") {
      error.passwordVal = "Las contraseñas deben ser iguales";
    }

    if (
      !/^(\w+[/./-]?){1,}@[a-z]+[/.]\w{2,}$/.test(form.email) &&
      form.email !== ""
    ) {
      error.email = "Verifica el email";
    }

    if (!/^[A-Za-z0-9\s]+$/.test(form.address) && form.address !== "") {
      error.address =
        "La dirección solo puede contener numero y caracteres alfabeticos";
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
    <div>
      <h2>Formu</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name..."
          onChange={handleChange}
          required
          value={form.name}
          onBlur={handleBlur}
        />
        {error.name && <p>{error.name}</p>}

        <input
          type="text"
          name="surname"
          placeholder="surname..."
          onChange={handleChange}
          required
          value={form.surname}
          onBlur={handleBlur}
        />
        {error.surname && <p>{error.surname}</p>}

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

        <input
          type="password"
          name="passwordVal"
          placeholder="Repeat password..."
          onChange={handleChange}
          required
          value={form.passwordVal}
          onBlur={handleBlur}
        />
        {error.passwordVal && <p>{error.passwordVal}</p>}

        <input
          type="email"
          name="email"
          placeholder="Email..."
          onChange={handleChange}
          required
          value={form.email}
          onBlur={handleBlur}
        />
        {error.email && <p>{error.email}</p>}

        <input
          type="text"
          name="address"
          placeholder="Address..."
          onChange={handleChange}
          required
          value={form.address}
          onBlur={handleBlur}
        />
        {error.address && <p>{error.address}</p>}

        <textarea
          name="description"
          cols="s0"
          rows="5"
          placeholder="Descriptions..."
          onChange={handleChange}
          onBlur={handleBlur}
          value={form.description}
        ></textarea>

        <input type="submit" value="Send" />
        {errorSend.msg && <p>{errorSend.msg}</p>}
      </form>
    </div>
  );
}
