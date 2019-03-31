const fs = require("fs")
const imagemin = require('imagemin');
const pngToJpeg = require('png-to-jpeg');
const base64Img = require('base64-img');

const convertToJpeg=(filePath,filename)=>{
  console.log("File Path:",filePath,"FileName: ",filename)
  imagemin([`${filePath}/*.png`], `${filePath}`, { //get all .png files and convert to jpg fromat
    plugins: [
      pngToJpeg({quality: 90})
    ]
  }).then((files) => {
    //pngTojpg is not changing file extension, do it manually:

      console.log("chage to jpg")
      fs.renameSync(`${filePath}/${filename}.png`, `${filePath}/${filename}.jpg`, function(err) {
        if ( err ) console.log('User send image in jpg format');
      })

  }).catch(e=>{console.log("error, or already in jpg format")})

}

module.exports = convertToJpeg;