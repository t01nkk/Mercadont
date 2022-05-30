
import {
  FETCH_PRODUCTS,
  SEARCH_PRODUCT,
  FETCH_CATEGORIES,
  SORT_BY_PRICE,
  FILTER,
  FILTER2,
  CATEGORIES_PRODUCT
 
} from "../actions/actionTypes";

export const initialState = {
  products: [],
  searchedProducts: [],
  filter: [],
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
        filter: action.payload
      };
    }
    case CATEGORIES_PRODUCT: {
      return {
        ...state,
       products: action.payload,
       
      };
    }

    case FILTER: {


      return {
        ...state,
        searchedProducts: action.payload
      };
    }
    case FILTER2: {

     
      return {
        ...state,
        searchedProducts: action.payload
      };
    }
   
    
  

    case SORT_BY_PRICE: {

      let order;

      if (action.payload === "ASCENDING") {
        order = state.searchedProducts.sort(function (a, b) {
          if (a.price > b.price) {
            return 1;
          }
          if (a.price < b.price) {
            return -1;
          }
          return 0;
        });
      }
      if (action.payload === "DESCENDING") {
        order = state.searchedProducts.sort(function (a, b) {
          if (a.price > b.price) {
            return -1;
          }
          if (a.price < b.price) {
            return 1;
          }
          return 0;
        });
      }
      return {
        ...state, searchedProducts: order
      }
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
