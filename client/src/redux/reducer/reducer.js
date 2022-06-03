import {
  FETCH_PRODUCTS,
  SEARCH_PRODUCT,
  FETCH_CATEGORIES,
  USER_SESSION,
  ORDER_BY_ASCDESC_PRICE,
  FILTER_BY_PRICE,
  SORT_BY_PRICE_CAT,
  CATEGORIES_PRODUCT,
  SORTED_PRICE_PRODUCTS,
  ADMIN_SESSION,
  GET_FAVORITES
} from "../actions/actionTypes";

export const initialState = {
  products: [],
  searchedProducts: [],
  filter: [],
  categories: [],
  user: "",
  session: false,
  admin: {},
  sessionAdmin: false,
  favorites:[],
  adminPorductList: [],
};

export function reducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_PRODUCTS: {
      return {
        ...state,
        products: action.payload,
      };
    }
    case SORTED_PRICE_PRODUCTS: {
      return {
        ...state,
        products: action.payload,
      };
    }
    case SEARCH_PRODUCT: {
      return {
        ...state,
        searchedProducts: action.payload,
        filter: action.payload,
      };
    }
    case CATEGORIES_PRODUCT: {
      return {
        ...state,
        products: action.payload,
      };
    }

    case FILTER_BY_PRICE: {
      return {
        ...state,
        searchedProducts: action.payload,
      };
    }


    case ORDER_BY_ASCDESC_PRICE: {
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
        ...state,
      };
    }

    case SORT_BY_PRICE_CAT: {
      let order;

      if (action.payload === "ASCENDING") {
        order = state.products.sort(function (a, b) {
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
        order = state.products.sort(function (a, b) {
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
        ...state,
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
    case ADMIN_SESSION: {
      return {
        ...state,
        admin: action.payload.admin,
        sessionAdmin: action.payload.sessionAdmin,
      };
    }
    case GET_FAVORITES:{
      return{
        ...state,
        favorites:action.payload
      }
    }
    default:
      return state;
  }
}
export default reducer;
