const util = require("util");
const multer = require("multer");
const maxSize = 8 * 1024 * 1024;
const path = require('path');


// console.log(__dirname);
// set up storage engine
let storage = multer.diskStorage({
  //destination determines folder to store the uploaded files.
  destination: (req, file, cb) => {
    cb(null, "fileUploads/");
  },

  //filename determines the name of the file inside the destination folder.
  filename: (req, file, cb) => {
    console.log("fileOrgName--->",file.originalname);
    //send date same  in db and storage
    let fileName = file.fieldname + '-' + Date.now() + path.extname(file.originalname);
    req.NewFileName = fileName,
      cb(null, fileName);
  }
});

// initialize upload middleware
let uploadFile = multer({
  storage: storage,
  //Restrict file size with Multer
  limits: { fileSize: maxSize },
}).single("file");

//util.promisify() makes the exported middleware object can be used with async-await
let uploadFileMiddleware = util.promisify(uploadFile);

module.exports =  {uploadFileMiddleware} ;