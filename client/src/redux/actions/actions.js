import axios from "axios";
import {
  FETCH_PRODUCTS,
  FETCH_CATEGORIES,
  USER_SESSION,
  ADMIN_SESSION,
} from "./actionTypes";


export const fetchProducts = async (dispatch) => {
  const fetchedProducts = await axios.get(`${process.env.REACT_APP_DOMAIN}/product/`);
  dispatch({
    type: FETCH_PRODUCTS,
    payload: fetchedProducts.data,
  });
};
console.log("here be env", process.env.REACT_APP_DOMAIN)
export const fetchCategories = async (dispatch) => {
  const fetchedProducts = await axios.get(`${process.env.REACT_APP_DOMAIN}/categories/`);
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
export const checkSessionADMIN = (dispatch) => {
  let loggedAdmin = false;
  let loggedAdminInfo = JSON.parse(localStorage.getItem("myAdmin"));
  if (loggedAdminInfo !== null) {
    if (loggedAdminInfo?.data.isAdmin) {
      loggedAdmin = true;
      dispatch({
        type: ADMIN_SESSION,
        payload: {
          admin: loggedAdminInfo,
          sessionAdmin: loggedAdmin,
        },
      });
    }
  } else {
    dispatch({
      type: ADMIN_SESSION,
      payload: {
        sessionAdmin: loggedAdmin,
      },
    });
  }
};
