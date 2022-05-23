import React, { useReducer, useContext } from "react";

//creamos la store
const Store = React.createContext();
//useContext me devuelve el array con el estado del store y la funcion dispatch que me permite modif el store
export const useStore = () => useContext(Store);

export const StoreProvider = ({ children, reducer, initialState }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return <Store.Provider value={[state, dispatch]}>{children}</Store.Provider>;
};
