import http from "./httpService";
export function getSubpage(subpage) {
  return http.get(`/${subpage}`);
}

export function saveSubpage(subpage,name) {
  if (subpage._id) {//check if subpage body have ID if yes body belong to database
    //update existing subpage
    const body = { ...subpage };
    return http.patch(`/edit/${name}`, body);
  }
  const dataToCreateSubPage = {
    page : name,
    ...subpage
  };
  console.log(dataToCreateSubPage);
  return http.post(`/subpage`, dataToCreateSubPage); // create new move
}
