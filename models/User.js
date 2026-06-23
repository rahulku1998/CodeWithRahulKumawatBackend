const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: { 
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    college:{
      type: String,
      required: true,
    },
    experience: {
      type:Number,
      default: 0,
    },
    linkedin: {
      type: String,
    },
    github: {
      type: String,
    },
    leetcode: {
      type: String,
    },
    resetPasswordToken:{
      type:String
    },
  resetPasswordExpire:{
   type:Date
  }
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("User", UserSchema);