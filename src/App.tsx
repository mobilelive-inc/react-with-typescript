import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import BlogList from './components/BlogList';
import SingleBlog from './components/SingleBlog';
import BlogForm from './components/BlogForm';
import './App.css';

const App: React.FC = () => {
  return (
    <Router>
      <div className="max-w-9xl mx-auto p-6">
        <h1 className="text-4xl font-bold text-center text-white mb-4">
          <Link to="/" className="text-white" style={{ color: 'black'}}>Blog App</Link>
        </h1>
        <nav className="flex justify-center space-x-6 mb-6">
          <Link to="/" className="text-lg text-gray-700 hover:text-blue-600 transition">Home</Link>
          <Link to="/new" className="text-lg text-gray-700 hover:text-blue-600 transition">New Blog</Link>
        </nav>
        <Routes>
          <Route path="/" element={<BlogList />} />
          <Route path="/blog/:id" element={<SingleBlog />} />
          <Route path="/new" element={<BlogForm />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;