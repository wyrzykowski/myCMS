import  axios from "axios";

var mediaUri;
if(process.env.REACT_APP_MEDIA_URI){
  mediaUri = process.env.REACT_APP_MEDIA_URI;
}else{
  mediaUri = "http://localhost:3008";
}


export function sendImage(url, data,callback) {
  console.log("Sending image2...")
  axios.post(`${mediaUri}/${url}`,data)
    .then(function (response) {
      console.log(response);
    }).then(callback)
    .catch(function (error) {
      console.log(error);
    });
}

export function deleteImage(url, data,callback) {
  console.log("Deleting image2...")
  axios.delete(`${mediaUri}/${url}`,data)
    .then(function (response) {
      console.log(response);
    }).then(callback)
    .catch(function (error) {
      console.log(error);
    });
}
