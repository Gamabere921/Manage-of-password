const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { createUser, findUserByEmail } = require('../models/User');

const register = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Verificar si el usuario ya existe
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use' });
    }
    
    // Hash de la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Crear el nuevo usuario
    const user = await createUser(email, hashedPassword);
    
    // Enviar una respuesta clara
    res.status(201).json({ message: 'User registered successfully', user });
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ message: 'Registration failed. Please try again.' });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Encontrar al usuario
    const user = await findUserByEmail(email);

    // Verificar las credenciales
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generar el token
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Login failed. Please try again.' });
  }
};

module.exports = {
  register,
  login,
};
