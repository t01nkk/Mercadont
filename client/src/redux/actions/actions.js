import axios from "axios";
import {
  FETCH_PRODUCTS,
  FETCH_CATEGORIES,
  FETCH_ADMIN_USER,
  USER_SESSION,
  ADMIN_SESSION,
  GET_FAVORITES,
  CHANGE_COUNT_PRODUCT,
} from "./actionTypes";

export const fetchProducts = async (dispatch) => {
  const fetchedProducts = await axios.get(
    `${process.env.REACT_APP_DOMAIN}/product/`
  );
  dispatch({
    type: FETCH_PRODUCTS,
    payload: fetchedProducts.data,
  });
};
export const fetchUsers = async (dispatch) => {
  const fetchedUsers = await axios.get(
    `${process.env.REACT_APP_DOMAIN}/admin/users`
  );
  dispatch({
    type: FETCH_ADMIN_USER,
    payload: fetchedUsers.data,
  });
};
export const fetchCategories = async (dispatch) => {
  const fetchedProducts = await axios.get(
    `${process.env.REACT_APP_DOMAIN}/categories/`
  );
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
// export const checkSessionADMIN = async (dispatch) => {
//   let loggedAdmin = false;
//   let loggedAdminInfo = JSON.parse(localStorage.getItem("myAdmin"));
//   if (loggedAdminInfo !== null) {
//     if (loggedAdminInfo?.data.isAdmin) {
//       loggedAdmin = true;
//       await dispatch({
//         type: ADMIN_SESSION,
//         payload: {
//           admin: loggedAdminInfo,
//           sessionAdmin: loggedAdmin,
//         },
//       });
//     }
//   } else {
//     await dispatch({
//       type: ADMIN_SESSION,
//       payload: {
//         sessionAdmin: loggedAdmin,
//       },
//     });
//   }
// };
export const getFavorites = async (dispatch, id) => {
  if (!id) {
    dispatch({
      type: GET_FAVORITES,
      payload: [],
    });
  } else {
    const giveMeFavorites = await axios(
      `${process.env.REACT_APP_DOMAIN}/user/favorite/${id}`
    );
    try {
      dispatch({
        type: GET_FAVORITES,
        payload: giveMeFavorites.data,
      });
    } catch (error) {
      console.log(error);
    }
  }
};

export const totalCount = (dispatch) => {
  let user = JSON.parse(localStorage.getItem("myUser"));
  let local = JSON.parse(localStorage.getItem(user));
  if (local) {
    dispatch({
      type: CHANGE_COUNT_PRODUCT,
      payload: local.length,
    });
  } else {
    dispatch({
      type: CHANGE_COUNT_PRODUCT,
      payload: 0,
    });
  }
};
