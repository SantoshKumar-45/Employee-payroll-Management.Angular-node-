const express=require('express');
const Route=express.Router();
const auth=require('../Middleware/Auth');
const changepwdCtrl=require('../Controller/changePasswordController');

Route.post('/Update',auth,changepwdCtrl.UpdatePassword);

module.exports=Route;