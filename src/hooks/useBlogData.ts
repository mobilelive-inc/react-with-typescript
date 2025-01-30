import { useState, useEffect } from 'react';
import { Blog, User } from '../types/blog';

const useBlogData = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);


  useEffect(() => {
    const fetchBlogs = async () => {
      const postsResponse = await fetch('https://jsonplaceholder.typicode.com/posts');
      const usersResponse = await fetch('https://jsonplaceholder.typicode.com/users');
      const posts = await postsResponse.json();
      const users = await usersResponse.json();

      const blogData = posts.map((post: Blog) => ({
        ...post,
        user: users.find((user: User) => user.id === post.userId) || { userId: 0, name: 'Unknown', email: '' }
      }));

      setBlogs(blogData);
    };
    fetchBlogs();
  }, []);

  return { blogs };
};

export default useBlogData;