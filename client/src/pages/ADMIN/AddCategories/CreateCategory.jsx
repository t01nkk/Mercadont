import React, { useEffect, useState } from "react";
import axios from "axios";
import { fetchCategories } from "../../../redux/actions/actions";
import { useStore } from "../../../context/store";
import { useHistory } from "react-router-dom";
import "./CategoryCard.scss";
import { alertSuccess, alertWarning } from "../../../helpers/toast";
import { useTranslation } from "react-i18next";
export default function CreateCategory() {
  const { t } = useTranslation();

  const history = useHistory();
  const [state, dispatch] = useStore();
  const [errors, setErrors] = useState({});

  const [data, setData] = useState({
    name: "",
  });

  const expression = {
    name: /^[a-zA-ZÀ-ÿ\s]{1,40}$/,
  };
  function validator(input) {
    let errors = {};

    if (!expression.name.test(input.name)) {
      errors.name = t("errors.error_name");
    }

    return errors;
  }
  const handleChangeName = (e) => {
    setErrors("");
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
      alertSuccess(t("adminCreateCategory.created"));
      setTimeout(() => {
        history.push("/admin/addCategories");
      }, 2000);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchCategories(dispatch);
  }, []);
  return (
    <div className="container-login">
      <div className="loginCard">
        <p className="login-welcome">{t("adminCreateCategory.postCategory")}</p>

        <form autoComplete="off" onSubmit={handleSubmit}>
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
          {errors.name && <p className="error-style">{errors.name}</p>}
          <div className="btn-login">
            <input
              type="submit"
              value={t("adminCreateCategory.submit")}
              disabled={errors.name}
              className="input-submit-login"
            />
          </div>
        </form>
      </div>
    </div>
  );
}
