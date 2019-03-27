require("./config/config.js");
const _ = require("lodash");
const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs")
const base64Img = require('base64-img');
const app = express();
const port  = process.env.PORT;
const cors = require("cors");
const obrazek="jeszcze nic";
const convertToJpeg = require("./utils/convert-to-jpeg");
// app.use(bodyParser.json()); //body parser will automatically parse JSON to object JS when req sth.
app.use(bodyParser.json({limit: '50mb'}))// to use bigger file than 1mbprobably
app.use(cors());



const info ={name:'mycms-media-api',ver:' 1.0.0',dedicated:'Fakfajzer',author:'Karol Wyrzykowski'}
const appName='fakfajzer';

app.get('/file', function (req, res, next) {

  var options = {
    root: './../public/',
    dotfiles: 'deny',
    headers: {
      'x-timestamp': Date.now(),
      'x-sent': true
    }
  };

  console.log(options.root)

  var fileName = req.params.name;
  res.sendFile("about.jpg", options, function (err) {
    if (err) {
      next(err);
    } else {
      console.log('Sent:', obrazek);
    }
  });

});


app.post(`/file/:filename`,(req,res)=>{
var filename = req.params.filename;
      res.send("file received");
      //console.log("received ",res)//
  var filepath;
  try {
    filepath = base64Img.imgSync(req.body.file, './../public/backgrounds', filename);
    convertToJpeg('./../public/backgrounds', filename)
  }catch(e){
    console.log("User not include picture")
  }



})

app.listen(port,()=>{
  console.log(`started server on port ${port}`);
});

module.exports = {app};