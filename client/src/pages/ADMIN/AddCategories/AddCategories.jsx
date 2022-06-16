import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";
import { useStore } from "../../../context/store";
import { fetchCategories } from "../../../redux/actions/actions.js";
import { MdDeleteForever } from "react-icons/md";
import "./CategoryCard.css";
import { alertInfo, alertSuccess } from "../../../helpers/toast";
import { useTranslation } from "react-i18next";
export default function EditProduct() {
  const history = useHistory();
  const [state, dispatch] = useStore();
  let { id } = useParams();
  const [product, setProduct] = useState({
    name: "",
  });
  const [error, setError] = useState("");
  const { t } = useTranslation();

  function validate(value) {
    var expression = /^[a-zA-ZÀ-ÿ\s]{1,40}$/;

    if (!expression.test(value)) {
      setError("Name is necessary");
    } else if (value === "") {
      setError("");
    }
  }

  useEffect(() => {
    fetchCategories(dispatch);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name } = product;
    try {
      await axios.put(`${process.env.REACT_APP_DOMAIN}/categories/${id}`, {
        name,
      });
      alertSuccess(t("adminAddCategories.update"));
      setTimeout(() => {
        history.push("/admin/home");
      }, 2000);
    } catch (err) {
      console.log(err);
    }
  };
  const handleChange = (e) => {
    setError("");
    const { name } = e.target;
    if (name === "name") {
      validate(product.name);
    }

    setProduct({ ...product, [e.target.name]: e.target.value });
  };
  const handleDelete = async () => {
    try {
      await axios.delete(`${process.env.REACT_APP_DOMAIN}/categories/${id}`);
      alertInfo(t("adminAddCategories.delete"));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder={product.name}
          value={product.name}
          onChange={handleChange}
          required
        />
        {!error ? null : <div  className="error-input-edit">{error}</div>}
        <div className="btn-addCat">
          <input
            type="submit"
            name="Update info"
            disabled={error}
            className="input-submit"
          />
        </div>
      </form>
      <div className="actions">
        <button className="button" onClick={handleDelete}>
          <MdDeleteForever size={30} />
        </button>
      </div>
    </div>
  );
}
