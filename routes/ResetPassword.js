const express=require('express');
const router=express.Router();

const ResetPassword =require("../controllers/ResetPassword");
router.post('/:token',ResetPassword.resetPassword);
module.exports=router;