import React, { useEffect } from "react";
import { fetchCategories, fetchProducts } from "../../../redux/actions/actions";
import { useStore } from "../../../context/store.js";
import "./HomeAdmin.scss";
import ProductCardAdmin from "../../../components/ADMIN/ProductCardADMIN/ProductCardAdmin";
import { useTranslation } from "react-i18next";
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

  const { t } = useTranslation();

  const page = (numPage) => {
    setCurrentPage(numPage);
  };
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

  useEffect(() => {
    handleFilter();
  }, [status, state.products, category]);
  useEffect(() => {
    handleOrder();
  }, [atribute, order]);

  return (
    <div className="home-admin-wrapper">
      <div className="filter-admin-wrapper">
        <div className="selectContainer">
          <label className="labels">{t("adminHome.filter")}</label>
          <select
            className="select"
            value={atribute}
            onChange={(e) => setAtribute(e.target.value)}
          >
            <option value="">-</option>
            <option value="name">{t("adminHome.name")}</option>
            <option value="stock">{t("adminHome.stock")}</option>
            <option value="rating">{t("adminHome.rating")}</option>
            <option value="price">{t("adminHome.price")}</option>
          </select>
        </div>
        <div className="selectContainer">
          <label className="labels">{t("adminHome.status")}</label>
          <select
            className="select"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="">-</option>
            <option value="active">{t("adminHome.active")}</option>
            <option value="inactive">{t("adminHome.inactive")}</option>
          </select>
        </div>
        <div className="selectContainer">
          <label className="labels">{t("adminHome.category")}</label>
          <select
            className="select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">-</option>

            {React.Children.toArray(
              state.categories?.map((category) => (
                <option
                  value={category.name}
                  key={category.id}
                  id={category.id}
                >
                  {category.name}
                </option>
              ))
            )}
          </select>
        </div>
        <div className="selectContainer">
          <label className="labels">{t("adminHome.order")}</label>
          <select
            className="select"
            value={order}
            onChange={(e) => setOrder(e.target.value)}
          >
            <option value="ASC">{t("adminHome.valueAsc")}</option>
            <option value="DESC">{t("adminHome.valueDes")}</option>
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
          {t("adminHome.reset")}
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
                  rating={product.rating}
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
