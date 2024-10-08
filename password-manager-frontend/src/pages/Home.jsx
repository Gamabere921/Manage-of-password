import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="container mt-4">
      <h1>Welcome to Password Manager</h1>
      <p>This application helps you securely store and manage your passwords.</p>
      <div>
        <Link to="/login" className="btn btn-primary me-2">Login</Link>
        <Link to="/register" className="btn btn-secondary">Register</Link>
      </div>
    </div>
  );
};

export default Home;
