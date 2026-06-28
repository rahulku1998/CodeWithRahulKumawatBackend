const FaangQ = require("../models/FaangQ");
const generateSlug = (text) => {
  return text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "");
};
exports.createFaangQ = async (req, res) => {
  try {
    const { question, answer, category,title,link } = req.body;
    const categorySlug = generateSlug(category);
    const slug = generateSlug(title);
    const faangQ = new FaangQ({ question, answer, category, categorySlug, title, slug,link });
    await faangQ.save();
    console.log(faangQ);
    res.status(201).json(faangQ);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllFaangQs = async (req, res) => {
  try {
    const faangQs = await FaangQ.find().sort({ createdAt: 1 });
    res.status(200).json(faangQs);
    
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.getFaangQByslug = async (req, res) => {
  try {
    const faangQ = await FaangQ.findOne({ slug: req.params.slug, categorySlug: req.params.categorySlug });
    if (!faangQ) {
      return res.status(404).json({ message: "Question not found" });
    }
    res.status(200).json(faangQ);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.updateFaangQ = async (req, res) => {
  try {
    const {  question, answer,title,category,link } = req.body;

    const faangQ = await FaangQ.findOneAndUpdate(
      { slug: req.params.slug, categorySlug: req.params.categorySlug },
      { question, answer, title,link, category, categorySlug: generateSlug(category), slug: generateSlug(title) },
      { new: true }
    );
    if (!faangQ) {
      return res.status(404).json({ message: "Question not found" });
    }
    res.status(200).json(faangQ);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.deleteFaangQ = async (req, res) => {
  try {
    const faangQ = await FaangQ.findOneAndDelete({ slug: req.params.slug, categorySlug: req.params.categorySlug });
    if (!faangQ) {
      return res.status(404).json({ message: "Question not found" });
    }
    res.status(200).json({ message: "Question deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getFaangQsByCategorySlug = async (req, res) => {
  try {
    const faangQs = await FaangQ.find({ categorySlug: req.params.categorySlug }).sort({ createdAt: 1 });
    res.status(200).json(faangQs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  } 
}
