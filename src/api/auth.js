import store from '../store'

const TokenKey = 'token';

export const getToken = () => {
  return localStorage.getItem(TokenKey)
};

export const setToken = token => {
  return localStorage.setItem(TokenKey, token)
};

export const removeToken = () => {
  return localStorage.removeItem(TokenKey)
};

export const hasPermission = role => {
  return store.getters.roles && store.getters.roles.some(auth => auth.authority === role)
};

export const isLogin = () => {
  return store.getters.user.username;
};

export const needGetInfo = () => {
  return store.getters.token && !store.getters.user.username;
};
