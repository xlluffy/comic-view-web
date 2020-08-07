import axios from 'axios'
import Qs from 'qs'
import store from '../store'
import router from '../router'
import {getToken} from "@/api/auth";

// axios.defaults.withCredentials = true;
const tokenHeader = 'authorization';

export const service = axios.create({
  baseURL: '',
  timeout: 15000,
  headers: {

  }
});

const whiteList = ['/api/login', '/api/register'];

service.interceptors.request.use(config => {
  if (store.getters.token && !whiteList.includes(config.url)) {
    config.headers[tokenHeader] = getToken();
  }
  return config;
}, error => {
  console.log(error);
  // Promise.reject(error)
});

service.interceptors.response.use(response => {
  const res = response.data;
  if (res.code !== 200) {
    console.log(res);
    if (res.code === 401) {
      store.commit("CLEAR_INFO");
      // return router.replace('/401')
    } else if (res.code === 403) {
      return router.replace('/403')
    } else if (res.code === 404) {
      return router.replace('/404')
    }
    return Promise.reject(res.data)
  } else {
    const token = response.headers[tokenHeader];
    if (token) {
      store.commit('SET_TOKEN', token);
    }
    return res.data;
  }
}, error => {
  console.log("something errors: " + error);
  return Promise.reject(error)
});

export function postRequest(url, params) {
  return service.post(url, Qs.stringify(params))
}

export function postRequestJson(url, params) {
  return service.post(url, params,{
    headers: {
      'Content-Type':  'application/json;charset=UTF-8'
    }
  })
}

export function putRequest(url, params) {
  return service.put(url, params, {
    headers: {
      'Content-Type':  'application/json;charset=UTF-8'
    }
  })
}

/**
 * The sendBeacon() method does not provide ability to customize the request method,
 * provide custom request headers, or change other processing properties of the request and response.
 * @see https://w3c.github.io/beacon/
 * @param url
 * @param data
 */
export function sendBeacon(url,data) {
  const formData = new FormData();
  formData.append('record', JSON.stringify(data));
  formData.append('Authorization', getToken());
  navigator.sendBeacon(url, formData);
}

