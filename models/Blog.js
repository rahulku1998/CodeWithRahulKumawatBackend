const mongoose=require('mongoose');

const BlogSchema=mongoose.Schema({
  title:{
    type:String,
    required:true
  },
  description:{
    type:String,
    required:true
  },
  image:{
    type:String,
  },
 slug:{
    type:String,
    required:true,
    unique:true
 },
   category:{
     type:String,
     required:true
   }
   ,
   categorySlug:
  {
    type :String,
    required:true
  }
}
,
{
  timestamps:true
}
);
module.exports=mongoose.model("Blog", BlogSchema);