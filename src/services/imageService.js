import axios from "axios";


export function sendImage(url, data,callback) {
  console.log("Sending image2...")
  axios.post(`http://localhost:3008/${url}`,data)
    .then(function (response) {
      console.log(response);
    }).then(callback)
    .catch(function (error) {
      console.log(error);
    });
}

export function deleteImage(url, data,callback) {
  console.log("Deleting image2...")
  axios.delete(`http://localhost:3008/${url}`,data)
    .then(function (response) {
      console.log(response);
    }).then(callback)
    .catch(function (error) {
      console.log(error);
    });
}
