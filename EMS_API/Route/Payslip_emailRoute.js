const express=require('express');
const Route =express.Router();
const auth=require('../Middleware/Auth');


const mailController=require('../Controller/sendMailPayslipController');

// send payslip attacahment ,upload('file')

Route.post('/',auth,mailController.sendEmailEmployee);

module.exports=Route;