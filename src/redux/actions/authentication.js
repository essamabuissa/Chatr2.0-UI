import jwt_decode from "jwt-decode";

import { SET_CURRENT_USER } from "./actionTypes";

import instance from "./instance";

export const checkForExpiredToken = () => {
  return dispatch => {
    const token = localStorage.getItem("token");

    if (token) {
      const currentTime = Date.now() / 1000;

      const user = jwt_decode(token);
      if (user.exp >= currentTime) {
        dispatch(setCurrentUser(user));
      } else {
        logout();
      }
    }
  };
};

const setAuthToken = token => {
  if (token) {
    instance.defaults.headers.common.Authorization = `jwt ${token}`;
    localStorage.setItem("token", token);
  } else {
    delete instance.defaults.headers.common.Authorization;
    localStorage.removeItem("token");
  }
};

const setCurrentUser = user => ({
  type: SET_CURRENT_USER,
  payload: user
});

/*
 *
 * You can combine the login() and signup() actions into a single action
 * that receives a type.
 * This way you can avoid a lot of unnecessary logic and repetitive code.
 *
 */

export const login = (userData, history) => async dispatch => {
  try {
    const res = await instance.post("/login/", userData);
    const { token } = res.data;

    const decodeUser = jwt_decode(token);
    setAuthToken(token);
    dispatch(setCurrentUser(decodeUser));
    history.push("/welcome");
  } catch (error) {
    console.error(error.response.data);
  }
};

export const signup = (userData, history) => async dispatch => {
  try {
    const res = await instance.post("/signup/", userData);
    const { token } = res.data;
    const decodeUser = jwt_decode(token);
    setAuthToken(token);
    dispatch(setCurrentUser(decodeUser));
    history.push("/welcome");
  } catch (error) {
    console.error(error.response.data);
  }
};

export const logout = () => {
  setAuthToken(null);
  return setCurrentUser(null);
};
