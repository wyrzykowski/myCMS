const fs = require("fs")
const imagemin = require('imagemin');
const pngToJpeg = require('png-to-jpeg');
const base64Img = require('base64-img');

const convertToJpeg=(filePath,filename)=>{
  imagemin([`${filePath}`], "./../my-cms/public/backgrounds", {
    plugins: [
      pngToJpeg({quality: 90})
    ]
  }).then((files) => {
    //rename form png to jpg
    fs.rename(`./../my-cms/public/backgrounds/${filename}.png`, `./../my-cms/public/backgrounds/${filename}.jpg`, function(err) {
      if ( err ) console.log('ERROR: ' + err);
    });

    // Please keep in mind that all files now have the wrong extension
    // You might want to change them manually
    console.log('PNGs converted to JPEGs:', files);
    console.log(filename);
  }).catch(e=>{console.log("error, or already in jpg format")})

}

module.exports = convertToJpeg;