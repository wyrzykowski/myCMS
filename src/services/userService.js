import http from "./httpService";

export function getUserInfo() {
  return http.get(`/users/me`);
}


