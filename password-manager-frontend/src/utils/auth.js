// src/utils/auth.js

export const login = async (email, password) => {
  try {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();
    if (data.token) {
      localStorage.setItem('token', data.token);
    }
    return data;
  } catch (error) {
    console.error('Error during login:', error);
    return { success: false, message: 'Login failed. Please try again.' };
  }
};

export const register = async (email, password) => {
  try {
    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });

    if (!response.ok) {
      const data = await response.json();
      return { success: false, message: data.message || 'Registration failed. Please try again.' };
    }

    const data = await response.json();
    return { success: true, message: data.message || 'User registered successfully' };
  } catch (error) {
    console.error('Error during registration:', error);
    return { success: false, message: 'Registration failed. Please try again.' };
  }
};

export const logout = (navigate) => {
  localStorage.removeItem('token');
  navigate('/login'); // Redirige a la página de login
};

export const getToken = () => {
  return localStorage.getItem('token');
};
