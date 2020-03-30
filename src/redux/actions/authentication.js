import jwt_decode from "jwt-decode";

import { SET_CURRENT_USER } from "./actionTypes";
import { resetErrors } from "./index";
import { setErrors } from "./index";

import instance from "./instance";

export const checkForExpiredToken = () => {
  return dispatch => {
    const token = localStorage.getItem("token");

    if (token) {
      const currentTime = Date.now() / 1000;

      const user = jwt_decode(token);
      if (user.exp >= currentTime) {
        dispatch(setCurrentUser(user));
        console.log(user);
      } else {
        logout();
      }
    }
  };
};

const setLocalStorage = token => {
  if (token) {
    localStorage.setItem("token", token);
  } else {
    localStorage.removeItem("token");
  }
};

const setAuthToken = token => {
  if (token) {
    instance.defaults.headers.common.Authorization = `jwt ${token}`;
  } else {
    delete instance.defaults.headers.common.Authorization;
  }
};

const setCurrentUser = user => ({
  type: SET_CURRENT_USER,
  payload: user
});

export const registerForm = (userData, history, type) => async dispatch => {
  try {
    const res = await instance.post(`/${type}/`, userData);
    const { token } = res.data;
    dispatch(resetErrors());

    const decodeUser = jwt_decode(token);
    setLocalStorage(token);
    setAuthToken(token);
    dispatch(setCurrentUser(decodeUser));
    history.push("/welcome");
  } catch (error) {
    dispatch(setErrors(error.response.data));
    console.error(error.response.data);
  }
};

export const logout = () => {
  setLocalStorage();
  setAuthToken(null);
  return setCurrentUser(null);
};
