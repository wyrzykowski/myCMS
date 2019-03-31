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
    convertToJpeg('./../public/backgrounds', filename) //convert and save to local disk
  }catch(e){
    console.log("User not include picture")
  }
})

//POST MULTIPLE FILES
app.post(`/files/:folderName/:fileName`,(req,res)=>{
  const folderName = req.params.folderName;
  const fileName = req.params.fileName;
  console.log("WYSLANE PLIKI",folderName,fileName);
  res.send("file received"+fileName);
 // console.log("received ",res)//
  var filepath;
  //console.log("length",req.body);
  try {
    //Have to delete extension from name setting because it will be added  by base64Image
   var newFileName = fileName.replace(".jpg","")
    filepath = base64Img.imgSync(req.body.file, `./../public/${folderName}`,newFileName );
    convertToJpeg(`./../public/${folderName}`, newFileName) //convert and save to local disk
  }catch(e){
    console.log("User not include picture")
    res.status(400).send(e);
  }
})

app.delete(`/files/:folderName/:fileName`,(req,res)=>{
  const folderName = req.params.folderName;
  const fileName = req.params.fileName;
  console.log("USUWAM PLIKI",folderName,fileName);
  fs.unlink(`./../public/${folderName}/${fileName}`,(e)=>{
    if(e) {
      console.log(e)
      res.status(400).send(e);
    }
    res.status(200).send(fileName);

  })

})


app.listen(port,()=>{
  console.log(`started server on port ${port}`);
});

module.exports = {app};