import React, { useEffect, useState } from "react";
import axios from "axios";
import { fetchCategories } from "../../../redux/actions/actions";
import { useStore } from "../../../context/store";
import { useHistory } from "react-router-dom";
import "./CategoryCard.css";
import { alertSuccess } from "../../../helpers/toast";
import { useTranslation } from "react-i18next";
export default function CreateCategory() {
  const { t } = useTranslation()

  const history = useHistory()
  const [state, dispatch] = useStore();
  const [errors, setErrors] = useState({});

  const [data, setData] = useState({
    name: "",
  });

  const expression = {
    name: /^[a-zA-ZÀ-ÿ\s]{1,40}$/,

  }
  function validator(input) {
    let errors = {};

    if (!expression.name.test(input.name)) {
      errors.name = 'Name is necessary';
    }

    return errors
  }
  const handleChangeName = (e) => {
    setErrors("")
    setErrors(validator({ ...data, [e.target.name]: e.target.value }));

    setData({ ...data, [e.target.name]: e.target.value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name } = data;
    try {
      await axios.post(`${process.env.REACT_APP_DOMAIN}/categories/`, {
        name: name,
      });
      alertSuccess(t("adminCreateCategory.created"))
      setTimeout(() => {
        history.push('/admin/addCategories')
      }, 2000);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchCategories(dispatch);
  }, []);
  return (
    <div className="loginCard">
      <h2>{t("adminCreateCategory.postCategory")}</h2>

      <form onSubmit={handleSubmit}>
        <div className="divInputUser">
          <input
            type="text"
            name="name"
            placeholder={t("adminCreateCategory.name")}
            onChange={handleChangeName}
            required
            value={data.name}
          />
        </div>
        {errors.name && (<p  className="error-input-edit">{errors.name}</p>)}
        <div className="btn-createUser">
          <input type="submit" value={t("adminCreateCategory.submit")} className="input-submit" />
        </div>
      </form>
    </div>
  );
}
