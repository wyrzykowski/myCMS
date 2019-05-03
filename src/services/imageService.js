import  axios from "axios";
import { getAuthToken } from "./authService";

var mediaUri;
if(process.env.REACT_APP_MEDIA_URI){
  mediaUri = process.env.REACT_APP_MEDIA_URI;
}else{
  mediaUri = "http://localhost:3008";
}



export function sendImage(url, data,callback) {
  const authToken= {token:getAuthToken()};
  const dataToSave = {image: data, ...authToken};
  console.log("Sending image2...");

  axios.post(`${mediaUri}/${url}`,dataToSave)
    .then(function (response) {
      console.log(response);
    }).then(callback)
    .catch(function (error) {
      console.log(error);
    });
}

export function deleteImage(url, data,callback) {
  const authToken= {token:getAuthToken()};
  const dataToSave = {...authToken};
  console.log("Deleting image2...")
  axios.delete(`${mediaUri}/${url}`,{ data: dataToSave })
    .then(function (response) {
      console.log(response);
    }).then(callback)
    .catch(function (error) {
      console.log(error);
    });
}
