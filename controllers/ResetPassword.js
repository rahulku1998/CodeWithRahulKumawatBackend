const User = require("../models/User");
const bcrypt = require("bcryptjs");


exports.resetPassword = async (req,res)=>{
   try{
      const {token} = req.params;
      const {password} = req.body;

      const user = await User.findOne({
         resetPasswordToken: token,
         resetPasswordExpire: {
            $gt: Date.now()
         }
      });

      if(!user){
         return res.status(400).json({
            message:"Token invalid or expired"
         })
      }

      const hashedPassword =
      await bcrypt.hash(password,10);

      user.password = hashedPassword;

      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;

      await user.save();

      return res.status(200).json({
         success:true,
         message:"Password updated successfully"
      })

   }catch(error){
      return res.status(500).json({
         message:error.message
      })
   }
}