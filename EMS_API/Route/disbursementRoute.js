const express = require('express');
const Route = express.Router();
const auth = require('../Middleware/Auth')
const dishbursementReportCtrl = require('../Controller/disbursementController');

Route.get('/title', auth, dishbursementReportCtrl.getdis_ReportbyTitle);
Route.get('/export/title', dishbursementReportCtrl.exportdisbursementReportbyTitle);
Route.get('/download/pdf',  dishbursementReportCtrl.downloadPdfDisbursement);

module.exports = Route;