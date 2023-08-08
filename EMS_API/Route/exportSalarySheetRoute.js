const express=require('express');
const Route =express.Router();
const auth=require('../Middleware/Auth')
const exportController =require('../Controller/exportSalarySheetController');

Route.get('/:title',auth,exportController.showSalarySheetByDate);

Route.get('/download/export', exportController.exportSalarySheet);

module.exports=Route;