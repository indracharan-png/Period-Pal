import React from 'react';

const BlogCard = ({ blog }) => {
  return (
    <div className="blog-card">
      <h2>{blog.title}</h2>
      <p>{blog.content}</p>
      <p>Author: {blog.author}</p>
    </div>
  );
};

export default BlogCard;
