import { useEffect, useState } from 'react';
import { blogData } from '../service/api';

const ManageBlog = () => {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        const fetchBlogs = async () => {
            const data = await blogData();
            setBlogs(Array.isArray(data) ? data : []);
        };
        fetchBlogs();
    }, []);

    return (
        <div className="container mx-auto p-6">
            <h2 className="text-2xl font-bold mb-4">Blog Management</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-300">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 border">ID</th>
                            <th className="py-2 px-4 border">Author Id</th>
                            <th className="py-2 px-4 border">Categories</th>
                            <th className="py-2 px-4 border">Title</th>
                            <th className="py-2 px-4 border">Content</th>
                            <th className="py-2 px-4 border">Rate</th>
                            <th className="py-2 px-4 border">Full Name</th>
                            <th className="py-2 px-4 border">Created At</th>
                        </tr>
                    </thead>
                    <tbody>
                        {blogs.map((blog, idx) => (
                            <tr key={blog.blogId || idx}>
                                <td className="py-2 px-4 border">{blog.blogId}</td>
                                <td className="py-2 px-4 border">{blog.authorId}</td>
                                <td className="py-2 px-4 border">{blog.categories}</td>
                                <td className="py-2 px-4 border">{blog.title}</td>
                                <td className="py-2 px-4 border">{blog.content}</td>
                                <td className="py-2 px-4 border">{blog.rate}</td>
                                <td className="py-2 px-4 border">{blog.authorFullName}</td>
                                <td className="py-2 px-4 border">{blog.createdAt}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageBlog;