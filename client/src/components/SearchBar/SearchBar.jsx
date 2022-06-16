import React, { useEffect, useState } from "react";
import "./SearchBar.scss";
import icon from "../../media/search.png";
import axios from "axios";
import { SEARCH_PRODUCT } from "../../redux/actions/actionTypes";
import { Link, Redirect } from "react-router-dom";
import { useStore } from "../../context/store";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
export default function SearchBar() {
  const { t } = useTranslation();
  const [redirect, setRedirect] = useState(false);
  const [state, dispatch] = useStore();
  const [error, setError] = useState(false);
  const [input, setInput] = useState("");
  const [suggested, setSuggested] = useState([]);

  function validate(value) {
    var expression = /^[a-zA-ZÀ-ÿ\s]{1,40}$/;

    if (!expression.test(value)) {
      setError("you can use letters spaces and accents");
    } else if (value === "") {
      setError("");
    }
  }
  const handleLanguage = (lang) => {
    i18next.changeLanguage(lang);
  };

  const handleSuggested = async () => {
    if (input === "") {
      setSuggested([]);
    }
    if (input !== "") {
      const res = await axios.get(
        `${process.env.REACT_APP_DOMAIN}/product/search?name=${input}`
      );
      setSuggested(res.data);
    }
  };
  const handleChange = (e) => {
    setInput(e.target.value);
  };
  const handleSearch = async (e) => {
    try {
      e.preventDefault();
      const res = await axios.get(
        `${process.env.REACT_APP_DOMAIN}/product/search?name=${input}`
      );
      dispatch({
        type: SEARCH_PRODUCT,
        payload: res.data,
      });
      setInput("");
      setRedirect(true);
    } catch (err) {
      alert(err);
    }
  };
  useEffect(() => {
    setRedirect(false);
  }, []);
  useEffect(() => {
    handleSuggested();
  }, [input]);
  return (
    <div className="nav-language-search nav-item">
      {console.log(suggested)}
      {redirect ? <Redirect push to="/search" /> : null}
      <form
        autoComplete="off"
        role="search"
        className="d-flex"
        onSubmit={handleSearch}
      >
        <div className="search-suggest-wrap">
          <input
          
            id="search"
            name="search"
            value={input}
            className="form-control search-bar "
            type="search"
            placeholder={t("searchBar.placeholder")}
            aria-label="Search"
            required
            onChange={handleChange}
          />
          {suggested.length ? (
            <div className="search-suggestions">
              <ul className="ul-suggestions">
                {suggested.map((product) => {
                  if (product.status === "active") {
                    return (
                      <Link key={product.id} to={`/home/${product.id}`}>
                        <li className="li-suggestion ">{product.name}</li>
                      </Link>
                    );
                  }
                })}
              </ul>
            </div>
          ) : null}
        </div>
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
            <Link to="">En</Link>
          </li>
          <li
            className="dropdown-item category-list-item"
            onClick={() => handleLanguage("es")}
          >
            <Link to="">Es</Link>
          </li>
        </ul>
      </li>
    </div>
  );
}
