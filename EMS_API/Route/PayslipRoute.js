const express = require('express');
const Route = express.Router();
const auth = require('../Middleware/Auth');


const payslipctrl = require('../Controller/payslipController');
Route.get('/ReceiveEmail', auth, payslipctrl.getPaslipsentData)

Route.get('/:date', auth, payslipctrl.payslipbyDatetitle);

Route.get('/:id/:title', auth, payslipctrl.payslipByidTitle);


module.exports = Route;