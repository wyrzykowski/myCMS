import http from "./httpService";
export function getPages(pageName) {
  return http.get(`/pages/${pageName}`);
}

export function savePages(page,pageName) {
  if (page._id) {//check if subpage body have ID if yes body belong to database
    //update existing subpage
    const body = { ...page };
    return http.patch(`/pages/${pageName}`, body);
  }
  return http.post(`/pages/${pageName}`, page);
}
