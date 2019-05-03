import { toast } from "react-toastify";
import  axios from "axios";
import {getAuthToken} from "./authService";
var mediaUri;
if(process.env.REACT_APP_MEDIA_URI){
   mediaUri = process.env.REACT_APP_MEDIA_URI;
}else{
   mediaUri = "http://localhost:3008";
}


export function sendStyle(data,callback) {
  const authToken= {token:getAuthToken()};
  const dataToSave = {style: data, ...authToken};
  console.log("dataToSave",dataToSave)
  axios.post(`${mediaUri}/style/save`,dataToSave)
    .then(function (response) {
      console.log(response);
      toast.success("Colors set.");
    }).then(callback)
    .catch(function (error) {
      console.log(error);
      toast.error("An error occured.");
    });
}

export function getStyle(url) {
  const authToken= {token:getAuthToken()};
  const dataToSend = {...authToken};
  return new Promise(function(resolve, reject) {
    axios.post(`${mediaUri}/style/get`,dataToSend)
      .then(function(response) {
        console.log(response);
        resolve(response);
      })
      .catch(function(error) {
        reject(error);
      });

  });
}
