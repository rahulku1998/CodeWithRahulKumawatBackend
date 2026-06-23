const Blog = require("../models/Blog");
const generateSlug = (title) => {
  return title
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "");
};

exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ message: error.message }); 
  }
};
exports.getBlogByslug = async (req, res) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug,categorySlug: req.params.categorySlug });
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
 exports.getBlogsByCategorySlug = async (req, res) => {
  try {
    const blogs = await Blog.find({ categorySlug: req.params.categorySlug }).sort({ createdAt: -1 });
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.createBlog = async (req, res) => {
  try {
    const { title, description, image, category } = req.body;
    const slug = generateSlug(title);
    const categorySlug = generateSlug(category);
    const blog = new Blog({ title, description, image, slug, category, categorySlug });
    await blog.save();
    res.status(201).json(blog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



exports.updateBlog = async (req, res) => {
  try {
    const { title, description, image, category } = req.body;
    const slug = generateSlug(title);
    const categorySlug = generateSlug(category);
    const blog = await Blog.findOneAndUpdate(
      { slug: req.params.slug,categorySlug: req.params.categorySlug },
      { title, description, image, slug, category, categorySlug },
      { new: true } // Return the updated document
    );
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
  exports.deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findOneAndDelete({
      slug: req.params.slug,
      categorySlug: req.params.categorySlug,
    });

    if (!blog) {
      return res.status(404).json({
        message: "Blog not found",
      });
    }

    res.status(200).json({
      message: "Blog deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};