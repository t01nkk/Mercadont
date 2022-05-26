import { FETCH_PRODUCTS, SEARCH_PRODUCT } from "../actions/actionTypes";

export const initialState = {
  products: [],
  searchedProducts: [],
  state3: "estado state store#3",
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

    default:
      return state;
  }
}
export default reducer;
