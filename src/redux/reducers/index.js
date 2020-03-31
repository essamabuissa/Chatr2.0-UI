import { combineReducers } from "redux";

// Reducers
import userReducer from "./user";
import errorReducer from "./errors";
import channelsReducer from "./channels";

export default combineReducers({
  channels: channelsReducer,
  user: userReducer,
  errors: errorReducer
});
