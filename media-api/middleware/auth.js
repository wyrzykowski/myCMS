const appUri = "http://localhost:3001/fakfajzer";
const  axios = require("axios");
//token is send to main API, it check user if exist and includes token, if exist response true if not false.

const auth = async (req, res, next) => {
  console.log("try auth media");
  try {
    console.log("Auth...")
    const token = req.header('Authorization').replace('Bearer ', ''); // remove Bearer from  header value string

    axios.post(`${appUri}/media-auth`, { token }).then((response) => {
        if(response.data.authorized) next();//if authoricated execute rest of code
        else res.status(401).send(); //send to web client unauthorized.
           })
      .catch((error) => {
        res.status(500).send();
      });

  } catch (e) {
    console.log("401")
    res.status(401).send({ error: 'You are not authenticated.' })
  }
};

module.exports = auth;