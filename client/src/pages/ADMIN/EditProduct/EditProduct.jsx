import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";
import { useStore } from "../../../context/store.js";
import { fetchCategories } from "../../../redux/actions/actions.js";
import "./EditProduct.scss";
import { alertInfo, alertSuccess, alertWarning } from "../../../helpers/toast.js";
import { useTranslation } from "react-i18next";
export default function EditProduct() {
  const { t } = useTranslation();
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
  const history = useHistory();
  const expression = {
    nameExpression: /^[\da-zA-ZÀ-ÿ\s]{1,40}$/,
    priceExpression: /^\d{1,3}(\.\d{1,3})?$/,
    descriptionExpression: /^[0-9a-zA-ZÀ-ÿ.,®'*¿?¡!\s]{30,200}$/,
    stockExpression: /^\d{1,14}$/,

  };

  function validator(input) {
    let errors = {};

    if (!expression.nameExpression.test(input.name)) {
      errors.name = t("adminSellProduct.errors_name");
    }
    if (!expression.priceExpression.test(input.price)) {
      errors.price = t("adminSellProduct.errors_price");
    }
    if (!expression.descriptionExpression.test(input.description)) {
      errors.description = t("adminSellProduct.errors_description");
    }
    if (!expression.stockExpression.test(input.stock)) {
      errors.stock = t("adminSellProduct.errors_stock");
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

  console.log(errors)

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, description, price, stock, image, categories, status } =
      product;
    if (!errors.length !== 0) {
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
          window.location.reload()
        }, 2000);
      } catch (err) {
        console.log(err);
      }
    } else {
      alertWarning(t("adminEditProduct.fixErrors"))
    }

  };
  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };
  const handleDelete = async () => {
    let executed = window.confirm(t("adminEditProduct.confirmDelete"))
    if (executed) {
      try {
        await axios.delete(
          `${process.env.REACT_APP_DOMAIN}/product/delete/${id}`
        );
        alertInfo(t("adminEditProduct.delete"));
        history.push("/admin/home");
      } catch (err) {
        console.log(err);
      }
    }

  };
  return (
    <div className="container-edit-admin">
      <form onSubmit={handleSubmit} className="form-edit-admin">
        <div className="details-image">
          <img src={`${product.image}`} alt="" className="product-img" />
        </div>
        <div className="edit-info">
          <label className="titleDetails">{t("adminSellProduct.name")}</label>
          <input
            type="text"
            name="name"
            value={product.name}
            onTouchStart={handleChangeName}
            onChange={handleChangeName}
          />
          {errors.name && <p className="error-input">{errors.name}</p>}
          <label className="title-details-info-description">
            {t("adminSellProduct.description")}
          </label>
          {errors.description && (
            <p className="error-input">{errors.description}</p>
          )}
          <textarea
            name="description"
            value={product.description}
            onChange={handleChangeDescription}
            className="edit-textarea"
          >
            {product.description}
          </textarea>
          <div className="edit-price-stock">
            <label className="title-details-info">
              {t("adminSellProduct.price")}
            </label> {errors.price && <p className="error-input">{errors.price}</p>}
            <input
              type="number"
              name="price"
              onTouchStart={handleChangePrice}
              value={product.price}
              onChange={handleChangePrice}
            />
           
            <label className="title-details-info">
              {t("adminSellProduct.stock")}
            </label>
            <input
              type="number"
              name="stock"
              value={product.stock}
              onChange={handleChangeStock}
            />
            {errors.stock && <p className="error-input">{errors.stock}</p>}
          </div>
          <div className="edit-status">
            <label className="title-details-info">
              {t("adminSellProduct.status")}
            </label>
            <select name="status" onChange={handleChange}>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
          <div className="selector-cats">
            <label className="title-details-info">
              {t("adminSellProduct.select")}
            </label>
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
          </div>
          <div className="select-categories-del">
            {product.categories.length ?
              React.Children.toArray(
                product.categories?.map((category) => (
                  <div className="edit-cat-delete">
                    <p className="cat-name">{category.name || category}</p>{" "}
                    <button
                      className="btn-del-edit"
                      onClick={(event) => handleDeleteCat(category, event)}
                    >
                      X
                    </button>
                  </div>
                ))
              ) : <p>{t("adminSellProduct.errors_categories")}</p>}
          </div>
          <input
            type="submit"
            name="Update info"
            value={t("adminEditProduct.update")}
            className="btn-update-info"
          />
        </div>
      </form>
      <button className="button-danger-del" onClick={handleDelete}>
        {t("adminEditProduct.deleteProduct")}
      </button>
    </div>
  );
}
