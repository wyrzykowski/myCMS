
import axios from "axios";


export function sendImage(url, data) {
  console.log("Sending image2...")
  axios.post(`http://localhost:3008/file/${url}`,data)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
}
