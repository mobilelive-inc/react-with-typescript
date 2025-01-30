import React, { useEffect, useState } from 'react';
import { Blog, User } from '../types/blog';

const BlogForm: React.FC = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(users[0] || null);
  const [successMessage, setSuccessMessage] = useState('');


  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      const usersData = await response.json();
      setUsers(usersData);
      setSelectedUser(usersData[0] || null);
    };
    fetchUsers();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUser) return;
    const newBlog: Blog = { id: Date.now(), title, body, user: selectedUser, userId: selectedUser.id };

    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newBlog),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      setSuccessMessage('Blog added successfully');
      console.log('New Blog:', result);
    } catch (error) {
      console.error('Error:', error);
    }
  };



  return (
    <form onSubmit={handleSubmit} className="max-w-8xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-4">Create a New Blog</h2>
      {successMessage && <p className="text-green-600 text-center mb-4">{successMessage}</p>}
      <input 
        type="text" 
        placeholder="Title" 
        value={title} 
        onChange={e => setTitle(e.target.value)} 
        className="w-full p-2 border border-gray-300 rounded mb-4 text-black"
      />
      <textarea 
        placeholder="Body" 
        value={body} 
        onChange={e => setBody(e.target.value)} 
        className="w-full p-2 border border-gray-300 rounded mb-4 h-32 text-black"
      />
      <select 
        value={selectedUser?.id || ''} 
        onChange={e => setSelectedUser(users?.find(u => u?.id === Number(e.target.value)) || null)}
        className="w-full p-2 border border-gray-300 rounded mb-4 text-black"
      >
        {users.map(user => (
          <option key={user.id} value={user.id}>{user.name}</option>
        ))}
      </select>
      <button 
        type="submit" 
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
      >
        Add Blog
      </button>
    </form>
  );
};

export default BlogForm;