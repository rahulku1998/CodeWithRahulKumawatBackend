const express=require('express');
const router=express.Router();
const AuthController =require("../controllers/AuthController");
router.post('/',AuthController.registerUser);
module.exports=router;

