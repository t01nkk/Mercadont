import {} from "../actions/actionTypes";

export const initialState = {
  state1: "estado state store#1",
  state2: "estado state store#2",
  state3: "estado state store#3",
};

export function reducer(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}
export default reducer;
