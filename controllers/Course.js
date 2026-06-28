const Course=require('../models/Course');
const generateSlug = (title) => {
  return title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
};
exports.getAllCourses=async(req,res)=>{
  try {
    const courses=await Course.find().sort({createdAt:1}); 
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({message:error.message});
  }
};
exports.getCourseBySlug=async(req,res)=>{
  try {
    const course=await Course.findOne({slug:req.params.slug,categorySlug:req.params.categorySlug});
    if(!course){
      return res.status(404).json({message:"Course not found"});
    }
    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({message:error.message});
  }
};
exports.getCoursesByCategorySlug=async(req,res)=>{
  try {
    const courses=await Course.find({categorySlug:req.params.categorySlug}).sort({createdAt:1});
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({message:error.message});
  }
};
exports.createCourse=async(req,res)=>{
  try {
    const {title,description,category,link}=req.body;
    const slug=generateSlug(title);
    const categorySlug=generateSlug(category);
    const course=new Course({title,description,category,link,slug,categorySlug});
    await course.save();
    res.status(201).json(course);
  } catch (error) {
    res.status(500).json({message:error.message});
  }
};
exports.updateCourse=async(req,res)=>{
  try {
    const {title,description,category,link}=req.body;
    const slug=generateSlug(title);
    const categorySlug=generateSlug(category);
    const course=await Course.findOneAndUpdate({slug:req.params.slug,categorySlug:req.params.categorySlug},{title,description,category,link,slug,categorySlug},{new:true});
    if(!course){
      return res.status(404).json({message:"Course not found"});
    }
    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({message:error.message});
  }
};
exports.deleteCourse=async(req,res)=>{
  try {
    const course=await Course.findOneAndDelete({slug:req.params.slug,categorySlug:req.params.categorySlug});
    if(!course){
      return res.status(404).json({message:"Course not found"});
    }
    res.status(200).json({message:"Course deleted successfully"});
  } catch (error) {
    res.status(500).json({message:error.message});
  }
};

