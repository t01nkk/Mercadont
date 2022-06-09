import React, { useEffect, useState } from "react";
import { useStore } from "../../context/store";
import { Link, Redirect, useHistory } from "react-router-dom";
import {
  CATEGORIES_PRODUCT,
  FETCH_PRODUCTS,
} from "../../redux/actions/actionTypes";
import { fetchCategories } from "../../redux/actions/actions.js";
import axios from "axios";
import "./FilterCategories.css";
export default function FilerCategories() {
  const [state, dispatch] = useStore();
  const [redirect, setRedirect] = useState(false);
  const [filter, setFilter] = useState({
    categories: [],
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
        dispatch({
          type: CATEGORIES_PRODUCT,
          payload: res.data,
        });
        setRedirect(true);
      } else {
        document
          .querySelectorAll("input[type=checkbox]")
          .forEach((el) => (el.checked = false));
        setFilter({
          categories: [],
        });
        alert("No products with those selected categories where found");
        const allProducts = await axios.get(
          `${process.env.REACT_APP_DOMAIN}/product`
        );
        dispatch({
          type: FETCH_PRODUCTS,
          payload: allProducts.data,
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
  }, []);

  return (
    <>
      {redirect ? <Redirect push to="/categories" /> : null}
      <form
        onSubmit={(e) => {
          handleSearch(e);
        }}
      >
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
        <li className="dropdown-divider"></li>
        <button type="submit" className="filter-search-btn">
          buscar
        </button>
      </form>
    </div>
  );
}
