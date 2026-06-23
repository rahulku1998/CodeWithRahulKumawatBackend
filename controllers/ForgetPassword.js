const crypto = require("crypto");
const User = require("../models/User");
const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});
exports.forgotPassword = async (req,res)=>{
   try{

      const {email} = req.body;

      const user = await User.findOne({email});

      if(!user){
         return res.status(404).json({
            message:"User not found"
         })
      }

      const resetToken = crypto.randomBytes(32).toString("hex");

      user.resetPasswordToken = resetToken;

      user.resetPasswordExpire =
         Date.now() + 15 * 60 * 1000; // 15 min

      await user.save();

      const resetUrl =
      `http://localhost:5173/reset-password/${resetToken}`;

      await transporter.sendMail({
         from:process.env.EMAIL,
         to:user.email,
         subject:"Password Reset",
         html:`
            <h2>Reset Password</h2>
            <p>Click below link:</p>
            <a href="${resetUrl}">
               Reset Password
            </a>
         `
      });
       await user.save();

      return res.status(200).json({
         success:true,
         message:"Reset email sent"
      })

   }catch(error){
      return res.status(500).json({
         message:error.message
      })
   }
}