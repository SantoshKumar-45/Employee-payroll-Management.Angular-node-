const express = require('express');
const Route = express.Router();

const uploadFile = require("../Middleware/FileUpload");
const empPicCtrl = require("../Controller/emplProfilephotoController");

Route.patch('/:id',uploadFile.uploadFileMiddleware,empPicCtrl.upload);

Route.get('/:name',empPicCtrl.download);


module.exports = Route;