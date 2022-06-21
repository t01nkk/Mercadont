import React, { useEffect, useState } from "react";
import axios from "axios";
import i18next from "i18next";
import { FETCH_PRODUCTS } from "../../../redux/actions/actionTypes";
import { useTranslation } from "react-i18next";
import { useStore } from "../../../context/store";
import { Link, useHistory } from "react-router-dom";
import { fetchCategories, fetchProducts } from "../../../redux/actions/actions";

export default function SearchBarAdmin() {
  const { t } = useTranslation();
  const [state, dispatch] = useStore();
  const [error, setError] = useState(false);
  const [input, setInput] = useState("");
  const history = useHistory();
  function validate(value) {
    var expression = /^[a-zA-ZÀ-ÿ\s]{1,40}$/;

    if (!expression.test(value)) {
      setError(t("error_addressFormAlphaNumbers_validate"));
    } else if (value === "") {
      setError("");
    }
  }
  const handleLanguage = (lang) => {
    i18next.changeLanguage(lang);
  };
  const handleChange = (e) => {
    setError("");
    const { name } = e.target;
    if (name === "search") {
      validate(input);
    }
    setInput(e.target.value);
  };
  const handleSearch = async (e) => {
    try {
      e.preventDefault();
      const res = await axios.get(
        `${process.env.REACT_APP_DOMAIN}/product/search?name=${input}`
      );
      if (res.data.length) {
        dispatch({
          type: FETCH_PRODUCTS,
          payload: res.data,
        });
       
      }
      setInput("");
    } catch (err) {
      alert(err);
    }
  };
  useEffect(() => {
    fetchProducts(dispatch);
    fetchCategories(dispatch);
  }, []);

  return (
    <div className="nav-language-search nav-item">
      <form role="search" className="d-flex" onSubmit={handleSearch}>
        <input
          id="search"
          name="search"
          value={input}
          className="form-control search-bar "
          type="search"
          placeholder={t("searchBar.placeholder")}
          aria-label="Search"
          onChange={handleChange}
        />
      </form>
      <li className="nav-item dropdown white-text-nav-language language-list">
        <Link
          to=""
          className="dropdown-toggle "
          id="dropdownMenuClickableInside"
          data-bs-toggle="dropdown"
          data-bs-auto-close="outside"
          aria-expanded="false"
        >
          {t("searchBar.language")}
        </Link>
        <ul className="dropdown-menu " aria-labelledby="navbarDropdown">
          <li
            className="dropdown-item category-list-item"
            onClick={() => handleLanguage("en")}
          >
            <Link to="/admin/home">En</Link>
          </li>
          <li
            className="dropdown-item category-list-item"
            onClick={() => handleLanguage("es")}
          >
            <Link to="/admin/home">Es</Link>
          </li>
        </ul>
      </li>
    </div>
  );
}
