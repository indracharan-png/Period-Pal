const Blog = require('../models/blogModel');
const mongoose = require("mongoose");

// get all blogs
const getAllBlogs = async (req, res) => {
    try {
        const posts = await Blog.find({}).sort({ createdAt: -1 });
        res.json(posts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}

// create a blog
const postBlog = async (req, res) => {
    const { title, content, author } = req.body;
    try {
        const post = await Blog.create({ title, content, author });
        res.status(200).json(post);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}

// delete a blog with a specific id
const deleteBlog = async (req, res) => {
    const { id } = req.params;
    try {
      const post = await Blog.findOneAndDelete({_id: id});
      if (!post) {
        return res.status(404).json({ message: 'Blog not found' });
      }
      res.json({ message: 'Post deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
}

module.exports = {
    getAllBlogs,
    postBlog,
    deleteBlog
}