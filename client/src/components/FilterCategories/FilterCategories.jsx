import React, { useEffect, useState } from "react";
import { useStore } from "../../context/store";
import { Redirect, useHistory } from "react-router-dom";
import {
  CATEGORIES_PRODUCT,
  FETCH_PRODUCTS,
} from "../../redux/actions/actionTypes";
import { fetchCategories } from "../../redux/actions/actions.js";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { alertInfo } from "../../helpers/toast";
import "./FilterCategories.scss";
export default function FilerCategories() {
  const { t } = useTranslation();
  const [state, dispatch] = useStore();
  const [redirect, setRedirect] = useState(false);
  const [filter, setFilter] = useState({
    categories: state.filter,
  });
  const history = useHistory();
  const handleSearch = async (e) => {
    e.preventDefault();
    const { categories } = filter;
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_DOMAIN}/product/filter`,
        {
          categories,
        }
      );
      if (Array.isArray(res.data)) {
        state.filter = categories;
        dispatch({
          type: CATEGORIES_PRODUCT,
          payload: res.data,
        });

        setRedirect(true);
      } else {
        document.querySelectorAll("input[type=checkbox]").forEach((el) => {
          if (!state.filter.includes(el.value)) el.checked = false;
        });
        setFilter({
          categories: state.filter,
        });
        alertInfo(t("categoriesComp.noCats"));
        dispatch({
          type: FETCH_PRODUCTS,
          payload: state.products,
        });
      }
    } catch (err) {
      alert(err);
    }
  };

  function handleSelect(e) {
    setFilter({
      ...filter,
      categories: deleted(filter.categories, e.target.value),
    });
  }

  function deleted(array, sel) {
    if (array.includes(sel)) return array.filter((num) => num !== sel);
    return array.concat(sel);
  }
  useEffect(() => {
    setRedirect(false);
  }, []);
  useEffect(() => {
    fetchCategories(dispatch);
    document.querySelectorAll("input[type=checkbox]").forEach((el) => {
      if (state.filter.includes(el.value)) el.checked = true;
    });
  }, []);

  return (
    <section className="categories-section">
      {redirect ? <Redirect push to="/categories" /> : null}
      <form
        onSubmit={(e) => {
          handleSearch(e);
        }}
      >
        <div className="scroll-categories">
          {state.categories.map((categories) => (
            <label
              key={categories.name}
              className="label-category dropdown-item category-list-item "
            >
              {categories.name}
              <input
                className="checkbox-category"
                value={categories.name}
                type="checkbox"
                id={categories.name}
                onChange={(e) => {
                  handleSelect(e);
                }}
              />
            </label>
          ))}
        </div>
        <li className="dropdown-divider"></li>
        <button type="submit" className="filter-search-btn">
          {t("searchBar.placeholder")}
        </button>
      </form>
    </section>
  );
}
