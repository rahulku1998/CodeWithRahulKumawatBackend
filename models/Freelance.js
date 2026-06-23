const mongoose=require('mongoose');

const FreelanceSchema=mongoose.Schema({
  name:{
    type:String,
    required:true
  },
  email:{
    type:String,
    required:true
  },
  phone:{
    type:String,
    required:true
  },
  projectDeadline:{
    type:Number,
    required:true
  },
  projectDescription:{
    type:String,
    required:true
  },
},
{
  timestamps:true
}

);

module.exports=mongoose.model('Freelance', FreelanceSchema);