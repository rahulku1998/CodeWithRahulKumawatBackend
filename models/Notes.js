const mongoose=require('mongoose');
const NotesSchema=mongoose.Schema({
  title:{
    type:String,
    required:true
  },
  description:{
    type:String,
    required:true
  },
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
  slug:{
    type:String,
    required:true,
    unique:true
  }
},
{
  timestamps:true
}
 )
 module.exports=mongoose.model("Notes", NotesSchema);