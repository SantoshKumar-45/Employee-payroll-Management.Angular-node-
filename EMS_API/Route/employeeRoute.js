const express = require('express');
const Route = express.Router();

const uploadFile = require("../Middleware/FileUpload");
const {upload} =require('../Middleware/Uploader');
const auth=require('../Middleware/Auth')

const employeeCtrl = require('../Controller/employeeController');

Route.post('/',auth,uploadFile.uploadFileMiddleware,employeeCtrl.crtEmployee);
// Route.post('/',employeeCtrl.employee);

Route.get('/',auth,employeeCtrl.getEmployee);
// Route.get('/salary',auth,employeeCtrl.getEmployeeAndSalary);

Route.get('/:id',auth,employeeCtrl.getEmpById);

Route.put('/:id',auth,uploadFile.uploadFileMiddleware,employeeCtrl.updateEmp);

Route.delete('/:id',auth,employeeCtrl.deleteEmp);


module.exports = Route;