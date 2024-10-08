import React, { useState } from 'react';
import { getToken } from '../../utils/auth';

const PasswordForm = () => {
  const [name, setName] = useState('');
  const [value, setValue] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = getToken();
    const response = await fetch('http://172.28.0.3:5000/api/passwords', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`  // Corregido
      },
      body: JSON.stringify({ name, value })
    });
    if (response.ok) {
      // Handle successful password creation
      setName('');
      setValue('');
    } else {
      // Handle error
      const result = await response.json();
      alert(result.message);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Add New Password</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="form-control"
          />
        </div>
        <button type="submit" className="btn btn-primary">Add Password</button>
      </form>
    </div>
  );
};

export default PasswordForm;
