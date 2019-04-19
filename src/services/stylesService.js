import axios from "axios";


export function sendStyle(url,data,callback) {
  axios.post(`http://localhost:3008/style`,data)
    .then(function (response) {
      console.log(response);
    }).then(callback)
    .catch(function (error) {
      console.log(error);
    });
}

export function getStyle(url) {
  axios.get(`http://localhost:3008/style`)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
}
