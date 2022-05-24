import axios from "axios";
import DBProducts from "../../posts.json";
import { FETCH_PRODUCTS } from "./actionTypes";

export const fetchProducts = async (dispatch) => {
  const fetchedProducts = await axios.get("https://fakestoreapi.com/products");
  dispatch({
    type: FETCH_PRODUCTS,
    payload: fetchedProducts.data,
  });
};
