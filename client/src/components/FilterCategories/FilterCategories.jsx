import React, { useEffect, useState } from "react";
import { useStore } from "../../context/store";
import { Link, Redirect, useHistory } from "react-router-dom";
import { CATEGORIES_PRODUCT, FETCH_PRODUCTS } from "../../redux/actions/actionTypes";
import { fetchCategories } from "../../redux/actions/actions.js";
import axios from "axios";


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
      const res = await axios.post(`${process.env.REACT_APP_DOMAIN}/product/filter`, {
        categories,
      });
      if (Array.isArray(res.data)) {
        dispatch({
          type: CATEGORIES_PRODUCT,
          payload: res.data,
        });
        setRedirect(true);
      } else {
        document.querySelectorAll('input[type=checkbox]').forEach(el => el.checked = false);
        setFilter({
          categories: [],
        });
        alert("No products with those selected categories where found");
        const allProducts = await axios.get(`${process.env.REACT_APP_DOMAIN}/product`)
        dispatch({
          type: FETCH_PRODUCTS,
          payload: allProducts.data
        })
      }
    }
    catch (err) {
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

  async function resetFilters(){
    document.querySelectorAll('input[type=checkbox]').forEach(el => el.checked = false);
    setFilter({
      categories: [],
    });
    const allProducts = await axios.get(`${process.env.REACT_APP_DOMAIN}/product`)
    dispatch({
      type: FETCH_PRODUCTS,
      payload: allProducts.data
    })
  }

  return (
    <div>
      {redirect ? <Redirect push to="/categories" /> : null}
      <form
        onSubmit={(e) => {
          handleSearch(e);
        }}
      >
        <div>
          <div>
            {state.categories.map((categories) => (
              <div className="dropdown-item p-l-2" key={categories.name}>
                <div>
                  <input
                    value={categories.name}
                    type="checkbox"
                    id={categories.name}
                    onChange={(e) => {
                      handleSelect(e);
                    }}
                  />
                  <label htmlFor={categories.name} >{categories.name}</label>
                </div>
              </div>
            ))}
          </div>
        </div>
        <button className="btn-dark" >Search</button>
        <button onClick={resetFilters}  className="btn-danger">Reset Filters</button>
      </form>
    </div>
  );
}
