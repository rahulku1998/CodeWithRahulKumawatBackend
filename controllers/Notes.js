const Notes=require("../models/Notes");
const generateSlug = (text) => {
  return text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "");
};
exports.createNotes=async(req,res)=>{
  try {
    const {title,description,link,category}=req.body;
    const slug = generateSlug(title);
    const categorySlug = generateSlug(category);
    const notes = new Notes({ title, description, link, category, slug, categorySlug });
    await notes.save();
    res.status(201).json(notes);
  } 
   catch (error) {
    res.status(500).json({message:error.message});
  } 
};
exports.getAllNotes=async(req,res)=>{
  try {
    const notes=await Notes.find().sort({createdAt:1});
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({message:error.message});
  }
};
exports.getNotesBySlug=async(req,res)=>{
  try {
    const notes=await Notes.findOne({slug:req.params.slug,categorySlug:req.params.categorySlug});
    if(!notes){
      return res.status(404).json({message:"Notes not found"});
    }
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({message:error.message});
  }
};
exports.getNotesByCategorySlug=async(req,res)=>{
  try {
    const notes=await Notes.find({categorySlug:req.params.categorySlug}).sort({createdAt:1});  
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({message:error.message});
  }
};
exports.updateNotes=async(req,res)=>{
  try {
    const {title,description,link,category}=req.body;

    const notes=await Notes.findOneAndUpdate({slug:req.params.slug,categorySlug:req.params.categorySlug},{title,description,link,category},{new:true});
    if(!notes){
      return res.status(404).json({message:"Notes not found"});
    }
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({message:error.message});
  }
};
exports.deleteNotes=async(req,res)=>{
  try {
    const notes=await Notes.findOneAndDelete({slug:req.params.slug,categorySlug:req.params.categorySlug});
    if(!notes){
      return res.status(404).json({message:"Notes not found"});
    }
    res.status(200).json({message:"Notes deleted successfully"});
  } catch (error) {
    res.status(500).json({message:error.message});
  }
}

