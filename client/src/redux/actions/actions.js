import axios from "axios";
import { FETCH_PRODUCTS, FETCH_CATEGORIES, USER_SESSION } from "./actionTypes";

export const fetchProducts = async (dispatch) => {
  const fetchedProducts = await axios.get("http://localhost:3001/product/");
  dispatch({
    type: FETCH_PRODUCTS,
    payload: fetchedProducts.data,
  });
};
export const fetchCategories = async (dispatch) => {
  const fetchedProducts = await axios.get("http://localhost:3001/categories/");
  dispatch({
    type: FETCH_CATEGORIES,
    payload: fetchedProducts.data,
  });
};
export const checkSession = (dispatch) => {
  let logged = false;
  let loggedUser = JSON.parse(localStorage.getItem("myUser"));
  if (loggedUser) {
    logged = true;
    dispatch({
      type: USER_SESSION,
      payload: {
        data: loggedUser,
        session: logged,
      },
    });
  } else {
    dispatch({
      type: USER_SESSION,
      payload: {
        session: logged,
      },
    });
  }
};