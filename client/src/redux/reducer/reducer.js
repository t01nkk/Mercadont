import {
  FETCH_PRODUCTS,
  SEARCH_PRODUCT,
  FETCH_CATEGORIES,
  USER_SESSION,
} from "../actions/actionTypes";

export const initialState = {
  products: [],
  searchedProducts: [],
  categories: [],
  user: "",
  session: false,
};

export function reducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_PRODUCTS: {
      return {
        ...state,
        products: action.payload,
      };
    }
    case SEARCH_PRODUCT: {
      return {
        ...state,
        searchedProducts: action.payload,
      };
    }
    case FETCH_CATEGORIES: {
      return {
        ...state,
        categories: action.payload,
      };
    }
    case USER_SESSION: {
      return {
        ...state,
        user: action.payload.data,
        session: action.payload.session,
      };
    }

    default:
      return state;
  }
}
export default reducer;
