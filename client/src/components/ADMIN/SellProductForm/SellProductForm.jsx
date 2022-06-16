import React, { useEffect, useState } from "react";
import "./SellProductForm.scss";
import axios from "axios";
import { fetchCategories } from "../../../redux/actions/actions";
import { useStore } from "../../../context/store";
import { useTranslation } from "react-i18next";
import { alertInfo, alertSuccess, alertWarning } from "../../../helpers/toast.js";

export default function SellProductForm() {
  const { t } = useTranslation();
  const [state, dispatch] = useStore();
  const [errors, setErrors] = useState({
    name: "",
    price: "",
    description: "",
    stock: ""
  });
  const [data, setData] = useState({
    name: "",
    price: "",
    description: "",
    image:
      "https://static.zara.net/photos///2022/V/1/1/p/6469/910/060/2/w/850/6469910060_6_4_1.jpg?ts=1651057109246",
    status: "inactive",
    stock: "",
    categories: [],
  });
  const expression = {
    nameExpression: /^[\da-zA-ZÀ-ÿ\s]{1,40}$/,
    priceExpression: /^\d{1,5}(\.\d{1,3})?$/,
    descriptionExpression: /^[0-9a-zA-ZÀ-ÿ.,®'*¿?¡!\s]{30,200}$/,
    stockExpression: /^\d{1,14}$/,
  };

  function validator(input) {
    let errors = {};

    if (!expression.nameExpression.test(input.name) && input.name) {
      errors.name = `${t("adminSellProduct.errors_name")}`;
    }
    if (!expression.priceExpression.test(input.price) && input.price) {
      errors.price = `${t("adminSellProduct.errors_price")}`;
    }
    if (!expression.descriptionExpression.test(input.description) && input.description) {
      errors.description = `${t("adminSellProduct.errors_description")}`;
    }
    if (!expression.stockExpression.test(input.stock) && input.stock) {
      errors.stock = `${t("adminSellProduct.errors_stock")}`;
    }
    return errors;
  }



  const handleChangeName = (e) => {
    setErrors("");
    setErrors(validator({ ...data, [e.target.name]: e.target.value }));

    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleChangePrice = (e) => {
    setErrors("");
    setErrors(validator({ ...data, [e.target.name]: e.target.value }));

    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleChangeDescription = (e) => {
    setErrors("");
    setErrors(validator({ ...data, [e.target.name]: e.target.value }));

    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleChangeStock = (e) => {
    setErrors("");
    setErrors(validator({ ...data, [e.target.name]: e.target.value }));

    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleDeleteCat = (name, event) => {
    event.preventDefault();
    const filterCat = data.categories.filter((cat) => cat !== name);
    setData({ ...data, categories: filterCat });
  };
  const handleChangeCat = (e) => {
    const { value } = e.target;
    setData({ ...data, categories: [...data.categories, value] });
  };

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, price, description, image, status, stock, categories } = data;
    console.log("Hola errors", errors.length)
    if (!errors.name && !errors.price && !errors.description && !errors.stock) {
      console.log(name, price, description, stock, image, status, categories)
      try {
        await axios.post(`${process.env.REACT_APP_DOMAIN}/product/create`, {
          name: name,
          price: parseInt(price),
          description: description,
          image: image,
          status: status,
          stock: parseInt(stock),
          categories: categories,
        });

        alert("se envio la peticion");
      } catch (err) {
        console.log(err);
      }
    }
    else {
      alertWarning(t("adminEditProduct.fixErrors"))
    }
  }
  useEffect(() => {
    fetchCategories(dispatch);
  }, []);
  return (
    <div className="container-login">
      <div className="sellProductCard">
        <p className="sellProduct-title">{t("adminSellProduct.postProduct")}</p>

        <form onSubmit={handleSubmit} className="sellProductForm">
          <div className="sell-inputs-container">
            <input
              className="sell-input"
              type="text"
              name="name"
              required
              placeholder={t("adminSellProduct.name")}
              onChange={handleChangeName}
              value={data.name}
            />

            {errors.name && <p className="error-input-edit">{errors.name}</p>}

            <input
              className="sell-input"
              type="number"
              name="price"
              required
              placeholder={t("adminSellProduct.price")}
              onChange={handleChangePrice}
              value={data.price}
            />

            {errors.price && <p className="error-input-edit">{errors.price}</p>}

            <textarea
              className="sellProductForm-textarea"
              type="textarea"
              required
              name="description"
              placeholder={t("adminSellProduct.description")}
              onChange={handleChangeDescription}
              value={data.description}
            ></textarea>

            {errors.description && (
              <p className="error-input-edit">{errors.description}</p>
            )}
            <input
              className="sell-input"
              type="text"
              name="image"
              placeholder={t("adminSellProduct.image")}
              onChange={handleChange}
              value={data.image}
            />
            <div className="sellproduct-status">
              <label>{t("adminSellProduct.status")}</label>
              <select name="status" value={data.status} onChange={handleChange}>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
            <input
              className="sell-input"
              type="number"
              name="stock"
              required
              placeholder={t("adminSellProduct.stock")}
              onChange={handleChangeStock}
              value={data.stock}
            />
            {errors.stock && <p className="error-input-edit">{errors.stock}</p>}
            <select onChange={handleChangeCat} className="sell-input">
              <option value="" hidden className="">
                {t("adminSellProduct.categories")}
              </option>
              {state.categories?.length &&
                state.categories.sort((a, b) => a.name.localeCompare(b.name)) &&
                React.Children.toArray(
                  state.categories.map((category) => (
                    <option key={category.id} value={category.name}>
                      {category.name}
                    </option>
                  ))
                )}
            </select>
            <div className="sell-select-categories-del">
              {data.categories?.map((category, i) => (
                <div key={i} className="edit-cat-delete">
                  <p className="cat-name">{category}</p>
                  <button
                    onClick={(event) => handleDeleteCat(category, event)}
                    className="btn-del-edit"
                  >
                    x
                  </button>
                </div>
              ))}
            </div>

            <div className="btn-login">
              <input
                type="submit"
                value={t("adminSellProduct.submit")}
                className="input-submit"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
