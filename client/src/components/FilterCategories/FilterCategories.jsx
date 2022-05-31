import React, { useEffect, useState } from "react";
import { useStore } from "../../context/store";
import { Link, Redirect, useHistory } from "react-router-dom";
import { CATEGORIES_PRODUCT } from "../../redux/actions/actionTypes";
import axios from "axios";

export default function FilerCategories() {
  const [state, dispatch] = useStore();

  const [filter, setFilter] = useState({
    categories: [],
  });
  const history = useHistory();
  const handleSearch = async (e) => {
    e.preventDefault();
    const { categories } = filter;
    try {
      const res = await axios.post(`http://localhost:3001/product/filter`, {
        categories,
      });
      if (Array.isArray(res.data)) {
        dispatch({
          type: CATEGORIES_PRODUCT,
          payload: res.data,
        });
      } else {
        setFilter({
          categories: [],
        });
        alert("No products with those selected categories where found");
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
    if (array.includes(sel)) {
      const deselectCat = array.filter((num) => num !== sel);
      return deselectCat;
    } else {
      const selectCat = array.concat(sel);
      return selectCat;
    }
  }
  return (
    <div>
      <form
        onSubmit={(e) => {
          handleSearch(e);
        }}
      >
        <div className="form-checkbox-container">
          <div className="from-checkbox-grid">
            {state.categories.map((categories) => (
              <div className="from-checkbox">
                <div className="from-checkbox-input">
                  <label htmlFor={categories.name}>{categories.name}</label>
                  <input
                    value={categories.name}
                    type="checkbox"
                    id={categories.name}
                    onChange={(e) => {
                      handleSelect(e);
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <button type="submit">buscar</button>
      </form>
    </div>
  );
}
