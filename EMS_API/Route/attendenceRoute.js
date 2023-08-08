const express=require('express');
const Route=express.Router();
const auth=require('../Middleware/Auth')
const empAttendanceCtrl=require('../Controller/attendenceSalaryController');


//emp details for attendance and salary 
Route.get('/',auth,empAttendanceCtrl.getEmployee);

// attendance and salary  save of all employee
Route.post('/',auth,empAttendanceCtrl.saveAttendance);
 
//salary table
Route.get('/salary',auth,empAttendanceCtrl.getSalaryTitle);

// save attendance list , title is month-year(eg.-june-2023)
Route.get('/:title',auth,empAttendanceCtrl.getPreviousAttendance);


module.exports=Route;