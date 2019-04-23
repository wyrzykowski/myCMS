import axios from "axios";
import { toast } from "react-toastify";


export function sendStyle(data,callback) {
  axios.post(`http://localhost:3008/style`,data)
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
  return new Promise(function(resolve, reject) {
    axios.get(`http://localhost:3008/style`)
      .then(function(response) {
        console.log(response);
        resolve(response);
      })
      .catch(function(error) {
        reject(error);
      });

  });
}
