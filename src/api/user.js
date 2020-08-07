import {postRequest, postRequestJson, service} from "@/api/api";

export const hasUsername = username => {
  return service.get(`/api/hasUsername?username=${username}`)
};

export const hasEmail = email => {
  return service.get(`/api/hasEmail?email=${email}`)
};

export const updateProfile = data => {
  return postRequestJson('/api/user/profile/update', data)
};

export const updateEmail = data => {
  return postRequest('/api/user/profile/updateEmail', data)
};

export const updatePass = data => {
  return postRequest('/api/user/profile/updatePass', data)
};