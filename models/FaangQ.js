const mongoose=require('mongoose');

const FaangQSchema=mongoose.Schema({
  question:{
    type:String,
    required:true
  },
  answer:{
    type:String,
    required:true
  }
  ,
  link:{
    type:String,
  },
  category:{
    type:String,
    required:true
  },
  categorySlug:
  {
    type :String,
    required:true
  },
  title:{
    type:String,
    required:true
  },
  slug:{
    type:String,
    required:true,
    unique:true
  }

},
{
  timestamps:true
}
);
module.exports=mongoose.model("FaangQ", FaangQSchema);
