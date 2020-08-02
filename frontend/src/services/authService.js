import jwtDecode from "jwt-decode";

import http from "./httpService";

const tokenKey = "token";

http.setJwt(getJwt());

export async function login(username, password) {
  const { data: jwt } = await http.post("/api/login", { username, password });
  sessionStorage.setItem(tokenKey, jwt);
}

export function loginWithJwt(jwt) {
  sessionStorage.setItem(tokenKey, jwt);
}

export function logout() {
  sessionStorage.removeItem(tokenKey);
}

export function getCurrentUser() {
  try {
    const jwt = sessionStorage.getItem(tokenKey);
    return jwtDecode(jwt);
  } catch (ex) {
    return null;
  }
}

export function getJwt() {
  return sessionStorage.getItem(tokenKey);
}

export async function getGroups() {
  return await http.get(`/api/activedir/gruposbd`);
}
