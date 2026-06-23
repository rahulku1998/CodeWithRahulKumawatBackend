const express=require('express');
const router=express.Router();
const ForgetPass =require("../controllers/ForgetPassword.js");
router.post('/',ForgetPass.forgotPassword);
module.exports=router;