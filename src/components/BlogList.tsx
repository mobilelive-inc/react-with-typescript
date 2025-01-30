import React from 'react';
import { Link } from 'react-router-dom';
import useBlogData from '../hooks/useBlogData';

const BlogList: React.FC = () => {
  const { blogs } = useBlogData();

  return (
    <div className="max-w-8xl mx-auto p-4">
      <h2 className="text-3xl font-bold mb-6 text-center">Latest Blogs</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {blogs.map(blog => (
          <div key={blog.id} className="bg-white border border-gray-200 rounded-lg shadow-lg p-5 hover:shadow-xl transition duration-300">
            <h5 className="text-xl font-semibold text-gray-900 mb-2">{blog.title}</h5>
            <p className="text-gray-700 mb-4">{blog.body.slice(0, 50)}...</p>
            <p className="text-sm text-gray-500">By {blog.user && blog.user.name ? blog.user.name : "Unknown Author"}</p>
            <Link to={`/blog/${blog.id}`} className="text-blue-600 font-medium hover:underline">Read More</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogList;