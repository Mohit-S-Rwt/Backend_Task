import Blog from "../models/Blog.js";

export const createBlog = async (req, res) => {
  try {
    const { title, description } = req.body;
    const image = req.file ? req.file.filename : null;

    if (!title || !description) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    const blog = new Blog({ title, description, image });

    await blog.save();
    res.status(201).json({ msg: "Blog created successfully", blog });
  } catch (err) {
    res.status(500).json({ msg: err.msg });
  }
};

export const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json(blogs);
  } catch (err) {
    res.status(500).json({
      msg: err.message,
    });
  }
};

export const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ msg: "Blog not found" });
    res.json(blog);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateBlog = async (req, res) => {
  try {
    const { title, description } = req.body;
    const image = req.file ? req.file.filename : undefined;

    const updatedData = { title, description };
    if (image) updatedData.image = image;
    const updatedBlog = await Blog.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true }
    );
    if (!updatedBlog) return res.status(404).json({ msg: "Blog not found" });

    res.json({ msg: "Blog Updated", blog: updatedBlog });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

export const deleteBlog = async (req, res) => {
  try {
    const deleted = await Blog.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ msg: "Blog not Found" });
    res.json({ msg: "Blog deleted successfully" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
