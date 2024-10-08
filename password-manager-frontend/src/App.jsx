import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import Home from './pages/Home';
import Login from './pages/Login';  // Importando desde pages
import Register from './pages/Register';  // Importando desde pages
import PasswordList from './components/Passwords/PasswordList';
import PasswordForm from './components/Passwords/PasswordForm';

const App = () => {
  return (
    <Router>
      <div className="d-flex flex-column vh-100">
        <Header />
        <main className="flex-grow-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/passwords" element={<PasswordList />} />
            <Route path="/add-password" element={<PasswordForm />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
