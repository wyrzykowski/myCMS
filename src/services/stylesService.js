import { toast } from "react-toastify";
import  axios from "axios";

const mediaUri = "http://localhost:3008";

export function sendStyle(data,callback) {
  axios.post(`${mediaUri}/style`,data)
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
    axios.get(`${mediaUri}/style`)
      .then(function(response) {
        console.log(response);
        resolve(response);
      })
      .catch(function(error) {
        reject(error);
      });

  });
}
