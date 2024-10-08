import React, { useEffect, useState } from 'react';
import { getToken } from '../../utils/auth';

const PasswordList = () => {
  const [passwords, setPasswords] = useState([]);

  useEffect(() => {
    const fetchPasswords = async () => {
      const token = getToken();
      const response = await fetch('http://172.28.0.3:5000/api/passwords', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      setPasswords(data);
    };

    fetchPasswords();
  }, []);

  return (
    <div className="container mt-4">
      <h2>My Passwords</h2>
      <ul className="list-group">
        {passwords.map(password => (
          <li key={password.id} className="list-group-item">
            {password.name}: **********
            {/* Alternatively, add a button to copy password to clipboard */}
            <button onClick={() => navigator.clipboard.writeText(password.value)}>Copy</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PasswordList;
