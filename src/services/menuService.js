import http from "./httpService";
export function getMenu(menu) {
  return http.get(`/nav/${menu}`);
}

export function saveMenu(menuData,name) {
  if (menuData._id) {//check if subpage body have ID if yes body belong to database
    //update existing subpage
    const body = { ...menuData };
    return http.patch(`/nav/${name}`,body);
  }
  return http.post(`/nav`, menuData);
}
