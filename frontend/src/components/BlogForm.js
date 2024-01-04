import React, { useState } from 'react';

const BlogForm = ({ onAddBlog }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const newBlog = {
      title,
      content,
      author
    };
    onAddBlog(newBlog);
    setTitle('');
    setContent('');
    setAuthor('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Title:</label>
        <input type="text" id="title" value={title} onChange={(event) => setTitle(event.target.value)} required />
      </div>
      <div>
        <label htmlFor="content">Content:</label>
        <textarea id="content" value={content} onChange={(event) => setContent(event.target.value)} required></textarea>
      </div>
      <div>
        <label htmlFor="author">Author:</label>
        <input type="text" id="author" value={author} onChange={(event) => setAuthor(event.target.value)} required />
      </div>
      <button type="submit">Add Blog</button>
    </form>
  );
};

export default BlogForm;
