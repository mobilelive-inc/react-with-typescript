import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Blog } from '../types/blog';

const SingleBlog: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [blog, setBlog] = useState<Blog | null>(null);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then(response => response.json())
      .then(data => setBlog(data));
  }, [id]);

  if (!blog) return <p>Loading...</p>;

  return (
    <div className="max-w-8xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold text-gray-900 mb-4">{blog.title}</h2>
      <p className="text-gray-700 leading-relaxed">{blog.body}</p>
    </div>
  );
};

export default SingleBlog;