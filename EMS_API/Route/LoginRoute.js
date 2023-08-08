const express=require('express');
const Route =express.Router();

const loginController=require('../Controller/loginController');

Route.post('/',loginController.UsersSign);

module.exports=Route;