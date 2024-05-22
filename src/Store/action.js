import { BASE_URL, SET_LOGIN, SET_LOGIN_TOGGLE } from "./actionType";
export const setLogin = (login) => ({
  type: SET_LOGIN,
  payload: login,
});

export const baseurl = () => ({
  type: BASE_URL,
});
export const setLoginToggle = (toggle) => ({
  type: SET_LOGIN_TOGGLE,
  payload: toggle,
});
