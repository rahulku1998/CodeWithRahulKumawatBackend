const express=require('express');
const router=express.Router();
const FreelanceController=require('../controllers/Freelance');
router.get('/', FreelanceController.getAllFreelances);
router.post('/', FreelanceController.createFreelance);
module.exports=router;