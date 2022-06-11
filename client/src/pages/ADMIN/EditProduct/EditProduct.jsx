import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";
import { useStore } from "../../../context/store.js";
import { fetchCategories } from "../../../redux/actions/actions.js";
import "./EditProduct.css";
import { alertInfo, alertSuccess } from "../../../helpers/toast.js";
import { useTranslation } from "react-i18next";
export default function EditProduct() {
  const { t } = useTranslation()
  const [state, dispatch] = useStore();
  const [errors, setErrors] = useState({});
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    image: "",
    categories: [],
    status: "",
  });
  const expression = {
    nameExpression: /^[a-zA-ZÀ-ÿ\s]{1,40}$/,
    priceExpression: /^\d{1,14}$/,
    descriptionExpression: /^[a-zA-ZÀ-ÿ\s]{1,200}$/,
    stockExpression: /^\d{1,14}$/,
  };

  function validator(input) {
    let errors = {};

    if (!expression.nameExpression.test(input.name)) {
      errors.name = `{t("adminSellProduct.errors.name")}`;
    }
    if (!expression.priceExpression.test(input.price)) {
      errors.price = `{t("adminSellProduct.errors.price")}`;
    }
    if (!expression.descriptionExpression.test(input.description)) {
      errors.description = `{t("adminSellProduct.errors.description")}`;
    }
    if (!expression.stockExpression.test(input.stock)) {
      errors.stock = `{t("adminSellProduct.errors.stock")}`;
    }
    return errors;
  }

  const handleChangeName = (e) => {
    setErrors("");
    setErrors(validator({ ...product, [e.target.name]: e.target.value }));

    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleChangePrice = (e) => {
    setErrors("");
    setErrors(validator({ ...product, [e.target.name]: e.target.value }));

    setProduct({ ...product, [e.target.name]: e.target.value });
  };
  const handleChangeDescription = (e) => {
    setErrors("");
    setErrors(validator({ ...product, [e.target.name]: e.target.value }));

    setProduct({ ...product, [e.target.name]: e.target.value });
  };
  const handleChangeStock = (e) => {
    setErrors("");
    setErrors(validator({ ...product, [e.target.name]: e.target.value }));

    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleDeleteCat = (name, event) => {
    event.preventDefault();
    const filterCat = product.categories.filter((cat) => cat !== name);
    setProduct({ ...product, categories: filterCat });
  };
  const handleChangeCat = (e) => {
    const { value } = e.target;
    if (!product.categories.includes(value)) {
      setProduct({
        ...product,
        categories: [...product.categories, value],
      });
    }
  };
  let { id } = useParams();

  const fetchProductById = async () => {
    let fetchedProduct = await axios.get(
      `${process.env.REACT_APP_DOMAIN}/product/${id}`
    );
    const destructuringCats = [];
    const { categories } = fetchedProduct.data;
    for (const cats of categories) {
      const { name } = cats;
      destructuringCats.push(name);
    }
    fetchedProduct.data.categories = destructuringCats;
    setProduct(fetchedProduct.data);
   
  };

  useEffect(() => {
    fetchProductById();
    fetchCategories(dispatch);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, description, price, stock, image, categories, status } =
      product;
    try {
      await axios.put(
        `${process.env.REACT_APP_DOMAIN}/product/update/${id}`,
        {
          name,
          description,
          price,
          stock,
          image,
          status,
          categories,
        }
      );
      alertSuccess(t("adminEditProduct.updated"))
      setTimeout(() => {
          alert("Acá debería redirigir.")
      }, 2000);
    } catch (err) {
      console.log(err);
    }
  };
  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };
  const handleDelete = async () => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_DOMAIN}/product/delete/${id}`
      );
      alertInfo(t("adminEditProduct.delete"))
      setTimeout(() => {
        alert('Acá tendría que redireccionar.')
      }, 2000);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="container-edit-admin">
      {product && console.log(product)}
      <div className="delete-product">
        <button onClick={handleDelete}>{t("adminEditProduct.deleteProduct")}</button>
      </div>
      <form onSubmit={handleSubmit} className="form-edit-admin">
        <input
          type="submit"
          name="Update info"
          value={t("adminEditProduct.update")}
          className="btn-update-info"
        />

        <img src={`${product.image}`} alt="" className="img-product" />
        <div></div>
        <div className="divInputadmin">
          <div className="duo-inputs">
            <p>{t("adminSellProduct.name")}</p>
            <input
              type="text"
              name="name"
              value={product.name}
              onTouchStart={handleChangeName}
              onChange={handleChangeName}
            />
            {errors.name && <p className="error-input">{errors.name}</p>}{" "}
            <p>{t("adminSellProduct.price")}</p>
            <input
              type="number"
              name="price"
              onTouchStart={handleChangePrice}
              value={product.price}
              onChange={handleChangePrice}
            />
            {errors.price && <p className="error-input">{errors.price}</p>}
          </div>
          <div className="duo-inputs">
            <p>{t("adminSellProduct.stock")}</p>
            <input
              type="number"
              name="stock"
              value={product.stock}
              onChange={handleChangeStock}
            />
            {errors.stock && <p className="error-input">{errors.stock}</p>}
            <p>{t("adminSellProduct.status")}</p>
            <select name="status" onChange={handleChange}>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
          <p>{t("adminSellProduct.description")}</p>
          <textarea
            name="description"
            cols="50"
            rows="3"
            value={product.description}
            onChange={handleChangeDescription}
          >
            {product.description}
          </textarea>
          {errors.description && (
            <p className="error-input">{errors.description}</p>
          )}
          <div className="selector-cats">
            <p>{t("adminSellProduct.select")}</p>
            <select onChange={handleChangeCat}>
              <option value="" hidden>
                {t("adminSellProduct.categories")}
              </option>
              {state.categories?.length &&
                state.categories.sort((a, b) => a.name.localeCompare(b.name)) &&
                state.categories.map((category) => (
                  <option key={category.id} value={category.name || category}>
                    {category.name}
                  </option>
                ))}
            </select>
            <div className="select-categories-del">
              {product.categories.length &&
                React.Children.toArray(product.categories?.map((category) => (
                  <p className="cat-name">
                    {category.name || category}
                    <button
                      className="btn-del-edit"
                      onClick={(event) => handleDeleteCat(category, event)}
                    >X</button>
                  </p>
                )))
                }
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
// const [stateQaS, setStateQaS] = useState(false)
// return (
//   <div>
//       <button onClick={setStateQaS(true)}>realizadas</button>
//       <button onClick={setStateQaS(false)}>pendientes</button>
//       <div>
//           <p>Fecha</p>
//           <p>Aca va la pregunta del usuario</p>
//       </div>
//   </div>
// )
// }
