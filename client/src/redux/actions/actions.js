import axios from "axios";
import DBProducts from "../../productsCats.json";
import { FETCH_PRODUCTS } from "./actionTypes";

export const fetchProducts = async (dispatch) => {
  const fetchedProducts = await axios.get("http://localhost:3001/product/");
  dispatch({
    type: FETCH_PRODUCTS,
    payload: fetchedProducts.data,
  });
};
