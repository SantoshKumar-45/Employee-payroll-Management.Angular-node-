const express=require('express');
const Route=express.Router();
const auth=require('../Middleware/Auth')
const salaryCtrl=require('../Controller/salaryheadController');

Route.post('/',auth,salaryCtrl.SetsalaryHead);
Route.get('/head',auth,salaryCtrl.getSalaryHeadData);
Route.get('/data',auth,salaryCtrl.GetSalaryData);

module.exports=Route;