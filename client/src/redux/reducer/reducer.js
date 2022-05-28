import {
  FETCH_PRODUCTS,
  SEARCH_PRODUCT,
  FETCH_CATEGORIES,
} from "../actions/actionTypes";

export const initialState = {
  products: [],
  searchedProducts: [],
  categories: [],
  state4: "estado state store#3",
  state5: "estado state store#3",
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

    default:
      return state;
  }
}
export default reducer;
