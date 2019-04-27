import http from "./httpService";
import jwtDecode from "jwt-decode";
const apiEndpoint = "/users/login";
const tokenKey = "token";

export async function login(email,password) {
  console.log({email,password});
  const { data} = await http.post(apiEndpoint,  {email, password});
  localStorage.setItem(tokenKey, data.token);
  http.setJwt(data.token); //set Jwt to allow user to edit pages
  console.log("TOKEN:",localStorage.getItem("token"));
}

export function logout() {
  localStorage.removeItem(tokenKey);
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    return jwtDecode(jwt);
  } catch (ex) {
    return null;
  }
}

export function loginWithJwt(jwt) {
  localStorage.setItem(tokenKey, jwt);
}

http.setJwt(getJwt());
export function getJwt() {
  return localStorage.getItem(tokenKey);
}

export default {
  login,
  logout,
  loginWithJwt,
  getCurrentUser,
  getJwt
};
