import { FETCH_PRODUCTS } from "../actions/actionTypes";
import DBProducts from "../../products.json";
export const initialState = {
  products: DBProducts,
  state2: "estado state store#2",
  state3: "estado state store#3",
};

export function reducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_PRODUCTS: {
      return {
        ...state,
        products: action.payload,
      };
    }
    default:
      return state;
  }
}
export default reducer;
