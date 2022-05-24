import React from "react";
import { useForm } from "../../helpers/useForm.js";

export default function SellProductForm() {
  const initialFormProduc = {
    productName: "",
    price: "",
    status: "",
    condition: "",
    imgProducts: "",
    stocks: "",
    shipment: "",
    description: "",
  };

  const validateForm = (form) => {
    let error = {};
    if (!/^[A-Za-z0-9\s]+$/.test(form.productName) && form.productName !== "") {
      error.productName = "Only letters and numbers";
    }
    if (form.price < 0) {
      error.price = "Only positive numbers";
    }
    if (!form.imgProducts && form.imgProducts !== "") {
      error.imgProducts = "iI not can be empty";
    }
    if (form.stocks < 0) {
      error.stocks = "Only positive numbers";
    }
    if (/^.{0,255}$/.test(form.description) && form.description !== "") {
      error.description = "Max 255 characters";
    }

    return error;
  };

  const {
    form,
    error,
    errorSend,
    loading,
    response,
    handleChange,
    handleBlur,
    handleSubmit,
  } = useForm(initialFormProduc, validateForm);

  //name (solo tenga numeros y letras)
  //price (solo numero mayor a 0)
  //image (que no esta vacia)
  //details (tenga menos de 255 caracteres)
  //status (no hace falta validar)
  //stock (numero mayor a 0)
  return (
    <div>
      <h2>Formu producto</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="productName"
          placeholder="Product name"
          onChange={handleChange}
          onBlur={handleBlur}
          value={form.productName}
          required
        />
        {error.productName && <p>{error.productName}</p>}

        <input
          type="number"
          name="price"
          placeholder="Price"
          onChange={handleChange}
          onBlur={handleBlur}
          value={form.price}
          required
        />
        {error.price && <p>{error.price}</p>}

        <select
          name="status"
          onChange={handleChange}
          onBlur={handleBlur}
          value={form.status}
        >
          <option value="active">active</option>
          <option value="inactive">inactive</option>
        </select>

        <select
          name="condition"
          onChange={handleChange}
          onBlur={handleBlur}
          value={form.status}
        >
          <option value="used">used</option>
          <option value="new">new</option>
        </select>

        <input
          type="file"
          name="imgProducts"
          onChange={handleChange}
          onBlur={handleBlur}
          value={form.imgProducts}
          required
        />
        {error.imgProducts && error.imgProducts}

        <input
          type="number"
          name="stocks"
          placeholder="Stocks"
          onChange={handleChange}
          onBlur={handleBlur}
          value={form.stocks}
          required
        />
        {error.stocks && <p>{error.stocks}</p>}

        <select
          name="shipment"
          onChange={handleChange}
          onBlur={handleBlur}
          value={form.status}
        >
          <option value="pickUp">pickUp</option>
          <option value="courier">courier</option>
        </select>

        <textarea
          name="description"
          cols="20"
          rows="5"
          placeholder="Descriptions"
          onChange={handleChange}
          onBlur={handleBlur}
          value={form.description}
        ></textarea>
        {error.description && <p>{error.description}</p>}

        <input type="submit" value="Cargar Producto" />
        {errorSend.msg && <p>{errorSend.msg}</p>}
      </form>
    </div>
  );
}
