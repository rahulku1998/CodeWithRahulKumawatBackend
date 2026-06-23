exports.isAdmin=(req,res,next)=>{
  if(!req.user){
      return res.status(401).json({message:"Please Login First"});
  }
  if(req.user.role!=="admin"){
      return res.status(401).json({message:"You are not allowed to proceed"});
  }
  next();
}