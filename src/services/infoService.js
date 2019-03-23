import http from "./httpService";

export function getSubpage() {
  return http.get(`/myCMS`);
}
