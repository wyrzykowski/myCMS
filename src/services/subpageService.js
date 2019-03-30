import http from "./httpService";
export function getSubpage(subpage) {
  return http.get(`/${subpage}`);
}

export function saveSubpage(subpage,name) {
  console.log("sibapge",subpage)
  if (subpage._id) {//check if subpage body have ID if yes body belong to database
    //update existing subpage
    console.log("im here")
    const body = { ...subpage };
    return http.patch(`/edit/${name}`, body);
  }
  return http.post(`/${name}`, subpage); // create new move
}
