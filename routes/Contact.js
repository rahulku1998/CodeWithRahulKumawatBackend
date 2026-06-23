const express=require('express');
const router=express.Router();
const ContactController=require('../controllers/Contact');
router.post('/', ContactController.createContact);
module.exports=router;