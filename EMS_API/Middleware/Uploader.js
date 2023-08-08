// const multer = require('multer');
// const uniqid = require('uniqid'); 
// const path = require('path');

// const storage = multer.diskStorage({
//     destination: function(req, file, cb) {
//         cb(null, 'fileUploads/')
//     },
//     filename: function(req, file, cb) {
       
//         let filename=file.fieldname + '-'+Date.now() + uniqid() +file.originalname;
//         req.Filename=filename;
//         cb(null, filename)
//     }
// })
// const upload = multer({ storage: storage });

// exports.upload = (field) => upload.single(field); 