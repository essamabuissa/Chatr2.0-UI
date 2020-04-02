import { SET_LOADING } from "../actions/actionTypes";

/**
 * If you're going to do this, then you need a way to UNSET loading
 */
const initialState = { loading: false };
const reducer = (state = initialState, { type }) => {
  switch (type) {
    case SET_LOADING:
      return { loading: true };
    default:
      return state;
  }
};
export default reducer;
