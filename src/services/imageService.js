
import axios from "axios";


export function sendImage(url, data) {
  console.log("Sending image2...")
  axios.post(`http://localhost:3008/${url}`,data)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
}

export function deleteImage(url, data) {
  console.log("Deleting image2...")
  axios.delete(`http://localhost:3008/${url}`,data)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
}
