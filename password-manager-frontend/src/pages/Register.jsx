// src/components/Register.jsx

import React, { useState } from 'react';
import { register } from '../utils/auth';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(''); // Añadido para mostrar mensajes

  const handleSubmit = async (event) => {
    event.preventDefault();
    const result = await register(email, password);

    if (result.success) {
      setMessage(result.message); // Mensaje de éxito
      setTimeout(() => window.location.href = '/login', 2000); // Redirige después de 2 segundos
    } else {
      setMessage(result.message); // Mensaje de error
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow w-50">
        <h2 className="mb-4">Register</h2>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-control"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">Register</button>
        {message && <div className="mt-3 alert alert-info">{message}</div>} {/* Mostrar mensaje */}
      </form>
    </div>
  );
};

export default Register;
