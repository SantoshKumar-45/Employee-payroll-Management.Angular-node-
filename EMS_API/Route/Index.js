const express = require('express');
const Route = express.Router();


const loginRoute = require('./LoginRoute');
Route.use('/user', loginRoute);

const SalaryRoute = require('./SalaryheadRoute');
Route.use('/salary', SalaryRoute);


const emailRoute = require('./Payslip_emailRoute');
Route.use('/email', emailRoute);

const employRoute = require('./employeeRoute');
Route.use('/employee', employRoute)

const exportRoute = require('../Route/exportSalarySheetRoute');
Route.use('/SalarySheet', exportRoute);

const payslipRoute = require('../Route/PayslipRoute');
Route.use('/payslip', payslipRoute);

const attendenceRoute = require('../Route/attendenceRoute');
Route.use('/empAttendance', attendenceRoute);

const disbursementRoute = require('../Route/disbursementRoute');
Route.use('/disbursementReport', disbursementRoute);

const saldateRoute = require('../Route/SalarygetDateRoute');
Route.use('/savedate', saldateRoute);

const changepasswordRoute=require('../Route/changePasswordRoute');
Route.use('/password',changepasswordRoute);

const uploadphotoRoute=require('../Route/employeePhotoRoute');
Route.use('/empProfilePic',uploadphotoRoute);

module.exports = Route;