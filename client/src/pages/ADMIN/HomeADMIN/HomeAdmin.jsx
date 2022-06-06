import React, { useEffect } from "react";
import { fetchCategories, fetchProducts } from "../../../redux/actions/actions";
import { useStore } from "../../../context/store.js";
import "./HomeAdmin.css";
import ProductCardAdmin from "../../../components/ADMIN/ProductCardADMIN/ProductCardAdmin";
import { useState } from "react";
import {
  FETCH_PRODUCTS,
  FILTER_PRODUCTS_ADMIN,
} from "../../../redux/actions/actionTypes";
import PaginationAdmin from "./PaginationADMIN/PaginationAdmin";
export default function HomeAdmin() {
  const [state, dispatch] = useStore();
  const [status, setStatus] = useState("");
  const [category, setCategory] = useState("");
  const [atribute, setAtribute] = useState("");
  const [order, setOrder] = useState("ASC");
  const [currentPage, setCurrentPage] = useState(1);
  const [productsInPage] = useState(20);
  const indexLastProduct = currentPage * productsInPage;
  const indexFirstProduct = indexLastProduct - productsInPage;
  const currentProducts = state.filterProductsAdmin.slice(
    indexFirstProduct,
    indexLastProduct
  );
  const page = (numPage) => {
    setCurrentPage(numPage);
  };
  // const resetFilter = () => {
  //   setStatus(""), setCategory(""), setAtribute(""), setOrder("ASC");
  // };
  console.log(state.products);
  const handleFilter = () => {
    setCurrentPage(1);
    let filterProductsAdmin = [];
    if (status === "" && category === "") {
      filterProductsAdmin = [...state.products];
    }
    if (status === "" && category) {
      filterProductsAdmin = state.products.filter((product) =>
        product.categories.find((e) => e.name === category)
      );
    }
    if (status === "active" && category) {
      filterProductsAdmin = state.products.filter(
        (product) =>
          product.status === "active" &&
          product.categories.find((e) => e.name === category)
      );
    }
    if (status === "inactive" && category) {
      filterProductsAdmin = state.products.filter(
        (product) =>
          product.status === "inactive" &&
          product.categories.find((e) => e.name === category)
      );
    }
    if (status === "active" && category === "") {
      filterProductsAdmin = state.products.filter(
        (product) => product.status === "active"
      );
    }
    if (status === "inactive" && category === "") {
      filterProductsAdmin = state.products.filter(
        (product) => product.status === "inactive"
      );
    }

    return dispatch({
      type: FILTER_PRODUCTS_ADMIN,
      payload: filterProductsAdmin,
    });
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
        orderAllProducts = state.products.sort(compare);
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
  // console.log(category);
  useEffect(() => {
    handleFilter();
  }, [status, state.products, category]);
  useEffect(() => {
    handleOrder();
  }, [atribute, order]);
  useEffect(() => {
    fetchProducts(dispatch);
    fetchCategories(dispatch);
  }, []);
  return (
    <div className="home-admin-wrapper">
      <div className="filter-admin-wrapper">
        <div className="selectContainer">
          <label className="labels">Filter:</label>
          <select
            className="select"
            value={atribute}
            onChange={(e) => setAtribute(e.target.value)}
          >
            <option value="">-</option>
            <option value="name">Name</option>
            <option value="stock">Stock</option>
            <option value="rating">Rating</option>
            <option value="price">Price</option>
          </select>
        </div>
        <div className="selectContainer">
          <label className="labels">Status:</label>
          <select
            className="select"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="">-</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
        <div className="selectContainer">
          <label className="labels">Category:</label>
          <select
            className="select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">-</option>

            {state.categories?.map((category) => (
              <option value={category.name} key={category.id} id={category.id}>
                {category.name}
              </option>
            ))}
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
        <button
          onClick={() => {
            fetchProducts(dispatch);
            setStatus("");
            setCategory("");
            setAtribute("");
            setOrder("ASC");
          }}
        >
          Reset
        </button>
      </div>
      <div className="section-products-admin">
        {state.products &&
          React.Children.toArray(
            currentProducts.map((product) => {
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
      <div className="page-btns-wrapper">
        <PaginationAdmin
          productNum={state.filterProductsAdmin.length}
          setCurrentPage={setCurrentPage}
          page={page}
          productsInPage={productsInPage}
        />
      </div>
    </div>
  );
}
