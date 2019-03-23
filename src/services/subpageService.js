import http from "./httpService";

export function getSubpage(subpage) {
  return http.get(`/${subpage}`);
}
