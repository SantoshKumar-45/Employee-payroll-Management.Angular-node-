const express=require('express');
const Route=express.Router();
const auth=require('../Middleware/Auth')
const salaryDatectrl=require('../Controller/getSavingSalaryDateControllre');

Route.get('/',auth,salaryDatectrl.getSalarySavingDate);

module.exports=Route;