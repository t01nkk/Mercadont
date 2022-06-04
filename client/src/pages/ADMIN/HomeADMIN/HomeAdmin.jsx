import React, { useEffect } from "react";
import { fetchCategories, fetchProducts } from "../../../redux/actions/actions";
import { useStore } from "../../../context/store.js";
import "./HomeAdmin.css";
import ProductCardAdmin from "../../../components/ADMIN/ProductCardADMIN/ProductCardAdmin";
import { useState } from "react";
import { FETCH_PRODUCTS, FILTER_PRODUCTS_ADMIN } from "../../../redux/actions/actionTypes";

export default function HomeAdmin() {
  const [state, dispatch] = useStore();
  const [statusFilt, setStatusFilt] = useState("");
  const [category, setCategory] = useState("");
  const [atribute, setAtribute] = useState("");
  const [order, setOrder] = useState("ASC");

  const handleFilter = () => {
    let filterProductsAdmin = [];
    // if(category&&){}
    return dispatch({
      type:FILTER_PRODUCTS_ADMIN,
      payload:filterProductsAdmin
    })
  };
  const handleOrder = () => {
    function compare(a, b) {
      if (a[atribute] < b[atribute]) {
        return -1;
      }
      if (a[atribute] > b[atribute]) {
        return 1;
      }
      return 0;
    }
    let orderAllProducts = [];
    let orderProducts = [];
    if (atribute) {
      if (order === "DESC") {
        orderProducts = state.filterProductsAdmin.reverse(compare);
        orderAllProducts = state.products.reverse(compare);
      } else {
        orderProducts = state.filterProductsAdmin.sort(compare);
        orderAllProducts = state.product.sort(compare);
      }
      dispatch({
        type: FILTER_PRODUCTS_ADMIN,
        payload: orderProducts,
      });
      dispatch({
        type: FETCH_PRODUCTS,
        payload: orderAllProducts,
      });
    }
  };

  useEffect(() => {
    handleFilter();
  }, [statusFilt, state.products]);
  useEffect(() => {
    handleOrder();
  }, [atribute, order]);
  useEffect(() => {
    fetchProducts(dispatch);
    fetchCategories(dispatch)
  }, []);
  return (
    <div>
      <div className="selectContainer">
        <label className="labels">Filter:</label>
        <select
          className="select"
          value={atribute}
          onChange={(e) => setAtribute(e.target.value)}
        >
          <option value="">All</option>
          <option value="name">Name</option>
          <option value="stock">Stock</option>
          <option value="rating">Rating</option>
          <option value="price">Price</option>
        </select>
      </div>
      <div className="selectContainer">
        <label className="labels">Order:</label>
        <select
          className="select"
          value={order}
          onChange={(e) => setOrder(e.target.value)}
        >
          <option value="ASC">Asc</option>
          <option value="DESC">Desc</option>
        </select>
      </div>
      <div className="section-products-admin">
        {state.products &&
          React.Children.toArray(
            state.products.map((product) => {
              return (
                <ProductCardAdmin
                  id={product.id}
                  name={product.name}
                  stock={product.stock}
                  price={product.price}
                  image={product.image}
                  categories={product.categories}
                  status={product.status}
                  description={product.description}
                />
              );
            })
          )}
      </div>
    </div>
  );
}
