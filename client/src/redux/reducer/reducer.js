import { FETCH_PRODUCTS, POST_MANY_PRODUCTS } from "../actions/actionTypes";
import DBProducts from "../../productsCats.json";

export const initialState = {
  products: [],
  state2: "estado state store#2",
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
    case POST_MANY_PRODUCTS:{
      return{
        ...state
      }
    }
    default:
      return state;
  }
}
export default reducer;
