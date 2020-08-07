import {postRequest, service} from './api'

export const login = userInfo => {
  return postRequest('/api/login', userInfo)
};

export const register = userInfo => {
  return postRequest('/api/register', userInfo)
};

export const getInfo = () => {
  return service.get('/api/user/info')
};

export const logout = () => {
  return service.get('/api/logout')
};
