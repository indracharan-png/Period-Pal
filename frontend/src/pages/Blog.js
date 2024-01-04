import React, { useState, useEffect } from "react";
import BlogCard from "../components/BlogCard";
import AddBlogForm from "../components/BlogForm";

const BlogPage = () => {
    const [blogs, setBlogs] = useState([]);
    const [showAddForm, setShowAddForm] = useState(false);

    useEffect(() => {
        fetch("/api/blogs")
            .then((res) => res.json())
            .then((data) => setBlogs(data))
            .catch((error) => console.error(error));
    }, []);

    const handleAddBlog = async (newBlog) => {
        const { title, content, author } = newBlog;
        try {
            const response = await fetch('/api/blogs', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title, content, author }),
            });
            const data = await response.json();
            setBlogs([...blogs, data]);
        } catch (error) {
            console.error(error);
            // Handle the error as appropriate for your application
        }
    };


    const toggleAddForm = () => {
        setShowAddForm(!showAddForm);
    };

    return (
        <div>
            <h1>Blogs</h1>
            <button onClick={toggleAddForm} className="add-blog">
                {showAddForm ? "Cancel" : "Add New Blog"}
            </button>
            {showAddForm && <AddBlogForm onAddBlog={handleAddBlog} />}
            {blogs.length > 0 ? (
                blogs.map((blog) => <BlogCard key={blog._id} blog={blog} />)
            ) : (
                <p>No blogs found.</p>
            )}
        </div>
    );
};

export default BlogPage;
